import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-list-item',
  styleUrls: ['card-list-item.component.scss'],
  templateUrl: 'card-list-item.component.html'

})
export class CardListItemComponent implements OnInit {

  @Input()
  public pet = {} as any;

  public urlSex = '';
  public urlPictureSex = '';
  public urlType = '';

  constructor() {
  }


  ngOnInit() {
    this.urlSex = `../../../assets/icon/${this.pet.gender}.png`;
    this.urlPictureSex = `'../../../assets/${this.pet.breed}.jpg`;
    this.urlType = `../../../assets/icon/${this.pet.breed}.png`;
  }
}
