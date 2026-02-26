#!/usr/bin/env python3
"""
Comprehensive backend API testing for HE CARES Foundation
Tests all forms and endpoints for email functionality
"""
import requests
import sys
import json
from datetime import datetime
import io
import os

class HeCaresTester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.passed_tests = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            self.passed_tests.append(test_name)
            print(f"✅ {test_name} - PASSED")
        else:
            self.failed_tests.append({"test": test_name, "details": details})
            print(f"❌ {test_name} - FAILED: {details}")
    
    def test_backend_health(self):
        """Test if backend is running"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=10)
            success = response.status_code == 200 and "He Cares Foundation API" in response.text
            self.log_test("Backend Health Check", success, 
                         f"Status: {response.status_code}, Response: {response.text[:100]}")
            return success
        except Exception as e:
            self.log_test("Backend Health Check", False, str(e))
            return False
    
    def test_contact_form(self):
        """Test contact form API"""
        try:
            # Create form data
            form_data = {
                'name': 'Test User',
                'email': 'test@example.com',
                'topic': 'General Inquiry',
                'message': 'This is a test message for the contact form.',
                'phone': '0123456789'
            }
            
            response = requests.post(f"{self.base_url}/api/contact", data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "message" in data
                self.log_test("Contact Form API", success, 
                             f"Response: {data}")
            else:
                self.log_test("Contact Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Contact Form API", False, str(e))
            return False
    
    def test_volunteer_form(self):
        """Test volunteer application API"""
        try:
            form_data = {
                'name': 'Test Volunteer',
                'age': 25,
                'contact': '0123456789',
                'email': 'volunteer@example.com',
                'location': 'Test City, South Africa',
                'languages': 'English, Afrikaans',
                'occupation': 'Software Developer',
                'emergencyContact': 'Emergency Contact: 0987654321',
                'areas': ['Child Care', 'Education Support'],
                'experience': 'I have experience working with children and education programs.',
                'motivation': 'I want to help make a difference in the community.',
                'availability': ['Weekends', 'Evenings'],
                'references': 'John Doe - 0111222333',
                'consent': True
            }
            
            response = requests.post(f"{self.base_url}/api/volunteer", data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Volunteer Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Volunteer Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Volunteer Form API", False, str(e))
            return False
    
    def test_financial_donation(self):
        """Test financial donation API"""
        try:
            form_data = {
                'amount': 100.00,
                'name': 'Test Donor',
                'card': '1234567890123456',
                'expiry': '12/25',
                'cvc': '123'
            }
            
            response = requests.post(f"{self.base_url}/api/donate", data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data and "amount" in data
                self.log_test("Financial Donation API", success, 
                             f"Reference: {data.get('reference', 'None')}, Amount: {data.get('amount', 'None')}")
            else:
                self.log_test("Financial Donation API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Financial Donation API", False, str(e))
            return False
    
    def test_goods_donation(self):
        """Test goods donation API"""
        try:
            form_data = {
                'name': 'Test Goods Donor',
                'email': 'goods@example.com',
                'phone': '0123456789',
                'items': ['Clothes', 'Food', 'Books'],
                'message': 'I have some items to donate for the children.'
            }
            
            response = requests.post(f"{self.base_url}/api/donate-goods", data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data and "items" in data
                self.log_test("Goods Donation API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Goods Donation API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Goods Donation API", False, str(e))
            return False
    
    def test_educational_empowerment_form(self):
        """Test educational empowerment form API"""
        try:
            form_data = {
                'form_type': 'support',
                'name': 'Test Education Seeker',
                'contact': '0123456789',
                'email': 'education@example.com',
                'program': ['Literacy Programs', 'Skills Training'],
                'need_details': 'I need support with literacy programs for my children.'
            }
            
            response = requests.post(f"{self.base_url}/api/forms/educational-empowerment", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Educational Empowerment Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Educational Empowerment Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Educational Empowerment Form API", False, str(e))
            return False
    
    def test_community_advocacy_form(self):
        """Test community advocacy form API"""
        try:
            form_data = {
                'form_type': 'support',
                'name': 'Test Advocate',
                'contact': '0123456789',
                'email': 'advocate@example.com',
                'support_type': 'Legal Support',
                'reason': 'I need legal support for my family.'
            }
            
            response = requests.post(f"{self.base_url}/api/forms/community-advocacy", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Community Advocacy Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Community Advocacy Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Community Advocacy Form API", False, str(e))
            return False
    
    def test_crisis_support_form(self):
        """Test crisis support form API"""
        try:
            form_data = {
                'name': 'Test Crisis User',
                'contact': '0123456789',
                'email': 'crisis@example.com',
                'crisis_type': ['Domestic Violence', 'Financial Crisis'],
                'message': 'I need urgent support for domestic violence situation.',
                'referral_type': 'self',
                'referred_by': ''
            }
            
            response = requests.post(f"{self.base_url}/api/forms/crisis-support", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Crisis Support Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Crisis Support Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Crisis Support Form API", False, str(e))
            return False
    
    def test_fundraiser_form(self):
        """Test start fundraiser form API"""
        try:
            form_data = {
                'organizer_name': 'Test Organizer',
                'contact': '0123456789',
                'email': 'organizer@example.com',
                'location': 'Test City, South Africa',
                'event_type': 'Community Fundraiser',
                'event_title': 'Test Charity Event',
                'event_date': '2024-12-31',
                'event_desc': 'A test charity event for the community.',
                'support_needed': ['Venue', 'Marketing', 'Volunteers']
            }
            
            response = requests.post(f"{self.base_url}/api/forms/start-fundraiser", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Start Fundraiser Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Start Fundraiser Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Start Fundraiser Form API", False, str(e))
            return False
    
    def test_corporate_partnership_form(self):
        """Test corporate partnership form API"""
        try:
            form_data = {
                'form_type': 'partner',
                'org_type': 'Corporate',
                'org_name': 'Test Corporation',
                'contact_name': 'Test Contact',
                'contact_email': 'corporate@example.com',
                'phone': '0123456789',
                'interest': 'Community Development',
                'message': 'We are interested in partnering with your foundation.'
            }
            
            response = requests.post(f"{self.base_url}/api/forms/corporate-partnership", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Corporate Partnership Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Corporate Partnership Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Corporate Partnership Form API", False, str(e))
            return False
    
    def test_spread_word_story_form(self):
        """Test spread the word story form API"""
        try:
            form_data = {
                'name': 'Test Story Teller',
                'text': 'This is my inspiring story about how HE CARES Foundation helped our community. They provided educational resources and support that changed many lives.'
            }
            
            response = requests.post(f"{self.base_url}/api/forms/spread-the-word/story", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Spread the Word Story Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Spread the Word Story Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Spread the Word Story Form API", False, str(e))
            return False
    
    def test_spread_word_challenge_form(self):
        """Test spread the word challenge form API"""
        try:
            form_data = {
                'your_name': 'Test Challenger',
                'friend_email': 'friend@example.com',
                'message': 'Hey friend! You should check out this amazing foundation that is making a real difference in our community.'
            }
            
            response = requests.post(f"{self.base_url}/api/forms/spread-the-word/challenge", 
                                   data=form_data, timeout=30)
            
            success = response.status_code == 200
            if success:
                data = response.json()
                success = "reference" in data and "success" in data
                self.log_test("Spread the Word Challenge Form API", success, 
                             f"Reference: {data.get('reference', 'None')}")
            else:
                self.log_test("Spread the Word Challenge Form API", success, 
                             f"Status: {response.status_code}, Response: {response.text}")
            return success
            
        except Exception as e:
            self.log_test("Spread the Word Challenge Form API", False, str(e))
            return False
    
    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print(f"BACKEND API TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {len(self.failed_tests)}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['details']}")
        
        if self.passed_tests:
            print(f"\n✅ PASSED TESTS:")
            for test in self.passed_tests:
                print(f"  - {test}")
        
        return len(self.failed_tests) == 0

def main():
    print("🔍 Starting HE CARES Foundation Backend API Tests")
    print("="*60)
    
    tester = HeCaresTester()
    
    # Test all endpoints
    tests = [
        tester.test_backend_health,
        tester.test_contact_form,
        tester.test_volunteer_form,
        tester.test_financial_donation,
        tester.test_goods_donation,
        tester.test_educational_empowerment_form,
        tester.test_community_advocacy_form,
        tester.test_crisis_support_form,
        tester.test_fundraiser_form,
        tester.test_corporate_partnership_form,
        tester.test_spread_word_story_form,
        tester.test_spread_word_challenge_form
    ]
    
    for test in tests:
        test()
        print()
    
    # Print summary and return appropriate exit code
    all_passed = tester.print_summary()
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())