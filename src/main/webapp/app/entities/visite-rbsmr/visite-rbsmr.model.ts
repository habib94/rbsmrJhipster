import { BaseEntity } from './../../shared';

export class VisiteRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public indice?: number,
        public code?: string,
        public nom?: string,
        public temps?: number,
        public formulaires?: BaseEntity[],
    ) {
    }
}
