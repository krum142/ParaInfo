import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/globalConstants';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  brand: string = "";
  type: string = "";
  model: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService) {
  }
  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.brand = this.route.snapshot.params.brand;
    this.model = this.route.snapshot.params.model;
    console.log(`${this.type} ${this.brand} ${this.model}`)
    if(!GlobalConstants.validCreateType.includes(this.type)){
      this.brandService.getBrand(this.brand).subscribe(res => { }, err => {
        this.router.navigate(['**']);
      })
    }
  }

}
