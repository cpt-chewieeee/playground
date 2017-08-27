import MainPlayer from './Players/MainPlayer'
import {
  renderSpotLight,
  renderAmbientLight,
  helper,
  axisHelper
} from './Misc'
import Plane from './Plane'
var THREE = null
var STATS = null
const sanityCheck = () => new Promise ((resolve, reject) => {
    THREE = window.THREE
    STATS = window.STATS
    window.THREE !== undefined ? resolve() : reject(new Error('Cannot find threejs'))
})

export class Game {
    constructor ( { width, height }, idName) {
      sanityCheck()
        .then(() => {
          console.log('-----sanity-check-----')
          this.width = width
          this.height = height
          this.id = idName
                  
          this.scene = new THREE.Scene()
          this.scene.fog = new THREE.Fog( 0xffffff, 2000, 10000 )
         
          this.camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000)
 
          this.renderer = new THREE.WebGLRenderer()
        
          this.renderer.setClearColor( 0xf0f0f0 )
          this.renderer.setSize(width, height)
          this.renderer.shadowMap.enabled = true 
          
          this.axisHelper = new THREE.AxisHelper(20)
          
          this.stats = this.initStats() 
          
          this.playerVelocity = new THREE.Vector3()
          this.clock = new THREE.Clock()
        })
        .catch(err => {
          console.error('failed to load threejs', err)
        })

      this.width = null
      this.height = null
      this.id = null

      this.scene = null
      this.camera = null
      this.renderer = null
      
      this.mainPlayer = null
      
      this.controlsEnabled = false
      
      this.playerControl = null
      
      this.playerVelocity = null
      this.moveForward = false
      this.moveLeft = false
      this.moveBackward = false
      this.moveRight = false
      this.canJump = false

      this.clock = null
      this.spotLight = null
    }
    initStats () {
      var stats = new STATS()
      stats.setMode(0)
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';
      document.getElementById("stats-output").appendChild(stats.domElement);
      return stats
    }
    init () {
      return new Promise ((resolve, reject) => {
        this.scene.add(renderAmbientLight())
        this.spotLight = renderSpotLight()
        this.scene.add(helper())
        this.scene.add(axisHelper())
        this.scene.add(Plane())

        
        this.camera.position.x = 0
        this.camera.position.y = 0
        this.camera.position.z = 0

        this.mainPlayer = new MainPlayer(1, { name: 'me' }, 'BIG_BROTHER')
        console.log('what is my main =', this.mainPlayer)
        this.playerControl = new THREE.PointerLockControls(this.camera, this.renderer.domElement)
        this.scene.add(this.playerControl.getObject())

        this.scene.add(this.mainPlayer) // add player last
        
        document.addEventListener('keydown', e => {
          switch(e.keyCode) {
            case 87: // w
              this.moveForward = true
              break
            case 65: // a
              this.moveLeft = true
              break
            case 68: //d
              this.moveRight = true
              break
            case 83: //s
              this.moveBackward = true
              break
            case 32: // space
              if (this.canJump === true) {
                this.playerVelocity.y += 350
              }
              this.canJump = false
              e.preventDefault()
              break
            default:
          }
        }, false)
        document.addEventListener('keyup', e => {
          switch(e.keyCode) {
            case 87: //w
              this.moveForward = false
              break
            case 65: //a
              this.moveLeft = false
              break
            case 68: //d
              this.moveRight = false
              break
            case 83: //s
              this.moveBackward = false
              break
            default:
          }
        }, false)

        document.getElementById(this.id).appendChild(this.renderer.domElement)

        this.renderer.render(this.scene, this.camera)

        resolve()
      })
    }
    start () {
  
      return this.init().then(() => {
        var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
        if (havePointerLock) {
          console.log('-----i-have-pointer-lock-----')
          var element = document.body
          // Ask the browser to lock the pointer
					element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					element.requestPointerLock();
          var pointerLockChange = e => {
            if(document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
              this.controlsEnabled = true
              this.playerControl.enabled = true
              console.log('=====enable=control=====')
            } else {
              this.playerControl.enabled = false
              this.controlsEnabled = false
              console.log('=====disable=control=====')
            }
          }
          var pointerLockError = event => {
            console.log('pointerLockError', event)
          }
          document.addEventListener( 'pointerlockchange', pointerLockChange, false );
          document.addEventListener( 'mozpointerlockchange', pointerLockChange, false );
          document.addEventListener( 'webkitpointerlockchange', pointerLockChange, false );

          document.addEventListener( 'pointerlockerror', pointerLockError, false );
          document.addEventListener( 'mozpointerlockerror', pointerLockError, false );
          document.addEventListener( 'webkitpointerlockerror', pointerLockError, false );
          document.getElementById(this.id).addEventListener('click', e => {
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
					  element.requestPointerLock();
          }, false)
        } else {
          console.log('-----i-dont-have-pointer-lock-----')
        }
        return
      }).then(() => {
        const render = () => {
          this.stats.update()
          if (this.controlsEnabled) {
            var delta = this.clock.getDelta()
            this.playerVelocity.x -= this.playerVelocity.x * 10 * delta
            this.playerVelocity.z -= this.playerVelocity.z * 10 * delta
            this.playerVelocity.y -= 9.8 * 100 * delta
            if ( this.moveForward ) this.playerVelocity.z -= 400.0 * delta;
            if ( this.moveBackward ) this.playerVelocity.z += 400.0 * delta;

            if ( this.moveLeft ) this.playerVelocity.x -= 400.0 * delta;
            if ( this.moveRight ) this.playerVelocity.x += 400.0 * delta;

            this.playerControl.getObject().translateX(this.playerVelocity.x * delta)
            this.playerControl.getObject().translateY(this.playerVelocity.y * delta)
            this.playerControl.getObject().translateZ(this.playerVelocity.z * delta)

            if(this.playerControl.getObject().position.y < 10) {
              this.playerVelocity.y = 0
              this.playerControl.getObject().position.y = 10
              this.canJump = true
            }
            this.mainPlayer.position.set(this.playerControl.getObject().position.x, this.playerControl.getObject().position.y, this.playerControl.getObject().position.z)
          }
          // const vect3 = new THREE.Vector3( this.main.position.x, this.main.position.y, this.main.position.z )
          // this.camera.lookAt(vect3)
          requestAnimationFrame(render)
          this.renderer.render(this.scene, this.camera)
        }
        render()
      })
    }
}

