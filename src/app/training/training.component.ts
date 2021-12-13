import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  onGoingWorkout: boolean = false;
  subscription: Subscription | undefined;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.subscription = this.trainingService.onGoingWorkout.subscribe(workout => {
      this.onGoingWorkout = workout ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
