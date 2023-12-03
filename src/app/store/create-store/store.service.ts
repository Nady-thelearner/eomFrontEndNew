import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private authenticated: boolean = false;
  private token: string;

  constructor(private http: HttpClient, private userSF: UserService) {
    this.initialize();
  }

  private initialize() {
    // Initialization logic here
    this.authenticated = this.userSF.getAuthenticated();
    if (this.authenticated) {
      this.token = this.userSF.getToken();
    }
  }
  createStore(
    vendorid: string,
    logo: string,
    businessEmail: string,
    address: string,
    pin: string,
    latitude: string,
    longitude: string
  ) {
    if (this.authenticated) {
      const headers = new HttpHeaders({
        authorization: this.token,
      });
      console.log('create store triggered');
      const formData = new FormData();
      formData.append('vendor_id', vendorid),
        formData.append('logo', logo),
        formData.append('business_email', businessEmail),
        formData.append('address', address),
        formData.append('pin', pin),
        formData.append('latitude', latitude),
        formData.append('longitude', longitude);

      this.http
        .post('http://localhost:3000/api/create-store', formData, { headers })
        .subscribe((data) => console.log(data));
    }
  }

  fetchStore(userID: string): any {

    if (this.authenticated) {
      console.log("fetch ssttore triggered......",this.token)
      const headers = new HttpHeaders({
        authorization: this.token,
      });
      const params = new HttpParams().set('vendor_id', userID);

      const options = {
        headers: headers,
        params: params,
      };
      return this.http.get('http://localhost:3000/api/get-store', options);
    }
  }

  fetchSubCategory(subCategoryName: string): any {
    console.log('function called..fetchSubCategory.');
    if (this.authenticated) {
      console.log('function called..fetchSubCategory...inside if');
      const headers = new HttpHeaders({
        authorization: this.token,
      });
      const params = new HttpParams().set('subCategoryName', subCategoryName);

      const options = {
        headers: headers,
        params: params,
      };
      return this.http.get(
        'http://localhost:3000/api/fetch-sub-category',
        options
      );
    }
  }
}
