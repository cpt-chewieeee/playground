import React, { Component } from 'react'

import Button from '../../components/MorphIcons'

const initialState = {
  selected: ''
}
export default class Menu extends Component {
  constructor (props) {
    super (props)
    this.state = Object.assign({}, initialState)
    this.renderPanel = this.renderPanel.bind(this)
  }
  renderPanel () {
    switch(this.state.selected) {
      case 'settings':
        return 'Settings page'
      case 'dev-tools':
        return (
          "hello world"
        )
      case 'home':
      default:
        return (
          <div> 
            <Button.Buttons
              type='ban'
              size={50}
              label={'Restart'}
              styleType='vertical'
              mouseEvent={() => window.location.reload()}
            />
          </div>
        )
    }
  }
  render () {
    return (
      <div className='menu'>
        <ul className='menu-list'>
          <Button.Buttons 
            type='home' 
            size={40} 
            label={'Home'} 
            mouseEvent={() => this.setState({ selected: 'home' })} 
          />
          <Button.Buttons 
            type='bars' 
            size={40} 
            label={'Settings'} 
            mouseEvent={() => this.setState({ selected: 'settings' })} 
          />
          <Button.Buttons 
            type='thunderbolt' 
            size={40} 
            label={'Dev tools'} 
            mouseEvent={() => this.setState({ selected: 'dev-tools' })} 
          />
        </ul>
        <div className='menu-content'>
          {this.renderPanel()}
        </div>
      </div>
    )
  }
}