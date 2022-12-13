export default function part1(data: string) {
  const lines = data.split('\n');
  const visited = new Map();
  const headVisits = new Map();
  let headPos = [0, 0];
  let tailPos = [0, 0];
  visited.set(tailPos.join(','), true);

  const dirs = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  }

  function moveHead(_headDest) {
    headPos = _headDest;
    headVisits.set(headPos.join(','), true);
  }

  function moveTail(_headDest) {
    if(Math.abs(_headDest[0] - tailPos[0]) > 1 || Math.abs(_headDest[1] - tailPos[1]) > 1) {
      tailPos[0] += Math.sign(_headDest[0] - tailPos[0]);
      tailPos[1] += Math.sign(_headDest[1] - tailPos[1]);
    }
  }

  for(let line of lines) {
    const [dir, ...steps] = line.split('');
    const stepCount = Number(steps.join(''));
    const headDir = dirs[dir];
    for(let i = 0; i < stepCount; i++) {
      const headDest = [headPos[0] + headDir[0], headPos[1] + headDir[1]];
      moveHead(headDest)
      moveTail(headDest)
      visited.set(tailPos.join(','), true);
    }
  }
  return visited.size
}
