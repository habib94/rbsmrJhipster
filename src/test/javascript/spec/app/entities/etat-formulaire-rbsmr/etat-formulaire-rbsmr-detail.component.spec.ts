/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { EtatFormulaireRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr-detail.component';
import { EtatFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr.service';
import { EtatFormulaireRbsmr } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('EtatFormulaireRbsmr Management Detail Component', () => {
        let comp: EtatFormulaireRbsmrDetailComponent;
        let fixture: ComponentFixture<EtatFormulaireRbsmrDetailComponent>;
        let service: EtatFormulaireRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [EtatFormulaireRbsmrDetailComponent],
                providers: [
                    EtatFormulaireRbsmrService
                ]
            })
            .overrideTemplate(EtatFormulaireRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatFormulaireRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatFormulaireRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EtatFormulaireRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.etatFormulaire).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
