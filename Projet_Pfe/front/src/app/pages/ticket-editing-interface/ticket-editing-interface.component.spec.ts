import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditingInterfaceComponent } from '../ticket-editing-interface/ticket-editing-interface.component';

describe('TicketEditingInterfaceComponent', () => {
  let component: TicketEditingInterfaceComponent;
  let fixture: ComponentFixture<TicketEditingInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketEditingInterfaceComponent]
    });
    fixture = TestBed.createComponent(TicketEditingInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
