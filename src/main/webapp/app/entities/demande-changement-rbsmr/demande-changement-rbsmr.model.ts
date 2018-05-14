import { BaseEntity } from './../../shared';

export const enum EtatDemandeChangement {
    'NOUVELLE',
    'ENVOYEE',
    'RESOLUE'
}

export class DemandeChangementRbsmr implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public contenu?: string,
        public reponse?: string,
        public etat?: EtatDemandeChangement,
        public lien?: string,
        public codeQuestion?: string,
        public medecinId?: number,
        public arcId?: number,
    ) {
    }
}
