import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Curso } from '../models/curso';
import { CursoService } from '../services/curso';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css',
  providers: [CursoService]
})
export class CursoComponent {
  cursos: Curso[]=[];
  
  constructor(private cursoService: CursoService) {}

  
  ngOnInit():void {
    this.listarCurso();
  }

  listarCurso() {
  this.cursoService.getCurso().subscribe((data: Curso[]) => {
      this.cursos = data;
  });
  }
}
