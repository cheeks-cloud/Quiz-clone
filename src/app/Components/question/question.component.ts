import { Component, OnInit } from '@angular/core';
import { interval,Observable } from 'rxjs';
import { QuestionServiceService } from 'src/app/Services/question-service.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name:string ="";
  public questionList:any  = [];
  public currentQuestion: number = 0;
  public points:number = 0;
 
   counter = 60;
   correctAnswer:number = 0;
    wrongAnswer:number = 0
    interval$: any;
    progress:string = "0"

  
  //inject service
  constructor( private questionService: QuestionServiceService) { }
  ///to put name on local stooirage
  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions() 
    this.startCounter()//call function

  }
  //call method to get quizes from api
  getAllQuestions(){
  this.questionService.getQuestionJson()
  .subscribe( res =>{
    this.questionList = res.questions;//call api questions
  })
  }nextQuestion(){
   this.currentQuestion++;
  }
  previousQuestion(){
   this.currentQuestion--;
  }

  answer(currentQuestion: number, option:any){
    if(option.correct){
      this.points +=10;
      this.correctAnswer++
      setTimeout(() =>{
      this.currentQuestion++
      this.resetCounter()
      this.getProgress()
      },1000);

    } else {
      setTimeout(() => {
      this.points -=10;
      this.currentQuestion++
      this.wrongAnswer++
      this.resetCounter()
      this.getProgress()
    },1000)
  }
}

  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(value =>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter = 60;
        this.points -=10
      }
      
    })
  }
  stopCounter(){
    this.interval$.unsubscribe()
    this.counter = 0
  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60
    this.startCounter()
  }
  resetQuiz(){
    this.resetCounter()
    this.getAllQuestions()
    this.points=0
    this.counter = 60
    this.currentQuestion = 0
  }

  getProgress(){
    this.progress = ((this.currentQuestion/this.questionList.length )*100).toString();
    return this.progress
  }


}
