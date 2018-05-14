import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    ReponseNewAuditRbsmrService,
    ReponseNewAuditRbsmrPopupService,
    ReponseNewAuditRbsmrComponent,
    ReponseNewAuditRbsmrDetailComponent,
    ReponseNewAuditRbsmrDialogComponent,
    ReponseNewAuditRbsmrPopupComponent,
    ReponseNewAuditRbsmrDeletePopupComponent,
    ReponseNewAuditRbsmrDeleteDialogComponent,
    reponseNewAuditRoute,
    reponseNewAuditPopupRoute,
    ReponseNewAuditRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reponseNewAuditRoute,
    ...reponseNewAuditPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReponseNewAuditRbsmrComponent,
        ReponseNewAuditRbsmrDetailComponent,
        ReponseNewAuditRbsmrDialogComponent,
        ReponseNewAuditRbsmrDeleteDialogComponent,
        ReponseNewAuditRbsmrPopupComponent,
        ReponseNewAuditRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        ReponseNewAuditRbsmrComponent,
        ReponseNewAuditRbsmrDialogComponent,
        ReponseNewAuditRbsmrPopupComponent,
        ReponseNewAuditRbsmrDeleteDialogComponent,
        ReponseNewAuditRbsmrDeletePopupComponent,
    ],
    providers: [
        ReponseNewAuditRbsmrService,
        ReponseNewAuditRbsmrPopupService,
        ReponseNewAuditRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterReponseNewAuditRbsmrModule {}
