/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { ReponseNewAuditRbsmrComponent } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.component';
import { ReponseNewAuditRbsmrService } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.service';
import { ReponseNewAuditRbsmr } from '../../../../../../main/webapp/app/entities/reponse-new-audit-rbsmr/reponse-new-audit-rbsmr.model';

describe('Component Tests', () => {

    describe('ReponseNewAuditRbsmr Management Component', () => {
        let comp: ReponseNewAuditRbsmrComponent;
        let fixture: ComponentFixture<ReponseNewAuditRbsmrComponent>;
        let service: ReponseNewAuditRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [ReponseNewAuditRbsmrComponent],
                providers: [
                    ReponseNewAuditRbsmrService
                ]
            })
            .overrideTemplate(ReponseNewAuditRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReponseNewAuditRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponseNewAuditRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReponseNewAuditRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.reponseNewAudits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
