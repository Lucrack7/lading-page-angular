import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Welcome } from '../models/product.model'; 
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})


export class ProductDetailComponent implements OnInit{
  
  loading: boolean = true;
  public product?: Welcome;
  private _router = inject(ActivatedRoute);
  private _apiService = inject(ApiService);
  imageUrl: SafeUrl;  // Propiedad para almacenar la imagen sanitizada
  

  constructor(private sanitizer: DomSanitizer) {
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('');
  }

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this._router.params.subscribe(params => {
      // Llamar al servicio API para obtener los detalles del producto
      this._apiService.getProduct(params['id']).subscribe((data: Welcome) => {
        this.product = data;
        this.loading = false;
        
        // Sanitizar la URL de la imagen y asignarla a imageUrl
        if (this.product?.image) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.product.image);
        }
      });
    });
  }

}
