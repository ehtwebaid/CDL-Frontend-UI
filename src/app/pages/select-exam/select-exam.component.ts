import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../service/common.service';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-exam',
  standalone: true,
  imports: [RouterLink, CommonModule, ScrollingModule],
  templateUrl: './select-exam.component.html',
  styleUrl: './select-exam.component.css'
})
export class SelectExamComponent implements OnInit {

  private router = inject(Router);
  private commonService = inject(CommonService);
  public courses: any = [];
  public selectedIndex = 0;

  async ngOnInit() {
    if (this.commonService.isBrowser()) {
      this.courses = await this.fetch();
    }
  }
  async fetch() {
    return new Promise((resolve, reject) => {
      this.commonService.getData("api/course").subscribe(res => {
        if (res.status == 'success') {
          resolve(res.data);
        }
        else {
          reject([]);
        }
      })
    })

  }
}
