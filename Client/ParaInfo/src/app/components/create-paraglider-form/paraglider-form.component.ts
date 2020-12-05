import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormDataService } from 'src/app/services/form-data.service';
import { ParagliderService } from 'src/app/services/paraglider.service';
import { ModelValidator } from 'src/app/services/validators/model-validator';

@Component({
  selector: 'app-paraglider-form',
  templateUrl: './paraglider-form.component.html',
  styleUrls: ['./paraglider-form.component.css']
})
export class ParagliderFormComponent implements OnInit {
  @Input() brandName: string
  createParagliderForm: FormGroup
  
  modelName: any;
  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modelValidator: ModelValidator,
    private formdataService: FormDataService,
    private paraService: ParagliderService) {

    this.brandName = this.route.snapshot.params.brandName;
    this.createParagliderForm = this.fb.group({
      'brand': this.brandName,
      'model': ['', [Validators.required, Validators.maxLength(30)], modelValidator.checkModel.bind(modelValidator, this.brandName)],
      'file': ['', [Validators.required]],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'sizes': this.fb.array([this.addSizeGroup()]),
    });
  }

  ngOnInit(): void {

    this.createParagliderForm.patchValue({
      "model": "epsilon 1023",
    })
  }

  addSizeGroup() {
    return this.fb.group({
      'wingSize': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'flat': this.addArea(),
      'proj': this.addArea(),
      'flattening': ['', [Validators.pattern("^[0-9,.%]*$"), Validators.maxLength(30)]],
      'upperSurface': ['', Validators.maxLength(30)],
      'underSurface': ['', Validators.maxLength(30)],
      'numberCells': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'weight': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'risers': ['', Validators.maxLength(50)],
      'nakedPilot': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(30)]],
      'inflightWeight': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(30)]],
      'wingLoading': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'minSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'trimSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'maxSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'minSinkRate': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'certification': ['', Validators.maxLength(30)],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.createParagliderForm.get('file')?.setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }

    console.log(this.createParagliderForm.controls);
  }

  addArea() {
    return this.fb.group({
      'area': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'span': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'aspectRatio': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
    })
  }

  getControl(group: any, property: string) {
    return group.controls[property];
  }

  createParaglider() {
    if (this.createParagliderForm.status === "VALID") {
      let formData = new FormData;
      this.formdataService.convertJsontoFormData(this.createParagliderForm.value,null,formData);
      this.paraService.create(formData).subscribe();
    }
  }

  addSize() {
    this.sizeArray.push(this.addSizeGroup());
  }

  removeSize(index: any) {
    this.sizeArray.removeAt(index);
  }

  get sizeArray() {
    return <FormArray>this.createParagliderForm.get('sizes');
  }
}
