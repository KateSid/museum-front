import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../restoration';
import { ApiService } from '../restoration.service';

import { Item as ItemEmployee } from '../employee';
import { ApiService as ApiServiceEmployee } from '../employee.service';

import { Item as ItemExhibit } from '../exhibit';
import { ApiService as ApiServiceExhibit } from '../exhibit.service';

@Component({
  selector: 'app-restoration-edit',
  templateUrl: './restoration-edit.component.html',
  styleUrls: ['./restoration-edit.component.css']
})
export class RestorationEditComponent implements OnInit {
  title = 'реставрации';
  item?: Item;
  itemListEmployee: ItemEmployee[] = [];
  itemListExhibit: ItemExhibit[] = [];
  showAdmin = false;
  itemForm = this.fb.group({
    comment: [''],
    employeeForm: [''],
    endDate: [''],
    exhibitForm: [''],
    startDate: [''],
  });
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private apiService: ApiService,
    private apiServiceEmployee: ApiServiceEmployee,
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

    this.apiServiceEmployee.getItemList().subscribe((itemList) => {
      this.itemListEmployee = itemList;
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

}
