import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { PHARMACY_PRODUCTS, PRODUCT_CATEGORIES } from '../../constants/products';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ProductCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent {
  products = PHARMACY_PRODUCTS;
  categories = PRODUCT_CATEGORIES;

  selectedCategory = signal<string>('Todos');
  searchTerm = signal<string>('');

  get filteredProducts(): Product[] {
    let filtered = this.products;

    if (this.selectedCategory() !== 'Todos') {
      filtered = filtered.filter(p => p.categoria === this.selectedCategory());
    }

    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }
}
