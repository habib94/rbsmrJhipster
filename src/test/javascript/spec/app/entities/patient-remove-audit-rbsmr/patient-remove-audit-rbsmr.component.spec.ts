/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { PatientRemoveAuditRbsmrComponent } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.component';
import { PatientRemoveAuditRbsmrService } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.service';
import { PatientRemoveAuditRbsmr } from '../../../../../../main/webapp/app/entities/patient-remove-audit-rbsmr/patient-remove-audit-rbsmr.model';

describe('Component Tests', () => {

    describe('PatientRemoveAuditRbsmr Management Component', () => {
        let comp: PatientRemoveAuditRbsmrComponent;
        let fixture: ComponentFixture<PatientRemoveAuditRbsmrComponent>;
        let service: PatientRemoveAuditRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [PatientRemoveAuditRbsmrComponent],
                providers: [
                    PatientRemoveAuditRbsmrService
                ]
            })
            .overrideTemplate(PatientRemoveAuditRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PatientRemoveAuditRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PatientRemoveAuditRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PatientRemoveAuditRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.patientRemoveAudits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
