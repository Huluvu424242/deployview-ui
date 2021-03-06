import {Component, h, Prop} from '@stencil/core';

@Component({
    tag: 'deployview-verwaltung',
    styleUrl: 'deployview-verwaltung.css',
})
export class DeployviewVerwaltung {
    // HINT: https://stackoverflow.com/questions/49274786/file-upload-using-ionic-native

    @Prop() apiHost: string;

    async componentWillLoad(){
        this.apiHost = "http://localhost:8080";
    }

    async doUpload(elementId: string) {
        const upload = (file) => {
            return fetch(this.apiHost + '/api/import', {
                method: 'POST',
                body: file
            }).then(
                response => response.json()
            ).then(success => {
                console.log(success);
                location.reload();
            }).catch(
                error => console.log(error)
            );
        };
        const input: any = document.getElementById(elementId);
        await upload(input.files[0]);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button defaultHref="/"/>
                    </ion-buttons>
                    <ion-title>Verwaltung</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <ion-item>
                    <ion-title>Status Übersicht bekannter Artefakte</ion-title>
                    <ion-button size="small" shape="round" color="light"
                                target={"_blank"}
                                href={this.apiHost+ "/api/export.json"}
                    >
                        Exportieren
                    </ion-button>
                    {/* HINT: workaround for bug: https://github.com/ionic-team/ionic-docs/issues/814*/}
                    <ion-button class="ion-color ion-color-light button-solid button-round">
                        {/*<ion-icon icon={videocam} slot="start"></ion-icon>*/}
                        <input id="fileinput" hidden type="file" onChange={() => this.doUpload('fileinput')}/>
                        <label htmlFor="fileinput">Importieren</label>
                    </ion-button>
                </ion-item>
            </ion-content>,
        ];
    }
}
