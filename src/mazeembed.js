//script to embed
//find script tag
//add iframe
//that's it
//must be DEFER
//
(() => {
  const tags = Array.from(
    document.querySelectorAll("script[data-mazeposition]"),
  );
  if (tags.length === 0) {
    console.log("no embeds");
    return;
  }
  tags.forEach((e) => {
    if (e.dataset.done) {
      return;
    }
    e.dataset.done == "true";
    const myframe = document.createElement("iframe");
    myframe.src =
      "https://girobusan.github.io/maze-tool/?" + e.dataset.mazeposition;
    e.insertBefore(myframe);
  });
})();
