import { Routes } from '@angular/router';
import { EditorViewer } from './components/editor-viewer/editor-viewer';

export const routes: Routes = [{ path: '**', component: EditorViewer }];
