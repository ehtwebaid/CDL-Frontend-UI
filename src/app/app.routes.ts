import { ExamResultComponent } from './pages/exam-result/exam-result.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) }, // 👈 Add this
  { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent) }, // 👈 Add this

  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) }, // 👈 Add this
      { path: 'study-material', loadComponent: () => import('./pages/study-material/study-material.component').then(m => m.StudyMaterialComponent) },
      { path: 'exam', loadComponent: () => import('./pages/select-exam/select-exam.component').then(m => m.SelectExamComponent) },
      { path: 'exam/instruction/:slug', loadComponent: () => import('./pages/exam-instruction/exam-instruction.component').then(m => m.ExamInstructionComponent) },
      { path: 'exam/result/:slug', loadComponent: () => import('./pages/exam-result/exam-result.component').then(m => m.ExamResultComponent) },
      { path: 'exam/questionset/:slug', loadComponent: () => import('./pages/question-set/question-set.component').then(m => m.QuestionSetComponent) },

    ]

  }
];
