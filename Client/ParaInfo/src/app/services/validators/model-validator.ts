import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParagliderService } from '../paraglider.service';

@Injectable()
export class ModelValidator {

    debouncer: any;

    constructor(public paraService: ParagliderService) {

    }
    checkModel(brand: string, control: FormControl): any {
        clearTimeout(this.debouncer);

        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                this.paraService.getModel(brand, control.value).subscribe((res) => {
                    if (res.model === control.value.toLowerCase()) {
                        resolve({ 'modelAlreadyExists': true });
                    }
                    else {
                        resolve(null);
                    }
                }, (err) => {
                    resolve({ 'modelAlreadyExists': true });
                });

            }, 1000);
        });
    }
}