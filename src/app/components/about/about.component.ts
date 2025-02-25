import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  projects = [
    {
      name: 'Sistema de Punto de Venta',
      description: 'Gestión de inventario, proveedores, ventas y devoluciones.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL'],
      image: 'assets/projects/pos.png'
    },
    {
      name: 'Generador de Plan de Amortización',
      description: 'Calcula planes de amortización con base en parámetros financieros.',
      technologies: ['PostgreSQL', 'Node.js'],
      image: 'assets/projects/amortizacion.png'
    },
    {
      name: 'Conversor de JSON a Excel',
      description: 'Convierte datos JSON a formato Excel de manera eficiente.',
      technologies: ['Node.js', 'Express', 'ExcelJS'],
      image: 'assets/projects/json_excel.png'
    },
    {
      name: 'Sistema de Compra-Venta de Divisas',
      description: 'Plataforma para gestionar operaciones de cambio de divisas.',
      technologies: ['Angular', 'Express', 'PostgreSQL'],
      image: 'assets/projects/currency_exchange.png'
    },
    {
      name: 'Remicash - Envío de Remesas',
      description: 'Sistema de envío y cobro de remesas con integración de MoneyGram y Western Union.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL'],
      image: 'assets/projects/remicash.png'
    },
    {
      name: 'App de Banca Móvil',
      description: 'Aplicación móvil en Ionic con Capacitor para banca digital.',
      technologies: ['Ionic', 'Angular', 'Capacitor'],
      image: 'assets/projects/banking_app.png'
    },
    {
      name: 'Servicio RESTful de Roles y Permisos',
      description: 'API para gestión de roles, permisos y seguridad.',
      technologies: ['Node.js', 'Express', 'PostgreSQL'],
      image: 'assets/projects/roles_permissions.png'
    },
    {
      name: 'Carga Masiva de Datos',
      description: 'Sistema para cargar datos masivamente desde Excel a PostgreSQL.',
      technologies: ['Spring Boot', 'PostgreSQL', 'ExcelJS'],
      image: 'assets/projects/data_upload.png'
    },
    {
      name: 'Monitoreo de Visitas',
      description: 'Aplicación para seguimiento de personal de campo.',
      technologies: ['Java', 'JPA', 'PostgreSQL'],
      image: 'assets/projects/visit_monitoring.png'
    }
  ];

  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.projectCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}