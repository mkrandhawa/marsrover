class Plateau {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    isWithinBounds(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

class Rover {
    constructor(x, y, dirc, plateau) {
        this.x = x;
        this.y = y;
        this.dirc = dirc;
        this.plateau = plateau;
        this.directions = ['N', 'E', 'S', 'W']; 
    }

    rotateLeft() {
        let index = (this.directions.indexOf(this.dirc) + 3) % 4;
        this.dirc = this.directions[index];
    }

    rotateRight() {
        let index = (this.directions.indexOf(this.dirc) + 1) % 4;
        this.dirc = this.directions[index];
    }

    moveForward() {
        let moveMap = { 'N': [0, 1], 'S': [0, -1], 'E': [1, 0], 'W': [-1, 0] };
        let [dx, dy] = moveMap[this.dirc];
        let newX = this.x + dx, newY = this.y + dy;

        if (this.plateau.isWithinBounds(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    executeCommands(commands) {
        for (let c of commands) {
            if (c === 'L') this.rotateLeft();
            else if (c === 'R') this.rotateRight();
            else if (c === 'M') this.moveForward();
        }
    }

    getPosition() {
        return `${this.x} ${this.y} ${this.dirc}`;
    }
}

// Main function calling the classes
function processInput(inLine) {
    let [plateauWidth, plateauHeight] = inLine[0].split(" ").map(Number);
    let plateau = new Plateau(plateauWidth, plateauHeight);

    let results = [];
    for (let i = 1; i < inLine.length; i += 2) {
        let [x, y, dirc] = inLine[i].split(" ");
        let rover = new Rover(parseInt(x), parseInt(y), dirc, plateau);
        rover.executeCommands(inLine[i + 1]);
        results.push(rover.getPosition());
    }
    return results;
}

// Testing the code with the following input:
const inLine = [
    "5 5",
    "1 2 N",
    "LMLMLMLMM",
    "3 3 E",
    "MMRMMRMRRM"
];

console.log(processInput(inLine).join("\n"));
