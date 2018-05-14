import { BaseEntity } from './../../shared';

export class RoleRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
    ) {
    }
}
