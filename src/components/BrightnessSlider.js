import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-input-slider'
import {hslToRgb} from '../utils/colorUtils'

const BrightnessSlider = ({h, l, handleChange, handleSlideStart, handleSlideEnd}) => {
    return (
        <div className="brightness-slider flex-center">
            <div className='bulb-icon'><i className="fas fa-lightbulb"/></div>
            <Slider axis='x' xmin={1} xmax={100}
                    onChange={handleChange}
                    x={l}
                    onDragEnd={handleSlideEnd}
                    onDragStart={handleSlideStart}
                    styles={{active: {backgroundColor: hslToRgb(h, l)}}}/>
            <div className='bulb-icon'><i className="far fa-lightbulb"/></div>
        </div>
    )
}

BrightnessSlider.propTypes = {
    l: PropTypes.number,
    h: PropTypes.number,
    handleChange: PropTypes.func,
    handleSlideEnd: PropTypes.func,
    handleSlideStart: PropTypes.func
}

export default BrightnessSlider
