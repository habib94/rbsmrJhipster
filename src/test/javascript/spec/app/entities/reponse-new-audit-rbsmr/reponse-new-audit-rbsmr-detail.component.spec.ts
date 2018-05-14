/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseNewAuditRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr-detail.component';
import { ReponseNewAuditRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.service';
import { ReponseNewAuditRbsmr } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.model';

describe('Component Tests', () => {

    describe('ReponseNewAuditRbsmr Management Detail Component', () => {
        let comp: ReponseNewAuditRbsmrDetailComponent;
        let fixture: ComponentFixture<ReponseNewAuditRbsmrDetailComponent>;
        let service: ReponseNewAuditRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseNewAuditRbsmrDetailComponent],
                providers: [
                    ReponseNewAuditRbsmrService
                ]
            })
            .overrideTemplate(ReponseNewAuditRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseNewAuditRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseNewAuditRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReponseNewAuditRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.reponseNewAudit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
