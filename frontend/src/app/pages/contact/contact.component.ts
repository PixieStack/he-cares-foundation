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

  // Multiple files
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
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles: File[] = Array.from(event.target.files);

      newFiles.forEach((newFile) => {
        // Avoid duplicate files by name
        const exists = this.attachments.some(
          (f) => f.name === newFile.name && f.size === newFile.size
        );
        if (!exists) {
          this.attachments.push(newFile);
        }
      });

      // Reset input so same file can be re-added after removal
      event.target.value = '';
    }
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.contactForm.invalid) return;

    this.loading = true;

    const formData = new FormData();
    const { name, email, topic, message, phone } = this.contactForm.value;

    formData.append('name', name);
    formData.append('email', email);
    formData.append('topic', topic);
    formData.append('message', message);
    if (phone) formData.append('phone', phone);

    // Append ALL files
    this.attachments.forEach((file) => {
      formData.append('attachments', file, file.name);
    });

    this.http.post<any>('/api/contact', formData).subscribe({
      next: (res) => {
        this.popupData = {
          reference: res.reference,
          name,
          email,
          topic,
          message,
          phone,
          attachments: this.attachments.map(
            (f) => `${f.name} (${this.formatFileSize(f.size)})`
          ),
        };
        this.showPopup = true;
        this.contactForm.reset();
        this.attachments = [];
        this.submitted = false;
        this.loading = false;
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