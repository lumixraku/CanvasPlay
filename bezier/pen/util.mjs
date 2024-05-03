export {
    existsSamePoint
}

function existsSamePoint(exists = [], pos, r = 5) {
    let neareastPoint = null;
    for (const existsPoint of exists) {
        const nearRange = Math.abs(existsPoint.x - pos.x) < r && Math.abs(existsPoint.y - pos.y);
        if (nearRange) {
            neareastPoint = existsPoint;
            break;
        }        
    }
    return neareastPoint;
}