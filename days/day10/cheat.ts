type Point = [number, number]

function pointEq(a: Point, b: Point): boolean {
    return a[0] === b[0] && a[1] === b[1]
}

function pointAdd(a: Point, b: Point): Point {
    return [a[0] + b[0], a[1] + b[1]]
}

function pointInBounds(grid: string[][], [x, y]: Point): boolean {
    return x >= 0 && y >= 0 && y < grid.length && x < grid[0].length
}

function getCell(grid: string[][], [x, y]: Point): string {
    return grid[y]?.[x] ?? ''
}

function parse(input: string): {
    grid: string[][]
    start: Point
} {
    let start: Point = [0, 0]
    const grid = input
        .trim()
        .split('\n')
        .map((line, y) => {
            const row = line.split('')
            for (let x = 0; x < row.length; x++) {
                if (row[x] === 'S') start = [x, y]
            }
            return row
        })
    return { grid, start }
}

function* traverse(
    grid: string[][],
    start: Point,
    prev: Point = [-1, -1],
): Generator<Point> {
    let loc = start as Point
    do {
        for (const next of connectingNeighbors(grid, loc)) {
            if (prev && pointEq(prev, next)) continue
            const cell = grid[next[1]][next[0]]
            if (cell !== '.') {
                yield next
                prev = loc
                loc = next
                break
            }
        }
    } while (!pointEq(loc, start))
}

const connectSouth = ['|', '7', 'F']
const connectNorth = ['|', 'J', 'L']
const connectWest = ['-', '7', 'J']
const connectEast = ['-', 'F', 'L']

// Yields north, east, south, west neighbors that are in bounds.
function* neighbors(grid: string[][], start: Point): Generator<Point> {
    for (const [dx, dy] of [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ] as Point[]) {
        const neighbor: Point = [start[0] + dx, start[1] + dy]
        if (pointInBounds(grid, neighbor)) {
            yield neighbor
        }
    }
}

// A more specialized `neighbors` iterator.
//
// Yields the in-bounds north, east, south, west neigbors that are a connecting pipe to
// the current cell.
function* connectingNeighbors(
    grid: string[][],
    start: Point,
): Generator<Point> {
    const north: Point = [0, -1]
    const south: Point = [0, 1]
    const west: Point = [-1, 0]
    const east: Point = [1, 0]
    const cell = getCell(grid, start)

    let deltas: Point[]
    switch (cell) {
        case '|':
            deltas = [north, south]
            break
        case '-':
            deltas = [west, east]
            break
        case 'L':
            deltas = [north, east]
            break
        case 'J':
            deltas = [north, west]
            break
        case '7':
            deltas = [south, west]
            break
        case 'F':
            deltas = [south, east]
            break
        default:
            throw new Error(`unexpected cell "${cell}" at ${start}`)
    }
    for (const [dx, dy] of deltas) {
        const neighbor: Point = [start[0] + dx, start[1] + dy]
        if (pointInBounds(grid, neighbor)) {
            yield neighbor
        }
    }
}

function renderCircuit(
    grid: string[][],
    circuit: Set<string> = new Set(),
    visited: Set<string> = new Set(),
) {
    let symbolMap: { [key: string]: string } = {
        F: '\u250F',
        J: '\u251B',
        L: '\u2517',
        '7': '\u2513',
        '|': '\u2503',
        '-': '\u2501',
        S: 'S',
    }
    for (let y = 0; y < grid.length; y++) {
        let line = ''
        for (let x = 0; x < grid[0].length; x++) {
            const point: Point = [x, y]
            const cell = getCell(grid, point)
            if (visited.has(point.toString())) {
                line += '*'
                continue
            }
            if (circuit.has(point.toString())) {
                if (!symbolMap[cell]) {
                    console.log(`circuit has point ${point} "${cell}"`)
                    process.exit()
                }
                line += symbolMap[cell] ?? '?'
            } else {
                line += cell
            }
        }
        console.log(line)
    }
}

//
function part1(input: string): number {
    const { grid, start } = parse(input)
    grid[start[1]][start[0]] = solveJunction(grid, start)!
    let steps = 0
    for (const _ of traverse(grid, start)) steps++
    return Math.floor(steps / 2)
}

const lookup3x3 = new Map([
    [
        '.',
        [
            ['.', '.', '.'],
            ['.', '.', '.'],
            ['.', '.', '.'],
        ],
    ],
    [
        '-',
        [
            ['.', '.', '.'],
            ['#', '#', '#'],
            ['.', '.', '.'],
        ],
    ],
    [
        '|',
        [
            ['.', '#', '.'],
            ['.', '#', '.'],
            ['.', '#', '.'],
        ],
    ],
    [
        'F',
        [
            ['.', '.', '.'],
            ['.', '#', '#'],
            ['.', '#', '.'],
        ],
    ],
    [
        'J',
        [
            ['.', '#', '.'],
            ['#', '#', '.'],
            ['.', '.', '.'],
        ],
    ],
    [
        '7',
        [
            ['.', '.', '.'],
            ['#', '#', '.'],
            ['.', '#', '.'],
        ],
    ],
    [
        'L',
        [
            ['.', '#', '.'],
            ['.', '#', '#'],
            ['.', '.', '.'],
        ],
    ],
])

