import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorViewer } from './editor-viewer';

describe('EditorViewer', () => {
  let component: EditorViewer;
  let fixture: ComponentFixture<EditorViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
