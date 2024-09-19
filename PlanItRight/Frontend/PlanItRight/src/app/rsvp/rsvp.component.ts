import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.css'
})
export class RsvpComponent implements OnInit{

  rsvpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.rsvpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      attending: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rsvpForm.valid) {
      console.log('RSVP submitted:', this.rsvpForm.value);
      // Here you would typically send this data to your backend
      // For example: this.rsvpService.submitRsvp(this.rsvpForm.value).subscribe(...)
      alert('Thank you for your RSVP!');
      this.rsvpForm.reset();
    }
  }
}
