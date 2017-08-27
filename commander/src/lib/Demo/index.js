const THREE = window.THREE
export default {
  renderPlane: () => {
    console.log('-----render-----plane-----')
    var planeGeometry = new THREE.PlaneBufferGeometry(160, 120)
    var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true

    // rotate and position the plane
    // plane.rotation.x = -0.5 * Math.PI
    // plane.position.x = 15
    // plane.position.y = 0
    // plane.position.z = 0
    plane.position.set(0, 0 , -25)
    return plane
  },
  // renderSphere: () => {
  //   console.log('-----render-----sphere-----')
 
  //   var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
  //   var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff})
  //   var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

  //   // position the sphere
  //   sphere.position.x = 20
  //   sphere.position.y = 0
  //   sphere.position.z = 2
  //   sphere.castShadow = true

  //   return sphere
  // },
  spotLight: () => {
    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    return spotLight
  }
}