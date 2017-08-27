var THREE = window.THREE

export const  renderAmbientLight = () => {
  console.log('-----render-ambient-light-----')
  return new THREE.AmbientLight( 0xf0f0f0 )
}
export const renderSpotLight = () => {
  console.log('-----render-spot-light-----')
  var light = new THREE.SpotLight( 0xffffff, 1.5 )
  light.position.set( 0, 1500, 200 )
  light.castShadow = true
  light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 200, 2000 ) )
  light.shadow.bias = -0.000222
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  return light
}
export const helper = () => {
  console.log('-----render-helper-----')
  var helper = new THREE.GridHelper(2000, 100)
  helper.position.y = -9
  helper.material.opacity = 1
  helper.material.transparent = true
  return helper
}
export const axisHelper = () => {
  console.log('-----render-axis-helper-----')
  var axis = new THREE.AxisHelper(20)
  // axis.position.set( -500, -500, -500 )
  return axis
}
export const hemisphereLight = () => {
  var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 )
  light.position.set( 0.5, 1, 0.75 )
  return light
}