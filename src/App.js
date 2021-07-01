import React, {useCallback, useEffect, useRef, useState} from 'react'
import './App.css'
import ColorWheel from './components/ColorWheel'
import BrightnessSlider from './components/BrightnessSlider'
import ComplementaryColors from './components/ComplementaryColors'
import {formatHSL} from './utils/colorUtils'

function App() {
    const [l, setL] = useState(50)
    const [h, setH] = useState(0)
    const [isSliding, setIsSliding] = useState(false)
    const appDivRef = useRef(null)

    const handleColorChange = useCallback(setH, [])
    const handleLightnessChange = useCallback(({x}) => setL(x), [])
    const handleSlideEnd = useCallback(() => setIsSliding(false), [])
    const handleSlideStart = useCallback(() => setIsSliding(true), [])

    useEffect(() => {
        let hsl = formatHSL(h, l)
        appDivRef.current.style.setProperty('background-color', hsl)
        appDivRef.current.style.setProperty('color', hsl)
    }, [h, l])

    return (
        <div className='app' ref={appDivRef}>
            <div className='color-picker shadowed'>
                <ColorWheel l={l} handleColorChange={handleColorChange} isSliding={isSliding}/>
                <BrightnessSlider h={h} l={l}
                                  handleChange={handleLightnessChange}
                                  handleSlideStart={handleSlideStart}
                                  handleSlideEnd={handleSlideEnd}
                />
                <ComplementaryColors h={h} l={l}/>
            </div>
        </div>
    )
}

export default App
