import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2InnerTrends } from './innertrends';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2InnerTrends', () => {
  let innrLayer: any;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2InnerTrends],
    });

    window.innrLayer = innrLayer = [];
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2InnerTrends],
      (angulartics2: Angulartics2, angulartics2InnerTrends: Angulartics2InnerTrends) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(innrLayer).toContain({
          page: '/abc'
        });
      },
    )),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2InnerTrends],
      (angulartics2: Angulartics2, angulartics2InnerTrends: Angulartics2InnerTrends) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ event: 'do', properties: { category: 'cat'} });
        advance(fixture);
        expect(innrLayer).toContain({
          event: 'do',
          properties: {category: "cat"}
        });
      }
    )),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2InnerTrends],
      (angulartics2: Angulartics2, angulartics2InnerTrends: Angulartics2InnerTrends) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(innrLayer).toContain({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe'
        });
      }),
    ),
  );

});
