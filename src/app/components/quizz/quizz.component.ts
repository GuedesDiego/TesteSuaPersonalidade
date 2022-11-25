import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string=""

  question:any
  questionSelected:any

  answers:string[] = []
  answersSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean =  false
  //inicio co
  vilao: boolean = false;
  heroi: boolean = false;
  antiHeroi: boolean = false;
  // fim co
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title= quizz_questions.title

      this.question=quizz_questions.questions
      this.questionSelected=this.question[this.questionIndex]

      this.questionIndex= 0
      this.questionMaxIndex = this.question.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

   async nextStep(){
    this.questionIndex+=1

    if( this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.question[this.questionIndex]
    }else{
     const finalAnswer:string = await this.checkResult(this.answers)
      this.finished=true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]

      let vilaoR = this.answers.filter(resposta => resposta ==='A')
      let heroiR = this.answers.filter(resposta => resposta ==='B')
      let antiHeroiR = this.answers.filter(resposta => resposta ==='C')

      if(vilaoR.length > heroiR.length &&  vilaoR.length > antiHeroiR.length){
        this.vilao = true
      }
      if(heroiR.length > vilaoR.length && heroiR.length > antiHeroiR.length){
        this.heroi = true
      }
      if(antiHeroiR.length > heroiR.length && antiHeroiR.length > vilaoR.length){
        this.antiHeroi = true
      }
    }
  }
    
  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i,arr)=>{
      if(
        arr.filter(item => item === previous).length>
        arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
  })
      return result
    }     
}
