import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ParagliderService } from 'src/app/services/paraglider.service';
import { ModelValidator } from 'src/app/services/validators/model-validator';

@Component({
  selector: 'app-create-paraglider',
  templateUrl: './create-paraglider.component.html',
  styleUrls: ['./create-paraglider.component.css']
})
export class CreateParagliderComponent implements OnInit {
  createParagliderForm: FormGroup
  brandName: string
  modelName: any;
  filterTextChanged: Subject<string> = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modelValidator: ModelValidator,
    private paraService: ParagliderService) {

    this.brandName = this.route.snapshot.params.brandName;
    this.createParagliderForm = this.fb.group({
      'brand': this.brandName,
      'model': ['',[Validators.required, Validators.maxLength(30)],modelValidator.checkModel.bind(modelValidator)],
      'price': ['', [Validators.pattern("^[0-9.-]*$"), Validators.maxLength(20)]],
      'sizes': this.fb.array([this.addSizeGroup()]),
    });


  }

  ngOnInit(): void {
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
      'nakedPilot': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'inflightWeight': ['', [Validators.pattern("^[0-9,.-]*$"), Validators.maxLength(30)]],
      'wingLoading': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'minSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'trimSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'maxSpeed': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'minSinkRate': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
      'certification': ['', Validators.maxLength(30)],
    });
  }

  addArea() {
    return this.fb.group({
      'area': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'span': ['', [Validators.pattern("^[0-9]*$"), Validators.maxLength(30)]],
      'aspectRatio': ['', [Validators.pattern("^[0-9,.]*$"), Validators.maxLength(30)]],
    })
  }



  log(x: any) {
    console.log(x);
  }

  getControl(group: any, property: string) {
    return group.controls[property];
  }

  doesModelExist(model: string): any {
    if (model) {
      this.paraService.getModel(model).subscribe(data => {
        return data;
      })
    }
  }

  onFilterTextChanged(filterText: string): any {
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(filterQuery => {
          //this.modelName = this.doesModelExist(filterQuery)
          this.paraService.getModel(filterQuery).subscribe(data => {
            if(data.model){
              this.modelName = true;
            }
            this.modelName = false;
          })
        });
    }
    this.filterTextChanged.next(filterText);
  }

  createParaglider() {
    this.paraService.create(this.createParagliderForm.value).subscribe();
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
