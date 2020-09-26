import {Component, h, State} from '@stencil/core';
import {Artifact} from "../../interfaces/artifact";
import {DashboardService} from "../../services/dashboard-service";
import {SelectChangeEventDetail} from "@ionic/core";

@Component({
    tag: 'deployview-dashboard',
    styleUrl: 'deployview-dashboard.css',
})
export class DashBoard {

    // @Element() ele;

    @State() umgebungen: string[];
    @State() artifacts: Artifact[];

    async updateModel(){
        this.umgebungen = [...(await DashboardService.listUmgebungen())];
        this.artifacts = [...(await DashboardService.listArtifacts())];
    }

    async componentWillLoad() {
        await this.updateModel();
    }

    protected leereFormular( tabname : string){
        document.getElementById(tabname+'.newUmgebung').firstElementChild['value']='';
        document.getElementById(tabname+'.newDepartment').firstElementChild['value']='';
        document.getElementById(tabname+'.newArtifactName').firstElementChild['value']='';
    }

    async createArtifact(tabname: string) {
        console.log('CreateArtificat auf tab der Umgebung: ' + tabname);
        const umgebung: string = document.getElementById(tabname + '.newUmgebung').firstElementChild['value'];
        const department: string = document.getElementById(tabname + '.newDepartment').firstElementChild['value'];
        const artifact: string = document.getElementById(tabname + '.newArtifactName').firstElementChild['value'];
        console.log('CreateArtificat:[' + umgebung + ',' + department + ',' + artifact + ']');
        await DashboardService.createArtifact(umgebung, department, artifact);
        this.leereFormular(tabname);
        await this.updateModel();
    }

    async deleteArtifact(umgebung,department,artifact) {
        await DashboardService.deleteArtifact(umgebung,department,artifact);
        await this.updateModel();
    }

    async saveStatus(artifact:Artifact, event:CustomEvent) {
        const status : string = event.detail.value;
        console.log("Setze neuen Status:" +status);
        await DashboardService.updateArtifactStatus(artifact.umgebung,artifact.department,artifact.name, status);
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
                                        type={"submit"}
                                        shape="round"
                                        color="success"
                                        onClick={() => this.createArtifact(umgebung)}>
                                        Create
                                    </ion-button>
                                </ion-card>

                                {this.artifacts.filter( (artifact)=> artifact.umgebung === umgebung ).map(artifact => (
                                <ion-card>
                                    <ion-card-header>
                                        <ion-card-subtitle>Abteilung: {artifact.department}</ion-card-subtitle>
                                        <ion-card-title>Artefakt: {artifact.name}</ion-card-title>
                                    </ion-card-header>

                                    <ion-card-content>
                                        <ion-label>Status:</ion-label>
                                        <ion-select id={'status'+ artifact.umgebung +'.'+ artifact.department + '.' +artifact.name}
                                                    name={artifact.umgebung +'.'+ artifact.department + '.' +artifact.name}
                                                    value={artifact.deploymentStatus}
                                                    onIonChange={(event: CustomEvent<SelectChangeEventDetail<any>>) => this.saveStatus(artifact, event)}
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
                                ))}
                            </div>
                        </ion-content>
                    </ion-tab>
                    ))}

                    <ion-tab-bar slot="top">

                        {this.umgebungen.map(umgebung => (
                        <ion-tab-button tab={umgebung}>
                            <ion-icon name="calendar"/>
                            <ion-label>{umgebung}</ion-label>
                            <ion-badge>0</ion-badge>
                        </ion-tab-button>
                        ))}
                    </ion-tab-bar>

                </ion-tabs>

            </ion-content>
        ];
    }


}
