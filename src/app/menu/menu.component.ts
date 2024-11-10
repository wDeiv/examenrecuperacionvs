import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                routerLink: '/'
            },
            {
                label: 'Opciones',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Cursos',
                        icon: 'pi pi-star',
                        routerLink: '/curso'
                    },
                    {
                        label: 'Alumnos',
                        icon: 'pi pi-pencil',
                        routerLink: '/alumno'
                    },
                    {
                      label: 'Notas',
                      icon: 'pi pi-pencil',
                      routerLink: '/nota'
                    }                    
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]
    }

}
