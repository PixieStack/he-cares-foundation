import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  topics = ['General Inquiry', 'Support', 'Partnership', 'Media', 'Other'];
  submitted = false;
  loading = false;
  successMsg = '';
  errorMsg = '';

  // Popup state
  showPopup = false;
  popupData: any = null;

  // For storing multiple files
  attachments: File[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: ['', Validators.required],
      message: ['', Validators.required],
      phone: [''],
      attachment: [null],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.attachments = Array.from(event.target.files);
      this.contactForm.patchValue({
        attachment: this.attachments.length ? this.attachments[0] : null,
      });
    }
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
    this.contactForm.patchValue({
      attachment: this.attachments.length ? this.attachments[0] : null,
    });
  }

  onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.contactForm.invalid) return;

    this.loading = true;

    const formData = new FormData();
    Object.entries(this.contactForm.value).forEach(([key, value]) => {
      if (key === 'attachment') return;
      if (typeof value === 'string') {
        formData.append(key, value);
      }
    });

    // Append all selected files
    this.attachments.forEach((file) => {
      formData.append('attachments', file, file.name);
    });

    this.http
      .post<any>('/api/contact', formData)
      .subscribe({
        next: (res) => {
          // Show the popup with the details
          this.popupData = {
            reference: res.reference,
            ...this.contactForm.value,
            attachments: this.attachments.map((f) => f.name),
          };
          this.showPopup = true;
          this.contactForm.reset();
          this.attachments = [];
          this.submitted = false;
          this.loading = false;
          this.successMsg = '';
        },
        error: (err) => {
          this.errorMsg =
            err?.error?.detail ||
            'An error occurred while sending your message. Please try again later.';
          this.loading = false;
        },
      });
  }

  closePopup() {
    this.showPopup = false;
    this.popupData = null;
    this.successMsg = '';
  }
}
