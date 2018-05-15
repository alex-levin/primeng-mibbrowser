import {Injectable} from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Car} from '../../app/cars/car';

@Injectable()
export class CarService {

    constructor(private http: HttpClient) {}

    getCarsMedium() {
        // return this.http.get('assets/data/cars-medium.json')
        //             .toPromise()
        //             .then(res => <Car[]> res.json().data)
        //             .then(data => { return data; });
        return this.http.get('assets/data/cars-medium.json');
    }
}
