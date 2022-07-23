import { useEffect, useState } from "react";

function isNullValues(value: any): boolean {
    return value === "" || value === undefined || value === null;
}
// 在一个函数里，改变传入的对象本身是不好的
export function filterNullValues(obj: Record<string, any>) {
    let newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
        if (isNullValues(newObj[key])) {
            delete newObj[key];
        }
    });
    return newObj;
}

export const useMount = (cb: () => void) => {
    useEffect(() => {
        cb();
    }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // 每次value变化以后，设置一个定时器
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // 每次在上一个useEffect处理完后再执行
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
};
