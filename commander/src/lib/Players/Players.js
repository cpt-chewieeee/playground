const THREE = window.THREE
const myClass = class MainPlayer {
  constructor (battle_id, playerInfo = {}, type = 'DEFAULT_PLAYER') {
    console.log('-----adding-main-player-----')
    // connect to world here?
    var player = this.makeACube()
    player.battle_id = battle_id // id is already taken by cube
    player.playerInfo = playerInfo // names and etc... 
    player.type = type
    player.health = 100
    player.addListeners = this.addListeners

    player.movements = {
      forward: false,
      backward: false,
      right: false,
      left: false,
      canJump: false,
      velocity: new THREE.Vector3()
    }
    return player
  }
  makeACube () {
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, wireframe: true })
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true

    return cube
  }
  addListeners (settings) {
    document.addEventListener('keydown', e => {
      switch(e.keyCode) {
        case 87: // w
          this.movements.forward = true
          break
        case 65: // a
          this.movements.left = true
          break
        case 68: // d
          this.movements.right = true
          break
        case 83: // s
          this.movements.backward = true
          break
        case 32: // space
          if (this.movements.canJump) {
            this.movements.velocity.y += 350
          }
          this.movements.canJump = false
          e.preventDefault()
          break
        default:
      }
    }, false)
    document.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case 87: // w
          this.movements.forward = false
          break
        case 65: // a
          this.movements.left = false
          break
        case 68: // d
          this.movements.right = false
          break
        case 83: // s
          this.movements.backward = false
          break
        default:
      }
    }, false)
  }
}
export default myClass