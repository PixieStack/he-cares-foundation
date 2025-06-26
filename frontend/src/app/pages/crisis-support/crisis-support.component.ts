import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crisis-support',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crisis-support.component.html',
  styleUrls: ['./crisis-support.component.scss'],
})
export class CrisisSupportComponent {
  supportForm: FormGroup;
  submitted = false;
  successMsg = '';
  showForm = false;
  uploading = false;
  uploadedFiles: File[] = [];
  isReferral = false;
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

  constructor(private fb: FormBuilder) {
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
    this.submitted = false;
    this.supportForm.reset({
      referralType,
      crisisType: [],
    });
  }

  closeForm() {
    this.showForm = false;
    this.successMsg = '';
    this.submitted = false;
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
    if (this.supportForm.valid) {
      this.successMsg =
        'Thank you for reaching out. Our team will contact you soon with support and referrals.';
      this.supportForm.reset({
        referralType: this.isReferral ? 'professional' : 'self',
        crisisType: [],
      });
      this.uploadedFiles = [];
      setTimeout(() => {
        this.showForm = false;
        this.successMsg = '';
      }, 3000);
    }
  }
}
