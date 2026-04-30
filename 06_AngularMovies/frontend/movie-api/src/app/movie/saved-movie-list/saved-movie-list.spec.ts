import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMovieList } from './saved-movie-list';

describe('SavedMovieList', () => {
  let component: SavedMovieList;
  let fixture: ComponentFixture<SavedMovieList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedMovieList],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedMovieList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
