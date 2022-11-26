import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAuteurComponent } from './select-auteur.component';

describe('SelectAuteurComponent', () => {
  let component: SelectAuteurComponent;
  let fixture: ComponentFixture<SelectAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAuteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
