import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/services/form-data.service';
import { MyValidators } from 'src/app/services/MyValidators';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.css']
})
export class ReserveFormComponent implements OnInit {

  @Input() brandName: string = "";
  @Input() editModel: string = "";
  @Input() edit: boolean = false;
  createReserveForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private myValidators: MyValidators,
    private reserveService: ReserveService,
    private formdataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.createReserveForm = this.fb.group({
      'id': [''],
      'brand': this.brandName,
      'model': ['', [Validators.required, Validators.maxLength(30)], this.myValidators.checkModel.bind(this.myValidators, 'reserve', this.brandName, this.editModel, this.edit)],
      'file': ['', !this.edit ? Validators.required : [], this.myValidators.checkFile.bind(this.myValidators)],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'description': ['', [Validators.maxLength(1000)]],
      'sizes': this.fb.array(this.edit ? [] : [this.addSizeGroup()]),
    });

    if (this.edit) {
      this.reserveService.getModel(this.brandName, this.editModel).subscribe(data => {
        this.addItemsToForm(data);
      })
    }
  }

  addItemsToForm(data: any): void {
    this.createReserveForm.controls['id'].patchValue(data.id);
    this.createReserveForm.controls['model'].patchValue(data.model);
    this.createReserveForm.controls['price'].patchValue(data.price);
    this.createReserveForm.controls['description'].patchValue(data.description);
    data.sizes.forEach((size: any) => {
      let group = this.addSizeGroup();
      group.patchValue(size);
      this.createReserveForm.controls['sizes'].push(group);
    })
  }

  addSizeGroup() {
    return this.fb.group({
      'size': ['', Validators.maxLength(20)],
      'area': ['', Validators.maxLength(20)],
      'maxTow': ['', Validators.maxLength(20)],
      'srAtMax': ['', Validators.maxLength(20)],
      'weight': ['', Validators.maxLength(20)],
      'packingVol': ['', Validators.maxLength(20)],
      'certification': ['', Validators.maxLength(20)]
    })
  }

  createReserve() {
    if (this.createReserveForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createReserveForm.value, null, formData);
      this.reserveService.create(formData).subscribe(data => {
        this.router.navigate([`/details/reserve/${data.brand}/${data.model}`]);
      });
    }
  }

  updateReserve() {
    if (this.createReserveForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createReserveForm.value, null, formData);
      this.reserveService.update(formData).subscribe(data => {
        this.router.navigate([`/details/reserve/${data.brand}/${data.model}`]);
      });
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.createReserveForm.controls.file.patchValue(event.target.files[0]);
    }
  }

  getControl(group: any, property: string) {
    return group.controls[property];
  }

  addSize() {
    this.sizeArray.push(this.addSizeGroup());
  }

  removeSize(index: any) {
    this.sizeArray.removeAt(index);
  }

  get sizeArray() {
    return <FormArray>this.createReserveForm.get('sizes');
  }
}
