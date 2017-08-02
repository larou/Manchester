import LatLngLiteral = google.maps.LatLngLiteral;
import { Observable } from 'rxjs';
import { Day } from '../../utils';




export interface IAvalability{

    days: Array <any>;
    startTime: string;
    endTime: string;
    
} 
export interface IRawVoucher {
  $key: string;
  title: string;
  subtitle: string;
  description: string;
  venueId: string;
  disabled: boolean;
  availability: 
{
    days: string[];
    startTime: string;
    endTime: string;
    
} ;
  featured: boolean;
  priority: number;
}

export interface IVoucher extends IRawVoucher {
  available: boolean;
  venue?: Observable<IVenue>;
  toggleStorage(): Promise<boolean>;
  toRaw(): IRawVoucher;
}

export interface IContact {
  title: string;
  details: string;
}
export interface IOpening{

      open: string;
      close: string;
    
}



export type ISocial = IContact;

export interface IRawVenue {
  $key: string;
  category: string;
  subcategory: string;
  name: string;
  location: LatLngLiteral;
  featured: boolean;
  priority: number;
  subtitle: string;
  bio: string;
  updatedAt: string;
  createdAt: string;
  contacts: IContact[];
  social: ISocial[];
  photos: string[];
  openingTimes: {
    "mon":IOpening;
    "tue":IOpening;
    "thu":IOpening;
    "wed":IOpening;
    "fri":IOpening;
    "sat":IOpening;
    "sun":IOpening;
  }
  
}

export interface IVenue extends IRawVenue {
  getDistance(): number;
  toRaw(): IRawVenue;
 
}

export interface INews {
  url: string;
  publisher: string;
  image: string;
  title: string;
}

export type ISubCategory = {
  $key: string;
}

export type ICategory = {
  '!subtitle': string;
  $key: string;
  $value?: string;
  sum : number ;
  nbVenue_SubCategory: number;
  SomVenue: number;
  'subTitle': string ;
}
