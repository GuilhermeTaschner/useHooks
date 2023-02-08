import { AxiosHeaders, AxiosStatic } from "axios";

export interface usePostProps {
    api: AxiosStatic,
    url: string;
    headers?: AxiosHeaders
}

export interface useObjectProps {
    Property: string,
    newValue: any,
}

export interface useArrayProps extends useObjectProps {
    index: number;
}

export interface useSearch<T = unknown> {
    property?: T | string,
    search: string,
    objectProperty?: string
}

export interface SearchObject<T = unknown>{
    elementObject: Object | T | any,
    property?: string,
    search: string
}