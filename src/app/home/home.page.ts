import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public appPages = [
    { title: 'Meus pets', url: '/home/my-pets', icon: 'list-sharp' },
    { title: 'Vacinas', url: '/home/vacinas', icon: 'bandage-sharp' },
    { title: 'Medicamentos', url: '/home/medicamentos', icon: 'bag-add-sharp' },
    { title: 'Cirurgias', url: '/home/cirurgias', icon: 'medical-sharp' },
    { title: 'Pesos', url: '/home/pesos', icon: 'cellular-sharp' },
    { title: 'Caminhadas', url: '/home/caminhadas', icon: 'walk-sharp' }
  ];


  constructor(private router: Router) {}

  navigate(){
    this.router.navigate(['login']);
  }
}
