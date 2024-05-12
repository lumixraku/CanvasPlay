declare module './util.mjs' {

    export { existsSamePoint };
    declare function existsSamePoint(exists: never[] | undefined, pos: any, r?: number): {
        exists: boolean;
        neareastPoint: never;
    } | {
        exists: boolean;
        neareastPoint?: undefined;
    };

}