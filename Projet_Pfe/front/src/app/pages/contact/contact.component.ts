import { Component } from '@angular/core';
import { read, utils } from 'xlsx';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {


  showDetails(): void {
    
    alert('Votre message a été envoyé avec succès ! Nous vous contacterons dès que possible.'); 
  }
  
  // excelData: any[][] = []; // Variable pour stocker les données du fichier Excel

  // constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   this.http.get<any[][]>('assets/excel-data.json').subscribe(data => {
  //     this.excelData = data;
  //   });
  // }

  excelData: any[] = [];

  constructor() {
    this.readExcelFile();
  }

  readExcelFile() {
const excelFileUrl = 'assets/excel/Orchestra.xlsx';
const xhr = new XMLHttpRequest();

xhr.open('GET', excelFileUrl, true);
xhr.responseType = 'arraybuffer';

xhr.onload = (e) => {
  const arrayBuffer = xhr.response;
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: 'array' });

  const worksheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[worksheetName];

  this.excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
};

xhr.send();

  }




}
