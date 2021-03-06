import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GetProductsService } from 'src/app/services/get-products.service';
import { HarnessService } from 'src/app/services/harness.service';

@Component({
  selector: 'app-harness-details',
  templateUrl: './harness-details.component.html',
  styleUrls: ['./harness-details.component.css']
})
export class HarnessDetailsComponent implements OnInit {
  @Input() brand: string = "";
  @Input() model: string = "";
  showDescription:boolean = true;
  harness: any
  isUserLogged: boolean = this.authService.isAuthenticated();
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private harnessService: HarnessService,
    private productsService:GetProductsService) {
   }

  ngOnInit(): void {
    this.productsService.getOne("harness",this.brand,this.model).subscribe(data => {
      this.harness = data;
      if(!data.id){
        this.router.navigate(['**'])
      }
    })
  }

  deleteHarness(id:any){
    this.harnessService.delete(id).subscribe(data => {
      this.toastr.success("Harness Deleted","Deleted");
      this.router.navigate([`/brand/${data.brand}/harnesses`]);
    })
  }

  toggleDescription() {
    this.showDescription = !this.showDescription
  }
}
