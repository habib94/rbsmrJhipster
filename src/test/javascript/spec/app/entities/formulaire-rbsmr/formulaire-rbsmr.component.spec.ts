/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { FormulaireRbsmrComponent } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.component';
import { FormulaireRbsmrService } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.service';
import { FormulaireRbsmr } from '../../../../../../main/webapp/app/entities/formulaire-rbsmr/formulaire-rbsmr.model';

describe('Component Tests', () => {

    describe('FormulaireRbsmr Management Component', () => {
        let comp: FormulaireRbsmrComponent;
        let fixture: ComponentFixture<FormulaireRbsmrComponent>;
        let service: FormulaireRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [FormulaireRbsmrComponent],
                providers: [
                    FormulaireRbsmrService
                ]
            })
            .overrideTemplate(FormulaireRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormulaireRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormulaireRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FormulaireRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.formulaires[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
