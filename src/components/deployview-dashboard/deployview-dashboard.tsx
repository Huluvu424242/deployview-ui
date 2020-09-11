import {Component, h, State, Element} from '@stencil/core';
import {Artifact} from "../../interfaces/artifact";
import {DashboardService} from "../../services/dashboard-service";
import {shadow} from "@ionic/core/dist/types/utils/transition/ios.transition";

@Component({
    tag: 'deployview-dashboard',
    styleUrl: 'deployview-dashboard.css',
})
export class DashBoard {

    @Element() element;

    @State() umgebungen: string[];
    @State() artifacts: Artifact[];

    async componentDidLoad() {
        this.umgebungen = [...(await DashboardService.listUmgebungen())];
        this.artifacts = [...(await DashboardService.listArtifacts())];
    }

    async createArtifact(umgebung) {
        console.log('CreateArtificat für Umgebung: '+umgebung);
        // DashboardService.createArtifact(umgebung)
    }

    async deleteArtifact(umgebung,department,artifact) {
         await DashboardService.deleteArtifact(umgebung,department,artifact);
    }

    async saveStatus(artifact:Artifact) {
        const status : string = this.element.shadowRoot.querySelector('#status'+artifact.umgebung+'.'+artifact.department+'.'+artifact.name).value;
        await DashboardService.updateArtifactStatus(artifact.umgebung,artifact.department,artifact.name,status);
    }

    render() {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>Status Übersicht bekannter Artefakte</ion-title>
                    <ion-buttons slot="secondary">
                        <ion-button size="small" shape="round" color="light" href="/verwaltung/ionic">Verwaltung
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>,

            <ion-content class="ion-padding">
                <ion-tabs>

                    {this.umgebungen.map(umgebung => (

                    <ion-tab tab={umgebung}>
                        <ion-nav/>
                        <ion-header>
                            <ion-toolbar>
                                <ion-title>{umgebung}</ion-title>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content>

                            <div class="horizontal-cards">

                                // Anlegen Karte
                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-subtitle>Anlegen</ion-card-subtitle>
                                        <ion-card-title>Neues Artefakt</ion-card-title>
                                    </ion-card-header>
                                    <ion-card-content>
                                        <ion-label>Umgebung:</ion-label>
                                        <ion-input id={umgebung + '.newUmgebung'}/>

                                        <ion-label>Abteilung:</ion-label>
                                        <ion-input id={umgebung + '.newDepartment'}/>

                                        <ion-label>Artefakt Name:</ion-label>
                                        <ion-input id={umgebung + '.newArtifactName'}/>
                                    </ion-card-content>
                                    <ion-button
                                        shape="round"
                                        color="success"
                                        onClick={() => this.createArtifact(umgebung)}>
                                        Create
                                    </ion-button>
                                </ion-card>

                                {this.artifacts.filter( (artifact)=> artifact.umgebung === umgebung ).map(artifact => (
                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-subtitle>'Abteilung:
                                            '+{artifact.department}</ion-card-subtitle>
                                        <ion-card-title>'Artefakt: '+{artifact.name}</ion-card-title>
                                    </ion-card-header>

                                    <ion-card-content>
                                        <ion-label>Status:</ion-label>
                                        <ion-select id={'status-'+ artifact.umgebung +'.'+ artifact.department + '.' +artifact.name}
                                                    name={artifact.umgebung +'.'+ artifact.department + '.' +artifact.name}
                                                    value={artifact.deploymentStatus}
                                                    onChange={() => this.saveStatus(artifact)}
                                        >
                                            <ion-select-option value="DEPLOYMENT">Deployment</ion-select-option>
                                            <ion-select-option value="OFFLINE">Offline</ion-select-option>
                                            <ion-select-option value="WORKING">Working</ion-select-option>
                                            <ion-select-option value="UNBEKANNT">Unbekannt</ion-select-option>
                                        </ion-select>
                                        <ion-button
                                            shape="round" color="danger"
                                            onClick={() => this.deleteArtifact(artifact.umgebung, artifact.department, artifact.name)}>
                                            DELETE
                                        </ion-button>
                                    </ion-card-content>
                                </ion-card>
                                ))} // mapArtifacts
                            </div>
                        </ion-content>
                    </ion-tab>
                    ))} // mapUmgebungen

                    <ion-tab-bar slot="top">

                        {this.umgebungen.map(umgebung => (
                        <ion-tab-button tab={umgebung}>
                            <ion-icon name="calendar"/>
                            <ion-label>{umgebung}</ion-label>
                            <ion-badge>0</ion-badge>
                        </ion-tab-button>
                        ))} // mapUmgebungen
                    </ion-tab-bar>

                </ion-tabs>

            </ion-content>
        ];
    }


}
