import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { ModalWeightNewComponent } from './modal-peso-new.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SpinnerComponentModule
  ],
  providers:[],
  declarations: [ModalWeightNewComponent]
})
export class ModalWeightNewModule { }
