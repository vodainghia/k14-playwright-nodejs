export function selector(selectorValue: string) {
    return function (target: any) {
        target.selectorValue = selectorValue;
    }
}
