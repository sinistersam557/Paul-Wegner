import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticForm } from './critic-form';

describe('CriticForm', () => {
  let component: CriticForm;
  let fixture: ComponentFixture<CriticForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CriticForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
