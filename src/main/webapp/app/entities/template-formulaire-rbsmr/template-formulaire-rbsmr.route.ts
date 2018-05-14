import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TemplateFormulaireRbsmrComponent } from './template-formulaire-rbsmr.component';
import { TemplateFormulaireRbsmrDetailComponent } from './template-formulaire-rbsmr-detail.component';
import { TemplateFormulaireRbsmrPopupComponent } from './template-formulaire-rbsmr-dialog.component';
import { TemplateFormulaireRbsmrDeletePopupComponent } from './template-formulaire-rbsmr-delete-dialog.component';

@Injectable()
export class TemplateFormulaireRbsmrResolvePagingParams implements Resolve<any> {

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

export const templateFormulaireRoute: Routes = [
    {
        path: 'template-formulaire-rbsmr',
        component: TemplateFormulaireRbsmrComponent,
        resolve: {
            'pagingParams': TemplateFormulaireRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.templateFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'template-formulaire-rbsmr/:id',
        component: TemplateFormulaireRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.templateFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const templateFormulairePopupRoute: Routes = [
    {
        path: 'template-formulaire-rbsmr-new',
        component: TemplateFormulaireRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.templateFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'template-formulaire-rbsmr/:id/edit',
        component: TemplateFormulaireRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.templateFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'template-formulaire-rbsmr/:id/delete',
        component: TemplateFormulaireRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.templateFormulaire.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
