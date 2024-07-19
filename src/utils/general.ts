export function setProperty<T extends object, K extends keyof T>(
    obj: T, key: K, val: T[K]
) {
    obj[key] = val;
}