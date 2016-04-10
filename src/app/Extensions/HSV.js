define(function() {
  THREE.Color.prototype.getHSV = function() {
    var rr, gg, bb,
        h, s,
        r = this.r,
        g = this.g,
        b = this.b,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c)
        {
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = (1 / 3) + rr - bb;
        } else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: h,
        s: s,
        v: v
    };
  };
});
