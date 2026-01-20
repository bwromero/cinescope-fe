import { Component, computed, forwardRef, HostListener, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption<T = any> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-select',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true
    }
  ],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select<T> implements ControlValueAccessor {

  readonly options = input<SelectOption<T>[]>([]);
  readonly placeholder = input<string>('Select option');

  readonly changed = output<T | null>();

  readonly open = signal(false);
  readonly value = signal<T | null>(null);
  readonly activeIndex = signal(-1);

  readonly selectedLabel = computed(() => {
    const v = this.value();
    return this.options().find(o => o.value === v)?.label ?? '';
  });

  private onChange = (_: T | null) => { };
  private onTouched = () => { };

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(fn: (v: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggle() {
    this.open.update(v => !v);
  }

  close() {
    this.open.set(false);
    this.activeIndex.set(-1);
    this.onTouched();
  }

  select(option: SelectOption<T>) {
    this.value.set(option.value);
    this.onChange(option.value);
    this.changed.emit(option.value); 
    this.close();
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.open()) return;

    const max = this.options().length - 1;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update(i => Math.min(i + 1, max));
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update(i => Math.max(i - 1, 0));
        break;

      case 'Enter':
        event.preventDefault();
        const option = this.options()[this.activeIndex()];
        if (option) this.select(option);
        break;

      case 'Escape':
        this.close();
        break;
    }
  }
}
