import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crisis-support',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crisis-support.component.html',
  styleUrls: ['./crisis-support.component.scss'],
})
export class CrisisSupportComponent {
  supportForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';
  loading = false;
  showForm = false;
  uploading = false;
  uploadedFiles: File[] = [];
  isReferral = false;
  
  // Popup state
  showPopup = false;
  popupData: any = null;
  
  crisisOptions = [
    { label: 'Access to a Social Worker', value: 'socialWorker' },
    { label: 'Legal Assistance Referrals', value: 'legalAssistance' },
    { label: 'Child-Focused Support', value: 'childSupport' },
    { label: 'Emergency Shelter Referrals', value: 'emergencyShelter' },
  ];

  // FAQ section
  faqs = [
    {
      question: 'Who can ask for crisis support or referrals?',
      answer: `Anyone in need of urgent help, guidance, or support is welcome to reach out—whether for themselves or on behalf of others. We especially encourage youth, families, and anyone facing barriers to seek assistance. You do not need to be referred by a professional.`,
      isOpen: false,
    },
    {
      question: 'What types of crisis support can you help with?',
      answer: `We can connect you with social workers, legal assistance, child-focused support, and emergency shelter referrals. If you're unsure what you need, our team will help you figure out the best next steps for your unique situation.`,
      isOpen: false,
    },
    {
      question: 'Is my information confidential?',
      answer: `Yes. All requests are treated with strict confidentiality and respect. We do not share your information without your consent, and you will be supported without judgment or stigma.`,
      isOpen: false,
    },
    {
      question: 'What does it cost to get support or a referral?',
      answer: `Our support, referrals, and guidance are provided at no cost. Some external services (like legal or shelter providers) may have their own costs, but we will always try to connect you to free or low-cost options where possible.`,
      isOpen: false,
    },
    {
      question: 'Can professionals refer someone for support?',
      answer: `Absolutely. Social workers, teachers, legal professionals, and community leaders are welcome to refer individuals or families in need. We will follow up with both the referring professional and the person being referred, always prioritizing safety and consent.`,
      isOpen: false,
    },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.supportForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      crisisType: [[], Validators.required],
      message: [''],
      referredBy: [''],
      referralType: ['self'],
      files: [null],
    });
  }

  openForm(referralType: 'self' | 'professional' = 'self') {
    this.showForm = true;
    this.isReferral = referralType === 'professional';
    this.supportForm.get('referralType')?.setValue(referralType);
    this.supportForm.get('referredBy')?.setValue('');
    this.supportForm.get('files')?.setValue(null);
    this.uploadedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
    this.submitted = false;
    this.loading = false;
    this.supportForm.reset({
      referralType,
      crisisType: [],
    });
  }

  closeForm() {
    this.showForm = false;
    this.successMsg = '';
    this.errorMsg = '';
    this.submitted = false;
  }
  
  closePopup() {
    this.showPopup = false;
    this.popupData = null;
  }

  toggleCrisisType(optionValue: string) {
    const control = this.supportForm.get('crisisType');
    if (!control) return;
    const current = control.value as string[];
    if (current.includes(optionValue)) {
      control.setValue(current.filter((v) => v !== optionValue));
    } else {
      control.setValue([...current, optionValue]);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const files = Array.from(input.files);
    this.uploadedFiles = files;
    this.supportForm.get('files')?.setValue(files);
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';
    if (this.supportForm.valid) {
      this.loading = true;
      
      const formData = new FormData();
      formData.append('name', this.supportForm.get('name')?.value);
      formData.append('contact', this.supportForm.get('contact')?.value);
      formData.append('email', this.supportForm.get('email')?.value);
      
      const crisisTypes = this.supportForm.get('crisisType')?.value || [];
      crisisTypes.forEach((ct: string) => formData.append('crisis_type', ct));
      
      formData.append('message', this.supportForm.get('message')?.value || '');
      formData.append('referral_type', this.supportForm.get('referralType')?.value || 'self');
      formData.append('referred_by', this.supportForm.get('referredBy')?.value || '');
      
      this.uploadedFiles.forEach((file) => {
        formData.append('files', file, file.name);
      });

      this.http.post<any>('/api/forms/crisis-support', formData).subscribe({
        next: (res) => {
          this.popupData = {
            reference: res.reference,
            ...this.supportForm.value,
          };
          this.showPopup = true;
          this.showForm = false;
          this.supportForm.reset({
            referralType: this.isReferral ? 'professional' : 'self',
            crisisType: [],
          });
          this.uploadedFiles = [];
          this.submitted = false;
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = err?.error?.detail || 'An error occurred. Please try again later.';
          this.loading = false;
        }
      });
    }
  }
}
