import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GliderService } from 'src/app/services/glider.service';

@Component({
  selector: 'app-create-glider',
  templateUrl: './create-glider.component.html',
  styleUrls: ['./create-glider.component.css']
})
export class CreateGliderComponent implements OnInit {

  constructor(private gliderService: GliderService) { }

  ngOnInit(): void {
  }

  createGlider(){
    this.gliderService.create().subscribe(x => {console.log(x)})
  }
}
