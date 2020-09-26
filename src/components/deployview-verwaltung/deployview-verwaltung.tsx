import {Component, h} from '@stencil/core';

@Component({
    tag: 'deployview-verwaltung',
    styleUrl: 'deployview-verwaltung.css',
})
export class DeployviewVerwaltung {


    // https://stackoverflow.com/questions/49274786/file-upload-using-ionic-native

    async doUpload(fileName) {
        const upload = (file) => {
            fetch('/api/import', {
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
        upload(fileName);
        // const input = document.getElementById('fileinput').firstElementChild;
        // upload(input.files[0]);
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
                                    href={"http://localhost:8080/api/export.json"}
                        >
                            Exportieren
                        </ion-button>
                        <ion-button size="small" shape="round" color="light"
                                    onClick={() => this.doUpload('export.json')}>Importieren
                        </ion-button>
                        {/*<ion-input id="fileinput" type={'file'}/>*/}
                </ion-item>
            </ion-content>,
        ];
    }
}
