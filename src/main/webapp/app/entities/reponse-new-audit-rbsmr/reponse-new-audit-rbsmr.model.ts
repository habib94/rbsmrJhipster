import { BaseEntity } from './../../shared';

export class ReponseNewAuditRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public reponseOld?: string,
        public reponseNew?: string,
        public raison?: string,
        public raisonFileUrl?: string,
        public dMOld?: boolean,
        public dMNew?: boolean,
        public codeQuestion?: string,
        public codePatient?: string,
        public type?: string,
        public arcId?: number,
    ) {
        this.dMOld = false;
        this.dMNew = false;
    }
}
