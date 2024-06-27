import { Component } from '@angular/core';
import {AdService} from "../services/ad.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  visible: boolean = false;

  unapprovedAds: any[] = [];

  constructor(private adService: AdService) {}

  ngOnInit(): void {
    this.fetchAllAds();
  }

  fetchAllAds(): void {
    this.adService.getAllAds().subscribe(
      (ads) => {
        this.unapprovedAds = ads.filter(ad => !ad.isApproved);
      },
      (error) => {
        console.error('Error fetching ads:', error);
      }
    );
  }

  approveAd(id: string): void {
    this.adService.approveAd(id).subscribe(
      (ad) => {
        console.log(`Ad with ID ${id} approved successfully.`);
        this.unapprovedAds = this.unapprovedAds.filter(a => a._id !== id);
      },
      (error) => {
        console.error('Error approving ad:', error);
      }
    );
  }

  disapproveAd(id:string){
    this.adService.deleteAd(id).subscribe(
      () => {
        console.log(`Ad with ID ${id} disapproved successfully.`);
        this.unapprovedAds = this.unapprovedAds.filter(a => a._id !== id);
      },
      (error) => {
        console.error('Error deleting ad:', error);
      }
    );
  }
}
