import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ad } from './ad';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  
  adForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.adForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [''],
      contactInfo: this.formBuilder.array([
        this.createContactInfo()
      ])
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
      console.log(adData);
    }
  }
}