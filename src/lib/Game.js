const sanityCheck = () => new Promise ((resolve, reject) => {
    console.log(window.THREE)
    resolve()
})

export class Game {
    constructor () {
        sanityCheck()
        console.log('here')
    }
    init () {

    }
}

