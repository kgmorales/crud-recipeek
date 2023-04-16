//* NG Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//* Import Core Components & Services
import * as coreComponents from './components';
import { providers } from '../core/services/core-providers';

//* Organize Core Module
const components = coreComponents.components;
const modules = [CommonModule, FormsModule, RouterModule];

//* Create Core Object
export const core = {
  components,
  modules,
};

@NgModule({
  declarations: core.components,
  imports: core.modules,
  exports: core.components,
  providers,
})
export class CoreModule {}
