import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brand: any;
  categoryRoute: string;
  brandName: string;
  showDetails: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService) {

    this.brandName = this.route.snapshot.params.name;
    this.categoryRoute = this.route.snapshot.params.category;
    if(!this.categoryRoute){
      this.categoryRoute = "Paragliders";
    }
  }

  ngOnInit(): void {
    this.brandService.getBrand(this.brandName).subscribe(data => {
      this.brand = data;
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails
  }
}
