import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    VisiteRbsmrService,
    VisiteRbsmrPopupService,
    VisiteRbsmrComponent,
    VisiteRbsmrDetailComponent,
    VisiteRbsmrDialogComponent,
    VisiteRbsmrPopupComponent,
    VisiteRbsmrDeletePopupComponent,
    VisiteRbsmrDeleteDialogComponent,
    visiteRoute,
    visitePopupRoute,
    VisiteRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...visiteRoute,
    ...visitePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VisiteRbsmrComponent,
        VisiteRbsmrDetailComponent,
        VisiteRbsmrDialogComponent,
        VisiteRbsmrDeleteDialogComponent,
        VisiteRbsmrPopupComponent,
        VisiteRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        VisiteRbsmrComponent,
        VisiteRbsmrDialogComponent,
        VisiteRbsmrPopupComponent,
        VisiteRbsmrDeleteDialogComponent,
        VisiteRbsmrDeletePopupComponent,
    ],
    providers: [
        VisiteRbsmrService,
        VisiteRbsmrPopupService,
        VisiteRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterVisiteRbsmrModule {}
