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
  id: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService:GetProductsService) {
  }
  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.id = this.route.snapshot.params.id;
    if (!GlobalConstants.validDetailPaths.includes(this.type.toLowerCase())) {
      this.router.navigate(['**']);
    }
    //let product = this.productsService.getOne()
  }

}
