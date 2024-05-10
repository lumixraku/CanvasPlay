/**
 * Poly Bezier
 * @param {[type]} curves [description]
 */
export class PolyBezier {
    constructor(curves: any);
    curves: any;
    _3d: any;
    valueOf(): string;
    toString(): string;
    addCurve(curve: any): void;
    length(): any;
    curve(idx: any): any;
    bbox(): any;
    offset(d: any): PolyBezier;
}
