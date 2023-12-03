import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Injectable({ providedIn: 'root' })
export class productService {
  constructor(private http: HttpClient, private userSF: UserService) {}

  addProduct(
    productName: string,
    categoryId: string,
    subCategoryId: string,
    vendor_id: string,
    store_id: string,
    image: string,
    price: string,
    discount: string
  ) {
    if (this.userSF.getAuthenticated) {
      const token = this.userSF.getToken();
      console.log('tokken...', token);
      const headers = new HttpHeaders({
        authorization: token,
      });
      console.log('add product triggered');
      const formData = new FormData();
      formData.append('vendor_id', vendor_id),
        formData.append('store_id', store_id),
        formData.append('name', productName),
        formData.append('price', price),
        formData.append('discount', discount),
        formData.append('category_id', categoryId),
        formData.append('subCategory_id', subCategoryId);
      formData.append('images', image);
      this.http
        .post('http://localhost:3000/api/add-product', formData, { headers })
        .subscribe((data) => console.log(data));
    }
  }

  getProduct(vendor_id: string): any {
    console.log("get product triggered...",vendor_id);
    if (this.userSF.getAuthenticated) {
      var token = this.userSF.getToken();
      console.log('fetch prooduct triggered......', token);
      const headers = new HttpHeaders({
        authorization: token,
      });
      const params = new HttpParams().set('vendor_id', vendor_id);

      const options = {
        headers: headers,
        params: params,
      };
      return this.http.get('http://localhost:3000/api/get-productNew', options);
    }
  }
}
