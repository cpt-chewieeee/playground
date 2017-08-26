import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Game from '../../lib'
import { Jumbotron } from 'react-bootstrap'
import './Game.css'
class GameView extends Component {
    constructor (props) {
      super(props)
      this.game = null
      this.start = this.start.bind(this)
      this.state = {
        start: false
      }
    }

    componentDidMount () {
      // this.game = new Game({ width: window.innerWidth, height: window.innerHeight }, '#game-start')
    
      const { clientWidth, clientHeight } = this.refs['game-dom']
      this.game = new Game({ width: clientWidth, height: clientHeight }, 'game-start') 
    }
    start (e) {
      e.preventDefault()
      this.game.start().then(() => this.setState({ start: true }))
    }
    componentWillReceiveProps (nextProps) {
      

    }
    render () {
        return <div className='container-fluid'>
            <Jumbotron className='jumbo'>
                <div ref='game-dom' className='game-container' id='game-start' />
            </Jumbotron>
            <hr />
            {
              !this.state.start 
              ? <Jumbotron className='settings'>
                <button className='btn btn-primary btn-lg btn-block' onClick={this.start}>Start</button>
              </Jumbotron>
              : null
            }
        </div>
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameView)