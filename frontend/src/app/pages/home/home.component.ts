import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Hero Section
  heroContent = {
    title: 'Empowering Women & Children',
    subtitle:
      'A powerful movement where men stand as visible advocates, protectors, and champions for the women and children who need our voice the most.',
    primaryCta: 'Join Our Movement',
    secondaryCta: 'See Our Impact',
    backgroundImage: '/assets/images/hands-unity.jpg',
  };

  // Core Values
  coreValues = [
    {
      icon: 'fas fa-shield-heart',
      title: 'Protection & Safety',
      description:
        'We build safe spaces, collaborate with authorities, and ensure justice and lasting protection for every survivor.',
      color: '#E74C3C',
    },
    {
      icon: 'fas fa-hand-holding-heart',
      title: 'Essential Support',
      description:
        'We provide urgent access to shelter, meals, healthcare, sanitary items, and other basic needs for those in crisis.',
      color: '#3498DB',
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Empowerment Through Education',
      description:
        'We offer life skills, self-defense, rights education, and practical training to foster long-term self-reliance.',
      color: '#F39C12',
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Advocacy & Awareness',
      description:
        'We amplify survivor voices, transform attitudes, and drive policy changes to create lasting impact in society.',
      color: '#9B59B6',
    },
  ];

  // Impact Statistics
  impactStats = [
    {
      value: '0+',
      label: 'Lives Directly Impacted',
      icon: 'fas fa-users',
      description: 'Women and children supported',
    },
    {
      value: '0+',
      label: 'Schools & Communities Reached',
      icon: 'fas fa-school',
      description: 'Through our outreach programs',
    },
    {
      value: '0+',
      label: 'Essential Items Distributed',
      icon: 'fas fa-boxes',
      description: 'Sanitary pads, food, clothing',
    },
    {
      value: '10+',
      label: 'Men Actively Involved',
      icon: 'fas fa-male',
      description: 'As advocates and volunteers',
    },
  ];

  // Testimonials
  testimonials = [
    {
      content:
        "HE CARES Foundation literally saved my life. When I had nowhere to turn, they provided not just shelter, but hope. Their safe house became my sanctuary, and their counseling helped me rebuild my confidence. Today, I'm independent and strong.",
      author: 'Sarah M.',
      role: 'Survivor & Advocate',
      image: '/assets/images/helping-hands.jpg',
      rating: 5,
    },
    {
      content:
        "Receiving sanitary pads from their school drive meant I could attend classes with dignity. It seems small, but it changed everything for me. Now I never miss school and I'm top of my class. Thank you for believing in my education.",
      author: 'Naledi K. (16)',
      role: 'Student & Beneficiary',
      image: '/assets/images/hands-unity.jpg',
      rating: 5,
    },
    {
      content:
        'The empowerment workshops taught me my worth and my rights. The self-defense training gave me confidence, and the vocational skills helped me start my own small business. I now employ three other women in my community.',
      author: 'Thandi P.',
      role: 'Entrepreneur & Graduate',
      image: '/assets/images/volunteer-hands.jpg',
      rating: 5,
    },
    {
      content:
        "As a man, joining HE CARES opened my eyes to how I can be part of the solution. Seeing men speak up against gender-based violence gives me hope for my daughter's future. We're creating the change we want to see.",
      author: 'David N.',
      role: 'Male Advocate & Volunteer',
      image: '/assets/images/hands-unity.jpg',
      rating: 5,
    },
    {
      content:
        'The emergency helpline was my lifeline. When I called in crisis, they responded immediately with practical help and emotional support. Their 24/7 availability means no woman or child has to face danger alone.',
      author: 'Anonymous',
      role: 'Crisis Survivor',
      image: '/assets/images/helping-hands.jpg',
      rating: 5,
    },
    {
      content:
        "Through their community workshops, my village learned about women's rights and child protection. Now we have local support systems, and more men are standing up as protectors. The change is visible and inspiring.",
      author: 'Grace M.',
      role: 'Community Leader',
      image: '/assets/images/volunteer-hands.jpg',
      rating: 5,
    },
  ];

  // What Makes a Man Section
  manMessage = {
    question: 'What Makes a Man Truly Powerful?',
    quote:
      "It's how a man governs his kingdom — with his surroundings being his kingdom.",
    explanation:
      'Taking accountability, being a visible leader, and standing up for those around us defines true masculinity. We cannot let women fight alone for their safety and dignity. As men, we must be part of the advocacy — helping our sisters, mothers, daughters, and every woman in need.',
    callToAction: 'Join the movement of men who care.',
  };

  // FAQ Data
  faqs = [
    {
      question:
        'What makes HE CARES Foundation different from other organizations?',
      answer:
        'We uniquely focus on engaging men as visible advocates and allies in the fight against gender-based violence. While we provide comprehensive support to women and children, our distinctive approach involves men taking active leadership roles in advocacy, creating a powerful community-driven solution.',
      isOpen: false,
    },
    {
      question:
        'How can men participate meaningfully in the HE CARES Movement?',
      answer:
        'Men can join as volunteers, advocates, donors, or community ambassadors. We provide training on gender-based violence awareness, community outreach skills, and leadership development. Men participate in school drives, awareness campaigns, mentorship programs, and serve as visible examples of responsible masculinity.',
      isOpen: false,
    },
    {
      question: 'What immediate assistance does the foundation provide?',
      answer:
        'We provide emergency shelter, crisis counseling, legal support referrals, medical assistance, food packages, clothing, sanitary products, school supplies, and transportation to safety. Our 24/7 helpline ensures immediate response to crisis situations.',
      isOpen: false,
    },
    {
      question: 'How do you ensure the safety and privacy of beneficiaries?',
      answer:
        'We maintain strict confidentiality protocols, use secure communication channels, provide anonymous reporting options, operate safe houses with undisclosed locations, and work closely with law enforcement and legal professionals to ensure comprehensive protection.',
      isOpen: false,
    },
    {
      question:
        'Where does HE CARES Foundation operate, and are you expanding?',
      answer:
        "Based in Ennerdale, Gauteng, we serve communities across South Africa through mobile outreach, school visits, and community partnerships. We're actively expanding our reach through regional partnerships and plan to establish additional safe houses in high-need areas.",
      isOpen: false,
    },
    {
      question: 'How can I donate, and how are funds used?',
      answer:
        'Donations can be made through our website, bank transfer, or mobile platforms. Funds directly support safe house operations (40%), emergency assistance (25%), educational programs (20%), advocacy campaigns (10%), and administrative costs (5%). We provide quarterly impact reports to all donors.',
      isOpen: false,
    },
  ];

  // Program highlights
  programHighlights = [
    {
      icon: 'fas fa-hands-helping',
      title: 'Crisis Support & Referrals',
      description:
        'Connecting women and children in crisis with trusted professionals and essential services, including social work, legal guidance, and safe house referrals.',
      features: [
        'Access to a Social Worker',
        'Legal Assistance Referrals',
        'Child-Focused Support',
        'Emergency Shelter Referrals',
      ],
      link: '/programs/crisis-support',
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Educational Empowerment',
      description:
        'School drives, scholarship programs, adult education, vocational training, and life skills development.',
      features: [
        'Sanitary Pad Drives',
        'School Supplies',
        'Skills Training',
        'Literacy Programs',
      ],
      link: '/programs/educational-empowerment',
    },
    {
      icon: 'fas fa-users',
      title: 'Community Advocacy',
      description:
        "Men's leadership training, community workshops, awareness campaigns, and policy advocacy.",
      features: [
        'Male Advocate Training',
        'Community Workshops',
        'Awareness Campaigns',
        'Policy Influence',
      ],
      link: '/programs/community-advocacy',
    },
  ];

  @ViewChild('testimonialContainer') testimonialContainer!: ElementRef;
  currentTestimonialIndex: number = 0;
  testimonialAutoInterval: any;
  showBackToTop: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.startTestimonialRotation();
  }

  ngOnDestroy(): void {
    if (this.testimonialAutoInterval) {
      clearInterval(this.testimonialAutoInterval);
    }
  }

  // Testimonial Carousel Logic
  startTestimonialRotation(): void {
    this.testimonialAutoInterval = setInterval(() => {
      this.nextTestimonial();
    }, 6000);
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial(): void {
    this.currentTestimonialIndex =
      this.currentTestimonialIndex === 0
        ? this.testimonials.length - 1
        : this.currentTestimonialIndex - 1;
  }

  goToTestimonial(index: number): void {
    this.currentTestimonialIndex = index;
  }

  // FAQ Logic
  toggleFAQ(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  // Scroll Logic
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 500;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Animation triggers
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.animateOnScroll();
  }

  animateOnScroll(): void {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  }
}
