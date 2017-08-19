var THREE = null
const sanityCheck = () => new Promise ((resolve, reject) => {
    THREE = window.THREE
    window.THREE !== undefined ? resolve() : reject(new Error('Cannot find threejs'))
})

const ACTIONS = {
    STOP: 'STOP',
    START: 'START'
}

export class Game {
    constructor ( { width, height }, idName) {
      sanityCheck()
        .then(() => {
          console.log('Check[1] complete')
          console.log('initializing...', width, height, idName)
          this.width = width
          this.height = height
          this.id = idName
          this.status = ACTIONS.START
          
          this.scene = new THREE.Scene()
          this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
          
          this.renderer = new THREE.WebGLRenderer()
          console.log(this.renderer)
          // this.renderer.setClearColorHex()
          this.renderer.setClearColor(new THREE.Color(0xEEEEEE))
          this.renderer.setSize(width, height)
          
          this.axisHelper = new THREE.AxisHelper(20)

        })
        .catch(err => {
          console.error('failed to load threejs', err)
        })

      this.status = ACTIONS.STOP
      this.width = null
      this.height = null
      this.id = null

      this.scene = null
      this.camera = null
      this.renderer = null
      this.axisHelper = null
      
      
    }
    getPlane () {
      console.log('-----get-a-plane-----')
      var planeGeometry = new THREE.PlaneGeometry(60, 20)
      var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc })
      var plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
      plane.position.x = 15
      plane.position.y = 0
      plane.position.z = 0
      return plane
    }

    makeACube () {
      console.log('-----making-a-cube-----')
      var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
      var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
      var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

      // position the cube
      cube.position.x = -4
      cube.position.y = 3
      cube.position.z = 0

      return cube
    }

    makeASphere () {
      // create a sphere
      var sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
      var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true})
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

      // position the sphere
      sphere.position.x = 20
      sphere.position.y = 4
      sphere.position.z = 2

      return sphere
    }

    init () {
      return new Promise ((resolve, reject) => {
        this.scene.add(this.axisHelper)
        this.scene.add(this.getPlane())
        this.scene.add(this.makeACube())
        this.scene.add(this.makeASphere())

        this.camera.position.x = -30
        this.camera.position.y = 40
        this.camera.position.z = 30
        this.camera.lookAt(this.scene.position)
      
        document.getElementById(this.id).appendChild(this.renderer.domElement)

        this.renderer.render(this.scene, this.camera)

        resolve()
      })
    }
    start () {
      this.init().then(() => console.log('success'))
      console.log('---------------starting---------------')
      console.log(this)
    }
}

