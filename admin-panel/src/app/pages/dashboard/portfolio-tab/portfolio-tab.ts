import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Portfolio, PortfolioImage } from '../../../services/services/portfolio';
import { Cloudinary } from '../../../services/cloudinary';

@Component({
  selector: 'app-portfolio-tab',
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-tab.html',
  styleUrl: './portfolio-tab.css',
})
export class PortfolioTab implements OnInit{
  images = signal<PortfolioImage[]>([]);
  isLoading = signal<boolean>(true);
  isUploading = signal<boolean>(false);
  errorMessage = signal<string>('');

  // Delete confirmation modal
  imageToDelete = signal<PortfolioImage | null>(null);

  constructor(
    private portfolioService: Portfolio,
    private cloudinaryService: Cloudinary,
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.isLoading.set(true);
    this.portfolioService.getAll().subscribe({
      next: (data) => {
        this.images.set(data.sort((a, b) => a.displayOrder - b.displayOrder));
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في تحميل الصور');
        this.isLoading.set(false);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.errorMessage.set('');
    this.isUploading.set(true);

    this.cloudinaryService.uploadImage(file).subscribe({
      next: (url) => {
        const nextOrder = this.images().length
          ? Math.min(...this.images().map((i) => i.displayOrder)) - 1
          : 1;

        this.portfolioService.add({ imageUrl: url, displayOrder: nextOrder }).subscribe({
          next: () => {
            this.isUploading.set(false);
            input.value = '';
            this.loadImages();
          },
          error: () => {
            this.errorMessage.set('حصل خطأ في حفظ الصورة');
            this.isUploading.set(false);
          },
        });
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في رفع الصورة');
        this.isUploading.set(false);
      },
    });
  }

  confirmDelete(img: PortfolioImage) {
    this.imageToDelete.set(img);
  }

  cancelDelete() {
    this.imageToDelete.set(null);
  }

  deleteConfirmed() {
    const img = this.imageToDelete();
    if (!img) return;

    this.portfolioService.delete(img.id).subscribe({
      next: () => {
        this.imageToDelete.set(null);
        this.loadImages();
      },
      error: () => {
        this.errorMessage.set('حصل خطأ في حذف الصورة');
        this.imageToDelete.set(null);
      },
    });
  }
}
