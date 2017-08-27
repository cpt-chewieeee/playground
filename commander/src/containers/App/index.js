import React from 'react'
import { Route } from 'react-router-dom'
import NavHeader from './NavHeader'
import Home from '../Home'
import About from '../About'
import Game from '../Game'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
	return {
		router: state.router,
		user: state.user
	}
}
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const App = (props) => {
	return (
	  <div>
	    <NavHeader />
	    <main>
	      <Route exact path="/" component={Home} />
	      <Route exact path="/about-us" component={About} />
	      <Route exact path="/game" component={Game} />
	    </main>
	  </div>
	)
}
App.propTypes = {
	router: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
