import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { ModalCirurgiaComponent } from './modal-cirurgia.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpinnerComponentModule
  ],
  declarations: [ModalCirurgiaComponent]
})
export class ModalSurgeriesModule { }
