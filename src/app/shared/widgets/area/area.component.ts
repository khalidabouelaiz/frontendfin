import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ApiAppService } from '../../../Service/api-app.service';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  chartOptions: {};
  @Input() data: any = [];

  Highcharts = Highcharts;
  countTickets = 0;

  constructor(public apiApp: ApiAppService) {}

  ngOnInit() {
    this.apiApp.getPlayedTickets().subscribe((data: any) => {
      this.countTickets = data.length;
      console.log('tickets', this.countTickets);
      this.chart();
    });
  }

  chart() {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Tickets',
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: Highcharts.theme || 'black',
            },
          },
          showInLegend: true,
        },
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
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'tickets',
              y: 150,
            },
            {
              name: 'tickets joués',
              y: this.countTickets,
            },
          ],
        },
      ],
    };

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
