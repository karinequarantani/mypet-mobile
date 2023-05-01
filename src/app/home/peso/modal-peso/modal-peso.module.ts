import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SpinnerComponentModule } from 'src/app/components/spinner/spinner.module';
import { ModalPesoComponent } from './modal-peso.component';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpinnerComponentModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  declarations: [ModalPesoComponent]
})
export class ModalWeightModule { }
