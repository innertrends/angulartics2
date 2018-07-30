import { Injectable } from '@angular/core';

import { Angulartics2, InnerTrendsSettings } from 'angulartics2';

declare var innrLayer: any;

@Injectable()
export class Angulartics2InnerTrends {

  constructor(
    protected angulartics2: Angulartics2,
  ) {
    // The innrLayer needs to be initialized
    if (typeof innrLayer !== 'undefined' && innrLayer) {
      innrLayer = (<any>window).innrLayer = (<any>window).innrLayer || [];
    }

    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
    this.angulartics2.setUserPropertiesOnce
      .subscribe((x) => this.setUserProperties(x));
  }

  /**
   * Send pageviews to the innrLayer, i.e. for page tracking
   *
   * @param path associated with the pageview
   */

  pageTrack(path: string) {
    if (typeof innrLayer !== 'undefined' && innrLayer) {
      innrLayer.push({
        'page': path
      });
    }
  }

  /**
   * Send events to the innrLayer, i.e. for event tracking
   *
   * @param action associated with the event
   */

  eventTrack(action: string, properties: any) {
    properties = properties || {};

    if (typeof innrLayer !== 'undefined' && innrLayer) {
      innrLayer.push({
        event: action,
        properties: properties
      });
    }
  }

  /**
   * Send user properties to the innrLayer, i.e. for identifying users
   *
   * @param properties associated with the logged in user
   */
  setUserProperties(properties: any) {
    properties = properties || {};

    if (typeof innrLayer !== 'undefined' && innrLayer) {
      innrLayer.push({
        userDetails: properties
      });
    }
  }

}