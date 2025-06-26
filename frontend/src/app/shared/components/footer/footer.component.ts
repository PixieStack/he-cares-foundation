import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'About Us', route: '/about-us' },
    { label: 'Our Programs', route: '/programs-services' },
    { label: 'Get Involved', route: '/get-involved' },
    { label: 'Our Impact', route: '/our-impact' },
    { label: 'Donate Now', route: '/donate' },
  ];

  programLinks = [
    { label: 'Protection & Safety', route: '/programs/protection' },
    { label: 'Basic Needs Support', route: '/programs/basic-needs' },
    { label: 'Empowerment Programs', route: '/programs/empowerment' },
    { label: 'Community Outreach', route: '/programs/community' },
    { label: 'Advocacy Campaigns', route: '/programs/advocacy' },
  ];

  supportLinks = [
    { label: 'Help Request', route: '/help-request' },
    { label: 'Volunteer Application', route: '/volunteer' },
    { label: 'Partnership Opportunities', route: '/partnerships' },
    { label: 'Emergency Resources', route: '/emergency-resources' },
    { label: 'Contact Us', route: '/contact-us' },
  ];

  emergencyContacts = [
    { name: 'HE CARES Foundation', number: '068 126 3127', available: '24/7' },
    {
      name: 'Gender-Based Violence Helpline',
      number: '0800 428 428',
      available: '24/7',
    },
    { name: 'Childline South Africa', number: '116', available: '24/7' },
  ];

  socialMedia = [
    {
      platform: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: '#',
      color: '#1877f2',
    },
    { platform: 'Twitter', icon: 'fab fa-twitter', url: '#', color: '#1da1f2' },
    {
      platform: 'Instagram',
      icon: 'fab fa-instagram',
      url: '#',
      color: '#e4405f',
    },
    { platform: 'WhatsApp', icon: 'fab fa-whatsapp', url: '#25D366' },
    { platform: 'YouTube', icon: 'fab fa-youtube', url: '#', color: '#ff0000' },
  ];

  constructor() {}

  ngOnInit(): void {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