// Expands each cell into a 3x3 block in a large grid so that
// we can write a flood fill algo that doesn't need to implement
// "squeeze through" adjacent pipe logic.
function expand(grid: string[][]): string[][] {
    const expanded = Array.from({ length: grid.length * 3 }, () =>
        Array.from({ length: grid[0].length * 3 }, () => 'x'),
    )
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const cell = getCell(grid, [x, y])
            // console.log({ x, y, cell })
            expanded[y * 3 + 0].splice(x * 3, 3, ...lookup3x3.get(cell)![0]) // top row
            expanded[y * 3 + 1].splice(x * 3, 3, ...lookup3x3.get(cell)![1]) // mid row
            expanded[y * 3 + 2].splice(x * 3, 3, ...lookup3x3.get(cell)![2]) // bot row
        }
    }
    return expanded
}

// Determine which junction to use for the "S" cell that completes the circuit
function solveJunction(grid: string[][], start: Point): string | null {
    const north = pointAdd(start, [0, -1])
    const south = pointAdd(start, [0, 1])
    const west = pointAdd(start, [-1, 0])
    const east = pointAdd(start, [1, 0])
    //
    // #S#
    //
    if (
        connectEast.includes(getCell(grid, west)) &&
        connectWest.includes(getCell(grid, east))
    )
        return '-'
    // #
    // S
    // #
    if (
        connectSouth.includes(getCell(grid, north)) &&
        connectNorth.includes(getCell(grid, south))
    )
        return '|'
    // S#
    // #
    if (
        connectWest.includes(getCell(grid, east)) &&
        connectNorth.includes(getCell(grid, south))
    )
        return 'F'
    // #S
    //  #
    if (
        connectEast.includes(getCell(grid, west)) &&
        connectNorth.includes(getCell(grid, south))
    )
        return '7'
    //  #
    // #S
    if (
        connectEast.includes(getCell(grid, west)) &&
        connectSouth.includes(getCell(grid, north))
    )
        return 'J'
    // #
    // S#
    if (
        connectWest.includes(getCell(grid, east)) &&
        connectSouth.includes(getCell(grid, north))
    )
        return 'L'
    if (
        connectEast.includes(getCell(grid, west)) &&
        connectSouth.includes(getCell(grid, north))
    )
        return 'J'
    return null
}

// Replace all contiguous "." with " "
function fill(grid: string[][], start: Point, visited: Set<string>) {
    const queue: Point[] = [start]
    while (queue.length > 0) {
        const point = queue.shift()!
        if (visited.has(point.toString())) continue
        if (getCell(grid, point) !== '.') continue

        grid[point[1]][point[0]] = ' '
        visited.add(point.toString())

        for (const neighbor of neighbors(grid, point)) {
            queue.push(neighbor)
        }
    }
}

function writeGrid(grid: string[][]) {
    const text = grid.map((line) => line.join('')).join('\n')
    writeFileSync('day10-grid.txt', text, { encoding: 'utf8' })
}

function part2(input: string): number {
    const { grid, start } = parse(input)
    const s = solveJunction(grid, start)!
    grid[start[1]][start[0]] = s

    // Follow circuit
    const circuit = new Set<string>()
    for (const point of traverse(grid, start)) {
        circuit.add(point.toString())
    }

    // Filter grid to just circuit pipes
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (!circuit.has([x, y].toString())) grid[y][x] = '.'
        }
    }

    // Blow up grid to 3x3-sized cells to trivialize flood fill
    const expanded = expand(grid)

    // Starting from outside the circuit at (0, 0) and fill all
    // "." cells with " " (only the enclosed cells will remain ".")
    const visited = new Set<string>()
    fill(expanded, [0, 0], visited)

    // Now count the 3x3 blocks of "."
    let count = 0
    for (let y = 0; y < expanded.length; y += 3) {
        for (let x = 0; x < expanded[0].length; x += 3) {
            if (
                // top row
                expanded[y][x + 0] === '.' &&
                expanded[y][x + 1] === '.' &&
                expanded[y][x + 2] === '.' &&
                // mid row
                expanded[y + 1][x + 0] === '.' &&
                expanded[y + 1][x + 1] === '.' &&
                expanded[y + 1][x + 2] === '.' &&
                // bot row
                expanded[y + 2][x + 0] === '.' &&
                expanded[y + 2][x + 1] === '.' &&
                expanded[y + 2][x + 2] === '.'
            ) {
                count++
            }
        }
    }

    return count
}

// const input = `.....\n.S-7.\n.|.|.\n.L-J.\n.....`
// const input = `..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...`
// const input = `...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........`

// const input = `.F----7F7F7F7F-7....
// .|F--7||||||||FJ....
// .||.FJ||||||||L7....
// FJL7L7LJLJ||LJ.L-7..
// L--J.L7...LJS7F-7L7.
// ....F-J..F7FJ|L7L7L7
// ....L7.F7||L7|.L7L7|
// .....|FJLJ|FJ|F7|.LJ
// ....FJL-7.||.||||...
// ....L---J.LJ.LJLJ...`

// const input = `FF7FSF7F7F7F7F7F---7
// L|LJ||||||||||||F--J
// FL-7LJLJ||||||LJL-77
// F--JF--7||LJLJ7F7FJ-
// L---JF-JLJ.||-FJLJJ7
// |F|F-JF---7F7-L7L|7|
// |FFJF7L7F-JF7|JL---7
// 7-L-JL7||F7|L7F-7F7|
// L.L7LFJ|||||FJL7||LJ
// L7JLJL-JLJLJL--JLJ.L`

const input = await Deno.readTextFile("./input/10/input.txt")

// console.log('part 1:', part1(input))
console.log('part 2:', part2(input))