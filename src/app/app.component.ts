import { Component } from '@angular/core';
import { Car } from './cars/car';
import { MibInterface } from './mibs/mib';
import { CarService } from './cars/carservice';
import { MibsService } from './services/mibs.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    displayDialog: boolean;

    car: Car = new PrimeCar();
    
    selectedCar: Car;
    
    newCar: boolean;

    cars: Array<Car>;

    mibs: Array<MibInterface>;

    constructor(private carService: CarService, private mibsService: MibsService) { 
        this.carService.getCarsMedium().subscribe((cars: any) => {
            this.cars = cars.data;
        });

        mibsService.getMibs().subscribe(json => {
            Object.getOwnPropertyNames(json).forEach((property: any) => {
                let mib: any = json[property];
                if(mib.name && mib.oid && mib.nodetype && mib.status) {
                    // "sysDescr": {
                    //     "name": "sysDescr",
                    //     "oid": "1.3.6.1.2.1.1.1",
                    //     "nodetype": "scalar",
                    //     "class": "objecttype",
                    //     "syntax": {
                    //       "type": "DisplayString",
                    //       "class": "type",
                    //       "constraints": {
                    //         "size": [
                    //           {
                    //             "min": 0,
                    //             "max": 255
                    //           }
                    //         ]
                    //       }
                    //     },
                    //     "maxaccess": "read-only",
                    //     "status": "current",
                    //     "description": "A textual description of the entity.
                    //   },                    
                    // sysDescr 1.3.6.1.2.1.1.1 scalar read-only current objecttype
                    // sysObjectID 1.3.6.1.2.1.1.2 scalar read-only current objecttype
                    // sysUpTime 1.3.6.1.2.1.1.3 scalar read-only current objecttype
                    // sysContact 1.3.6.1.2.1.1.4 scalar read-write current objecttype
                    // sysName 1.3.6.1.2.1.1.5 scalar read-write current objecttype
                    // sysLocation 1.3.6.1.2.1.1.6 scalar read-write current objecttype
                    // sysServices 1.3.6.1.2.1.1.7 scalar read-only current objecttype
                    // sysORLastChange 1.3.6.1.2.1.1.8 scalar read-only current objecttype
                    // sysORTable 1.3.6.1.2.1.1.9 table not-accessible current objecttype
                    // sysOREntry 1.3.6.1.2.1.1.9.1 row not-accessible current objecttype
                    // sysORIndex 1.3.6.1.2.1.1.9.1.1 column not-accessible current objecttype
                    // sysORID 1.3.6.1.2.1.1.9.1.2 column read-only current objecttype
                    // sysORDescr 1.3.6.1.2.1.1.9.1.3 column read-only current objecttype
                    // sysORUpTime 1.3.6.1.2.1.1.9.1.4 column read-only current objecttype
                    // snmpOutPkts 1.3.6.1.2.1.11.2 scalar read-only obsolete objecttype       
                    console.log(mib.name + ' ' + mib.oid + ' ' + mib.nodetype + ' ' + mib.maxaccess + ' ' + mib.status + ' ' + mib.class);
                }
            });
            
        });
    }
    
    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }
    
    save() {
        let cars = [...this.cars];
        if(this.newCar)
            cars.push(this.car);
        else
            cars[this.findSelectedCarIndex()] = this.car;
        
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }
    
    delete() {
        let index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val,i) => i!=index);
        this.car = null;
        this.displayDialog = false;
    }    
    
    onRowSelect(event) {
        this.newCar = false;
        this.car = this.cloneCar(event.data);
        this.displayDialog = true;
    }
    
    cloneCar(c: Car): Car {
        let car = new PrimeCar();
        for(let prop in c) {
            car[prop] = c[prop];
        }
        return car;
    }
    
    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}