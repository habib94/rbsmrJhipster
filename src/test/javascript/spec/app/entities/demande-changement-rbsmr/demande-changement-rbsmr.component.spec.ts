/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { DemandeChangementRbsmrComponent } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr.component';
import { DemandeChangementRbsmrService } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr.service';
import { DemandeChangementRbsmr } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr.model';

describe('Component Tests', () => {

    describe('DemandeChangementRbsmr Management Component', () => {
        let comp: DemandeChangementRbsmrComponent;
        let fixture: ComponentFixture<DemandeChangementRbsmrComponent>;
        let service: DemandeChangementRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [DemandeChangementRbsmrComponent],
                providers: [
                    DemandeChangementRbsmrService
                ]
            })
            .overrideTemplate(DemandeChangementRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeChangementRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeChangementRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DemandeChangementRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.demandeChangements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
