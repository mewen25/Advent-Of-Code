export default function part1(data: string) {
  const notableCycles = [20, 60, 100, 140, 180, 220]
  const lines = data.split('\n').filter(line => line.length > 0);
  
  let currentSignal = 1;
  let cycle = 1;
  let cyclesLeft;
  let currentOp = "noop";

  let notableAdded = 0;
  
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
    cycle++;

    if(notableCycles.includes(cycle)) {
      notableAdded+= (currentSignal*cycle);
    }

    cyclesLeft--;
    if(cyclesLeft > 0) {
      const addValue = Number(currentOp.split(' ')[1]);
      currentSignal += addValue;
      startCycle(currentOp);
    }
  }

  return notableAdded;

}
