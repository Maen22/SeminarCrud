import { Subscription } from 'rxjs';
import { PatientService } from './../patient.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../../shared/models/patient.model';
import { Treatment } from '../../shared/models/treatment.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TreatmentType } from '../../shared/models/treatment-type.model';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  sub: Subscription;

  id: number;

  patientDetails: Patient;

  treatments: Treatment[];

  selectedTreatments: Treatment[];

  treatmentTypes: TreatmentType[];

  selectedTreatmentType: TreatmentType;

  treatmentDialog: boolean;

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.patientService.getPatient(this.id).then((data) => {
      this.patientDetails = data;
    });

    this.patientService.getTreatmentTypes().then((response) => {
      this.treatmentTypes = response;
      this.selectedTreatmentType = this.treatmentTypes[0];
    });

    this.patientService
      .getTreatments(this.id)
      .then((data) => {
        this.treatments = data;
      })
      .catch((err) => console.log(err));

    this.sub = this.patientService.treatmentsChanged.subscribe((response) => {
      this.treatments = [...this.treatments, response];
    });
  }

  openNew() {}

  deleteTreatment(treatment: Treatment) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Treatment?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.treatments = this.treatments.filter(
          (val) => val.treatmentId !== treatment.treatmentId
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Treatment Deleted',
          life: 1500,
        });
      },
    });

    // Delete From API
  }

  deleteSelectedPatients() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
