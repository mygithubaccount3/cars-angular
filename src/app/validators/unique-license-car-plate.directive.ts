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

    let d = 0;

    for (let i = 0; i < (carForm.get('cars') as FormArray).length; i++) {
      if (
        carForm.get('cars.' + i + '.license_plate_number')?.value ===
        control.value
      ) {
        d++;

        if (d === 2) {
          isLicenseCarPlatesUnique = false;
          break;
        }
      }
    }

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
