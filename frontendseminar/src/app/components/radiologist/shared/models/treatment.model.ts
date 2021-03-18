export interface Treatment {
  treatmentId?: number;
  userId: string;
  treatmetCost: number;
  createdAt?: Date;
  treatmentImageURl?: string;

  patientId?: number;
  treatmentTypeId?: number;
}
