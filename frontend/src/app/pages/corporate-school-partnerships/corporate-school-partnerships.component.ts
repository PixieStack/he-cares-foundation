import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-corporate-school-partnerships',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './corporate-school-partnerships.component.html',
  styleUrls: ['./corporate-school-partnerships.component.scss'],
})
export class CorporateSchoolPartnershipsComponent {
  selectedTab: 'partner' | 'nominate' = 'partner';

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
      desc: 'Tech & Innovation Partner — powering He Cares Foundation’s digital presence and providing free web development, support & maintanace, and youth coding education.',
      link: 'https://edenox.com',
    },
  ];

  processPartnership(f: NgForm) {
    if (f.valid) {
      this.partnershipSuccess = "Thank you! We'll reach out to you soon.";
      f.resetForm();
      setTimeout(() => (this.partnershipSuccess = ''), 4000);
    }
  }

  processNomination(f: NgForm) {
    if (f.valid) {
      this.nominateSuccess =
        'Nomination sent! Thank you for helping us grow our mission.';
      f.resetForm();
      setTimeout(() => (this.nominateSuccess = ''), 4000);
    }
  }
}
