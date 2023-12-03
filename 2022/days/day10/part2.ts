export default function part2(data: string) {
  const notableCycles = [20, 60, 100, 140, 180, 220]
  const lines = data.split('\n').filter(line => line.length > 0);
  
  let currentSignal = 1;
  let cycle = 1;
  let cyclesLeft;
  let currentOp = "noop";

  let width = 40;
  let height = 6;

  let drawPos = [0,0]
  let rows: any[][] = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));

  console.log(rows.length, rows[0].length);
  
  for(let line of lines) {
    currentOp = line;
    if(line==="noop") cyclesLeft = 1;
    else cyclesLeft = 2;
    startCycle(currentOp);
  }

  function startCycle(line: string) {
    endCycle();
  } 


  function endCycle() {

    
    const col = Math.floor(cycle/(width-1));
    const row = cycle % width;
    drawPos = [col, row];
    if(!rows[col]) rows[col] = Array.from({ length: width }, () => 0);
    rows[col][cycle%width-1] = '#';
  
    cycle++;
    cyclesLeft--;

    if(cyclesLeft > 0) {
      const addValue = Number(currentOp.split(' ')[1]);
      currentSignal += addValue;
      startCycle(currentOp);
    }

    




    // if(cycle % width === 0) drawPos[0]++;
    // drawPos[1] = cycle % width;
  }


}
