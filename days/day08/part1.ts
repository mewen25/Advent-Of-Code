
export default function part1(data: string) {
  const lines = data.split('\n').filter(l => l.length > 0);
  let grid = [];
  for(let line of lines) {
    grid.push([...line.split('').map(Number)])
  }
  let edges = 0
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let visibleTrees = 0;

  console.log(grid);
  const gridWidth = grid[0].length;
  console.log(gridWidth, grid[0].length)
  // return;
  
  const edge = (n) => n % (gridWidth-1) === 0;

  for(let x=0; x< gridWidth; x++) {
    next: for(let y=0; y< gridWidth; y++) {
      const thisTree = grid[x][y];
      if(edge(x) || edge(y)) {
        edges++;
        visibleTrees++;
        continue next;
      }
      if(thisTree === 0) continue next;

      for(let dir of directions) {
        const [xDir, yDir] = dir;
        for(let m=1; m< gridWidth; m++) {
          const targetX = x+(xDir*m);
          const targetY = y+(yDir*m);
          let targetTree = grid[targetX]?.[targetY];
          if((!targetTree && targetTree !== 0) || targetTree >= thisTree) {
            // console.error(`failed to find route for [${x},${y} - ${thisTree}] in direction: [${dir}] by ${m}, ${targetTree} ${targetTree >= thisTree}`)
            break;
          }
          if(edge(targetX) || edge(targetY)) {
            // console.log('reached end, is visible', `[${x},${y} - ${thisTree}] can go in direction ${dir} by x${m} to [${x+xDir*m},${y+yDir*m}] - value: ${targetTree}}`)
            visibleTrees++;
            continue next;
          }
        }
      }
    }
  }
  // console.log(edges, visibleTrees)
  return visibleTrees;
}
 