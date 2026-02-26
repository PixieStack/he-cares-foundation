import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-community-advocacy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './community-advocacy.component.html',
  styleUrls: ['./community-advocacy.component.scss'],
})
export class CommunityAdvocacyComponent {
  showForm = false;
  formType: 'support' | 'advocate' | 'nominate' = 'support';
  advocacyForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';
  loading = false;
  uploadedFiles: File[] = [];
  
  // Popup state
  showPopup = false;
  popupData: any = null;

  advocacyFeatures = [
    {
      icon: 'fas fa-user-shield',
      title: 'Male Advocate Training',
      bullets: [
        'Interactive mentorship for men & boys',
        'Workshops on healthy masculinity',
        'Bystander intervention skills',
        'Certification as a Community Advocate',
      ],
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Community Workshops',
      bullets: [
        'Gender-based violence prevention',
        'Conflict resolution & peace circles',
        'Parenting & family healing forums',
        'Open to all community members',
      ],
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Awareness Campaigns',
      bullets: [
        'Marches, rallies & social media drives',
        'School awareness & safe spaces',
        'Men as visible allies',
        'Custom campaigns for local needs',
      ],
    },
    {
      icon: 'fas fa-balance-scale',
      title: 'Policy Influence',
      bullets: [
        'Advocacy for laws & policy change',
        'Engagement with local leaders',
        'Community petitions & action plans',
        'Legal education sessions',
      ],
    },
    {
      icon: 'fas fa-users',
      title: 'Explore Program',
      bullets: [
        'Career exposure for youth',
        'Mentorship with community leaders',
        'Leadership development tracks',
        'Job shadowing & skills building',
      ],
    },
    {
      icon: 'fas fa-child',
      title: 'Youth Mobilization',
      bullets: [
        'Youth ambassador program',
        'School clubs & advocacy groups',
        'Debate, drama & art for change',
        'Building the next generation of leaders',
      ],
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Family Healing Forums',
      bullets: [
        'Support for families affected by violence',
        'Group counseling & restoration circles',
        'Family education for healthy relationships',
        'Safe space for dialogue & healing',
      ],
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Community Innovation Labs',
      bullets: [
        'Grassroots problem-solving workshops',
        'Support for community-led social projects',
        'Training in advocacy tech & digital tools',
        'Incubation for local changemaker ideas',
      ],
    },
  ];
  impactStats = [
    {
      icon: 'fas fa-male',
      value: '0+',
      label: 'Men Trained',
      description: 'Certified as male advocates',
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      value: '0+',
      label: 'Workshops Delivered',
      description: 'Across schools & communities',
    },
    {
      icon: 'fas fa-bullhorn',
      value: '0+',
      label: 'Campaigns Run',
      description: 'Awareness & prevention events',
    },
    {
      icon: 'fas fa-users',
      value: '0+',
      label: 'Lives Reached',
      description: 'Direct community impact',
    },
  ];

  faqs = [
    {
      question:
        'Who can become a Male Advocate, and what does the training involve?',
      answer: `Our Male Advocate Training is open to any man or boy who wants to actively support safer, healthier communities for women, children, and fellow men. Whether you have prior experience or not, you are welcome! The program includes interactive workshops on healthy masculinity, practical bystander skills, mentorship, and leadership development. Graduates are equipped to intervene positively, mentor others, and act as visible allies in their communities.`,
      isOpen: false,
    },
    {
      question:
        'What types of advocacy support can I request for myself or my family?',
      answer: `You can request a wide range of support, including conflict mediation, referrals to professional services (such as social workers or legal aid), one-on-one or group mentorship, and family healing circles. We also assist with navigating community structures, organizing dialogue sessions, and providing guidance through challenges like bullying, violence, or discrimination. Support is always confidential and tailored to your specific needs.`,
      isOpen: false,
    },
    {
      question:
        'How do I nominate a Community Hero, and what happens after I nominate someone?',
      answer: `Anyone can nominate a Community Hero—this could be a friend, relative, teacher, volunteer, or any local leader creating positive change. After submitting the nomination form, our team will reach out to learn more about their impact. Selected heroes are celebrated on our platforms, may receive certificates or awards, and are invited to share their stories to inspire others.`,
      isOpen: false,
    },
    {
      question:
        'What workshops, campaigns, or activities can youth get involved in?',
      answer: `Youth can join a variety of programs: from school advocacy clubs and awareness campaigns to leadership workshops, debates, and creative arts for social change. Our Youth Mobilization initiative also offers ambassador roles, mentorship with community leaders, and opportunities to participate in local events, helping young people become confident changemakers and allies for safer communities.`,
      isOpen: false,
    },
    {
      question:
        'How does the Explore Program connect people with opportunities?',
      answer: `The Explore Program offers mentorship, career exposure, and leadership pathways for youth and community members. Participants can join job shadowing experiences, meet with professionals, and develop skills for advocacy and leadership. The aim is to broaden horizons, open doors to new opportunities, and inspire ongoing community involvement and personal growth.`,
      isOpen: false,
    },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.advocacyForm = this.buildForm('support');
  }

