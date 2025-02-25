import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostListener('window:scroll', [])
  onScroll(): void {
    const home = document.getElementById('home');
    if (home) {
      const position = home.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (position < windowHeight - 100) {
        home.classList.add('show');
      }
    }
  }


  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.createBinaryEffect();
    this.handleScrollAnimation();
  }

  createBinaryEffect(): void {
    const binaryContainer = document.getElementById('binary-background');
    if (!binaryContainer) return;

    for (let i = 0; i < 30; i++) {  // Número de elementos binarios
      const binary = this.renderer.createElement('div');
      this.renderer.addClass(binary, 'binary');
      this.renderer.setProperty(binary, 'innerText', Math.random() > 0.5 ? '101010' : '110011');

      // Posiciona de manera aleatoria en la pantalla
      this.renderer.setStyle(binary, 'left', Math.random() * 100 + 'vw');
      this.renderer.setStyle(binary, 'top', Math.random() * 100 + 'vh');

      // Añadir el elemento al fondo animado
      this.renderer.appendChild(binaryContainer, binary);
    }
  }

  handleScrollAnimation(): void {
    const homeSection = document.getElementById('homes');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            homeSection?.classList.add('show');
          }
        });
      },
      { threshold: 0.5 }
    );

    if (homeSection) {
      observer.observe(homeSection);
    }
  }
}