import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { FormBuilderComponent } from './form-builder.component';

import * as formBuilder from './atoms';

const components = [formBuilder.components, FormBuilderComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: components,
  exports: [FormBuilderComponent],
  providers: [],
})
export class FormBuilderModule {}
