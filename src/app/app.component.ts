import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'geras';
  currentYear = new Date().getFullYear();
  mobileOpen = false;
  heroWord = 'producción.';
  typedCommand = 'build --next';

  private heroWords = ['producción.', 'integrar.', 'escalar.', 'evolucionar.'];
  private heroWordIndex = 0;
  private heroTimer?: number;
  private typingTimer?: number;
  private animationFrame?: number;
  private revealObserver?: IntersectionObserver;
  private sectionObserver?: IntersectionObserver;
  private cleanupListeners: Array<() => void> = [];
  private networkNodes: NetworkNode[] = [];
  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D | null;

  ngAfterViewInit(): void {
    this.applySavedTheme();
    this.initRevealObserver();
    this.initSectionObserver();
    this.initHeroWords();
    this.initTyping();
    this.initPointerEffects();
    this.initTiltCards();
    this.initNetworkCanvas();
    this.onWindowScroll();
  }

  ngOnDestroy(): void {
    if (this.heroTimer) window.clearInterval(this.heroTimer);
    if (this.typingTimer) window.clearTimeout(this.typingTimer);
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.revealObserver?.disconnect();
    this.sectionObserver?.disconnect();
    this.cleanupListeners.forEach(cleanup => cleanup());
    document.body.classList.remove('menu-open');
  }

  toggleTheme(): void {
    const root = document.documentElement;
    const nextTheme = root.dataset['theme'] === 'light' ? 'dark' : 'light';

    if (nextTheme === 'light') {
      root.dataset['theme'] = 'light';
    } else {
      delete root.dataset['theme'];
    }

    localStorage.setItem('geras-theme', nextTheme);
  }

  toggleMenu(): void {
    this.mobileOpen = !this.mobileOpen;
    document.body.classList.toggle('menu-open', this.mobileOpen);
  }

  closeMenu(): void {
    this.mobileOpen = false;
    document.body.classList.remove('menu-open');
  }

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    this.closeMenu();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const progress = document.getElementById('scrollProgress');
    const topbar = document.getElementById('topbar');
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0;

    if (progress) {
      progress.style.width = `${percent}%`;
    }

    topbar?.classList.toggle('scrolled', window.scrollY > 24);
  }

  private applySavedTheme(): void {
    const saved = localStorage.getItem('geras-theme');
    if (saved === 'light') {
      document.documentElement.dataset['theme'] = 'light';
    } else {
      delete document.documentElement.dataset['theme'];
    }
  }

  private initRevealObserver(): void {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
      return;
    }

    this.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(element => this.revealObserver?.observe(element));
  }

  private initSectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a[href^="#"]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));

    this.sectionObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    }, {
      rootMargin: '-32% 0px -58% 0px',
      threshold: [0, 0.1, 0.25, 0.5]
    });

    sections.forEach(section => this.sectionObserver?.observe(section));
  }

  private initHeroWords(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.heroTimer = window.setInterval(() => {
      this.heroWordIndex = (this.heroWordIndex + 1) % this.heroWords.length;
      this.heroWord = this.heroWords[this.heroWordIndex];
    }, 2200);
  }

  private initTyping(): void {
    const commands = [
      'build --next',
      'docker compose up -d',
      'ship --production',
      'learn ai-agents',
      'architect --clean'
    ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.typedCommand = commands[0];
      return;
    }

    let commandIndex = 0;
    let charIndex = commands[0].length;
    let deleting = true;

    const loop = () => {
      const command = commands[commandIndex];

      if (!deleting) {
        charIndex += 1;
        this.typedCommand = command.slice(0, charIndex);

        if (charIndex >= command.length) {
          deleting = true;
          this.typingTimer = window.setTimeout(loop, 1300);
          return;
        }
      } else {
        charIndex -= 1;
        this.typedCommand = command.slice(0, Math.max(0, charIndex));

        if (charIndex <= 0) {
          deleting = false;
          commandIndex = (commandIndex + 1) % commands.length;
        }
      }

      this.typingTimer = window.setTimeout(loop, deleting ? 36 : 70);
    };

    this.typingTimer = window.setTimeout(loop, 900);
  }

  private initPointerEffects(): void {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    const onMove = (event: MouseEvent) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    this.cleanupListeners.push(() => window.removeEventListener('mousemove', onMove));
  }

  private initTiltCards(): void {
    if (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.querySelectorAll<HTMLElement>('.tilt-card').forEach(card => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform =
          `perspective(1000px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-2px)`;
      };

      const onLeave = () => {
        card.style.transform = '';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);

      this.cleanupListeners.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  private initNetworkCanvas(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.getElementById('networkCanvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    if (!this.context) return;

    const resize = () => {
      if (!this.canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.floor(window.innerWidth * dpr);
      this.canvas.height = Math.floor(window.innerHeight * dpr);
      this.canvas.style.width = `${window.innerWidth}px`;
      this.canvas.style.height = `${window.innerHeight}px`;
      this.context?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const desiredNodes = Math.max(28, Math.min(72, Math.floor(window.innerWidth / 24)));
      this.networkNodes = Array.from({ length: desiredNodes }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18
      }));
    };

    const draw = () => {
      const ctx = this.context;
      if (!ctx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue('--accent-2').trim() || '#71a8ff';
      const muted = styles.getPropertyValue('--muted').trim() || '#8e9caf';

      this.networkNodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      });

      for (let i = 0; i < this.networkNodes.length; i += 1) {
        const a = this.networkNodes[i];

        for (let j = i + 1; j < this.networkNodes.length; j += 1) {
          const b = this.networkNodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            ctx.globalAlpha = (1 - distance / 120) * 0.11;
            ctx.strokeStyle = accent;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.26;
      ctx.fillStyle = muted;
      this.networkNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.15, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      this.animationFrame = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    this.cleanupListeners.push(() => window.removeEventListener('resize', resize));

    resize();
    draw();
  }
}
