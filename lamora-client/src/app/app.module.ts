import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgBottomNavigationModule } from 'ng-bottom-navigation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './features/recipes/components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './features/recipes/components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './features/recipes/components/tutorials-list/tutorials-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgBottomNavigationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
