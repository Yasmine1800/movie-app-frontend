import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmItemComponent } from './film-item.component';

describe('FilmItemComponent', () => {
  let component: FilmItemComponent;
  let fixture: ComponentFixture<FilmItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
