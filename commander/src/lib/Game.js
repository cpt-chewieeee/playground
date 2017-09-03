var THREE = null
var STATS = null
var PointerLockControls = null
var CANNON = null
const sanityCheck = () => new Promise ((resolve, reject) => {
    THREE = window.THREE
    STATS = window.STATS
    CANNON = window.CANNON
    PointerLockControls = window.PointerLockControls
    window.THREE !== undefined ? resolve() : reject(new Error('Cannot find threejs'))
})

export class Game {
    constructor ( { width, height }, idName) {
      sanityCheck()
        .then(() => {
          console.log('-----sanity-check-success-----')
          this.width = width
          this.height = height
          this.id = idName
        })
        .catch(err => {
          console.error('failed to load threejs', err)
        })

      this.width = null
      this.height = null
      this.id = null

      this.world = null
      this.physicsMaterial = null
      this.mainPlayerShape = null
      this.mainPlayerBody = null
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
    initCannon() {
      this.world = new CANNON.World()
      this.world.quatNormalizeSkip = 0
      this.world.quatNormalizeFast = false

      var solver = new CANNON.GSSolver()

      this.world.defaultContactMaterial.contactEquationStiffness = 1e9
      this.world.defaultContactMaterial.contactEquationRelaxation = 4

      solver.iterations = 7
      solver.tolerance = 0.1
      
      this.world.solver = new CANNON.SplitSolver(solver)

      this.world.gravity.set(0, -9.8, 0)
      this.world.broadphase = new CANNON.NaiveBroadphase()

      this.physicsMaterial = new CANNON.Material('slipperyMaterial')
      var physicContactMaterial = new CANNON.ContactMaterial(
        this.physicsMaterial,
        this.physicsMaterial,
        0.0,
        0.3
      )
      this.world.addContactMaterial(physicContactMaterial)

      // create a sphere
      var mass = 5, radius = 1.3
      // herer
    }
    init () {
      return new Promise ((resolve, reject) => {
        this.stats = this.initStats() 
        this.clock = new THREE.Clock()
        
        this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 0.1, 1000 )
        // this.camera.position.z = 60 // 0 for first-person | 60 for third-person 

        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog( 0x000000, 0, 500 )


        this.renderer = new THREE.WebGLRenderer()
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.soft = true
        this.renderer.setClearColor( 0xf0f0f0 )
        this.renderer.setSize(this.width, this.height)
        this.renderer.shadowMap.enabled = true 


        document.getElementById(this.id).appendChild(this.renderer.domElement)

        resolve()
      })
    }
    start () {
      return this.init().then(() => {
       
        return
      }).then(() => {
        const dt = 1/60
        const render = () => {
          this.stats.update()
          
          requestAnimationFrame(render)
          this.renderer.render(this.scene, this.camera)
        }
        render()
      })
    }

    // todo add this in...
    handleResize (width, height) {
      this.width = width
      this.height = height
      this.camera.aspect = width / height
      this.renderer.setSize(width, height)
    }
}

