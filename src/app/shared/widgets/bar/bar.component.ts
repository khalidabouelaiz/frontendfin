import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ApiAppService } from '../../../Service/api-app.service';

@Component({
  selector: 'app-widget-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  chartOptions: {};
  @Input() data: any = [];

  Highcharts = Highcharts;
  newUsers = 0;
  countUsers = 0;

  constructor(public apiApp: ApiAppService) {}

  ngOnInit() {
    this.apiApp.getNewUsers().subscribe((data: any) => {
      this.newUsers = data.length;
      this.apiApp.getAllUsers().subscribe((data: any) => {
        this.countUsers = data.length;
        this.chart();
      });
    });
  }

  chart() {
    console.log('couuuunt', this.countUsers);
    console.log('couuuunt', this.newUsers);
    this.chartOptions = {
      chart: {
        zoomType: 'y',
        type: 'bar',
      },
      title: {
        text: 'Clients',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      accessibility: {
        enabled: false,
      },
      xAxis: {
        categories: ['nouveaux clients', 'clients'],
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        max: 30,
        tickInterval: 10,
        title: {
          text: null,
        },
        labels: {
          overflow: 'justify',
          format: '{value}%',
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            format: '{y}%',
          },
        },
      },
      tooltip: {
        valueSuffix: '%',
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: 'clients',
          color: '#a5d6a7',
          borderColor: '#60A465',
          data: [this.newUsers, this.countUsers],
        },
      ],
    };

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
