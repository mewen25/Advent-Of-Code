const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
const isNumber = (n) => {
  return !isNaN(n) && n !== "e";
}

// 1011567  1749534 too low 1749534 32133056

// 43217457 too high

export default function part1(data: string) {
  let curDir ='';
  let history = [];
  const structure = {}
  const lines = data.replaceAll(/\$./g, '').replaceAll(/\n$/g, '').split('\n');

  const findDirContents = (dir, i) => {
    const contents = [];
    let line = lines[i];
    while(line && !line.startsWith('cd')) {
      contents.push(line);
      i++;
      line = lines[i];
    }
    return contents;
  }


  for(let i=0; i< lines.length; i++) {
    const line = lines[i];
    if(line.startsWith('cd')) {
      const dirName = line.split(' ')[1];

      if(dirName === '..') {
        let split = curDir.split('-');
        curDir = split.slice(0, -1).join("-");
        history.pop();
        // console.log("<-->", curDir, history);
        continue;
      }

      curDir += '-'+dirName;
      history.push(dirName);
      structure[curDir] = new Map();
      // console.log("CD: ->", dirName, history)
    }
    else if(line.startsWith('ls')) {
      const contents = findDirContents(curDir, i+1);
      contents.forEach(c => {
        if(isNumber(c[0])) {
          let [value, key] = c.split(' ');
          // console.log(">", key);
          if(structure[curDir].has('_'+key)) {
            console.error('file already exists', key);
          }
          structure[curDir].set('_'+key, Number(value));
        } else {
          const [_, dir] = c.split(' ');
          // console.log(">>", dir);
          if(structure[curDir].has(dir)) {
            console.error('dir already exists', dir);
          }
          structure[curDir].set(dir, 0);
        }
      })
    }
  }

  let cache = new Map();

  const getDirTotal = (dir) => {
    if(cache.get(dir)) return cache.get(dir);
    const keys = structure[dir]?.values()
    // console.log('keys', keys, dir);
    if(!keys) return 0;
    const contents = Array.from(keys);
    const sum = contents.reduce((acc, cur) => {
      if(cur[0] === '_') return acc + structure[dir].get(cur);
      else {
        // dir contents
        const value = getDirTotal(cur);
        // console.log('calc value', value, cur);
        cache.set(cur, value);
        return acc + value;
      }
    }, 0);
    return sum;
  }

  let total = 0;
  let challengeTotal = 0;

  let cacheValues = {}

  const searchDir = dir => {
    let sum = 0;
    for(let [key, value] of structure[dir]) {

      if(key.startsWith('_')) {
        sum += value;
        continue;
      }

      const newSum = cacheValues[dir+'-'+key] ?? searchDir(dir+'-'+key);
      if(newSum <= 100000) {
        challengeTotal += newSum;
        console.log("valid sum", dir, key, newSum, challengeTotal);
      }
      sum += newSum;
    }
    console.log("total", dir, sum);
    return sum;
  }

  const sum = searchDir("-/");
  console.log('full total', sum, challengeTotal);

  console.log(total);
  return total;
}
