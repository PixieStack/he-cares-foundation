import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  navigationItems = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about-us' },
    {
      label: 'Programs',
      route: '/programs',
      submenu: [
        {
          label: 'Crisis Support & Referrals',
          route: '/programs/crisis-support',
        },
        {
          label: 'Educational Empowerment',
          route: '/programs/educational-empowerment',
        },
        { label: 'Community Advocacy', route: '/programs/community-advocacy' },
      ],
      isOpen: false,
    },
    { label: 'Join Movement', route: '/get-involved' },
    { label: 'Our Impact', route: '/impact' },
    { label: 'Contact', route: '/contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.navigationItems.forEach((item) => (item.isOpen = false));
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.navigationItems.forEach((item) => (item.isOpen = false));
  }

  toggleMobileDropdown(item: any) {
    item.isOpen = !item.isOpen;
    this.navigationItems.forEach((i) => {
      if (i !== item && i.submenu) {
        i.isOpen = false;
      }
    });
  }
}
