import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../exposure';
import { ApiService } from '../exposure.service';

import { Item as ItemShowroom } from '../showroom';
import { ApiService as ApiServiceShowroom } from '../showroom.service';

import { Item as ItemExhibit } from '../exhibit';
import { ApiService as ApiServiceExhibit } from '../exhibit.service';

@Component({
  selector: 'app-exposure-edit',
  templateUrl: './exposure-edit.component.html',
  styleUrls: ['./exposure-edit.component.css']
})
export class ExposureEditComponent implements OnInit {
  title = 'выставки';
  item?: Item;
  itemListShowroom: ItemShowroom[] = [];
  itemListExhibit: ItemExhibit[] = [];
  showAdmin = false;
  itemForm = this.fb.group({
    endDateTime: [''],
    name: [''],
    showroomForm: [''],
    exhibitsForm: [''],
    startDateTime: [''],
    type: [''],
  });
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private apiService: ApiService,
    private apiServiceShowroom: ApiServiceShowroom,
    private apiServiceExhibit: ApiServiceExhibit,
    private location: Location,
    private fb: FormBuilder
  ) { }

  getItem(): void {
    this.apiService.getItem(this.id).subscribe(item => {
      const itemEdited = this.apiService.editToForm(item);

      this.item = item;
      this.itemForm.patchValue(itemEdited);
    });

    this.apiServiceShowroom.getItemList().subscribe((itemList) => {
      this.itemListShowroom = itemList;
    });

    this.apiServiceExhibit.getItemList().subscribe((itemList) => {
      this.itemListExhibit = itemList;
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

  compareFn(c1: ItemExhibit, c2: ItemExhibit): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
