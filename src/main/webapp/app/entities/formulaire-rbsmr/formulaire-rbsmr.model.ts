import { BaseEntity } from './../../shared';

export class FormulaireRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: number,
        public indice?: number,
        public code?: string,
        public nom?: string,
        public conditionAttribut?: string,
        public conditionValeur?: string,
        public visiteNom?: string,
        public visiteId?: number,
        public templateFormulaireNom?: string,
        public templateFormulaireId?: number,
    ) {
    }
}
