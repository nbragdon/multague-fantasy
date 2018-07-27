const uuidv4 = require('uuid/v4');

class GameObject {
    constructor() {
        this.id = uuidv4()
    }
}