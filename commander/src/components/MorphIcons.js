import React from 'react'
import PropTypes from 'prop-types'
import { MorphIcon } from 'react-svg-buttons'

const IconTypes = [
  'ban', //default
  'arrowDown',
  'arrowUp',
  'arrowLeft',
  'arrowRight',
  'bars',
  'check',
  'cross',
  'crossSpark',
  'code',
  'ffwd',
  'fwd',
  'hastag',
  'home',
  'inbox',
  'plus',
  'plusSpark', 
  'thunderbolt',
]

// can be used for toggling
const Buttons = (props) => {
  let { type, size, label, mouseEvent, styleType } = props
  if (IconTypes.indexOf(type) < 0) {
    type = IconTypes[0]
  } 
  switch (styleType) {
    case 'vertical':
      return (
        <div style={{ marginBottom: 20, cursor: 'pointer', width: 60, padding: 5 }} onClick={mouseEvent}>
          <MorphIcon type={type} size={size} color={'#ffffff'} thickness={1} />
          <div style={{ color: '#ffffff', marginTop: 12 }}>{label}</div>
        </div>
      )
    case 'horizontal':
    default:
      return (
        <div style={{ marginBottom: 20, cursor: 'pointer' }} onMouseEnter={mouseEvent}>
          <MorphIcon type={type} size={size} color={'#ffffff'} thickness={1} />
          <label style={{ color: '#ffffff', marginLeft: 20 }}>{label}</label>
        </div>
      )
  }
}
Buttons.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  label: PropTypes.string.isRequired,
  mouseEvent: PropTypes.func.isRequired,
  styleType: PropTypes.string
}
Buttons.defaultProps = {
  type: IconTypes[0],
  size: 32
}
export default {
  TypeList: IconTypes,
  Buttons
}