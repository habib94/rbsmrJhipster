import { BaseEntity } from './../../shared';

export class EtatFormulaireRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public etat?: string,
        public dateValidation?: any,
        public formulaireId?: number,
        public patientId?: number,
    ) {
    }
}
