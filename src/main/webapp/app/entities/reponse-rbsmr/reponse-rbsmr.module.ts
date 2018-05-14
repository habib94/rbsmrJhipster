import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    ReponseRbsmrService,
    ReponseRbsmrPopupService,
    ReponseRbsmrComponent,
    ReponseRbsmrDetailComponent,
    ReponseRbsmrDialogComponent,
    ReponseRbsmrPopupComponent,
    ReponseRbsmrDeletePopupComponent,
    ReponseRbsmrDeleteDialogComponent,
    reponseRoute,
    reponsePopupRoute,
    ReponseRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reponseRoute,
    ...reponsePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReponseRbsmrComponent,
        ReponseRbsmrDetailComponent,
        ReponseRbsmrDialogComponent,
        ReponseRbsmrDeleteDialogComponent,
        ReponseRbsmrPopupComponent,
        ReponseRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        ReponseRbsmrComponent,
        ReponseRbsmrDialogComponent,
        ReponseRbsmrPopupComponent,
        ReponseRbsmrDeleteDialogComponent,
        ReponseRbsmrDeletePopupComponent,
    ],
    providers: [
        ReponseRbsmrService,
        ReponseRbsmrPopupService,
        ReponseRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterReponseRbsmrModule {}
