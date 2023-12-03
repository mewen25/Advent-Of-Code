export default function part1(data: string) {
  let currentElf = 0;
  let highestElf = 0;

  const split = data.split("\r\n");

  split.forEach(_value => {
    if(_value == "") {
      if(currentElf > highestElf) highestElf = currentElf
      currentElf = 0
    } else currentElf += parseInt(_value)
  })
  return highestElf;
}
