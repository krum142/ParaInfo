import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.css']
})
export class BrandFormComponent implements OnInit {
  createBrandForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {
    this.createBrandForm = this.fb.group({
      'name':['',[Validators.required]],
      'imageUrl':['',[Validators.required]],
      'description':['',Validators.maxLength(1000)]
    })
   }

  ngOnInit(): void {
  }

  createBrand(){
    if(this.createBrandForm.status === "VALID"){
      this.brandService.create(this.createBrandForm.value).subscribe(data => {
        if(data !== null){
          this.toastr.success("Brand Created","Created");
          this.router.navigate(['']);
        }
      });
    }
  }

  get name() {
    return this.createBrandForm.get('name');
  }
}
