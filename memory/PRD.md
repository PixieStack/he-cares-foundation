# HE CARES Foundation - PRD

## Project Overview
HE CARES Foundation is a nonprofit organization website dedicated to protecting and uplifting vulnerable women and children in South Africa by providing access to safety, basic needs, psycho-social support, and empowerment programs.

## Vision Statement
A South Africa where every woman and child lives free from violence, empowered with dignity, and has access to essential resources for a healthy and hopeful future.

## Mission Statement
To protect and uplift vulnerable women and children by providing access to safety, basic needs, psycho-social support, and empowerment programs, while advocating for systemic change to end gender-based violence and inequality.

## Tech Stack
- **Frontend**: Angular 19 with TypeScript, SCSS, Bootstrap 5
- **Backend**: FastAPI (Python) 
- **Database**: MongoDB
- **Email Service**: Brevo SMTP (smtp-relay.brevo.com)

## Contact Information
- **Test Email**: thembinkosithwala16@gmail.com (temporary for testing)
- **Production Email**: Godfreymalindisa@gmail.com
- **Phone**: 0681263127 (068 126 3127)
- **Location**: South Africa

## Bank Details (Donations)
- **Bank**: Nedbank
- **Account No**: 1308803249
- **Branch Code**: 198 765
- **Reference**: Your Name + Donation

---

## What's Been Implemented (Feb 26, 2026)

### Email Integration
- [x] Configured Brevo SMTP for all form submissions
- [x] All forms send to: Godfreymalindisa@gmail.com
- [x] Email subjects identify the form source (e.g., "[From Contact Page]", "[From Donate Page]")
- [x] Confirmation emails sent to users after form submission

### Forms Updated with Email Functionality
1. **Contact Form** (`/contact`) - Working
2. **Volunteer Application** (`/become-volunteer`) - Working
3. **Financial Donation** (`/donate`) - Working
4. **Goods Donation** (`/donate`) - Working
5. **Educational Empowerment** (`/educational-empowerment`) - Working
6. **Community Advocacy** (`/community-advocacy`) - Working
7. **Crisis Support** (`/crisis-support`) - Working
8. **Start Fundraiser** (`/start-fundraiser`) - Working
9. **Corporate Partnership** (`/corporate-school-partnerships`) - Working
10. **Spread the Word - Share Story** (`/spread-the-word`) - Working (NEW)
11. **Spread the Word - Challenge Friend** (`/spread-the-word`) - Working (NEW)

### Contact Information Updated
- [x] Header emergency number: 068 126 3127
- [x] Footer contact: 068 126 3127, Godfreymalindisa@gmail.com
- [x] Contact page: Complete contact details with WhatsApp link
- [x] Donate page: Nedbank bank details

### Backend API Endpoints
- `POST /api/contact` - Contact form
- `POST /api/volunteer` - Volunteer application
- `POST /api/donate` - Financial donation
- `POST /api/donate-goods` - Goods donation
- `POST /api/forms/educational-empowerment` - Educational support
- `POST /api/forms/community-advocacy` - Advocacy forms
- `POST /api/forms/crisis-support` - Crisis support requests
- `POST /api/forms/start-fundraiser` - Fundraiser registration
- `POST /api/forms/corporate-partnership` - Partnership inquiries
- `POST /api/forms/spread-the-word/story` - Share your story (NEW)
- `POST /api/forms/spread-the-word/challenge` - Challenge a friend (NEW)

---

## Core Features

### Pages
1. Home - Hero, stats, programs overview
2. About Us - Vision, mission, team
3. Programs (dropdown):
   - Educational Empowerment
   - Community Advocacy
   - Crisis Support
4. Join Movement:
   - Become a Volunteer
   - Start a Fundraiser
   - Corporate Partnerships
5. Our Impact - Statistics, stories
6. Contact - Form, map, contact details
7. Donate - Financial & goods donations

### Key Functionality
- Responsive design (mobile-friendly)
- Form validation with error messages
- Success popups with reference numbers
- Email notifications to admin and users
- File upload support for forms
- WhatsApp integration for emergency contact

---

## Backlog / Future Enhancements

### P0 (Critical)
- None currently

### P1 (High Priority)
- [ ] Add online payment gateway (Stripe/PayPal) for donations
- [ ] Newsletter subscription functionality
- [ ] Admin dashboard for managing submissions

### P2 (Medium Priority)
- [ ] Success stories/testimonials section
- [ ] Event calendar
- [ ] Blog/news section
- [ ] Multi-language support (English, Zulu, Afrikaans)

### P3 (Nice to Have)
- [ ] Volunteer portal with login
- [ ] Donation progress tracker
- [ ] Social media feed integration
- [ ] PWA support for offline access

---

## Testing Status
- Backend: 100% (10/10 APIs working)
- Frontend: 95% (19/20 tests passed)
- Email Integration: Verified with Brevo SMTP

## Files Modified
- `/app/backend/.env` - Brevo SMTP credentials
- `/app/backend/app/services/contact_email_service.py`
- `/app/backend/app/services/donation_email_service.py`
- `/app/backend/app/services/volunteer_email_service.py`
- `/app/backend/app/services/generic_email_service.py`
- `/app/backend/app/routers/forms.py`
- `/app/frontend/src/app/pages/*/` - Updated form components
- `/app/frontend/proxy.conf.json` - Fixed proxy port
- `/app/frontend/angular.json` - Set port to 3000
