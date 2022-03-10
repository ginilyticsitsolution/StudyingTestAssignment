import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresVideoListComponent } from './coures-video-list.component';

describe('CouresVideoListComponent', () => {
  let component: CouresVideoListComponent;
  let fixture: ComponentFixture<CouresVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouresVideoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouresVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
