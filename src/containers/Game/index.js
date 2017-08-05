import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Game from '../../lib'

class GameView extends Component {

    componentDidMount () {
        const test = new Game()
    }
    render () {
        return <div>
            lkasjdf;lkasdf
        </div>
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GameView)