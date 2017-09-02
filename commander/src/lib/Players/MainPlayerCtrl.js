import MainPlayer from './Players'

// this class should be able to extends any THREE object
const playerWithCtrl = class PlayerWithCtrl extends MainPlayer {
  constructor(battle_id, playerInfo, type, controlSettings = {}) {
    super(battle_id, playerInfo, type)
    this.addListeners(controlSettings)
    return this
  }
}
export default playerWithCtrl