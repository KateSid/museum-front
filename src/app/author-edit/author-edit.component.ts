import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Item } from '../author';
import { ApiService } from '../author.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  title = 'автора';
  item?: Item;
  showAdmin = false;
  itemForm = this.fb.group({
    country: [''],
    dateOfBirth: [''],
    dateOfDeath: [''],
    firstName: [''],
    fullName: [''],
    lastName: [''],
    pseudonym: [''],
  });
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
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
