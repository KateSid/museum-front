import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';

import { Item } from '../exhibit';
import { ApiService } from '../exhibit.service';

import { Item as ItemAuthor } from '../author';
import { ApiService as ApiServiceAuthor } from '../author.service';

@Component({
  selector: 'app-exhibits',
  templateUrl: './exhibits.component.html',
  styleUrls: ['./exhibits.component.css']
})
export class ExhibitsComponent implements OnInit {
  pagetitle = 'Экспонаты';
  title = 'экспонат';
  path = this.apiService.section;
  itemList: Item[] = [];
  itemListAuthor: ItemAuthor[] = [];
  isLoggedIn = false;
  showAdmin = false;
  itemForm = this.fb.group({
    creationDate: [''],
    authorsForm: [''],
    additionalInformation: [''],
    height: [''],
    length: [''],
    width: [''],
    name: [''],
    type: [''],
  });

  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private apiServiceAuthor: ApiServiceAuthor,
    private fb: FormBuilder
  ) { }

  getItemList(): void {
    this.apiService.getItemList().subscribe((itemList) => {
      this.itemList = itemList;
    });

    if (this.showAdmin) {
      this.apiServiceAuthor.getItemList().subscribe((itemList) => {
        this.itemListAuthor = itemList;
      });
    }
  }

  delete(item: Item): void {
    this.itemList = this.itemList.filter(i => i !== item);
    this.apiService.deleteItem(item.id).subscribe();
  }

  add(): void {
    this.apiService.addItem(this.itemForm.value).subscribe(item => {
      this.reloadPage();
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
