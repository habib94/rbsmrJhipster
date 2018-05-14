import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    QuestionValidationRbsmrService,
    QuestionValidationRbsmrPopupService,
    QuestionValidationRbsmrComponent,
    QuestionValidationRbsmrDetailComponent,
    QuestionValidationRbsmrDialogComponent,
    QuestionValidationRbsmrPopupComponent,
    QuestionValidationRbsmrDeletePopupComponent,
    QuestionValidationRbsmrDeleteDialogComponent,
    questionValidationRoute,
    questionValidationPopupRoute,
    QuestionValidationRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...questionValidationRoute,
    ...questionValidationPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuestionValidationRbsmrComponent,
        QuestionValidationRbsmrDetailComponent,
        QuestionValidationRbsmrDialogComponent,
        QuestionValidationRbsmrDeleteDialogComponent,
        QuestionValidationRbsmrPopupComponent,
        QuestionValidationRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        QuestionValidationRbsmrComponent,
        QuestionValidationRbsmrDialogComponent,
        QuestionValidationRbsmrPopupComponent,
        QuestionValidationRbsmrDeleteDialogComponent,
        QuestionValidationRbsmrDeletePopupComponent,
    ],
    providers: [
        QuestionValidationRbsmrService,
        QuestionValidationRbsmrPopupService,
        QuestionValidationRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterQuestionValidationRbsmrModule {}
