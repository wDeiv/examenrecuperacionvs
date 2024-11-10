import { Curso } from "./curso";
import { Alumno } from "./alumno";

export class Nota {
    id: number;
    nota1: number;
    nota2: number;
    nota3: number;
    promedio: number;
    curso: Curso;
    alumno: Alumno;
    constructor(id: number = 0, nota1: number = 0, nota2: number = 0, nota3: number = 0, alumno: Alumno = new Alumno(), curso: Curso = new Curso(), promedio: number=0, ){
        this.id = id;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.promedio = promedio;
        this.curso = curso;
        this.alumno = alumno;
    }
}
