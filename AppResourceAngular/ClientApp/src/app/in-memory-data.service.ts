//import { Injectable } from '@angular/core';
//import { InMemoryDbService } from 'angular-in-memory-web-api';
//import { Resource } from './resource';

//@Injectable({
//  providedIn: 'root'
//})
//export class InMemoryDataService implements InMemoryDbService {
//  createDb() {
//    const resources = [
//      { id: 11, data: 'Dr Nice' },
//      { id: 12, data: 'Narco' },
//      { id: 13, data: 'Bombasto' },
//      { id: 14, data: 'Celeritas' },
//      { id: 15, data: 'Magneta' },
//      { id: 16, data: 'RubberMan' },
//      { id: 17, data: 'Dynama' },
//      { id: 18, data: 'Dr IQ' },
//      { id: 19, data: 'Magma' },
//      { id: 20, data: 'Tornado' }
//    ];
//    return { resources };
//  }

//  genId(resources: Resource[]): number {
//    return resources.length > 0 ? Math.max(...resources.map(resource => resource.id)) + 1 : 11;
//  }
//  constructor() { }
//}
