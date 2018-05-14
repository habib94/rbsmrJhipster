import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FormulaireRbsmrComponent } from './formulaire-rbsmr.component';
import { FormulaireRbsmrDetailComponent } from './formulaire-rbsmr-detail.component';
import { FormulaireRbsmrPopupComponent } from './formulaire-rbsmr-dialog.component';
import { FormulaireRbsmrDeletePopupComponent } from './formulaire-rbsmr-delete-dialog.component';

@Injectable()
export class FormulaireRbsmrResolvePagingParams implements Resolve<any> {

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

export const formulaireRoute: Routes = [
    {
        path: 'formulaire-rbsmr',
        component: FormulaireRbsmrComponent,
        resolve: {
            'pagingParams': FormulaireRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.formulaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'formulaire-rbsmr/:id',
        component: FormulaireRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.formulaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formulairePopupRoute: Routes = [
    {
        path: 'formulaire-rbsmr-new',
        component: FormulaireRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.formulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formulaire-rbsmr/:id/edit',
        component: FormulaireRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.formulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'formulaire-rbsmr/:id/delete',
        component: FormulaireRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.formulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
