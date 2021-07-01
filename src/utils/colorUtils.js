import convert from 'color-convert'

const DEFAULT_SATURATION = 100

export const hslToRgb = (h, l) => {
    const rgb = convert.hsl.rgb(h, DEFAULT_SATURATION, l)

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

export const formatHSL = (h, l) => `hsl(${h}, ${DEFAULT_SATURATION}%, ${l}%)`
export const formatHSLA = (h, l, a) => `hsl(${h}, ${DEFAULT_SATURATION}%, ${l}%, ${a})`

export const isValidLightness = l => typeof l === 'number' && l >= 0 && l <= 100

export const getComplementaryHues = (initialHue, numberOfComplementaryColors) => {
    let maxHue = 360
    const hueDelta = maxHue / numberOfComplementaryColors
    const hues = [...Array(numberOfComplementaryColors).keys()].map(i => (initialHue + i * hueDelta) % maxHue)

    return hues
}
