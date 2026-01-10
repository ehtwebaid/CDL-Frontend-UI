import { Component, ElementRef, inject, OnInit, SimpleChanges } from '@angular/core';
import { CourseComponent } from './course/course.component';
import { Router, RouterLink } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Fancybox } from '@fancyapps/ui';
import { SearchFilterPipe } from '../../pipe/search-filter.pipe';
import { FormsModule } from '@angular/forms';
import { getToken } from '../../../global/app.global';

@Component({
  selector: 'app-study-material',
  standalone: true,
  imports: [CourseComponent, ScrollingModule, CommonModule, SearchFilterPipe, RouterLink],
  templateUrl: './study-material.component.html',
  styleUrl: './study-material.component.css'
})
export class StudyMaterialComponent implements OnInit {

  private router = inject(Router);
  private commonService = inject(CommonService);
  public study_materials:any=[];
  public study_material_rows :any=[]
  public selectedIndex:any;
  private elRef = inject(ElementRef);
  itemsPerRow = 3;
  itemSize = 230; // card height
  raw_study_materials:any=[];
  loginToken:any;
  selectIndex:any=0;
  ngOnInit(): void {
  if(this.commonService.isBrowser())
  {
    this.loginToken=getToken();
  }
  }
  changeCourse(data:any)
  {
    this.selectIndex=data?.selectedIndex;
    this.commonService.postJsonData("api/course/study-material",{slug:data.slug}).subscribe(res=>{
      if(res.status=='success')
      {
        this.selectedIndex=data?.selectedIndex;
        this.study_materials=res.data;
        this.study_materials=this.study_materials.map((item:any) => {
        item.src=item?.file;
        return item;
        });
        this.raw_study_materials=this.study_materials;

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
  ngAfterViewInit(): void {
    if (this.commonService.isBrowser()) {

      Fancybox.bind(this.elRef.nativeElement, '[data-fancybox]', {});
    }


  }
   openGallery(startIndex: number = 0) {
    Fancybox.show(this.study_materials, {
      startIndex
    });
  }
  searchFilter(ev:any)
  {
      const searchText=ev.target.value;
      this.study_materials=this.raw_study_materials;
      this.study_materials=this.study_materials.filter((item:any) =>
      item?.originalName?.toLowerCase().includes(searchText)
    );
  }

}
