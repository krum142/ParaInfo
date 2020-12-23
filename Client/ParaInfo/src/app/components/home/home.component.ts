import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  brands!: Array<Brand>

  constructor(private brandService:BrandService) {
   }

  ngOnInit(): void {
    
    this.brandService.getAll().subscribe(brands => {
      this.brands = brands;
    })
  }



}
