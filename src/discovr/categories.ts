import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ICategory } from './entities';

@Injectable()
/**
 * A class for querying categories.
 */
export class CategoryService {
  test: any ;
  constructor(private af: AngularFire) {}

  /**
   * Get a list of categories, or subcategories if a category is specified.
   */
  public get(category: string = ''): FirebaseListObservable<ICategory[]> {
    return this.af.database.list(`/categories/${category}`)

  }

 public getAll():FirebaseListObservable<ICategory[]> {

 	   return this.af.database.list(`/categories/`)

 }
 
}
