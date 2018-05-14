import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    FormulaireRbsmrService,
    FormulaireRbsmrPopupService,
    FormulaireRbsmrComponent,
    FormulaireRbsmrDetailComponent,
    FormulaireRbsmrDialogComponent,
    FormulaireRbsmrPopupComponent,
    FormulaireRbsmrDeletePopupComponent,
    FormulaireRbsmrDeleteDialogComponent,
    formulaireRoute,
    formulairePopupRoute,
    FormulaireRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...formulaireRoute,
    ...formulairePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormulaireRbsmrComponent,
        FormulaireRbsmrDetailComponent,
        FormulaireRbsmrDialogComponent,
        FormulaireRbsmrDeleteDialogComponent,
        FormulaireRbsmrPopupComponent,
        FormulaireRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        FormulaireRbsmrComponent,
        FormulaireRbsmrDialogComponent,
        FormulaireRbsmrPopupComponent,
        FormulaireRbsmrDeleteDialogComponent,
        FormulaireRbsmrDeletePopupComponent,
    ],
    providers: [
        FormulaireRbsmrService,
        FormulaireRbsmrPopupService,
        FormulaireRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterFormulaireRbsmrModule {}
