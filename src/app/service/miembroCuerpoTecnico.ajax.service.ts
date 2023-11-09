
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environment/environment';
import { IMiembroCuerpoTecnico, IMiembroCuerpoTecnicoPage } from '../model/model.interfaces';

@Injectable()
export class MiembroCuerpoTecnicoAjaxService {

    sUrl: string = API_URL + "/miembroCuerpoTecnico";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IMiembroCuerpoTecnico> {
        return this.oHttpClient.get<IMiembroCuerpoTecnico>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_equipo: number): Observable<IMiembroCuerpoTecnicoPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        let strUrlEquipo = "";
        if (id_equipo > 0) {
            strUrlEquipo = "&equipo=" + id_equipo;
        }
        return this.oHttpClient.get<IMiembroCuerpoTecnicoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlEquipo);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oMiembroCuerpoTecnico: IMiembroCuerpoTecnico): Observable<IMiembroCuerpoTecnico> {
        return this.oHttpClient.post<IMiembroCuerpoTecnico>(this.sUrl, oMiembroCuerpoTecnico);
    }

    updateOne(oMiembroCuerpoTecnico: IMiembroCuerpoTecnico): Observable<IMiembroCuerpoTecnico> {
        return this.oHttpClient.put<IMiembroCuerpoTecnico>(this.sUrl, oMiembroCuerpoTecnico);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

}