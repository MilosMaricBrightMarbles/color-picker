export const calculateAngle = (canvasDimension, topLeftCanvasPoint, clickPoint) => {
    const circleCenter = {x: topLeftCanvasPoint.x + canvasDimension / 2, y: topLeftCanvasPoint.y + canvasDimension / 2}
    const circleMostRightPoint = {
        x: topLeftCanvasPoint.x + canvasDimension,
        y: topLeftCanvasPoint.y + canvasDimension / 2
    }
    const hasClickedTopHalf = clickPoint.y < circleCenter.y

    const AB = Math.sqrt(Math.pow(circleCenter.x - clickPoint.x, 2) + Math.pow(circleCenter.y - clickPoint.y, 2))
    const BC = Math.sqrt(Math.pow(circleCenter.x - circleMostRightPoint.x, 2) + Math.pow(circleCenter.y - circleMostRightPoint.y, 2))
    const AC = Math.sqrt(Math.pow(circleMostRightPoint.x - clickPoint.x, 2) + Math.pow(circleMostRightPoint.y - clickPoint.y, 2))

    let angle = 180 * Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) / Math.PI

    if (hasClickedTopHalf) {
        angle = 360 - angle
    }
    return Math.round(angle)
}
