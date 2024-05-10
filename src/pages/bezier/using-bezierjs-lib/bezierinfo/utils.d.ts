export namespace utils {
    let Tvalues: number[];
    let Cvalues: number[];
    function arcfn(t: any, derivativeFn: any): number;
    function compute(t: any, points: any, _3d: any): any;
    function computeWithRatios(t: any, points: any, ratios: any, _3d: any): {
        x: number;
        y: number;
        z: number | boolean;
        t: any;
    };
    function derive(points: any, _3d: any): {
        x: number;
        y: number;
    }[][];
    function between(v: any, m: any, M: any): boolean;
    function approximately(a: any, b: any, precision: any): boolean;
    function length(derivativeFn: any): number;
    function map(v: any, ds: any, de: any, ts: any, te: any): any;
    function lerp(r: any, v1: any, v2: any): {
        x: any;
        y: any;
    };
    function pointToString(p: any): string;
    function pointsToString(points: any): string;
    function copy(obj: any): any;
    function angle(o: any, v1: any, v2: any): number;
    function round(v: any, d: any): number;
    function dist(p1: any, p2: any): number;
    function closest(LUT: any, point: any): {
        mdist: number;
        mpos: undefined;
    };
    function abcratio(t: any, n: any): any;
    function projectionratio(t: any, n: any): any;
    function lli8(x1: any, y1: any, x2: any, y2: any, x3: any, y3: any, x4: any, y4: any): false | {
        x: number;
        y: number;
    };
    function lli4(p1: any, p2: any, p3: any, p4: any): false | {
        x: number;
        y: number;
    };
    function lli(v1: any, v2: any): false | {
        x: number;
        y: number;
    };
    function makeline(p1: any, p2: any): Bezier;
    function findbbox(sections: any): {
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
    function shapeintersections(s1: any, bbox1: any, s2: any, bbox2: any, curveIntersectionThreshold: any): any[];
    function makeshape(forward: any, back: any, curveIntersectionThreshold: any): {
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
    function getminmax(curve: any, d: any, list: any): {
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
    function align(points: any, line: any): any;
    function roots(points: any, line: any): number[];
    function droots(p: any): number[];
    function curvature(t: any, d1: any, d2: any, _3d: any, kOnly: any): any;
    function inflections(points: any): number[];
    function bboxoverlap(b1: any, b2: any): boolean;
    function expandbox(bbox: any, _bbox: any): void;
    function pairiteration(c1: any, c2: any, curveIntersectionThreshold: any): any[];
    function getccenter(p1: any, p2: any, p3: any): false | {
        x: number;
        y: number;
    };
    function numberSort(a: any, b: any): number;
}
import { Bezier } from "./bezier.js";
