import { Component, Input, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {
  showDetails: boolean = true;
  brand:any;
  @Input() brandName:any
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.brandService.getBrand(this.brandName).subscribe(data => {
      this.brand = data;
    });
  }
  
  toggleDetails() {
    this.showDetails = !this.showDetails
  }
}
