import { useEffect, useRef, useState } from "react";

function isNullValues(value: any): boolean {
    return value === "" || value === undefined || value === null;
}

// 在一个函数里，改变传入的对象本身是不好的
/**
 * @description: 清除空值 undefined null ''
 * @param {Record<string, any>} obj
 */
export function filterNullValues(obj?: Record<string, any>) {
    if (!obj) return {};
    let newObj = { ...obj };
    Object.keys(newObj).forEach((key) => {
        if (isNullValues(newObj[key])) {
            delete newObj[key];
        }
    });
    return newObj;
}

/**
 * @description: 只在挂载阶段执行callbcak的hook
 * @param {function} cb
 */
export const useMount = (cb: () => void) => {
    useEffect(() => {
        cb();
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);
};

/**
 * @description: 防抖hook
 */
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

export const useDocumentTitle = (
    title: string,
    keepOnUnmount: boolean = true
) => {
    let preTitle = useRef(document.title).current;
    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        return () => {
            if (!keepOnUnmount) {
                document.title = preTitle;
            }
        };
    }, [title, keepOnUnmount, preTitle]);
};

// 重置路由
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });

    return mountedRef;
};

// 判断是否为error
export function isError(value: unknown): value is Error {
    return value instanceof Error;
}
