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
    }

    componentDidMount () {
        // this.game = new Game({ width: window.innerWidth, height: window.innerHeight }, '#game-start')
        this.game = new Game({ width: 1024, height: 768 }, '#game-start')
        
    }
    componentWillReceiveProps (nextProps) {
        console.log(this.game)
        

    }
    render () {
        return <div className='container-fluid'>
            <Jumbotron>
                <div className='game-container' id='game-start' />
            </Jumbotron>
            <hr />
            <Jumbotron>
                Game page
                inside

            </Jumbotron>
        </div>
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameView)