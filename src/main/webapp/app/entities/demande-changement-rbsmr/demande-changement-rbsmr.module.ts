import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    DemandeChangementRbsmrService,
    DemandeChangementRbsmrPopupService,
    DemandeChangementRbsmrComponent,
    DemandeChangementRbsmrDetailComponent,
    DemandeChangementRbsmrDialogComponent,
    DemandeChangementRbsmrPopupComponent,
    DemandeChangementRbsmrDeletePopupComponent,
    DemandeChangementRbsmrDeleteDialogComponent,
    demandeChangementRoute,
    demandeChangementPopupRoute,
    DemandeChangementRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...demandeChangementRoute,
    ...demandeChangementPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DemandeChangementRbsmrComponent,
        DemandeChangementRbsmrDetailComponent,
        DemandeChangementRbsmrDialogComponent,
        DemandeChangementRbsmrDeleteDialogComponent,
        DemandeChangementRbsmrPopupComponent,
        DemandeChangementRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        DemandeChangementRbsmrComponent,
        DemandeChangementRbsmrDialogComponent,
        DemandeChangementRbsmrPopupComponent,
        DemandeChangementRbsmrDeleteDialogComponent,
        DemandeChangementRbsmrDeletePopupComponent,
    ],
    providers: [
        DemandeChangementRbsmrService,
        DemandeChangementRbsmrPopupService,
        DemandeChangementRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterDemandeChangementRbsmrModule {}
