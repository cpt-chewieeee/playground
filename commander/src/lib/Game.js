// import Config from './config'
import Demo from './Demo'
import Eagle from './src/eagle/EAGLE_2.OBJ'
var THREE = null

const sanityCheck = () => new Promise ((resolve, reject) => {
    THREE = window.THREE
    console.log(THREE)
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
          this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000)
          
          this.renderer = new THREE.WebGLRenderer()
        
          this.renderer.setClearColor(new THREE.Color(0xEEEEEE))
          this.renderer.setSize(width, height)
          this.renderer.shadowMapEnabled = true 
          
          this.axisHelper = new THREE.AxisHelper(20)

          this.clock = new THREE.Clock()
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
      
      this.clock = null

    }
    loadModel () {
      var manager = new THREE.LoadingManager();
      manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

      };
      
      return new Promise((resolve, reject) => {
        var loader = new THREE.OBJLoader(manager)
        loader.load(Eagle, function(object){
          object.position.y = 95
          object.position.x = 90
          object.position.z = 90
          console.log('what is object', object)
          resolve(object)
        }, function(xhr) {
          var percentageComplete = xhr.loaded / xhr.total * 100
          console.log(Math.round(percentageComplete, 2) + `% downloaded`)
        }, function(xhr) {
          reject(xhr)
        })
      })
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
        this.loadModel().then(object => {
          this.scene.add(object)
        }).catch(err => {
          console.error('error', err)
        })
        // this.camera.position.x = -30
        // this.camera.position.y = 30


        this.camera.position.z = 250
        this.camera.lookAt(this.scene.position)
      
        // this.scene.add(this.makeAmbientLight())
        // this.scene.add(this.makeSpotLight())

        document.getElementById(this.id).appendChild(this.renderer.domElement)

        this.renderer.render(this.scene, this.camera)

        resolve()
      })
    }
    start () {
      return this.init().then(() => {
        console.log('success')
        return
      })
    }
}

