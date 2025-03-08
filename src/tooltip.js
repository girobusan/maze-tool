export function tooltip(className) {
  const TE = document.createElement("div");
  var isVisible = false;
  TE.style.visibility = "hidden";
  TE.style.position = "absolute";
  TE.style.top = "0px";
  TE.style.left = "0px";
  TE.style.transition = "opacity 0.2s";
  TE.style.pointerEvents = "none";
  TE.classList.add(className || "Tooltip");
  document.body.append(TE);

  function position(x, y) {
    const scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    let TEBB = TE.getBoundingClientRect();
    let topValue = scrollTop + y - TEBB.height - 12;
    if (topValue <= 0) {
      topValue = y + 12;
    }
    let Left = Math.max(x - TEBB.width / 2, 0);
    const trString = `translate(${Left}px, ${topValue}px)`;
    TE.style.transform = trString;
  }

  function follow(evt) {
    window.requestAnimationFrame(() => position(...evtCoords(evt)));
  }

  function evtCoords(evt) {
    const isTouch = !!evt.touches;
    return [
      isTouch ? evt.touches[0].screenX : evt.clientX, // может быть 0
      isTouch ? evt.touches[0].screenY : evt.clientY, // может быть 0
    ];
  }

  return {
    isVisible: isVisible,
    show: (htm, evt) => {
      isVisible = true;
      TE.innerHTML = htm;
      follow(evt);
      window.addEventListener("mousemove", follow);
      window.addEventListener("touchmove", follow);
      TE.style.display = "block";
      TE.style.opacity = 1;
      TE.style.visibility = "visible";
    },
    hide: () => {
      isVisible = false;
      window.removeEventListener("mousemove", follow);
      window.removeEventListener("touchmove", follow);
      TE.style.opacity = 0;
      window.setTimeout(() => (TE.style.display = "none"), 200);
    },
  };
}
