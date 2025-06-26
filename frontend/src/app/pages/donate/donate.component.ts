import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
})
export class DonateComponent {
  selectedTab: 'money' | 'goods' = 'money';

  donation = {
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
    alert(
      `Donation Details:\nAmount: ${this.donation.amount}\nName: ${this.donation.name}\nCard: ${this.donation.card}\nExpiry: ${this.donation.expiry}\nCVC: ${this.donation.cvc}\n\n(Payment functionality coming soon!)`,
    );
  }

  processGoodsDonation(event: Event) {
    event.preventDefault();
    const items = this.goodsDonation.items
      .filter((i) => i.checked)
      .map((i) => `${i.label}: ${i.quantity}`)
      .join(', ');
    alert(
      `Goods Donation Details:\nName: ${this.goodsDonation.name}\nEmail: ${this.goodsDonation.email}\nPhone: ${this.goodsDonation.phone}\nItems: ${items}\nMessage: ${this.goodsDonation.message}\n\n(Email functionality coming soon! The foundation will contact you for collection/receiving of goods.)`,
    );
  }
}
