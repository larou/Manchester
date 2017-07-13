import { Observable } from 'rxjs';

export interface IStore<T> {
  getById(id: string): Observable<T>;
}
