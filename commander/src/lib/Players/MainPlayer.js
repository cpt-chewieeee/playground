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
    return player
  }
  makeACube () {
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x888888, wireframe: true })
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true

    return cube
  }
}
export default myClass