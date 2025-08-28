export function createMarkerElement(letter, id) {
    const wrap = document.createElement("div");
    wrap.id = `mk-${id}`;
    wrap.style.cursor = "pointer";
  
    const pin = document.createElement("div");
    pin.style.cssText =
      "position:relative;width:30px;height:30px;border-radius:50%;background:#102c5a;color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.25);";
    pin.textContent = letter;
  
    const tri = document.createElement("span");
    tri.style.cssText =
      "position:absolute;left:50%;transform:translateX(-50%);bottom:-7px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:9px solid #102c5a;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25));";
  
    pin.appendChild(tri);
    wrap.appendChild(pin);
    return wrap;
  }
  