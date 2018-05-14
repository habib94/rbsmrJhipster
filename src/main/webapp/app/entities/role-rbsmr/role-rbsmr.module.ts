import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RbsmrJhipsterSharedModule } from '../../shared';
import {
    RoleRbsmrService,
    RoleRbsmrPopupService,
    RoleRbsmrComponent,
    RoleRbsmrDetailComponent,
    RoleRbsmrDialogComponent,
    RoleRbsmrPopupComponent,
    RoleRbsmrDeletePopupComponent,
    RoleRbsmrDeleteDialogComponent,
    roleRoute,
    rolePopupRoute,
    RoleRbsmrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...roleRoute,
    ...rolePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RoleRbsmrComponent,
        RoleRbsmrDetailComponent,
        RoleRbsmrDialogComponent,
        RoleRbsmrDeleteDialogComponent,
        RoleRbsmrPopupComponent,
        RoleRbsmrDeletePopupComponent,
    ],
    entryComponents: [
        RoleRbsmrComponent,
        RoleRbsmrDialogComponent,
        RoleRbsmrPopupComponent,
        RoleRbsmrDeleteDialogComponent,
        RoleRbsmrDeletePopupComponent,
    ],
    providers: [
        RoleRbsmrService,
        RoleRbsmrPopupService,
        RoleRbsmrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RbsmrJhipsterRoleRbsmrModule {}
