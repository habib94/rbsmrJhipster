import { BaseEntity } from './../../shared';

export class CentreRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public adresse?: string,
        public tel?: string,
    ) {
    }
}
