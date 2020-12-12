import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormDataService } from 'src/app/services/form-data.service';
import { HarnessService } from 'src/app/services/harness.service';
import { MyValidators } from 'src/app/services/MyValidators';

@Component({
  selector: 'app-harness-form',
  templateUrl: './harness-form.component.html',
  styleUrls: ['./harness-form.component.css']
})
export class HarnessFormComponent implements OnInit {
  @Input() brandName: string = "";
  @Input() editModel: string = "";
  @Input() edit: boolean = false;
  createHarnessForm: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private myValidators: MyValidators,
    private harnessService: HarnessService,
    private formdataService: FormDataService) { }

  ngOnInit(): void {
    this.createHarnessForm = this.fb.group({
      'id': [''],
      'brand': this.brandName,
      'model': ['', [Validators.required, Validators.maxLength(30)], this.myValidators.checkModel.bind(this.myValidators, 'harness', this.brandName, this.editModel, this.edit)],
      'file': ['', !this.edit ? Validators.required : [], this.myValidators.checkFile.bind(this.myValidators)],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'description': ['', [Validators.maxLength(1000)]],
      'sizes': this.fb.array(this.edit ? [] : [this.addSizeGroup()]),
    });

    if (this.edit) {
      this.harnessService.getModel(this.brandName, this.editModel).subscribe(data => {
        this.addItemsToForm(data);
      })
    }
  }

  addItemsToForm(data: any): void {
    this.createHarnessForm.controls['id'].patchValue(data.id);
    this.createHarnessForm.controls['model'].patchValue(data.model);
    this.createHarnessForm.controls['price'].patchValue(data.price);
    this.createHarnessForm.controls['description'].patchValue(data.description);
    data.sizes.forEach((size: any) => {
      let group = this.addSizeGroup();
      group.patchValue(size);
      this.createHarnessForm.controls['sizes'].push(group);
    })
  }

  addSizeGroup() {
    return this.fb.group({
      'size': ['', Validators.maxLength(20)],
      'pilotHeight': ['', Validators.maxLength(20)],
      'seatWidth': ['', Validators.maxLength(20)],
      'seatDepth': ['', Validators.maxLength(20)],
      'carabinerHeight': ['', Validators.maxLength(20)],
      'chestStrapWidth': ['', Validators.maxLength(20)],
      'harnessWeight': ['', Validators.maxLength(20)],
      'certification': ['', Validators.maxLength(20)]
    })
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.createHarnessForm.controls.file.patchValue(event.target.files[0]);
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

  createHarness() {
    if (this.createHarnessForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createHarnessForm.value, null, formData);
      this.harnessService.create(formData).subscribe(data => {
        this.toastr.success('Harness Created','Created');
        this.router.navigate([`/details/harness/${data.brand}/${data.model}`]);
      });
    }
  }

  updateHarness() {
    if (this.createHarnessForm.status === "VALID") {
      let formData = new FormData();
      this.formdataService.convertJsontoFormData(this.createHarnessForm.value, null, formData);
      this.harnessService.update(formData).subscribe(data => {
        this.toastr.success('Harness Edited','Edited');
        this.router.navigate([`/details/harness/${data.brand}/${data.model}`]);
      });
    }
  }

  get sizeArray() {
    return <FormArray>this.createHarnessForm.get('sizes');
  }
}
