/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { FormulaireRbsmrDialogComponent } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr-dialog.component';
import { FormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.service';
import { FormulaireRbsmr } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.model';
import { VisiteRbsmrService } from '../../../../../../main/webapp/app/entities/visite-rbsmr';
import { TemplateFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/template-formulaire-rbsmr';

describe('Component Tests', () => {

    describe('FormulaireRbsmr Management Dialog Component', () => {
        let comp: FormulaireRbsmrDialogComponent;
        let fixture: ComponentFixture<FormulaireRbsmrDialogComponent>;
        let service: FormulaireRbsmrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [FormulaireRbsmrDialogComponent],
                providers: [
                    VisiteRbsmrService,
                    TemplateFormulaireRbsmrService,
                    FormulaireRbsmrService
                ]
            })
            .overrideTemplate(FormulaireRbsmrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormulaireRbsmrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormulaireRbsmrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FormulaireRbsmr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.formulaire = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formulaireListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FormulaireRbsmr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.formulaire = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formulaireListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
