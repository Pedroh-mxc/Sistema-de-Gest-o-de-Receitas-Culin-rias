import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CATEGORIAS } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="page-header">
        <a routerLink="/" class="back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Voltar
        </a>
        <h1 class="page-title">Nova Receita</h1>
        <p class="page-subtitle">Preencha todos os campos para cadastrar</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="salvar()" class="recipe-form" novalidate>

        <!-- Linha 1: Nome + Categoria -->
        <div class="form-row">
          <div class="form-group">
            <label for="nome">Nome da Receita *</label>
            <input
              id="nome"
              formControlName="nome"
              class="form-control"
              [class.is-invalid]="isInvalid('nome')"
              placeholder="Ex: Brigadeiro Tradicional"
            />
            @if (isInvalid('nome')) {
              <span class="error-msg">{{ getError('nome') }}</span>
            }
          </div>

          <div class="form-group">
            <label for="categoria">Categoria *</label>
            <select
              id="categoria"
              formControlName="categoria"
              class="form-control"
              [class.is-invalid]="isInvalid('categoria')"
            >
              <option value="" disabled selected>Selecione...</option>
              @for (cat of categorias; track cat.value) {
                <option [value]="cat.value">{{ cat.label }}</option>
              }
            </select>
            @if (isInvalid('categoria')) {
              <span class="error-msg">Categoria é obrigatória</span>
            }
          </div>
        </div>

        <!-- Linha 2: Tempo + Porções -->
        <div class="form-row">
          <div class="form-group">
            <label for="tempoPreparo">Tempo de Preparo (minutos) *</label>
            <input
              id="tempoPreparo"
              type="number"
              formControlName="tempoPreparo"
              class="form-control"
              [class.is-invalid]="isInvalid('tempoPreparo')"
              placeholder="30"
              min="1"
            />
            @if (isInvalid('tempoPreparo')) {
              <span class="error-msg">{{ getError('tempoPreparo') }}</span>
            }
          </div>

          <div class="form-group">
            <label for="porcoes">Porções *</label>
            <input
              id="porcoes"
              type="number"
              formControlName="porcoes"
              class="form-control"
              [class.is-invalid]="isInvalid('porcoes')"
              placeholder="4"
              min="1"
            />
            @if (isInvalid('porcoes')) {
              <span class="error-msg">{{ getError('porcoes') }}</span>
            }
          </div>
        </div>

        <!-- Ingredientes dinâmicos (FormArray) -->
        <div class="form-section">
          <div class="section-header">
            <label>Ingredientes * <span class="count-badge">{{ ingredientesArray.length }}</span></label>
            <button type="button" class="btn-add" (click)="adicionarIngrediente()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Adicionar ingrediente
            </button>
          </div>

          <div formArrayName="ingredientes" class="ingredientes-list">
            @for (ctrl of ingredientesArray.controls; track $index) {
              <div class="ingrediente-row">
                <span class="ingrediente-num">{{ $index + 1 }}</span>
                <input
                  [formControlName]="$index"
                  class="form-control"
                  [class.is-invalid]="isIngredienteInvalid($index)"
                  placeholder="Ex: 1 lata de leite condensado"
                />
                @if (ingredientesArray.length > 1) {
                  <button type="button" class="btn-remove" (click)="removerIngrediente($index)" aria-label="Remover ingrediente">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                }
              </div>
            }
          </div>

          @if (ingredientesArray.invalid && form.get('ingredientes')?.touched) {
            <span class="error-msg">Adicione pelo menos 1 ingrediente preenchido</span>
          }
        </div>

        <!-- Modo de Preparo -->
        <div class="form-group">
          <label for="modoPreparo">Modo de Preparo *</label>
          <textarea
            id="modoPreparo"
            formControlName="modoPreparo"
            class="form-control"
            [class.is-invalid]="isInvalid('modoPreparo')"
            placeholder="Descreva o passo a passo do preparo..."
            rows="6"
          ></textarea>
          @if (isInvalid('modoPreparo')) {
            <span class="error-msg">{{ getError('modoPreparo') }}</span>
          }
        </div>

        <!-- Ações -->
        <div class="form-actions">
          <a routerLink="/" class="btn btn-ghost">Cancelar</a>
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="form.invalid || salvando()"
          >
            @if (salvando()) {
              <span class="btn-spinner"></span>
              Salvando...
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Salvar Receita
            }
          </button>
        </div>

      </form>

      <!-- Toast -->
      @if (toastMsg()) {
        <div class="toast" [class]="toastClass()">{{ toastMsg() }}</div>
      }
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 36px;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 12px;
      transition: color 0.2s;
    }
    .back-link:hover { color: var(--accent); }

    .page-title {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 700;
    }
    .page-subtitle {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-top: 4px;
    }

    .recipe-form {
      background: var(--surface);
      border-radius: var(--radius);
      padding: 36px;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 760px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media (max-width: 600px) {
      .form-row { grid-template-columns: 1fr; }
      .recipe-form { padding: 24px; }
    }

    /* Ingredients */
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-header label {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .count-badge {
      background: var(--accent-light);
      color: var(--accent);
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 20px;
      font-weight: 600;
    }
    .btn-add {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--accent-light);
      color: var(--accent);
      border: none;
      border-radius: 8px;
      padding: 7px 14px;
      font-size: 0.82rem;
      font-weight: 500;
      transition: background 0.2s;
    }
    .btn-add:hover { background: #f0c4bf; }

    .ingredientes-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .ingrediente-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ingrediente-num {
      width: 26px;
      height: 26px;
      background: var(--bg);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 600;
      flex-shrink: 0;
    }
    .btn-remove {
      background: none;
      border: none;
      color: var(--text-secondary);
      padding: 6px;
      border-radius: 6px;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .btn-remove:hover {
      background: var(--accent-light);
      color: var(--accent);
    }

    /* Actions */
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 8px;
      border-top: 1px solid var(--border);
    }

    .btn-spinner {
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class RecipeFormComponent {
  categorias = CATEGORIAS;
  salvando = signal(false);
  toastMsg = signal('');
  toastClass = signal('toast toast-success');

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      tempoPreparo: [null, [Validators.required, Validators.min(1)]],
      porcoes: [null, [Validators.required, Validators.min(1)]],
      ingredientes: this.fb.array([this.criarIngredienteControl()]),
      modoPreparo: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get ingredientesArray(): FormArray {
    return this.form.get('ingredientes') as FormArray;
  }

  criarIngredienteControl() {
    return this.fb.control('', [Validators.required, Validators.minLength(1)]);
  }

  adicionarIngrediente() {
    this.ingredientesArray.push(this.criarIngredienteControl());
  }

  removerIngrediente(index: number) {
    if (this.ingredientesArray.length > 1) {
      this.ingredientesArray.removeAt(index);
    }
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  isIngredienteInvalid(index: number): boolean {
    const c = this.ingredientesArray.at(index);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  getError(field: string): string {
    const c = this.form.get(field);
    if (!c || !c.errors) return '';
    if (c.errors['required']) return `Campo obrigatório`;
    if (c.errors['minlength']) {
      const min = c.errors['minlength'].requiredLength;
      return `Mínimo de ${min} caracteres`;
    }
    if (c.errors['min']) return `Valor mínimo é 1`;
    return 'Campo inválido';
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando.set(true);
    const payload = {
      ...this.form.value,
      ingredientes: this.form.value.ingredientes.filter((i: string) => i.trim())
    };

    this.recipeService.criar(payload).subscribe({
      next: () => {
        this.mostrarToast('Receita cadastrada com sucesso!', 'success');
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        this.salvando.set(false);
        const msg = err?.error?.message || 'Erro ao salvar receita';
        this.mostrarToast(msg, 'error');
      }
    });
  }

  private mostrarToast(msg: string, tipo: 'success' | 'error') {
    this.toastMsg.set(msg);
    this.toastClass.set(`toast toast-${tipo}`);
    setTimeout(() => this.toastMsg.set(''), 3000);
  }
}
