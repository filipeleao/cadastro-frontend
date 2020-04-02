import {AfterViewInit, Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from './api.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'cpf', 'email', 'acoes'];
  // tslint:disable-next-line:variable-namey
  _form: FormGroup;
  person: Person;
  cpf: string = '';

  constructor(private apiService: ApiService, private toastrService: ToastrService, private formBuilder: FormBuilder) {
    // @ts-ignore
    this.person = {};
    this._form = formBuilder.group({
      name: [null, Validators.required],
      sex: [null],
      email: [null],
      birthDate: [null, Validators.required],
      nationality: [null],
      naturality: [null],
      cpf: [null, Validators.required]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.getAll();
  }

  getAll() {
    this.apiService.getAll().subscribe(value => {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(value);
    });
  }

  delete(cpf: string) {
    this.apiService.delete(cpf).subscribe(value => {
      if (value.status === 200) {
        this.toastrService.success(null, 'Remoção relizada com sucesso.');
        this.getAll();
      } else {
        this.toastrService.error(null, 'Erro ao realizar remoção.');
      }
    });
  }

  send() {
    if (this.cpf === '') {
      this.apiService.save(this.person).subscribe(value => {
        if (value.status === 200) {
          this.toastrService.success(null, 'Inclusão relizada com sucesso.');
          this.getAll();
        } else {
          this.toastrService.error(null, 'Erro ao incluir remoção.');
        }
      });
    } else {
      this.apiService.update(this.cpf, this.person).subscribe(value => {
        if (value.status === 200) {
          this.toastrService.success(null, 'Alteração relizada com sucesso.');
          this.getAll();
        } else {
          this.toastrService.error(null, 'Erro ao alterar remoção.');
        }
      });
    }
  }

  selectRow(row) {
    this.person = row;
    this.cpf = this.person.cpf;
  }

  clear() {
    // @ts-ignore
    this.person = '';
    this.cpf = '';
  }

}
