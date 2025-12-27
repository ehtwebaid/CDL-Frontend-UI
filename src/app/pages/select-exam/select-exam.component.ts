import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-select-exam',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './select-exam.component.html',
  styles: [`:host { display: block; width: 90%; }`], // Add this line
  styleUrl: './select-exam.component.css'
})
export class SelectExamComponent {

}
