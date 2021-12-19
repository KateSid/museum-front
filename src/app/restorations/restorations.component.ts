import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';

import { Item } from '../restoration';
import { ApiService } from '../restoration.service';

import { Item as ItemEmployee } from '../employee';
import { ApiService as ApiServiceEmployee } from '../employee.service';

import { Item as ItemExhibit } from '../exhibit';
import { ApiService as ApiServiceExhibit } from '../exhibit.service';

@Component({
  selector: 'app-restorations',
  templateUrl: './restorations.component.html',
  styleUrls: ['./restorations.component.css']
})
export class RestorationsComponent implements OnInit {
  pagetitle = 'Реставрации';
  title = 'реставрация';
  path = this.apiService.section;
  itemList: Item[] = [];
  itemListEmployee: ItemEmployee[] = [];
  itemListExhibit: ItemExhibit[] = [];
  isLoggedIn = false;
  showAdmin = false;
  itemForm = this.fb.group({
    comment: [''],
    employeeForm: [''],
    endDate: [''],
    exhibitForm: [''],
    startDate: [''],
  });

  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private apiServiceEmployee: ApiServiceEmployee,
    private apiServiceExhibit: ApiServiceExhibit,
    private fb: FormBuilder
  ) { }

  getItemList(): void {
    this.apiService.getItemList().subscribe((itemList) => {
      this.itemList = itemList;
    });

    if (this.showAdmin) {
      this.apiServiceEmployee.getItemList().subscribe((itemList) => {
        this.itemListEmployee = itemList;
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
