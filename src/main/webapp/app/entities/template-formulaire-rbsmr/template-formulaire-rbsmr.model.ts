import { BaseEntity } from './../../shared';

export class TemplateFormulaireRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public nom?: string,
        public questions?: BaseEntity[],
    ) {
    }
}
