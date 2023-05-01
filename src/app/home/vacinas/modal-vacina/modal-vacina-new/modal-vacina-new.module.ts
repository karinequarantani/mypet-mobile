import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalVacinaNewComponent } from './modal-vacina-new.component';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SpinnerComponentModule
  ],
  providers:[],
  declarations: [ModalVacinaNewComponent]
})
export class ModalVacinaNewModule { }