  buildForm(type: 'support' | 'advocate' | 'nominate'): FormGroup {
    switch (type) {
      case 'support':
        return this.fb.group({
          name: ['', Validators.required],
          contact: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          support_type: ['', Validators.required],
          reason: ['', [Validators.required, Validators.maxLength(220)]],
          files: [null],
        });
      case 'advocate':
        return this.fb.group({
          name: ['', Validators.required],
          contact: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          motivation: ['', [Validators.required, Validators.maxLength(200)]],
          skills: ['', [Validators.maxLength(100)]],
          files: [null],
        });
      case 'nominate':
        return this.fb.group({
          your_name: ['', Validators.required],
          your_contact: ['', Validators.required],
          nominee_name: ['', Validators.required],
          nominee_contact: ['', Validators.required],
          reason: ['', [Validators.required, Validators.maxLength(200)]],
          files: [null],
        });
    }
  }

  openForm(type: 'support' | 'advocate' | 'nominate') {
    this.formType = type;
    this.showForm = true;
    this.advocacyForm = this.buildForm(type);
    this.uploadedFiles = [];
    this.successMsg = '';
    this.errorMsg = '';
    this.submitted = false;
    this.loading = false;
    setTimeout(() => {
      const el = document.querySelector('.modal-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  closeForm() {
    this.showForm = false;
  }
  
  closePopup() {
    this.showPopup = false;
    this.popupData = null;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadedFiles = Array.from(event.target.files);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';
    if (this.advocacyForm.invalid) return;

    this.loading = true;
    
    const formData = new FormData();
    formData.append('form_type', this.formType);
    
    if (this.formType === 'support') {
      formData.append('name', this.advocacyForm.get('name')?.value);
      formData.append('contact', this.advocacyForm.get('contact')?.value);
      formData.append('email', this.advocacyForm.get('email')?.value);
      formData.append('support_type', this.advocacyForm.get('support_type')?.value || '');
      formData.append('reason', this.advocacyForm.get('reason')?.value || '');
    } else if (this.formType === 'advocate') {
      formData.append('name', this.advocacyForm.get('name')?.value);
      formData.append('contact', this.advocacyForm.get('contact')?.value);
      formData.append('email', this.advocacyForm.get('email')?.value);
      formData.append('motivation', this.advocacyForm.get('motivation')?.value || '');
      formData.append('skills', this.advocacyForm.get('skills')?.value || '');
    } else { // nominate
      formData.append('your_name', this.advocacyForm.get('your_name')?.value);
      formData.append('your_contact', this.advocacyForm.get('your_contact')?.value);
      formData.append('nominee_name', this.advocacyForm.get('nominee_name')?.value);
      formData.append('nominee_contact', this.advocacyForm.get('nominee_contact')?.value);
      formData.append('reason', this.advocacyForm.get('reason')?.value || '');
    }
    
    this.uploadedFiles.forEach((file) => {
      formData.append('files', file, file.name);
    });

    this.http.post<any>('/api/forms/community-advocacy', formData).subscribe({
      next: (res) => {
        this.popupData = {
          reference: res.reference,
          formType: this.formType,
          ...this.advocacyForm.value,
        };
        this.showPopup = true;
        this.showForm = false;
        this.advocacyForm.reset();
        this.uploadedFiles = [];
        this.submitted = false;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.detail || 'An error occurred. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleFAQ(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
