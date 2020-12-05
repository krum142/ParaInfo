import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-create-paraglider',
  templateUrl: './create-paraglider.component.html',
  styleUrls: ['./create-paraglider.component.css']
})
export class CreateParagliderComponent implements OnInit {
  brandName: string
  modelName: any;
  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,) {
    this.brandName = this.route.snapshot.params.brandName;
  }

  ngOnInit(): void {
    this.brandService.getBrand(this.brandName).subscribe(res => { }, err => {
      this.router.navigate(['**']);
    })
  }
}
