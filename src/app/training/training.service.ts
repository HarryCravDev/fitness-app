import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  exercises: Exercise[] = [];

  private runningExercise: Exercise | undefined;
  onGoingWorkout = new Subject<Exercise>();

  constructor() { }
  
  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === exerciseId);

    if(this.runningExercise){
      this.onGoingWorkout.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise!,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = undefined;
    this.onGoingWorkout.next(undefined);
  }

  cancelExercise(progress: number, ) {
    this.exercises.push({
      ...this.runningExercise!,
      duration: this.runningExercise!.duration * (progress / 100),
      calories: this.runningExercise!.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    });
    this.runningExercise = undefined;
    this.onGoingWorkout.next(undefined);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getExercises() {
    return this.exercises.slice();
  }
}
