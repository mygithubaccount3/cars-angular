import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormArray, FormBuilder } from '@angular/forms';
import { CarOwnerService } from '../car-owner.service';
import { CarOwner } from '../interfaces/CarOwner';
import { Car } from '../interfaces/Car';
import { uniqueLicenseCarPlateValidator } from '../validators/unique-license-car-plate.directive';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.scss'],
})
export class OwnerDetailComponent {
  owner?: any;
  owners: CarOwner[] = [];
  mode;
  isTableValid = true;
  newCarsID: number[] = [];
  uniqueCars = true;
  firstName;
  lastName;
  thirdName;
  carForm: FormGroup;
  fb;
  DELETE_ICON: string =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';
  ARROW_BACK_ICON: string =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: CarOwnerService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    fb: FormBuilder
  ) {
    if (this.route.snapshot.url[1].path === 'create') {
      this.mode = 'create';
    } else if (
      this.route.snapshot.url[2] &&
      this.route.snapshot.url[2].path === 'edit'
    ) {
      this.mode = 'edit';
    } else {
      this.mode = 'view';
    }

    if (this.mode === 'creat' || this.mode === 'edit') {
      this.ownerService
        .getOwners()
        .subscribe((owners) => (this.owners = owners));
    }

    this.firstName = new FormControl(
      { value: '', disabled: this.mode === 'view' },
      [Validators.pattern('[a-zA-Z]*'), Validators.required]
    );

    this.lastName = new FormControl(
      { value: '', disabled: this.mode === 'view' },
      [Validators.pattern('[a-zA-Z]*'), Validators.required]
    );

    this.thirdName = new FormControl(
      { value: '', disabled: this.mode === 'view' },
      [Validators.pattern('[a-zA-Z]*'), Validators.required]
    );

    this.fb = fb;
    this.carForm = fb.group({
      cars: fb.array([], Validators.required),
    });
    iconRegistry.addSvgIconLiteral(
      'delete',
      sanitizer.bypassSecurityTrustHtml(this.DELETE_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'arrow_back',
      sanitizer.bypassSecurityTrustHtml(this.ARROW_BACK_ICON)
    );

    if (this.mode === 'view' || this.mode === 'edit') {
      this.ownerService
        .getOwnerById(Number(this.route.snapshot.url[1].path))
        .subscribe((owner) => {
          if (owner) {
            this.owner = owner;
            this.lastName.setValue(this.owner?.last_name);
            this.firstName.setValue(this.owner?.first_name);
            this.thirdName.setValue(this.owner?.third_name);

            this.owner.cars.forEach((element: Car) => {
              this.addCar(
                element.id,
                element.license_plate_number,
                element.manufacturer,
                element.model,
                element.production_year,
                element.owner_id
              );
            });
          }
        });
    }
  }

  cars_fa(): FormArray {
    return this.carForm.get('cars') as FormArray;
  }

  newCar(
    id: number,
    license_plate_number: string,
    manufacturer: string,
    model: string,
    production_year: number,
    owner_id: number | null
  ): FormGroup {
    return this.fb.group({
      id,
      license_plate_number: new FormControl(
        { value: license_plate_number, disabled: this.mode === 'view' },
        [
          Validators.required,
          Validators.pattern('[A-Z]{2}[0-9]{4}[A-Z]{2}'),
          uniqueLicenseCarPlateValidator(
            this.owner.id,
            this.owners,
            this.carForm
          ),
        ]
      ),
      manufacturer: new FormControl(
        { value: manufacturer, disabled: this.mode === 'view' },
        [Validators.required, Validators.pattern('[A-Za-z0-9]+')]
      ),
      model: new FormControl({ value: model, disabled: this.mode === 'view' }, [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+'),
      ]),
      production_year: new FormControl(
        { value: production_year, disabled: this.mode === 'view' },
        [
          Validators.required,
          Validators.pattern('(199[0-9]|20[01][0-9]|202[01])'),
        ]
      ),

      owner_id: new FormControl(owner_id),
    });
  }

  addCar(
    id: number | null,
    license_plate_number: string,
    manufacturer: string,
    model: string,
    production_year: number,
    owner_id: number | null
  ) {
    this.cars_fa().push(
      this.newCar(
        id ?? this.cars_fa().length + 1,
        license_plate_number,
        manufacturer,
        model,
        production_year,
        owner_id
      )
    );
  }

  addNewCarForm() {
    this.addCar(
      null,
      '',
      '',
      '',
      new Date().getFullYear(),
      this.owner ? this.owner.id : null
    );

    this.newCarsID.push(
      this.cars_fa().value[this.cars_fa().value.length - 1].id
    );
  }

  removeCar(id: number) {
    const pos = this.cars_fa().value.findIndex((car: Car) => car.id === id);
    this.cars_fa().removeAt(pos);
    this.newCarsID = this.newCarsID.filter((val) => {
      return val !== id;
    });
  }

  saveOwner() {
    this.uniqueCars = true;

    if (
      !this.firstName.errors &&
      !this.lastName.errors &&
      !this.thirdName.errors &&
      this.carForm.get('cars')?.valid
    ) {
      if (this.mode === 'edit') {
        const isDuplicate = this.checkForCarDuplicates(this.owners);

        if (isDuplicate) {
          this.uniqueCars = false;
        } else {
          this.uniqueCars = true;

          this.ownerService
            .editOwner({
              id: this.owner.id,
              first_name: this.firstName.value,
              last_name: this.lastName.value,
              third_name: this.thirdName.value,
              cars: this.carForm.value.cars,
            })
            .subscribe(() => this.router.navigate(['']));
        }
      } else if (this.mode === 'create') {
        const isDuplicate = this.checkForCarDuplicates(this.owners);

        if (isDuplicate) {
          this.uniqueCars = false;
        } else {
          this.uniqueCars = true;

          const newOwner = this.ownerService.createOwner(
            this.lastName.value,
            this.firstName.value,
            this.thirdName.value,
            this.carForm.value.cars
          );

          newOwner.subscribe((owner) => {
            for (let car of owner.cars) {
              car.owner_id = owner.id;
            }

            this.ownerService
              .editOwner(owner)
              .subscribe(() => this.router.navigate(['']));
          });
        }
      }
    } else {
      this.firstName.errors && this.firstName.markAsTouched();
      this.lastName.errors && this.lastName.markAsTouched();
      this.thirdName.errors && this.thirdName.markAsTouched();

      if (this.carForm.get('cars')?.invalid) {
        this.isTableValid = false;

        for (let control of (this.carForm.get('cars') as FormArray).controls) {
          for (let inn of Object.values((control as FormArray).controls)) {
            inn.markAsTouched();
          }
        }
      }
    }
  }

  checkForCarDuplicates(owners: CarOwner[]): boolean {
    let duplicatedCars: Car[] = [];

    for (let newCarID of this.newCarsID) {
      owners.forEach((owner) => {
        duplicatedCars.push(
          ...owner.cars.filter((car) => {
            return (
              car.license_plate_number ===
              this.carForm.get('cars.' + (newCarID - 1))?.value
                .license_plate_number
            );
          })
        );
      });
    }

    return duplicatedCars.length > 0;
  }
}
