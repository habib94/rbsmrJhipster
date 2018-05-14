import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EtatFormulaireRbsmrComponent } from './etat-formulaire-rbsmr.component';
import { EtatFormulaireRbsmrDetailComponent } from './etat-formulaire-rbsmr-detail.component';
import { EtatFormulaireRbsmrPopupComponent } from './etat-formulaire-rbsmr-dialog.component';
import { EtatFormulaireRbsmrDeletePopupComponent } from './etat-formulaire-rbsmr-delete-dialog.component';

@Injectable()
export class EtatFormulaireRbsmrResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const etatFormulaireRoute: Routes = [
    {
        path: 'etat-formulaire-rbsmr',
        component: EtatFormulaireRbsmrComponent,
        resolve: {
            'pagingParams': EtatFormulaireRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.etatFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'etat-formulaire-rbsmr/:id',
        component: EtatFormulaireRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.etatFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etatFormulairePopupRoute: Routes = [
    {
        path: 'etat-formulaire-rbsmr-new',
        component: EtatFormulaireRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.etatFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etat-formulaire-rbsmr/:id/edit',
        component: EtatFormulaireRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.etatFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'etat-formulaire-rbsmr/:id/delete',
        component: EtatFormulaireRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.etatFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
