export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number,
}

export interface IEquipo extends IEntity {
    nombre: string,
    ciudad: string,
    ano_fundacion: Date,
    estadio: string,
    liga: string,
    username: string,
    role: boolean,
    jugadores: number,
    miembrosCuerpoTecnico: number,
}

export interface IEquipoPage extends IPage<IEquipo> {
}

export interface IJugador extends IEntity {
    nombre: string,
    apellido: string,
    fecha_nacimiento: Date,
    posicion: string,
    nacionalidad: string,
    equipo: IEquipo,
}

export interface IJugadorPage extends IPage<IJugador> {
}

export interface IMiembroCuerpoTecnico extends IEntity {
    nombre: string,
    apellido: string,
    fecha_nacimiento: Date,
    nacionalidad: string,
    titulo: string,
    equipo: IEquipo,
}

export interface IMiembroCuerpoTecnicoPage extends IPage<IMiembroCuerpoTecnico> {
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}