import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno';


@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
  providers: [AlumnoService]
})
export class AlumnoComponent {
  alumnos: Alumno[]=[];

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit():void {
      this.listarTipos();
  }

  listarTipos() {
    this.alumnoService.getAlumno().subscribe((data: Alumno[]) => {
        this.alumnos = data;
    });
}
}
