import { Component } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-impact-movement',
  standalone: true,
  imports: [NgForOf, NgIf, NgStyle],
  styleUrls: ['./impact-movement.component.scss'],
  templateUrl: './impact-movement.component.html',
})
export class ImpactMovementComponent {
  stats = [
    {
      label: 'Lives Impacted',
      value: '0',
      icon: 'fas fa-users',
      color: '#fbbf24',
    },
    {
      label: 'Communities Reached',
      value: '0',
      icon: 'fas fa-map-marked-alt',
      color: '#2563eb',
    },
    {
      label: 'Schools Visited',
      value: '0',
      icon: 'fas fa-school',
      color: '#ef4444',
    },
    {
      label: 'Meals Served',
      value: '0',
      icon: 'fas fa-utensils',
      color: '#10b981',
    },
    {
      label: 'Workshops Hosted',
      value: '0',
      icon: 'fas fa-chalkboard-teacher',
      color: '#a855f7',
    },
    {
      label: 'Volunteers Engaged',
      value: '0',
      icon: 'fas fa-hands-helping',
      color: '#f59e42',
    },
  ];

  testimonials = Array.from({ length: 40 }, (_, i) => ({
    name: `Testimonial User ${i + 1}`,
    role: `Role ${i + 1}`,
    content: `This is a sample testimonial #${i + 1}. Their experience was inspiring and positive.`,
    image: `https://via.placeholder.com/70x70?text=User+${i + 1}`,
  }));
  testimonialPage = 0;
  testimonialPageSize = 3;
  get testimonialPageCount() {
    return Math.ceil(this.testimonials.length / this.testimonialPageSize);
  }
  get testimonialCurrentPage() {
    const start = this.testimonialPage * this.testimonialPageSize;
    return this.testimonials.slice(start, start + this.testimonialPageSize);
  }
  nextTestimonialPage() {
    this.testimonialPage =
      (this.testimonialPage + 1) % this.testimonialPageCount;
  }
  prevTestimonialPage() {
    this.testimonialPage =
      (this.testimonialPage - 1 + this.testimonialPageCount) %
      this.testimonialPageCount;
  }

  // 40 Gallery placeholders, 9 per page
  gallery = Array.from({ length: 42 }, (_, i) => ({
    src: `https://via.placeholder.com/350x200?text=Photo+${i + 1}`,
    alt: `Placeholder Photo ${i + 1}`,
    type: 'photo',
  }));
  galleryPage = 0;
  galleryPageSize = 9;
  get galleryPageCount() {
    return Math.ceil(this.gallery.length / this.galleryPageSize);
  }
  get galleryCurrentPage() {
    const start = this.galleryPage * this.galleryPageSize;
    return this.gallery.slice(start, start + this.galleryPageSize);
  }
  nextGalleryPage() {
    this.galleryPage = (this.galleryPage + 1) % this.galleryPageCount;
  }
  prevGalleryPage() {
    this.galleryPage =
      (this.galleryPage - 1 + this.galleryPageCount) % this.galleryPageCount;
  }
}
