import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    TemplateFormulaireRbsmrService,
    TemplateFormulaireRbsmrPopupService,
    TemplateFormulaireRbsmrComponent,
    TemplateFormulaireRbsmrDetailComponent,
    TemplateFormulaireRbsmrDialogComponent,
    TemplateFormulaireRbsmrPopupComponent,
    TemplateFormulaireRbsmrDeletePopupComponent,
    TemplateFormulaireRbsmrDeleteDialogComponent,
    templateFormulaireRoute,
    templateFormulairePopupRoute,
    TemplateFormulaireRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...templateFormulaireRoute,
    ...templateFormulairePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TemplateFormulaireRbsmrComponent,
        TemplateFormulaireRbsmrDetailComponent,
        TemplateFormulaireRbsmrDialogComponent,
        TemplateFormulaireRbsmrDeleteDialogComponent,
        TemplateFormulaireRbsmrPopupComponent,
        TemplateFormulaireRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        TemplateFormulaireRbsmrComponent,
        TemplateFormulaireRbsmrDialogComponent,
        TemplateFormulaireRbsmrPopupComponent,
        TemplateFormulaireRbsmrDeleteDialogComponent,
        TemplateFormulaireRbsmrDeletePopupComponent,
    ],
    providers: [
        TemplateFormulaireRbsmrService,
        TemplateFormulaireRbsmrPopupService,
        TemplateFormulaireRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterTemplateFormulaireRbsmrModule {}
