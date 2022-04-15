import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './Components/question/question.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';


const routes: Routes = [
  { path: '',  redirectTo: 'welcome',pathMatch: 'full'},
  {path:"question", component: QuestionComponent},
  { path:"welcome", component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
