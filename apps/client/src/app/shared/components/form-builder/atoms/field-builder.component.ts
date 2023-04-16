import { Component, Input } from '@angular/core';

@Component({
  selector: 'la-field-builder',
  template: `
    <!-- <div class="form-group row" [formGroup]="form">
      <label class="col-md-3 form-control-label" [attr.for]="field.label">
        {{ field.label }}
        <strong
          class="text-danger"
          *ngIf="field.required && form.get(field.name).invalid"
          >*</strong
        >
      </label>
      <div class="col-md-9" [ngSwitch]="field.type">
        <la-textbox
          *ngSwitchCase="'text'"
          [field]="field"
          [form]="form.get(field.name)"
        />
        <la-textbox
          *ngSwitchCase="'date'"
          [field]="field"
          [form]="form.get(field.name)"
        />
        <la-dropdown
          *ngSwitchCase="'dropdown'"
          [field]="field"
          [form]="form.get(field.name)"
        />
        <checkbox
          *ngSwitchCase="'checkbox'"
          [field]="field"
          [form]="form.get(field.name)"
        />
        <la-radio
          *ngSwitchCase="'radio'"
          [field]="field"
          [form]="form.get(field.name)"
        />
        <la-file
          *ngSwitchCase="'file'"
          [field]="field"
          [form]="form.get(field.name)"
        />
        <div
          class="alert alert-danger my-1 p-2 fadeInDown animated"
          *ngIf="!isValid && isDirty"
        >
          {{ field.label }} is required
        </div>
      </div>
    </div> -->
  `,
})
export class FieldBuilderComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() field: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() form: any;

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }
}
