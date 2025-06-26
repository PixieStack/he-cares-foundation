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
  selector: 'app-become-volunteer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './become-volunteer.component.html',
  styleUrls: ['./become-volunteer.component.scss'],
})
export class BecomeVolunteerComponent {
  showForm = false;
  step = 1;
  volunteerForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';
  showPopup = false;
  popupData: any = null;
  uploadedFiles: File[] = [];
  faqs: Faq[] = [
    {
      question: 'Who can volunteer with He Cares Foundation?',
      answer:
        'Anyone passionate about making a difference for women and children is welcome! We value all skills, backgrounds, and lived experience.',
      isOpen: false,
    },
    {
      question: 'What is the minimum age to volunteer?',
      answer:
        'Volunteers must be at least 18 years old. Youth under 18 can join certain school programs with parental consent.',
      isOpen: false,
    },
    {
      question: 'Can I volunteer remotely?',
      answer:
        'Yes! We always need online support for social media, admin, translation, design, and more.',
      isOpen: false,
    },
    {
      question: 'Will I get training or support?',
      answer:
        'Absolutely. All volunteers receive orientation and ongoing support from our team.',
      isOpen: false,
    },
    {
      question: 'Can I get a reference or certificate?',
      answer:
        'Yes, active volunteers receive a reference letter and certificate of service.',
      isOpen: false,
    },
  ];

  areasOfInterest = [
    'Event Support',
    'Safe House Assistance',
    'School Drives',
    'Awareness Campaigns',
    'Counseling/Listening',
    'Legal Help',
    'Logistics & Transport',
    'Fundraising',
    'Administration',
    'Social Media',
    'Photography/Video',
    'IT/Tech Support',
    'Community Outreach',
    'Other',
  ];

  availabilityOptions = [
    'Weekdays (Daytime)',
    'Weekdays (Evenings)',
    'Weekends',
    'School Holidays',
    'Remote/Online Only',
    'Flexible/On Call',
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.volunteerForm = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      // Step 1
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      occupation: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      // Step 2
      areas: [[], Validators.required],
      experience: ['', [Validators.required, Validators.maxLength(400)]],
      motivation: ['', [Validators.required, Validators.maxLength(400)]],
      availability: [[], Validators.required],
      references: ['', [Validators.required, Validators.maxLength(200)]],
      consent: [false, Validators.requiredTrue],
      files: [null],
    });
  }

  openForm() {
    this.showForm = true;
    this.step = 1;
    this.volunteerForm.reset();
    this.uploadedFiles = [];
    this.submitted = false;
    this.successMsg = '';
    this.errorMsg = '';
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
      // Validate only step 1 controls
      const keys = [
        'name',
        'age',
        'contact',
        'email',
        'location',
        'languages',
        'occupation',
        'emergencyContact',
      ];
      let valid = true;
      keys.forEach((k) => {
        if (this.volunteerForm.get(k)?.invalid) valid = false;
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

  toggleArea(value: string) {
    const arr = this.volunteerForm.get('areas')?.value || [];
    if (arr.includes(value)) {
      this.volunteerForm.patchValue({
        areas: arr.filter((v: string) => v !== value),
      });
    } else {
      this.volunteerForm.patchValue({
        areas: [...arr, value],
      });
    }
  }

  toggleAvailability(value: string) {
    const arr = this.volunteerForm.get('availability')?.value || [];
    if (arr.includes(value)) {
      this.volunteerForm.patchValue({
        availability: arr.filter((v: string) => v !== value),
      });
    } else {
      this.volunteerForm.patchValue({
        availability: [...arr, value],
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFiles = Array.from(input.files);
    }
  }

  removeAttachment(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.volunteerForm.invalid) return;

    // Prepare FormData for backend
    const formData = new FormData();
    Object.entries(this.volunteerForm.value).forEach(([key, value]) => {
      if (key === 'areas' || key === 'availability') {
        (value as string[]).forEach((v) => formData.append(key, v));
      } else if (key === 'files') {
      } else {
        formData.append(key, value as any);
      }
    });

    this.uploadedFiles.forEach((file) => {
      formData.append('files', file, file.name);
    });

    this.http.post<any>('/api/volunteer', formData).subscribe({
      next: (res) => {
        this.popupData = {
          reference: res.reference,
          ...this.volunteerForm.value,
          files: this.uploadedFiles.map((f) => f.name),
        };
        this.showPopup = true;
        this.showForm = false;
        this.volunteerForm.reset();
        this.uploadedFiles = [];
        this.successMsg = '';
        this.submitted = false;
        this.step = 1;
      },
      error: (err) => {
        this.errorMsg =
          err?.error?.detail ||
          'An error occurred while submitting your application. Please try again later.';
      },
    });
  }

  closePopup() {
    this.showPopup = false;
    this.popupData = null;
    this.successMsg = '';
  }

  toggleFAQ(idx: number) {
    this.faqs[idx].isOpen = !this.faqs[idx].isOpen;
    this.faqs.forEach((faq, i) => {
      if (i !== idx) faq.isOpen = false;
    });
  }
}
