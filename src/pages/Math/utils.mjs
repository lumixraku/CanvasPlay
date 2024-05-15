function convertPixiMatrixTo4x4(pixiMatrix) {
    let matrix4x4 = [
        [pixiMatrix.a, pixiMatrix.c, 0, pixiMatrix.tx],
        [pixiMatrix.b, pixiMatrix.d, 0, pixiMatrix.ty],
        [0,          0,           1, 0],
        [0,          0,           0, 1]
    ];

    // Flatten the 2D array to a single array
    return matrix4x4.flat();
}

// point • matrix
function multiplyMatrixAndPoint(matrix, point) {
    // Give a simple variable name to each part of the matrix, a column and row number
    let c0r0 = matrix[0],
        c1r0 = matrix[1],
        c2r0 = matrix[2],
        c3r0 = matrix[3];
    let c0r1 = matrix[4],
        c1r1 = matrix[5],
        c2r1 = matrix[6],
        c3r1 = matrix[7];
    let c0r2 = matrix[8],
        c1r2 = matrix[9],
        c2r2 = matrix[10],
        c3r2 = matrix[11];
    let c0r3 = matrix[12],
        c1r3 = matrix[13],
        c2r3 = matrix[14],
        c3r3 = matrix[15];

    // Now set some simple names for the point
    let x = point[0];
    let y = point[1];
    let z = point[2];
    let w = point[3];

    // Multiply the point against each part of the 1st column, then add together
    let resultX = x * c0r0 + y * c0r1 + z * c0r2 + w * c0r3;

    // Multiply the point against each part of the 2nd column, then add together
    let resultY = x * c1r0 + y * c1r1 + z * c1r2 + w * c1r3;

    // Multiply the point against each part of the 3rd column, then add together
    let resultZ = x * c2r0 + y * c2r1 + z * c2r2 + w * c2r3;

    // Multiply the point against each part of the 4th column, then add together
    let resultW = x * c3r0 + y * c3r1 + z * c3r2 + w * c3r3;

    return [resultX, resultY, resultZ, resultW];
}

//matrixB • matrixA
function multiplyMatrices(matrixA, matrixB) {
    // Slice the second matrix up into rows
    let row0 = [matrixB[0], matrixB[1], matrixB[2], matrixB[3]];
    let row1 = [matrixB[4], matrixB[5], matrixB[6], matrixB[7]];
    let row2 = [matrixB[8], matrixB[9], matrixB[10], matrixB[11]];
    let row3 = [matrixB[12], matrixB[13], matrixB[14], matrixB[15]];

    // Multiply each row by matrixA
    let result0 = multiplyMatrixAndPoint(matrixA, row0);
    let result1 = multiplyMatrixAndPoint(matrixA, row1);
    let result2 = multiplyMatrixAndPoint(matrixA, row2);
    let result3 = multiplyMatrixAndPoint(matrixA, row3);

    // Turn the result rows back into a single matrix
    return [
        result0[0],
        result0[1],
        result0[2],
        result0[3],
        result1[0],
        result1[1],
        result1[2],
        result1[3],
        result2[0],
        result2[1],
        result2[2],
        result2[3],
        result3[0],
        result3[1],
        result3[2],
        result3[3],
    ];
}

function matrixMultiplyFlat(matrixA, matrixB) {
    // Initialize a result array with 16 zeros
    let result = new Array(16).fill(0);

    // Perform matrix multiplication matrixA * matrixB
    for (let i = 0; i < 4; i++) { // row index for matrixA
        for (let j = 0; j < 4; j++) { // column index for matrixB
            let sum = 0;
            for (let k = 0; k < 4; k++) { // indices for summation
                sum += matrixA[i * 4 + k] * matrixB[k * 4 + j];
            }
            result[i * 4 + j] = sum;
        }
    }

    return result;
}

function convertMatrix4x4ToCanvasTransform(m) {
    return {
        a: m[0],
        b: m[1],
        c: m[4],
        d: m[5],
        e: m[12],
        f: m[13]
    };
}

function makePolygons() {
    // 绘制多边形
    const polygonPoints = [
        // 凸多边形
        [[100, 100], [200, 50], [300, 100], [250, 200], [150, 200]],

        // 凹多边形
        [[100, 100], [200, 130], [300, 100], [250, 200], [150, 200]],

        // 六角形
        [[80, 100], [120, 100], [150, 50], [180, 100], [220, 100], [200, 150], [220, 200], [180, 200], [150, 250], [120, 200], [80, 200], [100, 150]],

        // 凹形状
        [[100, 100], [150, 100], [150, 150], [200, 150], [200, 100], [250, 100],[250, 200], [100, 200]]
    ];
    const transformedPolygons = [];

    for (const [i, p] of polygonPoints.entries()) {
        transformedPolygons.push({
            points: addOffset(p, i * 150, i * 150),
            shape: null,
        });
    }
    return transformedPolygons;
}

// 绘制多边形
function createPolygonPath(points) {
    // ctx.beginPath();
    // ctx.moveTo(points[0][0], points[0][1]);
    // for (let i = 1; i < points.length; i++) {
    //     ctx.lineTo(points[i][0], points[i][1]);
    // }
    // ctx.closePath();

    // 创建一个空的 Path2D 对象
    const path = new Path2D();

    // 将起始点移动到第一个点的位置
    const startPoint = points[0];
    path.moveTo(startPoint[0], startPoint[1]);

    // 通过连接线段绘制路径
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        path.lineTo(points[i][0], points[i][1]);
    }

    // 可选：将路径闭合形成封闭图形
    path.closePath();
    return path;
}

function drawPolygon(ctx, poly) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke(poly);

}

function addOffset(poly, offsetX, offsetY) {
    return poly.map(p => [p[0] + offsetX, p[1] + offsetY]);
}


export {
    convertPixiMatrixTo4x4,
    multiplyMatrices,
    multiplyMatrixAndPoint,
    matrixMultiplyFlat,
    convertMatrix4x4ToCanvasTransform,


    drawPolygon,
    addOffset,
    makePolygons,
    createPolygonPath,

}