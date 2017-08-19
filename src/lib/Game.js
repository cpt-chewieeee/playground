import Demo from './Demo'

console.log(Demo)
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
          console.log('-----sanity-check-----')
          this.width = width
          this.height = height
          this.id = idName
          this.status = ACTIONS.START
          
          this.scene = new THREE.Scene()
          this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
          
          this.renderer = new THREE.WebGLRenderer()
        
          this.renderer.setClearColor(new THREE.Color(0xEEEEEE))
          this.renderer.setSize(width, height)
          this.renderer.shadowMapEnabled = true 
          
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
    

    

    

    
    
    init () {
      return new Promise ((resolve, reject) => {
        this.scene.add(this.axisHelper)
        // this.scene.add(this.getPlane())
        // this.scene.add(this.makeACube())
        // this.scene.add(this.makeASphere())

        Object.keys(Demo).forEach(key => {
          this.scene.add(Demo[key]())
        })

        this.camera.position.x = -30
        this.camera.position.y = 40
        this.camera.position.z = 30
        this.camera.lookAt(this.scene.position)
      
        // this.scene.add(this.makeAmbientLight())
        // this.scene.add(this.makeSpotLight())

        document.getElementById(this.id).appendChild(this.renderer.domElement)

        this.renderer.render(this.scene, this.camera)

        resolve()
      })
    }
    start () {
      this.init().then(() => console.log('success'))
    }
}

