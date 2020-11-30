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
  brand:any;
  name:string;
  showDetails:boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService) {
    this.name = this.route.snapshot.params.name;
  }

  ngOnInit(): void {
    this.brandService.getBrand(this.name).subscribe(data => {
      this.brand = data;
    });
  }

  toggleDetails(){
    this.showDetails = !this.showDetails
  }
}
