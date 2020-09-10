import { Component, h } from '@stencil/core';

@Component({
  tag: 'deployview-dashboard',
  styleUrl: 'deployview-dashboard.css',
})
export class AppHome {
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Status Übersicht bekannter Artefakte</ion-title>
          <ion-buttons slot="secondary">
            <ion-button size="small" shape="round" color="light" href="/verwaltung/ionic">Verwaltung</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <p>
          Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes
          in this starter out of the box and check out our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>
      </ion-content>,
    ];
  }
}
