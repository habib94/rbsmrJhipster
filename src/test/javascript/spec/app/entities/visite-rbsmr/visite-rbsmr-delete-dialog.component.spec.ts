/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { VisiteRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr-delete-dialog.component';
import { VisiteRbsmrService } from '../../../../../../main/webapp/app/entities/visite-rbsmr/visite-rbsmr.service';

describe('Component Tests', () => {

    describe('VisiteRbsmr Management Delete Component', () => {
        let comp: VisiteRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<VisiteRbsmrDeleteDialogComponent>;
        let service: VisiteRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [VisiteRbsmrDeleteDialogComponent],
                providers: [
                    VisiteRbsmrService
                ]
            })
            .overrideTemplate(VisiteRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VisiteRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteRbsmrService);
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
