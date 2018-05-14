/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RbsmrJhipsterTestModule } from '../../../test.module';
import { RoleRbsmrDetailComponent } from '../../../../../../main/webapp/app/entities/role-rbsmr/role-rbsmr-detail.component';
import { RoleRbsmrService } from '../../../../../../main/webapp/app/entities/role-rbsmr/role-rbsmr.service';
import { RoleRbsmr } from '../../../../../../main/webapp/app/entities/role-rbsmr/role-rbsmr.model';

describe('Component Tests', () => {

    describe('RoleRbsmr Management Detail Component', () => {
        let comp: RoleRbsmrDetailComponent;
        let fixture: ComponentFixture<RoleRbsmrDetailComponent>;
        let service: RoleRbsmrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RbsmrJhipsterTestModule],
                declarations: [RoleRbsmrDetailComponent],
                providers: [
                    RoleRbsmrService
                ]
            })
            .overrideTemplate(RoleRbsmrDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RoleRbsmrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoleRbsmrService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RoleRbsmr(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.role).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
