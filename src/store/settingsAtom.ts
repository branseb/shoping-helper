import { atom, useAtomValue } from "jotai";
import { useMemo } from "react";

export type UserSettingsType = {
    idOfUser:string;
    electricityPrice:number;

}

const defaultUsersSettings:UserSettingsType[] = [{
idOfUser:'654894964dfgdghdggv',
electricityPrice:0.2
}]

export const usersSettingsAtom = atom<UserSettingsType[]>(defaultUsersSettings);

export const useLoginUserSettings = (id: string) => {
    const allUsersSettings = useAtomValue(usersSettingsAtom);
    const loginUserSettings = useMemo(() => allUsersSettings.find(us => us.idOfUser === id), [allUsersSettings , id]);
    return loginUserSettings;
}