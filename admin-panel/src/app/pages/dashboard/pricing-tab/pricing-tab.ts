import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pricing, SizePricing, SpecialPricing } from '../../../services/pricing';

@Component({
  selector: 'app-pricing-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing-tab.html',
  styleUrl: './pricing-tab.css',
})
export class PricingTab implements OnInit {
  items = signal<SizePricing[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  newLabel = '';
  newPrice = '';
  isAdding = signal<boolean>(false);

  editingId = signal<number | null>(null);
  editLabel = '';
  editPrice = '';
  isSaving = signal<boolean>(false);

  itemToDelete = signal<SizePricing | null>(null);

  // السطر الخاص
  special = signal<SpecialPricing | null>(null);
  specialLabel = '';
  specialPrice = '';
  isSavingSpecial = signal<boolean>(false);
  specialSaved = signal<boolean>(false);

  constructor(private pricingService: Pricing) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadSpecial();
  }

  loadItems() {
    this.isLoading.set(true);
    this.pricingService.getAll().subscribe({
      next: (data) => {
        this.items.set(data.sort((a, b) => a.displayOrder - b.displayOrder));
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في تحميل الأسعار');
        this.isLoading.set(false);
      },
    });
  }

  loadSpecial() {
    this.pricingService.getSpecial().subscribe({
      next: (data) => {
        this.special.set(data);
        this.specialLabel = data.label;
        this.specialPrice = data.price;
      },
      error: () => {
        // مفيش صف لسه، عادي
      },
    });
  }

  addItem() {
    if (!this.newLabel.trim() || !this.newPrice.trim()) return;

    this.isAdding.set(true);
    const nextOrder = this.items().length
      ? Math.max(...this.items().map((i) => i.displayOrder)) + 1
      : 1;

    this.pricingService
      .add({
        sizeLabel: this.newLabel.trim(),
        price: this.newPrice.trim(),
        displayOrder: nextOrder,
      })
      .subscribe({
        next: () => {
          this.newLabel = '';
          this.newPrice = '';
          this.isAdding.set(false);
          this.loadItems();
        },
        error: () => {
          this.errorMessage.set('حصل خطأ في إضافة الحجم');
          this.isAdding.set(false);
        },
      });
  }

  startEdit(item: SizePricing) {
    this.editingId.set(item.id);
    this.editLabel = item.sizeLabel;
    this.editPrice = item.price;
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  saveEdit(item: SizePricing) {
    if (!this.editLabel.trim() || !this.editPrice.trim()) return;

    this.isSaving.set(true);
    this.pricingService
      .update(item.id, {
        sizeLabel: this.editLabel.trim(),
        price: this.editPrice.trim(),
        displayOrder: item.displayOrder,
      })
      .subscribe({
        next: () => {
          this.isSaving.set(false);
          this.editingId.set(null);
          this.loadItems();
        },
        error: () => {
          this.errorMessage.set('حصل خطأ في حفظ التعديل');
          this.isSaving.set(false);
        },
      });
  }

  confirmDelete(item: SizePricing) {
    this.itemToDelete.set(item);
  }

  cancelDelete() {
    this.itemToDelete.set(null);
  }

  deleteConfirmed() {
    const item = this.itemToDelete();
    if (!item) return;

    this.pricingService.delete(item.id).subscribe({
      next: () => {
        this.itemToDelete.set(null);
        this.loadItems();
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في الحذف');
        this.itemToDelete.set(null);
      },
    });
  }

  saveSpecial() {
    if (!this.specialLabel.trim() || !this.specialPrice.trim()) return;

    this.isSavingSpecial.set(true);
    this.specialSaved.set(false);

    this.pricingService
      .updateSpecial({ label: this.specialLabel.trim(), price: this.specialPrice.trim() })
      .subscribe({
        next: () => {
          this.isSavingSpecial.set(false);
          this.specialSaved.set(true);
          setTimeout(() => this.specialSaved.set(false), 2000);
        },
        error: () => {
          this.errorMessage.set('حصل خطأ في حفظ السعر الخاص');
          this.isSavingSpecial.set(false);
        },
      });
  }
}
