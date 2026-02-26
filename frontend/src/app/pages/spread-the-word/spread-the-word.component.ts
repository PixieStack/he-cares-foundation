import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-spread-the-word',
  standalone: true,
  templateUrl: './spread-the-word.component.html',
  styleUrls: ['./spread-the-word.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class SpreadTheWordComponent {
  storyForm: FormGroup;
  challengeForm: FormGroup;

  storySuccess = '';
  storyError = '';
  challengeSuccess = '';
  challengeError = '';
  storyLoading = false;
  challengeLoading = false;
  
  // Popup state
  showStoryPopup = false;
  showChallengePopup = false;
  storyPopupData: any = null;
  challengePopupData: any = null;

  movementHashtags: string =
    '#HeCaresMovement #MenWhoCare #SupportWomen #SupportChildren';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.storyForm = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
    });

    this.challengeForm = this.fb.group({
      yourName: ['', Validators.required],
      friendEmail: ['', [Validators.required, Validators.email]],
      message: [''],
    });
  }

  submitStory() {
    if (this.storyForm.valid) {
      this.storyLoading = true;
      this.storyError = '';
      
      const formData = new FormData();
      formData.append('name', this.storyForm.get('name')?.value);
      formData.append('text', this.storyForm.get('text')?.value);
      
      this.http.post<any>('/api/forms/spread-the-word/story', formData).subscribe({
        next: (res) => {
          this.storyPopupData = {
            reference: res.reference,
            ...this.storyForm.value,
          };
          this.showStoryPopup = true;
          this.storyForm.reset();
          this.storyLoading = false;
        },
        error: (err) => {
          this.storyError = err?.error?.detail || 'An error occurred. Please try again.';
          this.storyLoading = false;
        }
      });
    }
  }

  submitChallenge() {
    if (this.challengeForm.valid) {
      this.challengeLoading = true;
      this.challengeError = '';
      
      const formData = new FormData();
      formData.append('your_name', this.challengeForm.get('yourName')?.value);
      formData.append('friend_email', this.challengeForm.get('friendEmail')?.value);
      formData.append('message', this.challengeForm.get('message')?.value || '');
      
      this.http.post<any>('/api/forms/spread-the-word/challenge', formData).subscribe({
        next: (res) => {
          this.challengePopupData = {
            reference: res.reference,
            ...this.challengeForm.value,
          };
          this.showChallengePopup = true;
          this.challengeForm.reset();
          this.challengeLoading = false;
        },
        error: (err) => {
          this.challengeError = err?.error?.detail || 'An error occurred. Please try again.';
          this.challengeLoading = false;
        }
      });
    }
  }
  
  closeStoryPopup() {
    this.showStoryPopup = false;
    this.storyPopupData = null;
  }
  
  closeChallengePopup() {
    this.showChallengePopup = false;
    this.challengePopupData = null;
  }

  copyShareText() {
    const text = `I'm supporting the HE CARES MOVEMENT — a movement that stands for our Women & Children. Men, be visible. Be part of the change. #HeCaresMovement #MenWhoCare`;
    navigator.clipboard.writeText(text);
    alert('Sample caption copied!');
  }
}
