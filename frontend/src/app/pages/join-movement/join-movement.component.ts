import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface JoinOption {
  title: string;
  icon: string;
  description: string[];
  cta?: string;
  ctaLink?: string;
  external?: boolean;
}

@Component({
  selector: 'app-join-movement',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './join-movement.component.html',
  styleUrls: ['./join-movement.component.scss'],
})
export class JoinMovementComponent {
  joinOptions: JoinOption[] = [
    {
      title: 'Become a Volunteer',
      icon: 'fas fa-hands-helping',
      description: [
        'Help at events, safe houses, school drives, or awareness campaigns.',
        'Offer your skills: counseling, legal help, social media, logistics, etc.',
      ],
      cta: 'Sign Up to Volunteer',
      ctaLink: '/volunteer',
    },
    {
      title: 'Donate',
      icon: 'fas fa-donate',
      description: [
        'Financial support: One-time or monthly donations.',
        'Donate essential goods: sanitary pads, food, clothing, school supplies.',
      ],
      cta: 'Donate Now',
      ctaLink: '/donate',
    },
    {
      title: 'Start a Fundraiser or Drive',
      icon: 'fas fa-bullhorn',
      description: [
        'Organize a local fundraising event or collection drive (e.g., for sanitary pads, clothing, food).',
      ],
      cta: 'Start a Fundraiser',
      ctaLink: '/start-fundraiser',
    },
    {
      title: 'Spread the Word',
      icon: 'fas fa-share-alt',
      description: [
        'Share the movement on social media.',
        'Invite friends/family to follow, donate, or participate.',
        'Use movement hashtags, digital banners, or “Proud Supporter” badges.',
      ],
      cta: 'Spread the Word',
      ctaLink: '/spread-the-word',
      external: false,
    },
    {
      title: 'Corporate & School Partnerships',
      icon: 'fas fa-building',
      description: [
        'Encourage your workplace or school to partner for projects, sponsorships, or awareness programs.',
        'Submit your partnership interest, nominate an organization, or request info for your school or company. See our partners and real impact stories!',
      ],
      cta: 'Partner With Us',
      ctaLink: '/partnerships/corporate-school-partnerships',
    },
    {
      title: 'Advocacy & Awareness',
      icon: 'fas fa-bullseye',
      description: [
        'Join or lead workshops, talks, or campaigns about gender-based violence and children’s rights.',
      ],
      cta: 'Join Advocacy',
      ctaLink: '/programs/community-advocacy',
    },
  ];
}
