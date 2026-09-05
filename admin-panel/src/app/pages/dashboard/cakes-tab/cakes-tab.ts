import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cake, Cakes } from '../../../services/services/cakes';
import { Cloudinary } from '../../../services/services/cloudinary';

@Component({
  selector: 'app-cakes-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './cakes-tab.html',
  styleUrl: './cakes-tab.css',
})
export class CakesTab implements OnInit {
  items = signal<Cake[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  showForm = signal<boolean>(false);
  editingItem = signal<Cake | null>(null);
  formName = '';
  formDescription = '';
  formImageUrl = '';
  isUploadingImage = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  formErrorMessage = signal<string>('');

  itemToDelete = signal<Cake | null>(null);

  constructor(
    private cakesService: Cakes,
    private cloudinaryService: Cloudinary,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.isLoading.set(true);
    this.cakesService.getAll().subscribe({
      next: (data) => {
        this.items.set(data.sort((a, b) => a.displayOrder - b.displayOrder));
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في تحميل التورتات');
        this.isLoading.set(false);
      },
    });
  }

  openAddForm() {
    this.editingItem.set(null);
    this.formName = '';
    this.formDescription = '';
    this.formImageUrl = '';
    this.formErrorMessage.set('');
    this.showForm.set(true);
  }

  openEditForm(item: Cake) {
    this.editingItem.set(item);
    this.formName = item.name;
    this.formDescription = item.description ?? '';
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
        this.formErrorMessage.set('حصل خطأ في رفع الصورة');
        this.isUploadingImage.set(false);
      },
    });
  }

  saveForm() {
    this.formErrorMessage.set('');

    if (!this.formName.trim() || !this.formImageUrl) {
      this.formErrorMessage.set('من فضلك اكتب الاسم واختار صورة');
      return;
    }

    this.isSaving.set(true);
    const editing = this.editingItem();

    const payload: Partial<Cake> = {
      name: this.formName.trim(),
      description: this.formDescription.trim(),
      imageUrl: this.formImageUrl,
      isFeatured: true,
    };

    if (editing) {
      this.cakesService
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

      this.cakesService.add({ ...payload, displayOrder: nextOrder }).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showForm.set(false);
          this.loadItems();
        },
        error: () => {
          this.formErrorMessage.set('حصل خطأ في إضافة التورتة');
          this.isSaving.set(false);
        },
      });
    }
  }

  confirmDelete(item: Cake) {
    this.itemToDelete.set(item);
  }

  cancelDelete() {
    this.itemToDelete.set(null);
  }

  deleteConfirmed() {
    const item = this.itemToDelete();
    if (!item) return;

    this.cakesService.delete(item.id).subscribe({
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
