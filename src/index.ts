import { useObjectProps, usePostProps, useArrayProps, useSearch, SearchObject } from '../types';
import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios';

export function verifyValue(value: any) {
    if(value == undefined){
        throw new Error("Favor informar todos os valores");
    }
}

export function useObject<T = any>(Object: T | any, props: useObjectProps): T | any {
    const verify = {
     Object: verifyValue(Object),
     Property: verifyValue(props.Property),
     NewValue: verifyValue(props.newValue)
    }
 
    verify["Object"]
    verify["Property"]
    verify["NewValue"]
 
    Object[props.Property] = props.newValue
    
    return Object
}

export function useArray<T = any, OBJECT = any>(array: T[], props: useArrayProps): T[] {
    const verify = {
        Array: verifyValue(array),
        Index: verifyValue(props.index),
        Property: verifyValue(props.Property),
        NewValue: verifyValue(props.newValue)
    }

    verify["Array"]
    verify["Index"]
    verify["Property"]
    verify["NewValue"]

    if(array.length > 0) {        
        let Object = array[props.index]

        let response = useObject<OBJECT>(Object, {...props})
        array[props.index] = response

    }
    return array
}

export async function usePost<T = any>(props: usePostProps, data: T) {

    let Header: AxiosHeaders = props.headers ?? {} as AxiosHeaders
    let StructurePost: AxiosRequestConfig<T> = {
        headers: Header
    }

    let response = 
    props.api.post(props.url, data, StructurePost)
        .then(res => res)
        .catch(error => error)
    
    return response
}

export function searchInObject<T = unknown>(props: SearchObject<T>): T | undefined {
    let search = props.search.toUpperCase()
    let element: T | undefined = undefined;

    if(props.property && String(props.elementObject[props.property])?.toUpperCase().includes(search))
        element = props.elementObject
    
    else if(!props.property){
        Object.keys(props.elementObject).map(key => {
            if(String(props.elementObject[key]).toUpperCase().includes(search))
                element = props.elementObject
        })
    }

    return element
}

export function useSearch<T = unknown | Object>(Element: T[] | [], props: useSearch<T>): T[] | [] | undefined {
    let search: string = props.search.toUpperCase();
    let arrayFiltred: T[] = [];

    Element.filter((elementAny: T | any) => {

        if(!props.property){
            Object.keys(elementAny).find(key => {
                if(String(elementAny[key]).toUpperCase().includes(search)){
                    arrayFiltred.push(elementAny);
                    return
                }

                else if(typeof(elementAny[key]) == "object" && elementAny[key].length > 0){
                    if(!(useSearch<any>(elementAny[key], {search: props.search})?.length == 0)){
                        arrayFiltred.push(elementAny);
                        return
                        
                    }
                    return
                }

                else if(typeof(elementAny[key]) == "object"){
                    if(searchInObject({elementObject: elementAny[key], search: props.search, property: props.objectProperty})){
                        arrayFiltred.push(elementAny)
                        return
                    }
                    return
                }
                    
            })
        }

        else if (typeof(elementAny[props.property]) == "object"){
            if(!!searchInObject<T>({elementObject: elementAny[props.property],search: props.search, property: props.objectProperty})){
                arrayFiltred.push(elementAny)
            }
        }
            
        else if((typeof(elementAny[props.property]) == "string" || typeof(elementAny[props.property]) == "number")){
            if(!!String(elementAny[props.property]).toUpperCase().includes(search)){
                arrayFiltred.push(elementAny)
            }
        }
        
    })

    let arrayWithoutRepeat: T[] = [... new Set(arrayFiltred)]

    return arrayWithoutRepeat
}