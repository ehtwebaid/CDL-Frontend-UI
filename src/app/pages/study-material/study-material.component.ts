import { Component, inject, SimpleChanges } from '@angular/core';
import { CourseComponent } from './course/course.component';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-study-material',
  standalone: true,
  imports: [CourseComponent,ScrollingModule,CommonModule],
  templateUrl: './study-material.component.html',
  styleUrl: './study-material.component.css'
})
export class StudyMaterialComponent {
  private router = inject(Router);
  private commonService = inject(CommonService);
  public study_materials:any=[];
  public study_material_rows :any=[]
  public selectedIndex:any;
  itemsPerRow = 3;
  itemSize = 230; // card height

  changeCourse(data:any)
  {
    this.commonService.postJsonData("api/course/study-material",{slug:data.slug}).subscribe(res=>{
      if(res.status=='success')
      {
        this.selectedIndex=data?.selectedIndex;
        this.study_materials=res.data;

      }
    })
  }
  trackById(index: number, item: any) {
  return item._id || index;
}
get studyRows() {
  const rows = [];
  for (let i = 0; i < this.study_materials.length; i += this.itemsPerRow) {
    rows.push(this.study_materials.slice(i, i + this.itemsPerRow));
  }

  return rows;
}
}
