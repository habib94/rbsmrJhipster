import { BaseEntity } from './../../shared';

export class PatientRemoveAuditRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public idPatient?: number,
        public idCentre?: number,
        public initial?: string,
        public raison?: string,
        public arcId?: number,
    ) {
    }
}
