import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-exam-instruction',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './exam-instruction.component.html',
  styleUrl: './exam-instruction.component.css'
})
export class ExamInstructionComponent implements OnInit {

 private router = inject(Router);
 private commonService = inject(CommonService);
 private activeroute = inject(ActivatedRoute);
 course:any=null;
 selectIndex:any;
 ngOnInit(): void {
 if(this.commonService.isBrowser())
  {
    const slug= this.activeroute.snapshot.paramMap.get('slug');
    this.selectIndex=this.activeroute.snapshot.paramMap.get('index');
    this.viewCourse(slug);
  }

 }
 viewCourse(slug:any)
 {
  this.commonService.postJsonData("api/examination/instruction",{slug:slug}).subscribe((result)=>{
  if(result.status=='success')
    {
      this.course=result?.data;
    }
  })
 }
 startExam()
 {
  this.commonService.postJsonData("api/examination/start",{id:this.course?.id}).subscribe(result=>{
  if(result?.status=='success')
    {
      this.commonService.showSuccess(result?.message);
      this.router.navigate(['exam/questionset',this.course.slug,this.selectIndex]);
    }

  })
 }

}
