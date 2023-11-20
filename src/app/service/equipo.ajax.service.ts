import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environment/environment';
import { IEquipo, IEquipoPage } from '../model/model.interfaces';

@Injectable()
export class EquipoAjaxService {

    sUrl: string = API_URL + "/equipo";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IEquipo> {
        return this.oHttpClient.get<IEquipo>(this.sUrl + "/" + id);
    }

    getByUsername(username: string): Observable<IEquipo> {
        return this.oHttpClient.get<IEquipo>(this.sUrl + "/byUsername/" + username);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string): Observable<IEquipoPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IEquipoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oEquipo: IEquipo): Observable<IEquipo> {
        return this.oHttpClient.post<IEquipo>(this.sUrl, oEquipo);
    }

    updateOne(oEquipo: IEquipo): Observable<IEquipo> {
        return this.oHttpClient.put<IEquipo>(this.sUrl, oEquipo);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }

    getPageByJugadoresNumberDesc(size: number | undefined, page: number | undefined): Observable<IEquipoPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        return this.oHttpClient.get<IEquipoPage>(this.sUrl + "/byJugadoresNumberDesc?size=" + size + "&page=" + page);
    }

}