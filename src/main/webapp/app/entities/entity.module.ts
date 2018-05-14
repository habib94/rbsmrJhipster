import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RbsmrJhipsterCentreRbsmrModule } from './centre-rbsmr/centre-rbsmr.module';
import { RbsmrJhipsterDemandeChangementRbsmrModule } from './demande-changement-rbsmr/demande-changement-rbsmr.module';
import { RbsmrJhipsterUtilisateurRbsmrModule } from './utilisateur-rbsmr/utilisateur-rbsmr.module';
import { RbsmrJhipsterRoleRbsmrModule } from './role-rbsmr/role-rbsmr.module';
import { RbsmrJhipsterEtatFormulaireRbsmrModule } from './etat-formulaire-rbsmr/etat-formulaire-rbsmr.module';
import { RbsmrJhipsterFormulaireRbsmrModule } from './formulaire-rbsmr/formulaire-rbsmr.module';
import { RbsmrJhipsterTemplateFormulaireRbsmrModule } from './template-formulaire-rbsmr/template-formulaire-rbsmr.module';
import { RbsmrJhipsterPatientRbsmrModule } from './patient-rbsmr/patient-rbsmr.module';
import { RbsmrJhipsterReponseRbsmrModule } from './reponse-rbsmr/reponse-rbsmr.module';
import { RbsmrJhipsterQuestionRbsmrModule } from './question-rbsmr/question-rbsmr.module';
import { RbsmrJhipsterVisiteRbsmrModule } from './visite-rbsmr/visite-rbsmr.module';
import { RbsmrJhipsterQuestionValidationRbsmrModule } from './question-validation-rbsmr/question-validation-rbsmr.module';
import { RbsmrJhipsterPatientRemoveAuditRbsmrModule } from './patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.module';
import { RbsmrJhipsterReponseNewAuditRbsmrModule } from './reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RbsmrJhipsterCentreRbsmrModule,
        RbsmrJhipsterDemandeChangementRbsmrModule,
        RbsmrJhipsterUtilisateurRbsmrModule,
        RbsmrJhipsterRoleRbsmrModule,
        RbsmrJhipsterEtatFormulaireRbsmrModule,
        RbsmrJhipsterFormulaireRbsmrModule,
        RbsmrJhipsterTemplateFormulaireRbsmrModule,
        RbsmrJhipsterPatientRbsmrModule,
        RbsmrJhipsterReponseRbsmrModule,
        RbsmrJhipsterQuestionRbsmrModule,
        RbsmrJhipsterVisiteRbsmrModule,
        RbsmrJhipsterQuestionValidationRbsmrModule,
        RbsmrJhipsterPatientRemoveAuditRbsmrModule,
        RbsmrJhipsterReponseNewAuditRbsmrModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterEntityModule {}
