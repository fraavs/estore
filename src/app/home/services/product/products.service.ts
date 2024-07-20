import { Injectable } from '@angular/core';
import { Product } from '../../types/products.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(query?: string): Observable<Product[]> {
    let url: string = 'http://localhost:5001/products'
    if (query) {
      url += '?' +query;
    }

    return this.httpClient.get<Product[]>(url);
  }
}
