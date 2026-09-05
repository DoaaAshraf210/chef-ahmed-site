import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Gateau, Gateaux } from '../../../services/services/gateaux';
import { Cloudinary } from '../../../services/services/cloudinary';

@Component({
  selector: 'app-gateaux-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './gateaux-tab.html',
  styleUrl: './gateaux-tab.css',
})
export class GateauxTab implements OnInit {
  items = signal<Gateau[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  // فورم إضافة/تعديل (نفس الفورم لحالتين)
  showForm = signal<boolean>(false);
  editingItem = signal<Gateau | null>(null);
  formName = '';
  formDescription = '';
  formSmallPrice: number | null = null;
  formLargePrice: number | null = null;
  formImageUrl = '';
  isUploadingImage = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  formErrorMessage = signal<string>('');
  itemToDelete = signal<Gateau | null>(null);

  constructor(
    private gateauxService: Gateaux,
    private cloudinaryService: Cloudinary,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.isLoading.set(true);
    this.gateauxService.getAll().subscribe({
      next: (data) => {
        this.items.set(data.sort((a, b) => a.displayOrder - b.displayOrder));
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في تحميل الجاتوهات');
        this.isLoading.set(false);
      },
    });
  }

  openAddForm() {
    this.editingItem.set(null);
    this.formName = '';
    this.formDescription = '';
    this.formSmallPrice = null;
    this.formLargePrice = null;
    this.formImageUrl = '';
    this.formErrorMessage.set('');

    this.showForm.set(true);
  }

  openEditForm(item: Gateau) {
    this.editingItem.set(item);
    this.formName = item.name;
    this.formDescription = item.description ?? '';
    this.formSmallPrice = item.smallSizePrice;
    this.formLargePrice = item.largeSizePrice;
    this.formImageUrl = item.imageUrl;
    this.formErrorMessage.set('');

    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.isUploadingImage.set(true);
    this.cloudinaryService.uploadImage(file).subscribe({
      next: (url) => {
        this.formImageUrl = url;
        this.isUploadingImage.set(false);
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في رفع الصورة');
        this.isUploadingImage.set(false);
      },
    });
  }

  saveForm() {
    this.formErrorMessage.set('');

    if (
      !this.formName.trim() ||
      !this.formImageUrl ||
      this.formSmallPrice === null ||
      this.formLargePrice === null
    ) {
      this.formErrorMessage.set('من فضلك املي كل الحقول واختار صورة');
      return;
    }

    this.isSaving.set(true);
    const editing = this.editingItem();

    const payload: Partial<Gateau> = {
      name: this.formName.trim(),
      description: this.formDescription.trim(),
      imageUrl: this.formImageUrl,
      smallSizePrice: this.formSmallPrice,
      largeSizePrice: this.formLargePrice,
    };

    if (editing) {
      this.gateauxService
        .update(editing.id, { ...payload, displayOrder: editing.displayOrder })
        .subscribe({
          next: () => {
            this.isSaving.set(false);
            this.showForm.set(false);
            this.loadItems();
          },
          error: () => {
            this.formErrorMessage.set('حصل خطأ في حفظ التعديل');
            this.isSaving.set(false);
          },
        });
    } else {
      const nextOrder = this.items().length
        ? Math.max(...this.items().map((i) => i.displayOrder)) + 1
        : 1;

      this.gateauxService.add({ ...payload, displayOrder: nextOrder }).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showForm.set(false);
          this.loadItems();
        },
        error: () => {
          this.formErrorMessage.set('حصل خطأ في إضافة الجاتو');
          this.isSaving.set(false);
        },
      });
    }
  }

  confirmDelete(item: Gateau) {
    this.itemToDelete.set(item);
  }

  cancelDelete() {
    this.itemToDelete.set(null);
  }

  deleteConfirmed() {
    const item = this.itemToDelete();
    if (!item) return;

    this.gateauxService.delete(item.id).subscribe({
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
}
