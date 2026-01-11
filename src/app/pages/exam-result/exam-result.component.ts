import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions
} from 'ng-apexcharts';

@Component({
  selector: 'app-exam-result',
  standalone: true,
  imports: [RouterLink,CommonModule,NgApexchartsModule],
  templateUrl: './exam-result.component.html',

  styleUrl: './exam-result.component.css'
})
export class ExamResultComponent implements OnInit {

private router = inject(Router);
public commonService = inject(CommonService);
private activeroute = inject(ActivatedRoute);
ChartOptions:any;
examresult:any=null;
async ngOnInit() {
if(this.commonService.isBrowser())
{

   const slug= this.activeroute.snapshot.paramMap.get('slug');
   this.examresult=await this.fetchResult(slug);
   const remain_percent=100-this.examresult?.percentage;

   this.ChartOptions = {
    series: [parseInt(this.examresult.percentage), remain_percent],
    chart: {
      type: 'donut',
      height: 200
    },

    //labels: ['', ''],
    colors: ['#6bbf1d', '#e0e0e0'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,

            total: {
              show: true,
              label: 'Right Answer',
              formatter: () => `${parseInt(this.examresult.percentage)}%`
            }
          }
        }
      }
    }
  };

}
}
fetchResult(slug:any)
{
  return new Promise((resolve,reject)=>{
  this.commonService.postJsonData("api/examination/view-result",{slug:slug}).subscribe(result=>{
  if(result.status=='success')
    {
      resolve(result.data);
    }
    else{
      reject([]);
    }
  });
  });

}

}
