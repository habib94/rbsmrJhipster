import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {

} from './';
import {RbsmrJhipsterSharedModule} from '../shared';
import {FormulaireMedecinPopupRoute, FormulaireMedecinRoute} from './formulaire-complet/formulaire-medecin.route';
import {FormulaireMedecinComponent} from './formulaire-complet/formulaire-medecin.component';

const ENTITY_STATES = [
    ...FormulaireMedecinRoute,
    ...FormulaireMedecinPopupRoute,
];

@NgModule({
    imports: [
        RbsmrJhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormulaireMedecinComponent
    ],
    entryComponents: [

    ],
    providers: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileMedecinModule {}
