import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CarOwner } from './interfaces/CarOwner';
import { ICarOwnerService } from './interfaces/CarOwnerService';
import { Car } from './interfaces/Car';

@Injectable({
  providedIn: 'root',
})
export class CarOwnerService implements ICarOwnerService {
  constructor(private http: HttpClient) {}

  getOwners(): Observable<CarOwner[]> {
    return this.http.get<CarOwner[]>('api/carOwners/');
  }

  getOwnerById(id: number): Observable<CarOwner | undefined> {
    return this.http
      .get<CarOwner[]>('api/carOwners/')
      .pipe(map((owners) => owners.find((owner) => owner.id === id)));
  }

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: Car[]
  ): Observable<CarOwner> {
    const id = Math.random();

    return this.http.post<CarOwner>('api/carOwners/', {
      id,
      last_name: aLastName,
      first_name: aFirstName,
      third_name: aMiddleName,
      cars: aCars,
    });
  }

  editOwner(aOwner: CarOwner): Observable<CarOwner> {
    return this.http.put<CarOwner>('api/carOwners/' + aOwner.id, aOwner);
  }

  deleteOwner(aOwnerId: number): Observable<CarOwner[]> {
    return this.http.delete<CarOwner[]>('api/carOwners/' + aOwnerId);
  }
}
