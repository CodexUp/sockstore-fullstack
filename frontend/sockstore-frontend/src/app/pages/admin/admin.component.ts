import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProductService } from '../../services/product.service';

import { Product } from '../../models/product';

import { FormsModule } from '@angular/forms';

import { UploadService } from '../../services/upload.service';

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

  constructor(
    private productService: ProductService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

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

}