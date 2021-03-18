import { PatientService } from './../patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../../shared/models/patient.model';
import { Treatment } from '../../shared/models/treatment.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  id: number;

  patientDetails: Patient;

  treatments: Treatment[];

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.patientService.getPatient(this.id).then((data) => {
      this.patientDetails = data;
    });

    this.patientService
      .getTreatments(this.id)
      .then((data) => {
        this.treatments = data;
      })
      .catch((err) => console.log(err));
  }
}
