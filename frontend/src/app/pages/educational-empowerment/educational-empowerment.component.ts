import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-educational-empowerment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './educational-empowerment.component.html',
  styleUrls: ['./educational-empowerment.component.scss'],
})
export class EducationalEmpowermentComponent {
  showForm = false;
  formType: 'support' | 'suggest' = 'support';
  empowermentForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';
  loading = false;
  uploadedFiles: File[] = [];
  faqOpen = -1;
  
  // Popup state
  showPopup = false;
  popupData: any = null;

  programOptions = [
    { label: 'Sanitary Pad Drive', value: 'sanitary_pad' },
    { label: 'School Supplies Drive', value: 'school_supplies' },
    { label: 'Skills Training', value: 'skills_training' },
    { label: 'Literacy Program', value: 'literacy' },
    { label: 'Explore Program (Mentorships)', value: 'explore' },
    { label: 'Scholarships & Bursaries', value: 'scholarships' },
    { label: 'Adult Education (ABET)', value: 'adult_education' },
    { label: 'Digital Literacy Bootcamps', value: 'digital_literacy' },
  ];

  skillAreas = [
    'Teaching/Literacy',
    'Vocational Trainer',
    'Mentorship',
    'Event Support',
    'Fundraising',
    'Curriculum Development',
    'Digital Skills',
    'Other',
  ];

  faqs = [
    {
      question: 'Who can access your educational support services?',
      answer: `Any learner, youth, or adult seeking help with schoolwork, life skills, or personal development in our focus areas can participate. We especially encourage girls, youth from rural communities, and anyone facing challenges to reach out. Each request is reviewed with care and confidentiality.`,
      isOpen: false,
    },
    {
      question: 'Are your programs, workshops, and mentorships really free?',
      answer: `Yes! All our educational activities, workshops, and mentorship opportunities are provided at no cost to participants, thanks to generous donors and volunteers. There are no hidden fees or requirements, and all materials are provided.`,
      isOpen: false,
    },
    {
      question: 'What happens after I submit my support request?',
      answer: `Our team will review your application and contact you using the details you provided. If more information is needed, we’ll reach out. We aim to respond within 3 working days. All requests are handled confidentially and with care.`,
      isOpen: false,
    },
    {
      question: 'Can I suggest a new program or share an idea?',
      answer: `Absolutely! We welcome suggestions from learners, families, and community members. Use the “Suggest a Program” button to share your idea. Our team reviews every suggestion and may get in touch for more information or to help you develop your idea!`,
      isOpen: false,
    },
    {
      question:
        'Do you offer basic adult education and training (ABET) or literacy classes?',
      answer: `We do not offer ABET or basic literacy classes directly. However, we can help you find and enroll in ABET schools, literacy programs, or adult education opportunities in your area. Our team will support you through the process and connect you with the right resources.`,
      isOpen: false,
    },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.empowermentForm = this.buildForm('support');
  }

  buildForm(type: 'support' | 'suggest'): FormGroup {
    switch (type) {
      case 'support':
        return this.fb.group({
          name: ['', Validators.required],
          contact: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          program: [[], Validators.required],
          need_details: ['', [Validators.required, Validators.maxLength(250)]],
          files: [null],
        });
      case 'suggest':
        return this.fb.group({
          name: ['', Validators.required],
          contact: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          title: ['', Validators.required],
          description: ['', [Validators.required, Validators.maxLength(180)]],
          beneficiaries: ['', Validators.required],
          files: [null],
        });
    }
  }

  openForm(type: 'support' | 'suggest') {
    this.formType = type;
    this.showForm = true;
    this.empowermentForm = this.buildForm(type);
    this.uploadedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
    this.submitted = false;
    this.loading = false;
    setTimeout(() => {
      const el = document.querySelector('.modal-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  closeForm() {
    this.showForm = false;
  }
  
  closePopup() {
    this.showPopup = false;
    this.popupData = null;
  }

  toggleProgram(value: string) {
    const arr = this.empowermentForm.get('program')?.value || [];
    if (arr.includes(value)) {
      this.empowermentForm.patchValue({
        program: arr.filter((v: string) => v !== value),
      });
    } else {
      this.empowermentForm.patchValue({
        program: [...arr, value],
      });
    }
  }

  toggleSkillArea(value: string) {
    const arr = this.empowermentForm.get('skill_areas')?.value || [];
    if (arr.includes(value)) {
      this.empowermentForm.patchValue({
        skill_areas: arr.filter((v: string) => v !== value),
      });
    } else {
      this.empowermentForm.patchValue({
        skill_areas: [...arr, value],
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadedFiles = Array.from(event.target.files);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.empowermentForm.invalid) return;

    switch (this.formType) {
      case 'support':
        this.successMsg =
          'Thank you! Our team will contact you soon to discuss your support or application needs.';
        break;
      case 'suggest':
        this.successMsg = 'Thank you for your program suggestion!';
        break;
    }
    setTimeout(() => {
      this.showForm = false;
      this.empowermentForm.reset();
      this.uploadedFiles = [];
      this.successMsg = '';
      this.submitted = false;
    }, 2500);
  }

  toggleFAQ(idx: number) {
    this.faqs[idx].isOpen = !this.faqs[idx].isOpen;
    this.faqs.forEach((faq, i) => {
      if (i !== idx) faq.isOpen = false;
    });
  }
}
