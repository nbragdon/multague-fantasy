import {GameObject} from './gameobject';

class Controller extends GameObject {
    constructor() {
        super();
        this.turn = 0;
        this.characters = [];
    }

    addCharacter(character) {
        this.characters.push(character);
    }
}