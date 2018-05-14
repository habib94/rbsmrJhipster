/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { PatientRbsmrComponent } from '../../../../../../main/webapp/app/entities/patient-rbsmr/patient-rbsmr.component';
import { PatientRbsmrService } from '../../../../../../main/webapp/app/entities/patient-rbsmr/patient-rbsmr.service';
import { PatientRbsmr } from '../../../../../../main/webapp/app/entities/patient-rbsmr/patient-rbsmr.model';

describe('Component Tests', () => {

    describe('PatientRbsmr Management Component', () => {
        let comp: PatientRbsmrComponent;
        let fixture: ComponentFixture<PatientRbsmrComponent>;
        let service: PatientRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [PatientRbsmrComponent],
                providers: [
                    PatientRbsmrService
                ]
            })
            .overrideTemplate(PatientRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatientRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PatientRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.patients[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
