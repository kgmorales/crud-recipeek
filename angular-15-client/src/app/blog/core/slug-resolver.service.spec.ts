import { TestBed } from '@angular/core/testing';

import { SlugResolverService } from './slug-resolver.service';

describe('SlugResolverService', () => {
  let service: SlugResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlugResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
