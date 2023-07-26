import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * This component will render the info card component
 * @export
 * @class InfoCardComponent
 * @implements {OnInit}
 * @param {string} title
 * @param {string} description
 */

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public info: {
      title: string;
      description: string;
    }
  ) {}

  ngOnInit(): void {}
}
