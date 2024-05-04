export {
    existsSamePoint
}

function existsSamePoint(exists = [], pos, r = 10) {
    let neareastPoint = null;
    for (const existsPoint of exists) {
        const nearRange = Math.abs(existsPoint.x - pos.x) < r && Math.abs(existsPoint.y - pos.y) < r;
        if (nearRange) {
            neareastPoint = existsPoint;
            break;
        }        
    }
    if (neareastPoint) {
        return { exists: true, neareastPoint}
    }
    return {
        exists: false
    }
}