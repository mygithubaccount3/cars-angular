import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    return {
      carOwners: [
        {
          id: 1,
          last_name: 'dff2',
          first_name: 'qeqweqw',
          third_name: 'bmbmnb',
          cars: [
            {
              id: 1,
              license_plate_number: 'AA2222HH',
              manufacturer: 'Opel',
              model: 'Astra',
              production_year: 1990,
              owner_id: 1,
            },
          ],
        },
        {
          id: 2,
          last_name: 'dffs',
          first_name: 'qeqweqw',
          third_name: 'bmbmnb',
          cars: [
            {
              id: 2,
              license_plate_number: 'AA3333HH',
              manufacturer: 'Opel',
              model: 'Astra',
              production_year: 1992,
              owner_id: 2,
            },
          ],
        },
        {
          id: 3,
          last_name: 'dffs',
          first_name: 'qeqweqw',
          third_name: 'bmbmnb',
          cars: [
            {
              id: 3,
              license_plate_number: 'AA4444HH',
              manufacturer: 'Opel',
              model: 'Astra',
              production_year: 1986,
              owner_id: 3,
            },
          ],
        },
        {
          id: 4,
          last_name: 'dffs',
          first_name: 'qeqweqw',
          third_name: 'bmbmnb',
          cars: [
            {
              id: 4,
              license_plate_number: 'AA5555HH',
              manufacturer: 'Opel',
              model: 'Astra',
              production_year: 1988,
              owner_id: 4,
            },
          ],
        },
        {
          id: 5,
          last_name: 'dffs',
          first_name: 'qeqweqw',
          third_name: 'bmbmnb',
          cars: [
            {
              id: 5,
              license_plate_number: 'AA6666HH',
              manufacturer: 'Opel',
              model: 'Astra',
              production_year: 1998,
              owner_id: 5,
            },
          ],
        },
        {
          id: 6,
          last_name: 'dffs',
          first_name: 'qeqweqw',
          third_name: 'bmbmnb',
          cars: [
            {
              id: 6,
              license_plate_number: 'AA7777HH',
              manufacturer: 'Opel',
              model: 'Astra',
              production_year: 1991,
              owner_id: 6,
            },
          ],
        },
      ],

      cars: [
        {
          id: 6,
          license_plate_number: 'AA7777HH',
          manufacturer: 'Opel',
          model: 'Astra',
          production_year: 1991,
          owner_id: 6,
        },
      ],
    };
  }
}
