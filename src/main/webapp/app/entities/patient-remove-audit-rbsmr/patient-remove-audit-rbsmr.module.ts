import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    PatientRemoveAuditRbsmrService,
    PatientRemoveAuditRbsmrPopupService,
    PatientRemoveAuditRbsmrComponent,
    PatientRemoveAuditRbsmrDetailComponent,
    PatientRemoveAuditRbsmrDialogComponent,
    PatientRemoveAuditRbsmrPopupComponent,
    PatientRemoveAuditRbsmrDeletePopupComponent,
    PatientRemoveAuditRbsmrDeleteDialogComponent,
    patientRemoveAuditRoute,
    patientRemoveAuditPopupRoute,
    PatientRemoveAuditRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...patientRemoveAuditRoute,
    ...patientRemoveAuditPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PatientRemoveAuditRbsmrComponent,
        PatientRemoveAuditRbsmrDetailComponent,
        PatientRemoveAuditRbsmrDialogComponent,
        PatientRemoveAuditRbsmrDeleteDialogComponent,
        PatientRemoveAuditRbsmrPopupComponent,
        PatientRemoveAuditRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        PatientRemoveAuditRbsmrComponent,
        PatientRemoveAuditRbsmrDialogComponent,
        PatientRemoveAuditRbsmrPopupComponent,
        PatientRemoveAuditRbsmrDeleteDialogComponent,
        PatientRemoveAuditRbsmrDeletePopupComponent,
    ],
    providers: [
        PatientRemoveAuditRbsmrService,
        PatientRemoveAuditRbsmrPopupService,
        PatientRemoveAuditRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterPatientRemoveAuditRbsmrModule {}
