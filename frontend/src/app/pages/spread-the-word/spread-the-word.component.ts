import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-spread-the-word',
  standalone: true,
  templateUrl: './spread-the-word.component.html',
  styleUrls: ['./spread-the-word.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class SpreadTheWordComponent {
  storyForm: FormGroup;
  challengeForm: FormGroup;

  storySuccess = '';
  challengeSuccess = '';

  movementHashtags: string =
    '#HeCaresMovement #MenWhoCare #SupportWomen #SupportChildren';

  constructor(private fb: FormBuilder) {
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
      this.storySuccess = 'Story shared!';
      this.storyForm.reset();
      setTimeout(() => (this.storySuccess = ''), 4000);
    }
  }

  submitChallenge() {
    if (this.challengeForm.valid) {
      this.challengeSuccess = 'Challenge sent!';
      this.challengeForm.reset();
      setTimeout(() => (this.challengeSuccess = ''), 4000);
    }
  }

  copyShareText() {
    const text = `I’m supporting the HE CARES MOVEMENT — a movement that stands for our Women & Children. Men, be visible. Be part of the change. #HeCaresMovement #MenWhoCare`;
    navigator.clipboard.writeText(text);
    alert('Sample caption copied!');
  }
}
