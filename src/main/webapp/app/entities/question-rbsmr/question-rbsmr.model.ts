import { BaseEntity } from './../../shared';

export const enum TypeQuestion {
    'BOOLEAN',
    'CHOIX_HOR',
    'CHOIX_VER',
    'TEXT',
    'NUMBER',
    'DATE',
    'CHOIX_HOR_M',
    'RANGE'
}

export class QuestionRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public indice?: number,
        public codeQuestion?: string,
        public type?: TypeQuestion,
        public ennonce?: string,
        public dm?: boolean,
        public choix?: string,
        public titre?: string,
        public addon?: string,
        public warning?: string,
        public pourTable?: boolean,
        public ceil?: number,
        public conditionsAffichage?: string,
        public templateFormulaireNom?: string,
        public templateFormulaireId?: number,
        public questionExterieurId?: number,
        public validations?: BaseEntity[],
        public questionsInterieurs?: BaseEntity[],
    ) {
        this.dm = false;
        this.pourTable = false;
    }
}
