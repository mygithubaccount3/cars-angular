import { Observable } from 'rxjs';
import { CarOwner } from './CarOwner';
import { Car } from './Car';

export interface ICarOwnerService {
  getOwners(): Observable<CarOwner[]>;
  getOwnerById(aId: number): Observable<CarOwner | undefined>;
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: Car[]
  ): Observable<CarOwner>;
  editOwner(aOwner: CarOwner): Observable<CarOwner>;
  deleteOwner(aOwnerId: number): Observable<CarOwner[]>;
}
