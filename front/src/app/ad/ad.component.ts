import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ad } from '../ad';
import {AdService} from "../services/ad.service";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  adForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private adService: AdService) { }
  fullName: string = '';
  email: string = '';

  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.adForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [currentDate],
      contactInfo: this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      })
    });
  }

  createContactInfo() {
    return this.formBuilder.group({
      fullName: [''],
      email: ['']
    });
  }

  onSubmit() {
    if (this.adForm.valid) {

      const adData: Ad = this.adForm.value;

      this.adService.createAd(adData).subscribe(
        (response) => {
          console.log('Ad created successfully:', response);
          // Handle success response here
        },
        (error) => {
          console.error('Error creating ad:', error);
          // Handle error response here
        }
      );
    }
  }
}
