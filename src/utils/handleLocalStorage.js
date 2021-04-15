import React, { useState, useEffect, memo } from 'react';

const storageKey = {
    // FIRST_TIME: 'FIRST_TIME'
};

const saveItem = (key, value) => {
    const convertValue = typeof value == 'object' ? JSON.stringify(value) : String(value)
    localStorage.setItem(key, convertValue)
};

const getItem = async (key) => {
    const result = await localStorage.getItem(key);
    try {
        const dataParse = JSON.parse(result);
        return dataParse;
    } catch (e) {
        return result;
    }
}

const insertItem = async (key, value) => {
    try {
        const valLocal = await getItem(key);

        if (valLocal) {
            const newData = [
                value,
                ...valLocal
            ]
            saveItem(key, newData)
        } else {
            saveItem(key, [value])
        }
    } catch (err) {
        console.log('err insert local storage', err)
    }

}


const useStorage = (key = '', context = []) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        getItem(key).then(val => {
            // console.log({ val })
            setValue(val)
        })
    }, context)

    useEffect(() => {
        saveItem(key, value);
    }, [value, ...context]);

    return [value, setValue];
};


export const handleLocalStorage = {
    storageKey,
    useStorage,
    saveItem,
    getItem,
    insertItem,
};

