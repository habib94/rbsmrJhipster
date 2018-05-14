/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr-dialog.component';
import { ReponseRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr.service';
import { ReponseRbsmr } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr.model';
import { PatientRbsmrService } from '../../../../../../main/webapp/app/entities/patient-rbsmr';
import { QuestionRbsmrService } from '../../../../../../main/webapp/app/entities/question-rbsmr';

describe('Component Tests', () => {

    describe('ReponseRbsmr Management Dialog Component', () => {
        let comp: ReponseRbsmrDialogComponent;
        let fixture: ComponentFixture<ReponseRbsmrDialogComponent>;
        let service: ReponseRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseRbsmrDialogComponent],
                providers: [
                    PatientRbsmrService,
                    QuestionRbsmrService,
                    ReponseRbsmrService
                ]
            })
            .overrideTemplate(ReponseRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReponseRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reponse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reponseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReponseRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.reponse = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reponseListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
