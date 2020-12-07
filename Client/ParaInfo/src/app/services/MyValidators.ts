import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ParagliderService } from './paraglider.service';

@Injectable()
export class MyValidators {

    debouncer: any;

    constructor(public paraService: ParagliderService) {

    }
    checkModel(brand: string, control: FormControl): any {
        clearTimeout(this.debouncer);

        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                this.paraService.getModel(brand, control.value).subscribe((res) => {
                    if (res.model && res.model.toLowerCase() === control.value.toLowerCase()) {
                        resolve({ 'modelAlreadyExists': true });
                    }
                    else {
                        resolve(null);
                    }
                }, (err) => {
                    resolve({ 'modelAlreadyExists': true });
                });

            }, 500);
        });
    }

    checkFile(control: FormControl): any {
        let validTypes = [
            "image/apng", "image/bmp", "image/gif",
            "image/jpeg", "image/png",]

        clearTimeout(this.debouncer);
        return new Promise(resolve => {
            this.debouncer = setTimeout(() => {
                //console.log(!validTypes.includes(control.value.type));
                if (!validTypes.includes(control.value.type)) {
                    resolve({ "wrongFileType": true });
                }
                if (control.value.size > 2000000) {
                    resolve({ "wrongFileSize": true });
                }
                resolve(null);
            }, 500)
        });
    }
}