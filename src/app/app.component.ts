import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

enum DIRECTION  {UP= 1, DOWN= -1}
enum STATUS {RUNNING = "RUNNING",STOPPED = "STOPPED", PAUSED = "PAUSED"}

type State = {
  status:STATUS;
  direction: DIRECTION;
  currentTime:number
}
const initialState:State = {status:STATUS.STOPPED, direction: DIRECTION.UP, currentTime:0}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crono';
  state = signal(initialState);
  time = signal(0);
  interval?: ReturnType<typeof setInterval>;

  constructor(){
    effect(()=>{

      this.cambiarEstado(this.state());

    
    })
  }

  ngOnInit(){
    
  }

  private cambiarEstado(state:State){

    switch(state.status){
      case STATUS.RUNNING: {
        this.time.set(this.state().currentTime);
        this.chrono();
        break;
      }

      default: {
       clearInterval(this.interval);
       break;
    }
    }

    // if(state.status === "RUNNING"){
    //   this.time.set(this.state().currentTime);
    //   this.chrono();
    //   return
    // }

    // if(state.status==="PAUSED" || state.status==="STOPPED"){

    //   clearInterval(this.interval);
    //   return
    // }

  }

  start(){
    if(this.interval){
      clearInterval(this.interval)
    } 

    this.state.set({...initialState, status:STATUS.RUNNING});
  }

  resume(){}

  pause(){
    this.state.update(prev => ({...prev,currentTime:this.time(),status:STATUS.PAUSED}))
  }

  toggleDirection(status:boolean){}

  reset(){}

  chrono(){
  const timeInterval = setInterval(()=>{

  this.time.update((prev ) => prev +this.state().direction)
  },1000)

  this.interval = timeInterval;
  }

}
