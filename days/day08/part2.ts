export default function part2(data: string) {
  const lines = data.split('\n').filter(l => l.length > 0);
  let grid = [];
  for(let line of lines) {
    grid.push([...line.split('').map(Number)])
  }
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let highestScore = 0;
  const gridWidth = grid[0].length;
  const edge = (n) => n % (gridWidth-1) === 0;
  //120060

  for(let x=0; x< gridWidth; x++) {
    for(let y=0; y< gridWidth; y++) {
      const thisTree = grid[x][y];
      let scoreTotal = null;

      // if(thisTree === 0) continue next;

      if(edge(x) || edge(y)) {
        continue;
      }

      for(let dir of directions) {
        // console.log('checking dir', dir)

        let treesInDir = 0;
        const [xDir, yDir] = dir;

        for(let m=1; m< gridWidth; m++) {
          const targetX = x+(xDir*m);
          const targetY = y+(yDir*m);
          let targetTree = grid[targetY]?.[targetX];
          if(targetTree == undefined) {
            break;
          }
          if((targetTree >= thisTree)) {
            treesInDir++;
            break;
          }
          treesInDir++;
        }
        if(!scoreTotal) scoreTotal = treesInDir;
        else if(treesInDir > 0) scoreTotal *= treesInDir;
      }
      if(scoreTotal > highestScore) {
        console.log('new highest score', scoreTotal, x, y)
        highestScore = scoreTotal;
      }
    }
  }
  return highestScore;
}
