import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    UtilisateurRbsmrService,
    UtilisateurRbsmrPopupService,
    UtilisateurRbsmrComponent,
    UtilisateurRbsmrDetailComponent,
    UtilisateurRbsmrDialogComponent,
    UtilisateurRbsmrPopupComponent,
    UtilisateurRbsmrDeletePopupComponent,
    UtilisateurRbsmrDeleteDialogComponent,
    utilisateurRoute,
    utilisateurPopupRoute,
    UtilisateurRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...utilisateurRoute,
    ...utilisateurPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UtilisateurRbsmrComponent,
        UtilisateurRbsmrDetailComponent,
        UtilisateurRbsmrDialogComponent,
        UtilisateurRbsmrDeleteDialogComponent,
        UtilisateurRbsmrPopupComponent,
        UtilisateurRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        UtilisateurRbsmrComponent,
        UtilisateurRbsmrDialogComponent,
        UtilisateurRbsmrPopupComponent,
        UtilisateurRbsmrDeleteDialogComponent,
        UtilisateurRbsmrDeletePopupComponent,
    ],
    providers: [
        UtilisateurRbsmrService,
        UtilisateurRbsmrPopupService,
        UtilisateurRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterUtilisateurRbsmrModule {}
