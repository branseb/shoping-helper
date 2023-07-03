import { atom, useAtomValue } from "jotai";
import { useMemo } from "react";

export type Device = {
    id: string,
    brand: string,
    model: string,
    url: string,
    price: number,
    consumptionPerYear: number,
    idOfCompare: string
}

export type Compare = {
    name: string,
    id: string,
    ownerId: string,
}

const DUMMY_COMPARES: Compare[] = [
    {
        name: 'Refrigerators',
        id: 'diohohfhfg56',
        ownerId: '654894964dfgdghdggv'

    },
    {
        name: 'TVs',
        id: 'dgdfgdfgzdfvd',
        ownerId: 'dfbjidhg5gg'
    }
]

const DUMMY_DEVICES: Device[] = [
    {
        brand: 'Samsung',
        model: 'brv7545',
        url: 'https://www.samsung.com',
        consumptionPerYear: 231,
        price: 668,
        id: 'diohhfuoyf6',
        idOfCompare: 'diohohfhfg56'

    },
    {
        brand: 'Bosch',
        model: 'BSH565dcfd',
        url: 'https://www.bosch.com',
        consumptionPerYear: 251,
        price: 750,
        id: 'fgdfggs625g',
        idOfCompare: 'diohohfhfg56'
    },
    {
        brand: 'Samsung',
        model: '43SAM660AK',
        url: 'https://www.samsung.com',
        consumptionPerYear: 150,
        price: 319,
        id: 'lg6558',
        idOfCompare: 'dgdfgdfgzdfvd'
    },
    {
        brand: 'LG',
        model: '50LG5264K',
        url: 'https://www.lg.com',
        consumptionPerYear: 231,
        price: 359,
        id: 'hdfufuyf',
        idOfCompare: 'dgdfgdfgzdfvd'
    }]

export const selectedCompareAtom = atom<Compare>({ name: '', id: '', ownerId: '' });

export const newCompareForm = atom<boolean>(false);

export const comparesAtom = atom(DUMMY_COMPARES);

export const devicesAtom = atom(DUMMY_DEVICES);

export const useDevicesByCompareId = (id: string) => {
    const allDevices = useAtomValue(devicesAtom);
    const filteredDevices = useMemo(() => allDevices.filter(d => d.idOfCompare === id), [allDevices, id]);
    return filteredDevices;
}
