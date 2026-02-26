import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent {
  selectedTab: 'money' | 'goods' = 'money';
  loading = false;
  
  // Popup state
  showPopup = false;
  popupData: any = null;

  donation: {
    amount: number | null;
    name: string;
    card: string;
    expiry: string;
    cvc: string;
  } = {
    amount: null,
    name: '',
    card: '',
    expiry: '',
    cvc: '',
  };

  goodsDonation = {
    name: '',
    email: '',
    phone: '',
    items: [
      { label: 'Sanitary Pads', checked: false, quantity: 50 },
      { label: 'Food', checked: false, quantity: 50 },
      { label: 'Clothing', checked: false, quantity: 50 },
      { label: 'School Supplies', checked: false, quantity: 50 },
    ],
    message: '',
  };

  constructor(private http: HttpClient) {}

  // Enforce that quantity is a multiple of 10 and at least 50
  onQuantityInput(index: number, value: string) {
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 50) num = 50;
    // Snap to nearest 10
    num = Math.round(num / 10) * 10;
    if (num < 50) num = 50;
    this.goodsDonation.items[index].quantity = num;
  }

  processDonation(event: Event) {
    event.preventDefault();
    
    // Basic validation
    if (!this.donation.amount || this.donation.amount < 10) {
      alert('Please enter a donation amount of at least ZAR 10');
      return;
    }
    if (!this.donation.name || !this.donation.card || !this.donation.expiry || !this.donation.cvc) {
      alert('Please fill in all payment details');
      return;
    }
    
    this.loading = true;
    
    const formData = new FormData();
    formData.append('amount', this.donation.amount.toString());
    formData.append('name', this.donation.name);
    formData.append('card', this.donation.card);
    formData.append('expiry', this.donation.expiry);
    formData.append('cvc', this.donation.cvc);
    
    this.http.post<any>('/api/donate', formData).subscribe({
      next: (res) => {
        this.popupData = {
          type: 'money',
          reference: res.reference,
          name: this.donation.name,
          amount: this.donation.amount,
          success: true
        };
        this.showPopup = true;
        this.donation = {
          amount: null,
          name: '',
          card: '',
          expiry: '',
          cvc: '',
        };
        this.loading = false;
      },
      error: (err) => {
        alert(err?.error?.detail || 'An error occurred while processing your donation. Please try again.');
        this.loading = false;
      }
    });
  }

  processGoodsDonation(event: Event) {
    event.preventDefault();
    
    const selectedItems = this.goodsDonation.items.filter((i) => i.checked);
    
    if (!this.goodsDonation.name || !this.goodsDonation.email || !this.goodsDonation.phone) {
      alert('Please fill in your name, email, and phone number');
      return;
    }
    
    if (selectedItems.length === 0) {
      alert('Please select at least one item to donate');
      return;
    }
    
    this.loading = true;
    
    const formData = new FormData();
    formData.append('name', this.goodsDonation.name);
    formData.append('email', this.goodsDonation.email);
    formData.append('phone', this.goodsDonation.phone);
    
    // Append each selected item with quantity
    selectedItems.forEach((item) => {
      formData.append('items', `${item.label}: ${item.quantity}`);
    });
    
    if (this.goodsDonation.message) {
      formData.append('message', this.goodsDonation.message);
    }
    
    this.http.post<any>('/api/donate-goods', formData).subscribe({
      next: (res) => {
        this.popupData = {
          type: 'goods',
          reference: res.reference,
          name: this.goodsDonation.name,
          email: this.goodsDonation.email,
          phone: this.goodsDonation.phone,
          items: selectedItems.map(i => `${i.label}: ${i.quantity}`),
          message: this.goodsDonation.message,
          success: true
        };
        this.showPopup = true;
        this.goodsDonation = {
          name: '',
          email: '',
          phone: '',
          items: [
            { label: 'Sanitary Pads', checked: false, quantity: 50 },
            { label: 'Food', checked: false, quantity: 50 },
            { label: 'Clothing', checked: false, quantity: 50 },
            { label: 'School Supplies', checked: false, quantity: 50 },
          ],
          message: '',
        };
        this.loading = false;
      },
      error: (err) => {
        alert(err?.error?.detail || 'An error occurred while submitting your donation offer. Please try again.');
        this.loading = false;
      }
    });
  }
  
  closePopup() {
    this.showPopup = false;
    this.popupData = null;
  }
}
