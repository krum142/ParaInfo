import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/globalConstants';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brand: any;
  categoryName: string;
  categoryRouteName:string = "";
  brandName: string;
  showDetails: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private router: Router) {
      
    this.brandName = this.route.snapshot.params.brandName;
    this.categoryName = this.route.snapshot.params.category;
    if(!this.categoryName){
      this.categoryName = "paragliders";
    }
    console.log(this.categoryName)
  }

  ngOnInit(): void {
    this.categoryRouteName = GlobalConstants.categorys[this.categoryName];
    if (!this.categoryName) {
      this.categoryName = GlobalConstants.validCategoriePaths[0];
    }
    else if (!GlobalConstants.validCategoriePaths.includes(this.categoryName)) {
      this.router.navigate(['**']);
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails
  }
}
