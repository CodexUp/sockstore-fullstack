import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product';

import { FormsModule } from '@angular/forms';

import { UploadService } from '../../services/upload.service';

import { DashboardService } from '../../services/dashboard.service';

import { DashboardStats } from '../../models/dashboard-stats';

@Component({
  selector: 'app-admin',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './admin.component.html',

  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  products: Product[] = [];

  selectedProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };
  
  isEditing = false;

  stats: DashboardStats = {

    totalProducts: 0,
  
    totalOrders: 0,
  
    totalSales: 0,
  
    pendingOrders: 0,
  
    completedOrders: 0
  
  };

  constructor(
    private productService: ProductService,
    private uploadService: UploadService,
    private DashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    this.loadProducts();
    this.loadStats();

  }

  loadProducts() {

    this.productService.getProducts().subscribe({
      next: (data) => {

        this.products = data;

      },

      error: (err) => {

        console.log(err);

      }
    });

  }

  deleteProduct(id: number){

    const confirmed = confirm(
      '¿Desea eliminar el producto?'
    );
    if (!confirmed) return;

    this.productService.deleteProduct(id)
    .subscribe({
      next: () => {
        this.loadProducts();
        this.loadStats();
      },

      error: (err) => {
        console.log(err);
      }
    });
  }

  editProduct(product: Product){
    this.selectedProduct = { ...product};

    this.isEditing = true;
  }

  saveProduct() {
    if (this.isEditing) {
      this.productService
        .updateProduct(this.selectedProduct)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.resetForm();
            this.loadStats();
          },
          error: (err) => {
            console.log(err);
          }
        });
    } else {
  
      this.productService
        .createProduct(this.selectedProduct)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.resetForm();
            this.loadStats();
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  resetForm() {

    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: ''
    };
  
    this.isEditing = false;
  
  }

  onFileSelected(event: any) {

    const file = event.target.files[0];
  
    if (!file) return;
  
    this.uploadService
      .uploadImage(file)
      .subscribe({
  
        next: (response) => {

          console.log(response);
  
          this.selectedProduct.imageUrl =
            response.imageUrl;
  
        },
  
        error: (err) => {
  
          console.log(err);
  
        }
  
      });
  
  }

  loadStats()
  {
    this.DashboardService
    .getStats()
    .subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}