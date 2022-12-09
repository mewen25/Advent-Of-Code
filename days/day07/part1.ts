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

  // for(let dir in structure) {
  //   // if(dir !== "-/") break; 
  //   // console.log(structure[dir])
  //   const sum = getDirTotal(dir);
  //   console.log('sum', dir, structure[dir]);
  //   if(sum == 100000) {
  //     console.log('exact', sum, dir)
  //   }
  //   if(sum <= 100000) total += sum;
  // }

  let total = 0;
  let challengeTotal = 0;

  let cacheValues = {

  }

  const searchDir = dir => {
    let sum = 0;
    console.log("Searching", dir)
    for(let [key, value] of structure[dir]) {
      // console.log('> ', key, value, dir);
      if(key.startsWith('_')) sum += value;
      else {
        if(cacheValues[dir+'-'+key]) {
          // console.log('cached', dir+'-'+key, cacheValues[dir+'-'+key]);
          sum += cacheValues[dir+'-'+key];
          if(sum <= 100000) {
            challengeTotal += cacheValues[dir+'-'+key];
          }
          continue;
        }
        const subSum = searchDir(dir+'-'+key);
        console.log('subsum', subSum, dir);
        cacheValues[dir+'-'+key] = subSum;
        if(sum > 100000) {
          // console.log("too much", sum, dir);
        }
        else challengeTotal += subSum;
        sum += subSum;
      }
    }
    console.log("total", dir, sum);
    return sum;
  }


  // const rootFolders = Object.keys(structure).filter(k => k.split('-').length == 3);
  // searchDir(rootFolders[0])
  // rootFolders.forEach(r => {
    const sum = searchDir("-/");
    console.log('full total', sum, challengeTotal);
    console.log(structure);
  // })

  console.log(total);
  return total;



  // console.log(lines);

  // const findDir = (startIndex, end=false) => {
    

  // }

  

  // for(let i=0; i< lines.length; i++) {
  //   const line = lines[i];
  //   if(!line || !line[0]) {
  //     console.log("empty line");
  //     break;
  //   }
  //   console.log('>', line, i);

  //   const isLocation = line.startsWith('cd');
  //   if(isLocation && lines[i+1] === 'ls') {
  //     console.log("a location", line)
  //     const dirName = line.split(' ')[1];
  //     // if(!structure.get(dirName)) structure.set(dirName, []);
  //     if(!structure[dirName]) structure[dirName] = new Map();
  //     i+=2;
  //     do {
  //       const below = lines[i];
  //       if(!below) break;
  //       if(below.startsWith("cd")) {
  //         i--;
  //         break;
  //       }
  //       if(below.startsWith('dir')) structure[dirName].set(below.split(' ')[1], 0);
  //       else if(isNumber(below[0])) {
  //         console.log("file found", below);
  //         const [value, key] = below.split(' ');
  //         // characters until a dot
  //         const fileKey = '_'+key.split('.')[0];
  //         structure[dirName].set(fileKey, Number(value));
  //       }
  //       i++;
  //     } while(true);
  //     console.log(i, structure[dirName].size);
  //     // console.log('found dir', dirName, structure[dirName], i);
  //   }
  //   else {
  //     // console.log('not a file', line)
  //   }
  // }

  // let cacheValues = {};

  // const getSumOfFolder = (dir, its=0) => {
  //   // if(!structure[dir]) return 0;
  //   let contents = Array.from(structure[dir].keys());
  //   // contents = removeDuplicates(contents);
  //   // console.log("checking folder", dir, cacheValues[dir], its);
  //   // if(its > 100) {
  //   //   console.log('broke', dir, its, structure[dir], contents)
  //   //   // return null;
  //   // }
  //   const sum = cacheValues[dir] ?? contents.reduce((acc, cur) => {
  //     if(cur[0] !== '_') return acc + getSumOfFolder(cur, its++);
  //     const value = structure[dir].get(cur);
  //     console.log('value', value, cur, acc);
  //     return acc + value;
  //   }, 0);
  //   if(!cacheValues[dir]) cacheValues[dir] = sum;
  //   console.log('dir', dir, sum, contents)
  //   return sum;
  // }

  // let it = 0;
  // for(let dir in structure) {
  //   if(it > 20) break;
  //   console.log("check", dir, structure[dir])
  //   let sum = 0;
  //   if(dir[0] === '_') sum = structure[dir]; 
  //   const sum = getSumOfFolder(dir);
  //   if(sum === null) {
  //     console.log("break", dir)
  //     break;
  //   }
  //   if(sum < 100000) valids.push(sum);
  //   it++;
  // }

  // // console.log(structure, valids, valids.reduce((acc, cur) => acc + cur), 0);


}
