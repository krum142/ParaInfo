import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.css']
})
export class BrandProductsComponent implements OnInit {
  @Input() brandName: string = "";
  @Input() categoryRoute: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
