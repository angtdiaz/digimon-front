import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigimonDialogComponent } from './digimon-dialog.component';

describe('DigimonDialogComponent', () => {
  let component: DigimonDialogComponent;
  let fixture: ComponentFixture<DigimonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigimonDialogComponent]
    });
    fixture = TestBed.createComponent(DigimonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
