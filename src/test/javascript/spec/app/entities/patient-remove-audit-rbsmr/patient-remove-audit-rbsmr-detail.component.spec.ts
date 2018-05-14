/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { PatientRemoveAuditRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr-detail.component';
import { PatientRemoveAuditRbsmrService } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.service';
import { PatientRemoveAuditRbsmr } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.model';

describe('Component Tests', () => {

    describe('PatientRemoveAuditRbsmr Management Detail Component', () => {
        let comp: PatientRemoveAuditRbsmrDetailComponent;
        let fixture: ComponentFixture<PatientRemoveAuditRbsmrDetailComponent>;
        let service: PatientRemoveAuditRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [PatientRemoveAuditRbsmrDetailComponent],
                providers: [
                    PatientRemoveAuditRbsmrService
                ]
            })
            .overrideTemplate(PatientRemoveAuditRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatientRemoveAuditRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientRemoveAuditRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PatientRemoveAuditRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.patientRemoveAudit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
