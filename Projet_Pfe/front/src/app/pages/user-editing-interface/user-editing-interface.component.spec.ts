import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditingInterfaceComponent } from './user-editing-interface.component';

describe('UserEditingInterfaceComponent', () => {
  let component: UserEditingInterfaceComponent;
  let fixture: ComponentFixture<UserEditingInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditingInterfaceComponent]
    });
    fixture = TestBed.createComponent(UserEditingInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
