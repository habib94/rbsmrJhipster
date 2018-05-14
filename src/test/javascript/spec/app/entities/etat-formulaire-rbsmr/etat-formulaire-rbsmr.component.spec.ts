/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { EtatFormulaireRbsmrComponent } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr.component';
import { EtatFormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr.service';
import { EtatFormulaireRbsmr } from '../../../../../../main/webapp/app/entities/etat-formulaire-rbsmr/etat-formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('EtatFormulaireRbsmr Management Component', () => {
        let comp: EtatFormulaireRbsmrComponent;
        let fixture: ComponentFixture<EtatFormulaireRbsmrComponent>;
        let service: EtatFormulaireRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [EtatFormulaireRbsmrComponent],
                providers: [
                    EtatFormulaireRbsmrService
                ]
            })
            .overrideTemplate(EtatFormulaireRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatFormulaireRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatFormulaireRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EtatFormulaireRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.etatFormulaires[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
