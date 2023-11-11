import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonCardComponent } from './digimon-card.component';

describe('DigimonCardComponent', () => {
  let component: DigimonCardComponent;
  let fixture: ComponentFixture<DigimonCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigimonCardComponent]
    });
    fixture = TestBed.createComponent(DigimonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
