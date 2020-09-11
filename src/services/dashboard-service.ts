import {Artifact} from "../interfaces/artifact";

class DashboardServiceController {

    async listArtifacts(): Promise<Artifact[]> {
        return (await listArtifacts()) || [] ;
    }

    async listUmgebungen(): Promise<string[]> {
       const umgebungen:string[] = await listUmgebungen();
       if( umgebungen.length <1){
           return ["Platzhalter Umgebung"];
       }else{
           return umgebungen;
       }
    }

    async updateArtifactStatusNotice(umgebung: string, department: string, artifact: string, status: string, notice: string): Promise<void> {
        return await updateArtifactStatusNotice(umgebung,department,artifact,status,notice);
    }
    async updateArtifactStatus(umgebung: string, department: string, artifact: string, status: string): Promise<void> {
        return await updateArtifactStatus(umgebung,department,artifact,status);
    }

    async deleteArtifact(umgebung: string, department: string, artifact: string): Promise<void> {
        return await deleteArtifact(umgebung,department,artifact);
    }

    async createArtifact(umgebung: string, department: string, artifact: string): Promise<void> {
        return await createArtifact(umgebung,department,artifact);
    }

}

export const DashboardService = new DashboardServiceController();


function listUmgebungen(): Promise<string[]> {
    return fetch('http://localhost:8080/api/umgebungen',
        {
            method: 'GET'
        })
        .then(response => response.json());
}

function listArtifacts(): Promise<Artifact[]> {
    return fetch('http://localhost:8080/api/artifacts',
        {
            method: 'GET'
        })
        .then(response => response.json());
}

function updateArtifactStatusNotice(umgebung: string,
                                           department: string,
                                           artifact: string,
                                           status: string,
                                           notice: string): Promise<void> {
    return fetch('http://localhost:8080/api/' + umgebung + '/' + department + '/' + artifact + '/' + status + '/' + notice,
        {
            method: 'POST',
        })
        .then();
}

function updateArtifactStatus(umgebung: string,
                                     department: string,
                                     artifact: string,
                                     status: string): Promise<void> {
    return fetch('http://localhost:8080/api/' + umgebung + '/' + department + '/' + artifact + '/' + status,
        {
            method: 'POST',
        })
        .then();
}

function deleteArtifact(umgebung: string,
                                     department: string,
                                     artifact: string,): Promise<void> {
    return fetch('http://localhost:8080/api/' + umgebung + '/' + department + '/' + artifact ,
        {
            method: 'DELETE',
        })
        .then();
}

function createArtifact(umgebung: string,
                        department: string,
                        artifact: string,): Promise<void> {
    return fetch('http://localhost:8080/api/' + umgebung + '/' + department + '/' + artifact ,
        {
            method: 'PUT',
        })
        .then();
}