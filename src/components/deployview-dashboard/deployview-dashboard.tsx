import {Component, h, State} from '@stencil/core';
import {Artifact} from "../../interfaces/artifact";

@Component({
    tag: 'deployview-dashboard',
    styleUrl: 'deployview-dashboard.css',
})
export class AppHome {
    @State() umgebungen: string[] = ["DEV","PROD"];
    @State() umgebungIndex: number=0;
    @State() artifacts: Artifact[]=[{umgebung: "DEV", department: "Finanzen", name: "Börse", deploymentStatus: "UNBEKANNT", deploymentNotice: " "}];
    @State() artifactIndex: number= 0;

    protected createArtifact(umgebung) {
        umgebung = umgebung;

    }

    protected currentArtifact(): Artifact {
        return this.artifacts[this.artifactIndex];
    }

    protected currentUmgebung(): string {
        return this.umgebungen[this.umgebungIndex];
    }


    protected deleteArtifact(umgebung: string, department: string, name: string) {
        umgebung = umgebung;
        department = department;
        name = name;
    }

    protected saveStatus(umgebung: string, department: string, name: string) {
        umgebung = umgebung;
        department = department;
        name = name;
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
                    <ion-tab tab={this.currentUmgebung()}>
                        <ion-nav></ion-nav>
                        <ion-header>
                            <ion-toolbar>
                                <ion-title>{this.currentUmgebung()}</ion-title>
                            </ion-toolbar>
                        </ion-header>
                        <ion-content>

                            <div class="horizontal-cards">
                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-subtitle>Anlegen</ion-card-subtitle>
                                        <ion-card-title>Neues Artefakt</ion-card-title>
                                    </ion-card-header>
                                    <ion-card-content>
                                        <ion-label>Umgebung:</ion-label>
                                        <ion-input id={this.currentUmgebung() + '.newUmgebung'}/>

                                        <ion-label>Abteilung:</ion-label>
                                        <ion-input id={this.currentUmgebung() + '.newDepartment'}/>

                                        <ion-label>Artefakt Name:</ion-label>
                                        <ion-input id="${umgebung1}.newArtifactName"></ion-input>
                                    </ion-card-content>
                                    <ion-button
                                        shape="round"
                                        color="success"
                                        onClick={() => this.createArtifact(this.currentUmgebung())}>
                                        Create
                                    </ion-button>

                                </ion-card>


                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-subtitle>'Abteilung:
                                            '+{this.currentArtifact().department}</ion-card-subtitle>
                                        <ion-card-title>'Artefakt: '+{this.currentArtifact().name}</ion-card-title>
                                    </ion-card-header>

                                    <ion-card-content>
                                        <ion-label>Status:</ion-label>
                                        <ion-select id="|${umgebung1}.${artifact.department}.${artifact.name}|"
                                                    name="|${umgebung1}.${artifact.department}.${artifact.name}|"
                                                    value="${artifact.deploymentStatus}"
                                        >
                                            <ion-select-option value="DEPLOYMENT">Deployment</ion-select-option>
                                            <ion-select-option value="OFFLINE">Offline</ion-select-option>
                                            <ion-select-option value="WORKING">Working</ion-select-option>
                                            <ion-select-option value="UNBEKANNT">Unbekannt</ion-select-option>
                                        </ion-select>
                                        <ion-button
                                            shape="round" color="danger"
                                            onClick={() => this.deleteArtifact(this.currentArtifact().umgebung, this.currentArtifact().department, this.currentArtifact().name)}>
                                            DELETE
                                        </ion-button>
                                        <ion-button
                                            shape="round" color="success"
                                            onClick={() => this.saveStatus(this.currentArtifact().umgebung, this.currentArtifact().department, this.currentArtifact().name)}>
                                            SAVE
                                        </ion-button>

                                    </ion-card-content>
                                </ion-card>
                            </div>
                        </ion-content>
                    </ion-tab>


                    <ion-tab-bar slot="top">

                        <ion-tab-button tab="${umgebung2}">
                            <ion-icon name="calendar"></ion-icon>
                            <ion-label>{this.currentUmgebung()}</ion-label>
                            <ion-badge>0</ion-badge>
                        </ion-tab-button>
                    </ion-tab-bar>

                </ion-tabs>

            </ion-content>
        ];
    }


}
