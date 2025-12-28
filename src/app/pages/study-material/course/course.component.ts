import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {

  private router = inject(Router);
  private commonService = inject(CommonService);
  public courses:any=[];
  public selectedIndex = 0;
  @Output() changeCourse = new EventEmitter<any>()
  async ngOnInit() {
  if(this.commonService.isBrowser())
    {
      this.courses=await this.fetch();
      this.changeCourse.emit({slug:this.courses[0]?.slug,selectedIndex:this.selectedIndex})
    }
  }
  async fetch()
  {
    return new Promise((resolve,reject)=>{
      this.commonService.getData("api/course").subscribe(res=>{
      if(res.status=='success')
      {
        resolve(res.data);
      }
      else{
        reject([]);
      }
    })
    })

  }

selectCourse(index: number,item:any) {
  this.changeCourse.emit({slug:item?.slug,selectedIndex:index})
  this.selectedIndex = index;
}
}
