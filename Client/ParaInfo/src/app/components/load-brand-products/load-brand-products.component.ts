import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-brand-products',
  templateUrl: './load-brand-products.component.html',
  styleUrls: ['./load-brand-products.component.css']
})
export class LoadBrandProductsComponent implements OnInit {

  @Input() brandName: string = "";
  @Input() categoryName: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
