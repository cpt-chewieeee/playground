const THREE = window.THREE
export default {
  getPlane: () => {
    console.log('-----get-a-plane-----')
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1)
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
    var plane = new THREE.Mesh(planeGeometry, planeMaterial)
    
    plane.receiveShadow = true

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    
    return plane
  },
  makeACube: () => {
    console.log('-----making-a-cube-----')
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    cube.castShadow = true

    // position the cube
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    return cube
  },
  makeASphere: () => {
    console.log('-----making-a-sphere-----')
    var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    // position the sphere
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2

    return sphere
  },
  makeAmbientLight: () => {
    var ambientLight = new THREE.AmbientLight(0x0c0c0c)
    return ambientLight
  },
  makeSpotLight: () => {
    var spotLight = new THREE.SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    return spotLight
  }
}