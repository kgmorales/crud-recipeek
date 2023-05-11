// //* Alert Component
// import { AlertComponent } from './alert/alert.component';

//* Header Component
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/components/search/search.component';

//* Scrape Component
import { ScrapeRecipeFormComponent } from './scrape-recipe/scrape-recipe.component';

//* SideNav Component
import { SideNavComponent } from './side-nav/side-nav.component';

export const components = [
  HeaderComponent,
  SearchComponent,
  ScrapeRecipeFormComponent,
  SideNavComponent,
];

//* Export Components
export * from './header/header.component';
export * from './header/components/search/search.component';
export * from './scrape-recipe/scrape-recipe.component';
export * from './side-nav/side-nav.component';
