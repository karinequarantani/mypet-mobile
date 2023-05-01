import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { ModalSurgeriesNewComponent } from './modal-cirurgia-new.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SpinnerComponentModule
  ],
  providers:[],
  declarations: [ModalSurgeriesNewComponent]
})
export class ModalSurgeriesNewModule { }
