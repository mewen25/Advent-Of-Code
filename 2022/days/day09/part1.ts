export default function part1(data: string) {
  const lines = data.split('\n');
  const visited = new Map();
  const headVisits = new Map();
  let headPos = [0, 0];
  let tailPos = [0, 0];
  let tailDir = [0, 0];

  const dirs = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  }

  const sameColOrRow = (pos1, pos2) => pos1[0] === pos2[0] || pos1[1] === pos2[1];
  const tailDist = (_headPos) => [_headPos[0] - tailPos[0], _headPos[1] - tailPos[1]];

  const moveTail = () => {
    const [x, y] = tailDir;
    tailPos = [tailPos[0]+x, tailPos[1]+y];
    console.log(`tail: moved to ${tailPos.join(',')}`)
    visited.set(tailPos.join(','), true);
  }

  const pointTail = () => {
    const [x, y] = tailPos;
    const [x2, y2] = headPos;
    tailDir = [x2-x, y2-y];
    console.log(`tail: pointed ${tailDir} from ${tailPos.join(',')}`)
  }

  let its=1;
  for(let line of lines) {
    const [dir, dist] = [dirs[line.split(' ')[0]], Number(line.split(' ')[1])];
    let tailPoint;
    const [x, y] = headPos;
    for(let i=1; i<dist; i++) {
      if(its%2==0) pointTail();
      else moveTail();
      headPos = [ x+dir[0]*i, y+dir[1]*i]
      headVisits.set(headPos.join(','), true);
      console.log(`head: ${dir} to ${headPos.join(',')}`)
      its++;
    }

  }

  let grid = [];
  for(let i=0;i<4;i++) {
    grid.push(new Array(6).fill(0))
  }
  for(let [k, v] of visited) {
    const [x, y] = k.split(',').map(Number);
    grid[y][x] = 1;
  }

  console.log(visited, visited.size)
  console.log(headVisits)
  console.log(grid)
}
