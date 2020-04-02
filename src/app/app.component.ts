import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ApiService} from './api.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'cpf', 'email', 'acoes'];

  constructor(private apiService: ApiService, private toastrService: ToastrService) {

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
}
