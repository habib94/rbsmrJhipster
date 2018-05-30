import { Routes } from '@angular/router';
import {UserRouteAccessService} from '../../shared/auth/user-route-access-service';
import {FormulaireMedecinComponent} from './formulaire-medecin.component';

export const FormulaireMedecinRoute: Routes = [
    {
        path: 'medecin/formulaire/:code',
        component: FormulaireMedecinComponent,
        data: {
            pageTitle: 'rbsmrJhipsterApp.formulairecompletmedecin.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const FormulaireMedecinPopupRoute: Routes = [

];
