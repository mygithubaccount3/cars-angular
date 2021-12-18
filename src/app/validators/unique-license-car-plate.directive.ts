import {
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { Car } from '../interfaces/Car';
import { CarOwner } from '../interfaces/CarOwner';

export function uniqueLicenseCarPlateValidator(
  currentOwnerID: number,
  owners: CarOwner[],
  carForm: FormGroup
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isLicenseCarPlatesUnique = true;

    let i = 0;

    (carForm.get('cars') as FormArray).controls.find((car) => {
      if (car.value.license_plate_number === control.value) {
        i++;

        if (i === 2) {
          isLicenseCarPlatesUnique = false;
          return true;
        }
      }

      return false;
    });

    if (isLicenseCarPlatesUnique) {
      const allOwnersExceptCurrent = owners.filter((owner: CarOwner) => {
        return owner.id !== currentOwnerID;
      });

      allOwnersExceptCurrent.find((owner: CarOwner) => {
        return owner.cars.find((car: Car) => {
          if (car.license_plate_number === control.value) {
            isLicenseCarPlatesUnique = false;
            return true;
          }

          return false;
        });
      });
    }

    return !isLicenseCarPlatesUnique
      ? { uniqueLicenseCarPlate: { value: control.value } }
      : null;
  };
}
