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
    constructor ( {width, height }, idName) {
        sanityCheck()
        .then(() => {
                console.log('Check[1] complete')
                this.width = width
                this.height = height
                this.id = idName
                this.status = ACTIONS.START

                this.scene = new THREE.Scene()
                this.camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000)
                this.renderer = new THREE.WebGLRenderer()

            }
        )
        .catch(err => {
            console.error('failed to load threejs', err)
        })
        this.status = ACTIONS.STOP
        this.width = null
        this.height = null
        this.id = null

        this.scene = null
        
    }
    init () {
        console.log(this.width, this.height, this.idName)
    }
}

