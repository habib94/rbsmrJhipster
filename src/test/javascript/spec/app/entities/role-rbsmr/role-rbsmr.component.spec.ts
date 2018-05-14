/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { RoleRbsmrComponent } from '../../../../../../main/webapp/app/entities/role-rbsmr/role-rbsmr.component';
import { RoleRbsmrService } from '../../../../../../main/webapp/app/entities/role-rbsmr/role-rbsmr.service';
import { RoleRbsmr } from '../../../../../../main/webapp/app/entities/role-rbsmr/role-rbsmr.model';

describe('Component Tests', () => {

    describe('RoleRbsmr Management Component', () => {
        let comp: RoleRbsmrComponent;
        let fixture: ComponentFixture<RoleRbsmrComponent>;
        let service: RoleRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [RoleRbsmrComponent],
                providers: [
                    RoleRbsmrService
                ]
            })
            .overrideTemplate(RoleRbsmrComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleRbsmrComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RoleRbsmr(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
