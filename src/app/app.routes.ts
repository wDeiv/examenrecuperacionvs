import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotaComponent } from './nota/nota.component';
import { CursoComponent } from './curso/curso.component';
import { AlumnoComponent } from './alumno/alumno.component';

export const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
        title : 'Pagina de Inicio'
    },
    {
        path : 'nota',
        component : NotaComponent,
        title : 'Notas'
    },
    {
        path : 'curso',
        component : CursoComponent,
        title : 'Cursos'
    },
    {
        path : 'alumno',
        component : AlumnoComponent,
        title : 'Alumnos'

    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
