import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {

} from './';
import {RbsmrJhipsterSharedModule} from '../shared';

const ENTITY_STATES = [
    ...formulaireRoute,
    ...formulairePopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [

    ],
    entryComponents: [

    ],
    providers: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileMedecinModule {}
