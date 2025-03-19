export default function makeArt(fillChar) {
  const art = [];
  const funct = {
    add: function(x, y, l) {
      art.push({ x: x, y: y, l: l });
      return funct;
    },
    fillRect: function(x_in, y_in, w, h, l) {
      for (let x = x_in; x < x_in + w; x++) {
        for (let y = y_in; y < y_in + h; y++) {
          art.push({ x: x_in, y: y, l: l });
        }
      }
      return funct;
    },
    toString: function() {
      // art.forEach((e) => console.log(e, e.x, e.y, e.l));
      const xmax = art.reduce((a, e) => {
        return e.x > a ? e.x : a;
      }, 0);
      const ymax = art.reduce((a, e) => {
        return e.y > a ? e.y : a;
      }, 0);
      const artDict = art.reduce((a, e) => {
        if (!a[e.x]) {
          a[e.x] = {};
        }
        a[e.x][e.y] = e.l;
        return a;
      }, {});
      let str = "";
      for (let y = 0; y <= ymax; y++) {
        for (let x = 0; x <= xmax; x++) {
          str += artDict[x]
            ? artDict[x][y]
              ? artDict[x][y]
              : fillChar || " "
            : fillChar || " ";
        }
        str += "\n";
      }
      // console.log(artDict);
      return str;
    },
  };

  return funct;
}
