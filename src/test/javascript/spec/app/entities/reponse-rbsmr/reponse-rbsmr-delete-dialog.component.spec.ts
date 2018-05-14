/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr-delete-dialog.component';
import { ReponseRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-rbsmr/reponse-rbsmr.service';

describe('Component Tests', () => {

    describe('ReponseRbsmr Management Delete Component', () => {
        let comp: ReponseRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<ReponseRbsmrDeleteDialogComponent>;
        let service: ReponseRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseRbsmrDeleteDialogComponent],
                providers: [
                    ReponseRbsmrService
                ]
            })
            .overrideTemplate(ReponseRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseRbsmrService);
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
