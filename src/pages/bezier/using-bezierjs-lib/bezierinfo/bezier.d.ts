/**
 * Bezier curve constructor.
 *
 * ...docs pending...
 */
export class Bezier {
    static quadraticFromPoints(p1: any, p2: any, p3: any, t: any): Bezier;
    static cubicFromPoints(S: any, B: any, E: any, t: any, d1: any): Bezier;
    static getUtils(): {
        Tvalues: number[];
        Cvalues: number[];
        arcfn: (t: any, derivativeFn: any) => number;
        compute: (t: any, points: any, _3d: any) => any;
        computeWithRatios: (t: any, points: any, ratios: any, _3d: any) => {
            x: number;
            y: number;
            z: number | boolean;
            t: any;
        };
        derive: (points: any, _3d: any) => {
            x: number;
            y: number;
        }[][];
        between: (v: any, m: any, M: any) => boolean;
        approximately: (a: any, b: any, precision: any) => boolean;
        length: (derivativeFn: any) => number;
        map: (v: any, ds: any, de: any, ts: any, te: any) => any;
        lerp: (r: any, v1: any, v2: any) => {
            x: any;
            y: any;
        };
        pointToString: (p: any) => string;
        pointsToString: (points: any) => string;
        copy: (obj: any) => any;
        angle: (o: any, v1: any, v2: any) => number;
        round: (v: any, d: any) => number;
        dist: (p1: any, p2: any) => number;
        closest: (LUT: any, point: any) => {
            mdist: number;
            mpos: undefined;
        };
        abcratio: (t: any, n: any) => any;
        projectionratio: (t: any, n: any) => any;
        lli8: (x1: any, y1: any, x2: any, y2: any, x3: any, y3: any, x4: any, y4: any) => false | {
            x: number;
            y: number;
        };
        lli4: (p1: any, p2: any, p3: any, p4: any) => false | {
            x: number;
            y: number;
        };
        lli: (v1: any, v2: any) => false | {
            x: number;
            y: number;
        };
        makeline: (p1: any, p2: any) => Bezier;
        findbbox: (sections: any) => {
            x: {
                min: number;
                mid: number;
                max: number;
                size: number;
            };
            y: {
                min: number;
                mid: number;
                max: number;
                size: number;
            };
        };
        shapeintersections: (s1: any, bbox1: any, s2: any, bbox2: any, curveIntersectionThreshold: any) => any[];
        makeshape: (forward: any, back: any, curveIntersectionThreshold: any) => {
            startcap: Bezier;
            forward: any;
            back: any;
            endcap: Bezier;
            bbox: {
                x: {
                    min: number;
                    mid: number;
                    max: number;
                    size: number;
                };
                y: {
                    min: number;
                    mid: number;
                    max: number;
                    size: number;
                };
            };
        };
        getminmax: (curve: any, d: any, list: any) => {
            min: number;
            max: number;
            mid?: undefined;
            size?: undefined;
        } | {
            min: number;
            mid: number;
            max: number;
            size: number;
        };
        align: (points: any, line: any) => any;
        roots: (points: any, line: any) => number[];
        droots: (p: any) => number[];
        curvature: (t: any, d1: any, d2: any, _3d: any, kOnly: any) => any;
        inflections: (points: any) => number[];
        bboxoverlap: (b1: any, b2: any) => boolean;
        expandbox: (bbox: any, _bbox: any) => void;
        pairiteration: (c1: any, c2: any, curveIntersectionThreshold: any) => any[];
        getccenter: (p1: any, p2: any, p3: any) => false | {
            x: number;
            y: number;
        };
        numberSort: (a: any, b: any) => number;
    };
    static get PolyBezier(): typeof PolyBezier;
    static getABC(order: number, S: any, B: any, E: any, t?: number): {
        A: {
            x: any;
            y: any;
        };
        B: any;
        C: {
            x: number;
            y: number;
        };
        S: any;
        E: any;
    };
    constructor(coords: any, ...args: any[]);
    _3d: boolean;
    points: any[];
    order: number;
    dims: string[];
    dimlen: number;
    _linear: boolean;
    _lut: any[];
    _t1: number;
    _t2: number;
    getUtils(): {
        Tvalues: number[];
        Cvalues: number[];
        arcfn: (t: any, derivativeFn: any) => number;
        compute: (t: any, points: any, _3d: any) => any;
        computeWithRatios: (t: any, points: any, ratios: any, _3d: any) => {
            x: number;
            y: number;
            z: number | boolean;
            t: any;
        };
        derive: (points: any, _3d: any) => {
            x: number;
            y: number;
        }[][];
        between: (v: any, m: any, M: any) => boolean;
        approximately: (a: any, b: any, precision: any) => boolean;
        length: (derivativeFn: any) => number;
        map: (v: any, ds: any, de: any, ts: any, te: any) => any;
        lerp: (r: any, v1: any, v2: any) => {
            x: any;
            y: any;
        };
        pointToString: (p: any) => string;
        pointsToString: (points: any) => string;
        copy: (obj: any) => any;
        angle: (o: any, v1: any, v2: any) => number;
        round: (v: any, d: any) => number;
        dist: (p1: any, p2: any) => number;
        closest: (LUT: any, point: any) => {
            mdist: number;
            mpos: undefined;
        };
        abcratio: (t: any, n: any) => any;
        projectionratio: (t: any, n: any) => any;
        lli8: (x1: any, y1: any, x2: any, y2: any, x3: any, y3: any, x4: any, y4: any) => false | {
            x: number;
            y: number;
        };
        lli4: (p1: any, p2: any, p3: any, p4: any) => false | {
            x: number;
            y: number;
        };
        lli: (v1: any, v2: any) => false | {
            x: number;
            y: number;
        };
        makeline: (p1: any, p2: any) => Bezier;
        findbbox: (sections: any) => {
            x: {
                min: number;
                mid: number;
                max: number;
                size: number;
            };
            y: {
                min: number;
                mid: number;
                max: number;
                size: number;
            };
        };
        shapeintersections: (s1: any, bbox1: any, s2: any, bbox2: any, curveIntersectionThreshold: any) => any[];
        makeshape: (forward: any, back: any, curveIntersectionThreshold: any) => {
            startcap: Bezier;
            forward: any;
            back: any;
            endcap: Bezier;
            bbox: {
                x: {
                    min: number;
                    mid: number;
                    max: number;
                    size: number;
                };
                y: {
                    min: number;
                    mid: number;
                    max: number;
                    size: number;
                };
            };
        };
        getminmax: (curve: any, d: any, list: any) => {
            min: number;
            max: number;
            mid?: undefined;
            size?: undefined;
        } | {
            min: number;
            mid: number;
            max: number;
            size: number;
        };
        align: (points: any, line: any) => any;
        roots: (points: any, line: any) => number[];
        droots: (p: any) => number[];
        curvature: (t: any, d1: any, d2: any, _3d: any, kOnly: any) => any;
        inflections: (points: any) => number[];
        bboxoverlap: (b1: any, b2: any) => boolean;
        expandbox: (bbox: any, _bbox: any) => void;
        pairiteration: (c1: any, c2: any, curveIntersectionThreshold: any) => any[];
        getccenter: (p1: any, p2: any, p3: any) => false | {
            x: number;
            y: number;
        };
        numberSort: (a: any, b: any) => number;
    };
    valueOf(): string;
    toString(): string;
    toSVG(): string | false;
    setRatios(ratios: any): void;
    ratios: any;
    verify(): void;
    _print: any;
    coordDigest(): string;
    update(): void;
    dpoints: {
        x: number;
        y: number;
    }[][];
    computedirection(): void;
    clockwise: boolean;
    length(): number;
    getABC(t: any, B: any): {
        A: {
            x: any;
            y: any;
        };
        B: any;
        C: {
            x: number;
            y: number;
        };
        S: any;
        E: any;
    };
    getLUT(steps: any): any[];
    on(point: any, error: any): number | false;
    project(point: any): any;
    get(t: any): any;
    point(idx: any): any;
    compute(t: any): any;
    raise(): Bezier;
    derivative(t: any): any;
    dderivative(t: any): any;
    align(): Bezier;
    curvature(t: any): any;
    inflections(): number[];
    normal(t: any): {
        t: any;
        x: number;
        y: number;
    };
    __normal2(t: any): {
        t: any;
        x: number;
        y: number;
    };
    __normal3(t: any): {
        t: any;
        x: number;
        y: number;
        z: number;
    };
    hull(t: any): any[];
    split(t1: any, t2: any): any;
    extrema(): {
        values: any[];
    };
    bbox(): {};
    overlaps(curve: any): boolean;
    offset(t: any, d: any): any[] | {
        c: any;
        n: {
            t: any;
            x: number;
            y: number;
        };
        x: any;
        y: any;
    };
    simple(): boolean;
    reduce(): any[];
    translate(v: any, d1: any, d2: any): Bezier;
    scale(d: any): any;
    outline(d1: any, d2: any, d3: any, d4: any): PolyBezier;
    outlineshapes(d1: any, d2: any, curveIntersectionThreshold: any): {
        startcap: Bezier;
        forward: any;
        back: any;
        endcap: Bezier;
        bbox: {
            x: {
                min: number;
                mid: number;
                max: number;
                size: number;
            };
            y: {
                min: number;
                mid: number;
                max: number;
                size: number;
            };
        };
    }[];
    intersects(curve: any, curveIntersectionThreshold: any): any[];
    lineIntersects(line: any): number[];
    selfintersects(curveIntersectionThreshold: any): any[];
    curveintersects(c1: any, c2: any, curveIntersectionThreshold: any): any[];
    arcs(errorThreshold: any): any;
    _error(pc: any, np1: any, s: any, e: any): number;
    _iterate(errorThreshold: any, circles: any): any;
}
import { PolyBezier } from "./poly-bezier.js";
