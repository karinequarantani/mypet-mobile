import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalMedicamentoNewComponent } from './modal-medicamento-new.component';
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
  declarations: [ModalMedicamentoNewComponent]
})
export class ModalMedicamentoNewModule { }
