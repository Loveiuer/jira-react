import { useEffect, useState } from "react";

export function select(projectObj, users) {
    let newProjectObj = { ...projectObj };
    let projectUser = users.find((user) => user.id === newProjectObj.personId);
    newProjectObj.personName = projectUser.name;
    return newProjectObj;
}

function isNullValues(value) {
    return value === 0 ? false : !value;
}
// 在一个函数里，改变传入的对象本身是不好的
export function filterNullValues(obj) {
    let newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
        if (isNullValues(newObj[key])) {
            delete newObj[key];
        }
    });
    return newObj;
}

export const useMount = (cb) => {
    useEffect(() => {
        cb();
    }, []);
};

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
};
