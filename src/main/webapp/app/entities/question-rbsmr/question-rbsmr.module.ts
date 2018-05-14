import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    QuestionRbsmrService,
    QuestionRbsmrPopupService,
    QuestionRbsmrComponent,
    QuestionRbsmrDetailComponent,
    QuestionRbsmrDialogComponent,
    QuestionRbsmrPopupComponent,
    QuestionRbsmrDeletePopupComponent,
    QuestionRbsmrDeleteDialogComponent,
    questionRoute,
    questionPopupRoute,
    QuestionRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...questionRoute,
    ...questionPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuestionRbsmrComponent,
        QuestionRbsmrDetailComponent,
        QuestionRbsmrDialogComponent,
        QuestionRbsmrDeleteDialogComponent,
        QuestionRbsmrPopupComponent,
        QuestionRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        QuestionRbsmrComponent,
        QuestionRbsmrDialogComponent,
        QuestionRbsmrPopupComponent,
        QuestionRbsmrDeleteDialogComponent,
        QuestionRbsmrDeletePopupComponent,
    ],
    providers: [
        QuestionRbsmrService,
        QuestionRbsmrPopupService,
        QuestionRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterQuestionRbsmrModule {}
