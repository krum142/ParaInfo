import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-most-viewed-brands',
  templateUrl: './most-viewed-brands.component.html',
  styleUrls: ['./most-viewed-brands.component.css']
})
export class MostViewedBrandsComponent implements OnInit {
  brands: Array<Brand> = new Array<Brand>();
  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService.getAllByCount(4).subscribe(data => {
      this.brands = data;
    })
  }

}
