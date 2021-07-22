import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorias',
})
export class CategoriasPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (Array.isArray(value)) {
      return 'SIIIIIIIIII';
    } else {
      return 'MPPPPPPPPPPPPPPPPP';
    }
  }
}
