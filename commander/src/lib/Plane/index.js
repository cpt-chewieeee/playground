const THREE = window.THREE

const Plane = () => {
  console.log('-----render-plane-----')
  var planeGeometry = new THREE.PlaneGeometry(2000, 2000)
  planeGeometry.rotateX( -Math.PI / 2 )
  // var planeMaterial = new THREE.ShadowMaterial({ opacity: 0.9, color:  0xb66161 })
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x7fffd4 });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.position.y = -20
  plane.receiveShadow = true
  return plane  
}
export default Plane