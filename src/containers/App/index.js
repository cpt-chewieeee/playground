import React from 'react';
import { Route } from 'react-router-dom'
import NavHeader from './NavHeader'
import Home from '../Home'
import About from '../About'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const App = (props) => {
	console.log(props)
	return (
	  <div>
	    <NavHeader />

	    <main>
	      <Route exact path="/" component={Home} />
	      <Route exact path="/about-us" component={About} />
	    </main>
	  </div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
