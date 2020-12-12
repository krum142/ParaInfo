import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GetProductsService } from 'src/app/services/get-products.service';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-reserve-details',
  templateUrl: './reserve-details.component.html',
  styleUrls: ['./reserve-details.component.css']
})
export class ReserveDetailsComponent implements OnInit {
  @Input() brand: string = "";
  @Input() model: string = "";
  showDescription:boolean = true;
  reserve: any
  isUserLogged: boolean = this.authService.isAuthenticated();
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private reserveService: ReserveService,
    private productsService:GetProductsService) {
   }

  ngOnInit(): void {
    this.productsService.getOne("reserve",this.brand,this.model).subscribe(data => {
      this.reserve = data;
      if(!data.id){
        this.router.navigate(['**'])
      }
    })
  }

  deleteReserve(id:any){
    this.reserveService.delete(id).subscribe(data => {
      this.toastr.success("Reserve Deleted","Deleted");
      this.router.navigate([`/brand/${data.brand}/reserves`]);
    })
  }

  toggleDescription() {
    this.showDescription = !this.showDescription
  }
}
