import { Car } from './Car';

export interface CarOwner {
  id: number;
  last_name: string;
  first_name: string;
  third_name: string;
  cars: Car[];
}
