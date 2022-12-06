export const solution = 1566;

export default function part1(data: string) {
  let result;
  const uniques = 4;
  check: for(let i=0; i< data.length; i++) {
    const slice = [];
    for(let j=0; j< uniques; j++) {
      if(slice.includes(data[i+j])) continue check;
      slice.push(data[i+j]);
    }
    result = i+uniques;
    break;
  }
  return result
}
