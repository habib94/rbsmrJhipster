/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { QuestionRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr-delete-dialog.component';
import { QuestionRbsmrService } from '../../../../../../main/webapp/app/entities/question-rbsmr/question-rbsmr.service';

describe('Component Tests', () => {

    describe('QuestionRbsmr Management Delete Component', () => {
        let comp: QuestionRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<QuestionRbsmrDeleteDialogComponent>;
        let service: QuestionRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [QuestionRbsmrDeleteDialogComponent],
                providers: [
                    QuestionRbsmrService
                ]
            })
            .overrideTemplate(QuestionRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(QuestionRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuestionRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
