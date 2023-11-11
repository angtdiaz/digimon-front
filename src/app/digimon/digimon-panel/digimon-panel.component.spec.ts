import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonPanelComponent } from './digimon-panel.component';

describe('DigimonPanelComponent', () => {
  let component: DigimonPanelComponent;
  let fixture: ComponentFixture<DigimonPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigimonPanelComponent]
    });
    fixture = TestBed.createComponent(DigimonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
