import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/common/globalConstants';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  brandName: string = "";
  type: string = "";
  modelName: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,) {
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.brandName = this.route.snapshot.params.brandName;
    if(!GlobalConstants.validCreateType.includes(this.type)){
      this.brandService.getBrand(this.brandName).subscribe(res => { }, err => {
        this.router.navigate(['**']);
      })
    }
  }
}
