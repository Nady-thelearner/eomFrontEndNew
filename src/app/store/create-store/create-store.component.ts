import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';
import { StoreService } from './store.service';
import { productService } from '../add-product/product.service';
import { MatTableDataSource } from '@angular/material/table';

export interface productElement {
  //product_name price discount images
  product_name: string;
  price: number;
  discount: number;
  images: string;
}
@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',

  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent implements OnInit {
  displayedColumns: string[] = ['product_name', 'price', 'discount', 'images'];
  dataSource = new MatTableDataSource<productElement>();
  form: FormGroup;
  imagePreview: string;
  storeData: any;
  storePresent = false;
  userID: string;
  productPresent: boolean = false;

  constructor(
    private storeSF: StoreService,
    private userSF: UserService,
    private productSF: productService
  ) {}

  ngOnInit(): void {
    const vendor_id = this.userSF.getUserID().userId;
    console.log('vendor Id on ng it ', vendor_id);
    this.productSF.getProduct(vendor_id).subscribe((res) => {
      console.log('productsss create store component', res);
      if (res) {
        this.dataSource.data = res.data;
        this.productPresent = true;
      }
    });
    this.userID = this.userSF.getUserID().userId
      ? this.userSF.getUserID().userId
      : '';
    this.form = new FormGroup({
      vendorid: new FormControl(null, { validators: [Validators.required] }),
      logo: new FormControl(null, { validators: [Validators.required] }),
      businessEmail: new FormControl(null, {
        validators: [Validators.required],
      }),
      adderess: new FormControl(null, { validators: [Validators.required] }),
      pin: new FormControl(null, { validators: [Validators.required] }),
      latitude: new FormControl(null, { validators: [Validators.required] }),
      longitude: new FormControl(null, { validators: [Validators.required] }),
    });

    if (this.userSF.getAuthenticated) {
      this.userID = this.userSF.getUserID().userId;
      console.log('Inside if....', this.userID);
      this.form.patchValue({ vendorid: this.userID });
      this.form.get('vendorid').updateValueAndValidity();
      console.log('vendor_id', this.userID);
      this.storeSF.fetchStore(this.userID).subscribe((data) => {
        this.storeData = data;
        this.storePresent = true;
        console.log('sotre Data/...', this.storeData);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.storeSF.createStore(
      this.form.value.vendorid,
      this.form.value.logo,
      this.form.value.businessEmail,
      this.form.value.adderess,
      this.form.value.pin,
      this.form.value.latitude,
      this.form.value.longitude
    );
  }

  onImagePicked(event: Event) {
    const logo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ logo: logo });
    this.form.get('logo').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(logo);
  }
}
