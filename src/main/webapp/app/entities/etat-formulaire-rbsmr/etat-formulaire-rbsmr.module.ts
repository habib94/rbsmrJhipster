import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    EtatFormulaireRbsmrService,
    EtatFormulaireRbsmrPopupService,
    EtatFormulaireRbsmrComponent,
    EtatFormulaireRbsmrDetailComponent,
    EtatFormulaireRbsmrDialogComponent,
    EtatFormulaireRbsmrPopupComponent,
    EtatFormulaireRbsmrDeletePopupComponent,
    EtatFormulaireRbsmrDeleteDialogComponent,
    etatFormulaireRoute,
    etatFormulairePopupRoute,
    EtatFormulaireRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...etatFormulaireRoute,
    ...etatFormulairePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EtatFormulaireRbsmrComponent,
        EtatFormulaireRbsmrDetailComponent,
        EtatFormulaireRbsmrDialogComponent,
        EtatFormulaireRbsmrDeleteDialogComponent,
        EtatFormulaireRbsmrPopupComponent,
        EtatFormulaireRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        EtatFormulaireRbsmrComponent,
        EtatFormulaireRbsmrDialogComponent,
        EtatFormulaireRbsmrPopupComponent,
        EtatFormulaireRbsmrDeleteDialogComponent,
        EtatFormulaireRbsmrDeletePopupComponent,
    ],
    providers: [
        EtatFormulaireRbsmrService,
        EtatFormulaireRbsmrPopupService,
        EtatFormulaireRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterEtatFormulaireRbsmrModule {}
