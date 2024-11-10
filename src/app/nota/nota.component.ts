import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Nota } from '../models/nota';
import { Curso } from '../models/curso';
import { Alumno } from '../models/alumno';
import { AlumnoService } from '../services/alumno';
import { CursoService } from '../services/curso';
import { NotaService } from '../services/nota';

@Component({
  selector: 'app-nota',
  standalone: true,
  imports: [MenuComponent, TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ConfirmDialogModule, ToastModule, DropdownModule],
  templateUrl: './nota.component.html',
  styleUrl: './nota.component.css',
  providers: [ConfirmationService, MessageService]
})
export class NotaComponent {
  notas: Nota[]=[];
  cursos: Curso[]=[];
  alumnos: Alumno[]=[];
  nota: Nota = new Nota();

  titulo: string= '';
  opc: string= '';
  op= 0;
  visible: boolean= false;
  isProcessInProgress: boolean= false;

  constructor(
    private alumnoService: AlumnoService,
    private cursoService: CursoService,
    private notaServie: NotaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit():void {
    this.listarNotas();
    this.listarAlumnos();
    this.listarCursos();
  }

  listarNotas(){
    this.notaServie.getNota().subscribe((data: Nota[]) => {
      this.notas = data;
    })
  }

  listarAlumnos() {
    this.alumnoService.getAlumno().subscribe((data: Alumno[]) => {
        this.alumnos = data.map(alumno => ({
            ...alumno,
            nombreCompleto: `${alumno.apellidos} ${alumno.nombres}`
        }));
    });
}

  listarCursos(){
    this.cursoService.getCurso().subscribe((data: Curso[]) => {
      this.cursos = data;
    })
  }

  addNotas():void{
    this.notaServie.createNota(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota registrada con exito',
        });
        this.listarNotas();
        this.op= 0;
      },
      error: () => {
        this.isProcessInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "No se puedo registrar la Nota",
        });
      },
    });
    this.visible= false;
  }

  editNotas(){
    this.nota.alumno = this.alumnos.find(t => t.id === this.nota.alumno.id)!;
    this.nota.curso = this.cursos.find(m => m.id === this.nota.curso.id)!;
    this.notaServie.updateNota(this.nota, this.nota.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota editada con exito',
        });
        this.listarNotas();
        console.log(this.nota.id + ' ' + this.nota.nota1 + ' ' + this.nota.nota2 + '' + this.nota.nota3 + + this.nota.curso.id + + this.nota.alumno.id);
        this.op=0;
      },
      error: () => {
        this.isProcessInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la Nota',
        });
      },
    });
    this.visible= false;
  }

  deleteNotas(id: number){
    this.isProcessInProgress= true;
    this.notaServie.deleteNota(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota eliminada con exito',
        });
        this.isProcessInProgress= false;
        this.listarNotas();
      },
      error: () => {
        this.isProcessInProgress= false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la Nota',
        });
      },
    });  
  }

  showDialogCreate(){
    this.titulo= "Añadir una nueva nota"
    this.opc= "Guardar";
    this.op= 0;
    this.visible= true;
  }

  showDialogEdit(id: number){
    this.titulo= "Editar Nota"
    this.opc= "Actualizar";
    this.notaServie.getNotaById(id).subscribe((data)=>{
      this.nota= data;
      this.op= 1;
    });
    this.visible= true;
  }

  limpiar(){
    this.titulo= '';
    this.opc= '';
    this.op= 0;
    this.nota.id= 0;
    this.nota.nota1= 0;
    this.nota.nota2= 0;
    this.nota.nota3= 0;
    this.nota= new Nota();
  }

  opcion(): void{
    if (this.op==0) {
      this.addNotas();
      this.limpiar();
    } else if (this.op==1) {
      console.log("Editar");
      this.editNotas();
      this.limpiar();
    } else {
      console.log("Vacio");
      this.limpiar();
    }
  } 

}
