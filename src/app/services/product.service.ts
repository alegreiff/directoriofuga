import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from './product.model';
import { catchError, retry } from 'rxjs/operators';
import { IWeb } from './web.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products/';
  private websUrl = 'api/directorio/';
  constructor(private http: HttpClient) {}

  getSites(): Observable<IWeb[]> {
    return this.http.get<IWeb[]>(this.websUrl);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    product.id = null;
    return this.http.post<Product>(this.productsUrl, product).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
