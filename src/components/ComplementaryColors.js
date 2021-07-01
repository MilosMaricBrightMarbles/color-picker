import React, {useEffect, useRef} from 'react'
import {formatHSL, formatHSLA, getComplementaryHues} from '../utils/colorUtils'
import PropTypes from 'prop-types'

const ComplementaryColors = ({h, l}) => {
    const hues = getComplementaryHues(h, 5)
    const wrapperRef = useRef(null)

    useEffect(() => {
        let hsl = formatHSLA(h, l, 0.25)
        wrapperRef.current.style.setProperty('background-color', hsl)
    }, [h, l])

    return (
        <div className="complementary-colors" ref={wrapperRef}>
            {hues.map(hue =>
                <div className='complementary-color shadowed' key={hue} style={{backgroundColor: formatHSL(hue, l)}}/>
            )}
        </div>
    )
}

ComplementaryColors.propTypes = {
    h: PropTypes.number,
    l: PropTypes.number
}

export default ComplementaryColors
