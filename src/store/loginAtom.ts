import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

export type User = {
    id: string;
    name: string;
    password: string;
};

const defaultUsers: User[] = [
    {
        id: '654894964dfgdghdggv',
        name: 'user11',
        password: 'password1',
    },
    {
        id: 'dfbjidhg5gg',
        name: 'user22',
        password: 'password2'
    }
]

export const loginUserAtom = atom<User>({ id: '', name: '', password: '' });


export const usersAtom = atom<User[]>(defaultUsers)

export const useLogin = () => {
    const setloginuser = useSetAtom(loginUserAtom);
    const userslist = useAtomValue(usersAtom);

    const login = useCallback((name: string, password: string) => {
        const user = userslist.find(user => user.name === name && user.password === password);
        if (user) {
            setloginuser(user)
        }
    }, [userslist, setloginuser]);

    return login;
}


export const useRegisterAndLogin = () => {
    const setloginuser = useSetAtom(loginUserAtom);
    const [_, setUsersList] = useAtom(usersAtom);

    const registerAndLogin = useCallback((name: string, password: string) => {
        const newUser: User = {
            name,
            password,
            id: Math.random().toString(30)
        }
        setUsersList(prev => [...prev, newUser])
        setloginuser(newUser)
    }, [setloginuser, setUsersList]);

    return registerAndLogin;
}

export const useRegisterValidation = (name: string, pwd: string, verifyPwd: string) => {
    const [nameError, setNameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [wrongVeriPasswordError, setWrongVeriPasswordError] = useState<boolean>(false);
    const [userExists, setUserExists] = useState<boolean>(false);

    const users = useAtomValue(usersAtom);

    useEffect(() => {
        setPasswordError(pwd.length < 6);
        setNameError(name.length < 6);
        setWrongVeriPasswordError(pwd !== verifyPwd);
        setUserExists(!!users.find(u => u.name === name));
    }, [name, pwd, verifyPwd, users]);

    return { nameError, passwordError, wrongVeriPasswordError, userExists };
}