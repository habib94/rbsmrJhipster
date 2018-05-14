import { BaseEntity } from './../../shared';

export class ReponseRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public reponse?: string,
        public dM?: boolean,
        public patientId?: number,
        public questionId?: number,
    ) {
        this.dM = false;
    }
}
