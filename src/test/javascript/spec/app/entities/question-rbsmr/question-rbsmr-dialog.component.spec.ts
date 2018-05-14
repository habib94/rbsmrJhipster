/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { QuestionRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr-dialog.component';
import { QuestionRbsmrService } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.service';
import { QuestionRbsmr } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.model';
import { TemplateFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr';
import { QuestionValidationRbsmrService } from '../../../../../../main/webapp/app/entities/question-validation-rbsmr';

describe('Component Tests', () => {

    describe('QuestionRbsmr Management Dialog Component', () => {
        let comp: QuestionRbsmrDialogComponent;
        let fixture: ComponentFixture<QuestionRbsmrDialogComponent>;
        let service: QuestionRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [QuestionRbsmrDialogComponent],
                providers: [
                    TemplateFormulaireRbsmrService,
                    QuestionValidationRbsmrService,
                    QuestionRbsmrService
                ]
            })
            .overrideTemplate(QuestionRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuestionRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.question = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'questionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new QuestionRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.question = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'questionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
