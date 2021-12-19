import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../showroom';
import { ApiService } from '../showroom.service';

@Component({
  selector: 'app-showroom-edit',
  templateUrl: './showroom-edit.component.html',
  styleUrls: ['./showroom-edit.component.css']
})
export class ShowroomEditComponent implements OnInit {
  title = 'выставочного зала';
  item?: Item;
  showAdmin = false;
  itemForm = this.fb.group({
    floor: [''],
    name: [''],
    size: [''],
  });
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  getItem(): void {
    this.apiService.getItem(this.id).subscribe(item => {
      this.item = item;
      this.itemForm.patchValue(item);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.apiService.updateItem(this.itemForm.value, this.id).subscribe(() => this.goBack());
  }

  ngOnInit(): void {
    const login = this.loginService.login();

    if (login) {
      if (login.showAdmin) {
        this.showAdmin = true;
        this.getItem();
      }
    }
  }

}
