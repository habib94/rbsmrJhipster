import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    CentreRbsmrService,
    CentreRbsmrPopupService,
    CentreRbsmrComponent,
    CentreRbsmrDetailComponent,
    CentreRbsmrDialogComponent,
    CentreRbsmrPopupComponent,
    CentreRbsmrDeletePopupComponent,
    CentreRbsmrDeleteDialogComponent,
    centreRoute,
    centrePopupRoute,
    CentreRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...centreRoute,
    ...centrePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CentreRbsmrComponent,
        CentreRbsmrDetailComponent,
        CentreRbsmrDialogComponent,
        CentreRbsmrDeleteDialogComponent,
        CentreRbsmrPopupComponent,
        CentreRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        CentreRbsmrComponent,
        CentreRbsmrDialogComponent,
        CentreRbsmrPopupComponent,
        CentreRbsmrDeleteDialogComponent,
        CentreRbsmrDeletePopupComponent,
    ],
    providers: [
        CentreRbsmrService,
        CentreRbsmrPopupService,
        CentreRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterCentreRbsmrModule {}
