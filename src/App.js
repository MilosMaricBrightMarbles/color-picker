import React, {useCallback, useEffect, useRef, useState} from 'react'
import './App.css'
import ColorWheel from './components/ColorWheel'
import BrightnessSlider from './components/BrightnessSlider'
import ComplementaryColors from './components/ComplementaryColors'
import {formatHSL, isValidHue, isValidLightness} from './utils/colorUtils'

const parsePath = () => {
    let initialH = 0
    let initialL = 50

    //eslint-disable-next-line
    let params = window.location.href.split('?')

    if (params && params.length > 1) {
        params = params[1].split('&')
        if (params && params.length) {
            params.forEach(p => {
                p = p.split('=')
                const value = Number(p[1])
                if (p[0] === 'h' && isValidHue(value)) {
                    initialH = value
                } else if (p[0] === 'l' && isValidLightness(value)) {
                    initialL = value
                }
            })
        }
    }

    return {initialH, initialL}
}

function App() {
    const {initialH, initialL} = parsePath()
    const [l, setL] = useState(initialL)
    const [h, setH] = useState(initialH)
    const [isSliding, setIsSliding] = useState(false)
    const appDivRef = useRef(null)

    const handleColorChange = useCallback(setH, [])
    const handleLightnessChange = useCallback(({x}) => setL(x), [])
    const handleSlideEnd = useCallback(() => setIsSliding(false), [])
    const handleSlideStart = useCallback(() => setIsSliding(true), [])
    const handleDeeplinkCopy = useCallback(() => {
        //eslint-disable-next-line
        const el = document.createElement('textarea');
        //eslint-disable-next-line
        let deepLink = window.location.href.split('?')[0];

        deepLink = `${deepLink}?h=${h}&l=${l}`
        el.value = deepLink
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        //eslint-disable-next-line
        document.body.appendChild(el);
        el.select()
        //eslint-disable-next-line
        document.execCommand('copy');
        //eslint-disable-next-line
        document.body.removeChild(el);
    }, [h, l])

    useEffect(() => {
        let hsl = formatHSL(h, l)
        appDivRef.current.style.setProperty('background-color', hsl)
        appDivRef.current.style.setProperty('color', hsl)
    }, [h, l])

    return (
        <div className='app' ref={appDivRef}>
            <div className='color-picker shadowed'>
                <div className='link-icon'>
                    <i className='fas fa-link' onClick={handleDeeplinkCopy}/>
                </div>
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
