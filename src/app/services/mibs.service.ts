import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const mibUrl = '../assets/data/SNMPv2-MIB.json';

@Injectable()
export class MibsService {

  constructor(private http: HttpClient) { }

  getMibs() {
    return this.http.get(mibUrl);
  }
}
