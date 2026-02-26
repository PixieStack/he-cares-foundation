import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-corporate-school-partnerships',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './corporate-school-partnerships.component.html',
  styleUrls: ['./corporate-school-partnerships.component.scss'],
})
export class CorporateSchoolPartnershipsComponent {
  selectedTab: 'partner' | 'nominate' = 'partner';
  loading = false;
  
  // Popup state
  showPopup = false;
  popupData: any = null;

  partnership = {
    orgType: '',
    orgName: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    interest: '',
    message: '',
  };

  nominate = {
    yourName: '',
    orgType: '',
    orgName: '',
    contactEmail: '',
    message: '',
  };

  partnershipSuccess = '';
  nominateSuccess = '';

  partners = [
    {
      name: 'Align SA',
      logo: 'assets/images/Align_SA.jpg',
      desc: 'Digital PR & Social Media Agency — amplifying the He Cares message and impact through strategy, branding, digital marketing, support, and community engagement initiatives.',
      link: 'https://alignsa.co.za',
    },
    {
      name: 'Edenox',
      logo: 'assets/images/EDENOX.png',
      desc: "Tech & Innovation Partner — powering He Cares Foundation's digital presence and providing free web development, support & maintanance, and youth coding education.",
      link: 'https://edenox.com',
    },
  ];

  constructor(private http: HttpClient) {}

  processPartnership(f: NgForm) {
    if (f.valid) {
      this.loading = true;
      
      const formData = new FormData();
      formData.append('form_type', 'partner');
      formData.append('org_type', this.partnership.orgType);
      formData.append('org_name', this.partnership.orgName);
      formData.append('contact_name', this.partnership.contactName);
      formData.append('contact_email', this.partnership.contactEmail);
      formData.append('phone', this.partnership.phone);
      formData.append('interest', this.partnership.interest);
      formData.append('message', this.partnership.message);

      this.http.post<any>('/api/forms/corporate-partnership', formData).subscribe({
        next: (res) => {
          this.popupData = {
            type: 'partner',
            reference: res.reference,
            ...this.partnership,
          };
          this.showPopup = true;
          f.resetForm();
          this.loading = false;
        },
        error: (err) => {
          this.partnershipSuccess = err?.error?.detail || 'An error occurred. Please try again.';
          this.loading = false;
          setTimeout(() => (this.partnershipSuccess = ''), 4000);
        }
      });
    }
  }

  processNomination(f: NgForm) {
    if (f.valid) {
      this.loading = true;
      
      const formData = new FormData();
      formData.append('form_type', 'nominate');
      formData.append('your_name', this.nominate.yourName);
      formData.append('nominate_org_type', this.nominate.orgType);
      formData.append('nominate_org_name', this.nominate.orgName);
      formData.append('nominate_contact_email', this.nominate.contactEmail);
      formData.append('nominate_message', this.nominate.message);

      this.http.post<any>('/api/forms/corporate-partnership', formData).subscribe({
        next: (res) => {
          this.popupData = {
            type: 'nominate',
            reference: res.reference,
            ...this.nominate,
          };
          this.showPopup = true;
          f.resetForm();
          this.loading = false;
        },
        error: (err) => {
          this.nominateSuccess = err?.error?.detail || 'An error occurred. Please try again.';
          this.loading = false;
          setTimeout(() => (this.nominateSuccess = ''), 4000);
        }
      });
    }
  }
  
  closePopup() {
    this.showPopup = false;
    this.popupData = null;
  }
}
