import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
    title: 'Home | He Cares Foundation',
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/about-us/about-us.component').then(
        (m) => m.AboutUsComponent,
      ),
    title: 'About Us | He Cares Foundation',
  },
  {
    path: 'programs/crisis-support',
    loadComponent: () =>
      import('./pages/crisis-support/crisis-support.component').then(
        (m) => m.CrisisSupportComponent,
      ),
    title: 'Crisis Support & Referrals | He Cares Foundation',
  },
  {
    path: 'programs/educational-empowerment',
    loadComponent: () =>
      import(
        './pages/educational-empowerment/educational-empowerment.component'
      ).then((m) => m.EducationalEmpowermentComponent),
    title: 'Educational Empowerment | He Cares Foundation',
  },
  {
    path: 'programs/community-advocacy',
    loadComponent: () =>
      import('./pages/community-advocacy/community-advocacy.component').then(
        (m) => m.CommunityAdvocacyComponent,
      ),
    title: 'Community Advocacy | He Cares Foundation',
  },
  {
    path: 'volunteer',
    loadComponent: () =>
      import('./pages/become-volunteer/become-volunteer.component').then(
        (m) => m.BecomeVolunteerComponent,
      ),
    title: 'Become a Volunteer | He Cares Foundation',
  },
  {
    path: 'get-involved',
    loadComponent: () =>
      import('./pages/join-movement/join-movement.component').then(
        (m) => m.JoinMovementComponent,
      ),
    title: 'Join the Movement | He Cares Foundation',
  },
  {
    path: 'impact',
    loadComponent: () =>
      import('./pages/impact-movement/impact-movement.component').then(
        (m) => m.ImpactMovementComponent,
      ),
    title: 'Impact & Stories | He Cares Foundation',
  },
  {
    path: 'donate',
    loadComponent: () =>
      import('./pages/donate/donate.component').then((m) => m.DonateComponent),
    title: 'Donate | He Cares Foundation',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
    title: 'Contact | He Cares Foundation',
  },
  {
    path: 'start-fundraiser',
    loadComponent: () =>
      import('./pages/start-fundraiser/start-fundraiser.component').then(
        (m) => m.StartFundraiserComponent,
      ),
    title: 'Start a Fundraiser or Drive | He Cares Foundation',
  },
  {
    path: 'partnerships/corporate-school-partnerships',
    loadComponent: () =>
      import(
        './pages/corporate-school-partnerships/corporate-school-partnerships.component'
      ).then((m) => m.CorporateSchoolPartnershipsComponent),
    title: 'Corporate & School Partnerships | He Cares Foundation',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
