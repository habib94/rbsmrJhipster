/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { DemandeChangementRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr-delete-dialog.component';
import { DemandeChangementRbsmrService } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr.service';

describe('Component Tests', () => {

    describe('DemandeChangementRbsmr Management Delete Component', () => {
        let comp: DemandeChangementRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<DemandeChangementRbsmrDeleteDialogComponent>;
        let service: DemandeChangementRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [DemandeChangementRbsmrDeleteDialogComponent],
                providers: [
                    DemandeChangementRbsmrService
                ]
            })
            .overrideTemplate(DemandeChangementRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeChangementRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeChangementRbsmrService);
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
