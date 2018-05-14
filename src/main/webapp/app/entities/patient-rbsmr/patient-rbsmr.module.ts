import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    PatientRbsmrService,
    PatientRbsmrPopupService,
    PatientRbsmrComponent,
    PatientRbsmrDetailComponent,
    PatientRbsmrDialogComponent,
    PatientRbsmrPopupComponent,
    PatientRbsmrDeletePopupComponent,
    PatientRbsmrDeleteDialogComponent,
    patientRoute,
    patientPopupRoute,
    PatientRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...patientRoute,
    ...patientPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PatientRbsmrComponent,
        PatientRbsmrDetailComponent,
        PatientRbsmrDialogComponent,
        PatientRbsmrDeleteDialogComponent,
        PatientRbsmrPopupComponent,
        PatientRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        PatientRbsmrComponent,
        PatientRbsmrDialogComponent,
        PatientRbsmrPopupComponent,
        PatientRbsmrDeleteDialogComponent,
        PatientRbsmrDeletePopupComponent,
    ],
    providers: [
        PatientRbsmrService,
        PatientRbsmrPopupService,
        PatientRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterPatientRbsmrModule {}
