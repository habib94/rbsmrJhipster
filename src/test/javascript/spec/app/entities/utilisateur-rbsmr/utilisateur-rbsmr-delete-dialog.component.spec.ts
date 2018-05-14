/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { UtilisateurRbsmrDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr-delete-dialog.component';
import { UtilisateurRbsmrService } from '../../../../../../main/webapp/app/entities/utilisateur-rbsmr/utilisateur-rbsmr.service';

describe('Component Tests', () => {

    describe('UtilisateurRbsmr Management Delete Component', () => {
        let comp: UtilisateurRbsmrDeleteDialogComponent;
        let fixture: ComponentFixture<UtilisateurRbsmrDeleteDialogComponent>;
        let service: UtilisateurRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [UtilisateurRbsmrDeleteDialogComponent],
                providers: [
                    UtilisateurRbsmrService
                ]
            })
            .overrideTemplate(UtilisateurRbsmrDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurRbsmrDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurRbsmrService);
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
