import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { QuestionValidationRbsmrComponent } from './question-validation-rbsmr.component';
import { QuestionValidationRbsmrDetailComponent } from './question-validation-rbsmr-detail.component';
import { QuestionValidationRbsmrPopupComponent } from './question-validation-rbsmr-dialog.component';
import { QuestionValidationRbsmrDeletePopupComponent } from './question-validation-rbsmr-delete-dialog.component';

@Injectable()
export class QuestionValidationRbsmrResolvePagingParams implements Resolve<any> {

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

export const questionValidationRoute: Routes = [
    {
        path: 'question-validation-rbsmr',
        component: QuestionValidationRbsmrComponent,
        resolve: {
            'pagingParams': QuestionValidationRbsmrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.questionValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'question-validation-rbsmr/:id',
        component: QuestionValidationRbsmrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.questionValidation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const questionValidationPopupRoute: Routes = [
    {
        path: 'question-validation-rbsmr-new',
        component: QuestionValidationRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.questionValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'question-validation-rbsmr/:id/edit',
        component: QuestionValidationRbsmrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.questionValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'question-validation-rbsmr/:id/delete',
        component: QuestionValidationRbsmrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'rbsmrJhipsterApp.questionValidation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
