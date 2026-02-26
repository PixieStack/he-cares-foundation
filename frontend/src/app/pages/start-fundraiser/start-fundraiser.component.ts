import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Faq = {
  question: string;
  answer: string;
  isOpen: boolean;
};

@Component({
  selector: 'app-start-fundraiser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './start-fundraiser.component.html',
  styleUrls: ['./start-fundraiser.component.scss'],
})
export class StartFundraiserComponent {
  showForm = false;
  fundraiserForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';
  loading = false;
  uploadedFiles: File[] = [];
  step = 1;
  
  // Popup state
  showPopup = false;
  popupData: any = null;

  eventTypes = [
    'Sanitary Pad Drive',
    'Clothing Collection',
    'Food Parcel Drive',
    'School Supplies Drive',
    'Fundraising Event (e.g. walk, fun run, concert)',
    'Online Fundraiser',
    'Other',
  ];

  supportAreas = [
    'Promotion/Marketing',
    'Collection Points',
    'Transport/Logistics',
    'Foundation Speaker',
    'Social Media',
    'Banking/Finance',
    'Other',
  ];

  faqs: Faq[] = [
    {
      question: 'Where must all funds and collected goods be sent?',
      answer: `All funds must be deposited directly to the Foundation's official bank account. Physical goods can be delivered to our central warehouse or an approved drop-off point. We will provide clear details and support for your chosen method.`,
      isOpen: false,
    },
    {
      question:
        'Can I run a fundraiser or drive at my school, workplace, or community?',
      answer: `Absolutely! We encourage all communities, schools, places of worship, and companies to get involved. Let us know your idea and we’ll guide you step-by-step.`,
      isOpen: false,
    },
    {
      question: 'Will I get support from the Foundation?',
      answer: `Yes, we can provide flyers, posters, social media graphics, Foundation representatives for events, and advice on running a successful, safe, and transparent drive.`,
      isOpen: false,
    },
    {
      question: 'Can I get a certificate or acknowledgement?',
      answer: `All registered fundraisers and drives receive a letter of thanks or certificate upon completion. We love to celebrate your impact!`,
      isOpen: false,
    },
    {
      question: 'Are there rules for branding and collecting?',
      answer: `Yes. All fundraising and drives must use approved Foundation branding and messaging. Funds must be transferred directly to the Foundation’s official account, and collections must be reported honestly. We’ll guide you with clear instructions.`,
      isOpen: false,
    },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.fundraiserForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      // Step 1
      organizerName: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      eventType: ['', Validators.required],
      eventTitle: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventDesc: ['', [Validators.required, Validators.maxLength(400)]],
      // Step 2
      supportNeeded: [[]],
      bankingConsent: [false, Validators.requiredTrue],
      files: [null],
      consent: [false, Validators.requiredTrue],
    });
  }

  openForm() {
    this.showForm = true;
    this.step = 1;
    this.fundraiserForm.reset();
    this.uploadedFiles = [];
    this.submitted = false;
    this.successMsg = '';
    setTimeout(() => {
      const el = document.querySelector('.modal-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  closeForm() {
    this.showForm = false;
  }

  nextStep() {
    this.submitted = true;
    if (this.step === 1) {
      const keys = [
        'organizerName',
        'contact',
        'email',
        'location',
        'eventType',
        'eventTitle',
        'eventDate',
        'eventDesc',
      ];
      let valid = true;
      keys.forEach((k) => {
        if (this.fundraiserForm.get(k)?.invalid) valid = false;
      });
      if (valid) {
        this.step = 2;
        this.submitted = false;
        setTimeout(() => {
          const el = document.querySelector('.modal-form');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 50);
      }
    }
  }

  prevStep() {
    this.step = 1;
    this.submitted = false;
    setTimeout(() => {
      const el = document.querySelector('.modal-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  toggleSupportArea(value: string) {
    const arr = this.fundraiserForm.get('supportNeeded')?.value || [];
    if (arr.includes(value)) {
      this.fundraiserForm.patchValue({
        supportNeeded: arr.filter((v: string) => v !== value),
      });
    } else {
      this.fundraiserForm.patchValue({
        supportNeeded: [...arr, value],
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
    if (this.fundraiserForm.invalid) return;

    this.successMsg =
      'Thank you for registering your fundraiser or drive! Our team will review your application and contact you with next steps and official banking details.';
    setTimeout(() => {
      this.showForm = false;
      this.fundraiserForm.reset();
      this.uploadedFiles = [];
      this.successMsg = '';
      this.submitted = false;
      this.step = 1;
    }, 2500);
  }

  toggleFAQ(idx: number) {
    this.faqs[idx].isOpen = !this.faqs[idx].isOpen;
    this.faqs.forEach((faq, i) => {
      if (i !== idx) faq.isOpen = false;
    });
  }
}
