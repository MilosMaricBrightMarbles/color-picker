import React, {useCallback, useLayoutEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {formatHSL} from '../utils/colorUtils'
import {calculateAngle} from '../utils/mathUtils'

const drawHSLCircle = (canvas, canvasDimension, lightness) => {
    const graphics = canvas.current.getContext('2d')
    const C = canvasDimension / 2

    for (let i = 0; i < 360; i += 0.1) {
        const white = 'white'
        const hsla = formatHSL(i, lightness)
        const rad = i * (2 * Math.PI) / 360
        const x = C + C * Math.cos(rad)
        const y = C + C * Math.sin(rad)
        const grad = graphics.createLinearGradient(C, C, x, y)

        grad.addColorStop(0, white)
        grad.addColorStop(0.01, white)
        grad.addColorStop(0.99, hsla)
        grad.addColorStop(1, hsla)
        graphics.strokeStyle = grad
        graphics.beginPath()
        graphics.moveTo(C, C)
        graphics.lineTo(x, y)
        graphics.stroke()
    }
}

const ColorWheel = ({handleColorChange, l, isSliding}) => {
    const canvasDimension = 300
    const canvas = useRef(null)

    useLayoutEffect(() => {
        !isSliding && drawHSLCircle(canvas, canvasDimension, l)
    }, [isSliding])
    const handleClick = useCallback(e => {
        const angle = calculateAngle(
            canvasDimension,
            {x: e.target.offsetLeft, y: e.target.offsetTop},
            {x: e.pageX, y: e.pageY}
        )

        handleColorChange(angle)
    }, [])

    return (
        <div className="color-wheel flex-center">
            <canvas ref={canvas} id='colors' width={`${canvasDimension}px`} height={`${canvasDimension}px`}
                    onClick={handleClick}/>
        </div>
    )
}

ColorWheel.propTypes = {
    handleColorChange: PropTypes.func,
    l: PropTypes.number,
    isSliding: PropTypes.bool
}

export default ColorWheel
