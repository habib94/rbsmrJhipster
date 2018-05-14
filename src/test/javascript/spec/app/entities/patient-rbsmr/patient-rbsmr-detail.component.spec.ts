/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { PatientRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/patient-rbsmr/patient-rbsmr-detail.component';
import { PatientRbsmrService } from '../../../../../../main/webapp/app/entities/patient-rbsmr/patient-rbsmr.service';
import { PatientRbsmr } from '../../../../../../main/webapp/app/entities/patient-rbsmr/patient-rbsmr.model';

describe('Component Tests', () => {

    describe('PatientRbsmr Management Detail Component', () => {
        let comp: PatientRbsmrDetailComponent;
        let fixture: ComponentFixture<PatientRbsmrDetailComponent>;
        let service: PatientRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [PatientRbsmrDetailComponent],
                providers: [
                    PatientRbsmrService
                ]
            })
            .overrideTemplate(PatientRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatientRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PatientRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.patient).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
