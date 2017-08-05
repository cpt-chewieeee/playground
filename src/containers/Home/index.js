import React from 'react'
// import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import {
//   increment,
//   incrementAsync,
//   decrement,
//   decrementAsync
// } from '../../modules/counter'

const Home = props => {
  console.log(props)
  return (
    <div className='container'>
      alksdjf;laksdjf
    </div>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  // increment,
  // incrementAsync,
  // decrement,
  // decrementAsync,
  // changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
