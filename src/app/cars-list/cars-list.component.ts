import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CarOwner } from '../interfaces/CarOwner';
import { CarOwnerService } from '../car-owner.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent implements OnInit {
  title = 'Car Owners';
  carOwners: CarOwner[] = [];

  constructor(
    private router: Router,
    private carOwnerService: CarOwnerService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.carOwnerService
      .getOwners()
      .subscribe((owners) => (this.carOwners = owners));
  }

  viewOwner($event: any, id: number) {
    console.log($event.target, $event.target.parentNode);
    this.router.navigate([
      '/owner/' +
        id +
        ($event.target.name === 'edit' ||
        $event.target.parentNode.name === 'edit'
          ? '/edit'
          : ''),
    ]);
  }

  deleteOwner(id: number) {
    this.carOwnerService.deleteOwner(id).subscribe((owners) => {
      // console.log(this.http.status)
      this.getProducts();
    });
  }
}
