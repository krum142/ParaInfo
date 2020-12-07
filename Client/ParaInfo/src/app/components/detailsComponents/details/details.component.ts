import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/globalConstants';
import { GetProductsService } from 'src/app/services/get-products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  type: string = "";
  brand: string = "";
  model: any;
  product:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.brand = this.route.snapshot.params.brand;
    this.model = this.route.snapshot.params.model;
    if (!GlobalConstants.validDetailPaths.includes(this.type.toLowerCase())) {
      this.router.navigate(['**']);
    }
  }

}
