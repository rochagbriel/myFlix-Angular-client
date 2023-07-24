import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public info: {
      title: string,
      description: string,
    }
  ) { }

  ngOnInit(): void { }

}


