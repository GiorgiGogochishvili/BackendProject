import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ad } from '../ad';
import {AdService} from "../services/ad.service";
import {last} from "rxjs";
import {AdminService} from "../services/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  adForm!: FormGroup;
  editAdForm!:FormGroup;
  displayModal: boolean = false;
  isAdmin: boolean = false;
  showEdit: { [key: string]: boolean } = {};
  constructor(private formBuilder: FormBuilder,private adService: AdService,private adminService:AdminService,private router: Router) { }
  fullName: string = '';
  email: string = '';
  ads: Ad[] = [];

    preloadedAds: any[] = [
    {
      title: 'Turkish Camper',
      description: 'Lorem ipsum Lorem ipsum Lorem ipsum.',
      date: new Date(),
      isApproved: true,
      contactInfo: [
        { fullName: 'John Doghlu', email: 'john.doghlu@example.com' }
      ]
    },
    {
      title: 'Poland',
      description: 'Lorem ipsum Lorem ipsum Lorem ipsum',
      date: new Date(),
      isApproved: true,
      contactInfo: [
        { fullName: 'John Doevichi', email: 'john.doevichi@example.com' }
      ]
    },
    {
      title: 'Dargis Eqsperti',
      description: 'Lorem ipsum Lorem ipsum Lorem ipsum',
      date: new Date(),
      isApproved: true,
      contactInfo: [
        { fullName: 'John Bottomtextovichi', email: 'john.bottomtextovichi@example.com' }
      ]
    }
  ];



    addInitialRecords():void{
      for (const ad of this.preloadedAds) {

        this.adService.createAd(ad).subscribe(
          (response) => {
            console.log('Ad created successfully:', response);
            this.hideDialog();        },
          (error) => {
            console.error('Error creating ad:', error);
          }
        );
      }
      this.refreshPage();
    }
  ngOnInit(): void {

    this.isAdmin = this.adminService.getIsAdmin();
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
    this.editAdForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [currentDate],
      contactInfo: this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      })
    });
    this.adService.getAllAds().subscribe((data: Ad[]) => {
      this.ads = data;
      this.ads.forEach(ad => {
        this.showEdit[ad._id] = false;
      });
    });

    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

  }


  showDialog() {
    this.displayModal = true;
  }

  showEditDialog(adId: string) {
    this.showEdit[adId] = true;
    console.log(this.showEdit[adId]);
  }
  hideDialog() {
    this.displayModal = false;
  }
  hideEditDialog(adId: string) {
    this.showEdit[adId] = false;
    this.editAdForm.reset();
  }
  onSubmit() {
    if (this.adForm.valid) {

      const adData: Ad = this.adForm.value;

      this.adService.createAd(adData).subscribe(
        (response) => {
          console.log('Ad created successfully:', response);
          this.hideDialog();        },
        (error) => {
          console.error('Error creating ad:', error);
        }
      );
    }

  }
  refreshPage() {
    window.location.reload();
  }
  protected readonly last = last;

  deleteAd(id: string) {
    this.adService.deleteAd(id).subscribe(
      () => {
        console.log(`Ad with ID ${id} deleted successfully.`);
      },
      (error) => {
        console.error('Error deleting ad:', error);
      }
    );
    this.ads = this.ads.filter(a => a._id !== id);
  }

  onSubmitEdit(id:string) {
    const adData: Ad = this.editAdForm.value;

    this.adService.updateAd(id,adData).subscribe(
      (response) => {
        console.log('Ad edited successfully:', response);
        this.hideEditDialog(id);  },
      (error) => {
        console.error('Error editing ad:', error);
      }
    );
      this.refreshPage();
  }
}
