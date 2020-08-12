import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlertsComponent } from './admin-alerts.component';

describe('AlertsComponent', () => {
  let component: AdminAlertsComponent;
  let fixture: ComponentFixture<AdminAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
