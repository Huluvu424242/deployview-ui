import { Component, h } from '@stencil/core';

@Component({
  tag: 'deployview-root',
  styleUrl: 'deployview-root.css',
})
export class DeployviewRoot {
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
