import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';

import { Item } from '../employee';
import { ApiService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  pagetitle = 'Сотрудники';
  title = 'сотрудник';
  path = this.apiService.section;
  itemList: Item[] = [];
  isLoggedIn = false;
  showAdmin = false;
  itemForm = this.fb.group({
    employeeNumber: [''],
    fullName: [''],
    position: [''],
  });

  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }

  getItemList(): void {
    this.apiService.getItemList().subscribe((itemList) => {
      this.itemList = itemList;
    });
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
