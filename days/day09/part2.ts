export default function part2(data: string) {
  const lines = data.split('\n');
  const visited = new Map();
  const headVisits = new Map();
  let headPos = [0, 0];
  let tails = Array.from({ length: 9 }, () => [0, 0]);
  visited.set(tails.at(-1).join(','), true);
  console.log(tails);

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

  function moveTails(_headDest, tailIdx) {
    let tailPos = tails.at(tailIdx);
    if(Math.abs(_headDest[0] - tailPos[0]) > 1 || Math.abs(_headDest[1] - tailPos[1]) > 1) {
      tailPos[0] += Math.sign(_headDest[0] - tailPos[0]);
      tailPos[1] += Math.sign(_headDest[1] - tailPos[1]);
    }
    tails[tailIdx] = tailPos;
  }

  for(let line of lines) {
    const [dir, ...steps] = line.split('');
    const stepCount = Number(steps.join(''));
    const headDir = dirs[dir];
    for(let i = 0; i < stepCount; i++) {
      const headDest = [headPos[0] + headDir[0], headPos[1] + headDir[1]];
      moveHead(headDest)
      for(let idx in tails) {
        const tailHead = tails[Number(idx)-1] ?? headPos;
        moveTails(tailHead, idx);
      }
      visited.set(tails.at(-1).join(','), true);
    }
  }
  console.log(visited.size);
}
