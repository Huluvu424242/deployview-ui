import {Component, Element, h, Listen, State} from '@stencil/core';
import {Artifact} from "../../interfaces/artifact";
import {DashboardService} from "../../services/dashboard-service";
import {SelectChangeEventDetail} from "@ionic/core";

@Component({
    tag: 'deployview-dashboard',
    styleUrl: 'deployview-dashboard.css',
})
export class DashBoard {

    @Element() hostElement;

    @State() umgebungen: string[];
    @State() artifacts: Artifact[];

    @State() newUmgebung: string;
    @State() newDepartment: string;
    @State() newArtifact: string;

    @State() disabledAnlegen: boolean = false;

    @Listen('keydown')
    handleEnter(event: KeyboardEvent) {
        // console.log('EventEnter:' + event.key);
        if (event.key == 'Enter' && !this.disabledAnlegen) {
            this.createArtifact(event);
        }
    }

    computeDisableAnlegenButton() {
        this.disabledAnlegen =
            !this.newUmgebung || this.newUmgebung.trim() === '' ||
            !this.newDepartment || this.newDepartment.trim() === '' ||
            !this.newArtifact || this.newArtifact.trim() === '';
    }

    onNewUmgebungChanged(event: Event) {
        this.newUmgebung = (event.target as HTMLInputElement).value;
        this.computeDisableAnlegenButton();
    }

    onNewDepartmentChanged(event: Event) {
        this.newDepartment = (event.target as HTMLInputElement).value;
        this.computeDisableAnlegenButton();
    }

    onNewArtifacthanged(event: Event) {
        this.newArtifact = (event.target as HTMLInputElement).value;
        this.computeDisableAnlegenButton();
    }

    async updateModel() {
        this.umgebungen = [...(await DashboardService.listUmgebungen())];
        this.artifacts = [...(await DashboardService.listArtifacts())];
    }

    async componentWillLoad() {
        await this.updateModel();
        this.computeDisableAnlegenButton();
    }

    protected leereAnlegenFormular(): void {
        this.newUmgebung = '';
        this.newDepartment = '';
        this.newArtifact = '';
    }

    async createArtifact(event: Event) {
        event.preventDefault();
        await DashboardService.createArtifact(this.newUmgebung, this.newDepartment, this.newArtifact);
        this.leereAnlegenFormular();
        await this.updateModel();
    }

    async deleteArtifact(umgebung, department, artifact) {
        await DashboardService.deleteArtifact(umgebung, department, artifact);
        await this.updateModel();
    }

    async saveStatus(artifact: Artifact, event: CustomEvent) {
        const status: string = event.detail.value;
        console.log("Setze neuen Status:" + status);
        await DashboardService.updateArtifactStatus(artifact.umgebung, artifact.department, artifact.name, status);
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
                                        <form onSubmit={this.createArtifact.bind(this)}>
                                            <ion-card-header>
                                                <ion-card-subtitle>Anlegen</ion-card-subtitle>
                                                <ion-card-title>Neues Artefakt</ion-card-title>
                                            </ion-card-header>
                                            <ion-card-content>
                                                <ion-label>Umgebung:</ion-label>
                                                <ion-input type='text' value={this.newUmgebung}
                                                           required={true}
                                                           onInput={this.onNewUmgebungChanged.bind(this)}/>

                                                <ion-label>Abteilung:</ion-label>
                                                <ion-input type='text' value={this.newDepartment}
                                                           required={true}
                                                           onInput={this.onNewDepartmentChanged.bind(this)}/>

                                                <ion-label>Artefakt Name:</ion-label>
                                                <ion-input type='text' value={this.newArtifact}
                                                           required={true}
                                                           onInput={this.onNewArtifacthanged.bind(this)}/>
                                            </ion-card-content>
                                            <ion-button
                                                disabled={this.disabledAnlegen}
                                                type={"submit"}
                                                shape="round"
                                                color="success">
                                                Create
                                            </ion-button>
                                        </form>
                                    </ion-card>

                                    {this.artifacts.filter((artifact) => artifact.umgebung === umgebung).map(artifact => (
                                        <ion-card>
                                            <ion-card-header>
                                                <ion-card-subtitle>Abteilung: {artifact.department}</ion-card-subtitle>
                                                <ion-card-title>Artefakt: {artifact.name}</ion-card-title>
                                            </ion-card-header>

                                            <ion-card-content>
                                                <ion-label>Status:</ion-label>
                                                <ion-select
                                                    id={'status' + artifact.umgebung + '.' + artifact.department + '.' + artifact.name}
                                                    name={artifact.umgebung + '.' + artifact.department + '.' + artifact.name}
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
                                                    type={"button"}
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
                                {/*<ion-badge>0</ion-badge>*/}
                            </ion-tab-button>
                        ))}
                    </ion-tab-bar>

                </ion-tabs>

            </ion-content>
        ];
    }


}
