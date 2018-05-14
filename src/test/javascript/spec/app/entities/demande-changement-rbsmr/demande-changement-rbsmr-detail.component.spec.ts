/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { DemandeChangementRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr-detail.component';
import { DemandeChangementRbsmrService } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr.service';
import { DemandeChangementRbsmr } from '../../../../../../main/webapp/app/entities/demande-changement-rbsmr/demande-changement-rbsmr.model';

describe('Component Tests', () => {

    describe('DemandeChangementRbsmr Management Detail Component', () => {
        let comp: DemandeChangementRbsmrDetailComponent;
        let fixture: ComponentFixture<DemandeChangementRbsmrDetailComponent>;
        let service: DemandeChangementRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [DemandeChangementRbsmrDetailComponent],
                providers: [
                    DemandeChangementRbsmrService
                ]
            })
            .overrideTemplate(DemandeChangementRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DemandeChangementRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DemandeChangementRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DemandeChangementRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.demandeChangement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
