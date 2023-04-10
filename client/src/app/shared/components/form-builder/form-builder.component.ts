import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  template: `
    <form [formGroup]="formGroup" class="form-horizontal">
      <div *ngFor="let field of fields">
        <app-field-builder [field]="field" [form]="formGroup" />
      </div>
      <div class="form-row"></div>
      <div class="form-group row">
        <div class="col-md-3"></div>
        <div class="col-md-9">
          <button type="submit" [disabled]="!formGroup.valid" class="btn btn-primary">Save</button>
          <strong>Saved all values</strong>
        </div>
      </div>
    </form>
  `,
})
export class FormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() formGroup: FormGroup;
  constructor() {}

  ngOnInit() {
    let fieldsCtrls: Record<string, unknown> = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
      } else {
        let opts = {} as Record<string, AbstractControl>;
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      }
    }
    //this.form = new FormGroup(fieldsCtrls);
  }
}
