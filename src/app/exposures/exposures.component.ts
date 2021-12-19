import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';

import { Item } from '../exposure';
import { ApiService } from '../exposure.service';

import { Item as ItemShowroom } from '../showroom';
import { ApiService as ApiServiceShowroom } from '../showroom.service';

import { Item as ItemExhibit } from '../exhibit';
import { ApiService as ApiServiceExhibit } from '../exhibit.service';

@Component({
  selector: 'app-exposures',
  templateUrl: './exposures.component.html',
  styleUrls: ['./exposures.component.css']
})
export class ExposuresComponent implements OnInit {
  pagetitle = 'Выставки';
  title = 'выставка';
  path = this.apiService.section;
  itemList: Item[] = [];
  itemListShowroom: ItemShowroom[] = [];
  itemListExhibit: ItemExhibit[] = [];
  isLoggedIn = false;
  showAdmin = false;
  itemForm = this.fb.group({
    endDateTime: [''],
    name: [''],
    showroomForm: [''],
    exhibitsForm: [''],
    startDateTime: [''],
    type: [''],
  });

  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private apiServiceShowroom: ApiServiceShowroom,
    private apiServiceExhibit: ApiServiceExhibit,
    private fb: FormBuilder
  ) { }

  getItemList(): void {
    this.apiService.getItemList().subscribe((itemList) => {
      itemList.forEach((item, index) => {
        const startDateTime = new Date(item.startDateTime);
        const endDateTime = new Date(item.endDateTime);

        itemList[index].startDateTime = startDateTime.toLocaleString('ru-RU');
        itemList[index].endDateTime = endDateTime.toLocaleString('ru-RU');
      })

      this.itemList = itemList;
    });

    if (this.showAdmin) {
      this.apiServiceShowroom.getItemList().subscribe((itemList) => {
        this.itemListShowroom = itemList;
      });

      this.apiServiceExhibit.getItemList().subscribe((itemList) => {
        this.itemListExhibit = itemList;
      });
    }
  }

  delete(item: Item): void {
    this.itemList = this.itemList.filter(i => i !== item);
    this.apiService.deleteItem(item.id).subscribe();
  }

  add(): void {
    this.apiService.addItem(this.itemForm.value).subscribe(item => {
      const startDateTime = new Date(item.startDateTime);
      const endDateTime = new Date(item.endDateTime);

      item.startDateTime = startDateTime.toLocaleString('ru-RU');
      item.endDateTime = endDateTime.toLocaleString('ru-RU');
      this.itemList.push(item);
    });
  }

  ngOnInit(): void {
    const login = this.loginService.login();

    if (login) {
      this.isLoggedIn = true;
      this.showAdmin = login.showAdmin;
      this.getItemList();
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
