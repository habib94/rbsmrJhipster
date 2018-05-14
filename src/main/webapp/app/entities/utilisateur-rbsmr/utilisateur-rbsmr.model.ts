import { BaseEntity } from './../../shared';

export class UtilisateurRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public email?: string,
        public tel?: string,
        public identificateur?: string,
        public motdepasse?: string,
        public isNew?: boolean,
        public isActive?: boolean,
        public centreNom?: string,
        public centreId?: number,
        public roleId?: number,
        public centres?: BaseEntity[],
        public demandeChangementsMedecins?: BaseEntity[],
        public demandeChangementsARCS?: BaseEntity[],
    ) {
        this.isNew = false;
        this.isActive = false;
    }
}
