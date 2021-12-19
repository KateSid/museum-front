import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../exhibit';
import { ApiService } from '../exhibit.service';

import { Item as ItemAuthor } from '../author';
import { ApiService as ApiServiceAuthor } from '../author.service';

@Component({
  selector: 'app-exhibit-edit',
  templateUrl: './exhibit-edit.component.html',
  styleUrls: ['./exhibit-edit.component.css']
})
export class ExhibitEditComponent implements OnInit {
  title = 'экспоната';
  item?: Item;
  itemListAuthor: ItemAuthor[] = [];
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
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private apiService: ApiService,
    private apiServiceAuthor: ApiServiceAuthor,
    private location: Location,
    private fb: FormBuilder
  ) { }

  getItem(): void {
    this.apiService.getItem(this.id).subscribe(item => {
      const itemEdited = this.apiService.editToForm(item);

      this.item = item;
      this.itemForm.patchValue(itemEdited);
    });

    this.apiServiceAuthor.getItemList().subscribe((itemList) => {
      this.itemListAuthor = itemList;
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

  compareFn(c1: ItemAuthor, c2: ItemAuthor): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
