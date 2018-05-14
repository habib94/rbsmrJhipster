import { BaseEntity } from './../../shared';

export class PatientRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public initial?: string,
        public dateEnregistrement?: any,
        public dateVisite?: any,
        public biotherapie?: string,
        public sexe?: string,
        public medecinId?: number,
        public etatFormulaires?: BaseEntity[],
    ) {
    }
}
