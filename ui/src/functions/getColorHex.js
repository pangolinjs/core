import getColorRGB from './getColorRGB'

function componentToHex (component) {
  const hex = component.toString(16)

  if (hex.length === 1) {
    return `0${hex}`
  }

  return hex
}

export default function (color) {
  const [r, g, b] = getColorRGB(color)
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}
