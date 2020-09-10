import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="deployview-dashboard" />
          <ion-route url="/verwaltung/:name" component="ui-verwaltung" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
