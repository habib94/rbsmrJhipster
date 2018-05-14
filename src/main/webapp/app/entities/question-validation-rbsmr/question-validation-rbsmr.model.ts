import { BaseEntity } from './../../shared';

export class QuestionValidationRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public val?: string,
        public minVal?: number,
        public maxVal?: number,
    ) {
    }
}
