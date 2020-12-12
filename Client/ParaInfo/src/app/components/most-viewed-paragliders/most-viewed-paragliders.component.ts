import { Component, OnInit } from '@angular/core';
import { Paraglider } from 'src/app/models/Paraglider';
import { ParagliderService } from 'src/app/services/paraglider.service';

@Component({
  selector: 'app-most-viewed-paragliders',
  templateUrl: './most-viewed-paragliders.component.html',
  styleUrls: ['./most-viewed-paragliders.component.css']
})
export class MostViewedParaglidersComponent implements OnInit {
  paragliders: Array<Paraglider> = new Array<Paraglider>();
  constructor(private paraService:ParagliderService) { }

  ngOnInit(): void {
    this.paraService.getAllByCount(4).subscribe(data => {
      this.paragliders = data;
      console.log(data[0]);
    })
  }

}
