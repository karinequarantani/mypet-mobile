import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalWeightNewComponent } from './modal-peso-new/modal-peso-new.component';
import { EChartsOption } from 'echarts';

interface Pageable {
  offset: number;
  limit: number;
  total: number;
  content: any[];
}
@Component({
  selector: 'app-modal-peso',
  templateUrl: './modal-peso.component.html',
  styleUrls: ['./modal-peso.component.scss', '../../commom-style.page.scss'],
})
export class ModalPesoComponent implements OnInit {

  public data = [];
  public dataLoaded = false;
  public firstLoad = true;
  public chartOption: EChartsOption = {
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} kg'
      }
    },
    grid: {
      left: '1%',
      right: '5%',
      containLabel: true
    },
    tooltip: {
      show: true,
      formatter: (params) => `
        <p><strong>Dia: </strong>${new Intl.DateTimeFormat('pt-br').format(new Date(params.data[0]))}</p><br>
        <span><strong>Peso: </strong>${params.data[1].toFixed(2)} kg</span>`
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ]
  };
  public mergeOptions: EChartsOption = {};

  @Input()
  public pet = {} as any;
  public weights = [] as any;
  public loadingTracker = false;

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.findAllWeight();
  }

  async close() {
    await this.modalController.dismiss();
  }

  async openModal($index, weight) {

   let editingData = null;


    if ($index !== null && weight){
      editingData = {
        $index,
        weight
      };
    }

    const modal = await this.modalController.create({
      component: ModalWeightNewComponent,
      componentProps: {
        pet: this.pet,
        editingData
      }
    });

    modal.onWillDismiss().then(this.findAllWeight);

    return modal.present();
  }

  public formatDate(data: string){
    return new Intl.DateTimeFormat('pt-br').format(new Date(`${data}T00:00:00`));
  }

  async removePeso(weight) {
    this.loadingTracker = true;
    const observable = this.http.delete(`weight/${weight.id}`).subscribe(
      (res) => this.findAllWeight(),
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  }

  private findAllWeight = () => {
    this.loadingTracker = true;
    return this.http.get<Pageable>(`weight/${this.pet.id}`).subscribe(
      (resp) => {
        this.weights = resp.content.sort((a, b) =>  new Date(b.date).getTime() - new Date(a.date).getTime());
        this.updateChart();
        if(this.weights.length === 0 && this.firstLoad) {
          this.firstLoad = false;
          this.openModal(null, null);
        }
      },
      (error) => console.log(error),
      () => this.loadingTracker = false
    );
  };

  private updateChart = () => {
    if(this.weights.length !== 0) {
      this.dataLoaded = true;
      this.data = this.weights.map(w => [`${w.date}T00:00:00`,w.weight]);
      this.mergeOptions = {
        series: [
          {
            data: this.data
          }
        ]
      };
    }
  };
}
