import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
@Component({
  selector: 'app-question-set',
  standalone: true,
  imports: [RouterLink,CommonModule,ScrollingModule],
  templateUrl: './question-set.component.html',
  styleUrl: './question-set.component.css'
})
export class QuestionSetComponent implements OnInit{

 private router = inject(Router);
 private commonService = inject(CommonService);
 private activeroute = inject(ActivatedRoute);
 course:any=null;
 selectIndex:any;
 examSetting:any;
 ngOnInit(): void {
 if(this.commonService.isBrowser())
  {
    const slug= this.activeroute.snapshot.paramMap.get('slug');
    this.selectIndex=this.activeroute.snapshot.paramMap.get('index');
    this.fetchQuestion(slug);
    this.fetchexamSetting(slug);
  }
 }
 fetchQuestion(slug:any)
 {
  this.commonService.postJsonData("api/examination/question",{slug:slug}).subscribe((result:any)=>{
  if(result.status=='success')
    {
     this.course=result?.data;
     this.course.questions = this.course?.questions.map((q:any) => ({
      ...q,
      correct_answer: null
    }));
    }

  })
 }
  fetchexamSetting(slug:any)
 {
  this.commonService.postJsonData("api/examination/setting",{slug:slug}).subscribe((result:any)=>{
  if(result.status=='success')
  {
   this.examSetting=result.data;
  }

  })
 }
 chooseAnswer(index:any,answer:any)
 {
  this.course.questions[index].correct_answer=answer;
 }
 submitAnswer()
 {
  const total_question=this.course.questions.length;
  const total_leave_questios=this.course.questions.filter((q:any)=>q.correct_answer==null);

  if(total_leave_questios.length==total_question)
  {

    this.commonService.showError("Please answer at least one question before submitting");
    return;
  }
      const answered_questions=this.course.questions.filter((q:any)=>q.correct_answer!=null);
      const answerSheet = answered_questions.map((q: any) => ({
      question_id: q.id,
      answer: q.correct_answer
    }));
    const answerData={answerSheet:answerSheet,exam_setting_id:this.examSetting?.id};
    this.commonService.postJsonData("api/examination/submit-answer",answerData).subscribe(result=>{
    if(result.status=='success')
    {
      this.commonService.showSuccess(result?.message);
      this.router.navigate(['exam/result',this.course.slug]);
    }
    })
 }
}
