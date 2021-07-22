import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    return {
      products: [
        {
          id: 1,
          name: 'Seaman Cap',
          description:
            'Lorem ipsum . Voluptatem excepturi magnam nostrum dolore recusandae',
          price: '$40',
        },
        {
          id: 2,
          name: 'T-shirt',
          description:
            'amet consectetur adipisicing elit.Lorem ipsum dolor sit ',
          price: '$80',
        },
        {
          id: 3,
          name: 'Back Pack',
          description:
            'Voluptatem excepturi harum rerum aliquam magnam nostrum dolore recusandae',
          price: '$30',
        },
      ],
      directorio: [
        {
          id: 1,
          url: 'http://google.es',
          describe: 'La web de google es esta',
        },
        {
          id: 2,
          url: 'http://google.es',
          describe: 'La web de google es esta',
        },
        {
          id: 3,
          url: 'http://google.es',
          describe: 'La web de google es esta',
        },
        {
          id: 4,
          url: 'http://google.es',
          describe: 'La web de google es esta',
        },
        {
          id: 5,
          url: 'http://google.es',
          describe: 'La web de google es esta',
        },
      ],
    };
  }
}
