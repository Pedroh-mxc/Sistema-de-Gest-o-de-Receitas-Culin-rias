import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <a routerLink="/" class="logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2C7.37 2 2 7.37 2 14s5.37 12 12 12 12-5.37 12-12S20.63 2 14 2zm0 2c5.52 0 10 4.48 10 10S19.52 24 14 24 4 19.52 4 14 8.48 4 14 4z" fill="currentColor" opacity=".3"/>
            <path d="M14 7c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm-1 10v-3H9l5-7v3h4l-5 7z" fill="currentColor"/>
          </svg>
          RecipeBook
        </a>
        <nav>
          <a routerLink="/" class="nav-link">Receitas</a>
          <a routerLink="/nova" class="btn btn-primary">+ Nova Receita</a>
        </nav>
      </div>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer class="footer">
      <div class="container">
        <span>RecipeBook v1.0 — Faculdade SENAI</span>
      </div>
    </footer>
  `,
  styles: [`
    .header {
      background: #fff;
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .header .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    nav {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .nav-link {
      color: var(--text-secondary);
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .nav-link:hover { color: var(--text-primary); }
    main {
      min-height: calc(100vh - 130px);
      padding: 40px 0;
    }
    .footer {
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 16px 0;
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
  `]
})
export class AppComponent {}
