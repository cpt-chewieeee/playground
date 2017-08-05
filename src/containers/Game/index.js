import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class Game extends Component {


    render () {
        return <div>
            lkasjdf;lkasdf
        </div>
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Game)