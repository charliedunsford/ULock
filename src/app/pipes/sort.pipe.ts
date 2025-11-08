import { Pipe, PipeTransform } from '@angular/core';
import { VaultItem } from '../interfaces/vault-item';

type SortKey = 'title';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: VaultItem[] | null | undefined, key: SortKey = 'title'): VaultItem[] {
    if (!value) return [];
    return [...value].sort((a, b) => String(a[key] ?? '').localeCompare(String(b[key] ?? '')));
  }

}
