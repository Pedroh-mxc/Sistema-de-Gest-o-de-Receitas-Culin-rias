export type Categoria = 'DOCE' | 'SALGADO' | 'BEBIDA' | 'SOBREMESA';

export interface Recipe {
  id?: number;
  nome: string;
  categoria: Categoria;
  tempoPreparo: number;
  porcoes: number;
  ingredientes: string[];
  modoPreparo: string;
  dataCadastro?: string;
}

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: 'DOCE', label: 'Doce' },
  { value: 'SALGADO', label: 'Salgado' },
  { value: 'BEBIDA', label: 'Bebida' },
  { value: 'SOBREMESA', label: 'Sobremesa' }
];

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  DOCE: 'Doce',
  SALGADO: 'Salgado',
  BEBIDA: 'Bebida',
  SOBREMESA: 'Sobremesa'
};

export const CATEGORIA_COLORS: Record<Categoria, string> = {
  DOCE: '#e67e22',
  SALGADO: '#27ae60',
  BEBIDA: '#2980b9',
  SOBREMESA: '#8e44ad'
};
