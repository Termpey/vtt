import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { battleMapResolver } from './battle-map.resolver';

describe('battleMapResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => battleMapResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
