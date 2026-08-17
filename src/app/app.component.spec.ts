import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the portfolio app', () => {
    expect(component).toBeTruthy();
  });

  it(`should keep the project title as 'geras'`, () => {
    expect(component.title).toBe('geras');
  });

  it('should expose the current year', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });
});
