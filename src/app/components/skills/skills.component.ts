import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', icon: 'assets/icons/icons8-angular-48.png', level: 90 },
    { name: 'Ionic', icon: 'assets/icons/ionic.png', level: 85 },
    { name: '.NET MAUI', icon: 'assets/icons/maui.png', level: 70 },
    { name: 'Node.js', icon: 'assets/icons/icons8-node-js-50.png', level: 85 },
    { name: 'Express.js', icon: 'assets/icons/icons8-express-js-50.png', level: 80 },
    { name: 'NestJS', icon: 'assets/icons/icons8-nestjs-48.png', level: 75 },
    { name: 'Laravel', icon: 'assets/icons/Laravel.png', level: 65 },
    { name: 'Java', icon: 'assets/icons/icons8-java-48.png', level: 90 },
    { name: 'PostgreSQL', icon: 'assets/icons/icons8-postgres-48.png', level: 75 },
    { name: 'MSSQL', icon: 'assets/icons/icons8-sql-server-48.png', level: 70 },
    { name: 'MySQL', icon: 'assets/icons/icons8-mysql-48.png', level: 75 },
    { name: 'MongoDB', icon: 'assets/icons/icons8-mongodb-48.png', level: 70 },
    { name: 'GitHub', icon: 'assets/icons/icons8-github-50.png', level: 70 },
    { name: 'Docker', icon: 'assets/icons/icons8-docker-48.png', level: 70 },
    { name: 'AWS', icon: 'assets/icons/icons8-aws-48.png', level: 70 },
    { name: 'HTML', icon: 'assets/icons/icons8-html5-48.png', level: 90 },
    { name: 'CSS', icon: 'assets/icons/icons8-css-50.png', level: 90 },
    { name: 'JavaScript', icon: 'assets/icons/icons8-javascript-48.png', level: 90 },
    { name: 'TypeScript', icon: 'assets/icons/icons8-typescript-48.png', level: 90 },
  ];
  @ViewChildren('skillCard') skillCards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Deja de observar una vez animado
          }
        });
      },
      { threshold: 0.2 } // Detecta cuando el 20% de la tarjeta es visible
    );

    this.skillCards.forEach((card) => {
      observer.observe(card.nativeElement);
    });
  }
}
