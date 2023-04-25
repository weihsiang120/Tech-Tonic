var y =
  "undefined" !== typeof globalThis
    ? globalThis
    : "undefined" !== typeof self
    ? self
    : global;
var b = {};
!(function (y, S) {
  b = S();
})(0, function () {
  return (() => {
    var b = {
        14: (b) => {
          var t = function () {
              ((this || y).Diff_Timeout = 1),
                ((this || y).Diff_EditCost = 4),
                ((this || y).Match_Threshold = 0.5),
                ((this || y).Match_Distance = 1e3),
                ((this || y).Patch_DeleteThreshold = 0.5),
                ((this || y).Patch_Margin = 4),
                ((this || y).Match_MaxBits = 32);
            },
            S = -1;
          (t.Diff = function (y, b) {
            return [y, b];
          }),
            (t.prototype.diff_main = function (b, S, L, H) {
              void 0 === H &&
                (H =
                  (this || y).Diff_Timeout <= 0
                    ? Number.MAX_VALUE
                    : new Date().getTime() + 1e3 * (this || y).Diff_Timeout);
              var D = H;
              if (null == b || null == S)
                throw new Error("Null input. (diff_main)");
              if (b == S) return b ? [new t.Diff(0, b)] : [];
              void 0 === L && (L = !0);
              var B = L,
                U = this.diff_commonPrefix(b, S),
                F = b.substring(0, U);
              (b = b.substring(U)),
                (S = S.substring(U)),
                (U = this.diff_commonSuffix(b, S));
              var Z = b.substring(b.length - U);
              (b = b.substring(0, b.length - U)),
                (S = S.substring(0, S.length - U));
              var ye = this.diff_compute_(b, S, B, D);
              return (
                F && ye.unshift(new t.Diff(0, F)),
                Z && ye.push(new t.Diff(0, Z)),
                this.diff_cleanupMerge(ye),
                ye
              );
            }),
            (t.prototype.diff_compute_ = function (y, b, L, H) {
              var D;
              if (!y) return [new t.Diff(1, b)];
              if (!b) return [new t.Diff(S, y)];
              var B = y.length > b.length ? y : b,
                U = y.length > b.length ? b : y,
                F = B.indexOf(U);
              if (-1 != F)
                return (
                  (D = [
                    new t.Diff(1, B.substring(0, F)),
                    new t.Diff(0, U),
                    new t.Diff(1, B.substring(F + U.length)),
                  ]),
                  y.length > b.length && (D[0][0] = D[2][0] = S),
                  D
                );
              if (1 == U.length) return [new t.Diff(S, y), new t.Diff(1, b)];
              var Z = this.diff_halfMatch_(y, b);
              if (Z) {
                var ye = Z[0],
                  we = Z[1],
                  Dt = Z[2],
                  Ot = Z[3],
                  jt = Z[4],
                  Rt = this.diff_main(ye, Dt, L, H),
                  Pt = this.diff_main(we, Ot, L, H);
                return Rt.concat([new t.Diff(0, jt)], Pt);
              }
              return L && y.length > 100 && b.length > 100
                ? this.diff_lineMode_(y, b, H)
                : this.diff_bisect_(y, b, H);
            }),
            (t.prototype.diff_lineMode_ = function (y, b, L) {
              var H = this.diff_linesToChars_(y, b);
              (y = H.chars1), (b = H.chars2);
              var D = H.lineArray,
                B = this.diff_main(y, b, !1, L);
              this.diff_charsToLines_(B, D),
                this.diff_cleanupSemantic(B),
                B.push(new t.Diff(0, ""));
              for (var U = 0, F = 0, Z = 0, ye = "", we = ""; U < B.length; ) {
                switch (B[U][0]) {
                  case 1:
                    Z++, (we += B[U][1]);
                    break;
                  case S:
                    F++, (ye += B[U][1]);
                    break;
                  case 0:
                    if (F >= 1 && Z >= 1) {
                      B.splice(U - F - Z, F + Z), (U = U - F - Z);
                      for (
                        var Dt = this.diff_main(ye, we, !1, L),
                          Ot = Dt.length - 1;
                        Ot >= 0;
                        Ot--
                      )
                        B.splice(U, 0, Dt[Ot]);
                      U += Dt.length;
                    }
                    (Z = 0), (F = 0), (ye = ""), (we = "");
                }
                U++;
              }
              return B.pop(), B;
            }),
            (t.prototype.diff_bisect_ = function (y, b, L) {
              for (
                var H = y.length,
                  D = b.length,
                  B = Math.ceil((H + D) / 2),
                  U = B,
                  F = 2 * B,
                  Z = new Array(F),
                  ye = new Array(F),
                  we = 0;
                we < F;
                we++
              )
                (Z[we] = -1), (ye[we] = -1);
              (Z[U + 1] = 0), (ye[U + 1] = 0);
              for (
                var Dt = H - D,
                  Ot = Dt % 2 != 0,
                  jt = 0,
                  Rt = 0,
                  Pt = 0,
                  qt = 0,
                  Bt = 0;
                Bt < B && !(new Date().getTime() > L);
                Bt++
              ) {
                for (var Vt = -Bt + jt; Vt <= Bt - Rt; Vt += 2) {
                  for (
                    var Ut = U + Vt,
                      Wt =
                        (Xt =
                          Vt == -Bt || (Vt != Bt && Z[Ut - 1] < Z[Ut + 1])
                            ? Z[Ut + 1]
                            : Z[Ut - 1] + 1) - Vt;
                    Xt < H && Wt < D && y.charAt(Xt) == b.charAt(Wt);

                  )
                    Xt++, Wt++;
                  if (((Z[Ut] = Xt), Xt > H)) Rt += 2;
                  else if (Wt > D) jt += 2;
                  else if (
                    Ot &&
                    (Zt = U + Dt - Vt) >= 0 &&
                    Zt < F &&
                    -1 != ye[Zt] &&
                    Xt >= (Gt = H - ye[Zt])
                  )
                    return this.diff_bisectSplit_(y, b, Xt, Wt, L);
                }
                for (var Kt = -Bt + Pt; Kt <= Bt - qt; Kt += 2) {
                  for (
                    var Gt,
                      Zt = U + Kt,
                      Jt =
                        (Gt =
                          Kt == -Bt || (Kt != Bt && ye[Zt - 1] < ye[Zt + 1])
                            ? ye[Zt + 1]
                            : ye[Zt - 1] + 1) - Kt;
                    Gt < H &&
                    Jt < D &&
                    y.charAt(H - Gt - 1) == b.charAt(D - Jt - 1);

                  )
                    Gt++, Jt++;
                  if (((ye[Zt] = Gt), Gt > H)) qt += 2;
                  else if (Jt > D) Pt += 2;
                  else if (
                    !Ot &&
                    (Ut = U + Dt - Kt) >= 0 &&
                    Ut < F &&
                    -1 != Z[Ut]
                  ) {
                    var Xt;
                    Wt = U + (Xt = Z[Ut]) - Ut;
                    if (Xt >= (Gt = H - Gt))
                      return this.diff_bisectSplit_(y, b, Xt, Wt, L);
                  }
                }
              }
              return [new t.Diff(S, y), new t.Diff(1, b)];
            }),
            (t.prototype.diff_bisectSplit_ = function (y, b, S, L, H) {
              var D = y.substring(0, S),
                B = b.substring(0, L),
                U = y.substring(S),
                F = b.substring(L),
                Z = this.diff_main(D, B, !1, H),
                ye = this.diff_main(U, F, !1, H);
              return Z.concat(ye);
            }),
            (t.prototype.diff_linesToChars_ = function (y, b) {
              var S = [],
                L = {};
              function i(y) {
                for (
                  var b = "", D = 0, B = -1, U = S.length;
                  B < y.length - 1;

                ) {
                  -1 == (B = y.indexOf("\n", D)) && (B = y.length - 1);
                  var F = y.substring(D, B + 1);
                  (L.hasOwnProperty ? L.hasOwnProperty(F) : void 0 !== L[F])
                    ? (b += String.fromCharCode(L[F]))
                    : (U == H && ((F = y.substring(D)), (B = y.length)),
                      (b += String.fromCharCode(U)),
                      (L[F] = U),
                      (S[U++] = F)),
                    (D = B + 1);
                }
                return b;
              }
              S[0] = "";
              var H = 4e4,
                D = i(y);
              return (H = 65535), { chars1: D, chars2: i(b), lineArray: S };
            }),
            (t.prototype.diff_charsToLines_ = function (y, b) {
              for (var S = 0; S < y.length; S++) {
                for (var L = y[S][1], H = [], D = 0; D < L.length; D++)
                  H[D] = b[L.charCodeAt(D)];
                y[S][1] = H.join("");
              }
            }),
            (t.prototype.diff_commonPrefix = function (y, b) {
              if (!y || !b || y.charAt(0) != b.charAt(0)) return 0;
              for (
                var S = 0, L = Math.min(y.length, b.length), H = L, D = 0;
                S < H;

              )
                y.substring(D, H) == b.substring(D, H) ? (D = S = H) : (L = H),
                  (H = Math.floor((L - S) / 2 + S));
              return H;
            }),
            (t.prototype.diff_commonSuffix = function (y, b) {
              if (!y || !b || y.charAt(y.length - 1) != b.charAt(b.length - 1))
                return 0;
              for (
                var S = 0, L = Math.min(y.length, b.length), H = L, D = 0;
                S < H;

              )
                y.substring(y.length - H, y.length - D) ==
                b.substring(b.length - H, b.length - D)
                  ? (D = S = H)
                  : (L = H),
                  (H = Math.floor((L - S) / 2 + S));
              return H;
            }),
            (t.prototype.diff_commonOverlap_ = function (y, b) {
              var S = y.length,
                L = b.length;
              if (0 == S || 0 == L) return 0;
              S > L
                ? (y = y.substring(S - L))
                : S < L && (b = b.substring(0, S));
              var H = Math.min(S, L);
              if (y == b) return H;
              for (var D = 0, B = 1; ; ) {
                var U = y.substring(H - B),
                  F = b.indexOf(U);
                if (-1 == F) return D;
                (B += F),
                  (0 != F && y.substring(H - B) != b.substring(0, B)) ||
                    ((D = B), B++);
              }
            }),
            (t.prototype.diff_halfMatch_ = function (b, S) {
              if ((this || y).Diff_Timeout <= 0) return null;
              var L = b.length > S.length ? b : S,
                H = b.length > S.length ? S : b;
              if (L.length < 4 || 2 * H.length < L.length) return null;
              var D = this || y;
              function o(y, b, S) {
                for (
                  var L,
                    H,
                    B,
                    U,
                    F = y.substring(S, S + Math.floor(y.length / 4)),
                    Z = -1,
                    ye = "";
                  -1 != (Z = b.indexOf(F, Z + 1));

                ) {
                  var we = D.diff_commonPrefix(y.substring(S), b.substring(Z)),
                    Dt = D.diff_commonSuffix(
                      y.substring(0, S),
                      b.substring(0, Z)
                    );
                  ye.length < Dt + we &&
                    ((ye = b.substring(Z - Dt, Z) + b.substring(Z, Z + we)),
                    (L = y.substring(0, S - Dt)),
                    (H = y.substring(S + we)),
                    (B = b.substring(0, Z - Dt)),
                    (U = b.substring(Z + we)));
                }
                return 2 * ye.length >= y.length ? [L, H, B, U, ye] : null;
              }
              var B,
                U,
                F,
                Z,
                ye,
                we = o(L, H, Math.ceil(L.length / 4)),
                Dt = o(L, H, Math.ceil(L.length / 2));
              return we || Dt
                ? ((B = Dt
                    ? we && we[4].length > Dt[4].length
                      ? we
                      : Dt
                    : we),
                  b.length > S.length
                    ? ((U = B[0]), (F = B[1]), (Z = B[2]), (ye = B[3]))
                    : ((Z = B[0]), (ye = B[1]), (U = B[2]), (F = B[3])),
                  [U, F, Z, ye, B[4]])
                : null;
            }),
            (t.prototype.diff_cleanupSemantic = function (y) {
              for (
                var b = !1,
                  L = [],
                  H = 0,
                  D = null,
                  B = 0,
                  U = 0,
                  F = 0,
                  Z = 0,
                  ye = 0;
                B < y.length;

              )
                0 == y[B][0]
                  ? ((L[H++] = B),
                    (U = Z),
                    (F = ye),
                    (Z = 0),
                    (ye = 0),
                    (D = y[B][1]))
                  : (1 == y[B][0]
                      ? (Z += y[B][1].length)
                      : (ye += y[B][1].length),
                    D &&
                      D.length <= Math.max(U, F) &&
                      D.length <= Math.max(Z, ye) &&
                      (y.splice(L[H - 1], 0, new t.Diff(S, D)),
                      (y[L[H - 1] + 1][0] = 1),
                      H--,
                      (B = --H > 0 ? L[H - 1] : -1),
                      (U = 0),
                      (F = 0),
                      (Z = 0),
                      (ye = 0),
                      (D = null),
                      (b = !0))),
                  B++;
              for (
                b && this.diff_cleanupMerge(y),
                  this.diff_cleanupSemanticLossless(y),
                  B = 1;
                B < y.length;

              ) {
                if (y[B - 1][0] == S && 1 == y[B][0]) {
                  var we = y[B - 1][1],
                    Dt = y[B][1],
                    Ot = this.diff_commonOverlap_(we, Dt),
                    jt = this.diff_commonOverlap_(Dt, we);
                  Ot >= jt
                    ? (Ot >= we.length / 2 || Ot >= Dt.length / 2) &&
                      (y.splice(B, 0, new t.Diff(0, Dt.substring(0, Ot))),
                      (y[B - 1][1] = we.substring(0, we.length - Ot)),
                      (y[B + 1][1] = Dt.substring(Ot)),
                      B++)
                    : (jt >= we.length / 2 || jt >= Dt.length / 2) &&
                      (y.splice(B, 0, new t.Diff(0, we.substring(0, jt))),
                      (y[B - 1][0] = 1),
                      (y[B - 1][1] = Dt.substring(0, Dt.length - jt)),
                      (y[B + 1][0] = S),
                      (y[B + 1][1] = we.substring(jt)),
                      B++),
                    B++;
                }
                B++;
              }
            }),
            (t.prototype.diff_cleanupSemanticLossless = function (y) {
              function n(y, b) {
                if (!y || !b) return 6;
                var S = y.charAt(y.length - 1),
                  L = b.charAt(0),
                  H = S.match(t.nonAlphaNumericRegex_),
                  D = L.match(t.nonAlphaNumericRegex_),
                  B = H && S.match(t.whitespaceRegex_),
                  U = D && L.match(t.whitespaceRegex_),
                  F = B && S.match(t.linebreakRegex_),
                  Z = U && L.match(t.linebreakRegex_),
                  ye = F && y.match(t.blanklineEndRegex_),
                  we = Z && b.match(t.blanklineStartRegex_);
                return ye || we
                  ? 5
                  : F || Z
                  ? 4
                  : H && !B && U
                  ? 3
                  : B || U
                  ? 2
                  : H || D
                  ? 1
                  : 0;
              }
              for (var b = 1; b < y.length - 1; ) {
                if (0 == y[b - 1][0] && 0 == y[b + 1][0]) {
                  var S = y[b - 1][1],
                    L = y[b][1],
                    H = y[b + 1][1],
                    D = this.diff_commonSuffix(S, L);
                  if (D) {
                    var B = L.substring(L.length - D);
                    (S = S.substring(0, S.length - D)),
                      (L = B + L.substring(0, L.length - D)),
                      (H = B + H);
                  }
                  for (
                    var U = S, F = L, Z = H, ye = n(S, L) + n(L, H);
                    L.charAt(0) === H.charAt(0);

                  ) {
                    (S += L.charAt(0)),
                      (L = L.substring(1) + H.charAt(0)),
                      (H = H.substring(1));
                    var we = n(S, L) + n(L, H);
                    we >= ye && ((ye = we), (U = S), (F = L), (Z = H));
                  }
                  y[b - 1][1] != U &&
                    (U ? (y[b - 1][1] = U) : (y.splice(b - 1, 1), b--),
                    (y[b][1] = F),
                    Z ? (y[b + 1][1] = Z) : (y.splice(b + 1, 1), b--));
                }
                b++;
              }
            }),
            (t.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/),
            (t.whitespaceRegex_ = /\s/),
            (t.linebreakRegex_ = /[\r\n]/),
            (t.blanklineEndRegex_ = /\n\r?\n$/),
            (t.blanklineStartRegex_ = /^\r?\n\r?\n/),
            (t.prototype.diff_cleanupEfficiency = function (b) {
              for (
                var L = !1,
                  H = [],
                  D = 0,
                  B = null,
                  U = 0,
                  F = !1,
                  Z = !1,
                  ye = !1,
                  we = !1;
                U < b.length;

              )
                0 == b[U][0]
                  ? (b[U][1].length < (this || y).Diff_EditCost && (ye || we)
                      ? ((H[D++] = U), (F = ye), (Z = we), (B = b[U][1]))
                      : ((D = 0), (B = null)),
                    (ye = we = !1))
                  : (b[U][0] == S ? (we = !0) : (ye = !0),
                    B &&
                      ((F && Z && ye && we) ||
                        (B.length < (this || y).Diff_EditCost / 2 &&
                          F + Z + ye + we == 3)) &&
                      (b.splice(H[D - 1], 0, new t.Diff(S, B)),
                      (b[H[D - 1] + 1][0] = 1),
                      D--,
                      (B = null),
                      F && Z
                        ? ((ye = we = !0), (D = 0))
                        : ((U = --D > 0 ? H[D - 1] : -1), (ye = we = !1)),
                      (L = !0))),
                  U++;
              L && this.diff_cleanupMerge(b);
            }),
            (t.prototype.diff_cleanupMerge = function (y) {
              y.push(new t.Diff(0, ""));
              for (var b, L = 0, H = 0, D = 0, B = "", U = ""; L < y.length; )
                switch (y[L][0]) {
                  case 1:
                    D++, (U += y[L][1]), L++;
                    break;
                  case S:
                    H++, (B += y[L][1]), L++;
                    break;
                  case 0:
                    H + D > 1
                      ? (0 !== H &&
                          0 !== D &&
                          (0 !== (b = this.diff_commonPrefix(U, B)) &&
                            (L - H - D > 0 && 0 == y[L - H - D - 1][0]
                              ? (y[L - H - D - 1][1] += U.substring(0, b))
                              : (y.splice(
                                  0,
                                  0,
                                  new t.Diff(0, U.substring(0, b))
                                ),
                                L++),
                            (U = U.substring(b)),
                            (B = B.substring(b))),
                          0 !== (b = this.diff_commonSuffix(U, B)) &&
                            ((y[L][1] = U.substring(U.length - b) + y[L][1]),
                            (U = U.substring(0, U.length - b)),
                            (B = B.substring(0, B.length - b)))),
                        (L -= H + D),
                        y.splice(L, H + D),
                        B.length && (y.splice(L, 0, new t.Diff(S, B)), L++),
                        U.length && (y.splice(L, 0, new t.Diff(1, U)), L++),
                        L++)
                      : 0 !== L && 0 == y[L - 1][0]
                      ? ((y[L - 1][1] += y[L][1]), y.splice(L, 1))
                      : L++,
                      (D = 0),
                      (H = 0),
                      (B = ""),
                      (U = "");
                }
              "" === y[y.length - 1][1] && y.pop();
              var F = !1;
              for (L = 1; L < y.length - 1; )
                0 == y[L - 1][0] &&
                  0 == y[L + 1][0] &&
                  (y[L][1].substring(y[L][1].length - y[L - 1][1].length) ==
                  y[L - 1][1]
                    ? ((y[L][1] =
                        y[L - 1][1] +
                        y[L][1].substring(
                          0,
                          y[L][1].length - y[L - 1][1].length
                        )),
                      (y[L + 1][1] = y[L - 1][1] + y[L + 1][1]),
                      y.splice(L - 1, 1),
                      (F = !0))
                    : y[L][1].substring(0, y[L + 1][1].length) == y[L + 1][1] &&
                      ((y[L - 1][1] += y[L + 1][1]),
                      (y[L][1] =
                        y[L][1].substring(y[L + 1][1].length) + y[L + 1][1]),
                      y.splice(L + 1, 1),
                      (F = !0))),
                  L++;
              F && this.diff_cleanupMerge(y);
            }),
            (t.prototype.diff_xIndex = function (y, b) {
              var L,
                H = 0,
                D = 0,
                B = 0,
                U = 0;
              for (
                L = 0;
                L < y.length &&
                (1 !== y[L][0] && (H += y[L][1].length),
                y[L][0] !== S && (D += y[L][1].length),
                !(H > b));
                L++
              )
                (B = H), (U = D);
              return y.length != L && y[L][0] === S ? U : U + (b - B);
            }),
            (t.prototype.diff_prettyHtml = function (y) {
              for (
                var b = [], L = /&/g, H = /</g, D = />/g, B = /\n/g, U = 0;
                U < y.length;
                U++
              ) {
                var F = y[U][0],
                  Z = y[U][1]
                    .replace(L, "&amp;")
                    .replace(H, "&lt;")
                    .replace(D, "&gt;")
                    .replace(B, "&para;<br>");
                switch (F) {
                  case 1:
                    b[U] = '<ins style="background:#e6ffe6;">' + Z + "</ins>";
                    break;
                  case S:
                    b[U] = '<del style="background:#ffe6e6;">' + Z + "</del>";
                    break;
                  case 0:
                    b[U] = "<span>" + Z + "</span>";
                }
              }
              return b.join("");
            }),
            (t.prototype.diff_text1 = function (y) {
              for (var b = [], S = 0; S < y.length; S++)
                1 !== y[S][0] && (b[S] = y[S][1]);
              return b.join("");
            }),
            (t.prototype.diff_text2 = function (y) {
              for (var b = [], L = 0; L < y.length; L++)
                y[L][0] !== S && (b[L] = y[L][1]);
              return b.join("");
            }),
            (t.prototype.diff_levenshtein = function (y) {
              for (var b = 0, L = 0, H = 0, D = 0; D < y.length; D++) {
                var B = y[D][0],
                  U = y[D][1];
                switch (B) {
                  case 1:
                    L += U.length;
                    break;
                  case S:
                    H += U.length;
                    break;
                  case 0:
                    (b += Math.max(L, H)), (L = 0), (H = 0);
                }
              }
              return b + Math.max(L, H);
            }),
            (t.prototype.diff_toDelta = function (y) {
              for (var b = [], L = 0; L < y.length; L++)
                switch (y[L][0]) {
                  case 1:
                    b[L] = "+" + encodeURI(y[L][1]);
                    break;
                  case S:
                    b[L] = "-" + y[L][1].length;
                    break;
                  case 0:
                    b[L] = "=" + y[L][1].length;
                }
              return b.join("\t").replace(/%20/g, " ");
            }),
            (t.prototype.diff_fromDelta = function (y, b) {
              for (
                var L = [], H = 0, D = 0, B = b.split(/\t/g), U = 0;
                U < B.length;
                U++
              ) {
                var F = B[U].substring(1);
                switch (B[U].charAt(0)) {
                  case "+":
                    try {
                      L[H++] = new t.Diff(1, decodeURI(F));
                    } catch (y) {
                      throw new Error("Illegal escape in diff_fromDelta: " + F);
                    }
                    break;
                  case "-":
                  case "=":
                    var Z = parseInt(F, 10);
                    if (isNaN(Z) || Z < 0)
                      throw new Error("Invalid number in diff_fromDelta: " + F);
                    var ye = y.substring(D, (D += Z));
                    "=" == B[U].charAt(0)
                      ? (L[H++] = new t.Diff(0, ye))
                      : (L[H++] = new t.Diff(S, ye));
                    break;
                  default:
                    if (B[U])
                      throw new Error(
                        "Invalid diff operation in diff_fromDelta: " + B[U]
                      );
                }
              }
              if (D != y.length)
                throw new Error(
                  "Delta length (" +
                    D +
                    ") does not equal source text length (" +
                    y.length +
                    ")."
                );
              return L;
            }),
            (t.prototype.match_main = function (y, b, S) {
              if (null == y || null == b || null == S)
                throw new Error("Null input. (match_main)");
              return (
                (S = Math.max(0, Math.min(S, y.length))),
                y == b
                  ? 0
                  : y.length
                  ? y.substring(S, S + b.length) == b
                    ? S
                    : this.match_bitap_(y, b, S)
                  : -1
              );
            }),
            (t.prototype.match_bitap_ = function (b, S, L) {
              if (S.length > (this || y).Match_MaxBits)
                throw new Error("Pattern too long for this browser.");
              var H = this.match_alphabet_(S),
                D = this || y;
              function o(y, b) {
                var H = y / S.length,
                  B = Math.abs(L - b);
                return D.Match_Distance ? H + B / D.Match_Distance : B ? 1 : H;
              }
              var B = (this || y).Match_Threshold,
                U = b.indexOf(S, L);
              -1 != U &&
                ((B = Math.min(o(0, U), B)),
                -1 != (U = b.lastIndexOf(S, L + S.length)) &&
                  (B = Math.min(o(0, U), B)));
              var F,
                Z,
                ye = 1 << (S.length - 1);
              U = -1;
              for (
                var we, Dt = S.length + b.length, Ot = 0;
                Ot < S.length;
                Ot++
              ) {
                for (F = 0, Z = Dt; F < Z; )
                  o(Ot, L + Z) <= B ? (F = Z) : (Dt = Z),
                    (Z = Math.floor((Dt - F) / 2 + F));
                Dt = Z;
                var jt = Math.max(1, L - Z + 1),
                  Rt = Math.min(L + Z, b.length) + S.length,
                  Pt = Array(Rt + 2);
                Pt[Rt + 1] = (1 << Ot) - 1;
                for (var qt = Rt; qt >= jt; qt--) {
                  var Bt = H[b.charAt(qt - 1)];
                  if (
                    ((Pt[qt] =
                      0 === Ot
                        ? ((Pt[qt + 1] << 1) | 1) & Bt
                        : (((Pt[qt + 1] << 1) | 1) & Bt) |
                          ((we[qt + 1] | we[qt]) << 1) |
                          1 |
                          we[qt + 1]),
                    Pt[qt] & ye)
                  ) {
                    var Vt = o(Ot, qt - 1);
                    if (Vt <= B) {
                      if (((B = Vt), !((U = qt - 1) > L))) break;
                      jt = Math.max(1, 2 * L - U);
                    }
                  }
                }
                if (o(Ot + 1, L) > B) break;
                we = Pt;
              }
              return U;
            }),
            (t.prototype.match_alphabet_ = function (y) {
              for (var b = {}, S = 0; S < y.length; S++) b[y.charAt(S)] = 0;
              for (S = 0; S < y.length; S++)
                b[y.charAt(S)] |= 1 << (y.length - S - 1);
              return b;
            }),
            (t.prototype.patch_addContext_ = function (b, S) {
              if (0 != S.length) {
                if (null === b.start2) throw Error("patch not initialized");
                for (
                  var L = S.substring(b.start2, b.start2 + b.length1), H = 0;
                  S.indexOf(L) != S.lastIndexOf(L) &&
                  L.length <
                    (this || y).Match_MaxBits -
                      (this || y).Patch_Margin -
                      (this || y).Patch_Margin;

                )
                  (H += (this || y).Patch_Margin),
                    (L = S.substring(b.start2 - H, b.start2 + b.length1 + H));
                H += (this || y).Patch_Margin;
                var D = S.substring(b.start2 - H, b.start2);
                D && b.diffs.unshift(new t.Diff(0, D));
                var B = S.substring(
                  b.start2 + b.length1,
                  b.start2 + b.length1 + H
                );
                B && b.diffs.push(new t.Diff(0, B)),
                  (b.start1 -= D.length),
                  (b.start2 -= D.length),
                  (b.length1 += D.length + B.length),
                  (b.length2 += D.length + B.length);
              }
            }),
            (t.prototype.patch_make = function (b, L, H) {
              var D, B;
              if ("string" == typeof b && "string" == typeof L && void 0 === H)
                (D = b),
                  (B = this.diff_main(D, L, !0)).length > 2 &&
                    (this.diff_cleanupSemantic(B),
                    this.diff_cleanupEfficiency(B));
              else if (
                b &&
                "object" == typeof b &&
                void 0 === L &&
                void 0 === H
              )
                (B = b), (D = this.diff_text1(B));
              else if (
                "string" == typeof b &&
                L &&
                "object" == typeof L &&
                void 0 === H
              )
                (D = b), (B = L);
              else {
                if (
                  "string" != typeof b ||
                  "string" != typeof L ||
                  !H ||
                  "object" != typeof H
                )
                  throw new Error("Unknown call format to patch_make.");
                (D = b), (B = H);
              }
              if (0 === B.length) return [];
              for (
                var U = [],
                  F = new t.patch_obj(),
                  Z = 0,
                  ye = 0,
                  we = 0,
                  Dt = D,
                  Ot = D,
                  jt = 0;
                jt < B.length;
                jt++
              ) {
                var Rt = B[jt][0],
                  Pt = B[jt][1];
                switch (
                  (Z || 0 === Rt || ((F.start1 = ye), (F.start2 = we)), Rt)
                ) {
                  case 1:
                    (F.diffs[Z++] = B[jt]),
                      (F.length2 += Pt.length),
                      (Ot = Ot.substring(0, we) + Pt + Ot.substring(we));
                    break;
                  case S:
                    (F.length1 += Pt.length),
                      (F.diffs[Z++] = B[jt]),
                      (Ot = Ot.substring(0, we) + Ot.substring(we + Pt.length));
                    break;
                  case 0:
                    Pt.length <= 2 * (this || y).Patch_Margin &&
                    Z &&
                    B.length != jt + 1
                      ? ((F.diffs[Z++] = B[jt]),
                        (F.length1 += Pt.length),
                        (F.length2 += Pt.length))
                      : Pt.length >= 2 * (this || y).Patch_Margin &&
                        Z &&
                        (this.patch_addContext_(F, Dt),
                        U.push(F),
                        (F = new t.patch_obj()),
                        (Z = 0),
                        (Dt = Ot),
                        (ye = we));
                }
                1 !== Rt && (ye += Pt.length), Rt !== S && (we += Pt.length);
              }
              return Z && (this.patch_addContext_(F, Dt), U.push(F)), U;
            }),
            (t.prototype.patch_deepCopy = function (y) {
              for (var b = [], S = 0; S < y.length; S++) {
                var L = y[S],
                  H = new t.patch_obj();
                H.diffs = [];
                for (var D = 0; D < L.diffs.length; D++)
                  H.diffs[D] = new t.Diff(L.diffs[D][0], L.diffs[D][1]);
                (H.start1 = L.start1),
                  (H.start2 = L.start2),
                  (H.length1 = L.length1),
                  (H.length2 = L.length2),
                  (b[S] = H);
              }
              return b;
            }),
            (t.prototype.patch_apply = function (b, L) {
              if (0 == b.length) return [L, []];
              b = this.patch_deepCopy(b);
              var H = this.patch_addPadding(b);
              (L = H + L + H), this.patch_splitMax(b);
              for (var D = 0, B = [], U = 0; U < b.length; U++) {
                var F,
                  Z,
                  ye = b[U].start2 + D,
                  we = this.diff_text1(b[U].diffs),
                  Dt = -1;
                if (
                  (we.length > (this || y).Match_MaxBits
                    ? -1 !=
                        (F = this.match_main(
                          L,
                          we.substring(0, (this || y).Match_MaxBits),
                          ye
                        )) &&
                      (-1 ==
                        (Dt = this.match_main(
                          L,
                          we.substring(we.length - (this || y).Match_MaxBits),
                          ye + we.length - (this || y).Match_MaxBits
                        )) ||
                        F >= Dt) &&
                      (F = -1)
                    : (F = this.match_main(L, we, ye)),
                  -1 == F)
                )
                  (B[U] = !1), (D -= b[U].length2 - b[U].length1);
                else if (
                  ((B[U] = !0),
                  (D = F - ye),
                  we ==
                    (Z =
                      -1 == Dt
                        ? L.substring(F, F + we.length)
                        : L.substring(F, Dt + (this || y).Match_MaxBits)))
                )
                  L =
                    L.substring(0, F) +
                    this.diff_text2(b[U].diffs) +
                    L.substring(F + we.length);
                else {
                  var Ot = this.diff_main(we, Z, !1);
                  if (
                    we.length > (this || y).Match_MaxBits &&
                    this.diff_levenshtein(Ot) / we.length >
                      (this || y).Patch_DeleteThreshold
                  )
                    B[U] = !1;
                  else {
                    this.diff_cleanupSemanticLossless(Ot);
                    for (var jt, Rt = 0, Pt = 0; Pt < b[U].diffs.length; Pt++) {
                      var qt = b[U].diffs[Pt];
                      0 !== qt[0] && (jt = this.diff_xIndex(Ot, Rt)),
                        1 === qt[0]
                          ? (L =
                              L.substring(0, F + jt) +
                              qt[1] +
                              L.substring(F + jt))
                          : qt[0] === S &&
                            (L =
                              L.substring(0, F + jt) +
                              L.substring(
                                F + this.diff_xIndex(Ot, Rt + qt[1].length)
                              )),
                        qt[0] !== S && (Rt += qt[1].length);
                    }
                  }
                }
              }
              return [(L = L.substring(H.length, L.length - H.length)), B];
            }),
            (t.prototype.patch_addPadding = function (b) {
              for (var S = (this || y).Patch_Margin, L = "", H = 1; H <= S; H++)
                L += String.fromCharCode(H);
              for (H = 0; H < b.length; H++)
                (b[H].start1 += S), (b[H].start2 += S);
              var D = b[0],
                B = D.diffs;
              if (0 == B.length || 0 != B[0][0])
                B.unshift(new t.Diff(0, L)),
                  (D.start1 -= S),
                  (D.start2 -= S),
                  (D.length1 += S),
                  (D.length2 += S);
              else if (S > B[0][1].length) {
                var U = S - B[0][1].length;
                (B[0][1] = L.substring(B[0][1].length) + B[0][1]),
                  (D.start1 -= U),
                  (D.start2 -= U),
                  (D.length1 += U),
                  (D.length2 += U);
              }
              if (
                0 == (B = (D = b[b.length - 1]).diffs).length ||
                0 != B[B.length - 1][0]
              )
                B.push(new t.Diff(0, L)), (D.length1 += S), (D.length2 += S);
              else if (S > B[B.length - 1][1].length) {
                U = S - B[B.length - 1][1].length;
                (B[B.length - 1][1] += L.substring(0, U)),
                  (D.length1 += U),
                  (D.length2 += U);
              }
              return L;
            }),
            (t.prototype.patch_splitMax = function (b) {
              for (var L = (this || y).Match_MaxBits, H = 0; H < b.length; H++)
                if (!(b[H].length1 <= L)) {
                  var D = b[H];
                  b.splice(H--, 1);
                  for (
                    var B = D.start1, U = D.start2, F = "";
                    0 !== D.diffs.length;

                  ) {
                    var Z = new t.patch_obj(),
                      ye = !0;
                    for (
                      Z.start1 = B - F.length,
                        Z.start2 = U - F.length,
                        "" !== F &&
                          ((Z.length1 = Z.length2 = F.length),
                          Z.diffs.push(new t.Diff(0, F)));
                      0 !== D.diffs.length &&
                      Z.length1 < L - (this || y).Patch_Margin;

                    ) {
                      var we = D.diffs[0][0],
                        Dt = D.diffs[0][1];
                      1 === we
                        ? ((Z.length2 += Dt.length),
                          (U += Dt.length),
                          Z.diffs.push(D.diffs.shift()),
                          (ye = !1))
                        : we === S &&
                          1 == Z.diffs.length &&
                          0 == Z.diffs[0][0] &&
                          Dt.length > 2 * L
                        ? ((Z.length1 += Dt.length),
                          (B += Dt.length),
                          (ye = !1),
                          Z.diffs.push(new t.Diff(we, Dt)),
                          D.diffs.shift())
                        : ((Dt = Dt.substring(
                            0,
                            L - Z.length1 - (this || y).Patch_Margin
                          )),
                          (Z.length1 += Dt.length),
                          (B += Dt.length),
                          0 === we
                            ? ((Z.length2 += Dt.length), (U += Dt.length))
                            : (ye = !1),
                          Z.diffs.push(new t.Diff(we, Dt)),
                          Dt == D.diffs[0][1]
                            ? D.diffs.shift()
                            : (D.diffs[0][1] = D.diffs[0][1].substring(
                                Dt.length
                              )));
                    }
                    F = (F = this.diff_text2(Z.diffs)).substring(
                      F.length - (this || y).Patch_Margin
                    );
                    var Ot = this.diff_text1(D.diffs).substring(
                      0,
                      (this || y).Patch_Margin
                    );
                    "" !== Ot &&
                      ((Z.length1 += Ot.length),
                      (Z.length2 += Ot.length),
                      0 !== Z.diffs.length &&
                      0 === Z.diffs[Z.diffs.length - 1][0]
                        ? (Z.diffs[Z.diffs.length - 1][1] += Ot)
                        : Z.diffs.push(new t.Diff(0, Ot))),
                      ye || b.splice(++H, 0, Z);
                  }
                }
            }),
            (t.prototype.patch_toText = function (y) {
              for (var b = [], S = 0; S < y.length; S++) b[S] = y[S];
              return b.join("");
            }),
            (t.prototype.patch_fromText = function (y) {
              var b = [];
              if (!y) return b;
              for (
                var L = y.split("\n"),
                  H = 0,
                  D = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
                H < L.length;

              ) {
                var B = L[H].match(D);
                if (!B) throw new Error("Invalid patch string: " + L[H]);
                var U = new t.patch_obj();
                for (
                  b.push(U),
                    U.start1 = parseInt(B[1], 10),
                    "" === B[2]
                      ? (U.start1--, (U.length1 = 1))
                      : "0" == B[2]
                      ? (U.length1 = 0)
                      : (U.start1--, (U.length1 = parseInt(B[2], 10))),
                    U.start2 = parseInt(B[3], 10),
                    "" === B[4]
                      ? (U.start2--, (U.length2 = 1))
                      : "0" == B[4]
                      ? (U.length2 = 0)
                      : (U.start2--, (U.length2 = parseInt(B[4], 10))),
                    H++;
                  H < L.length;

                ) {
                  var F = L[H].charAt(0);
                  try {
                    var Z = decodeURI(L[H].substring(1));
                  } catch (y) {
                    throw new Error("Illegal escape in patch_fromText: " + Z);
                  }
                  if ("-" == F) U.diffs.push(new t.Diff(S, Z));
                  else if ("+" == F) U.diffs.push(new t.Diff(1, Z));
                  else if (" " == F) U.diffs.push(new t.Diff(0, Z));
                  else {
                    if ("@" == F) break;
                    if ("" !== F)
                      throw new Error(
                        'Invalid patch mode "' + F + '" in: ' + Z
                      );
                  }
                  H++;
                }
              }
              return b;
            }),
            ((t.patch_obj = function () {
              ((this || y).diffs = []),
                ((this || y).start1 = null),
                ((this || y).start2 = null),
                ((this || y).length1 = 0),
                ((this || y).length2 = 0);
            }).prototype.toString = function () {
              for (
                var b,
                  L = [
                    "@@ -" +
                      (0 === (this || y).length1
                        ? (this || y).start1 + ",0"
                        : 1 == (this || y).length1
                        ? (this || y).start1 + 1
                        : (this || y).start1 + 1 + "," + (this || y).length1) +
                      " +" +
                      (0 === (this || y).length2
                        ? (this || y).start2 + ",0"
                        : 1 == (this || y).length2
                        ? (this || y).start2 + 1
                        : (this || y).start2 + 1 + "," + (this || y).length2) +
                      " @@\n",
                  ],
                  H = 0;
                H < (this || y).diffs.length;
                H++
              ) {
                switch ((this || y).diffs[H][0]) {
                  case 1:
                    b = "+";
                    break;
                  case S:
                    b = "-";
                    break;
                  case 0:
                    b = " ";
                }
                L[H + 1] = b + encodeURI((this || y).diffs[H][1]) + "\n";
              }
              return L.join("").replace(/%20/g, " ");
            }),
            (b.exports = t),
            (b.exports.diff_match_patch = t),
            (b.exports.DIFF_DELETE = S),
            (b.exports.DIFF_INSERT = 1),
            (b.exports.DIFF_EQUAL = 0);
        },
        872: (b, S, L) => {
          L.d(S, { default: () => Yt });
          var H = L(478),
            D = L(156),
            B = L(314),
            U = L(730),
            F = L(66),
            Z = L(218),
            ye = L(702),
            c = function (y) {
              void 0 === y && (y = document);
              var t = function (y) {
                var b = document.createElement("img");
                (b.src = y.getAttribute("data-src")),
                  b.addEventListener("load", function () {
                    y.getAttribute("style") ||
                      y.getAttribute("class") ||
                      y.getAttribute("width") ||
                      y.getAttribute("height") ||
                      (b.naturalHeight > b.naturalWidth &&
                        b.naturalWidth / b.naturalHeight <
                          document.querySelector(".vditor-reset").clientWidth /
                            (window.innerHeight - 40) &&
                        b.naturalHeight > window.innerHeight - 40 &&
                        (y.style.height = window.innerHeight - 40 + "px")),
                      (y.src = b.src);
                  }),
                  y.removeAttribute("data-src");
              };
              if (!("IntersectionObserver" in window))
                return (
                  y.querySelectorAll("img").forEach(function (y) {
                    y.getAttribute("data-src") && t(y);
                  }),
                  !1
                );
              window.vditorImageIntersectionObserver
                ? (window.vditorImageIntersectionObserver.disconnect(),
                  y.querySelectorAll("img").forEach(function (y) {
                    window.vditorImageIntersectionObserver.observe(y);
                  }))
                : ((window.vditorImageIntersectionObserver = new IntersectionObserver(
                    function (y) {
                      y.forEach(function (y) {
                        (void 0 === y.isIntersecting
                          ? 0 !== y.intersectionRatio
                          : y.isIntersecting) &&
                          y.target.getAttribute("data-src") &&
                          t(y.target);
                      });
                    }
                  )),
                  y.querySelectorAll("img").forEach(function (y) {
                    window.vditorImageIntersectionObserver.observe(y);
                  }));
            },
            we = L(466),
            Dt = L(554),
            Ot = L(40),
            jt = L(563),
            Rt = L(749),
            Pt = L(818),
            qt = L(408),
            Bt = L(54),
            Vt = L(227),
            Ut = L(526),
            Wt = L(827),
            Kt = L(640),
            Gt = L(895),
            Zt = L(393),
            C = function (y, b) {
              if (
                (void 0 === b && (b = "zh_CN"),
                "undefined" != typeof speechSynthesis &&
                  "undefined" != typeof SpeechSynthesisUtterance)
              ) {
                var S = '<svg><use xlink:href="#vditor-icon-play"></use></svg>',
                  L = '<svg><use xlink:href="#vditor-icon-pause"></use></svg>';
                document.getElementById("vditorIconScript") ||
                  ((S =
                    '<svg viewBox="0 0 32 32"><path d="M3.436 0l25.128 16-25.128 16v-32z"></path></svg>'),
                  (L =
                    '<svg viewBox="0 0 32 32"><path d="M20.617 0h9.128v32h-9.128v-32zM2.255 32v-32h9.128v32h-9.128z"></path></svg>'));
                var H = document.querySelector(".vditor-speech");
                if (!H) {
                  ((H = document.createElement("div")).className =
                    "vditor-speech"),
                    document.body.insertAdjacentElement("beforeend", H);
                  var o = function () {
                    var y, S;
                    return (
                      speechSynthesis.getVoices().forEach(function (L) {
                        L.lang === b.replace("_", "-") && (y = L),
                          L.default && (S = L);
                      }),
                      y || (y = S),
                      y
                    );
                  };
                  void 0 !== speechSynthesis.onvoiceschanged &&
                    (speechSynthesis.onvoiceschanged = o);
                  var D = o();
                  (H.onclick = function () {
                    if ("vditor-speech" === H.className) {
                      var y = new SpeechSynthesisUtterance(
                        H.getAttribute("data-text")
                      );
                      (y.voice = D),
                        (y.onend = function () {
                          (H.className = "vditor-speech"),
                            speechSynthesis.cancel(),
                            (H.innerHTML = S);
                        }),
                        speechSynthesis.speak(y),
                        (H.className = "vditor-speech vditor-speech--current"),
                        (H.innerHTML = L);
                    } else
                      speechSynthesis.speaking &&
                        (speechSynthesis.paused
                          ? (speechSynthesis.resume(), (H.innerHTML = L))
                          : (speechSynthesis.pause(), (H.innerHTML = S)));
                    (0, Zt.Hc)(window.vditorSpeechRange);
                  }),
                    document.body.addEventListener("click", function () {
                      "" === getSelection().toString().trim() &&
                        "block" === H.style.display &&
                        ((H.className = "vditor-speech"),
                        speechSynthesis.cancel(),
                        (H.style.display = "none"));
                    });
                }
                y.addEventListener("mouseup", function (y) {
                  var b = getSelection().toString().trim();
                  if (
                    (speechSynthesis.cancel(),
                    "" !== getSelection().toString().trim())
                  ) {
                    window.vditorSpeechRange = getSelection()
                      .getRangeAt(0)
                      .cloneRange();
                    var L = getSelection()
                      .getRangeAt(0)
                      .getBoundingClientRect();
                    (H.innerHTML = S),
                      (H.style.display = "block"),
                      (H.style.top =
                        L.top +
                        L.height +
                        document.querySelector("html").scrollTop -
                        20 +
                        "px"),
                      (H.style.left = y.clientX + 2 + "px"),
                      H.setAttribute("data-text", b);
                  } else "block" === H.style.display && ((H.className = "vditor-speech"), (H.style.display = "none"));
                });
              }
            },
            M = function (y, b, S, L) {
              return new (S || (S = Promise))(function (H, D) {
                function a(y) {
                  try {
                    s(L.next(y));
                  } catch (y) {
                    D(y);
                  }
                }
                function l(y) {
                  try {
                    s(L.throw(y));
                  } catch (y) {
                    D(y);
                  }
                }
                function s(y) {
                  var b;
                  y.done
                    ? H(y.value)
                    : ((b = y.value),
                      b instanceof S
                        ? b
                        : new S(function (y) {
                            y(b);
                          })).then(a, l);
                }
                s((L = L.apply(y, b || [])).next());
              });
            },
            T = function (b, S) {
              var L,
                H,
                D,
                B,
                U = {
                  label: 0,
                  sent: function () {
                    if (1 & D[0]) throw D[1];
                    return D[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (B = { next: l(0), throw: l(1), return: l(2) }),
                "function" == typeof Symbol &&
                  (B[Symbol.iterator] = function () {
                    return this || y;
                  }),
                B
              );
              function l(y) {
                return function (B) {
                  return (function (y) {
                    if (L)
                      throw new TypeError("Generator is already executing.");
                    for (; U; )
                      try {
                        if (
                          ((L = 1),
                          H &&
                            (D =
                              2 & y[0]
                                ? H.return
                                : y[0]
                                ? H.throw || ((D = H.return) && D.call(H), 0)
                                : H.next) &&
                            !(D = D.call(H, y[1])).done)
                        )
                          return D;
                        switch (
                          ((H = 0), D && (y = [2 & y[0], D.value]), y[0])
                        ) {
                          case 0:
                          case 1:
                            D = y;
                            break;
                          case 4:
                            return U.label++, { value: y[1], done: !1 };
                          case 5:
                            U.label++, (H = y[1]), (y = [0]);
                            continue;
                          case 7:
                            (y = U.ops.pop()), U.trys.pop();
                            continue;
                          default:
                            if (
                              !((D = U.trys),
                              (D = D.length > 0 && D[D.length - 1]) ||
                                (6 !== y[0] && 2 !== y[0]))
                            ) {
                              U = 0;
                              continue;
                            }
                            if (
                              3 === y[0] &&
                              (!D || (y[1] > D[0] && y[1] < D[3]))
                            ) {
                              U.label = y[1];
                              break;
                            }
                            if (6 === y[0] && U.label < D[1]) {
                              (U.label = D[1]), (D = y);
                              break;
                            }
                            if (D && U.label < D[2]) {
                              (U.label = D[2]), U.ops.push(y);
                              break;
                            }
                            D[2] && U.ops.pop(), U.trys.pop();
                            continue;
                        }
                        y = S.call(b, U);
                      } catch (b) {
                        (y = [6, b]), (H = 0);
                      } finally {
                        L = D = 0;
                      }
                    if (5 & y[0]) throw y[1];
                    return { value: y[0] ? y[1] : void 0, done: !0 };
                  })([y, B]);
                };
              }
            },
            A = function (y) {
              var b = {
                anchor: 0,
                cdn: Bt.g.CDN,
                customEmoji: {},
                emojiPath:
                  ((y && y.emojiPath) || Bt.g.CDN) + "/dist/images/emoji",
                hljs: Bt.g.HLJS_OPTIONS,
                icon: "ant",
                lang: "zh_CN",
                markdown: Bt.g.MARKDOWN_OPTIONS,
                math: Bt.g.MATH_OPTIONS,
                mode: "light",
                speech: { enable: !1 },
                theme: Bt.g.THEME_OPTIONS,
              };
              return (0, Kt.T)(b, y);
            },
            _ = function (y, b) {
              var S = A(b);
              return (0, Ut.G)(
                S.cdn + "/dist/js/lute/lute.min.js",
                "vditorLuteScript"
              ).then(function () {
                var L = (0, Gt.X)({
                  autoSpace: S.markdown.autoSpace,
                  codeBlockPreview: S.markdown.codeBlockPreview,
                  emojiSite: S.emojiPath,
                  emojis: S.customEmoji,
                  fixTermTypo: S.markdown.fixTermTypo,
                  footnotes: S.markdown.footnotes,
                  headingAnchor: 0 !== S.anchor,
                  inlineMathDigit: S.math.inlineDigit,
                  lazyLoadImage: S.lazyLoadImage,
                  linkBase: S.markdown.linkBase,
                  linkPrefix: S.markdown.linkPrefix,
                  listStyle: S.markdown.listStyle,
                  mark: S.markdown.mark,
                  mathBlockPreview: S.markdown.mathBlockPreview,
                  paragraphBeginningSpace: S.markdown.paragraphBeginningSpace,
                  sanitize: S.markdown.sanitize,
                  toc: S.markdown.toc,
                });
                return (
                  (null == b ? void 0 : b.renderers) &&
                    L.SetJSRenderers({ renderers: { Md2HTML: b.renderers } }),
                  L.SetHeadingID(!0),
                  L.Md2HTML(y)
                );
              });
            },
            x = function (b, S, L) {
              return M(void 0, void 0, void 0, function () {
                var D, Pt, Bt;
                return T(this || y, function (y) {
                  switch (y.label) {
                    case 0:
                      return (D = A(L)), [4, _(S, D)];
                    case 1:
                      if (
                        ((Pt = y.sent()),
                        D.transform && (Pt = D.transform(Pt)),
                        (b.innerHTML = Pt),
                        b.classList.add("vditor-reset"),
                        D.i18n)
                      )
                        return [3, 5];
                      if (
                        [
                          "en_US",
                          "fr_FR",
                          "ja_JP",
                          "ko_KR",
                          "ru_RU",
                          "sv_SE",
                          "zh_CN",
                          "zh_TW",
                        ].includes(D.lang)
                      )
                        return [3, 2];
                      throw new Error(
                        "options.lang error, see https://ld246.com/article/1549638745630#options"
                      );
                    case 2:
                      return (
                        (Bt = "vditorI18nScript" + D.lang),
                        document
                          .querySelectorAll(
                            'head script[id^="vditorI18nScript"]'
                          )
                          .forEach(function (y) {
                            y.id !== Bt && document.head.removeChild(y);
                          }),
                        [
                          4,
                          (0, Ut.G)(
                            D.cdn + "/dist/js/i18n/" + D.lang + ".js",
                            Bt
                          ),
                        ]
                      );
                    case 3:
                      y.sent(), (y.label = 4);
                    case 4:
                      return [3, 6];
                    case 5:
                      (window.VditorI18n = D.i18n), (y.label = 6);
                    case 6:
                      return D.icon
                        ? [
                            4,
                            (0, Ut.G)(
                              D.cdn + "/dist/js/icons/" + D.icon + ".js",
                              "vditorIconScript"
                            ),
                          ]
                        : [3, 8];
                    case 7:
                      y.sent(), (y.label = 8);
                    case 8:
                      return (
                        (0, Vt.Z)(D.theme.current, D.theme.path),
                        1 === D.anchor &&
                          b.classList.add("vditor-reset--anchor"),
                        (0, U.O)(b),
                        (0, ye.s)(D.hljs, b, D.cdn),
                        (0, we.H)(b, { cdn: D.cdn, math: D.math }),
                        (0, Ot.i)(b, D.cdn, D.mode),
                        (0, jt.K)(b, D.cdn, D.mode),
                        (0, F.P)(b, D.cdn),
                        (0, Z.v)(b, D.cdn),
                        (0, B.p)(b, D.cdn, D.mode),
                        (0, Rt.P)(b, D.cdn, D.mode),
                        (0, qt.B)(b, D.cdn),
                        (0, H.Q)(b, D.cdn),
                        (0, Dt.Y)(b),
                        D.speech.enable && C(b),
                        0 !== D.anchor &&
                          ((Kt = D.anchor),
                          document
                            .querySelectorAll(".vditor-anchor")
                            .forEach(function (y) {
                              1 === Kt &&
                                y.classList.add("vditor-anchor--left"),
                                (y.onclick = function () {
                                  var b = y.getAttribute("href").substr(1),
                                    S = document.getElementById(
                                      "vditorAnchor-" + b
                                    ).offsetTop;
                                  document.querySelector("html").scrollTop = S;
                                });
                            }),
                          (window.onhashchange = function () {
                            var y = document.getElementById(
                              "vditorAnchor-" +
                                decodeURIComponent(
                                  window.location.hash.substr(1)
                                )
                            );
                            y &&
                              (document.querySelector("html").scrollTop =
                                y.offsetTop);
                          })),
                        D.after && D.after(),
                        D.lazyLoadImage && c(b),
                        b.addEventListener("click", function (y) {
                          var S = (0, Wt.lG)(y.target, "SPAN");
                          if (S && (0, Wt.fb)(S, "vditor-toc")) {
                            var L = b.querySelector(
                              "#" + S.getAttribute("data-target-id")
                            );
                            L && window.scrollTo(window.scrollX, L.offsetTop);
                          }
                        }),
                        [2]
                      );
                  }
                  var Kt;
                });
              });
            },
            Jt = L(863),
            Xt = L(312);
          const Yt = (function () {
            function e() {}
            return (
              (e.adapterRender = D),
              (e.previewImage = Jt.E),
              (e.codeRender = U.O),
              (e.graphvizRender = Z.v),
              (e.highlightRender = ye.s),
              (e.mathRender = we.H),
              (e.mermaidRender = Ot.i),
              (e.markmapRender = jt.K),
              (e.flowchartRender = F.P),
              (e.chartRender = B.p),
              (e.abcRender = H.Q),
              (e.mindmapRender = Rt.P),
              (e.plantumlRender = qt.B),
              (e.outlineRender = Pt.k),
              (e.mediaRender = Dt.Y),
              (e.speechRender = C),
              (e.lazyLoadImageRender = c),
              (e.md2html = _),
              (e.preview = x),
              (e.setCodeTheme = Xt.Y),
              (e.setContentTheme = Vt.Z),
              e
            );
          })();
        },
        54: (y, b, S) => {
          S.d(b, { H: () => L, g: () => H });
          var L = "3.9.2",
            H = (function () {
              function e() {}
              return (
                (e.ZWSP = "​"),
                (e.DROP_EDITOR = "application/editor"),
                (e.MOBILE_WIDTH = 520),
                (e.CLASS_MENU_DISABLED = "vditor-menu--disabled"),
                (e.EDIT_TOOLBARS = [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "list",
                  "ordered-list",
                  "outdent",
                  "indent",
                  "check",
                  "line",
                  "quote",
                  "code",
                  "inline-code",
                  "insert-after",
                  "insert-before",
                  // "upload",
                  "record",
                  "table",
                ]),
                (e.CODE_THEME = [
                  "abap",
                  "algol",
                  "algol_nu",
                  "arduino",
                  "autumn",
                  "borland",
                  "bw",
                  "colorful",
                  "dracula",
                  "emacs",
                  "friendly",
                  "fruity",
                  "github",
                  "igor",
                  "lovelace",
                  "manni",
                  "monokai",
                  "monokailight",
                  "murphy",
                  "native",
                  "paraiso-dark",
                  "paraiso-light",
                  "pastie",
                  "perldoc",
                  "pygments",
                  "rainbow_dash",
                  "rrt",
                  "solarized-dark",
                  "solarized-dark256",
                  "solarized-light",
                  "swapoff",
                  "tango",
                  "trac",
                  "vim",
                  "vs",
                  "xcode",
                  "ant-design",
                ]),
                (e.CODE_LANGUAGES = [
                  "mermaid",
                  "echarts",
                  "mindmap",
                  "plantuml",
                  "abc",
                  "graphviz",
                  "flowchart",
                  "apache",
                  "js",
                  "ts",
                  "html",
                  "markmap",
                  "properties",
                  "apache",
                  "bash",
                  "c",
                  "csharp",
                  "cpp",
                  "css",
                  "coffeescript",
                  "diff",
                  "go",
                  "xml",
                  "http",
                  "json",
                  "java",
                  "javascript",
                  "kotlin",
                  "less",
                  "lua",
                  "makefile",
                  "markdown",
                  "nginx",
                  "objectivec",
                  "php",
                  "php-template",
                  "perl",
                  "plaintext",
                  "python",
                  "python-repl",
                  "r",
                  "ruby",
                  "rust",
                  "scss",
                  "sql",
                  "shell",
                  "swift",
                  "ini",
                  "typescript",
                  "vbnet",
                  "yaml",
                  "ada",
                  "clojure",
                  "dart",
                  "erb",
                  "fortran",
                  "gradle",
                  "haskell",
                  "julia",
                  "julia-repl",
                  "lisp",
                  "matlab",
                  "pgsql",
                  "powershell",
                  "sql_more",
                  "stata",
                  "cmake",
                  "mathematica",
                  "solidity",
                  "yul",
                ]),
                (e.CDN = "https://unpkg.com/vditor@3.9.2"),
                (e.MARKDOWN_OPTIONS = {
                  autoSpace: !1,
                  codeBlockPreview: !0,
                  fixTermTypo: !1,
                  footnotes: !0,
                  linkBase: "",
                  linkPrefix: "",
                  listStyle: !1,
                  mark: !1,
                  mathBlockPreview: !0,
                  paragraphBeginningSpace: !1,
                  sanitize: !0,
                  toc: !1,
                }),
                (e.HLJS_OPTIONS = {
                  enable: !0,
                  lineNumber: !1,
                  defaultLang: "",
                  style: "github",
                }),
                (e.MATH_OPTIONS = {
                  engine: "KaTeX",
                  inlineDigit: !1,
                  macros: {},
                }),
                (e.THEME_OPTIONS = {
                  current: "light",
                  list: {
                    "ant-design": "Ant Design",
                    dark: "Dark",
                    light: "Light",
                    wechat: "WeChat",
                  },
                  path: e.CDN + "/dist/css/content-theme",
                }),
                e
              );
            })();
        },
        478: (y, b, S) => {
          S.d(b, { Q: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b) {
              void 0 === y && (y = document), void 0 === b && (b = L.g.CDN);
              var S = D.abcRenderAdapter.getElements(y);
              S.length > 0 &&
                (0, H.G)(
                  b + "/dist/js/abcjs/abcjs_basic.min.js",
                  "vditorAbcjsScript"
                ).then(function () {
                  S.forEach(function (y) {
                    y.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                      y.parentElement.classList.contains(
                        "vditor-ir__marker--pre"
                      ) ||
                      ("true" !== y.getAttribute("data-processed") &&
                        (ABCJS.renderAbc(
                          y,
                          D.abcRenderAdapter.getCode(y).trim()
                        ),
                        (y.style.overflowX = "auto"),
                        y.setAttribute("data-processed", "true")));
                  });
                });
            };
        },
        156: (y, b, S) => {
          S.r(b),
            S.d(b, {
              mathRenderAdapter: () => L,
              mermaidRenderAdapter: () => H,
              markmapRenderAdapter: () => D,
              mindmapRenderAdapter: () => B,
              chartRenderAdapter: () => U,
              abcRenderAdapter: () => F,
              graphvizRenderAdapter: () => Z,
              flowchartRenderAdapter: () => ye,
              plantumlRenderAdapter: () => we,
            });
          var L = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-math");
              },
            },
            H = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-mermaid");
              },
            },
            D = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-markmap");
              },
            },
            B = {
              getCode: function (y) {
                return y.getAttribute("data-code");
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-mindmap");
              },
            },
            U = {
              getCode: function (y) {
                return y.innerText;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-echarts");
              },
            },
            F = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-abc");
              },
            },
            Z = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-graphviz");
              },
            },
            ye = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-flowchart");
              },
            },
            we = {
              getCode: function (y) {
                return y.textContent;
              },
              getElements: function (y) {
                return y.querySelectorAll(".language-plantuml");
              },
            };
        },
        314: (y, b, S) => {
          S.d(b, { p: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b, S) {
              void 0 === y && (y = document), void 0 === b && (b = L.g.CDN);
              var B = D.chartRenderAdapter.getElements(y);
              B.length > 0 &&
                (0, H.G)(
                  b + "/dist/js/echarts/echarts.min.js",
                  "vditorEchartsScript"
                ).then(function () {
                  B.forEach(function (y) {
                    if (
                      !y.parentElement.classList.contains(
                        "vditor-wysiwyg__pre"
                      ) &&
                      !y.parentElement.classList.contains(
                        "vditor-ir__marker--pre"
                      )
                    ) {
                      var b = D.chartRenderAdapter.getCode(y).trim();
                      if (b)
                        try {
                          if ("true" === y.getAttribute("data-processed"))
                            return;
                          var L = JSON.parse(b);
                          echarts
                            .init(y, "dark" === S ? "dark" : void 0)
                            .setOption(L),
                            y.setAttribute("data-processed", "true");
                        } catch (b) {
                          (y.className = "vditor-reset--error"),
                            (y.innerHTML = "echarts render error: <br>" + b);
                        }
                    }
                  });
                });
            };
        },
        730: (y, b, S) => {
          S.d(b, { O: () => o });
          var L = S(51),
            H = S(54),
            o = function (y) {
              y.querySelectorAll("pre > code").forEach(function (b, S) {
                var D, B, U;
                if (
                  !b.parentElement.classList.contains("vditor-wysiwyg__pre") &&
                  !b.parentElement.classList.contains(
                    "vditor-ir__marker--pre"
                  ) &&
                  !(
                    b.classList.contains("language-mermaid") ||
                    b.classList.contains("language-flowchart") ||
                    b.classList.contains("language-echarts") ||
                    b.classList.contains("language-mindmap") ||
                    b.classList.contains("language-plantuml") ||
                    b.classList.contains("language-markmap") ||
                    b.classList.contains("language-abc") ||
                    b.classList.contains("language-graphviz") ||
                    b.classList.contains("language-math") ||
                    b.style.maxHeight.indexOf("px") > -1 ||
                    (y.classList.contains("vditor-preview") && S > 5)
                  )
                ) {
                  var F = b.innerText;
                  if (b.classList.contains("highlight-chroma")) {
                    var Z = document.createElement("code");
                    (Z.innerHTML = b.innerHTML),
                      Z.querySelectorAll(".highlight-ln").forEach(function (y) {
                        y.remove();
                      }),
                      (F = Z.innerText);
                  } else F.endsWith("\n") && (F = F.substr(0, F.length - 1));
                  var ye =
                    '<svg><use xlink:href="#vditor-icon-copy"></use></svg>';
                  document.getElementById("vditorIconScript") ||
                    (ye =
                      '<svg viewBox="0 0 32 32"><path d="M22.545-0h-17.455c-1.6 0-2.909 1.309-2.909 2.909v20.364h2.909v-20.364h17.455v-2.909zM26.909 5.818h-16c-1.6 0-2.909 1.309-2.909 2.909v20.364c0 1.6 1.309 2.909 2.909 2.909h16c1.6 0 2.909-1.309 2.909-2.909v-20.364c0-1.6-1.309-2.909-2.909-2.909zM26.909 29.091h-16v-20.364h16v20.364z"></path></svg>');
                  var we = document.createElement("div");
                  (we.className = "vditor-copy"),
                    (we.innerHTML =
                      '<span aria-label="' +
                      ((null === (D = window.VditorI18n) || void 0 === D
                        ? void 0
                        : D.copy) || "复制") +
                      "\"\nonmouseover=\"this.setAttribute('aria-label', '" +
                      ((null === (B = window.VditorI18n) || void 0 === B
                        ? void 0
                        : B.copy) || "复制") +
                      "')\"\nclass=\"vditor-tooltipped vditor-tooltipped__w\"\nonclick=\"this.previousElementSibling.select();document.execCommand('copy');this.setAttribute('aria-label', '" +
                      ((null === (U = window.VditorI18n) || void 0 === U
                        ? void 0
                        : U.copied) || "已复制") +
                      "')\">" +
                      ye +
                      "</span>");
                  var Dt = document.createElement("textarea");
                  (Dt.value = (0, L.X)(F)),
                    we.insertAdjacentElement("afterbegin", Dt),
                    b.before(we),
                    (b.style.maxHeight = window.outerHeight - 40 + "px"),
                    b.insertAdjacentHTML(
                      "afterend",
                      '<span style="position: absolute">' + H.g.ZWSP + "</span>"
                    );
                }
              });
            };
        },
        66: (y, b, S) => {
          S.d(b, { P: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b) {
              void 0 === b && (b = L.g.CDN);
              var S = D.flowchartRenderAdapter.getElements(y);
              0 !== S.length &&
                (0, H.G)(
                  b + "/dist/js/flowchart.js/flowchart.min.js",
                  "vditorFlowchartScript"
                ).then(function () {
                  S.forEach(function (y) {
                    if ("true" !== y.getAttribute("data-processed")) {
                      var b = flowchart.parse(
                        D.flowchartRenderAdapter.getCode(y)
                      );
                      (y.innerHTML = ""),
                        b.drawSVG(y),
                        y.setAttribute("data-processed", "true");
                    }
                  });
                });
            };
        },
        218: (y, b, S) => {
          S.d(b, { v: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b) {
              void 0 === b && (b = L.g.CDN);
              var S = D.graphvizRenderAdapter.getElements(y);
              0 !== S.length &&
                (0, H.G)(
                  b + "/dist/js/graphviz/viz.js",
                  "vditorGraphVizScript"
                ).then(function () {
                  S.forEach(function (y) {
                    var b = D.graphvizRenderAdapter.getCode(y);
                    if (
                      !y.parentElement.classList.contains(
                        "vditor-wysiwyg__pre"
                      ) &&
                      !y.parentElement.classList.contains(
                        "vditor-ir__marker--pre"
                      ) &&
                      "true" !== y.getAttribute("data-processed") &&
                      "" !== b.trim()
                    ) {
                      try {
                        var S = new Blob(
                            [
                              "importScripts('" +
                                document
                                  .getElementById("vditorGraphVizScript")
                                  .src.replace("viz.js", "full.render.js") +
                                "');",
                            ],
                            { type: "application/javascript" }
                          ),
                          L = (window.URL || window.webkitURL).createObjectURL(
                            S
                          ),
                          H = new Worker(L);
                        new Viz({ worker: H })
                          .renderSVGElement(b)
                          .then(function (b) {
                            y.innerHTML = b.outerHTML;
                          })
                          .catch(function (b) {
                            (y.innerHTML = "graphviz render error: <br>" + b),
                              (y.className = "vditor-reset--error");
                          });
                      } catch (y) {
                        console.error("graphviz error", y);
                      }
                      y.setAttribute("data-processed", "true");
                    }
                  });
                });
            };
        },
        702: (y, b, S) => {
          S.d(b, { s: () => a });
          var L = S(54),
            H = S(526),
            D = S(578),
            a = function (y, b, S) {
              void 0 === b && (b = document), void 0 === S && (S = L.g.CDN);
              var B = y.style;
              L.g.CODE_THEME.includes(B) || (B = "github");
              var U = document.getElementById("vditorHljsStyle"),
                F = S + "/dist/js/highlight.js/styles/" + B + ".css";
              (U && U.href !== F && U.remove(),
              (0, D.c)(
                S + "/dist/js/highlight.js/styles/" + B + ".css",
                "vditorHljsStyle"
              ),
              !1 !== y.enable) &&
                0 !== b.querySelectorAll("pre > code").length &&
                (0, H.G)(
                  S + "/dist/js/highlight.js/highlight.pack.js",
                  "vditorHljsScript"
                ).then(function () {
                  (0, H.G)(
                    S + "/dist/js/highlight.js/solidity.min.js",
                    "vditorHljsSolidityScript"
                  ).then(function () {
                    (0, H.G)(
                      S + "/dist/js/highlight.js/yul.min.js",
                      "vditorHljsYulScript"
                    ).then(function () {
                      b.querySelectorAll("pre > code").forEach(function (b) {
                        if (
                          !b.parentElement.classList.contains(
                            "vditor-ir__marker--pre"
                          ) &&
                          !b.parentElement.classList.contains(
                            "vditor-wysiwyg__pre"
                          ) &&
                          !(
                            b.classList.contains("language-mermaid") ||
                            b.classList.contains("language-flowchart") ||
                            b.classList.contains("language-echarts") ||
                            b.classList.contains("language-mindmap") ||
                            b.classList.contains("language-plantuml") ||
                            b.classList.contains("language-abc") ||
                            b.classList.contains("language-graphviz") ||
                            b.classList.contains("language-math")
                          ) &&
                          ("" !== y.defaultLang &&
                            -1 === b.className.indexOf("language-") &&
                            b.classList.add("language-" + y.defaultLang),
                          hljs.highlightElement(b),
                          y.lineNumber)
                        ) {
                          b.classList.add("vditor-linenumber");
                          var S = b.querySelector(".vditor-linenumber__temp");
                          S ||
                            (((S = document.createElement("div")).className =
                              "vditor-linenumber__temp"),
                            b.insertAdjacentElement("beforeend", S));
                          var L = getComputedStyle(b).whiteSpace,
                            H = !1;
                          ("pre-wrap" !== L && "pre-line" !== L) || (H = !0);
                          var D = "",
                            B = b.textContent.split(/\r\n|\r|\n/g);
                          B.pop(),
                            B.map(function (y) {
                              var b = "";
                              H &&
                                ((S.textContent = y || "\n"),
                                (b =
                                  ' style="height:' +
                                  S.getBoundingClientRect().height +
                                  'px"')),
                                (D += "<span" + b + "></span>");
                            }),
                            (S.style.display = "none"),
                            (D =
                              '<span class="vditor-linenumber__rows">' +
                              D +
                              "</span>"),
                            b.insertAdjacentHTML("beforeend", D);
                        }
                      });
                    });
                  });
                });
            };
        },
        563: (y, b, S) => {
          S.d(b, { K: () => s });
          var L = S(54),
            H = S(526),
            D = S(156),
            B = {},
            l = function (y, b) {
              var S = window.markmap,
                L = S.Transformer,
                H = S.Markmap,
                D = S.deriveOptions,
                U = (S.globalCSS, new L());
              y.innerHTML = '<svg style="width:100%"></svg>';
              var F = y.firstChild,
                Z = H.create(F, null),
                ye = (function (y, b) {
                  var S = y.transform(b),
                    L = Object.keys(S.features).filter(function (y) {
                      return !B[y];
                    });
                  L.forEach(function (y) {
                    B[y] = !0;
                  });
                  var H = y.getAssets(L),
                    D = H.styles,
                    U = H.scripts,
                    F = window.markmap;
                  return D && F.loadCSS(D), U && F.loadJS(U), S;
                })(U, b),
                we = ye.root,
                Dt = ye.frontmatter,
                Ot = D(null == Dt ? void 0 : Dt.markmap);
              Z.setData(we, Ot), Z.fit();
            },
            s = function (y, b, S) {
              void 0 === b && (b = L.g.CDN);
              var B = D.markmapRenderAdapter.getElements(y);
              0 !== B.length &&
                (0, H.G)(
                  b + "/src/js/markmap/markmap.min.js",
                  "vditorMermaidScript"
                ).then(function () {
                  B.forEach(function (y) {
                    var b = D.markmapRenderAdapter.getCode(y);
                    if (
                      "true" !== y.getAttribute("data-processed") &&
                      "" !== b.trim()
                    ) {
                      var S = document.createElement("div");
                      (S.className = "language-markmap"),
                        y.parentNode.appendChild(S),
                        l(S, b),
                        "CODE" == y.parentNode.childNodes[0].nodeName &&
                          y.parentNode.removeChild(y.parentNode.childNodes[0]);
                    }
                  });
                });
            };
        },
        466: (y, b, S) => {
          S.d(b, { H: () => s });
          var L = S(54),
            H = S(526),
            D = S(578),
            B = S(51),
            U = S(156),
            s = function (y, b) {
              var S = U.mathRenderAdapter.getElements(y);
              if (0 !== S.length) {
                var F = {
                  cdn: L.g.CDN,
                  math: { engine: "KaTeX", inlineDigit: !1, macros: {} },
                };
                if (
                  (b && b.math && (b.math = Object.assign({}, F.math, b.math)),
                  "KaTeX" === (b = Object.assign({}, F, b)).math.engine)
                )
                  (0, D.c)(
                    b.cdn + "/dist/js/katex/katex.min.css",
                    "vditorKatexStyle"
                  ),
                    (0, H.G)(
                      b.cdn + "/dist/js/katex/katex.min.js",
                      "vditorKatexScript"
                    ).then(function () {
                      (0, H.G)(
                        b.cdn + "/dist/js/katex/mhchem.min.js",
                        "vditorKatexChemScript"
                      ).then(function () {
                        S.forEach(function (y) {
                          if (
                            !y.parentElement.classList.contains(
                              "vditor-wysiwyg__pre"
                            ) &&
                            !y.parentElement.classList.contains(
                              "vditor-ir__marker--pre"
                            ) &&
                            !y.getAttribute("data-math")
                          ) {
                            var b = (0, B.X)(U.mathRenderAdapter.getCode(y));
                            y.setAttribute("data-math", b);
                            try {
                              y.innerHTML = katex.renderToString(b, {
                                displayMode: "DIV" === y.tagName,
                                output: "html",
                              });
                            } catch (b) {
                              (y.innerHTML = b.message),
                                (y.className =
                                  "language-math vditor-reset--error");
                            }
                            y.addEventListener("copy", function (y) {
                              y.stopPropagation(), y.preventDefault();
                              var b = y.currentTarget.closest(".language-math");
                              y.clipboardData.setData("text/html", b.innerHTML),
                                y.clipboardData.setData(
                                  "text/plain",
                                  b.getAttribute("data-math")
                                );
                            });
                          }
                        });
                      });
                    });
                else if ("MathJax" === b.math.engine) {
                  window.MathJax ||
                    (window.MathJax = {
                      loader: {
                        paths: { mathjax: b.cdn + "/dist/js/mathjax" },
                      },
                      startup: { typeset: !1 },
                      tex: { macros: b.math.macros },
                    }),
                    (0, H.J)(
                      b.cdn + "/dist/js/mathjax/tex-svg-full.js",
                      "protyleMathJaxScript"
                    );
                  var d = function (y, b) {
                    var S = (0, B.X)(y.textContent).trim(),
                      L = window.MathJax.getMetricsFor(y);
                    (L.display = "DIV" === y.tagName),
                      window.MathJax.tex2svgPromise(S, L).then(function (L) {
                        (y.innerHTML = ""),
                          y.setAttribute("data-math", S),
                          y.append(L),
                          window.MathJax.startup.document.clear(),
                          window.MathJax.startup.document.updateDocument();
                        var H = L.querySelector('[data-mml-node="merror"]');
                        H &&
                          "" !== H.textContent.trim() &&
                          ((y.innerHTML = H.textContent.trim()),
                          (y.className = "vditor-reset--error")),
                          b && b();
                      });
                  };
                  window.MathJax.startup.promise.then(function () {
                    for (
                      var y = [],
                        t = function (b) {
                          var L = S[b];
                          L.parentElement.classList.contains(
                            "vditor-wysiwyg__pre"
                          ) ||
                            L.parentElement.classList.contains(
                              "vditor-ir__marker--pre"
                            ) ||
                            L.getAttribute("data-math") ||
                            !(0, B.X)(L.textContent).trim() ||
                            y.push(function (y) {
                              b === S.length - 1 ? d(L) : d(L, y);
                            });
                        },
                        b = 0;
                      b < S.length;
                      b++
                    )
                      t(b);
                    !(function (y) {
                      if (0 !== y.length) {
                        var b = 0,
                          S = y[y.length - 1],
                          r = function () {
                            var L = y[b++];
                            L === S ? L() : L(r);
                          };
                        r();
                      }
                    })(y);
                  });
                }
              }
            };
        },
        554: (y, b, S) => {
          S.d(b, { Y: () => r });
          var r = function (y) {
            y &&
              y.querySelectorAll("a").forEach(function (y) {
                var b = y.getAttribute("href");
                b &&
                  (b.match(/^.+.(mp4|m4v|ogg|ogv|webm)$/)
                    ? (function (y, b) {
                        y.insertAdjacentHTML(
                          "afterend",
                          '<video controls="controls" src="' + b + '"></video>'
                        ),
                          y.remove();
                      })(y, b)
                    : b.match(/^.+.(mp3|wav|flac)$/)
                    ? (function (y, b) {
                        y.insertAdjacentHTML(
                          "afterend",
                          '<audio controls="controls" src="' + b + '"></audio>'
                        ),
                          y.remove();
                      })(y, b)
                    : (function (y, b) {
                        var S = b.match(
                            /\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?/
                          ),
                          L = b.match(
                            /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/
                          ),
                          H = b.match(
                            /\/\/v\.qq\.com\/x\/cover\/.*\/([^\/]+)\.html\??.*/
                          ),
                          D = b.match(/(?:www\.|\/\/)coub\.com\/view\/(\w+)/),
                          B = b.match(
                            /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/
                          ),
                          U = b.match(
                            /.+dailymotion.com\/(video|hub)\/(\w+)\?/
                          ),
                          F = b.match(
                            /(?:www\.|\/\/)bilibili\.com\/video\/(\w+)/
                          ),
                          Z = b.match(/(?:www\.|\/\/)ted\.com\/talks\/(\w+)/);
                        S && 11 === S[1].length
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video" src="//www.youtube.com/embed/' +
                                S[1] +
                                (S[2] ? "?start=" + S[2] : "") +
                                '"></iframe>'
                            ),
                            y.remove())
                          : L && L[1]
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video" src="//player.youku.com/embed/' +
                                L[1] +
                                '"></iframe>'
                            ),
                            y.remove())
                          : H && H[1]
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video" src="https://v.qq.com/txp/iframe/player.html?vid=' +
                                H[1] +
                                '"></iframe>'
                            ),
                            y.remove())
                          : D && D[1]
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video"\n src="//coub.com/embed/' +
                                D[1] +
                                '?muted=false&autostart=false&originalSize=true&startWithHD=true"></iframe>'
                            ),
                            y.remove())
                          : B && B[0]
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video"\n src="https://www.facebook.com/plugins/video.php?href=' +
                                encodeURIComponent(B[0]) +
                                '"></iframe>'
                            ),
                            y.remove())
                          : U && U[2]
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video"\n src="https://www.dailymotion.com/embed/video/' +
                                U[2] +
                                '"></iframe>'
                            ),
                            y.remove())
                          : F && F[1]
                          ? (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video"\n src="//player.bilibili.com/player.html?bvid=' +
                                F[1] +
                                '"></iframe>'
                            ),
                            y.remove())
                          : Z &&
                            Z[1] &&
                            (y.insertAdjacentHTML(
                              "afterend",
                              '<iframe class="iframe__video" src="//embed.ted.com/talks/' +
                                Z[1] +
                                '"></iframe>'
                            ),
                            y.remove());
                      })(y, b));
              });
          };
        },
        40: (y, b, S) => {
          S.d(b, { i: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b, S) {
              void 0 === b && (b = L.g.CDN);
              var B = D.mermaidRenderAdapter.getElements(y);
              0 !== B.length &&
                (0, H.G)(
                  b + "/dist/js/mermaid/mermaid.min.js",
                  "vditorMermaidScript"
                ).then(function () {
                  var y = {
                    securityLevel: "loose",
                    altFontFamily: "sans-serif",
                    fontFamily: "sans-serif",
                    startOnLoad: !1,
                    flowchart: { htmlLabels: !0, useMaxWidth: !0 },
                    sequence: {
                      useMaxWidth: !0,
                      diagramMarginX: 8,
                      diagramMarginY: 8,
                      boxMargin: 8,
                    },
                    gantt: { leftPadding: 75, rightPadding: 20 },
                  };
                  "dark" === S && (y.theme = "dark"),
                    mermaid.initialize(y),
                    B.forEach(function (y) {
                      var b = D.mermaidRenderAdapter.getCode(y);
                      "true" !== y.getAttribute("data-processed") &&
                        "" !== b.trim() &&
                        (mermaid.init(void 0, y),
                        y.setAttribute("data-processed", "true"));
                    });
                });
            };
        },
        749: (y, b, S) => {
          S.d(b, { P: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b, S) {
              void 0 === y && (y = document), void 0 === b && (b = L.g.CDN);
              var B = D.mindmapRenderAdapter.getElements(y);
              B.length > 0 &&
                (0, H.G)(
                  b + "/dist/js/echarts/echarts.min.js",
                  "vditorEchartsScript"
                ).then(function () {
                  B.forEach(function (y) {
                    if (
                      !y.parentElement.classList.contains(
                        "vditor-wysiwyg__pre"
                      ) &&
                      !y.parentElement.classList.contains(
                        "vditor-ir__marker--pre"
                      )
                    ) {
                      var b = D.mindmapRenderAdapter.getCode(y);
                      if (b)
                        try {
                          if ("true" === y.getAttribute("data-processed"))
                            return;
                          echarts
                            .init(y, "dark" === S ? "dark" : void 0)
                            .setOption({
                              series: [
                                {
                                  data: [JSON.parse(decodeURIComponent(b))],
                                  initialTreeDepth: -1,
                                  itemStyle: {
                                    borderWidth: 0,
                                    color: "#4285f4",
                                  },
                                  label: {
                                    backgroundColor: "#f6f8fa",
                                    borderColor: "#d1d5da",
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    color: "#586069",
                                    lineHeight: 20,
                                    offset: [-5, 0],
                                    padding: [0, 5],
                                    position: "insideRight",
                                  },
                                  lineStyle: { color: "#d1d5da", width: 1 },
                                  roam: !0,
                                  symbol: function (y, b) {
                                    var S;
                                    return (
                                      null ===
                                        (S = null == b ? void 0 : b.data) ||
                                      void 0 === S
                                        ? void 0
                                        : S.children
                                    )
                                      ? "circle"
                                      : "path://";
                                  },
                                  type: "tree",
                                },
                              ],
                              tooltip: {
                                trigger: "item",
                                triggerOn: "mousemove",
                              },
                            }),
                            y.setAttribute("data-processed", "true");
                        } catch (b) {
                          (y.className = "vditor-reset--error"),
                            (y.innerHTML = "mindmap render error: <br>" + b);
                        }
                    }
                  });
                });
            };
        },
        818: (y, b, S) => {
          S.d(b, { k: () => o });
          var L = S(64),
            H = S(466),
            o = function (y, b, S) {
              var D = "",
                B = [];
              if (
                (Array.from(y.children).forEach(function (y, b) {
                  if ((0, L.W)(y)) {
                    if (S) {
                      var H = y.id.lastIndexOf("_");
                      y.id = y.id.substring(0, -1 === H ? void 0 : H) + "_" + b;
                    }
                    B.push(y.id), (D += y.outerHTML.replace("<wbr>", ""));
                  }
                }),
                "" === D)
              )
                return (b.innerHTML = ""), "";
              var U = document.createElement("div");
              if (S)
                S.lute.SetToC(!0),
                  "wysiwyg" !== S.currentMode || S.preview.element.contains(y)
                    ? "ir" !== S.currentMode || S.preview.element.contains(y)
                      ? (U.innerHTML = S.lute.HTML2VditorDOM(
                          "<p>[ToC]</p>" + D
                        ))
                      : (U.innerHTML = S.lute.SpinVditorIRDOM(
                          "<p>[ToC]</p>" + D
                        ))
                    : (U.innerHTML = S.lute.SpinVditorDOM("<p>[ToC]</p>" + D)),
                  S.lute.SetToC(S.options.preview.markdown.toc);
              else {
                b.classList.add("vditor-outline");
                var F = Lute.New();
                F.SetToC(!0),
                  (U.innerHTML = F.HTML2VditorDOM("<p>[ToC]</p>" + D));
              }
              var Z = U.firstElementChild.querySelectorAll(
                "li > span[data-target-id]"
              );
              return (
                Z.forEach(function (y, b) {
                  if (
                    y.nextElementSibling &&
                    "UL" === y.nextElementSibling.tagName
                  ) {
                    var S =
                      "<svg class='vditor-outline__action'><use xlink:href='#vditor-icon-down'></use></svg>";
                    document.getElementById("vditorIconScript") ||
                      (S =
                        '<svg class="vditor-outline__action" viewBox="0 0 32 32"><path d="M3.76 6.12l12.24 12.213 12.24-12.213 3.76 3.76-16 16-16-16 3.76-3.76z"></path></svg>'),
                      (y.innerHTML = S + "<span>" + y.innerHTML + "</span>");
                  } else y.innerHTML = "<svg></svg><span>" + y.innerHTML + "</span>";
                  y.setAttribute("data-target-id", B[b]);
                }),
                (D = U.firstElementChild.innerHTML),
                0 === Z.length
                  ? ((b.innerHTML = ""), D)
                  : ((b.innerHTML = D),
                    S &&
                      (0, H.H)(b, {
                        cdn: S.options.cdn,
                        math: S.options.preview.math,
                      }),
                    b.firstElementChild.addEventListener("click", function (L) {
                      for (var H = L.target; H && !H.isEqualNode(b); ) {
                        if (H.classList.contains("vditor-outline__action")) {
                          H.classList.contains("vditor-outline__action--close")
                            ? (H.classList.remove(
                                "vditor-outline__action--close"
                              ),
                              H.parentElement.nextElementSibling.setAttribute(
                                "style",
                                "display:block"
                              ))
                            : (H.classList.add("vditor-outline__action--close"),
                              H.parentElement.nextElementSibling.setAttribute(
                                "style",
                                "display:none"
                              )),
                            L.preventDefault(),
                            L.stopPropagation();
                          break;
                        }
                        if (H.getAttribute("data-target-id")) {
                          L.preventDefault(), L.stopPropagation();
                          var D = document.getElementById(
                            H.getAttribute("data-target-id")
                          );
                          if (!D) return;
                          if (S)
                            if ("auto" === S.options.height) {
                              var B = D.offsetTop + S.element.offsetTop;
                              S.options.toolbarConfig.pin ||
                                (B += S.toolbar.element.offsetHeight),
                                window.scrollTo(window.scrollX, B);
                            } else
                              S.element.offsetTop < window.scrollY &&
                                window.scrollTo(
                                  window.scrollX,
                                  S.element.offsetTop
                                ),
                                S.preview.element.contains(y)
                                  ? (y.parentElement.scrollTop = D.offsetTop)
                                  : (y.scrollTop = D.offsetTop);
                          else window.scrollTo(window.scrollX, D.offsetTop);
                          break;
                        }
                        H = H.parentElement;
                      }
                    }),
                    D)
              );
            };
        },
        408: (y, b, S) => {
          S.d(b, { B: () => a });
          var L = S(54),
            H = S(526),
            D = S(156),
            a = function (y, b) {
              void 0 === y && (y = document), void 0 === b && (b = L.g.CDN);
              var S = D.plantumlRenderAdapter.getElements(y);
              0 !== S.length &&
                (0, H.G)(
                  b + "/dist/js/plantuml/plantuml-encoder.min.js",
                  "vditorPlantumlScript"
                ).then(function () {
                  S.forEach(function (y) {
                    if (
                      !y.parentElement.classList.contains(
                        "vditor-wysiwyg__pre"
                      ) &&
                      !y.parentElement.classList.contains(
                        "vditor-ir__marker--pre"
                      )
                    ) {
                      var b = D.plantumlRenderAdapter.getCode(y).trim();
                      if (b)
                        try {
                          y.innerHTML =
                            '<img src="http://www.plantuml.com/plantuml/svg/~1' +
                            plantumlEncoder.encode(b) +
                            '">';
                        } catch (b) {
                          (y.className = "vditor-reset--error"),
                            (y.innerHTML = "plantuml render error: <br>" + b);
                        }
                    }
                  });
                });
            };
        },
        895: (y, b, S) => {
          S.d(b, { X: () => r });
          var r = function (y) {
            var b = Lute.New();
            return (
              b.PutEmojis(y.emojis),
              b.SetEmojiSite(y.emojiSite),
              b.SetHeadingAnchor(y.headingAnchor),
              b.SetInlineMathAllowDigitAfterOpenMarker(y.inlineMathDigit),
              b.SetAutoSpace(y.autoSpace),
              b.SetToC(y.toc),
              b.SetFootnotes(y.footnotes),
              b.SetFixTermTypo(y.fixTermTypo),
              b.SetVditorCodeBlockPreview(y.codeBlockPreview),
              b.SetVditorMathBlockPreview(y.mathBlockPreview),
              b.SetSanitize(y.sanitize),
              b.SetChineseParagraphBeginningSpace(y.paragraphBeginningSpace),
              b.SetRenderListStyle(y.listStyle),
              b.SetLinkBase(y.linkBase),
              b.SetLinkPrefix(y.linkPrefix),
              b.SetMark(y.mark),
              y.lazyLoadImage && b.SetImageLazyLoading(y.lazyLoadImage),
              b
            );
          };
        },
        863: (y, b, S) => {
          S.d(b, { E: () => r });
          var r = function (y, b, S) {
            void 0 === b && (b = "zh_CN"), void 0 === S && (S = "classic");
            var L = y.getBoundingClientRect();
            document.body.insertAdjacentHTML(
              "beforeend",
              '<div class="vditor vditor-img' +
                ("dark" === S ? " vditor--dark" : "") +
                '">\n    <div class="vditor-img__bar">\n      <span class="vditor-img__btn" data-deg="0">\n        <svg><use xlink:href="#vditor-icon-redo"></use></svg>\n        ' +
                window.VditorI18n.spin +
                "\n      </span>\n      <span class=\"vditor-img__btn\"  onclick=\"this.parentElement.parentElement.outerHTML = '';document.body.style.overflow = ''\">\n        X &nbsp;" +
                window.VditorI18n.close +
                '\n      </span>\n    </div>\n    <div class="vditor-img__img" onclick="this.parentElement.outerHTML = \'\';document.body.style.overflow = \'\'">\n      <img style="width: ' +
                y.width +
                "px;height:" +
                y.height +
                "px;transform: translate3d(" +
                L.left +
                "px, " +
                (L.top - 36) +
                'px, 0)" src="' +
                y.getAttribute("src") +
                '">\n    </div>\n</div>'
            ),
              (document.body.style.overflow = "hidden");
            var H = document.querySelector(".vditor-img img"),
              D =
                "translate3d(" +
                Math.max(0, window.innerWidth - y.naturalWidth) / 2 +
                "px, " +
                Math.max(0, window.innerHeight - 36 - y.naturalHeight) / 2 +
                "px, 0)";
            setTimeout(function () {
              H.setAttribute(
                "style",
                "transition: transform .3s ease-in-out;transform: " + D
              ),
                setTimeout(function () {
                  H.parentElement.scrollTo(
                    (H.parentElement.scrollWidth -
                      H.parentElement.clientWidth) /
                      2,
                    (H.parentElement.scrollHeight -
                      H.parentElement.clientHeight) /
                      2
                  );
                }, 400);
            });
            var B = document.querySelector(".vditor-img__btn");
            B.addEventListener("click", function () {
              var b = parseInt(B.getAttribute("data-deg"), 10) + 90;
              (b / 90) % 2 == 1 && y.naturalWidth > H.parentElement.clientHeight
                ? (H.style.transform =
                    "translate3d(" +
                    Math.max(0, window.innerWidth - y.naturalWidth) / 2 +
                    "px, " +
                    (y.naturalWidth / 2 - y.naturalHeight / 2) +
                    "px, 0) rotateZ(" +
                    b +
                    "deg)")
                : (H.style.transform = D + " rotateZ(" + b + "deg)"),
                B.setAttribute("data-deg", b.toString()),
                setTimeout(function () {
                  H.parentElement.scrollTo(
                    (H.parentElement.scrollWidth -
                      H.parentElement.clientWidth) /
                      2,
                    (H.parentElement.scrollHeight -
                      H.parentElement.clientHeight) /
                      2
                  );
                }, 400);
            });
          };
        },
        312: (y, b, S) => {
          S.d(b, { Y: () => o });
          var L = S(54),
            H = S(578),
            o = function (y, b) {
              void 0 === b && (b = L.g.CDN),
                L.g.CODE_THEME.includes(y) || (y = "github");
              var S = document.getElementById("vditorHljsStyle"),
                D = b + "/dist/js/highlight.js/styles/" + y + ".css";
              S
                ? S.href !== D && (S.remove(), (0, H.c)(D, "vditorHljsStyle"))
                : (0, H.c)(D, "vditorHljsStyle");
            };
        },
        227: (y, b, S) => {
          S.d(b, { Z: () => i });
          var L = S(578),
            i = function (y, b) {
              if (y && b) {
                var S = document.getElementById("vditorContentTheme"),
                  H = b + "/" + y + ".css";
                S
                  ? S.getAttribute("href") !== H &&
                    (S.remove(), (0, L.c)(H, "vditorContentTheme"))
                  : (0, L.c)(H, "vditorContentTheme");
              }
            };
        },
        526: (y, b, S) => {
          S.d(b, { J: () => r, G: () => i });
          var r = function (y, b) {
              if (document.getElementById(b)) return !1;
              var S = new XMLHttpRequest();
              S.open("GET", y, !1),
                S.setRequestHeader(
                  "Accept",
                  "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01"
                ),
                S.send("");
              var L = document.createElement("script");
              (L.type = "text/javascript"),
                (L.text = S.responseText),
                (L.id = b),
                document.head.appendChild(L);
            },
            i = function (y, b) {
              return new Promise(function (S, L) {
                if (document.getElementById(b)) return S(), !1;
                var H = document.createElement("script");
                (H.src = y),
                  (H.async = !0),
                  document.head.appendChild(H),
                  (H.onload = function () {
                    if (document.getElementById(b)) return H.remove(), S(), !1;
                    (H.id = b), S();
                  });
              });
            };
        },
        578: (y, b, S) => {
          S.d(b, { c: () => r });
          var r = function (y, b) {
            if (!document.getElementById(b)) {
              var S = document.createElement("link");
              (S.id = b),
                (S.rel = "stylesheet"),
                (S.type = "text/css"),
                (S.href = y),
                document.getElementsByTagName("head")[0].appendChild(S);
            }
          };
        },
        51: (y, b, S) => {
          S.d(b, { X: () => r });
          var r = function (y) {
            return y.replace(/\u00a0/g, " ");
          };
        },
        794: (y, b, S) => {
          S.d(b, {
            G6: () => r,
            vU: () => i,
            pK: () => o,
            Le: () => a,
            yl: () => l,
            ns: () => s,
            i7: () => d,
          });
          var r = function () {
              return (
                navigator.userAgent.indexOf("Safari") > -1 &&
                -1 === navigator.userAgent.indexOf("Chrome")
              );
            },
            i = function () {
              return navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            },
            o = function () {
              try {
                return "undefined" != typeof localStorage;
              } catch (y) {
                return !1;
              }
            },
            a = function () {
              return navigator.userAgent.indexOf("iPhone") > -1
                ? "touchstart"
                : "click";
            },
            l = function (y) {
              return navigator.platform.toUpperCase().indexOf("MAC") >= 0
                ? !(!y.metaKey || y.ctrlKey)
                : !(y.metaKey || !y.ctrlKey);
            },
            s = function (y) {
              return (
                /Mac/.test(navigator.platform) ||
                "iPhone" === navigator.platform
                  ? y.indexOf("⇧") > -1 &&
                    i() &&
                    (y = y
                      .replace(";", ":")
                      .replace("=", "+")
                      .replace("-", "_"))
                  : (y = (y = y.startsWith("⌘")
                      ? y.replace("⌘", "⌘+")
                      : y.startsWith("⌥") && "⌘" !== y.substr(1, 1)
                      ? y.replace("⌥", "⌥+")
                      : y.replace("⇧⌘", "⌘+⇧+").replace("⌥⌘", "⌥+⌘+"))
                      .replace("⌘", "Ctrl")
                      .replace("⇧", "Shift")
                      .replace("⌥", "Alt")).indexOf("Shift") > -1 &&
                    (y = y
                      .replace(";", ":")
                      .replace("=", "+")
                      .replace("-", "_")),
                y
              );
            },
            d = function () {
              return (
                /Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor)
              );
            };
        },
        827: (y, b, S) => {
          S.d(b, {
            JQ: () => i,
            E2: () => o,
            O9: () => a,
            a1: () => l,
            F9: () => s,
            lG: () => d,
            fb: () => c,
            DX: () => u,
          });
          var L = S(64),
            i = function (y, b) {
              for (
                var S = c(y, b), L = !1, H = !1;
                S && !S.classList.contains("vditor-reset") && !H;

              )
                (L = c(S.parentElement, b)) ? (S = L) : (H = !0);
              return S || !1;
            },
            o = function (y, b) {
              for (
                var S = (0, L.S)(y, b), H = !1, D = !1;
                S && !S.classList.contains("vditor-reset") && !D;

              )
                (H = (0, L.S)(S.parentElement, b)) ? (S = H) : (D = !0);
              return S || !1;
            },
            a = function (y) {
              var b = o(y, "UL"),
                S = o(y, "OL"),
                L = b;
              return S && (!b || (b && S.contains(b))) && (L = S), L;
            },
            l = function (y, b, S) {
              if (!y) return !1;
              3 === y.nodeType && (y = y.parentElement);
              for (
                var L = y, H = !1;
                L && !H && !L.classList.contains("vditor-reset");

              )
                L.getAttribute(b) === S ? (H = !0) : (L = L.parentElement);
              return H && L;
            },
            s = function (y) {
              if (!y) return !1;
              3 === y.nodeType && (y = y.parentElement);
              var b = y,
                S = !1,
                L = l(y, "data-block", "0");
              if (L) return L;
              for (; b && !S && !b.classList.contains("vditor-reset"); )
                "H1" === b.tagName ||
                "H2" === b.tagName ||
                "H3" === b.tagName ||
                "H4" === b.tagName ||
                "H5" === b.tagName ||
                "H6" === b.tagName ||
                "P" === b.tagName ||
                "BLOCKQUOTE" === b.tagName ||
                "OL" === b.tagName ||
                "UL" === b.tagName
                  ? (S = !0)
                  : (b = b.parentElement);
              return S && b;
            },
            d = function (y, b) {
              if (!y) return !1;
              3 === y.nodeType && (y = y.parentElement);
              for (
                var S = y, L = !1;
                S && !L && !S.classList.contains("vditor-reset");

              )
                S.nodeName === b ? (L = !0) : (S = S.parentElement);
              return L && S;
            },
            c = function (y, b) {
              if (!y) return !1;
              3 === y.nodeType && (y = y.parentElement);
              for (
                var S = y, L = !1;
                S && !L && !S.classList.contains("vditor-reset");

              )
                S.classList.contains(b) ? (L = !0) : (S = S.parentElement);
              return L && S;
            },
            u = function (y) {
              for (; y && y.lastChild; ) y = y.lastChild;
              return y;
            };
        },
        64: (y, b, S) => {
          S.d(b, { S: () => r, W: () => i });
          var r = function (y, b) {
              if (!y) return !1;
              3 === y.nodeType && (y = y.parentElement);
              for (
                var S = y, L = !1;
                S && !L && !S.classList.contains("vditor-reset");

              )
                0 === S.nodeName.indexOf(b) ? (L = !0) : (S = S.parentElement);
              return L && S;
            },
            i = function (y) {
              var b = r(y, "H");
              return !(!b || 2 !== b.tagName.length || "HR" === b.tagName) && b;
            };
        },
        640: (y, b, S) => {
          S.d(b, { T: () => r });
          var r = function () {
            for (var y = [], b = 0; b < arguments.length; b++)
              y[b] = arguments[b];
            for (
              var S = {},
                i = function (y) {
                  for (var b in y)
                    y.hasOwnProperty(b) &&
                      ("[object Object]" ===
                      Object.prototype.toString.call(y[b])
                        ? (S[b] = r(S[b], y[b]))
                        : (S[b] = y[b]));
                },
                L = 0;
              L < y.length;
              L++
            )
              i(y[L]);
            return S;
          };
        },
        393: (y, b, S) => {
          S.d(b, {
            zh: () => a,
            Ny: () => l,
            Gb: () => s,
            Hc: () => d,
            im: () => c,
            $j: () => u,
            ib: () => p,
            oC: () => m,
          });
          var L = S(54),
            H = S(794),
            D = S(827),
            a = function (y) {
              var b,
                S = y[y.currentMode].element;
              return getSelection().rangeCount > 0 &&
                ((b = getSelection().getRangeAt(0)),
                S.isEqualNode(b.startContainer) || S.contains(b.startContainer))
                ? b
                : y[y.currentMode].range
                ? y[y.currentMode].range
                : (S.focus(),
                  (b = S.ownerDocument.createRange()).setStart(S, 0),
                  b.collapse(!0),
                  b);
            },
            l = function (y) {
              var b = window.getSelection().getRangeAt(0);
              if (
                !y.contains(b.startContainer) &&
                !(0, D.fb)(b.startContainer, "vditor-panel--none")
              )
                return { left: 0, top: 0 };
              var S,
                L = y.parentElement.getBoundingClientRect();
              if (0 === b.getClientRects().length)
                if (3 === b.startContainer.nodeType) {
                  var H = b.startContainer.parentElement;
                  if (!(H && H.getClientRects().length > 0))
                    return { left: 0, top: 0 };
                  S = H.getClientRects()[0];
                } else {
                  var B = b.startContainer.children;
                  if (
                    B[b.startOffset] &&
                    B[b.startOffset].getClientRects().length > 0
                  )
                    S = B[b.startOffset].getClientRects()[0];
                  else if (b.startContainer.childNodes.length > 0) {
                    var U = b.cloneRange();
                    b.selectNode(
                      b.startContainer.childNodes[
                        Math.max(0, b.startOffset - 1)
                      ]
                    ),
                      (S = b.getClientRects()[0]),
                      b.setEnd(U.endContainer, U.endOffset),
                      b.setStart(U.startContainer, U.startOffset);
                  } else S = b.startContainer.getClientRects()[0];
                  if (!S) {
                    for (
                      var F = b.startContainer.childNodes[b.startOffset];
                      !F.getClientRects ||
                      (F.getClientRects && 0 === F.getClientRects().length);

                    )
                      F = F.parentElement;
                    S = F.getClientRects()[0];
                  }
                }
              else S = b.getClientRects()[0];
              return { left: S.left - L.left, top: S.top - L.top };
            },
            s = function (y, b) {
              if (!b) {
                if (0 === getSelection().rangeCount) return !1;
                b = getSelection().getRangeAt(0);
              }
              var S = b.commonAncestorContainer;
              return y.isEqualNode(S) || y.contains(S);
            },
            d = function (y) {
              var b = window.getSelection();
              b.removeAllRanges(), b.addRange(y);
            },
            c = function (y, b, S) {
              var L = { end: 0, start: 0 };
              if (!S) {
                if (0 === getSelection().rangeCount) return L;
                S = window.getSelection().getRangeAt(0);
              }
              if (s(b, S)) {
                var H = S.cloneRange();
                y.childNodes[0] && y.childNodes[0].childNodes[0]
                  ? H.setStart(y.childNodes[0].childNodes[0], 0)
                  : H.selectNodeContents(y),
                  H.setEnd(S.startContainer, S.startOffset),
                  (L.start = H.toString().length),
                  (L.end = L.start + S.toString().length);
              }
              return L;
            },
            u = function (y, b, S) {
              var L = 0,
                H = 0,
                D = S.childNodes[H],
                B = !1,
                U = !1;
              (y = Math.max(0, y)), (b = Math.max(0, b));
              var F = S.ownerDocument.createRange();
              for (F.setStart(D || S, 0), F.collapse(!0); !U && D; ) {
                var Z = L + D.textContent.length;
                if (
                  !B &&
                  y >= L &&
                  y <= Z &&
                  (0 === y
                    ? F.setStart(D, 0)
                    : 3 === D.childNodes[0].nodeType
                    ? F.setStart(D.childNodes[0], y - L)
                    : D.nextSibling
                    ? F.setStartBefore(D.nextSibling)
                    : F.setStartAfter(D),
                  (B = !0),
                  y === b)
                ) {
                  U = !0;
                  break;
                }
                B &&
                  b >= L &&
                  b <= Z &&
                  (0 === b
                    ? F.setEnd(D, 0)
                    : 3 === D.childNodes[0].nodeType
                    ? F.setEnd(D.childNodes[0], b - L)
                    : D.nextSibling
                    ? F.setEndBefore(D.nextSibling)
                    : F.setEndAfter(D),
                  (U = !0)),
                  (L = Z),
                  (D = S.childNodes[++H]);
              }
              return (
                !U &&
                  S.childNodes[H - 1] &&
                  F.setStartBefore(S.childNodes[H - 1]),
                d(F),
                F
              );
            },
            p = function (y, b) {
              var S = y.querySelector("wbr");
              if (S) {
                if (S.previousElementSibling)
                  if (S.previousElementSibling.isSameNode(S.previousSibling)) {
                    if (S.previousElementSibling.lastChild)
                      return (
                        b.setStartBefore(S),
                        b.collapse(!0),
                        d(b),
                        !(0, H.i7)() ||
                          ("EM" !== S.previousElementSibling.tagName &&
                            "STRONG" !== S.previousElementSibling.tagName &&
                            "S" !== S.previousElementSibling.tagName) ||
                          (b.insertNode(document.createTextNode(L.g.ZWSP)),
                          b.collapse(!1)),
                        void S.remove()
                      );
                    b.setStartAfter(S.previousElementSibling);
                  } else
                    b.setStart(
                      S.previousSibling,
                      S.previousSibling.textContent.length
                    );
                else
                  S.previousSibling
                    ? b.setStart(
                        S.previousSibling,
                        S.previousSibling.textContent.length
                      )
                    : S.nextSibling
                    ? 3 === S.nextSibling.nodeType
                      ? b.setStart(S.nextSibling, 0)
                      : b.setStartBefore(S.nextSibling)
                    : b.setStart(S.parentElement, 0);
                b.collapse(!0), S.remove(), d(b);
              }
            },
            m = function (y, b) {
              var S = document.createElement("div");
              S.innerHTML = y;
              var L = S.querySelectorAll("p");
              1 === L.length &&
                !L[0].previousSibling &&
                !L[0].nextSibling &&
                b[b.currentMode].element.children.length > 0 &&
                "P" === S.firstElementChild.tagName &&
                (y = L[0].innerHTML.trim());
              var H = document.createElement("div");
              H.innerHTML = y;
              var B = a(b);
              if (
                ("" !== B.toString() &&
                  ((b[b.currentMode].preventInput = !0),
                  document.execCommand("delete", !1, "")),
                H.firstElementChild &&
                  "0" === H.firstElementChild.getAttribute("data-block"))
              ) {
                H.lastElementChild.insertAdjacentHTML("beforeend", "<wbr>");
                var U = (0, D.F9)(B.startContainer);
                U
                  ? U.insertAdjacentHTML("afterend", H.innerHTML)
                  : b[b.currentMode].element.insertAdjacentHTML(
                      "beforeend",
                      H.innerHTML
                    ),
                  p(b[b.currentMode].element, B);
              } else {
                var F = document.createElement("template");
                (F.innerHTML = y),
                  B.insertNode(F.content.cloneNode(!0)),
                  B.collapse(!1),
                  d(B);
              }
            };
        },
      },
      S = {};
    function n(y) {
      var L = S[y];
      if (void 0 !== L) return L.exports;
      var H = (S[y] = { exports: {} });
      return b[y](H, H.exports, n), H.exports;
    }
    (n.d = (y, b) => {
      for (var S in b)
        n.o(b, S) &&
          !n.o(y, S) &&
          Object.defineProperty(y, S, { enumerable: !0, get: b[S] });
    }),
      (n.o = (y, b) => Object.prototype.hasOwnProperty.call(y, b)),
      (n.r = (y) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(y, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(y, "__esModule", { value: !0 });
      });
    var L = {};
    return (
      (() => {
        n.d(L, { default: () => cr });
        var b,
          S = n(872),
          H = n(54),
          D = n(51),
          a = function (y) {
            return "sv" === y.currentMode
              ? (0, D.X)(
                  (y.sv.element.textContent + "\n").replace(/\n\n$/, "\n")
                )
              : "wysiwyg" === y.currentMode
              ? y.lute.VditorDOM2Md(y.wysiwyg.element.innerHTML)
              : "ir" === y.currentMode
              ? y.lute.VditorIRDOM2Md(y.ir.element.innerHTML)
              : "";
          },
          B = n(526),
          U = (function () {
            function e() {
              ((this || y).element = document.createElement("div")),
                ((this || y).element.className = "vditor-devtools"),
                ((this || y).element.innerHTML =
                  '<div class="vditor-reset--error"></div><div style="height: 100%;"></div>');
            }
            return (
              (e.prototype.renderEchart = function (b) {
                var S = this || y;
                "block" === b.devtools.element.style.display &&
                  (0, B.G)(
                    b.options.cdn + "/dist/js/echarts/echarts.min.js",
                    "vditorEchartsScript"
                  ).then(function () {
                    S.ASTChart ||
                      (S.ASTChart = echarts.init(
                        b.devtools.element.lastElementChild
                      ));
                    try {
                      (S.element.lastElementChild.style.display = "block"),
                        (S.element.firstElementChild.innerHTML = ""),
                        S.ASTChart.setOption({
                          series: [
                            {
                              data: JSON.parse(b.lute.RenderEChartsJSON(a(b))),
                              initialTreeDepth: -1,
                              label: {
                                align: "left",
                                backgroundColor: "rgba(68, 77, 86, .68)",
                                borderRadius: 3,
                                color: "#d1d5da",
                                fontSize: 12,
                                lineHeight: 12,
                                offset: [9, 12],
                                padding: [2, 4, 2, 4],
                                position: "top",
                                verticalAlign: "middle",
                              },
                              lineStyle: {
                                color: "#4285f4",
                                type: "curve",
                                width: 1,
                              },
                              orient: "vertical",
                              roam: !0,
                              type: "tree",
                            },
                          ],
                          toolbox: {
                            bottom: 25,
                            emphasis: { iconStyle: { color: "#4285f4" } },
                            feature: {
                              restore: { show: !0 },
                              saveAsImage: { show: !0 },
                            },
                            right: 15,
                            show: !0,
                          },
                        }),
                        S.ASTChart.resize();
                    } catch (y) {
                      (S.element.lastElementChild.style.display = "none"),
                        (S.element.firstElementChild.innerHTML = y);
                    }
                  });
              }),
              e
            );
          })(),
          F = n(794),
          c = function (y, b) {
            b.forEach(function (b) {
              if (y[b]) {
                var S = y[b].children[0];
                S &&
                  S.classList.contains("vditor-menu--current") &&
                  S.classList.remove("vditor-menu--current");
              }
            });
          },
          u = function (y, b) {
            b.forEach(function (b) {
              if (y[b]) {
                var S = y[b].children[0];
                S &&
                  !S.classList.contains("vditor-menu--current") &&
                  S.classList.add("vditor-menu--current");
              }
            });
          },
          p = function (y, b) {
            b.forEach(function (b) {
              if (y[b]) {
                var S = y[b].children[0];
                S &&
                  S.classList.contains(H.g.CLASS_MENU_DISABLED) &&
                  S.classList.remove(H.g.CLASS_MENU_DISABLED);
              }
            });
          },
          m = function (y, b) {
            b.forEach(function (b) {
              if (y[b]) {
                var S = y[b].children[0];
                S &&
                  !S.classList.contains(H.g.CLASS_MENU_DISABLED) &&
                  S.classList.add(H.g.CLASS_MENU_DISABLED);
              }
            });
          },
          f = function (y, b) {
            b.forEach(function (b) {
              y[b] && y[b] && (y[b].style.display = "none");
            });
          },
          h = function (y, b) {
            b.forEach(function (b) {
              y[b] && y[b] && (y[b].style.display = "block");
            });
          },
          v = function (y, b, S) {
            b.includes("subToolbar") &&
              (y.toolbar.element
                .querySelectorAll(".vditor-hint")
                .forEach(function (y) {
                  (S && y.isEqualNode(S)) || (y.style.display = "none");
                }),
              y.toolbar.elements.emoji &&
                (y.toolbar.elements.emoji.lastElementChild.style.display =
                  "none")),
              b.includes("hint") && (y.hint.element.style.display = "none"),
              y.wysiwyg.popover &&
                b.includes("popover") &&
                (y.wysiwyg.popover.style.display = "none");
          },
          g = function (y, b, S, L) {
            S.addEventListener((0, F.Le)(), function (L) {
              L.preventDefault(),
                L.stopPropagation(),
                S.classList.contains(H.g.CLASS_MENU_DISABLED) ||
                  (y.toolbar.element
                    .querySelectorAll(".vditor-hint--current")
                    .forEach(function (y) {
                      y.classList.remove("vditor-hint--current");
                    }),
                  "block" === b.style.display
                    ? (b.style.display = "none")
                    : (v(
                        y,
                        ["subToolbar", "hint", "popover"],
                        S.parentElement.parentElement
                      ),
                      S.classList.contains("vditor-tooltipped") ||
                        S.classList.add("vditor-hint--current"),
                      (b.style.display = "block"),
                      y.toolbar.element.getBoundingClientRect().right -
                        S.getBoundingClientRect().right <
                      250
                        ? b.classList.add("vditor-panel--left")
                        : b.classList.remove("vditor-panel--left")));
            });
          },
          Z = n(827),
          ye = n(64),
          w = function (y, b, S, L) {
            L && console.log(y + " - " + S + ": " + b);
          },
          we = n(478),
          Dt = n(314),
          Ot = n(730),
          jt = n(66),
          Rt = n(218),
          Pt = n(702),
          qt = n(466),
          Bt = n(40),
          Vt = n(563),
          Ut = n(749),
          Wt = n(408),
          N = function (y, b) {
            if (y)
              if ("html-block" !== y.parentElement.getAttribute("data-type")) {
                var S = y.firstElementChild.className.replace("language-", "");
                "abc" === S
                  ? (0, we.Q)(y, b.options.cdn)
                  : "mermaid" === S
                  ? (0, Bt.i)(y, b.options.cdn, b.options.theme)
                  : "markmap" === S
                  ? (0, Vt.K)(y, b.options.cdn, b.options.theme)
                  : "flowchart" === S
                  ? (0, jt.P)(y, b.options.cdn)
                  : "echarts" === S
                  ? (0, Dt.p)(y, b.options.cdn, b.options.theme)
                  : "mindmap" === S
                  ? (0, Ut.P)(y, b.options.cdn, b.options.theme)
                  : "plantuml" === S
                  ? (0, Wt.B)(y, b.options.cdn)
                  : "graphviz" === S
                  ? (0, Rt.v)(y, b.options.cdn)
                  : "math" === S
                  ? (0, qt.H)(y, {
                      cdn: b.options.cdn,
                      math: b.options.preview.math,
                    })
                  : ((0, Pt.s)(
                      Object.assign({}, b.options.preview.hljs),
                      y,
                      b.options.cdn
                    ),
                    (0, Ot.O)(y)),
                  y.setAttribute("data-render", "1");
              } else y.setAttribute("data-render", "1");
          },
          Kt = n(393),
          O = function (y) {
            if ("sv" !== y.currentMode) {
              var b = y[y.currentMode].element,
                S = y.outline.render(y);
              "" === S && (S = "[ToC]"),
                b
                  .querySelectorAll('[data-type="toc-block"]')
                  .forEach(function (b) {
                    (b.innerHTML = S),
                      (0, qt.H)(b, {
                        cdn: y.options.cdn,
                        math: y.options.preview.math,
                      });
                  });
            }
          },
          I = function (y, b) {
            var S = (0, Z.lG)(y.target, "SPAN");
            if (S && (0, Z.fb)(S, "vditor-toc")) {
              var L = b[b.currentMode].element.querySelector(
                "#" + S.getAttribute("data-target-id")
              );
              if (L)
                if ("auto" === b.options.height) {
                  var H = L.offsetTop + b.element.offsetTop;
                  b.options.toolbarConfig.pin ||
                    (H += b.toolbar.element.offsetHeight),
                    window.scrollTo(window.scrollX, H);
                } else
                  b.element.offsetTop < window.scrollY &&
                    window.scrollTo(window.scrollX, b.element.offsetTop),
                    (b[b.currentMode].element.scrollTop = L.offsetTop);
            }
          },
          j = function (y, b, S, L) {
            if (
              y.previousElementSibling &&
              y.previousElementSibling.classList.contains("vditor-toc")
            ) {
              if (
                "Backspace" === S.key &&
                0 === (0, Kt.im)(y, b[b.currentMode].element, L).start
              )
                return y.previousElementSibling.remove(), dt(b), !0;
              if (nt(b, S, L, y, y.previousElementSibling)) return !0;
            }
            if (
              y.nextElementSibling &&
              y.nextElementSibling.classList.contains("vditor-toc")
            ) {
              if (
                "Delete" === S.key &&
                (0, Kt.im)(y, b[b.currentMode].element, L).start >=
                  y.textContent.trimRight().length
              )
                return y.nextElementSibling.remove(), dt(b), !0;
              if (tt(b, S, L, y, y.nextElementSibling)) return !0;
            }
            if ("Backspace" === S.key || "Delete" === S.key) {
              var H = (0, Z.fb)(L.startContainer, "vditor-toc");
              if (H) return H.remove(), dt(b), !0;
            }
          },
          R = function (y, b, S, L) {
            void 0 === S && (S = !1);
            var D = (0, Z.F9)(b.startContainer);
            if (D && !S && "code-block" !== D.getAttribute("data-type")) {
              if (
                (lt(D.innerHTML) && D.previousElementSibling) ||
                st(D.innerHTML)
              )
                return;
              for (
                var B = (0, Kt.im)(D, y.ir.element, b).start, U = !0, F = B - 1;
                F > D.textContent.substr(0, B).lastIndexOf("\n");
                F--
              )
                if (
                  " " !== D.textContent.charAt(F) &&
                  "\t" !== D.textContent.charAt(F)
                ) {
                  U = !1;
                  break;
                }
              0 === B && (U = !1);
              var we = !0;
              for (F = B - 1; F < D.textContent.length; F++)
                if (
                  " " !== D.textContent.charAt(F) &&
                  "\n" !== D.textContent.charAt(F)
                ) {
                  we = !1;
                  break;
                }
              if (U)
                return void (
                  "function" == typeof y.options.input && y.options.input(a(y))
                );
              if (we && !(0, Z.fb)(b.startContainer, "vditor-ir__marker")) {
                var Dt = b.startContainer.previousSibling;
                return (
                  Dt &&
                    3 !== Dt.nodeType &&
                    Dt.classList.contains("vditor-ir__node--expand") &&
                    Dt.classList.remove("vditor-ir__node--expand"),
                  void (
                    "function" == typeof y.options.input &&
                    y.options.input(a(y))
                  )
                );
              }
            }
            if (
              (y.ir.element
                .querySelectorAll(".vditor-ir__node--expand")
                .forEach(function (y) {
                  y.classList.remove("vditor-ir__node--expand");
                }),
              D || (D = y.ir.element),
              !D.querySelector("wbr"))
            ) {
              var Ot = (0, Z.fb)(b.startContainer, "vditor-ir__preview");
              Ot
                ? Ot.previousElementSibling.insertAdjacentHTML(
                    "beforeend",
                    "<wbr>"
                  )
                : b.insertNode(document.createElement("wbr"));
            }
            D.querySelectorAll("[style]").forEach(function (y) {
              y.removeAttribute("style");
            }),
              "link-ref-defs-block" === D.getAttribute("data-type") &&
                (D = y.ir.element);
            var jt,
              Rt = D.isEqualNode(y.ir.element),
              Pt = (0, Z.a1)(D, "data-type", "footnotes-block"),
              qt = "";
            if (Rt) qt = D.innerHTML;
            else {
              var Bt = (0, ye.S)(b.startContainer, "BLOCKQUOTE"),
                Vt = (0, Z.O9)(b.startContainer);
              if (
                (Vt && (D = Vt),
                Bt && (!Vt || (Vt && !Bt.contains(Vt))) && (D = Bt),
                Pt && (D = Pt),
                (qt = D.outerHTML),
                "UL" === D.tagName || "OL" === D.tagName)
              ) {
                var Ut = D.previousElementSibling,
                  Wt = D.nextElementSibling;
                !Ut ||
                  ("UL" !== Ut.tagName && "OL" !== Ut.tagName) ||
                  ((qt = Ut.outerHTML + qt), Ut.remove()),
                  !Wt ||
                    ("UL" !== Wt.tagName && "OL" !== Wt.tagName) ||
                    ((qt += Wt.outerHTML), Wt.remove()),
                  (qt = qt.replace(
                    "<div><wbr><br></div>",
                    "<li><p><wbr><br></p></li>"
                  ));
              } else
                D.previousElementSibling &&
                  "" !==
                    D.previousElementSibling.textContent.replace(
                      H.g.ZWSP,
                      ""
                    ) &&
                  L &&
                  "insertParagraph" === L.inputType &&
                  ((qt = D.previousElementSibling.outerHTML + qt),
                  D.previousElementSibling.remove());
              D.innerText.startsWith("```") ||
                (y.ir.element
                  .querySelectorAll("[data-type='link-ref-defs-block']")
                  .forEach(function (y) {
                    y && !D.isEqualNode(y) && ((qt += y.outerHTML), y.remove());
                  }),
                y.ir.element
                  .querySelectorAll("[data-type='footnotes-block']")
                  .forEach(function (y) {
                    y && !D.isEqualNode(y) && ((qt += y.outerHTML), y.remove());
                  }));
            }
            if (
              (w("SpinVditorIRDOM", qt, "argument", y.options.debugger),
              (qt = y.lute.SpinVditorIRDOM(qt)),
              w("SpinVditorIRDOM", qt, "result", y.options.debugger),
              Rt)
            )
              D.innerHTML = qt;
            else if (((D.outerHTML = qt), Pt)) {
              var Gt = (0, Z.a1)(
                y.ir.element.querySelector("wbr"),
                "data-type",
                "footnotes-def"
              );
              if (Gt) {
                var Zt = Gt.textContent,
                  Jt = Zt.substring(1, Zt.indexOf("]:")),
                  Xt = y.ir.element.querySelector(
                    'sup[data-type="footnotes-ref"][data-footnotes-label="' +
                      Jt +
                      '"]'
                  );
                Xt &&
                  Xt.setAttribute(
                    "aria-label",
                    Zt.substr(Jt.length + 3)
                      .trim()
                      .substr(0, 24)
                  );
              }
            }
            var Yt,
              Qt = y.ir.element.querySelectorAll(
                "[data-type='link-ref-defs-block']"
              );
            Qt.forEach(function (y, b) {
              0 === b
                ? (jt = y)
                : (jt.insertAdjacentHTML("beforeend", y.innerHTML), y.remove());
            }),
              Qt.length > 0 &&
                y.ir.element.insertAdjacentElement("beforeend", Qt[0]);
            var $t = y.ir.element.querySelectorAll(
              "[data-type='footnotes-block']"
            );
            $t.forEach(function (y, b) {
              0 === b
                ? (Yt = y)
                : (Yt.insertAdjacentHTML("beforeend", y.innerHTML), y.remove());
            }),
              $t.length > 0 &&
                y.ir.element.insertAdjacentElement("beforeend", $t[0]),
              (0, Kt.ib)(y.ir.element, b),
              y.ir.element
                .querySelectorAll(".vditor-ir__preview[data-render='2']")
                .forEach(function (b) {
                  N(b, y);
                }),
              O(y),
              Tt(y, {
                enableAddUndoStack: !0,
                enableHint: !0,
                enableInput: !0,
              });
          },
          P = function (y, b) {
            if ("" === y) return !1;
            if (
              -1 === y.indexOf("⇧") &&
              -1 === y.indexOf("⌘") &&
              -1 === y.indexOf("⌥")
            )
              return !((0, F.yl)(b) || b.altKey || b.shiftKey || b.code !== y);
            if ("⇧Tab" === y)
              return !(
                (0, F.yl)(b) ||
                b.altKey ||
                !b.shiftKey ||
                "Tab" !== b.code
              );
            var S = y.split("");
            if (y.startsWith("⌥")) {
              var L = 3 === S.length ? S[2] : S[1];
              return !(
                (3 === S.length ? !(0, F.yl)(b) : (0, F.yl)(b)) ||
                !b.altKey ||
                b.shiftKey ||
                b.code !== (/^[0-9]$/.test(L) ? "Digit" : "Key") + L
              );
            }
            "⌘Enter" === y && (S = ["⌘", "Enter"]);
            var H = S.length > 2 && "⇧" === S[0],
              D = H ? S[2] : S[1];
            return (
              !H ||
                (!(0, F.vU)() && /Mac/.test(navigator.platform)) ||
                ("-" === D ? (D = "_") : "=" === D && (D = "+")),
              !(
                !(0, F.yl)(b) ||
                b.key.toLowerCase() !== D.toLowerCase() ||
                b.altKey ||
                !((!H && !b.shiftKey) || (H && b.shiftKey))
              )
            );
          },
          q = function (y, b) {
            b.ir.element
              .querySelectorAll(".vditor-ir__node--expand")
              .forEach(function (y) {
                y.classList.remove("vditor-ir__node--expand");
              });
            var S = (0, Z.JQ)(y.startContainer, "vditor-ir__node"),
              L = !y.collapsed && (0, Z.JQ)(y.endContainer, "vditor-ir__node");
            if (y.collapsed || (S && S === L)) {
              S &&
                (S.classList.add("vditor-ir__node--expand"),
                S.classList.remove("vditor-ir__node--hidden"),
                (0, Kt.Hc)(y));
              var H = (function (y) {
                var b = y.startContainer;
                if (3 === b.nodeType && b.nodeValue.length !== y.startOffset)
                  return !1;
                for (var S = b.nextSibling; S && "" === S.textContent; )
                  S = S.nextSibling;
                if (!S) {
                  var L = (0, Z.fb)(b, "vditor-ir__marker");
                  if (L && !L.nextSibling) {
                    var H = b.parentElement.parentElement.nextSibling;
                    if (
                      H &&
                      3 !== H.nodeType &&
                      H.classList.contains("vditor-ir__node")
                    )
                      return H;
                  }
                  return !1;
                }
                return (
                  !(
                    !S ||
                    3 === S.nodeType ||
                    !S.classList.contains("vditor-ir__node") ||
                    S.getAttribute("data-block")
                  ) && S
                );
              })(y);
              if (H)
                return (
                  H.classList.add("vditor-ir__node--expand"),
                  void H.classList.remove("vditor-ir__node--hidden")
                );
              var D = (function (y) {
                var b = y.startContainer,
                  S = b.previousSibling;
                return (
                  !(
                    3 !== b.nodeType ||
                    0 !== y.startOffset ||
                    !S ||
                    3 === S.nodeType ||
                    !S.classList.contains("vditor-ir__node") ||
                    S.getAttribute("data-block")
                  ) && S
                );
              })(y);
              return D
                ? (D.classList.add("vditor-ir__node--expand"),
                  void D.classList.remove("vditor-ir__node--hidden"))
                : void 0;
            }
          },
          Gt = n(863),
          V = function (y, b) {
            var S,
              L = getSelection().getRangeAt(0).cloneRange(),
              H = L.startContainer;
            3 !== L.startContainer.nodeType &&
              "DIV" === L.startContainer.tagName &&
              (H = L.startContainer.childNodes[L.startOffset - 1]);
            var D = (0, Z.a1)(H, "data-block", "0");
            if (
              D &&
              b &&
              ("deleteContentBackward" === b.inputType || " " === b.data)
            ) {
              for (
                var B = (0, Kt.im)(D, y.sv.element, L).start, U = !0, F = B - 1;
                F > D.textContent.substr(0, B).lastIndexOf("\n");
                F--
              )
                if (
                  " " !== D.textContent.charAt(F) &&
                  "\t" !== D.textContent.charAt(F)
                ) {
                  U = !1;
                  break;
                }
              if ((0 === B && (U = !1), U)) return void Ie(y);
              if ("deleteContentBackward" === b.inputType) {
                var ye =
                  (0, Z.a1)(H, "data-type", "code-block-open-marker") ||
                  (0, Z.a1)(H, "data-type", "code-block-close-marker");
                if (ye) {
                  var we;
                  if (
                    "code-block-close-marker" ===
                      ye.getAttribute("data-type") &&
                    (we = Ne(H, "code-block-open-marker"))
                  )
                    return (we.textContent = ye.textContent), void Ie(y);
                  if (
                    "code-block-open-marker" === ye.getAttribute("data-type") &&
                    (we = Ne(H, "code-block-close-marker", !1))
                  )
                    return (we.textContent = ye.textContent), void Ie(y);
                }
                var Dt = (0, Z.a1)(H, "data-type", "math-block-open-marker");
                if (Dt) {
                  var Ot = Dt.nextElementSibling.nextElementSibling;
                  return void (
                    Ot &&
                    "math-block-close-marker" ===
                      Ot.getAttribute("data-type") &&
                    (Ot.remove(), Ie(y))
                  );
                }
                D.querySelectorAll(
                  '[data-type="code-block-open-marker"]'
                ).forEach(function (y) {
                  1 === y.textContent.length && y.remove();
                }),
                  D.querySelectorAll(
                    '[data-type="code-block-close-marker"]'
                  ).forEach(function (y) {
                    1 === y.textContent.length && y.remove();
                  });
                var jt = (0, Z.a1)(H, "data-type", "heading-marker");
                if (jt && -1 === jt.textContent.indexOf("#")) return void Ie(y);
              }
              if (
                (" " === b.data || "deleteContentBackward" === b.inputType) &&
                ((0, Z.a1)(H, "data-type", "padding") ||
                  (0, Z.a1)(H, "data-type", "li-marker") ||
                  (0, Z.a1)(H, "data-type", "task-marker") ||
                  (0, Z.a1)(H, "data-type", "blockquote-marker"))
              )
                return void Ie(y);
            }
            if (D && "$$" === D.textContent.trimRight()) Ie(y);
            else {
              D || (D = y.sv.element),
                "link-ref-defs-block" ===
                  (null === (S = D.firstElementChild) || void 0 === S
                    ? void 0
                    : S.getAttribute("data-type")) && (D = y.sv.element),
                (0, Z.a1)(H, "data-type", "footnotes-link") &&
                  (D = y.sv.element),
                -1 === D.textContent.indexOf(Lute.Caret) &&
                  L.insertNode(document.createTextNode(Lute.Caret)),
                D.querySelectorAll("[style]").forEach(function (y) {
                  y.removeAttribute("style");
                }),
                D.querySelectorAll("font").forEach(function (y) {
                  y.outerHTML = y.innerHTML;
                });
              var Rt,
                Pt = D.textContent,
                qt = D.isEqualNode(y.sv.element);
              qt
                ? (Pt = D.textContent)
                : (D.previousElementSibling &&
                    ((Pt = D.previousElementSibling.textContent + Pt),
                    D.previousElementSibling.remove()),
                  D.previousElementSibling &&
                    0 === Pt.indexOf("---\n") &&
                    ((Pt = D.previousElementSibling.textContent + Pt),
                    D.previousElementSibling.remove()),
                  D.innerText.startsWith("```") ||
                    (y.sv.element
                      .querySelectorAll("[data-type='link-ref-defs-block']")
                      .forEach(function (y, b) {
                        0 === b &&
                          y &&
                          !D.isEqualNode(y.parentElement) &&
                          ((Pt += "\n" + y.parentElement.textContent),
                          y.parentElement.remove());
                      }),
                    y.sv.element
                      .querySelectorAll("[data-type='footnotes-link']")
                      .forEach(function (y, b) {
                        0 === b &&
                          y &&
                          !D.isEqualNode(y.parentElement) &&
                          ((Pt += "\n" + y.parentElement.textContent),
                          y.parentElement.remove());
                      }))),
                (Pt = De(Pt, y)),
                qt ? (D.innerHTML = Pt) : (D.outerHTML = Pt);
              var Bt,
                Vt = y.sv.element.querySelectorAll(
                  "[data-type='link-ref-defs-block']"
                );
              Vt.forEach(function (y, b) {
                0 === b
                  ? (Rt = y.parentElement)
                  : (Rt.lastElementChild.remove(),
                    Rt.insertAdjacentHTML(
                      "beforeend",
                      "" + y.parentElement.innerHTML
                    ),
                    y.parentElement.remove());
              }),
                Vt.length > 0 &&
                  y.sv.element.insertAdjacentElement("beforeend", Rt);
              var Ut = y.sv.element.querySelectorAll(
                "[data-type='footnotes-link']"
              );
              Ut.forEach(function (y, b) {
                0 === b
                  ? (Bt = y.parentElement)
                  : (Bt.lastElementChild.remove(),
                    Bt.insertAdjacentHTML(
                      "beforeend",
                      "" + y.parentElement.innerHTML
                    ),
                    y.parentElement.remove());
              }),
                Ut.length > 0 &&
                  y.sv.element.insertAdjacentElement("beforeend", Bt),
                (0, Kt.ib)(y.sv.element, L),
                Ae(y),
                Ie(y, {
                  enableAddUndoStack: !0,
                  enableHint: !0,
                  enableInput: !0,
                });
            }
          },
          Zt = n(227),
          W = function (y) {
            "dark" === y.options.theme
              ? y.element.classList.add("vditor--dark")
              : y.element.classList.remove("vditor--dark");
          },
          z = function (y) {
            var b = window.innerWidth <= H.g.MOBILE_WIDTH ? 10 : 35;
            if ("none" !== y.wysiwyg.element.parentElement.style.display) {
              var S =
                (y.wysiwyg.element.parentElement.clientWidth -
                  y.options.preview.maxWidth) /
                2;
              y.wysiwyg.element.style.padding = "10px " + Math.max(b, S) + "px";
            }
            if ("none" !== y.ir.element.parentElement.style.display) {
              S =
                (y.ir.element.parentElement.clientWidth -
                  y.options.preview.maxWidth) /
                2;
              y.ir.element.style.padding = "10px " + Math.max(b, S) + "px";
            }
            "block" !== y.preview.element.style.display
              ? (y.toolbar.element.style.paddingLeft =
                  Math.max(
                    5,
                    parseInt(
                      y[y.currentMode].element.style.paddingLeft || "0",
                      10
                    ) +
                      ("left" === y.options.outline.position
                        ? y.outline.element.offsetWidth
                        : 0)
                  ) + "px")
              : (y.toolbar.element.style.paddingLeft =
                  5 +
                  ("left" === y.options.outline.position
                    ? y.outline.element.offsetWidth
                    : 0) +
                  "px");
          },
          G = function (y) {
            if (y.options.typewriterMode) {
              var b = window.innerHeight;
              "number" == typeof y.options.height
                ? ((b = y.options.height),
                  "number" == typeof y.options.minHeight &&
                    (b = Math.max(b, y.options.minHeight)),
                  (b = Math.min(window.innerHeight, b)))
                : (b = y.element.clientHeight),
                y.element.classList.contains("vditor--fullscreen") &&
                  (b = window.innerHeight),
                y[y.currentMode].element.style.setProperty(
                  "--editor-bottom",
                  (b - y.toolbar.element.offsetHeight) / 2 + "px"
                );
            }
          };
        function K() {
          window.removeEventListener("resize", b);
        }
        var Jt,
          Xt,
          J = function (y) {
            G(y),
              K(),
              window.addEventListener(
                "resize",
                (b = function () {
                  z(y), G(y);
                })
              );
            var S = (0, F.pK)() && localStorage.getItem(y.options.cache.id);
            return (
              (y.options.cache.enable && S) ||
                (y.options.value
                  ? (S = y.options.value)
                  : y.originalInnerHTML
                  ? (S = y.lute.HTML2Md(y.originalInnerHTML))
                  : y.options.cache.enable || (S = "")),
              S || ""
            );
          },
          X = function (y) {
            clearTimeout(y[y.currentMode].hlToolbarTimeoutId),
              (y[y.currentMode].hlToolbarTimeoutId = window.setTimeout(
                function () {
                  if (
                    "false" !==
                      y[y.currentMode].element.getAttribute(
                        "contenteditable"
                      ) &&
                    (0, Kt.Gb)(y[y.currentMode].element)
                  ) {
                    c(y.toolbar.elements, H.g.EDIT_TOOLBARS),
                      p(y.toolbar.elements, H.g.EDIT_TOOLBARS);
                    var b = (0, Kt.zh)(y),
                      S = b.startContainer;
                    3 === b.startContainer.nodeType &&
                      (S = b.startContainer.parentElement),
                      S.classList.contains("vditor-reset") &&
                        (S = S.childNodes[b.startOffset]),
                      ("sv" === y.currentMode
                        ? (0, Z.a1)(S, "data-type", "heading")
                        : (0, ye.W)(S)) && u(y.toolbar.elements, ["headings"]),
                      ("sv" === y.currentMode
                        ? (0, Z.a1)(S, "data-type", "blockquote")
                        : (0, Z.lG)(S, "BLOCKQUOTE")) &&
                        u(y.toolbar.elements, ["quote"]),
                      (0, Z.a1)(S, "data-type", "strong") &&
                        u(y.toolbar.elements, ["bold"]),
                      (0, Z.a1)(S, "data-type", "em") &&
                        u(y.toolbar.elements, ["italic"]),
                      (0, Z.a1)(S, "data-type", "s") &&
                        u(y.toolbar.elements, ["strike"]),
                      (0, Z.a1)(S, "data-type", "a") &&
                        u(y.toolbar.elements, ["link"]);
                    var L = (0, Z.lG)(S, "LI");
                    L
                      ? (L.classList.contains("vditor-task")
                          ? u(y.toolbar.elements, ["check"])
                          : "OL" === L.parentElement.tagName
                          ? u(y.toolbar.elements, ["ordered-list"])
                          : "UL" === L.parentElement.tagName &&
                            u(y.toolbar.elements, ["list"]),
                        p(y.toolbar.elements, ["outdent", "indent"]))
                      : m(y.toolbar.elements, ["outdent", "indent"]),
                      (0, Z.a1)(S, "data-type", "code-block") &&
                        (m(y.toolbar.elements, [
                          "headings",
                          "bold",
                          "italic",
                          "strike",
                          "line",
                          "quote",
                          "list",
                          "ordered-list",
                          "check",
                          "code",
                          "inline-code",
                          "upload",
                          "link",
                          "table",
                          "record",
                        ]),
                        u(y.toolbar.elements, ["code"])),
                      (0, Z.a1)(S, "data-type", "code") &&
                        (m(y.toolbar.elements, [
                          "headings",
                          "bold",
                          "italic",
                          "strike",
                          "line",
                          "quote",
                          "list",
                          "ordered-list",
                          "check",
                          "code",
                          "upload",
                          "link",
                          "table",
                          "record",
                        ]),
                        u(y.toolbar.elements, ["inline-code"])),
                      (0, Z.a1)(S, "data-type", "table") &&
                        m(y.toolbar.elements, [
                          "headings",
                          "list",
                          "ordered-list",
                          "check",
                          "line",
                          "quote",
                          "code",
                          "table",
                        ]);
                  }
                },
                200
              ));
          },
          Y = function (y, b) {
            void 0 === b &&
              (b = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }),
              b.enableHint && y.hint.render(y),
              clearTimeout(y.wysiwyg.afterRenderTimeoutId),
              (y.wysiwyg.afterRenderTimeoutId = window.setTimeout(function () {
                if (!y.wysiwyg.composingLock) {
                  var S = a(y);
                  "function" == typeof y.options.input &&
                    b.enableInput &&
                    y.options.input(S),
                    y.options.counter.enable && y.counter.render(y, S),
                    y.options.cache.enable &&
                      (0, F.pK)() &&
                      (localStorage.setItem(y.options.cache.id, S),
                      y.options.cache.after && y.options.cache.after(S)),
                    y.devtools && y.devtools.renderEchart(y),
                    b.enableAddUndoStack && y.undo.addToUndoStack(y);
                }
              }, y.options.undoDelay));
          },
          Q = function (y) {
            for (var b = "", S = y.nextSibling; S; )
              3 === S.nodeType ? (b += S.textContent) : (b += S.outerHTML),
                (S = S.nextSibling);
            return b;
          },
          $ = function (y) {
            for (var b = "", S = y.previousSibling; S; )
              (b = 3 === S.nodeType ? S.textContent + b : S.outerHTML + b),
                (S = S.previousSibling);
            return b;
          },
          ee = function (y, b) {
            Array.from(y.wysiwyg.element.childNodes).find(function (S) {
              if (3 === S.nodeType) {
                var L = document.createElement("p");
                L.setAttribute("data-block", "0"),
                  (L.textContent = S.textContent);
                var H =
                  3 === b.startContainer.nodeType
                    ? b.startOffset
                    : S.textContent.length;
                return (
                  S.parentNode.insertBefore(L, S),
                  S.remove(),
                  b.setStart(
                    L.firstChild,
                    Math.min(L.firstChild.textContent.length, H)
                  ),
                  b.collapse(!0),
                  (0, Kt.Hc)(b),
                  !0
                );
              }
              if (!S.getAttribute("data-block"))
                return (
                  "P" === S.tagName
                    ? S.remove()
                    : ("DIV" === S.tagName
                        ? (b.insertNode(document.createElement("wbr")),
                          (S.outerHTML =
                            '<p data-block="0">' + S.innerHTML + "</p>"))
                        : "BR" === S.tagName
                        ? (S.outerHTML =
                            '<p data-block="0">' + S.outerHTML + "<wbr></p>")
                        : (b.insertNode(document.createElement("wbr")),
                          (S.outerHTML =
                            '<p data-block="0">' + S.outerHTML + "</p>")),
                      (0, Kt.ib)(y.wysiwyg.element, b),
                      (b = getSelection().getRangeAt(0))),
                  !0
                );
            });
          },
          te = function (y, b) {
            var S = (0, Kt.zh)(y),
              L = (0, Z.F9)(S.startContainer);
            L || (L = S.startContainer.childNodes[S.startOffset]),
              L ||
                0 !== y.wysiwyg.element.children.length ||
                (L = y.wysiwyg.element),
              L &&
                !L.classList.contains("vditor-wysiwyg__block") &&
                (S.insertNode(document.createElement("wbr")),
                "<wbr>" === L.innerHTML.trim() && (L.innerHTML = "<wbr><br>"),
                "BLOCKQUOTE" === L.tagName ||
                L.classList.contains("vditor-reset")
                  ? (L.innerHTML =
                      "<" +
                      b +
                      ' data-block="0">' +
                      L.innerHTML.trim() +
                      "</" +
                      b +
                      ">")
                  : (L.outerHTML =
                      "<" +
                      b +
                      ' data-block="0">' +
                      L.innerHTML.trim() +
                      "</" +
                      b +
                      ">"),
                (0, Kt.ib)(y.wysiwyg.element, S),
                O(y));
          },
          ne = function (y) {
            var b = getSelection().getRangeAt(0),
              S = (0, Z.F9)(b.startContainer);
            S || (S = b.startContainer.childNodes[b.startOffset]),
              S &&
                (b.insertNode(document.createElement("wbr")),
                (S.outerHTML = '<p data-block="0">' + S.innerHTML + "</p>"),
                (0, Kt.ib)(y.wysiwyg.element, b)),
              (y.wysiwyg.popover.style.display = "none");
          },
          re = function (y, b, S) {
            void 0 === S && (S = !0);
            var L = y.previousElementSibling,
              H = L.ownerDocument.createRange();
            "CODE" === L.tagName
              ? ((L.style.display = "inline-block"),
                S ? H.setStart(L.firstChild, 1) : H.selectNodeContents(L))
              : ((L.style.display = "block"),
                L.firstChild.firstChild ||
                  L.firstChild.appendChild(document.createTextNode("")),
                H.selectNodeContents(L.firstChild)),
              S ? H.collapse(!0) : H.collapse(!1),
              (0, Kt.Hc)(H),
              y.firstElementChild.classList.contains("language-mindmap") ||
                Ae(b);
          },
          ie = function (y, b) {
            if (P("⇧⌘X", b)) {
              var S = y.wysiwyg.popover.querySelector('[data-type="remove"]');
              return S && S.click(), b.preventDefault(), !0;
            }
          },
          oe = function (y) {
            clearTimeout(y.wysiwyg.hlToolbarTimeoutId),
              (y.wysiwyg.hlToolbarTimeoutId = window.setTimeout(function () {
                if (
                  "false" !==
                    y.wysiwyg.element.getAttribute("contenteditable") &&
                  (0, Kt.Gb)(y.wysiwyg.element)
                ) {
                  c(y.toolbar.elements, H.g.EDIT_TOOLBARS),
                    p(y.toolbar.elements, H.g.EDIT_TOOLBARS);
                  var b = getSelection().getRangeAt(0),
                    S = b.startContainer;
                  S =
                    3 === b.startContainer.nodeType
                      ? b.startContainer.parentElement
                      : S.childNodes[
                          b.startOffset >= S.childNodes.length
                            ? S.childNodes.length - 1
                            : b.startOffset
                        ];
                  var L = (0, Z.a1)(S, "data-type", "footnotes-block");
                  if (L)
                    return (
                      (y.wysiwyg.popover.innerHTML = ""),
                      ce(L, y),
                      void ae(y, L)
                    );
                  var D = (0, Z.lG)(S, "LI");
                  D
                    ? (D.classList.contains("vditor-task")
                        ? u(y.toolbar.elements, ["check"])
                        : "OL" === D.parentElement.tagName
                        ? u(y.toolbar.elements, ["ordered-list"])
                        : "UL" === D.parentElement.tagName &&
                          u(y.toolbar.elements, ["list"]),
                      p(y.toolbar.elements, ["outdent", "indent"]))
                    : m(y.toolbar.elements, ["outdent", "indent"]),
                    (0, Z.lG)(S, "BLOCKQUOTE") &&
                      u(y.toolbar.elements, ["quote"]),
                    ((0, Z.lG)(S, "B") || (0, Z.lG)(S, "STRONG")) &&
                      u(y.toolbar.elements, ["bold"]),
                    ((0, Z.lG)(S, "I") || (0, Z.lG)(S, "EM")) &&
                      u(y.toolbar.elements, ["italic"]),
                    ((0, Z.lG)(S, "STRIKE") || (0, Z.lG)(S, "S")) &&
                      u(y.toolbar.elements, ["strike"]),
                    y.wysiwyg.element
                      .querySelectorAll(".vditor-comment--focus")
                      .forEach(function (y) {
                        y.classList.remove("vditor-comment--focus");
                      });
                  var B = (0, Z.fb)(S, "vditor-comment");
                  if (B) {
                    var U = B.getAttribute("data-cmtids").split(" ");
                    if (
                      U.length > 1 &&
                      B.nextSibling.isSameNode(B.nextElementSibling)
                    ) {
                      var we = B.nextElementSibling
                        .getAttribute("data-cmtids")
                        .split(" ");
                      U.find(function (y) {
                        if (we.includes(y)) return (U = [y]), !0;
                      });
                    }
                    y.wysiwyg.element
                      .querySelectorAll(".vditor-comment")
                      .forEach(function (y) {
                        y.getAttribute("data-cmtids").indexOf(U[0]) > -1 &&
                          y.classList.add("vditor-comment--focus");
                      });
                  }
                  var Dt = (0, Z.lG)(S, "A");
                  Dt && u(y.toolbar.elements, ["link"]);
                  var Ot = (0, Z.lG)(S, "TABLE"),
                    jt = (0, ye.W)(S);
                  (0, Z.lG)(S, "CODE")
                    ? (0, Z.lG)(S, "PRE")
                      ? (m(y.toolbar.elements, [
                          "headings",
                          "bold",
                          "italic",
                          "strike",
                          "line",
                          "quote",
                          "list",
                          "ordered-list",
                          "check",
                          "code",
                          "inline-code",
                          "upload",
                          "link",
                          "table",
                          "record",
                        ]),
                        u(y.toolbar.elements, ["code"]))
                      : (m(y.toolbar.elements, [
                          "headings",
                          "bold",
                          "italic",
                          "strike",
                          "line",
                          "quote",
                          "list",
                          "ordered-list",
                          "check",
                          "code",
                          "upload",
                          "link",
                          "table",
                          "record",
                        ]),
                        u(y.toolbar.elements, ["inline-code"]))
                    : jt
                    ? (m(y.toolbar.elements, ["bold"]),
                      u(y.toolbar.elements, ["headings"]))
                    : Ot && m(y.toolbar.elements, ["table"]);
                  var Rt = (0, Z.fb)(S, "vditor-toc");
                  if (Rt)
                    return (
                      (y.wysiwyg.popover.innerHTML = ""),
                      ce(Rt, y),
                      void ae(y, Rt)
                    );
                  var Pt = (0, ye.S)(S, "BLOCKQUOTE");
                  if (
                    (Pt &&
                      ((y.wysiwyg.popover.innerHTML = ""),
                      se(b, Pt, y),
                      de(b, Pt, y),
                      ce(Pt, y),
                      ae(y, Pt)),
                    D &&
                      ((y.wysiwyg.popover.innerHTML = ""),
                      se(b, D, y),
                      de(b, D, y),
                      ce(D, y),
                      ae(y, D)),
                    Ot)
                  ) {
                    y.options.lang, y.options;
                    y.wysiwyg.popover.innerHTML = "";
                    var E = function () {
                        var y = Ot.rows.length,
                          b = Ot.rows[0].cells.length,
                          S = parseInt(en.value, 10) || y,
                          L = parseInt(nn.value, 10) || b;
                        if (S !== y || b !== L) {
                          if (b !== L)
                            for (var H = L - b, D = 0; D < Ot.rows.length; D++)
                              if (H > 0)
                                for (var B = 0; B < H; B++)
                                  0 === D
                                    ? Ot.rows[
                                        D
                                      ].lastElementChild.insertAdjacentHTML(
                                        "afterend",
                                        "<th> </th>"
                                      )
                                    : Ot.rows[
                                        D
                                      ].lastElementChild.insertAdjacentHTML(
                                        "afterend",
                                        "<td> </td>"
                                      );
                              else
                                for (var U = b - 1; U >= L; U--)
                                  Ot.rows[D].cells[U].remove();
                          if (y !== S) {
                            var F = S - y;
                            if (F > 0) {
                              for (var Z = "<tr>", ye = 0; ye < L; ye++)
                                Z += "<td> </td>";
                              for (var we = 0; we < F; we++)
                                Ot.querySelector("tbody")
                                  ? Ot.querySelector(
                                      "tbody"
                                    ).insertAdjacentHTML("beforeend", Z)
                                  : Ot.querySelector(
                                      "thead"
                                    ).insertAdjacentHTML(
                                      "afterend",
                                      Z + "</tr>"
                                    );
                            } else
                              for (ye = y - 1; ye >= S; ye--)
                                Ot.rows[ye].remove(),
                                  1 === Ot.rows.length &&
                                    Ot.querySelector("tbody").remove();
                          }
                        }
                      },
                      k = function (S) {
                        at(Ot, S),
                          "right" === S
                            ? (Ut.classList.remove("vditor-icon--current"),
                              Wt.classList.remove("vditor-icon--current"),
                              Gt.classList.add("vditor-icon--current"))
                            : "center" === S
                            ? (Ut.classList.remove("vditor-icon--current"),
                              Gt.classList.remove("vditor-icon--current"),
                              Wt.classList.add("vditor-icon--current"))
                            : (Wt.classList.remove("vditor-icon--current"),
                              Gt.classList.remove("vditor-icon--current"),
                              Ut.classList.add("vditor-icon--current")),
                          (0, Kt.Hc)(b),
                          Y(y);
                      },
                      qt = (0, Z.lG)(S, "TD"),
                      Bt = (0, Z.lG)(S, "TH"),
                      Vt = "left";
                    qt
                      ? (Vt = qt.getAttribute("align") || "left")
                      : Bt && (Vt = Bt.getAttribute("align") || "center");
                    var Ut = document.createElement("button");
                    Ut.setAttribute("type", "button"),
                      Ut.setAttribute(
                        "aria-label",
                        window.VditorI18n.alignLeft +
                          "<" +
                          (0, F.ns)("⇧⌘L") +
                          ">"
                      ),
                      Ut.setAttribute("data-type", "left"),
                      (Ut.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-align-left"></use></svg>'),
                      (Ut.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n" +
                        ("left" === Vt ? " vditor-icon--current" : "")),
                      (Ut.onclick = function () {
                        k("left");
                      });
                    var Wt = document.createElement("button");
                    Wt.setAttribute("type", "button"),
                      Wt.setAttribute(
                        "aria-label",
                        window.VditorI18n.alignCenter +
                          "<" +
                          (0, F.ns)("⇧⌘C") +
                          ">"
                      ),
                      Wt.setAttribute("data-type", "center"),
                      (Wt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>'),
                      (Wt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n" +
                        ("center" === Vt ? " vditor-icon--current" : "")),
                      (Wt.onclick = function () {
                        k("center");
                      });
                    var Gt = document.createElement("button");
                    Gt.setAttribute("type", "button"),
                      Gt.setAttribute(
                        "aria-label",
                        window.VditorI18n.alignRight +
                          "<" +
                          (0, F.ns)("⇧⌘R") +
                          ">"
                      ),
                      Gt.setAttribute("data-type", "right"),
                      (Gt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-align-right"></use></svg>'),
                      (Gt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n" +
                        ("right" === Vt ? " vditor-icon--current" : "")),
                      (Gt.onclick = function () {
                        k("right");
                      });
                    var Zt = document.createElement("button");
                    Zt.setAttribute("type", "button"),
                      Zt.setAttribute(
                        "aria-label",
                        window.VditorI18n.insertRowBelow +
                          "<" +
                          (0, F.ns)("⌘=") +
                          ">"
                      ),
                      Zt.setAttribute("data-type", "insertRow"),
                      (Zt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-insert-row"></use></svg>'),
                      (Zt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                      (Zt.onclick = function () {
                        var S = getSelection().getRangeAt(0).startContainer,
                          L = (0, Z.lG)(S, "TD") || (0, Z.lG)(S, "TH");
                        L && mt(y, b, L);
                      });
                    var Jt = document.createElement("button");
                    Jt.setAttribute("type", "button"),
                      Jt.setAttribute(
                        "aria-label",
                        window.VditorI18n.insertRowAbove +
                          "<" +
                          (0, F.ns)("⇧⌘F") +
                          ">"
                      ),
                      Jt.setAttribute("data-type", "insertRow"),
                      (Jt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-insert-rowb"></use></svg>'),
                      (Jt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                      (Jt.onclick = function () {
                        var S = getSelection().getRangeAt(0).startContainer,
                          L = (0, Z.lG)(S, "TD") || (0, Z.lG)(S, "TH");
                        L && ft(y, b, L);
                      });
                    var Xt = document.createElement("button");
                    Xt.setAttribute("type", "button"),
                      Xt.setAttribute(
                        "aria-label",
                        window.VditorI18n.insertColumnRight +
                          "<" +
                          (0, F.ns)("⇧⌘=") +
                          ">"
                      ),
                      Xt.setAttribute("data-type", "insertColumn"),
                      (Xt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-insert-column"></use></svg>'),
                      (Xt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                      (Xt.onclick = function () {
                        var b = getSelection().getRangeAt(0).startContainer,
                          S = (0, Z.lG)(b, "TD") || (0, Z.lG)(b, "TH");
                        S && ht(y, Ot, S);
                      });
                    var Yt = document.createElement("button");
                    Yt.setAttribute("type", "button"),
                      Yt.setAttribute(
                        "aria-label",
                        window.VditorI18n.insertColumnLeft +
                          "<" +
                          (0, F.ns)("⇧⌘G") +
                          ">"
                      ),
                      Yt.setAttribute("data-type", "insertColumn"),
                      (Yt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-insert-columnb"></use></svg>'),
                      (Yt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                      (Yt.onclick = function () {
                        var b = getSelection().getRangeAt(0).startContainer,
                          S = (0, Z.lG)(b, "TD") || (0, Z.lG)(b, "TH");
                        S && ht(y, Ot, S, "beforebegin");
                      });
                    var Qt = document.createElement("button");
                    Qt.setAttribute("type", "button"),
                      Qt.setAttribute(
                        "aria-label",
                        window.VditorI18n["delete-row"] +
                          "<" +
                          (0, F.ns)("⌘-") +
                          ">"
                      ),
                      Qt.setAttribute("data-type", "deleteRow"),
                      (Qt.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-delete-row"></use></svg>'),
                      (Qt.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                      (Qt.onclick = function () {
                        var S = getSelection().getRangeAt(0).startContainer,
                          L = (0, Z.lG)(S, "TD") || (0, Z.lG)(S, "TH");
                        L && vt(y, b, L);
                      });
                    var $t = document.createElement("button");
                    $t.setAttribute("type", "button"),
                      $t.setAttribute(
                        "aria-label",
                        window.VditorI18n["delete-column"] +
                          "<" +
                          (0, F.ns)("⇧⌘-") +
                          ">"
                      ),
                      $t.setAttribute("data-type", "deleteColumn"),
                      ($t.innerHTML =
                        '<svg><use xlink:href="#vditor-icon-delete-column"></use></svg>'),
                      ($t.className =
                        "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                      ($t.onclick = function () {
                        var S = getSelection().getRangeAt(0).startContainer,
                          L = (0, Z.lG)(S, "TD") || (0, Z.lG)(S, "TH");
                        L && gt(y, b, Ot, L);
                      }),
                      (fn = document.createElement("span")).setAttribute(
                        "aria-label",
                        window.VditorI18n.row
                      ),
                      (fn.className = "vditor-tooltipped vditor-tooltipped__n");
                    var en = document.createElement("input");
                    fn.appendChild(en),
                      (en.type = "number"),
                      (en.min = "1"),
                      (en.className = "vditor-input"),
                      (en.style.width = "42px"),
                      (en.style.textAlign = "center"),
                      en.setAttribute("placeholder", window.VditorI18n.row),
                      (en.value = Ot.rows.length.toString()),
                      (en.oninput = function () {
                        E();
                      }),
                      (en.onkeydown = function (S) {
                        if (!S.isComposing)
                          return "Tab" === S.key
                            ? (nn.focus(), nn.select(), void S.preventDefault())
                            : void (ie(y, S) || me(S, b));
                      });
                    var tn = document.createElement("span");
                    tn.setAttribute("aria-label", window.VditorI18n.column),
                      (tn.className = "vditor-tooltipped vditor-tooltipped__n");
                    var nn = document.createElement("input");
                    tn.appendChild(nn),
                      (nn.type = "number"),
                      (nn.min = "1"),
                      (nn.className = "vditor-input"),
                      (nn.style.width = "42px"),
                      (nn.style.textAlign = "center"),
                      nn.setAttribute("placeholder", window.VditorI18n.column),
                      (nn.value = Ot.rows[0].cells.length.toString()),
                      (nn.oninput = function () {
                        E();
                      }),
                      (nn.onkeydown = function (S) {
                        if (!S.isComposing)
                          return "Tab" === S.key
                            ? (en.focus(), en.select(), void S.preventDefault())
                            : void (ie(y, S) || me(S, b));
                      }),
                      se(b, Ot, y),
                      de(b, Ot, y),
                      ce(Ot, y),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Ut),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Wt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Gt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Jt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Zt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Yt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Xt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", Qt),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", $t),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", fn),
                      y.wysiwyg.popover.insertAdjacentHTML("beforeend", " x "),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", tn),
                      ae(y, Ot);
                  }
                  var rn = (0, Z.a1)(S, "data-type", "link-ref");
                  rn && le(y, rn, b);
                  var an = (0, Z.a1)(S, "data-type", "footnotes-ref");
                  if (an) {
                    y.options.lang, y.options;
                    (y.wysiwyg.popover.innerHTML = ""),
                      (fn = document.createElement("span")).setAttribute(
                        "aria-label",
                        window.VditorI18n.footnoteRef +
                          "<" +
                          (0, F.ns)("⌥Enter") +
                          ">"
                      ),
                      (fn.className = "vditor-tooltipped vditor-tooltipped__n");
                    var ln = document.createElement("input");
                    fn.appendChild(ln),
                      (ln.className = "vditor-input"),
                      ln.setAttribute(
                        "placeholder",
                        window.VditorI18n.footnoteRef +
                          "<" +
                          (0, F.ns)("⌥Enter") +
                          ">"
                      ),
                      (ln.style.width = "120px"),
                      (ln.value = an.getAttribute("data-footnotes-label")),
                      (ln.oninput = function () {
                        "" !== ln.value.trim() &&
                          an.setAttribute("data-footnotes-label", ln.value);
                      }),
                      (ln.onkeydown = function (S) {
                        S.isComposing || ie(y, S) || me(S, b);
                      }),
                      ce(an, y),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", fn),
                      ae(y, an);
                  }
                  var dn = (0, Z.fb)(S, "vditor-wysiwyg__block"),
                    cn =
                      !!dn &&
                      dn.getAttribute("data-type").indexOf("block") > -1;
                  if (
                    (y.wysiwyg.element
                      .querySelectorAll(".vditor-wysiwyg__preview")
                      .forEach(function (y) {
                        (!dn || (dn && cn && !dn.contains(y))) &&
                          (y.previousElementSibling.style.display = "none");
                      }),
                    dn && cn)
                  ) {
                    if (
                      ((y.wysiwyg.popover.innerHTML = ""),
                      se(b, dn, y),
                      de(b, dn, y),
                      ce(dn, y),
                      "code-block" === dn.getAttribute("data-type"))
                    ) {
                      var un = document.createElement("span");
                      un.setAttribute(
                        "aria-label",
                        window.VditorI18n.language +
                          "<" +
                          (0, F.ns)("⌥Enter") +
                          ">"
                      ),
                        (un.className =
                          "vditor-tooltipped vditor-tooltipped__n");
                      var pn = document.createElement("input");
                      un.appendChild(pn);
                      var mn = dn.firstElementChild.firstElementChild;
                      (pn.className = "vditor-input"),
                        pn.setAttribute(
                          "placeholder",
                          window.VditorI18n.language +
                            "<" +
                            (0, F.ns)("⌥Enter") +
                            ">"
                        ),
                        (pn.value =
                          mn.className.indexOf("language-") > -1
                            ? mn.className.split("-")[1].split(" ")[0]
                            : ""),
                        (pn.oninput = function (S) {
                          "" !== pn.value.trim()
                            ? (mn.className = "language-" + pn.value)
                            : ((mn.className = ""),
                              (y.hint.recentLanguage = "")),
                            dn.lastElementChild.classList.contains(
                              "vditor-wysiwyg__preview"
                            ) &&
                              ((dn.lastElementChild.innerHTML =
                                dn.firstElementChild.innerHTML),
                              N(dn.lastElementChild, y)),
                            Y(y),
                            1 === S.detail &&
                              (b.setStart(mn.firstChild, 0),
                              b.collapse(!0),
                              (0, Kt.Hc)(b));
                        }),
                        (pn.onkeydown = function (S) {
                          if (!S.isComposing && !ie(y, S)) {
                            if (
                              "Escape" === S.key &&
                              "block" === y.hint.element.style.display
                            )
                              return (
                                (y.hint.element.style.display = "none"),
                                void S.preventDefault()
                              );
                            y.hint.select(S, y), me(S, b);
                          }
                        }),
                        (pn.onkeyup = function (b) {
                          if (
                            !b.isComposing &&
                            "Enter" !== b.key &&
                            "ArrowUp" !== b.key &&
                            "Escape" !== b.key &&
                            "ArrowDown" !== b.key
                          ) {
                            var S = [],
                              L = pn.value.substring(0, pn.selectionStart);
                            H.g.CODE_LANGUAGES.forEach(function (y) {
                              y.indexOf(L.toLowerCase()) > -1 &&
                                S.push({ html: y, value: y });
                            }),
                              y.hint.genHTML(S, L, y),
                              b.preventDefault();
                          }
                        }),
                        y.wysiwyg.popover.insertAdjacentElement(
                          "beforeend",
                          un
                        );
                    }
                    ae(y, dn);
                  } else dn = void 0;
                  if (jt) {
                    var fn;
                    (y.wysiwyg.popover.innerHTML = ""),
                      (fn = document.createElement("span")).setAttribute(
                        "aria-label",
                        "ID<" + (0, F.ns)("⌥Enter") + ">"
                      ),
                      (fn.className = "vditor-tooltipped vditor-tooltipped__n");
                    var hn = document.createElement("input");
                    fn.appendChild(hn),
                      (hn.className = "vditor-input"),
                      hn.setAttribute(
                        "placeholder",
                        "ID<" + (0, F.ns)("⌥Enter") + ">"
                      ),
                      (hn.style.width = "120px"),
                      (hn.value = jt.getAttribute("data-id") || ""),
                      (hn.oninput = function () {
                        jt.setAttribute("data-id", hn.value);
                      }),
                      (hn.onkeydown = function (S) {
                        S.isComposing || ie(y, S) || me(S, b);
                      }),
                      se(b, jt, y),
                      de(b, jt, y),
                      ce(jt, y),
                      y.wysiwyg.popover.insertAdjacentElement("beforeend", fn),
                      ae(y, jt);
                  }
                  if (
                    (Dt && pe(y, Dt, b),
                    !(Pt || D || Ot || dn || Dt || rn || an || jt || Rt))
                  ) {
                    var vn = (0, Z.a1)(S, "data-block", "0");
                    vn && vn.parentElement.isEqualNode(y.wysiwyg.element)
                      ? ((y.wysiwyg.popover.innerHTML = ""),
                        se(b, vn, y),
                        de(b, vn, y),
                        ce(vn, y),
                        ae(y, vn))
                      : (y.wysiwyg.popover.style.display = "none");
                  }
                  y.wysiwyg.element
                    .querySelectorAll('span[data-type="backslash"] > span')
                    .forEach(function (y) {
                      y.style.display = "none";
                    });
                  var gn = (0, Z.a1)(
                    b.startContainer,
                    "data-type",
                    "backslash"
                  );
                  gn && (gn.querySelector("span").style.display = "inline");
                }
              }, 200));
          },
          ae = function (y, b) {
            var S = b,
              L = (0, Z.lG)(b, "TABLE");
            L && (S = L),
              (y.wysiwyg.popover.style.left = "0"),
              (y.wysiwyg.popover.style.display = "block"),
              (y.wysiwyg.popover.style.top =
                Math.max(-8, S.offsetTop - 21 - y.wysiwyg.element.scrollTop) +
                "px"),
              (y.wysiwyg.popover.style.left =
                Math.min(
                  S.offsetLeft,
                  y.wysiwyg.element.clientWidth - y.wysiwyg.popover.clientWidth
                ) + "px"),
              y.wysiwyg.popover.setAttribute(
                "data-top",
                (S.offsetTop - 21).toString()
              );
          },
          le = function (y, b, S) {
            void 0 === S && (S = getSelection().getRangeAt(0)),
              (y.wysiwyg.popover.innerHTML = "");
            var r = function () {
                "" !== H.value.trim() &&
                  ("IMG" === b.tagName
                    ? b.setAttribute("alt", H.value)
                    : (b.textContent = H.value)),
                  "" !== B.value.trim() &&
                    b.setAttribute("data-link-label", B.value);
              },
              L = document.createElement("span");
            L.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty),
              (L.className = "vditor-tooltipped vditor-tooltipped__n");
            var H = document.createElement("input");
            L.appendChild(H),
              (H.className = "vditor-input"),
              H.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty),
              (H.style.width = "120px"),
              (H.value = b.getAttribute("alt") || b.textContent),
              (H.oninput = function () {
                r();
              }),
              (H.onkeydown = function (L) {
                ie(y, L) || me(L, S) || ue(y, b, L, B);
              });
            var D = document.createElement("span");
            D.setAttribute("aria-label", window.VditorI18n.linkRef),
              (D.className = "vditor-tooltipped vditor-tooltipped__n");
            var B = document.createElement("input");
            D.appendChild(B),
              (B.className = "vditor-input"),
              B.setAttribute("placeholder", window.VditorI18n.linkRef),
              (B.value = b.getAttribute("data-link-label")),
              (B.oninput = function () {
                r();
              }),
              (B.onkeydown = function (L) {
                ie(y, L) || me(L, S) || ue(y, b, L, H);
              }),
              ce(b, y),
              y.wysiwyg.popover.insertAdjacentElement("beforeend", L),
              y.wysiwyg.popover.insertAdjacentElement("beforeend", D),
              ae(y, b);
          },
          se = function (y, b, S) {
            var L = b.previousElementSibling;
            if (
              L &&
              (b.parentElement.isEqualNode(S.wysiwyg.element) ||
                "LI" === b.tagName)
            ) {
              var H = document.createElement("button");
              H.setAttribute("type", "button"),
                H.setAttribute("data-type", "up"),
                H.setAttribute(
                  "aria-label",
                  window.VditorI18n.up + "<" + (0, F.ns)("⇧⌘U") + ">"
                ),
                (H.innerHTML =
                  '<svg><use xlink:href="#vditor-icon-up"></use></svg>'),
                (H.className =
                  "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                (H.onclick = function () {
                  y.insertNode(document.createElement("wbr")),
                    L.insertAdjacentElement("beforebegin", b),
                    (0, Kt.ib)(S.wysiwyg.element, y),
                    Y(S),
                    oe(S),
                    Ae(S);
                }),
                S.wysiwyg.popover.insertAdjacentElement("beforeend", H);
            }
          },
          de = function (y, b, S) {
            var L = b.nextElementSibling;
            if (
              L &&
              (b.parentElement.isEqualNode(S.wysiwyg.element) ||
                "LI" === b.tagName)
            ) {
              var H = document.createElement("button");
              H.setAttribute("type", "button"),
                H.setAttribute("data-type", "down"),
                H.setAttribute(
                  "aria-label",
                  window.VditorI18n.down + "<" + (0, F.ns)("⇧⌘D") + ">"
                ),
                (H.innerHTML =
                  '<svg><use xlink:href="#vditor-icon-down"></use></svg>'),
                (H.className =
                  "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
                (H.onclick = function () {
                  y.insertNode(document.createElement("wbr")),
                    L.insertAdjacentElement("afterend", b),
                    (0, Kt.ib)(S.wysiwyg.element, y),
                    Y(S),
                    oe(S),
                    Ae(S);
                }),
                S.wysiwyg.popover.insertAdjacentElement("beforeend", H);
            }
          },
          ce = function (y, b) {
            var S = document.createElement("button");
            S.setAttribute("type", "button"),
              S.setAttribute("data-type", "remove"),
              S.setAttribute(
                "aria-label",
                window.VditorI18n.remove + "<" + (0, F.ns)("⇧⌘X") + ">"
              ),
              (S.innerHTML =
                '<svg><use xlink:href="#vditor-icon-trashcan"></use></svg>'),
              (S.className =
                "vditor-icon vditor-tooltipped vditor-tooltipped__n"),
              (S.onclick = function () {
                var S = (0, Kt.zh)(b);
                S.setStartAfter(y),
                  (0, Kt.Hc)(S),
                  y.remove(),
                  Y(b),
                  oe(b),
                  ["H1", "H2", "H3", "H4", "H5", "H6"].includes(y.tagName) &&
                    O(b);
              }),
              b.wysiwyg.popover.insertAdjacentElement("beforeend", S);
          },
          ue = function (y, b, S, L) {
            if (!S.isComposing) {
              if ("Tab" === S.key)
                return L.focus(), L.select(), void S.preventDefault();
              if (
                !(0, F.yl)(S) &&
                !S.shiftKey &&
                S.altKey &&
                "Enter" === S.key
              ) {
                var D = (0, Kt.zh)(y);
                b.insertAdjacentHTML("afterend", H.g.ZWSP),
                  D.setStartAfter(b.nextSibling),
                  D.collapse(!0),
                  (0, Kt.Hc)(D),
                  S.preventDefault();
              }
            }
          },
          pe = function (y, b, S) {
            y.wysiwyg.popover.innerHTML = "";
            var r = function () {
              "" !== H.value.trim() && (b.innerHTML = H.value),
                b.setAttribute("href", B.value),
                b.setAttribute("title", F.value),
                Y(y);
            };
            b.querySelectorAll("[data-marker]").forEach(function (y) {
              y.removeAttribute("data-marker");
            });
            var L = document.createElement("span");
            L.setAttribute("aria-label", window.VditorI18n.textIsNotEmpty),
              (L.className = "vditor-tooltipped vditor-tooltipped__n");
            var H = document.createElement("input");
            L.appendChild(H),
              (H.className = "vditor-input"),
              H.setAttribute("placeholder", window.VditorI18n.textIsNotEmpty),
              (H.style.width = "120px"),
              (H.value = b.innerHTML || ""),
              (H.oninput = function () {
                r();
              }),
              (H.onkeydown = function (L) {
                ie(y, L) || me(L, S) || ue(y, b, L, B);
              });
            var D = document.createElement("span");
            D.setAttribute("aria-label", window.VditorI18n.link),
              (D.className = "vditor-tooltipped vditor-tooltipped__n");
            var B = document.createElement("input");
            D.appendChild(B),
              (B.className = "vditor-input"),
              B.setAttribute("placeholder", window.VditorI18n.link),
              (B.value = b.getAttribute("href") || ""),
              (B.oninput = function () {
                r();
              }),
              (B.onkeydown = function (L) {
                ie(y, L) || me(L, S) || ue(y, b, L, F);
              });
            var U = document.createElement("span");
            U.setAttribute("aria-label", window.VditorI18n.tooltipText),
              (U.className = "vditor-tooltipped vditor-tooltipped__n");
            var F = document.createElement("input");
            U.appendChild(F),
              (F.className = "vditor-input"),
              F.setAttribute("placeholder", window.VditorI18n.tooltipText),
              (F.style.width = "60px"),
              (F.value = b.getAttribute("title") || ""),
              (F.oninput = function () {
                r();
              }),
              (F.onkeydown = function (L) {
                ie(y, L) || me(L, S) || ue(y, b, L, H);
              }),
              ce(b, y),
              y.wysiwyg.popover.insertAdjacentElement("beforeend", L),
              y.wysiwyg.popover.insertAdjacentElement("beforeend", D),
              y.wysiwyg.popover.insertAdjacentElement("beforeend", U),
              ae(y, b);
          },
          me = function (y, b) {
            if (
              (!(0, F.yl)(y) && !y.shiftKey && "Enter" === y.key) ||
              "Escape" === y.key
            )
              return (
                b && (0, Kt.Hc)(b), y.preventDefault(), y.stopPropagation(), !0
              );
          },
          fe = function (y) {
            "wysiwyg" === y.currentMode
              ? oe(y)
              : "ir" === y.currentMode && X(y);
          },
          he = function (y, b, S) {
            void 0 === S &&
              (S = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 });
            var L = y.wysiwyg.element;
            (L.innerHTML = y.lute.Md2VditorDOM(b)),
              L.querySelectorAll(
                ".vditor-wysiwyg__preview[data-render='2']"
              ).forEach(function (b) {
                N(b, y),
                  b.previousElementSibling.setAttribute(
                    "style",
                    "display:none"
                  );
              }),
              Y(y, S);
          },
          ve = function (y, b, S) {
            for (
              var L = y.startContainer.parentElement,
                D = !1,
                B = "",
                U = "",
                F = (function (y) {
                  var b = $(y.startContainer),
                    S = Q(y.startContainer),
                    L = y.startContainer.textContent,
                    D = y.startOffset,
                    B = "",
                    U = "";
                  return (
                    (("" !== L.substr(0, D) && L.substr(0, D) !== H.g.ZWSP) ||
                      b) &&
                      (B = "" + b + L.substr(0, D)),
                    (("" !== L.substr(D) && L.substr(D) !== H.g.ZWSP) || S) &&
                      (U = "" + L.substr(D) + S),
                    { afterHTML: U, beforeHTML: B }
                  );
                })(y),
                Z = F.beforeHTML,
                ye = F.afterHTML;
              L && !D;

            ) {
              var we = L.tagName;
              if (
                ("STRIKE" === we && (we = "S"),
                "I" === we && (we = "EM"),
                "B" === we && (we = "STRONG"),
                "S" === we || "STRONG" === we || "EM" === we)
              ) {
                var Dt = "",
                  Ot = "",
                  jt = "";
                "0" !== L.parentElement.getAttribute("data-block") &&
                  ((Ot = $(L)), (jt = Q(L))),
                  (Z || Ot) &&
                    (Z = Dt = Ot + "<" + we + ">" + Z + "</" + we + ">"),
                  (("bold" === S && "STRONG" === we) ||
                    ("italic" === S && "EM" === we) ||
                    ("strikeThrough" === S && "S" === we)) &&
                    ((Dt += "" + B + H.g.ZWSP + "<wbr>" + U), (D = !0)),
                  (ye || jt) &&
                    (Dt += ye = "<" + we + ">" + ye + "</" + we + ">" + jt),
                  "0" !== L.parentElement.getAttribute("data-block")
                    ? ((L = L.parentElement).innerHTML = Dt)
                    : ((L.outerHTML = Dt), (L = L.parentElement)),
                  (B = "<" + we + ">" + B),
                  (U = "</" + we + ">" + U);
              } else D = !0;
            }
            (0, Kt.ib)(b.wysiwyg.element, y);
          },
          ge = function (b, S) {
            var L,
              D = this || y;
            ((this || y).element = document.createElement("div")),
              S.className &&
                (L = (this || y).element.classList).add.apply(
                  L,
                  S.className.split(" ")
                );
            var B = S.hotkey ? " <" + (0, F.ns)(S.hotkey) + ">" : "";
            2 === S.level &&
              (B = S.hotkey ? " &lt;" + (0, F.ns)(S.hotkey) + "&gt;" : "");
            var U = S.tip ? S.tip + B : "" + window.VditorI18n[S.name] + B,
              ye = "upload" === S.name ? "div" : "button";
            if (2 === S.level)
              (this || y).element.innerHTML =
                "<" + ye + ' data-type="' + S.name + '">' + U + "</" + ye + ">";
            else {
              (this || y).element.classList.add("vditor-toolbar__item");
              var we = document.createElement(ye);
              we.setAttribute("data-type", S.name),
                (we.className =
                  "vditor-tooltipped vditor-tooltipped__" + S.tipPosition),
                we.setAttribute("aria-label", U),
                (we.innerHTML = S.icon),
                (this || y).element.appendChild(we);
            }
            S.prefix &&
              (this || y).element.children[0].addEventListener(
                (0, F.Le)(),
                function (y) {
                  y.preventDefault(),
                    D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) ||
                      ("wysiwyg" === b.currentMode
                        ? (function (y, b, S) {
                            if (
                              !(
                                y.wysiwyg.composingLock &&
                                S instanceof CustomEvent
                              )
                            ) {
                              var L = !0,
                                D = !0;
                              y.wysiwyg.element.querySelector("wbr") &&
                                y.wysiwyg.element.querySelector("wbr").remove();
                              var B = (0, Kt.zh)(y),
                                U = b.getAttribute("data-type");
                              if (b.classList.contains("vditor-menu--current"))
                                if (
                                  ("strike" === U && (U = "strikeThrough"),
                                  "quote" === U)
                                ) {
                                  var F = (0, Z.lG)(
                                    B.startContainer,
                                    "BLOCKQUOTE"
                                  );
                                  F ||
                                    (F =
                                      B.startContainer.childNodes[
                                        B.startOffset
                                      ]),
                                    F &&
                                      ((L = !1),
                                      b.classList.remove(
                                        "vditor-menu--current"
                                      ),
                                      B.insertNode(
                                        document.createElement("wbr")
                                      ),
                                      (F.outerHTML =
                                        "" === F.innerHTML.trim()
                                          ? '<p data-block="0">' +
                                            F.innerHTML +
                                            "</p>"
                                          : F.innerHTML),
                                      (0, Kt.ib)(y.wysiwyg.element, B));
                                } else if ("inline-code" === U) {
                                  var ye = (0, Z.lG)(B.startContainer, "CODE");
                                  ye ||
                                    (ye =
                                      B.startContainer.childNodes[
                                        B.startOffset
                                      ]),
                                    ye &&
                                      ((ye.outerHTML =
                                        ye.innerHTML.replace(H.g.ZWSP, "") +
                                        "<wbr>"),
                                      (0, Kt.ib)(y.wysiwyg.element, B));
                                } else
                                  "link" === U
                                    ? B.collapsed
                                      ? (B.selectNode(
                                          B.startContainer.parentElement
                                        ),
                                        document.execCommand("unlink", !1, ""))
                                      : document.execCommand("unlink", !1, "")
                                    : "check" === U ||
                                      "list" === U ||
                                      "ordered-list" === U
                                    ? (rt(y, B, U),
                                      (0, Kt.ib)(y.wysiwyg.element, B),
                                      (L = !1),
                                      b.classList.remove(
                                        "vditor-menu--current"
                                      ))
                                    : ((L = !1),
                                      b.classList.remove(
                                        "vditor-menu--current"
                                      ),
                                      "" === B.toString()
                                        ? ve(B, y, U)
                                        : document.execCommand(U, !1, ""));
                              else {
                                0 === y.wysiwyg.element.childNodes.length &&
                                  ((y.wysiwyg.element.innerHTML =
                                    '<p data-block="0"><wbr></p>'),
                                  (0, Kt.ib)(y.wysiwyg.element, B));
                                var we = (0, Z.F9)(B.startContainer);
                                if ("quote" === U) {
                                  if (
                                    (we ||
                                      (we =
                                        B.startContainer.childNodes[
                                          B.startOffset
                                        ]),
                                    we)
                                  ) {
                                    (L = !1),
                                      b.classList.add("vditor-menu--current"),
                                      B.insertNode(
                                        document.createElement("wbr")
                                      );
                                    var Dt = (0, Z.lG)(B.startContainer, "LI");
                                    Dt && we.contains(Dt)
                                      ? (Dt.innerHTML =
                                          '<blockquote data-block="0">' +
                                          Dt.innerHTML +
                                          "</blockquote>")
                                      : (we.outerHTML =
                                          '<blockquote data-block="0">' +
                                          we.outerHTML +
                                          "</blockquote>"),
                                      (0, Kt.ib)(y.wysiwyg.element, B);
                                  }
                                } else if (
                                  "check" === U ||
                                  "list" === U ||
                                  "ordered-list" === U
                                )
                                  rt(y, B, U, !1),
                                    (0, Kt.ib)(y.wysiwyg.element, B),
                                    (L = !1),
                                    c(y.toolbar.elements, [
                                      "check",
                                      "list",
                                      "ordered-list",
                                    ]),
                                    b.classList.add("vditor-menu--current");
                                else if ("inline-code" === U) {
                                  if ("" === B.toString())
                                    ((Ot = document.createElement(
                                      "code"
                                    )).textContent = H.g.ZWSP),
                                      B.insertNode(Ot),
                                      B.setStart(Ot.firstChild, 1),
                                      B.collapse(!0),
                                      (0, Kt.Hc)(B);
                                  else if (3 === B.startContainer.nodeType) {
                                    var Ot = document.createElement("code");
                                    B.surroundContents(Ot),
                                      B.insertNode(Ot),
                                      (0, Kt.Hc)(B);
                                  }
                                  b.classList.add("vditor-menu--current");
                                } else if ("code" === U)
                                  ((Ot = document.createElement(
                                    "div"
                                  )).className = "vditor-wysiwyg__block"),
                                    Ot.setAttribute("data-type", "code-block"),
                                    Ot.setAttribute("data-block", "0"),
                                    Ot.setAttribute("data-marker", "```"),
                                    "" === B.toString()
                                      ? (Ot.innerHTML =
                                          "<pre><code><wbr>\n</code></pre>")
                                      : ((Ot.innerHTML =
                                          "<pre><code>" +
                                          B.toString() +
                                          "<wbr></code></pre>"),
                                        B.deleteContents()),
                                    B.insertNode(Ot),
                                    we &&
                                      (we.outerHTML = y.lute.SpinVditorDOM(
                                        we.outerHTML
                                      )),
                                    (0, Kt.ib)(y.wysiwyg.element, B),
                                    y.wysiwyg.element
                                      .querySelectorAll(
                                        ".vditor-wysiwyg__preview[data-render='2']"
                                      )
                                      .forEach(function (b) {
                                        N(b, y);
                                      }),
                                    b.classList.add("vditor-menu--disabled");
                                else if ("link" === U) {
                                  if ("" === B.toString()) {
                                    var jt = document.createElement("a");
                                    (jt.innerText = H.g.ZWSP),
                                      B.insertNode(jt),
                                      B.setStart(jt.firstChild, 1),
                                      B.collapse(!0),
                                      pe(y, jt, B);
                                    var Rt = y.wysiwyg.popover.querySelector(
                                      "input"
                                    );
                                    (Rt.value = ""), Rt.focus(), (D = !1);
                                  } else {
                                    (Ot = document.createElement(
                                      "a"
                                    )).setAttribute("href", ""),
                                      (Ot.innerHTML = B.toString()),
                                      B.surroundContents(Ot),
                                      B.insertNode(Ot),
                                      (0, Kt.Hc)(B),
                                      pe(y, Ot, B);
                                    var Pt = y.wysiwyg.popover.querySelectorAll(
                                      "input"
                                    );
                                    (Pt[0].value = Ot.innerText), Pt[1].focus();
                                  }
                                  (L = !1),
                                    b.classList.add("vditor-menu--current");
                                } else if ("table" === U) {
                                  var qt =
                                    '<table data-block="0"><thead><tr><th>col1<wbr></th><th>col2</th><th>col3</th></tr></thead><tbody><tr><td> </td><td> </td><td> </td></tr><tr><td> </td><td> </td><td> </td></tr></tbody></table>';
                                  if ("" === B.toString().trim())
                                    we &&
                                    "" ===
                                      we.innerHTML.trim().replace(H.g.ZWSP, "")
                                      ? (we.outerHTML = qt)
                                      : document.execCommand(
                                          "insertHTML",
                                          !1,
                                          qt
                                        ),
                                      B.selectNode(
                                        y.wysiwyg.element.querySelector("wbr")
                                          .previousSibling
                                      ),
                                      y.wysiwyg.element
                                        .querySelector("wbr")
                                        .remove(),
                                      (0, Kt.Hc)(B);
                                  else {
                                    qt = '<table data-block="0"><thead><tr>';
                                    var Bt = B.toString().split("\n"),
                                      Vt =
                                        Bt[0].split(",").length >
                                        Bt[0].split("\t").length
                                          ? ","
                                          : "\t";
                                    Bt.forEach(function (y, b) {
                                      0 === b
                                        ? (y.split(Vt).forEach(function (y, b) {
                                            qt +=
                                              0 === b
                                                ? "<th>" + y + "<wbr></th>"
                                                : "<th>" + y + "</th>";
                                          }),
                                          (qt += "</tr></thead>"))
                                        : ((qt +=
                                            1 === b ? "<tbody><tr>" : "<tr>"),
                                          y.split(Vt).forEach(function (y) {
                                            qt += "<td>" + y + "</td>";
                                          }),
                                          (qt += "</tr>"));
                                    }),
                                      (qt += "</tbody></table>"),
                                      document.execCommand(
                                        "insertHTML",
                                        !1,
                                        qt
                                      ),
                                      (0, Kt.ib)(y.wysiwyg.element, B);
                                  }
                                  (L = !1),
                                    b.classList.add("vditor-menu--disabled");
                                } else if ("line" === U) {
                                  if (we) {
                                    var Ut =
                                      '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
                                    "" === we.innerHTML.trim()
                                      ? (we.outerHTML = Ut)
                                      : we.insertAdjacentHTML("afterend", Ut),
                                      (0, Kt.ib)(y.wysiwyg.element, B);
                                  }
                                } else if (
                                  ((L = !1),
                                  b.classList.add("vditor-menu--current"),
                                  "strike" === U && (U = "strikeThrough"),
                                  "" !== B.toString() ||
                                    ("bold" !== U &&
                                      "italic" !== U &&
                                      "strikeThrough" !== U))
                                )
                                  document.execCommand(U, !1, "");
                                else {
                                  var Wt = "strong";
                                  "italic" === U
                                    ? (Wt = "em")
                                    : "strikeThrough" === U && (Wt = "s"),
                                    ((Ot = document.createElement(
                                      Wt
                                    )).textContent = H.g.ZWSP),
                                    B.insertNode(Ot),
                                    Ot.previousSibling &&
                                      Ot.previousSibling.textContent ===
                                        H.g.ZWSP &&
                                      (Ot.previousSibling.textContent = ""),
                                    B.setStart(Ot.firstChild, 1),
                                    B.collapse(!0),
                                    (0, Kt.Hc)(B);
                                }
                              }
                              L && oe(y), D && Y(y);
                            }
                          })(b, D.element.children[0], y)
                        : "ir" === b.currentMode
                        ? xt(
                            b,
                            D.element.children[0],
                            S.prefix || "",
                            S.suffix || ""
                          )
                        : Re(
                            b,
                            D.element.children[0],
                            S.prefix || "",
                            S.suffix || ""
                          ));
                }
              );
          },
          Yt =
            ((Jt = function (y, b) {
              return (
                (Jt =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                Jt(y, b)
              );
            }),
            function (b, S) {
              function n() {
                (this || y).constructor = b;
              }
              Jt(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((n.prototype = S.prototype), new n()));
            }),
          be = function (y, b, S) {
            var L;
            if (
              ("string" != typeof S
                ? (v(y, ["subToolbar", "hint"]), S.preventDefault(), (L = a(y)))
                : (L = S),
              y.currentMode !== b || "string" == typeof S)
            ) {
              if (
                (y.devtools && y.devtools.renderEchart(y),
                "both" === y.options.preview.mode && "sv" === b
                  ? (y.preview.element.style.display = "block")
                  : (y.preview.element.style.display = "none"),
                p(y.toolbar.elements, H.g.EDIT_TOOLBARS),
                c(y.toolbar.elements, H.g.EDIT_TOOLBARS),
                m(y.toolbar.elements, ["outdent", "indent"]),
                "ir" === b)
              )
                f(y.toolbar.elements, ["both"]),
                  h(y.toolbar.elements, [
                    "outdent",
                    "indent",
                    "outline",
                    "insert-before",
                    "insert-after",
                  ]),
                  (y.sv.element.style.display = "none"),
                  (y.wysiwyg.element.parentElement.style.display = "none"),
                  (y.ir.element.parentElement.style.display = "block"),
                  y.lute.SetVditorIR(!0),
                  y.lute.SetVditorWYSIWYG(!1),
                  y.lute.SetVditorSV(!1),
                  (y.currentMode = "ir"),
                  (y.ir.element.innerHTML = y.lute.Md2VditorIRDOM(L)),
                  Tt(y, {
                    enableAddUndoStack: !0,
                    enableHint: !1,
                    enableInput: !1,
                  }),
                  z(y),
                  y.ir.element
                    .querySelectorAll(".vditor-ir__preview[data-render='2']")
                    .forEach(function (b) {
                      N(b, y);
                    }),
                  y.ir.element
                    .querySelectorAll(".vditor-toc")
                    .forEach(function (b) {
                      (0,
                      qt.H)(b, { cdn: y.options.cdn, math: y.options.preview.math });
                    });
              else if ("wysiwyg" === b)
                f(y.toolbar.elements, ["both"]),
                  h(y.toolbar.elements, [
                    "outdent",
                    "indent",
                    "outline",
                    "insert-before",
                    "insert-after",
                  ]),
                  (y.sv.element.style.display = "none"),
                  (y.wysiwyg.element.parentElement.style.display = "block"),
                  (y.ir.element.parentElement.style.display = "none"),
                  y.lute.SetVditorIR(!1),
                  y.lute.SetVditorWYSIWYG(!0),
                  y.lute.SetVditorSV(!1),
                  (y.currentMode = "wysiwyg"),
                  z(y),
                  he(y, L, {
                    enableAddUndoStack: !0,
                    enableHint: !1,
                    enableInput: !1,
                  }),
                  y.wysiwyg.element
                    .querySelectorAll(".vditor-toc")
                    .forEach(function (b) {
                      (0,
                      qt.H)(b, { cdn: y.options.cdn, math: y.options.preview.math });
                    }),
                  (y.wysiwyg.popover.style.display = "none");
              else if ("sv" === b) {
                h(y.toolbar.elements, ["both"]),
                  f(y.toolbar.elements, [
                    "outdent",
                    "indent",
                    "outline",
                    "insert-before",
                    "insert-after",
                  ]),
                  (y.wysiwyg.element.parentElement.style.display = "none"),
                  (y.ir.element.parentElement.style.display = "none"),
                  ("both" === y.options.preview.mode ||
                    "editor" === y.options.preview.mode) &&
                    (y.sv.element.style.display = "block"),
                  y.lute.SetVditorIR(!1),
                  y.lute.SetVditorWYSIWYG(!1),
                  y.lute.SetVditorSV(!0),
                  (y.currentMode = "sv");
                var D = De(L, y);
                "<div data-block='0'></div>" === D && (D = ""),
                  (y.sv.element.innerHTML = D),
                  Ie(y, {
                    enableAddUndoStack: !0,
                    enableHint: !1,
                    enableInput: !1,
                  }),
                  z(y);
              }
              y.undo.resetIcon(y),
                "string" != typeof S &&
                  (y[y.currentMode].element.focus(), fe(y)),
                O(y),
                G(y),
                y.toolbar.elements["edit-mode"] &&
                  (y.toolbar.elements["edit-mode"]
                    .querySelectorAll("button")
                    .forEach(function (y) {
                      y.classList.remove("vditor-menu--current");
                    }),
                  y.toolbar.elements["edit-mode"]
                    .querySelector('button[data-mode="' + y.currentMode + '"]')
                    .classList.add("vditor-menu--current")),
                y.outline.toggle(
                  y,
                  "sv" !== y.currentMode && y.options.outline.enable,
                  "string" != typeof S
                );
            }
          },
          Qt = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y,
                D = document.createElement("div");
              return (
                (D.className =
                  "vditor-hint" +
                  (2 === L.level ? "" : " vditor-panel--arrow")),
                (D.innerHTML =
                  '<button data-mode="wysiwyg">' +
                  window.VditorI18n.wysiwyg +
                  " &lt;" +
                  (0, F.ns)("⌥⌘7") +
                  '></button>\n<button data-mode="ir">' +
                  window.VditorI18n.instantRendering +
                  " &lt;" +
                  (0, F.ns)("⌥⌘8") +
                  '></button>\n<button data-mode="sv">' +
                  window.VditorI18n.splitView +
                  " &lt;" +
                  (0, F.ns)("⌥⌘9") +
                  "></button>"),
                H.element.appendChild(D),
                H._bindEvent(S, D, L),
                H
              );
            }
            return (
              Yt(t, b),
              (t.prototype._bindEvent = function (b, S, L) {
                var H = (this || y).element.children[0];
                g(b, S, H, L.level),
                  S.children
                    .item(0)
                    .addEventListener((0, F.Le)(), function (y) {
                      be(b, "wysiwyg", y),
                        y.preventDefault(),
                        y.stopPropagation();
                    }),
                  S.children
                    .item(1)
                    .addEventListener((0, F.Le)(), function (y) {
                      be(b, "ir", y), y.preventDefault(), y.stopPropagation();
                    }),
                  S.children
                    .item(2)
                    .addEventListener((0, F.Le)(), function (y) {
                      be(b, "sv", y), y.preventDefault(), y.stopPropagation();
                    });
              }),
              t
            );
          })(ge),
          Ee = function (y, b) {
            return (0, Kt.Gb)(y, b) ? getSelection().toString() : "";
          },
          ke = function (y, b) {
            b.addEventListener("focus", function () {
              y.options.focus && y.options.focus(a(y)),
                v(y, ["subToolbar", "hint"]);
            });
          },
          Se = function (y, b) {
            b.addEventListener("dblclick", function (b) {
              "IMG" === b.target.tagName &&
                (y.options.image.preview
                  ? y.options.image.preview(b.target)
                  : y.options.image.isPreview &&
                    (0, Gt.E)(b.target, y.options.lang, y.options.theme));
            });
          },
          Le = function (y, b) {
            b.addEventListener("blur", function (b) {
              if ("ir" === y.currentMode) {
                var S = y.ir.element.querySelector(".vditor-ir__node--expand");
                S && S.classList.remove("vditor-ir__node--expand");
              } else "wysiwyg" !== y.currentMode || y.wysiwyg.selectPopover.contains(b.relatedTarget) || y.wysiwyg.hideComment();
              (y[y.currentMode].range = (0, Kt.zh)(y)),
                y.options.blur && y.options.blur(a(y));
            });
          },
          Ce = function (y, b) {
            b.addEventListener("dragstart", function (y) {
              y.dataTransfer.setData(H.g.DROP_EDITOR, H.g.DROP_EDITOR);
            }),
              b.addEventListener("drop", function (b) {
                b.dataTransfer.getData(H.g.DROP_EDITOR)
                  ? dt(y)
                  : (b.dataTransfer.types.includes("Files") ||
                      b.dataTransfer.types.includes("text/html")) &&
                    Ct(y, b, {
                      pasteCode: function (y) {
                        document.execCommand("insertHTML", !1, y);
                      },
                    });
              });
          },
          Me = function (y, b, S) {
            b.addEventListener("copy", function (b) {
              return S(b, y);
            });
          },
          Te = function (y, b, S) {
            b.addEventListener("cut", function (b) {
              S(b, y),
                y.options.comment.enable &&
                  "wysiwyg" === y.currentMode &&
                  y.wysiwyg.getComments(y),
                document.execCommand("delete");
            });
          },
          Ae = function (y) {
            if (
              ("wysiwyg" === y.currentMode &&
                y.options.comment.enable &&
                y.options.comment.adjustTop(y.wysiwyg.getComments(y, !0)),
              y.options.typewriterMode)
            ) {
              var b = y[y.currentMode].element,
                S = (0, Kt.Ny)(b).top;
              "auto" !== y.options.height ||
                y.element.classList.contains("vditor--fullscreen") ||
                window.scrollTo(
                  window.scrollX,
                  S +
                    y.element.offsetTop +
                    y.toolbar.element.offsetHeight -
                    window.innerHeight / 2 +
                    10
                ),
                ("auto" !== y.options.height ||
                  y.element.classList.contains("vditor--fullscreen")) &&
                  (b.scrollTop = S + b.scrollTop - b.clientHeight / 2 + 10);
            }
          },
          _e = function (y, b) {
            b.addEventListener("keydown", function (b) {
              if (
                !(
                  y.options.hint.extend.length > 1 || y.toolbar.elements.emoji
                ) ||
                !y.hint.select(b, y)
              ) {
                if (
                  (y.options.comment.enable &&
                    "wysiwyg" === y.currentMode &&
                    ("Backspace" === b.key || P("⌘X", b)) &&
                    y.wysiwyg.getComments(y),
                  "sv" === y.currentMode)
                ) {
                  if (
                    (function (y, b) {
                      var S, L, H, D, B;
                      if (((y.sv.composingLock = b.isComposing), b.isComposing))
                        return !1;
                      if (
                        (-1 !== b.key.indexOf("Arrow") ||
                          "Meta" === b.key ||
                          "Control" === b.key ||
                          "Alt" === b.key ||
                          "Shift" === b.key ||
                          "CapsLock" === b.key ||
                          "Escape" === b.key ||
                          /^F\d{1,2}$/.test(b.key) ||
                          y.undo.recordFirstPosition(y, b),
                        "Enter" !== b.key &&
                          "Tab" !== b.key &&
                          "Backspace" !== b.key &&
                          -1 === b.key.indexOf("Arrow") &&
                          !(0, F.yl)(b) &&
                          "Escape" !== b.key)
                      )
                        return !1;
                      var U = (0, Kt.zh)(y),
                        we = U.startContainer;
                      3 !== U.startContainer.nodeType &&
                        "DIV" === U.startContainer.tagName &&
                        (we = U.startContainer.childNodes[U.startOffset - 1]);
                      var Dt = (0, Z.a1)(we, "data-type", "text"),
                        Ot = (0, Z.a1)(we, "data-type", "blockquote-marker");
                      if (
                        (!Ot &&
                          0 === U.startOffset &&
                          Dt &&
                          Dt.previousElementSibling &&
                          "blockquote-marker" ===
                            Dt.previousElementSibling.getAttribute(
                              "data-type"
                            ) &&
                          (Ot = Dt.previousElementSibling),
                        Ot &&
                          "Enter" === b.key &&
                          !(0, F.yl)(b) &&
                          !b.altKey &&
                          "" === Ot.nextElementSibling.textContent.trim() &&
                          (0, Kt.im)(Ot, y.sv.element, U).start ===
                            Ot.textContent.length)
                      )
                        return (
                          "padding" ===
                            (null === (S = Ot.previousElementSibling) ||
                            void 0 === S
                              ? void 0
                              : S.getAttribute("data-type")) &&
                            Ot.previousElementSibling.setAttribute(
                              "data-action",
                              "enter-remove"
                            ),
                          Ot.remove(),
                          Ie(y),
                          b.preventDefault(),
                          !0
                        );
                      var jt = (0, Z.a1)(we, "data-type", "li-marker"),
                        Rt = (0, Z.a1)(we, "data-type", "task-marker"),
                        Pt = jt;
                      if (
                        (Pt ||
                          (Rt &&
                            "task-marker" !==
                              Rt.nextElementSibling.getAttribute("data-type") &&
                            (Pt = Rt)),
                        Pt ||
                          0 !== U.startOffset ||
                          !Dt ||
                          !Dt.previousElementSibling ||
                          ("li-marker" !==
                            Dt.previousElementSibling.getAttribute(
                              "data-type"
                            ) &&
                            "task-marker" !==
                              Dt.previousElementSibling.getAttribute(
                                "data-type"
                              )) ||
                          (Pt = Dt.previousElementSibling),
                        Pt)
                      ) {
                        var qt = (0, Kt.im)(Pt, y.sv.element, U).start,
                          Bt = "task-marker" === Pt.getAttribute("data-type"),
                          Vt = Pt;
                        if (
                          (Bt &&
                            (Vt =
                              Pt.previousElementSibling.previousElementSibling
                                .previousElementSibling),
                          qt === Pt.textContent.length)
                        ) {
                          if (
                            "Enter" === b.key &&
                            !(0, F.yl)(b) &&
                            !b.altKey &&
                            !b.shiftKey &&
                            "" === Pt.nextElementSibling.textContent.trim()
                          )
                            return (
                              "padding" ===
                              (null === (L = Vt.previousElementSibling) ||
                              void 0 === L
                                ? void 0
                                : L.getAttribute("data-type"))
                                ? (Vt.previousElementSibling.remove(), V(y))
                                : (Bt &&
                                    (Vt.remove(),
                                    Pt.previousElementSibling.previousElementSibling.remove(),
                                    Pt.previousElementSibling.remove()),
                                  Pt.nextElementSibling.remove(),
                                  Pt.remove(),
                                  Ie(y)),
                              b.preventDefault(),
                              !0
                            );
                          if ("Tab" === b.key)
                            return (
                              Vt.insertAdjacentHTML(
                                "beforebegin",
                                '<span data-type="padding">' +
                                  Vt.textContent.replace(/\S/g, " ") +
                                  "</span>"
                              ),
                              /^\d/.test(Vt.textContent) &&
                                ((Vt.textContent = Vt.textContent.replace(
                                  /^\d{1,}/,
                                  "1"
                                )),
                                U.selectNodeContents(Pt.firstChild),
                                U.collapse(!1)),
                              V(y),
                              b.preventDefault(),
                              !0
                            );
                        }
                      }
                      if (ut(y, U, b)) return !0;
                      var Ut = (0, Z.a1)(we, "data-block", "0"),
                        Wt = (0, ye.S)(we, "SPAN");
                      if (
                        "Enter" === b.key &&
                        !(0, F.yl)(b) &&
                        !b.altKey &&
                        !b.shiftKey &&
                        Ut
                      ) {
                        var Gt = !1,
                          Zt = Ut.textContent.match(/^\n+/);
                        (0, Kt.im)(Ut, y.sv.element).start <=
                          (Zt ? Zt[0].length : 0) && (Gt = !0);
                        var Jt = "\n";
                        if (Wt) {
                          if (
                            "enter-remove" ===
                            (null === (H = Wt.previousElementSibling) ||
                            void 0 === H
                              ? void 0
                              : H.getAttribute("data-action"))
                          )
                            return (
                              Wt.previousElementSibling.remove(),
                              Ie(y),
                              b.preventDefault(),
                              !0
                            );
                          Jt += Oe(Wt);
                        }
                        return (
                          U.insertNode(document.createTextNode(Jt)),
                          U.collapse(!1),
                          Ut && "" !== Ut.textContent.trim() && !Gt
                            ? V(y)
                            : Ie(y),
                          b.preventDefault(),
                          !0
                        );
                      }
                      if (
                        "Backspace" === b.key &&
                        !(0, F.yl)(b) &&
                        !b.altKey &&
                        !b.shiftKey
                      ) {
                        if (
                          Wt &&
                          "newline" ===
                            (null === (D = Wt.previousElementSibling) ||
                            void 0 === D
                              ? void 0
                              : D.getAttribute("data-type")) &&
                          1 === (0, Kt.im)(Wt, y.sv.element, U).start &&
                          -1 ===
                            Wt.getAttribute("data-type").indexOf("code-block-")
                        )
                          return (
                            U.setStart(Wt, 0),
                            U.extractContents(),
                            "" !== Wt.textContent.trim() ? V(y) : Ie(y),
                            b.preventDefault(),
                            !0
                          );
                        if (
                          Ut &&
                          0 === (0, Kt.im)(Ut, y.sv.element, U).start &&
                          Ut.previousElementSibling
                        ) {
                          U.extractContents();
                          var Xt = Ut.previousElementSibling.lastElementChild;
                          return (
                            "newline" === Xt.getAttribute("data-type") &&
                              (Xt.remove(),
                              (Xt =
                                Ut.previousElementSibling.lastElementChild)),
                            "newline" !== Xt.getAttribute("data-type") &&
                              (Xt.insertAdjacentHTML("afterend", Ut.innerHTML),
                              Ut.remove()),
                            "" === Ut.textContent.trim() ||
                            (null === (B = Ut.previousElementSibling) ||
                            void 0 === B
                              ? void 0
                              : B.querySelector(
                                  '[data-type="code-block-open-marker"]'
                                ))
                              ? ("newline" !== Xt.getAttribute("data-type") &&
                                  (U.selectNodeContents(Xt.lastChild),
                                  U.collapse(!1)),
                                Ie(y))
                              : V(y),
                            b.preventDefault(),
                            !0
                          );
                        }
                      }
                      return !1;
                    })(y, b)
                  )
                    return;
                } else if ("wysiwyg" === y.currentMode) {
                  if (
                    (function (y, b) {
                      if (
                        ((y.wysiwyg.composingLock = b.isComposing),
                        b.isComposing)
                      )
                        return !1;
                      -1 !== b.key.indexOf("Arrow") ||
                        "Meta" === b.key ||
                        "Control" === b.key ||
                        "Alt" === b.key ||
                        "Shift" === b.key ||
                        "CapsLock" === b.key ||
                        "Escape" === b.key ||
                        /^F\d{1,2}$/.test(b.key) ||
                        y.undo.recordFirstPosition(y, b);
                      var S = (0, Kt.zh)(y),
                        L = S.startContainer;
                      if (!Ze(b, y, L)) return !1;
                      if (
                        (Je(S, y, b),
                        St(S),
                        "Enter" !== b.key &&
                          "Tab" !== b.key &&
                          "Backspace" !== b.key &&
                          -1 === b.key.indexOf("Arrow") &&
                          !(0, F.yl)(b) &&
                          "Escape" !== b.key &&
                          "Delete" !== b.key)
                      )
                        return !1;
                      var D = (0, Z.F9)(L),
                        B = (0, Z.lG)(L, "P");
                      if (pt(b, y, B, S)) return !0;
                      if (ct(S, y, B, b)) return !0;
                      if (yt(y, b, S)) return !0;
                      var U = (0, Z.fb)(L, "vditor-wysiwyg__block");
                      if (U) {
                        if ("Escape" === b.key && 2 === U.children.length)
                          return (
                            (y.wysiwyg.popover.style.display = "none"),
                            (U.firstElementChild.style.display = "none"),
                            y.wysiwyg.element.blur(),
                            b.preventDefault(),
                            !0
                          );
                        if (
                          !(0, F.yl)(b) &&
                          !b.shiftKey &&
                          b.altKey &&
                          "Enter" === b.key &&
                          "code-block" === U.getAttribute("data-type")
                        ) {
                          var we = y.wysiwyg.popover.querySelector(
                            ".vditor-input"
                          );
                          return (
                            we.focus(), we.select(), b.preventDefault(), !0
                          );
                        }
                        if ("0" === U.getAttribute("data-block")) {
                          if (bt(y, b, U.firstElementChild, S)) return !0;
                          if (tt(y, b, S, U.firstElementChild, U)) return !0;
                          if (
                            "yaml-front-matter" !==
                              U.getAttribute("data-type") &&
                            nt(y, b, S, U.firstElementChild, U)
                          )
                            return !0;
                        }
                      }
                      if (wt(y, S, b, B)) return !0;
                      var Dt = (0, Z.E2)(L, "BLOCKQUOTE");
                      if (Dt && !b.shiftKey && b.altKey && "Enter" === b.key) {
                        (0, F.yl)(b)
                          ? S.setStartBefore(Dt)
                          : S.setStartAfter(Dt),
                          (0, Kt.Hc)(S);
                        var Ot = document.createElement("p");
                        return (
                          Ot.setAttribute("data-block", "0"),
                          (Ot.innerHTML = "\n"),
                          S.insertNode(Ot),
                          S.collapse(!0),
                          (0, Kt.Hc)(S),
                          Y(y),
                          Ae(y),
                          b.preventDefault(),
                          !0
                        );
                      }
                      var jt,
                        Rt = (0, ye.W)(L);
                      if (Rt) {
                        if (
                          "H6" === Rt.tagName &&
                          L.textContent.length === S.startOffset &&
                          !(0, F.yl)(b) &&
                          !b.shiftKey &&
                          !b.altKey &&
                          "Enter" === b.key
                        ) {
                          var Pt = document.createElement("p");
                          return (
                            (Pt.textContent = "\n"),
                            Pt.setAttribute("data-block", "0"),
                            L.parentElement.insertAdjacentElement(
                              "afterend",
                              Pt
                            ),
                            S.setStart(Pt, 0),
                            (0, Kt.Hc)(S),
                            Y(y),
                            Ae(y),
                            b.preventDefault(),
                            !0
                          );
                        }
                        var qt;
                        if (P("⌘=", b))
                          return (
                            (qt = parseInt(Rt.tagName.substr(1), 10) - 1) > 0 &&
                              (te(y, "h" + qt), Y(y)),
                            b.preventDefault(),
                            !0
                          );
                        if (P("⌘-", b))
                          return (
                            (qt = parseInt(Rt.tagName.substr(1), 10) + 1) < 7 &&
                              (te(y, "h" + qt), Y(y)),
                            b.preventDefault(),
                            !0
                          );
                        "Backspace" !== b.key ||
                          (0, F.yl)(b) ||
                          b.shiftKey ||
                          b.altKey ||
                          1 !== Rt.textContent.length ||
                          ne(y);
                      }
                      if (Et(y, S, b)) return !0;
                      if (
                        b.altKey &&
                        "Enter" === b.key &&
                        !(0, F.yl)(b) &&
                        !b.shiftKey
                      ) {
                        var Bt = (0, Z.lG)(L, "A"),
                          Vt = (0, Z.a1)(L, "data-type", "link-ref"),
                          Ut = (0, Z.a1)(L, "data-type", "footnotes-ref");
                        if (Bt || Vt || Ut || (Rt && 2 === Rt.tagName.length)) {
                          var Wt = y.wysiwyg.popover.querySelector("input");
                          Wt.focus(), Wt.select();
                        }
                      }
                      if (ie(y, b)) return !0;
                      if (
                        P("⇧⌘U", b) &&
                        (jt = y.wysiwyg.popover.querySelector(
                          '[data-type="up"]'
                        ))
                      )
                        return jt.click(), b.preventDefault(), !0;
                      if (
                        P("⇧⌘D", b) &&
                        (jt = y.wysiwyg.popover.querySelector(
                          '[data-type="down"]'
                        ))
                      )
                        return jt.click(), b.preventDefault(), !0;
                      if (ut(y, S, b)) return !0;
                      if (
                        !(0, F.yl)(b) &&
                        b.shiftKey &&
                        !b.altKey &&
                        "Enter" === b.key &&
                        "LI" !== L.parentElement.tagName &&
                        "P" !== L.parentElement.tagName
                      )
                        return (
                          ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(
                            L.parentElement.tagName
                          )
                            ? S.insertNode(
                                document.createTextNode("\n" + H.g.ZWSP)
                              )
                            : S.insertNode(document.createTextNode("\n")),
                          S.collapse(!1),
                          (0, Kt.Hc)(S),
                          Y(y),
                          Ae(y),
                          b.preventDefault(),
                          !0
                        );
                      if (
                        "Backspace" === b.key &&
                        !(0, F.yl)(b) &&
                        !b.shiftKey &&
                        !b.altKey &&
                        "" === S.toString()
                      ) {
                        if (kt(y, S, b, B)) return !0;
                        if (D) {
                          if (
                            D.previousElementSibling &&
                            D.previousElementSibling.classList.contains(
                              "vditor-wysiwyg__block"
                            ) &&
                            "0" ===
                              D.previousElementSibling.getAttribute(
                                "data-block"
                              ) &&
                            "UL" !== D.tagName &&
                            "OL" !== D.tagName
                          ) {
                            var Gt = (0, Kt.im)(D, y.wysiwyg.element, S).start;
                            if (
                              (0 === Gt && 0 === S.startOffset) ||
                              (1 === Gt && D.innerText.startsWith(H.g.ZWSP))
                            )
                              return (
                                re(
                                  D.previousElementSibling.lastElementChild,
                                  y,
                                  !1
                                ),
                                "" ===
                                  D.innerHTML.trim().replace(H.g.ZWSP, "") &&
                                  (D.remove(), Y(y)),
                                b.preventDefault(),
                                !0
                              );
                          }
                          var Zt = S.startOffset;
                          if (
                            "" === S.toString() &&
                            3 === L.nodeType &&
                            "\n" === L.textContent.charAt(Zt - 2) &&
                            L.textContent.charAt(Zt - 1) !== H.g.ZWSP &&
                            ["STRONG", "STRIKE", "S", "I", "EM", "B"].includes(
                              L.parentElement.tagName
                            )
                          )
                            return (
                              (L.textContent =
                                L.textContent.substring(0, Zt - 1) + H.g.ZWSP),
                              S.setStart(L, Zt),
                              S.collapse(!0),
                              Y(y),
                              b.preventDefault(),
                              !0
                            );
                          L.textContent === H.g.ZWSP &&
                            1 === S.startOffset &&
                            !L.previousSibling &&
                            (function (y) {
                              for (
                                var b = y.startContainer.nextSibling;
                                b && "" === b.textContent;

                              )
                                b = b.nextSibling;
                              return !(
                                !b ||
                                3 === b.nodeType ||
                                ("CODE" !== b.tagName &&
                                  "math-inline" !==
                                    b.getAttribute("data-type") &&
                                  "html-entity" !==
                                    b.getAttribute("data-type") &&
                                  "html-inline" !== b.getAttribute("data-type"))
                              );
                            })(S) &&
                            (L.textContent = ""),
                            D.querySelectorAll(
                              "span.vditor-wysiwyg__block[data-type='math-inline']"
                            ).forEach(function (y) {
                              (y.firstElementChild.style.display = "inline"),
                                (y.lastElementChild.style.display = "none");
                            }),
                            D.querySelectorAll(
                              "span.vditor-wysiwyg__block[data-type='html-entity']"
                            ).forEach(function (y) {
                              (y.firstElementChild.style.display = "inline"),
                                (y.lastElementChild.style.display = "none");
                            });
                        }
                      }
                      if (
                        (0, F.vU)() &&
                        1 === S.startOffset &&
                        L.textContent.indexOf(H.g.ZWSP) > -1 &&
                        L.previousSibling &&
                        3 !== L.previousSibling.nodeType &&
                        "CODE" === L.previousSibling.tagName &&
                        ("Backspace" === b.key || "ArrowLeft" === b.key)
                      )
                        return (
                          S.selectNodeContents(L.previousSibling),
                          S.collapse(!1),
                          b.preventDefault(),
                          !0
                        );
                      if (Lt(b, D, S)) return b.preventDefault(), !0;
                      if ((Xe(S, b.key), "ArrowDown" === b.key)) {
                        var Jt = L.nextSibling;
                        Jt &&
                          3 !== Jt.nodeType &&
                          "math-inline" === Jt.getAttribute("data-type") &&
                          S.setStartAfter(Jt);
                      }
                      return !(!D || !j(D, y, b, S) || (b.preventDefault(), 0));
                    })(y, b)
                  )
                    return;
                } else if (
                  "ir" === y.currentMode &&
                  (function (y, b) {
                    if (((y.ir.composingLock = b.isComposing), b.isComposing))
                      return !1;
                    -1 !== b.key.indexOf("Arrow") ||
                      "Meta" === b.key ||
                      "Control" === b.key ||
                      "Alt" === b.key ||
                      "Shift" === b.key ||
                      "CapsLock" === b.key ||
                      "Escape" === b.key ||
                      /^F\d{1,2}$/.test(b.key) ||
                      y.undo.recordFirstPosition(y, b);
                    var S = (0, Kt.zh)(y),
                      L = S.startContainer;
                    if (!Ze(b, y, L)) return !1;
                    if (
                      (Je(S, y, b),
                      St(S),
                      "Enter" !== b.key &&
                        "Tab" !== b.key &&
                        "Backspace" !== b.key &&
                        -1 === b.key.indexOf("Arrow") &&
                        !(0, F.yl)(b) &&
                        "Escape" !== b.key &&
                        "Delete" !== b.key)
                    )
                      return !1;
                    var D = (0, Z.a1)(L, "data-newline", "1");
                    if (
                      !(0, F.yl)(b) &&
                      !b.altKey &&
                      !b.shiftKey &&
                      "Enter" === b.key &&
                      D &&
                      S.startOffset < D.textContent.length
                    ) {
                      var B = D.previousElementSibling;
                      B &&
                        (S.insertNode(document.createTextNode(B.textContent)),
                        S.collapse(!1));
                      var U = D.nextSibling;
                      U &&
                        (S.insertNode(document.createTextNode(U.textContent)),
                        S.collapse(!0));
                    }
                    var we = (0, Z.lG)(L, "P");
                    if (pt(b, y, we, S)) return !0;
                    if (ct(S, y, we, b)) return !0;
                    if (wt(y, S, b, we)) return !0;
                    var Dt = (0, Z.fb)(L, "vditor-ir__marker--pre");
                    if (Dt && "PRE" === Dt.tagName) {
                      var Ot = Dt.firstChild;
                      if (bt(y, b, Dt, S)) return !0;
                      if (
                        ("math-block" === Ot.getAttribute("data-type") ||
                          "html-block" === Ot.getAttribute("data-type")) &&
                        nt(y, b, S, Ot, Dt.parentElement)
                      )
                        return !0;
                      if (tt(y, b, S, Ot, Dt.parentElement)) return !0;
                    }
                    var jt = (0, Z.a1)(L, "data-type", "code-block-info");
                    if (jt) {
                      if ("Enter" === b.key || "Tab" === b.key)
                        return (
                          S.selectNodeContents(
                            jt.nextElementSibling.firstChild
                          ),
                          S.collapse(!0),
                          b.preventDefault(),
                          v(y, ["hint"]),
                          !0
                        );
                      if ("Backspace" === b.key) {
                        var Rt = (0, Kt.im)(jt, y.ir.element).start;
                        1 === Rt && S.setStart(L, 0),
                          2 === Rt && (y.hint.recentLanguage = "");
                      }
                      if (nt(y, b, S, jt, jt.parentElement))
                        return v(y, ["hint"]), !0;
                    }
                    var Pt = (0, Z.lG)(L, "TD") || (0, Z.lG)(L, "TH");
                    if (b.key.indexOf("Arrow") > -1 && Pt) {
                      var qt = Qe(Pt);
                      if (qt && nt(y, b, S, Pt, qt)) return !0;
                      var Bt = $e(Pt);
                      if (Bt && tt(y, b, S, Pt, Bt)) return !0;
                    }
                    if (yt(y, b, S)) return !0;
                    if (Et(y, S, b)) return !0;
                    if (ut(y, S, b)) return !0;
                    var Vt = (0, ye.W)(L);
                    if (Vt) {
                      var Ut;
                      if (P("⌘=", b))
                        return (
                          (Ut = Vt.querySelector(
                            ".vditor-ir__marker--heading"
                          )) &&
                            Ut.textContent.trim().length > 1 &&
                            At(y, Ut.textContent.substr(1)),
                          b.preventDefault(),
                          !0
                        );
                      if (P("⌘-", b))
                        return (
                          (Ut = Vt.querySelector(
                            ".vditor-ir__marker--heading"
                          )) &&
                            Ut.textContent.trim().length < 6 &&
                            At(y, Ut.textContent.trim() + "# "),
                          b.preventDefault(),
                          !0
                        );
                    }
                    var Wt = (0, Z.F9)(L);
                    if (
                      "Backspace" === b.key &&
                      !(0, F.yl)(b) &&
                      !b.shiftKey &&
                      !b.altKey &&
                      "" === S.toString()
                    ) {
                      if (kt(y, S, b, we)) return !0;
                      if (
                        Wt &&
                        Wt.previousElementSibling &&
                        "UL" !== Wt.tagName &&
                        "OL" !== Wt.tagName &&
                        ("code-block" ===
                          Wt.previousElementSibling.getAttribute("data-type") ||
                          "math-block" ===
                            Wt.previousElementSibling.getAttribute("data-type"))
                      ) {
                        var Gt = (0, Kt.im)(Wt, y.ir.element, S).start;
                        if (
                          0 === Gt ||
                          (1 === Gt && Wt.innerText.startsWith(H.g.ZWSP))
                        )
                          return (
                            S.selectNodeContents(
                              Wt.previousElementSibling.querySelector(
                                ".vditor-ir__marker--pre code"
                              )
                            ),
                            S.collapse(!1),
                            q(S, y),
                            "" ===
                              Wt.textContent.trim().replace(H.g.ZWSP, "") &&
                              (Wt.remove(), Tt(y)),
                            b.preventDefault(),
                            !0
                          );
                      }
                      if (Vt) {
                        var Zt = Vt.firstElementChild.textContent.length;
                        (0, Kt.im)(Vt, y.ir.element).start === Zt &&
                          (S.setStart(Vt.firstElementChild.firstChild, Zt - 1),
                          S.collapse(!0),
                          (0, Kt.Hc)(S));
                      }
                    }
                    return !(
                      (("ArrowUp" !== b.key && "ArrowDown" !== b.key) ||
                        !Wt ||
                        (Wt.querySelectorAll(".vditor-ir__node").forEach(
                          function (y) {
                            y.contains(L) ||
                              y.classList.add("vditor-ir__node--hidden");
                          }
                        ),
                        !Lt(b, Wt, S))) &&
                      (Xe(S, b.key),
                      !Wt || !j(Wt, y, b, S) || (b.preventDefault(), 0))
                    );
                  })(y, b)
                )
                  return;
                if (y.options.ctrlEnter && P("⌘Enter", b))
                  return y.options.ctrlEnter(a(y)), void b.preventDefault();
                if (P("⌘Z", b) && !y.toolbar.elements.undo)
                  return y.undo.undo(y), void b.preventDefault();
                if (P("⌘Y", b) && !y.toolbar.elements.redo)
                  return y.undo.redo(y), void b.preventDefault();
                if ("Escape" === b.key)
                  return (
                    "block" === y.hint.element.style.display
                      ? (y.hint.element.style.display = "none")
                      : y.options.esc && !b.isComposing && y.options.esc(a(y)),
                    void b.preventDefault()
                  );
                if (
                  (0, F.yl)(b) &&
                  b.altKey &&
                  !b.shiftKey &&
                  /^Digit[1-6]$/.test(b.code)
                ) {
                  if ("wysiwyg" === y.currentMode) {
                    var S = b.code.replace("Digit", "H");
                    (0, Z.lG)(getSelection().getRangeAt(0).startContainer, S)
                      ? ne(y)
                      : te(y, S),
                      Y(y);
                  } else
                    "sv" === y.currentMode
                      ? je(
                          y,
                          "#".repeat(
                            parseInt(b.code.replace("Digit", ""), 10)
                          ) + " "
                        )
                      : "ir" === y.currentMode &&
                        At(
                          y,
                          "#".repeat(
                            parseInt(b.code.replace("Digit", ""), 10)
                          ) + " "
                        );
                  return b.preventDefault(), !0;
                }
                if (
                  (0, F.yl)(b) &&
                  b.altKey &&
                  !b.shiftKey &&
                  /^Digit[7-9]$/.test(b.code)
                )
                  return (
                    "Digit7" === b.code
                      ? be(y, "wysiwyg", b)
                      : "Digit8" === b.code
                      ? be(y, "ir", b)
                      : "Digit9" === b.code && be(y, "sv", b),
                    !0
                  );
                y.options.toolbar.find(function (S) {
                  return !S.hotkey || S.toolbar
                    ? !!S.toolbar &&
                        !!S.toolbar.find(function (S) {
                          return (
                            !!S.hotkey &&
                            (P(S.hotkey, b)
                              ? (y.toolbar.elements[
                                  S.name
                                ].children[0].dispatchEvent(
                                  new CustomEvent((0, F.Le)())
                                ),
                                b.preventDefault(),
                                !0)
                              : void 0)
                          );
                        })
                    : P(S.hotkey, b)
                    ? (y.toolbar.elements[S.name].children[0].dispatchEvent(
                        new CustomEvent((0, F.Le)())
                      ),
                      b.preventDefault(),
                      !0)
                    : void 0;
                });
              }
            });
          },
          xe = function (y, b) {
            b.addEventListener("selectstart", function (S) {
              b.onmouseup = function () {
                setTimeout(function () {
                  var b = Ee(y[y.currentMode].element);
                  b.trim()
                    ? ("wysiwyg" === y.currentMode &&
                        y.options.comment.enable &&
                        ((0, Z.a1)(S.target, "data-type", "footnotes-block") ||
                        (0, Z.a1)(S.target, "data-type", "link-ref-defs-block")
                          ? y.wysiwyg.hideComment()
                          : y.wysiwyg.showComment()),
                      y.options.select && y.options.select(b))
                    : "wysiwyg" === y.currentMode &&
                      y.options.comment.enable &&
                      y.wysiwyg.hideComment();
                });
              };
            });
          },
          He = function (y, b) {
            var S = (0, Kt.zh)(y);
            S.extractContents(),
              S.insertNode(document.createTextNode(Lute.Caret)),
              S.insertNode(document.createTextNode(b));
            var L = (0, Z.a1)(S.startContainer, "data-block", "0");
            L || (L = y.sv.element);
            var H = y.lute.SpinVditorSVDOM(L.textContent);
            (H =
              H.indexOf('data-type="footnotes-link"') > -1 ||
              H.indexOf('data-type="link-ref-defs-block"') > -1
                ? "<div data-block='0'>" + H + "</div>"
                : "<div data-block='0'>" +
                  H.replace(
                    /<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g,
                    '<span data-type="newline"><br /><span style="display: none">\n</span></span><span data-type="newline"><br /><span style="display: none">\n</span></span></div><div data-block="0"><'
                  ) +
                  "</div>"),
              L.isEqualNode(y.sv.element)
                ? (L.innerHTML = H)
                : (L.outerHTML = H),
              (0, Kt.ib)(y.sv.element, S),
              Ae(y);
          },
          Ne = function (y, b, S) {
            void 0 === S && (S = !0);
            var L = y;
            for (3 === L.nodeType && (L = L.parentElement); L; ) {
              if (L.getAttribute("data-type") === b) return L;
              L = S ? L.previousElementSibling : L.nextElementSibling;
            }
            return !1;
          },
          De = function (y, b) {
            w("SpinVditorSVDOM", y, "argument", b.options.debugger);
            var S = b.lute.SpinVditorSVDOM(y);
            return (
              (y =
                S.indexOf('data-type="footnotes-link"') > -1 ||
                S.indexOf('data-type="link-ref-defs-block"') > -1
                  ? "<div data-block='0'>" + S + "</div>"
                  : "<div data-block='0'>" +
                    S.replace(
                      /<span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span><span data-type="newline"><br \/><span style="display: none">\n<\/span><\/span></g,
                      '<span data-type="newline"><br /><span style="display: none">\n</span></span><span data-type="newline"><br /><span style="display: none">\n</span></span></div><div data-block="0"><'
                    ) +
                    "</div>"),
              w("SpinVditorSVDOM", y, "result", b.options.debugger),
              y
            );
          },
          Oe = function (y) {
            var b = y.getAttribute("data-type"),
              S = y.previousElementSibling,
              L =
                b &&
                "text" !== b &&
                "table" !== b &&
                "heading-marker" !== b &&
                "newline" !== b &&
                "yaml-front-matter-open-marker" !== b &&
                "yaml-front-matter-close-marker" !== b &&
                "code-block-info" !== b &&
                "code-block-close-marker" !== b &&
                "code-block-open-marker" !== b
                  ? y.textContent
                  : "",
              H = !1;
            for ("newline" === b && (H = !0); S && !H; ) {
              var D = S.getAttribute("data-type");
              if (
                "li-marker" === D ||
                "blockquote-marker" === D ||
                "task-marker" === D ||
                "padding" === D
              ) {
                var B = S.textContent;
                if (
                  "li-marker" !== D ||
                  ("code-block-open-marker" !== b && "code-block-info" !== b)
                )
                  if (
                    "code-block-close-marker" === b &&
                    S.nextElementSibling.isSameNode(y)
                  ) {
                    var U = Ne(y, "code-block-open-marker");
                    U &&
                      U.previousElementSibling &&
                      ((S = U.previousElementSibling), (L = B + L));
                  } else L = B + L;
                else L = B.replace(/\S/g, " ") + L;
              } else "newline" === D && (H = !0);
              S = S.previousElementSibling;
            }
            return L;
          },
          Ie = function (y, b) {
            void 0 === b &&
              (b = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }),
              b.enableHint && y.hint.render(y),
              y.preview.render(y);
            var S = a(y);
            "function" == typeof y.options.input &&
              b.enableInput &&
              y.options.input(S),
              y.options.counter.enable && y.counter.render(y, S),
              y.options.cache.enable &&
                (0, F.pK)() &&
                (localStorage.setItem(y.options.cache.id, S),
                y.options.cache.after && y.options.cache.after(S)),
              y.devtools && y.devtools.renderEchart(y),
              clearTimeout(y.sv.processTimeoutId),
              (y.sv.processTimeoutId = window.setTimeout(function () {
                b.enableAddUndoStack &&
                  !y.sv.composingLock &&
                  y.undo.addToUndoStack(y);
              }, y.options.undoDelay));
          },
          je = function (y, b) {
            var S = (0, Kt.zh)(y),
              L = (0, ye.S)(S.startContainer, "SPAN");
            L && "" !== L.textContent.trim() && (b = "\n" + b),
              S.collapse(!0),
              document.execCommand("insertHTML", !1, b);
          },
          Re = function (y, b, S, L) {
            var H = (0, Kt.zh)(y),
              D = b.getAttribute("data-type");
            0 === y.sv.element.childNodes.length &&
              ((y.sv.element.innerHTML =
                '<span data-type="p" data-block="0"><span data-type="text"><wbr></span></span><span data-type="newline"><br><span style="display: none">\n</span></span>'),
              (0, Kt.ib)(y.sv.element, H));
            var B = (0, Z.F9)(H.startContainer),
              U = (0, ye.S)(H.startContainer, "SPAN");
            if (B) {
              if ("link" === D) {
                var F = void 0;
                return (
                  (F =
                    "" === H.toString()
                      ? "" + S + Lute.Caret + L
                      : "" +
                        S +
                        H.toString() +
                        L.replace(")", Lute.Caret + ")")),
                  void document.execCommand("insertHTML", !1, F)
                );
              }
              if (
                "italic" === D ||
                "bold" === D ||
                "strike" === D ||
                "inline-code" === D ||
                "code" === D ||
                "table" === D ||
                "line" === D
              ) {
                F = void 0;
                return (
                  (F =
                    "" === H.toString()
                      ? "" + S + Lute.Caret + ("code" === D ? "" : L)
                      : "" +
                        S +
                        H.toString() +
                        Lute.Caret +
                        ("code" === D ? "" : L)),
                  "table" === D || ("code" === D && U && "" !== U.textContent)
                    ? (F = "\n\n" + F)
                    : "line" === D && (F = "\n\n" + S + "\n" + Lute.Caret),
                  void document.execCommand("insertHTML", !1, F)
                );
              }
              if (
                ("check" === D ||
                  "list" === D ||
                  "ordered-list" === D ||
                  "quote" === D) &&
                U
              ) {
                var we = "* ";
                "check" === D
                  ? (we = "* [ ] ")
                  : "ordered-list" === D
                  ? (we = "1. ")
                  : "quote" === D && (we = "> ");
                var Dt = Ne(U, "newline");
                return (
                  Dt
                    ? Dt.insertAdjacentText("afterend", we)
                    : B.insertAdjacentText("afterbegin", we),
                  void V(y)
                );
              }
              (0, Kt.ib)(y.sv.element, H), Ie(y);
            }
          },
          Pe = function (y) {
            switch (y.currentMode) {
              case "ir":
                return y.ir.element;
              case "wysiwyg":
                return y.wysiwyg.element;
              case "sv":
                return y.sv.element;
            }
          },
          qe = function (y, b) {
            y.options.upload.setHeaders &&
              (y.options.upload.headers = y.options.upload.setHeaders()),
              y.options.upload.headers &&
                Object.keys(y.options.upload.headers).forEach(function (S) {
                  b.setRequestHeader(S, y.options.upload.headers[S]);
                });
          },
          Be = function (y, b, S, L) {
            return new (S || (S = Promise))(function (H, D) {
              function a(y) {
                try {
                  s(L.next(y));
                } catch (y) {
                  D(y);
                }
              }
              function l(y) {
                try {
                  s(L.throw(y));
                } catch (y) {
                  D(y);
                }
              }
              function s(y) {
                var b;
                y.done
                  ? H(y.value)
                  : ((b = y.value),
                    b instanceof S
                      ? b
                      : new S(function (y) {
                          y(b);
                        })).then(a, l);
              }
              s((L = L.apply(y, b || [])).next());
            });
          },
          Ve = function (b, S) {
            var L,
              H,
              D,
              B,
              U = {
                label: 0,
                sent: function () {
                  if (1 & D[0]) throw D[1];
                  return D[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (B = { next: l(0), throw: l(1), return: l(2) }),
              "function" == typeof Symbol &&
                (B[Symbol.iterator] = function () {
                  return this || y;
                }),
              B
            );
            function l(y) {
              return function (B) {
                return (function (y) {
                  if (L) throw new TypeError("Generator is already executing.");
                  for (; U; )
                    try {
                      if (
                        ((L = 1),
                        H &&
                          (D =
                            2 & y[0]
                              ? H.return
                              : y[0]
                              ? H.throw || ((D = H.return) && D.call(H), 0)
                              : H.next) &&
                          !(D = D.call(H, y[1])).done)
                      )
                        return D;
                      switch (((H = 0), D && (y = [2 & y[0], D.value]), y[0])) {
                        case 0:
                        case 1:
                          D = y;
                          break;
                        case 4:
                          return U.label++, { value: y[1], done: !1 };
                        case 5:
                          U.label++, (H = y[1]), (y = [0]);
                          continue;
                        case 7:
                          (y = U.ops.pop()), U.trys.pop();
                          continue;
                        default:
                          if (
                            !((D = U.trys),
                            (D = D.length > 0 && D[D.length - 1]) ||
                              (6 !== y[0] && 2 !== y[0]))
                          ) {
                            U = 0;
                            continue;
                          }
                          if (
                            3 === y[0] &&
                            (!D || (y[1] > D[0] && y[1] < D[3]))
                          ) {
                            U.label = y[1];
                            break;
                          }
                          if (6 === y[0] && U.label < D[1]) {
                            (U.label = D[1]), (D = y);
                            break;
                          }
                          if (D && U.label < D[2]) {
                            (U.label = D[2]), U.ops.push(y);
                            break;
                          }
                          D[2] && U.ops.pop(), U.trys.pop();
                          continue;
                      }
                      y = S.call(b, U);
                    } catch (b) {
                      (y = [6, b]), (H = 0);
                    } finally {
                      L = D = 0;
                    }
                  if (5 & y[0]) throw y[1];
                  return { value: y[0] ? y[1] : void 0, done: !0 };
                })([y, B]);
              };
            }
          },
          Ue = function () {
            ((this || y).isUploading = !1),
              ((this || y).element = document.createElement("div")),
              ((this || y).element.className = "vditor-upload");
          },
          We = function (b, S, L) {
            return Be(void 0, void 0, void 0, function () {
              var H, D, B, U, F, Z, ye, we, Dt, Ot, jt, Rt, Pt, qt;
              return Ve(this || y, function (y) {
                switch (y.label) {
                  case 0:
                    for (
                      H = [],
                        D = !0 === b.options.upload.multiple ? S.length : 1,
                        Rt = 0;
                      Rt < D;
                      Rt++
                    )
                      (B = S[Rt]) instanceof DataTransferItem &&
                        (B = B.getAsFile()),
                        H.push(B);
                    return b.options.upload.handler
                      ? [4, b.options.upload.handler(H)]
                      : [3, 2];
                  case 1:
                    return (
                      (U = y.sent()),
                      L && (L.value = ""),
                      "string" == typeof U ? (b.tip.show(U), [2]) : [2]
                    );
                  case 2:
                    return b.options.upload.url && b.upload
                      ? b.options.upload.file
                        ? [4, b.options.upload.file(H)]
                        : [3, 4]
                      : (L && (L.value = ""),
                        b.tip.show("please config: options.upload.url"),
                        [2]);
                  case 3:
                    (H = y.sent()), (y.label = 4);
                  case 4:
                    if (
                      b.options.upload.validate &&
                      "string" == typeof (U = b.options.upload.validate(H))
                    )
                      return b.tip.show(U), [2];
                    if (
                      ((F = Pe(b)),
                      (b.upload.range = (0, Kt.zh)(b)),
                      (Z = (function (y, b) {
                        y.tip.hide();
                        for (
                          var S = [],
                            L = "",
                            H = "",
                            D =
                              (y.options.lang,
                              y.options,
                              function (D, B) {
                                var U = b[B],
                                  F = !0;
                                U.name ||
                                  ((L +=
                                    "<li>" +
                                    window.VditorI18n.nameEmpty +
                                    "</li>"),
                                  (F = !1)),
                                  U.size > y.options.upload.max &&
                                    ((L +=
                                      "<li>" +
                                      U.name +
                                      " " +
                                      window.VditorI18n.over +
                                      " " +
                                      y.options.upload.max / 1024 / 1024 +
                                      "M</li>"),
                                    (F = !1));
                                var Z = U.name.lastIndexOf("."),
                                  ye = U.name.substr(Z),
                                  we =
                                    y.options.upload.filename(
                                      U.name.substr(0, Z)
                                    ) + ye;
                                y.options.upload.accept &&
                                  (y.options.upload.accept
                                    .split(",")
                                    .some(function (y) {
                                      var b = y.trim();
                                      if (0 === b.indexOf(".")) {
                                        if (
                                          ye.toLowerCase() === b.toLowerCase()
                                        )
                                          return !0;
                                      } else if (U.type.split("/")[0] === b.split("/")[0]) return !0;
                                      return !1;
                                    }) ||
                                    ((L +=
                                      "<li>" +
                                      U.name +
                                      " " +
                                      window.VditorI18n.fileTypeError +
                                      "</li>"),
                                    (F = !1))),
                                  F &&
                                    (S.push(U),
                                    (H +=
                                      "<li>" +
                                      we +
                                      " " +
                                      window.VditorI18n.uploading +
                                      "</li>"));
                              }),
                            B = b.length,
                            U = 0;
                          U < B;
                          U++
                        )
                          D(0, U);
                        return y.tip.show("<ul>" + L + H + "</ul>"), S;
                      })(b, H)),
                      0 === Z.length)
                    )
                      return L && (L.value = ""), [2];
                    for (
                      ye = new FormData(),
                        we = b.options.upload.extraData,
                        Dt = 0,
                        Ot = Object.keys(we);
                      Dt < Ot.length;
                      Dt++
                    )
                      (jt = Ot[Dt]), ye.append(jt, we[jt]);
                    for (Rt = 0, Pt = Z.length; Rt < Pt; Rt++)
                      ye.append(b.options.upload.fieldName, Z[Rt]);
                    return (
                      (qt = new XMLHttpRequest()).open(
                        "POST",
                        b.options.upload.url
                      ),
                      b.options.upload.token &&
                        qt.setRequestHeader(
                          "X-Upload-Token",
                          b.options.upload.token
                        ),
                      b.options.upload.withCredentials &&
                        (qt.withCredentials = !0),
                      qe(b, qt),
                      (b.upload.isUploading = !0),
                      F.setAttribute("contenteditable", "false"),
                      (qt.onreadystatechange = function () {
                        if (qt.readyState === XMLHttpRequest.DONE) {
                          if (
                            ((b.upload.isUploading = !1),
                            F.setAttribute("contenteditable", "true"),
                            qt.status >= 200 && qt.status < 300)
                          )
                            if (b.options.upload.success)
                              b.options.upload.success(F, qt.responseText);
                            else {
                              var y = qt.responseText;
                              b.options.upload.format &&
                                (y = b.options.upload.format(
                                  S,
                                  qt.responseText
                                )),
                                (function (y, b) {
                                  Pe(b).focus();
                                  var S = JSON.parse(y),
                                    L = "";
                                  1 === S.code && (L = "" + S.msg),
                                    S.data.errFiles &&
                                      S.data.errFiles.length > 0 &&
                                      ((L = "<ul><li>" + L + "</li>"),
                                      S.data.errFiles.forEach(function (y) {
                                        var S = y.lastIndexOf("."),
                                          H =
                                            b.options.upload.filename(
                                              y.substr(0, S)
                                            ) + y.substr(S);
                                        L +=
                                          "<li>" +
                                          H +
                                          " " +
                                          window.VditorI18n.uploadError +
                                          "</li>";
                                      }),
                                      (L += "</ul>")),
                                    L ? b.tip.show(L) : b.tip.hide();
                                  var H = "";
                                  Object.keys(S.data.succMap).forEach(function (
                                    y
                                  ) {
                                    var L = S.data.succMap[y],
                                      D = y.lastIndexOf("."),
                                      B = y.substr(D),
                                      U =
                                        b.options.upload.filename(
                                          y.substr(0, D)
                                        ) + B;
                                    0 ===
                                      (B = B.toLowerCase()).indexOf(".wav") ||
                                    0 === B.indexOf(".mp3") ||
                                    0 === B.indexOf(".ogg")
                                      ? "wysiwyg" === b.currentMode
                                        ? (H +=
                                            '<div class="vditor-wysiwyg__block" data-type="html-block"\n data-block="0"><pre><code>&lt;audio controls="controls" src="' +
                                            L +
                                            '"&gt;&lt;/audio&gt;</code></pre><pre class="vditor-wysiwyg__preview" data-render="1"><audio controls="controls" src="' +
                                            L +
                                            '"></audio></pre></div>\n')
                                        : "ir" === b.currentMode
                                        ? (H +=
                                            '<audio controls="controls" src="' +
                                            L +
                                            '"></audio>\n')
                                        : (H += "[" + U + "](" + L + ")\n")
                                      : 0 === B.indexOf(".apng") ||
                                        0 === B.indexOf(".bmp") ||
                                        0 === B.indexOf(".gif") ||
                                        0 === B.indexOf(".ico") ||
                                        0 === B.indexOf(".cur") ||
                                        0 === B.indexOf(".jpg") ||
                                        0 === B.indexOf(".jpeg") ||
                                        0 === B.indexOf(".jfif") ||
                                        0 === B.indexOf(".pjp") ||
                                        0 === B.indexOf(".pjpeg") ||
                                        0 === B.indexOf(".png") ||
                                        0 === B.indexOf(".svg") ||
                                        0 === B.indexOf(".webp")
                                      ? "wysiwyg" === b.currentMode
                                        ? (H +=
                                            '<img alt="' +
                                            U +
                                            '" src="' +
                                            L +
                                            '">\n')
                                        : (H += "![" + U + "](" + L + ")\n")
                                      : "wysiwyg" === b.currentMode
                                      ? (H +=
                                          '<a href="' + L + '">' + U + "</a>\n")
                                      : (H += "[" + U + "](" + L + ")\n");
                                  }),
                                    (0, Kt.Hc)(b.upload.range),
                                    document.execCommand("insertHTML", !1, H),
                                    (b.upload.range = getSelection()
                                      .getRangeAt(0)
                                      .cloneRange());
                                })(y, b);
                            }
                          else
                            b.options.upload.error
                              ? b.options.upload.error(qt.responseText)
                              : b.tip.show(qt.responseText);
                          L && (L.value = ""),
                            (b.upload.element.style.display = "none");
                        }
                      }),
                      (qt.upload.onprogress = function (y) {
                        if (y.lengthComputable) {
                          var S = (y.loaded / y.total) * 100;
                          (b.upload.element.style.display = "block"),
                            (b.upload.element.style.width = S + "%");
                        }
                      }),
                      qt.send(ye),
                      [2]
                    );
                }
              });
            });
          },
          ze = function (y, b, S) {
            var L,
              D = (0, Z.F9)(b.startContainer);
            if (
              (D || (D = y.wysiwyg.element),
              (S &&
                "formatItalic" !== S.inputType &&
                "deleteByDrag" !== S.inputType &&
                "insertFromDrop" !== S.inputType &&
                "formatBold" !== S.inputType &&
                "formatRemove" !== S.inputType &&
                "formatStrikeThrough" !== S.inputType &&
                "insertUnorderedList" !== S.inputType &&
                "insertOrderedList" !== S.inputType &&
                "formatOutdent" !== S.inputType &&
                "formatIndent" !== S.inputType &&
                "" !== S.inputType) ||
                !S)
            ) {
              var B = (function (y) {
                for (var b = y.previousSibling; b; ) {
                  if (
                    3 !== b.nodeType &&
                    "A" === b.tagName &&
                    !b.previousSibling &&
                    "" === b.innerHTML.replace(H.g.ZWSP, "") &&
                    b.nextSibling
                  )
                    return b;
                  b = b.previousSibling;
                }
                return !1;
              })(b.startContainer);
              B && B.remove(),
                y.wysiwyg.element.querySelectorAll("wbr").forEach(function (y) {
                  y.remove();
                }),
                b.insertNode(document.createElement("wbr")),
                D.querySelectorAll("[style]").forEach(function (y) {
                  y.removeAttribute("style");
                }),
                D.querySelectorAll(".vditor-comment").forEach(function (y) {
                  "" === y.textContent.trim() &&
                    (y.classList.remove(
                      "vditor-comment",
                      "vditor-comment--focus"
                    ),
                    y.removeAttribute("data-cmtids"));
                }),
                null === (L = D.previousElementSibling) ||
                  void 0 === L ||
                  L.querySelectorAll(".vditor-comment").forEach(function (y) {
                    "" === y.textContent.trim() &&
                      (y.classList.remove(
                        "vditor-comment",
                        "vditor-comment--focus"
                      ),
                      y.removeAttribute("data-cmtids"));
                  });
              var U = "";
              "link-ref-defs-block" === D.getAttribute("data-type") &&
                (D = y.wysiwyg.element);
              var F,
                we = D.isEqualNode(y.wysiwyg.element),
                Dt = (0, Z.a1)(D, "data-type", "footnotes-block");
              if (we) U = D.innerHTML;
              else {
                var Ot = (0, Z.O9)(b.startContainer);
                if (Ot && !Dt) {
                  var jt = (0, ye.S)(b.startContainer, "BLOCKQUOTE");
                  D = jt ? (0, Z.F9)(b.startContainer) || D : Ot;
                }
                if (
                  (Dt && (D = Dt),
                  (U = D.outerHTML),
                  "UL" === D.tagName || "OL" === D.tagName)
                ) {
                  var Rt = D.previousElementSibling,
                    Pt = D.nextElementSibling;
                  !Rt ||
                    ("UL" !== Rt.tagName && "OL" !== Rt.tagName) ||
                    ((U = Rt.outerHTML + U), Rt.remove()),
                    !Pt ||
                      ("UL" !== Pt.tagName && "OL" !== Pt.tagName) ||
                      ((U += Pt.outerHTML), Pt.remove()),
                    (U = U.replace(
                      "<div><wbr><br></div>",
                      "<li><p><wbr><br></p></li>"
                    ));
                }
                D.innerText.startsWith("```") ||
                  (y.wysiwyg.element
                    .querySelectorAll("[data-type='link-ref-defs-block']")
                    .forEach(function (y) {
                      y &&
                        !D.isEqualNode(y) &&
                        ((U += y.outerHTML), y.remove());
                    }),
                  y.wysiwyg.element
                    .querySelectorAll("[data-type='footnotes-block']")
                    .forEach(function (y) {
                      y &&
                        !D.isEqualNode(y) &&
                        ((U += y.outerHTML), y.remove());
                    }));
              }
              if (
                ('<p data-block="0">```<wbr></p>' ===
                  (U = U.replace(
                    /<\/(strong|b)><strong data-marker="\W{2}">/g,
                    ""
                  )
                    .replace(/<\/(em|i)><em data-marker="\W{1}">/g, "")
                    .replace(/<\/(s|strike)><s data-marker="~{1,2}">/g, "")) &&
                  y.hint.recentLanguage &&
                  (U = '<p data-block="0">```<wbr></p>'.replace(
                    "```",
                    "```" + y.hint.recentLanguage
                  )),
                w("SpinVditorDOM", U, "argument", y.options.debugger),
                (U = y.lute.SpinVditorDOM(U)),
                w("SpinVditorDOM", U, "result", y.options.debugger),
                we)
              )
                D.innerHTML = U;
              else if (((D.outerHTML = U), Dt)) {
                var qt = (0, Z.E2)(
                  y.wysiwyg.element.querySelector("wbr"),
                  "LI"
                );
                if (qt) {
                  var Bt = y.wysiwyg.element.querySelector(
                    'sup[data-type="footnotes-ref"][data-footnotes-label="' +
                      qt.getAttribute("data-marker") +
                      '"]'
                  );
                  Bt &&
                    Bt.setAttribute(
                      "aria-label",
                      qt.textContent.trim().substr(0, 24)
                    );
                }
              }
              var Vt,
                Ut = y.wysiwyg.element.querySelectorAll(
                  "[data-type='link-ref-defs-block']"
                );
              Ut.forEach(function (y, b) {
                0 === b
                  ? (F = y)
                  : (F.insertAdjacentHTML("beforeend", y.innerHTML),
                    y.remove());
              }),
                Ut.length > 0 &&
                  y.wysiwyg.element.insertAdjacentElement("beforeend", Ut[0]);
              var Wt = y.wysiwyg.element.querySelectorAll(
                "[data-type='footnotes-block']"
              );
              Wt.forEach(function (y, b) {
                0 === b
                  ? (Vt = y)
                  : (Vt.insertAdjacentHTML("beforeend", y.innerHTML),
                    y.remove());
              }),
                Wt.length > 0 &&
                  y.wysiwyg.element.insertAdjacentElement("beforeend", Wt[0]),
                (0, Kt.ib)(y.wysiwyg.element, b),
                y.wysiwyg.element
                  .querySelectorAll(".vditor-wysiwyg__preview[data-render='2']")
                  .forEach(function (b) {
                    N(b, y);
                  }),
                S &&
                  ("deleteContentBackward" === S.inputType ||
                    "deleteContentForward" === S.inputType) &&
                  y.options.comment.enable &&
                  (y.wysiwyg.triggerRemoveComment(y),
                  y.options.comment.adjustTop(y.wysiwyg.getComments(y, !0)));
            }
            O(y),
              Y(y, { enableAddUndoStack: !0, enableHint: !0, enableInput: !0 });
          },
          Ge = function (y, b) {
            return (
              Object.defineProperty
                ? Object.defineProperty(y, "raw", { value: b })
                : (y.raw = b),
              y
            );
          },
          Ke = function (y, b, S, L) {
            return new (S || (S = Promise))(function (H, D) {
              function a(y) {
                try {
                  s(L.next(y));
                } catch (y) {
                  D(y);
                }
              }
              function l(y) {
                try {
                  s(L.throw(y));
                } catch (y) {
                  D(y);
                }
              }
              function s(y) {
                var b;
                y.done
                  ? H(y.value)
                  : ((b = y.value),
                    b instanceof S
                      ? b
                      : new S(function (y) {
                          y(b);
                        })).then(a, l);
              }
              s((L = L.apply(y, b || [])).next());
            });
          },
          Fe = function (b, S) {
            var L,
              H,
              D,
              B,
              U = {
                label: 0,
                sent: function () {
                  if (1 & D[0]) throw D[1];
                  return D[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (B = { next: l(0), throw: l(1), return: l(2) }),
              "function" == typeof Symbol &&
                (B[Symbol.iterator] = function () {
                  return this || y;
                }),
              B
            );
            function l(y) {
              return function (B) {
                return (function (y) {
                  if (L) throw new TypeError("Generator is already executing.");
                  for (; U; )
                    try {
                      if (
                        ((L = 1),
                        H &&
                          (D =
                            2 & y[0]
                              ? H.return
                              : y[0]
                              ? H.throw || ((D = H.return) && D.call(H), 0)
                              : H.next) &&
                          !(D = D.call(H, y[1])).done)
                      )
                        return D;
                      switch (((H = 0), D && (y = [2 & y[0], D.value]), y[0])) {
                        case 0:
                        case 1:
                          D = y;
                          break;
                        case 4:
                          return U.label++, { value: y[1], done: !1 };
                        case 5:
                          U.label++, (H = y[1]), (y = [0]);
                          continue;
                        case 7:
                          (y = U.ops.pop()), U.trys.pop();
                          continue;
                        default:
                          if (
                            !((D = U.trys),
                            (D = D.length > 0 && D[D.length - 1]) ||
                              (6 !== y[0] && 2 !== y[0]))
                          ) {
                            U = 0;
                            continue;
                          }
                          if (
                            3 === y[0] &&
                            (!D || (y[1] > D[0] && y[1] < D[3]))
                          ) {
                            U.label = y[1];
                            break;
                          }
                          if (6 === y[0] && U.label < D[1]) {
                            (U.label = D[1]), (D = y);
                            break;
                          }
                          if (D && U.label < D[2]) {
                            (U.label = D[2]), U.ops.push(y);
                            break;
                          }
                          D[2] && U.ops.pop(), U.trys.pop();
                          continue;
                      }
                      y = S.call(b, U);
                    } catch (b) {
                      (y = [6, b]), (H = 0);
                    } finally {
                      L = D = 0;
                    }
                  if (5 & y[0]) throw y[1];
                  return { value: y[0] ? y[1] : void 0, done: !0 };
                })([y, B]);
              };
            }
          },
          Ze = function (y, b, S) {
            if (
              229 === y.keyCode &&
              "" === y.code &&
              "Unidentified" === y.key &&
              "sv" !== b.currentMode
            ) {
              var L = (0, Z.F9)(S);
              if (L && "" === L.textContent.trim())
                return (b[b.currentMode].composingLock = !0), !1;
            }
            return !0;
          },
          Je = function (y, b, S) {
            if (
              !(
                "Enter" === S.key ||
                "Tab" === S.key ||
                "Backspace" === S.key ||
                S.key.indexOf("Arrow") > -1 ||
                (0, F.yl)(S) ||
                "Escape" === S.key ||
                S.shiftKey ||
                S.altKey
              )
            ) {
              var L =
                (0, Z.lG)(y.startContainer, "P") ||
                (0, Z.lG)(y.startContainer, "LI");
              if (L && 0 === (0, Kt.im)(L, b[b.currentMode].element, y).start) {
                L.nodeValue &&
                  (L.nodeValue = L.nodeValue.replace(/\u2006/g, ""));
                var D = document.createTextNode(H.g.ZWSP);
                y.insertNode(D), y.setStartAfter(D);
              }
            }
          },
          Xe = function (y, b) {
            if ("ArrowDown" === b || "ArrowUp" === b) {
              var S =
                (0, Z.a1)(y.startContainer, "data-type", "math-inline") ||
                (0, Z.a1)(y.startContainer, "data-type", "html-entity") ||
                (0, Z.a1)(y.startContainer, "data-type", "html-inline");
              S &&
                ("ArrowDown" === b && y.setStartAfter(S.parentElement),
                "ArrowUp" === b && y.setStartBefore(S.parentElement));
            }
          },
          Ye = function (y, b) {
            var S = (0, Kt.zh)(y),
              L = (0, Z.F9)(S.startContainer);
            L &&
              (L.insertAdjacentHTML(
                b,
                '<p data-block="0">' + H.g.ZWSP + "<wbr>\n</p>"
              ),
              (0, Kt.ib)(y[y.currentMode].element, S),
              fe(y),
              dt(y));
          },
          Qe = function (y) {
            var b = (0, Z.lG)(y, "TABLE");
            return !(!b || !b.rows[0].cells[0].isSameNode(y)) && b;
          },
          $e = function (y) {
            var b = (0, Z.lG)(y, "TABLE");
            return (
              !(
                !b ||
                !b.lastElementChild.lastElementChild.lastElementChild.isSameNode(
                  y
                )
              ) && b
            );
          },
          et = function (y, b, S) {
            void 0 === S && (S = !0);
            var L = y.previousElementSibling;
            return (
              L ||
                (L = y.parentElement.previousElementSibling
                  ? y.parentElement.previousElementSibling.lastElementChild
                  : "TBODY" === y.parentElement.parentElement.tagName &&
                    y.parentElement.parentElement.previousElementSibling
                  ? y.parentElement.parentElement.previousElementSibling
                      .lastElementChild.lastElementChild
                  : null),
              L &&
                (b.selectNodeContents(L), S || b.collapse(!1), (0, Kt.Hc)(b)),
              L
            );
          },
          tt = function (y, b, S, L, D) {
            var B = (0, Kt.im)(L, y[y.currentMode].element, S);
            if (
              ("ArrowDown" === b.key &&
                -1 ===
                  L.textContent.trimRight().substr(B.start).indexOf("\n")) ||
              ("ArrowRight" === b.key &&
                B.start >= L.textContent.trimRight().length)
            ) {
              var U = D.nextElementSibling;
              return (
                !U ||
                (U && ("TABLE" === U.tagName || U.getAttribute("data-type")))
                  ? (D.insertAdjacentHTML(
                      "afterend",
                      '<p data-block="0">' + H.g.ZWSP + "<wbr></p>"
                    ),
                    (0, Kt.ib)(y[y.currentMode].element, S))
                  : (S.selectNodeContents(U), S.collapse(!0), (0, Kt.Hc)(S)),
                b.preventDefault(),
                !0
              );
            }
            return !1;
          },
          nt = function (y, b, S, L, D) {
            var B = (0, Kt.im)(L, y[y.currentMode].element, S);
            if (
              ("ArrowUp" === b.key &&
                -1 === L.textContent.substr(0, B.start).indexOf("\n")) ||
              (("ArrowLeft" === b.key ||
                ("Backspace" === b.key && "" === S.toString())) &&
                0 === B.start)
            ) {
              var U = D.previousElementSibling;
              return (
                !U ||
                (U && ("TABLE" === U.tagName || U.getAttribute("data-type")))
                  ? (D.insertAdjacentHTML(
                      "beforebegin",
                      '<p data-block="0">' + H.g.ZWSP + "<wbr></p>"
                    ),
                    (0, Kt.ib)(y[y.currentMode].element, S))
                  : (S.selectNodeContents(U), S.collapse(!1), (0, Kt.Hc)(S)),
                b.preventDefault(),
                !0
              );
            }
            return !1;
          },
          rt = function (y, b, S, L) {
            void 0 === L && (L = !0);
            var H = (0, Z.lG)(b.startContainer, "LI");
            if (
              (y[y.currentMode].element
                .querySelectorAll("wbr")
                .forEach(function (y) {
                  y.remove();
                }),
              b.insertNode(document.createElement("wbr")),
              L && H)
            ) {
              for (
                var D = "", B = 0;
                B < H.parentElement.childElementCount;
                B++
              ) {
                var U = H.parentElement.children[B].querySelector("input");
                U && U.remove(),
                  (D +=
                    '<p data-block="0">' +
                    H.parentElement.children[B].innerHTML.trimLeft() +
                    "</p>");
              }
              H.parentElement.insertAdjacentHTML("beforebegin", D),
                H.parentElement.remove();
            } else if (H)
              if ("check" === S)
                H.parentElement.querySelectorAll("li").forEach(function (y) {
                  y.insertAdjacentHTML(
                    "afterbegin",
                    '<input type="checkbox" />' +
                      (0 === y.textContent.indexOf(" ") ? "" : " ")
                  ),
                    y.classList.add("vditor-task");
                });
              else {
                H.querySelector("input") &&
                  H.parentElement.querySelectorAll("li").forEach(function (y) {
                    y.querySelector("input").remove(),
                      y.classList.remove("vditor-task");
                  });
                var F = void 0;
                "list" === S
                  ? (F = document.createElement("ul")).setAttribute(
                      "data-marker",
                      "*"
                    )
                  : (F = document.createElement("ol")).setAttribute(
                      "data-marker",
                      "1."
                    ),
                  F.setAttribute("data-block", "0"),
                  F.setAttribute(
                    "data-tight",
                    H.parentElement.getAttribute("data-tight")
                  ),
                  (F.innerHTML = H.parentElement.innerHTML),
                  H.parentElement.parentNode.replaceChild(F, H.parentElement);
              }
            else {
              var ye = (0, Z.a1)(b.startContainer, "data-block", "0");
              ye ||
                (y[y.currentMode].element.querySelector("wbr").remove(),
                ((ye = y[y.currentMode].element.querySelector("p")).innerHTML =
                  "<wbr>")),
                "check" === S
                  ? (ye.insertAdjacentHTML(
                      "beforebegin",
                      '<ul data-block="0"><li class="vditor-task"><input type="checkbox" /> ' +
                        ye.innerHTML +
                        "</li></ul>"
                    ),
                    ye.remove())
                  : "list" === S
                  ? (ye.insertAdjacentHTML(
                      "beforebegin",
                      '<ul data-block="0"><li>' + ye.innerHTML + "</li></ul>"
                    ),
                    ye.remove())
                  : "ordered-list" === S &&
                    (ye.insertAdjacentHTML(
                      "beforebegin",
                      '<ol data-block="0"><li>' + ye.innerHTML + "</li></ol>"
                    ),
                    ye.remove());
            }
          },
          it = function (y, b, S) {
            var L = b.previousElementSibling;
            if (b && L) {
              var H = [b];
              Array.from(S.cloneContents().children).forEach(function (y, S) {
                3 !== y.nodeType &&
                  b &&
                  "" !== y.textContent.trim() &&
                  b.getAttribute("data-node-id") ===
                    y.getAttribute("data-node-id") &&
                  (0 !== S && H.push(b), (b = b.nextElementSibling));
              }),
                y[y.currentMode].element
                  .querySelectorAll("wbr")
                  .forEach(function (y) {
                    y.remove();
                  }),
                S.insertNode(document.createElement("wbr"));
              var D = L.parentElement,
                B = "";
              H.forEach(function (y) {
                var b = y.getAttribute("data-marker");
                1 !== b.length && (b = "1" + b.slice(-1)),
                  (B +=
                    '<li data-node-id="' +
                    y.getAttribute("data-node-id") +
                    '" data-marker="' +
                    b +
                    '">' +
                    y.innerHTML +
                    "</li>"),
                  y.remove();
              }),
                L.insertAdjacentHTML(
                  "beforeend",
                  "<" +
                    D.tagName +
                    ' data-block="0">' +
                    B +
                    "</" +
                    D.tagName +
                    ">"
                ),
                "wysiwyg" === y.currentMode
                  ? (D.outerHTML = y.lute.SpinVditorDOM(D.outerHTML))
                  : (D.outerHTML = y.lute.SpinVditorIRDOM(D.outerHTML)),
                (0, Kt.ib)(y[y.currentMode].element, S);
              var U = (0, Z.O9)(S.startContainer);
              U &&
                U.querySelectorAll(
                  ".vditor-" + y.currentMode + "__preview[data-render='2']"
                ).forEach(function (b) {
                  N(b, y),
                    "wysiwyg" === y.currentMode &&
                      b.previousElementSibling.setAttribute(
                        "style",
                        "display:none"
                      );
                }),
                dt(y),
                fe(y);
            } else y[y.currentMode].element.focus();
          },
          ot = function (y, b, S, L) {
            var H = (0, Z.lG)(b.parentElement, "LI");
            if (H) {
              y[y.currentMode].element
                .querySelectorAll("wbr")
                .forEach(function (y) {
                  y.remove();
                }),
                S.insertNode(document.createElement("wbr"));
              var D = b.parentElement,
                B = D.cloneNode(),
                U = [b];
              Array.from(S.cloneContents().children).forEach(function (y, S) {
                3 !== y.nodeType &&
                  b &&
                  "" !== y.textContent.trim() &&
                  b.getAttribute("data-node-id") ===
                    y.getAttribute("data-node-id") &&
                  (0 !== S && U.push(b), (b = b.nextElementSibling));
              });
              var F = !1,
                ye = "";
              D.querySelectorAll("li").forEach(function (y) {
                F &&
                  ((ye += y.outerHTML),
                  y.nextElementSibling || y.previousElementSibling
                    ? y.remove()
                    : y.parentElement.remove()),
                  y.isSameNode(U[U.length - 1]) && (F = !0);
              }),
                U.reverse().forEach(function (y) {
                  H.insertAdjacentElement("afterend", y);
                }),
                ye &&
                  ((B.innerHTML = ye),
                  U[0].insertAdjacentElement("beforeend", B)),
                "wysiwyg" === y.currentMode
                  ? (L.outerHTML = y.lute.SpinVditorDOM(L.outerHTML))
                  : (L.outerHTML = y.lute.SpinVditorIRDOM(L.outerHTML)),
                (0, Kt.ib)(y[y.currentMode].element, S);
              var we = (0, Z.O9)(S.startContainer);
              we &&
                we
                  .querySelectorAll(
                    ".vditor-" + y.currentMode + "__preview[data-render='2']"
                  )
                  .forEach(function (b) {
                    N(b, y),
                      "wysiwyg" === y.currentMode &&
                        b.previousElementSibling.setAttribute(
                          "style",
                          "display:none"
                        );
                  }),
                dt(y),
                fe(y);
            } else y[y.currentMode].element.focus();
          },
          at = function (y, b) {
            for (
              var S = getSelection().getRangeAt(0).startContainer.parentElement,
                L = y.rows[0].cells.length,
                H = y.rows.length,
                D = 0,
                B = 0;
              B < H;
              B++
            )
              for (var U = 0; U < L; U++)
                if (y.rows[B].cells[U].isSameNode(S)) {
                  D = U;
                  break;
                }
            for (var F = 0; F < H; F++)
              y.rows[F].cells[D].setAttribute("align", b);
          },
          lt = function (y) {
            var b = y.trimRight().split("\n").pop();
            return (
              "" !== b &&
              ("" === b.replace(/ |-/g, "") ||
                "" === b.replace(/ |_/g, "") ||
                "" === b.replace(/ |\*/g, "")) &&
              b.replace(/ /g, "").length > 2 &&
              !(
                b.indexOf("-") > -1 &&
                -1 === b.trimLeft().indexOf(" ") &&
                y.trimRight().split("\n").length > 1
              ) &&
              0 !== b.indexOf("    ") &&
              0 !== b.indexOf("\t")
            );
          },
          st = function (y) {
            var b = y.trimRight().split("\n");
            return (
              0 !== (y = b.pop()).indexOf("    ") &&
              0 !== y.indexOf("\t") &&
              "" !== (y = y.trimLeft()) &&
              0 !== b.length &&
              ("" === y.replace(/-/g, "") || "" === y.replace(/=/g, ""))
            );
          },
          dt = function (y, b) {
            void 0 === b &&
              (b = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }),
              "wysiwyg" === y.currentMode
                ? Y(y, b)
                : "ir" === y.currentMode
                ? Tt(y, b)
                : "sv" === y.currentMode && Ie(y, b);
          },
          ct = function (y, b, S, L) {
            var D,
              B = y.startContainer,
              U = (0, Z.lG)(B, "LI");
            if (U) {
              if (
                !(0, F.yl)(L) &&
                !L.altKey &&
                "Enter" === L.key &&
                !L.shiftKey &&
                S &&
                U.contains(S) &&
                S.nextElementSibling
              )
                return (
                  U &&
                    !U.textContent.endsWith("\n") &&
                    U.insertAdjacentText("beforeend", "\n"),
                  y.insertNode(document.createTextNode("\n\n")),
                  y.collapse(!1),
                  dt(b),
                  L.preventDefault(),
                  !0
                );
              if (
                !(
                  (0, F.yl)(L) ||
                  L.shiftKey ||
                  L.altKey ||
                  "Backspace" !== L.key ||
                  U.previousElementSibling ||
                  "" !== y.toString() ||
                  0 !== (0, Kt.im)(U, b[b.currentMode].element, y).start
                )
              )
                return (
                  U.nextElementSibling
                    ? (U.parentElement.insertAdjacentHTML(
                        "beforebegin",
                        '<p data-block="0"><wbr>' + U.innerHTML + "</p>"
                      ),
                      U.remove())
                    : (U.parentElement.outerHTML =
                        '<p data-block="0"><wbr>' + U.innerHTML + "</p>"),
                  (0, Kt.ib)(b[b.currentMode].element, y),
                  dt(b),
                  L.preventDefault(),
                  !0
                );
              if (
                !(0, F.yl)(L) &&
                !L.shiftKey &&
                !L.altKey &&
                "Backspace" === L.key &&
                "" === U.textContent.trim().replace(H.g.ZWSP, "") &&
                "" === y.toString() &&
                "LI" ===
                  (null === (D = U.previousElementSibling) || void 0 === D
                    ? void 0
                    : D.tagName)
              )
                return (
                  U.previousElementSibling.insertAdjacentText(
                    "beforeend",
                    "\n\n"
                  ),
                  y.selectNodeContents(U.previousElementSibling),
                  y.collapse(!1),
                  U.remove(),
                  (0, Kt.ib)(b[b.currentMode].element, y),
                  dt(b),
                  L.preventDefault(),
                  !0
                );
              if (!(0, F.yl)(L) && !L.altKey && "Tab" === L.key) {
                var ye = !1;
                if (
                  (((0 === y.startOffset &&
                    ((3 === B.nodeType && !B.previousSibling) ||
                      (3 !== B.nodeType && "LI" === B.nodeName))) ||
                    (U.classList.contains("vditor-task") &&
                      1 === y.startOffset &&
                      3 !== B.previousSibling.nodeType &&
                      "INPUT" === B.previousSibling.tagName)) &&
                    (ye = !0),
                  ye || "" !== y.toString())
                )
                  return (
                    L.shiftKey ? ot(b, U, y, U.parentElement) : it(b, U, y),
                    L.preventDefault(),
                    !0
                  );
              }
            }
            return !1;
          },
          ut = function (y, b, S) {
            if (y.options.tab && "Tab" === S.key)
              return (
                S.shiftKey ||
                  ("" === b.toString()
                    ? (b.insertNode(document.createTextNode(y.options.tab)),
                      b.collapse(!1))
                    : (b.extractContents(),
                      b.insertNode(document.createTextNode(y.options.tab)),
                      b.collapse(!1))),
                (0, Kt.Hc)(b),
                dt(y),
                S.preventDefault(),
                !0
              );
          },
          pt = function (y, b, S, L) {
            if (S) {
              if (!(0, F.yl)(y) && !y.altKey && "Enter" === y.key) {
                var H = String.raw(
                    Xt || (Xt = Ge(["", ""], ["", ""])),
                    S.textContent
                  )
                    .replace(/\\\|/g, "")
                    .trim(),
                  D = H.split("|");
                if (H.startsWith("|") && H.endsWith("|") && D.length > 3) {
                  var B = D.map(function () {
                    return "---";
                  }).join("|");
                  return (
                    (B =
                      S.textContent +
                      "\n" +
                      B.substring(3, B.length - 3) +
                      "\n|<wbr>"),
                    (S.outerHTML = b.lute.SpinVditorDOM(B)),
                    (0, Kt.ib)(b[b.currentMode].element, L),
                    dt(b),
                    Ae(b),
                    y.preventDefault(),
                    !0
                  );
                }
                if (lt(S.innerHTML) && S.previousElementSibling) {
                  var U = "",
                    ye = S.innerHTML.trimRight().split("\n");
                  return (
                    ye.length > 1 &&
                      (ye.pop(),
                      (U = '<p data-block="0">' + ye.join("\n") + "</p>")),
                    S.insertAdjacentHTML(
                      "afterend",
                      U + '<hr data-block="0"><p data-block="0"><wbr>\n</p>'
                    ),
                    S.remove(),
                    (0, Kt.ib)(b[b.currentMode].element, L),
                    dt(b),
                    Ae(b),
                    y.preventDefault(),
                    !0
                  );
                }
                if (st(S.innerHTML))
                  return (
                    "wysiwyg" === b.currentMode
                      ? (S.outerHTML = b.lute.SpinVditorDOM(
                          S.innerHTML + '<p data-block="0"><wbr>\n</p>'
                        ))
                      : (S.outerHTML = b.lute.SpinVditorIRDOM(
                          S.innerHTML + '<p data-block="0"><wbr>\n</p>'
                        )),
                    (0, Kt.ib)(b[b.currentMode].element, L),
                    dt(b),
                    Ae(b),
                    y.preventDefault(),
                    !0
                  );
              }
              if (
                L.collapsed &&
                S.previousElementSibling &&
                "Backspace" === y.key &&
                !(0, F.yl)(y) &&
                !y.altKey &&
                !y.shiftKey &&
                S.textContent.trimRight().split("\n").length > 1 &&
                0 === (0, Kt.im)(S, b[b.currentMode].element, L).start
              ) {
                var we = (0, Z.DX)(S.previousElementSibling);
                return (
                  we.textContent.endsWith("\n") ||
                    (we.textContent = we.textContent + "\n"),
                  we.parentElement.insertAdjacentHTML(
                    "beforeend",
                    "<wbr>" + S.innerHTML
                  ),
                  S.remove(),
                  (0, Kt.ib)(b[b.currentMode].element, L),
                  !1
                );
              }
              return !1;
            }
          },
          mt = function (y, b, S) {
            for (var L = "", H = 0; H < S.parentElement.childElementCount; H++)
              L +=
                '<td align="' +
                S.parentElement.children[H].getAttribute("align") +
                '"> </td>';
            "TH" === S.tagName
              ? S.parentElement.parentElement.insertAdjacentHTML(
                  "afterend",
                  "<tbody><tr>" + L + "</tr></tbody>"
                )
              : S.parentElement.insertAdjacentHTML(
                  "afterend",
                  "<tr>" + L + "</tr>"
                ),
              dt(y);
          },
          ft = function (y, b, S) {
            for (var L = "", H = 0; H < S.parentElement.childElementCount; H++)
              "TH" === S.tagName
                ? (L +=
                    '<th align="' +
                    S.parentElement.children[H].getAttribute("align") +
                    '"> </th>')
                : (L +=
                    '<td align="' +
                    S.parentElement.children[H].getAttribute("align") +
                    '"> </td>');
            if ("TH" === S.tagName) {
              S.parentElement.parentElement.insertAdjacentHTML(
                "beforebegin",
                "<thead><tr>" + L + "</tr></thead>"
              ),
                b.insertNode(document.createElement("wbr"));
              var D = S.parentElement.innerHTML
                .replace(/<th>/g, "<td>")
                .replace(/<\/th>/g, "</td>");
              S.parentElement.parentElement.nextElementSibling.insertAdjacentHTML(
                "afterbegin",
                D
              ),
                S.parentElement.parentElement.remove(),
                (0, Kt.ib)(y.ir.element, b);
            } else
              S.parentElement.insertAdjacentHTML(
                "beforebegin",
                "<tr>" + L + "</tr>"
              );
            dt(y);
          },
          ht = function (y, b, S, L) {
            void 0 === L && (L = "afterend");
            for (var H = 0, D = S.previousElementSibling; D; )
              H++, (D = D.previousElementSibling);
            for (var B = 0; B < b.rows.length; B++)
              0 === B
                ? b.rows[B].cells[H].insertAdjacentHTML(L, "<th> </th>")
                : b.rows[B].cells[H].insertAdjacentHTML(L, "<td> </td>");
            dt(y);
          },
          vt = function (y, b, S) {
            if ("TD" === S.tagName) {
              var L = S.parentElement.parentElement;
              S.parentElement.previousElementSibling
                ? b.selectNodeContents(
                    S.parentElement.previousElementSibling.lastElementChild
                  )
                : b.selectNodeContents(
                    L.previousElementSibling.lastElementChild.lastElementChild
                  ),
                1 === L.childElementCount
                  ? L.remove()
                  : S.parentElement.remove(),
                b.collapse(!1),
                (0, Kt.Hc)(b),
                dt(y);
            }
          },
          gt = function (y, b, S, L) {
            for (var H = 0, D = L.previousElementSibling; D; )
              H++, (D = D.previousElementSibling);
            (L.previousElementSibling || L.nextElementSibling) &&
              (b.selectNodeContents(
                L.previousElementSibling || L.nextElementSibling
              ),
              b.collapse(!0));
            for (var B = 0; B < S.rows.length; B++) {
              var U = S.rows[B].cells;
              if (1 === U.length) {
                S.remove(), fe(y);
                break;
              }
              U[H].remove();
            }
            (0, Kt.Hc)(b), dt(y);
          },
          yt = function (y, b, S) {
            var L = S.startContainer,
              H = (0, Z.lG)(L, "TD") || (0, Z.lG)(L, "TH");
            if (H) {
              if (!(0, F.yl)(b) && !b.altKey && "Enter" === b.key) {
                (H.lastElementChild &&
                  (!H.lastElementChild ||
                    (H.lastElementChild.isSameNode(H.lastChild) &&
                      "BR" === H.lastElementChild.tagName))) ||
                  H.insertAdjacentHTML("beforeend", "<br>");
                var D = document.createElement("br");
                return (
                  S.insertNode(D),
                  S.setStartAfter(D),
                  dt(y),
                  Ae(y),
                  b.preventDefault(),
                  !0
                );
              }
              if ("Tab" === b.key)
                return b.shiftKey
                  ? (et(H, S), b.preventDefault(), !0)
                  : ((Dt = H.nextElementSibling) ||
                      (Dt = H.parentElement.nextElementSibling
                        ? H.parentElement.nextElementSibling.firstElementChild
                        : "THEAD" === H.parentElement.parentElement.tagName &&
                          H.parentElement.parentElement.nextElementSibling
                        ? H.parentElement.parentElement.nextElementSibling
                            .firstElementChild.firstElementChild
                        : null),
                    Dt && (S.selectNodeContents(Dt), (0, Kt.Hc)(S)),
                    b.preventDefault(),
                    !0);
              var B = H.parentElement.parentElement.parentElement;
              if ("ArrowUp" === b.key) {
                if ((b.preventDefault(), "TH" === H.tagName))
                  return (
                    B.previousElementSibling
                      ? (S.selectNodeContents(B.previousElementSibling),
                        S.collapse(!1),
                        (0, Kt.Hc)(S))
                      : Ye(y, "beforebegin"),
                    !0
                  );
                for (
                  var U = 0, ye = H.parentElement;
                  U < ye.cells.length && !ye.cells[U].isSameNode(H);
                  U++
                );
                var we = ye.previousElementSibling;
                return (
                  we ||
                    (we = ye.parentElement.previousElementSibling.firstChild),
                  S.selectNodeContents(we.cells[U]),
                  S.collapse(!1),
                  (0, Kt.Hc)(S),
                  !0
                );
              }
              if ("ArrowDown" === b.key) {
                var Dt;
                if (
                  (b.preventDefault(),
                  !(ye = H.parentElement).nextElementSibling &&
                    "TD" === H.tagName)
                )
                  return (
                    B.nextElementSibling
                      ? (S.selectNodeContents(B.nextElementSibling),
                        S.collapse(!0),
                        (0, Kt.Hc)(S))
                      : Ye(y, "afterend"),
                    !0
                  );
                for (
                  U = 0;
                  U < ye.cells.length && !ye.cells[U].isSameNode(H);
                  U++
                );
                return (
                  (Dt = ye.nextElementSibling) ||
                    (Dt = ye.parentElement.nextElementSibling.firstChild),
                  S.selectNodeContents(Dt.cells[U]),
                  S.collapse(!0),
                  (0, Kt.Hc)(S),
                  !0
                );
              }
              if (
                "wysiwyg" === y.currentMode &&
                !(0, F.yl)(b) &&
                "Enter" === b.key &&
                !b.shiftKey &&
                b.altKey
              ) {
                var Ot = y.wysiwyg.popover.querySelector(".vditor-input");
                return Ot.focus(), Ot.select(), b.preventDefault(), !0;
              }
              if (
                !(0, F.yl)(b) &&
                !b.shiftKey &&
                !b.altKey &&
                "Backspace" === b.key &&
                0 === S.startOffset &&
                "" === S.toString()
              )
                return (
                  !et(H, S, !1) &&
                    B &&
                    ("" === B.textContent.trim()
                      ? ((B.outerHTML = '<p data-block="0"><wbr>\n</p>'),
                        (0, Kt.ib)(y[y.currentMode].element, S))
                      : (S.setStartBefore(B), S.collapse(!0)),
                    dt(y)),
                  b.preventDefault(),
                  !0
                );
              if (P("⇧⌘F", b)) return ft(y, S, H), b.preventDefault(), !0;
              if (P("⌘=", b)) return mt(y, S, H), b.preventDefault(), !0;
              if (P("⇧⌘G", b))
                return ht(y, B, H, "beforebegin"), b.preventDefault(), !0;
              if (P("⇧⌘=", b)) return ht(y, B, H), b.preventDefault(), !0;
              if (P("⌘-", b)) return vt(y, S, H), b.preventDefault(), !0;
              if (P("⇧⌘-", b)) return gt(y, S, B, H), b.preventDefault(), !0;
              if (P("⇧⌘L", b)) {
                if ("ir" === y.currentMode)
                  return at(B, "left"), dt(y), b.preventDefault(), !0;
                if (
                  (jt = y.wysiwyg.popover.querySelector('[data-type="left"]'))
                )
                  return jt.click(), b.preventDefault(), !0;
              }
              if (P("⇧⌘C", b)) {
                if ("ir" === y.currentMode)
                  return at(B, "center"), dt(y), b.preventDefault(), !0;
                if (
                  (jt = y.wysiwyg.popover.querySelector('[data-type="center"]'))
                )
                  return jt.click(), b.preventDefault(), !0;
              }
              if (P("⇧⌘R", b)) {
                if ("ir" === y.currentMode)
                  return at(B, "right"), dt(y), b.preventDefault(), !0;
                var jt;
                if (
                  (jt = y.wysiwyg.popover.querySelector('[data-type="right"]'))
                )
                  return jt.click(), b.preventDefault(), !0;
              }
            }
            return !1;
          },
          bt = function (y, b, S, L) {
            if ("PRE" === S.tagName && P("⌘A", b))
              return (
                L.selectNodeContents(S.firstElementChild),
                b.preventDefault(),
                !0
              );
            if (
              y.options.tab &&
              "Tab" === b.key &&
              !b.shiftKey &&
              "" === L.toString()
            )
              return (
                L.insertNode(document.createTextNode(y.options.tab)),
                L.collapse(!1),
                dt(y),
                b.preventDefault(),
                !0
              );
            if (
              "Backspace" === b.key &&
              !(0, F.yl)(b) &&
              !b.shiftKey &&
              !b.altKey
            ) {
              var H = (0, Kt.im)(S, y[y.currentMode].element, L);
              if (
                (0 === H.start || (1 === H.start && "\n" === S.innerText)) &&
                "" === L.toString()
              )
                return (
                  (S.parentElement.outerHTML =
                    '<p data-block="0"><wbr>' +
                    S.firstElementChild.innerHTML +
                    "</p>"),
                  (0, Kt.ib)(y[y.currentMode].element, L),
                  dt(y),
                  b.preventDefault(),
                  !0
                );
            }
            return (
              !(0, F.yl)(b) &&
              !b.altKey &&
              "Enter" === b.key &&
              (S.firstElementChild.textContent.endsWith("\n") ||
                S.firstElementChild.insertAdjacentText("beforeend", "\n"),
              L.extractContents(),
              L.insertNode(document.createTextNode("\n")),
              L.collapse(!1),
              (0, Kt.Hc)(L),
              (0, F.vU)() || ("wysiwyg" === y.currentMode ? ze(y, L) : R(y, L)),
              Ae(y),
              b.preventDefault(),
              !0)
            );
          },
          wt = function (y, b, S, L) {
            var D = b.startContainer,
              B = (0, Z.lG)(D, "BLOCKQUOTE");
            if (B && "" === b.toString()) {
              if (
                "Backspace" === S.key &&
                !(0, F.yl)(S) &&
                !S.shiftKey &&
                !S.altKey &&
                0 === (0, Kt.im)(B, y[y.currentMode].element, b).start
              )
                return (
                  b.insertNode(document.createElement("wbr")),
                  (B.outerHTML = B.innerHTML),
                  (0, Kt.ib)(y[y.currentMode].element, b),
                  dt(y),
                  S.preventDefault(),
                  !0
                );
              if (
                L &&
                "Enter" === S.key &&
                !(0, F.yl)(S) &&
                !S.shiftKey &&
                !S.altKey &&
                "BLOCKQUOTE" === L.parentElement.tagName
              ) {
                var U = !1;
                if (
                  ("\n" === L.innerHTML.replace(H.g.ZWSP, "") ||
                  "" === L.innerHTML.replace(H.g.ZWSP, "")
                    ? ((U = !0), L.remove())
                    : L.innerHTML.endsWith("\n\n") &&
                      (0, Kt.im)(L, y[y.currentMode].element, b).start ===
                        L.textContent.length - 1 &&
                      ((L.innerHTML = L.innerHTML.substr(
                        0,
                        L.innerHTML.length - 2
                      )),
                      (U = !0)),
                  U)
                )
                  return (
                    B.insertAdjacentHTML(
                      "afterend",
                      '<p data-block="0">' + H.g.ZWSP + "<wbr>\n</p>"
                    ),
                    (0, Kt.ib)(y[y.currentMode].element, b),
                    dt(y),
                    S.preventDefault(),
                    !0
                  );
              }
              var ye = (0, Z.F9)(D);
              if ("wysiwyg" === y.currentMode && ye && P("⇧⌘;", S))
                return (
                  b.insertNode(document.createElement("wbr")),
                  (ye.outerHTML =
                    '<blockquote data-block="0">' +
                    ye.outerHTML +
                    "</blockquote>"),
                  (0, Kt.ib)(y.wysiwyg.element, b),
                  Y(y),
                  S.preventDefault(),
                  !0
                );
              if (tt(y, S, b, B, B)) return !0;
              if (nt(y, S, b, B, B)) return !0;
            }
            return !1;
          },
          Et = function (y, b, S) {
            var L = b.startContainer,
              H = (0, Z.fb)(L, "vditor-task");
            if (H) {
              if (P("⇧⌘J", S)) {
                var D = H.firstElementChild;
                return (
                  D.checked
                    ? D.removeAttribute("checked")
                    : D.setAttribute("checked", "checked"),
                  dt(y),
                  S.preventDefault(),
                  !0
                );
              }
              if (
                "Backspace" === S.key &&
                !(0, F.yl)(S) &&
                !S.shiftKey &&
                !S.altKey &&
                "" === b.toString() &&
                1 === b.startOffset &&
                ((3 === L.nodeType &&
                  L.previousSibling &&
                  "INPUT" === L.previousSibling.tagName) ||
                  3 !== L.nodeType)
              ) {
                var B = H.previousElementSibling;
                H.querySelector("input").remove(),
                  B
                    ? ((0, Z.DX)(B).parentElement.insertAdjacentHTML(
                        "beforeend",
                        "<wbr>" + H.innerHTML.trim()
                      ),
                      H.remove())
                    : (H.parentElement.insertAdjacentHTML(
                        "beforebegin",
                        '<p data-block="0"><wbr>' +
                          (H.innerHTML.trim() || "\n") +
                          "</p>"
                      ),
                      H.nextElementSibling
                        ? H.remove()
                        : H.parentElement.remove());
                return (
                  (0, Kt.ib)(y[y.currentMode].element, b),
                  dt(y),
                  S.preventDefault(),
                  !0
                );
              }
              if (
                "Enter" === S.key &&
                !(0, F.yl)(S) &&
                !S.shiftKey &&
                !S.altKey
              ) {
                if ("" === H.textContent.trim())
                  if ((0, Z.fb)(H.parentElement, "vditor-task")) {
                    var U = (0, Z.O9)(L);
                    U && ot(y, H, b, U);
                  } else if (H.nextElementSibling) {
                    var ye = "",
                      we = "",
                      Dt = !1;
                    Array.from(H.parentElement.children).forEach(function (y) {
                      H.isSameNode(y)
                        ? (Dt = !0)
                        : Dt
                        ? (ye += y.outerHTML)
                        : (we += y.outerHTML);
                    });
                    var Ot = H.parentElement.tagName,
                      jt =
                        "OL" === H.parentElement.tagName
                          ? ""
                          : ' data-marker="' +
                            H.parentElement.getAttribute("data-marker") +
                            '"',
                      Rt = "";
                    we &&
                      ((Rt =
                        "UL" === H.parentElement.tagName ? "" : ' start="1"'),
                      (we =
                        "<" +
                        Ot +
                        ' data-tight="true"' +
                        jt +
                        ' data-block="0">' +
                        we +
                        "</" +
                        Ot +
                        ">")),
                      (H.parentElement.outerHTML =
                        we +
                        '<p data-block="0"><wbr>\n</p><' +
                        Ot +
                        '\n data-tight="true"' +
                        jt +
                        ' data-block="0"' +
                        Rt +
                        ">" +
                        ye +
                        "</" +
                        Ot +
                        ">");
                  } else
                    H.parentElement.insertAdjacentHTML(
                      "afterend",
                      '<p data-block="0"><wbr>\n</p>'
                    ),
                      1 === H.parentElement.querySelectorAll("li").length
                        ? H.parentElement.remove()
                        : H.remove();
                else
                  3 !== L.nodeType &&
                  0 === b.startOffset &&
                  "INPUT" === L.firstChild.tagName
                    ? b.setStart(L.childNodes[1], 1)
                    : (b.setEndAfter(H.lastChild),
                      H.insertAdjacentHTML(
                        "afterend",
                        '<li class="vditor-task" data-marker="' +
                          H.getAttribute("data-marker") +
                          '"><input type="checkbox"> <wbr></li>'
                      ),
                      document.querySelector("wbr").after(b.extractContents()));
                return (
                  (0, Kt.ib)(y[y.currentMode].element, b),
                  dt(y),
                  Ae(y),
                  S.preventDefault(),
                  !0
                );
              }
            }
            return !1;
          },
          kt = function (y, b, S, L) {
            if (3 !== b.startContainer.nodeType) {
              var H = b.startContainer.children[b.startOffset];
              if (H && "HR" === H.tagName)
                return (
                  b.selectNodeContents(H.previousElementSibling),
                  b.collapse(!1),
                  S.preventDefault(),
                  !0
                );
            }
            if (L) {
              var D = L.previousElementSibling;
              if (
                D &&
                0 === (0, Kt.im)(L, y[y.currentMode].element, b).start &&
                (((0, F.vU)() && "HR" === D.tagName) || "TABLE" === D.tagName)
              ) {
                if ("TABLE" === D.tagName) {
                  var B = D.lastElementChild.lastElementChild.lastElementChild;
                  (B.innerHTML =
                    B.innerHTML.trimLeft() + "<wbr>" + L.textContent.trim()),
                    L.remove();
                } else D.remove();
                return (
                  (0, Kt.ib)(y[y.currentMode].element, b),
                  dt(y),
                  S.preventDefault(),
                  !0
                );
              }
            }
            return !1;
          },
          St = function (y) {
            (0, F.vU)() &&
              3 !== y.startContainer.nodeType &&
              "HR" === y.startContainer.tagName &&
              y.setStartBefore(y.startContainer);
          },
          Lt = function (y, b, S) {
            var L, H;
            if (!(0, F.vU)()) return !1;
            if (
              "ArrowUp" === y.key &&
              b &&
              "TABLE" ===
                (null === (L = b.previousElementSibling) || void 0 === L
                  ? void 0
                  : L.tagName)
            ) {
              var D = b.previousElementSibling;
              return (
                S.selectNodeContents(
                  D.rows[D.rows.length - 1].lastElementChild
                ),
                S.collapse(!1),
                y.preventDefault(),
                !0
              );
            }
            return (
              !(
                "ArrowDown" !== y.key ||
                !b ||
                "TABLE" !==
                  (null === (H = b.nextElementSibling) || void 0 === H
                    ? void 0
                    : H.tagName)
              ) &&
              (S.selectNodeContents(b.nextElementSibling.rows[0].cells[0]),
              S.collapse(!0),
              y.preventDefault(),
              !0)
            );
          },
          Ct = function (b, S, L) {
            return Ke(void 0, void 0, void 0, function () {
              var D, B, U, F, ye, we, Dt, Ot, jt, Rt, Pt, qt, Bt, Vt, Ut, Wt;
              return Fe(this || y, function (y) {
                switch (y.label) {
                  case 0:
                    return "true" !==
                      b[b.currentMode].element.getAttribute("contenteditable")
                      ? [2]
                      : (S.stopPropagation(),
                        S.preventDefault(),
                        "clipboardData" in S
                          ? ((D = S.clipboardData.getData("text/html")),
                            (B = S.clipboardData.getData("text/plain")),
                            (U = S.clipboardData.files))
                          : ((D = S.dataTransfer.getData("text/html")),
                            (B = S.dataTransfer.getData("text/plain")),
                            S.dataTransfer.types.includes("Files") &&
                              (U = S.dataTransfer.items)),
                        (F = {}),
                        (ye = function (y, S) {
                          if (!S) return ["", Lute.WalkContinue];
                          var L = y.TokensStr();
                          if (
                            34 === y.__internal_object__.Parent.Type &&
                            L &&
                            -1 === L.indexOf("file://") &&
                            b.options.upload.linkToImgUrl
                          ) {
                            var H = new XMLHttpRequest();
                            H.open("POST", b.options.upload.linkToImgUrl),
                              b.options.upload.token &&
                                H.setRequestHeader(
                                  "X-Upload-Token",
                                  b.options.upload.token
                                ),
                              b.options.upload.withCredentials &&
                                (H.withCredentials = !0),
                              qe(b, H),
                              H.setRequestHeader(
                                "Content-Type",
                                "application/json; charset=utf-8"
                              ),
                              (H.onreadystatechange = function () {
                                if (H.readyState === XMLHttpRequest.DONE) {
                                  if (200 === H.status) {
                                    var y = H.responseText;
                                    b.options.upload.linkToImgFormat &&
                                      (y = b.options.upload.linkToImgFormat(
                                        H.responseText
                                      ));
                                    var S = JSON.parse(y);
                                    if (0 !== S.code)
                                      return void b.tip.show(S.msg);
                                    var L = S.data.originalURL;
                                    if ("sv" === b.currentMode)
                                      b.sv.element
                                        .querySelectorAll(
                                          ".vditor-sv__marker--link"
                                        )
                                        .forEach(function (y) {
                                          y.textContent === L &&
                                            (y.textContent = S.data.url);
                                        });
                                    else {
                                      var D = b[
                                        b.currentMode
                                      ].element.querySelector(
                                        'img[src="' + L + '"]'
                                      );
                                      (D.src = S.data.url),
                                        "ir" === b.currentMode &&
                                          (D.previousElementSibling.previousElementSibling.innerHTML =
                                            S.data.url);
                                    }
                                    dt(b);
                                  } else b.tip.show(H.responseText);
                                  b.options.upload.linkToImgCallback &&
                                    b.options.upload.linkToImgCallback(
                                      H.responseText
                                    );
                                }
                              }),
                              H.send(JSON.stringify({ url: L }));
                          }
                          return "ir" === b.currentMode
                            ? [
                                '<span class="vditor-ir__marker vditor-ir__marker--link">' +
                                  Lute.EscapeHTMLStr(L) +
                                  "</span>",
                                Lute.WalkContinue,
                              ]
                            : "wysiwyg" === b.currentMode
                            ? ["", Lute.WalkContinue]
                            : [
                                '<span class="vditor-sv__marker--link">' +
                                  Lute.EscapeHTMLStr(L) +
                                  "</span>",
                                Lute.WalkContinue,
                              ];
                        }),
                        (D.replace(/&amp;/g, "&")
                          .replace(/<(|\/)(html|body|meta)[^>]*?>/gi, "")
                          .trim() !==
                          '<a href="' + B + '">' + B + "</a>" &&
                          D.replace(/&amp;/g, "&")
                            .replace(/<(|\/)(html|body|meta)[^>]*?>/gi, "")
                            .trim() !==
                            '\x3c!--StartFragment--\x3e<a href="' +
                              B +
                              '">' +
                              B +
                              "</a>\x3c!--EndFragment--\x3e") ||
                          (D = ""),
                        (we = new DOMParser().parseFromString(D, "text/html"))
                          .body && (D = we.body.innerHTML),
                        (D = Lute.Sanitize(D)),
                        b.wysiwyg.getComments(b),
                        (Dt = b[b.currentMode].element.scrollHeight),
                        (Ot = (function (y, b, S) {
                          void 0 === S && (S = "sv");
                          var L = document.createElement("div");
                          L.innerHTML = y;
                          var H = !1;
                          1 === L.childElementCount &&
                            L.lastElementChild.style.fontFamily.indexOf(
                              "monospace"
                            ) > -1 &&
                            (H = !0);
                          var D = L.querySelectorAll("pre");
                          if (
                            (1 === L.childElementCount &&
                              1 === D.length &&
                              "vditor-wysiwyg" !== D[0].className &&
                              "vditor-sv" !== D[0].className &&
                              (H = !0),
                            0 === y.indexOf('\n<p class="p1">') && (H = !0),
                            1 === L.childElementCount &&
                              "TABLE" === L.firstElementChild.tagName &&
                              L.querySelector(".line-number") &&
                              L.querySelector(".line-content") &&
                              (H = !0),
                            H)
                          ) {
                            var B = b || y;
                            return /\n/.test(B) || 1 === D.length
                              ? "wysiwyg" === S
                                ? '<div class="vditor-wysiwyg__block" data-block="0" data-type="code-block"><pre><code>' +
                                  B.replace(/&/g, "&amp;").replace(
                                    /</g,
                                    "&lt;"
                                  ) +
                                  "<wbr></code></pre></div>"
                                : "\n```\n" +
                                  B.replace(/&/g, "&amp;").replace(
                                    /</g,
                                    "&lt;"
                                  ) +
                                  "\n```"
                              : "wysiwyg" === S
                              ? "<code>" +
                                B.replace(/&/g, "&amp;").replace(/</g, "&lt;") +
                                "</code><wbr>"
                              : "`" + B + "`";
                          }
                          return !1;
                        })(D, B, b.currentMode)),
                        (jt =
                          "sv" === b.currentMode
                            ? (0, Z.a1)(S.target, "data-type", "code-block")
                            : (0, Z.lG)(S.target, "CODE"))
                          ? ("sv" === b.currentMode
                              ? document.execCommand(
                                  "insertHTML",
                                  !1,
                                  B.replace(/&/g, "&amp;").replace(/</g, "&lt;")
                                )
                              : ((Rt = (0, Kt.im)(
                                  S.target,
                                  b[b.currentMode].element
                                )),
                                "PRE" !== jt.parentElement.tagName &&
                                  (B += H.g.ZWSP),
                                (jt.textContent =
                                  jt.textContent.substring(0, Rt.start) +
                                  B +
                                  jt.textContent.substring(Rt.end)),
                                (0, Kt.$j)(
                                  Rt.start + B.length,
                                  Rt.start + B.length,
                                  jt.parentElement
                                ),
                                (null === (Wt = jt.parentElement) ||
                                void 0 === Wt
                                  ? void 0
                                  : Wt.nextElementSibling.classList.contains(
                                      "vditor-" + b.currentMode + "__preview"
                                    )) &&
                                  ((jt.parentElement.nextElementSibling.innerHTML =
                                    jt.outerHTML),
                                  N(jt.parentElement.nextElementSibling, b))),
                            [3, 8])
                          : [3, 1]);
                  case 1:
                    return Ot ? (L.pasteCode(Ot), [3, 8]) : [3, 2];
                  case 2:
                    return "" === D.trim()
                      ? [3, 3]
                      : (((Pt = document.createElement("div")).innerHTML = D),
                        Pt.querySelectorAll("[style]").forEach(function (y) {
                          y.removeAttribute("style");
                        }),
                        Pt.querySelectorAll(".vditor-copy").forEach(function (
                          y
                        ) {
                          y.remove();
                        }),
                        "ir" === b.currentMode
                          ? ((F.HTML2VditorIRDOM = { renderLinkDest: ye }),
                            b.lute.SetJSRenderers({ renderers: F }),
                            (0, Kt.oC)(
                              b.lute.HTML2VditorIRDOM(Pt.innerHTML),
                              b
                            ))
                          : "wysiwyg" === b.currentMode
                          ? ((F.HTML2VditorDOM = { renderLinkDest: ye }),
                            b.lute.SetJSRenderers({ renderers: F }),
                            (0, Kt.oC)(b.lute.HTML2VditorDOM(Pt.innerHTML), b))
                          : ((F.Md2VditorSVDOM = { renderLinkDest: ye }),
                            b.lute.SetJSRenderers({ renderers: F }),
                            He(b, b.lute.HTML2Md(Pt.innerHTML).trimRight())),
                        b.outline.render(b),
                        [3, 8]);
                  case 3:
                    return U.length > 0
                      ? b.options.upload.url || b.options.upload.handler
                        ? [4, We(b, U)]
                        : [3, 5]
                      : [3, 7];
                  case 4:
                    return y.sent(), [3, 6];
                  case 5:
                    (qt = new FileReader()),
                      "clipboardData" in S
                        ? ((U = S.clipboardData.files), (Bt = U[0]))
                        : S.dataTransfer.types.includes("Files") &&
                          ((U = S.dataTransfer.items), (Bt = U[0].getAsFile())),
                      Bt &&
                        Bt.type.startsWith("image") &&
                        (qt.readAsDataURL(Bt),
                        (qt.onload = function () {
                          var y = "";
                          "wysiwyg" === b.currentMode
                            ? (y +=
                                '<img alt="' +
                                Bt.name +
                                '" src="' +
                                qt.result.toString() +
                                '">\n')
                            : (y +=
                                "![" +
                                Bt.name +
                                "](" +
                                qt.result.toString() +
                                ")\n"),
                            document.execCommand("insertHTML", !1, y);
                        })),
                      (y.label = 6);
                  case 6:
                    return [3, 8];
                  case 7:
                    "" !== B.trim() &&
                      0 === U.length &&
                      ("" !== (Ut = (0, Kt.zh)(b)).toString() &&
                        b.lute.IsValidLinkDest(B) &&
                        (B = "[" + Ut.toString() + "](" + B + ")"),
                      "ir" === b.currentMode
                        ? ((F.Md2VditorIRDOM = { renderLinkDest: ye }),
                          b.lute.SetJSRenderers({ renderers: F }),
                          (0, Kt.oC)(b.lute.Md2VditorIRDOM(B), b))
                        : "wysiwyg" === b.currentMode
                        ? ((F.Md2VditorDOM = { renderLinkDest: ye }),
                          b.lute.SetJSRenderers({ renderers: F }),
                          (0, Kt.oC)(b.lute.Md2VditorDOM(B), b))
                        : ((F.Md2VditorSVDOM = { renderLinkDest: ye }),
                          b.lute.SetJSRenderers({ renderers: F }),
                          He(b, B)),
                      b.outline.render(b)),
                      (y.label = 8);
                  case 8:
                    return (
                      "sv" !== b.currentMode &&
                        ((Vt = (0, Z.F9)((0, Kt.zh)(b).startContainer)) &&
                          ((Ut = (0, Kt.zh)(b)),
                          b[b.currentMode].element
                            .querySelectorAll("wbr")
                            .forEach(function (y) {
                              y.remove();
                            }),
                          Ut.insertNode(document.createElement("wbr")),
                          "wysiwyg" === b.currentMode
                            ? (Vt.outerHTML = b.lute.SpinVditorDOM(
                                Vt.outerHTML
                              ))
                            : (Vt.outerHTML = b.lute.SpinVditorIRDOM(
                                Vt.outerHTML
                              )),
                          (0, Kt.ib)(b[b.currentMode].element, Ut)),
                        b[b.currentMode].element
                          .querySelectorAll(
                            ".vditor-" +
                              b.currentMode +
                              "__preview[data-render='2']"
                          )
                          .forEach(function (y) {
                            N(y, b);
                          })),
                      b.wysiwyg.triggerRemoveComment(b),
                      dt(b),
                      b[b.currentMode].element.scrollHeight - Dt >
                        Math.min(
                          b[b.currentMode].element.clientHeight,
                          window.innerHeight
                        ) /
                          2 && Ae(b),
                      [2]
                    );
                }
              });
            });
          },
          Mt = function (y) {
            y.hint.render(y);
            var b = (0, Kt.zh)(y).startContainer,
              S = (0, Z.a1)(b, "data-type", "code-block-info");
            if (S)
              if (
                "" === S.textContent.replace(H.g.ZWSP, "") &&
                y.hint.recentLanguage
              )
                (S.textContent = H.g.ZWSP + y.hint.recentLanguage),
                  (0, Kt.zh)(y).selectNodeContents(S);
              else {
                var L = [],
                  D = S.textContent
                    .substring(0, (0, Kt.im)(S, y.ir.element).start)
                    .replace(H.g.ZWSP, "");
                H.g.CODE_LANGUAGES.forEach(function (y) {
                  y.indexOf(D.toLowerCase()) > -1 &&
                    L.push({ html: y, value: y });
                }),
                  y.hint.genHTML(L, D, y);
              }
          },
          Tt = function (y, b) {
            void 0 === b &&
              (b = { enableAddUndoStack: !0, enableHint: !1, enableInput: !0 }),
              b.enableHint && Mt(y),
              clearTimeout(y.ir.processTimeoutId),
              (y.ir.processTimeoutId = window.setTimeout(function () {
                if (!y.ir.composingLock) {
                  var S = a(y);
                  "function" == typeof y.options.input &&
                    b.enableInput &&
                    y.options.input(S),
                    y.options.counter.enable && y.counter.render(y, S),
                    y.options.cache.enable &&
                      (0, F.pK)() &&
                      (localStorage.setItem(y.options.cache.id, S),
                      y.options.cache.after && y.options.cache.after(S)),
                    y.devtools && y.devtools.renderEchart(y),
                    b.enableAddUndoStack && y.undo.addToUndoStack(y);
                }
              }, y.options.undoDelay));
          },
          At = function (y, b) {
            var S = (0, Kt.zh)(y),
              L = (0, Z.F9)(S.startContainer) || S.startContainer;
            if (L) {
              var H = L.querySelector(".vditor-ir__marker--heading");
              H
                ? (H.innerHTML = b)
                : (L.insertAdjacentText("afterbegin", b),
                  S.selectNodeContents(L),
                  S.collapse(!1)),
                R(y, S.cloneRange()),
                X(y);
            }
          },
          _t = function (y, b, S) {
            var L = (0, Z.a1)(y.startContainer, "data-type", S);
            if (L) {
              L.firstElementChild.remove(),
                L.lastElementChild.remove(),
                y.insertNode(document.createElement("wbr"));
              var H = document.createElement("div");
              (H.innerHTML = b.lute.SpinVditorIRDOM(L.outerHTML)),
                (L.outerHTML = H.firstElementChild.innerHTML.trim());
            }
          },
          xt = function (y, b, S, L) {
            var H = (0, Kt.zh)(y),
              D = b.getAttribute("data-type"),
              B = H.startContainer;
            3 === B.nodeType && (B = B.parentElement);
            var U = !0;
            if (b.classList.contains("vditor-menu--current"))
              if ("quote" === D) {
                var F = (0, Z.lG)(B, "BLOCKQUOTE");
                F &&
                  (H.insertNode(document.createElement("wbr")),
                  (F.outerHTML =
                    "" === F.innerHTML.trim()
                      ? '<p data-block="0">' + F.innerHTML + "</p>"
                      : F.innerHTML));
              } else if ("link" === D) {
                var ye = (0, Z.a1)(H.startContainer, "data-type", "a");
                if (ye) {
                  var we = (0, Z.fb)(H.startContainer, "vditor-ir__link");
                  we
                    ? (H.insertNode(document.createElement("wbr")),
                      (ye.outerHTML = we.innerHTML))
                    : (ye.outerHTML =
                        ye.querySelector(".vditor-ir__link").innerHTML +
                        "<wbr>");
                }
              } else
                "italic" === D
                  ? _t(H, y, "em")
                  : "bold" === D
                  ? _t(H, y, "strong")
                  : "strike" === D
                  ? _t(H, y, "s")
                  : "inline-code" === D
                  ? _t(H, y, "code")
                  : ("check" !== D && "list" !== D && "ordered-list" !== D) ||
                    (rt(y, H, D),
                    (U = !1),
                    b.classList.remove("vditor-menu--current"));
            else {
              0 === y.ir.element.childNodes.length &&
                ((y.ir.element.innerHTML = '<p data-block="0"><wbr></p>'),
                (0, Kt.ib)(y.ir.element, H));
              var Dt = (0, Z.F9)(H.startContainer);
              if ("line" === D) {
                if (Dt) {
                  var Ot = '<hr data-block="0"><p data-block="0"><wbr>\n</p>';
                  "" === Dt.innerHTML.trim()
                    ? (Dt.outerHTML = Ot)
                    : Dt.insertAdjacentHTML("afterend", Ot);
                }
              } else if ("quote" === D)
                Dt &&
                  (H.insertNode(document.createElement("wbr")),
                  (Dt.outerHTML =
                    '<blockquote data-block="0">' +
                    Dt.outerHTML +
                    "</blockquote>"),
                  (U = !1),
                  b.classList.add("vditor-menu--current"));
              else if ("link" === D) {
                var jt = void 0;
                (jt =
                  "" === H.toString()
                    ? S + "<wbr>" + L
                    : "" + S + H.toString() + L.replace(")", "<wbr>)")),
                  document.execCommand("insertHTML", !1, jt),
                  (U = !1),
                  b.classList.add("vditor-menu--current");
              } else if (
                "italic" === D ||
                "bold" === D ||
                "strike" === D ||
                "inline-code" === D ||
                "code" === D ||
                "table" === D
              ) {
                jt = void 0;
                "" === H.toString()
                  ? (jt = S + "<wbr>" + L)
                  : ((jt =
                      "code" === D
                        ? S + "\n" + H.toString() + "<wbr>" + L
                        : "table" === D
                        ? "" + S + H.toString() + "<wbr>" + L
                        : "" + S + H.toString() + L + "<wbr>"),
                    H.deleteContents()),
                  ("table" !== D && "code" !== D) || (jt = "\n" + jt + "\n\n");
                var Rt = document.createElement("span");
                (Rt.innerHTML = jt),
                  H.insertNode(Rt),
                  R(y, H),
                  "table" === D &&
                    (H.selectNodeContents(
                      getSelection().getRangeAt(0).startContainer.parentElement
                    ),
                    (0, Kt.Hc)(H));
              } else
                ("check" !== D && "list" !== D && "ordered-list" !== D) ||
                  (rt(y, H, D, !1),
                  (U = !1),
                  c(y.toolbar.elements, ["check", "list", "ordered-list"]),
                  b.classList.add("vditor-menu--current"));
            }
            (0, Kt.ib)(y.ir.element, H), Tt(y), U && X(y);
          },
          Ht = function (y, b, S, L) {
            return new (S || (S = Promise))(function (H, D) {
              function a(y) {
                try {
                  s(L.next(y));
                } catch (y) {
                  D(y);
                }
              }
              function l(y) {
                try {
                  s(L.throw(y));
                } catch (y) {
                  D(y);
                }
              }
              function s(y) {
                var b;
                y.done
                  ? H(y.value)
                  : ((b = y.value),
                    b instanceof S
                      ? b
                      : new S(function (y) {
                          y(b);
                        })).then(a, l);
              }
              s((L = L.apply(y, b || [])).next());
            });
          },
          Nt = function (b, S) {
            var L,
              H,
              D,
              B,
              U = {
                label: 0,
                sent: function () {
                  if (1 & D[0]) throw D[1];
                  return D[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (B = { next: l(0), throw: l(1), return: l(2) }),
              "function" == typeof Symbol &&
                (B[Symbol.iterator] = function () {
                  return this || y;
                }),
              B
            );
            function l(y) {
              return function (B) {
                return (function (y) {
                  if (L) throw new TypeError("Generator is already executing.");
                  for (; U; )
                    try {
                      if (
                        ((L = 1),
                        H &&
                          (D =
                            2 & y[0]
                              ? H.return
                              : y[0]
                              ? H.throw || ((D = H.return) && D.call(H), 0)
                              : H.next) &&
                          !(D = D.call(H, y[1])).done)
                      )
                        return D;
                      switch (((H = 0), D && (y = [2 & y[0], D.value]), y[0])) {
                        case 0:
                        case 1:
                          D = y;
                          break;
                        case 4:
                          return U.label++, { value: y[1], done: !1 };
                        case 5:
                          U.label++, (H = y[1]), (y = [0]);
                          continue;
                        case 7:
                          (y = U.ops.pop()), U.trys.pop();
                          continue;
                        default:
                          if (
                            !((D = U.trys),
                            (D = D.length > 0 && D[D.length - 1]) ||
                              (6 !== y[0] && 2 !== y[0]))
                          ) {
                            U = 0;
                            continue;
                          }
                          if (
                            3 === y[0] &&
                            (!D || (y[1] > D[0] && y[1] < D[3]))
                          ) {
                            U.label = y[1];
                            break;
                          }
                          if (6 === y[0] && U.label < D[1]) {
                            (U.label = D[1]), (D = y);
                            break;
                          }
                          if (D && U.label < D[2]) {
                            (U.label = D[2]), U.ops.push(y);
                            break;
                          }
                          D[2] && U.ops.pop(), U.trys.pop();
                          continue;
                      }
                      y = S.call(b, U);
                    } catch (b) {
                      (y = [6, b]), (H = 0);
                    } finally {
                      L = D = 0;
                    }
                  if (5 & y[0]) throw y[1];
                  return { value: y[0] ? y[1] : void 0, done: !0 };
                })([y, B]);
              };
            }
          },
          $t = (function () {
            function e(b) {
              var S = this || y;
              ((this || y).splitChar = ""),
                ((this || y).lastIndex = -1),
                ((this || y).fillEmoji = function (y, b) {
                  S.element.style.display = "none";
                  var L = decodeURIComponent(y.getAttribute("data-value")),
                    D = window.getSelection().getRangeAt(0);
                  if ("ir" === b.currentMode) {
                    var B = (0, Z.a1)(
                      D.startContainer,
                      "data-type",
                      "code-block-info"
                    );
                    if (B)
                      return (
                        (B.textContent = H.g.ZWSP + L.trimRight()),
                        D.selectNodeContents(B),
                        D.collapse(!1),
                        Tt(b),
                        B.parentElement
                          .querySelectorAll("code")
                          .forEach(function (y) {
                            y.className = "language-" + L.trimRight();
                          }),
                        N(
                          B.parentElement.querySelector(".vditor-ir__preview"),
                          b
                        ),
                        void (S.recentLanguage = L.trimRight())
                      );
                  }
                  if (
                    "wysiwyg" === b.currentMode &&
                    3 !== D.startContainer.nodeType
                  ) {
                    var U = D.startContainer,
                      F = void 0;
                    if (
                      (F = U.classList.contains("vditor-input")
                        ? U
                        : U.firstElementChild) &&
                      F.classList.contains("vditor-input")
                    )
                      return (
                        (F.value = L.trimRight()),
                        D.selectNodeContents(F),
                        D.collapse(!1),
                        F.dispatchEvent(
                          new CustomEvent("input", { detail: 1 })
                        ),
                        void (S.recentLanguage = L.trimRight())
                      );
                  }
                  if (
                    (D.setStart(D.startContainer, S.lastIndex),
                    D.deleteContents(),
                    b.options.hint.parse
                      ? "sv" === b.currentMode
                        ? (0, Kt.oC)(b.lute.SpinVditorSVDOM(L), b)
                        : "wysiwyg" === b.currentMode
                        ? (0, Kt.oC)(b.lute.SpinVditorDOM(L), b)
                        : (0, Kt.oC)(b.lute.SpinVditorIRDOM(L), b)
                      : (0, Kt.oC)(L, b),
                    ":" === S.splitChar &&
                      L.indexOf(":") > -1 &&
                      "sv" !== b.currentMode &&
                      D.insertNode(document.createTextNode(" ")),
                    D.collapse(!1),
                    (0, Kt.Hc)(D),
                    "wysiwyg" === b.currentMode)
                  )
                    (ye = (0, Z.fb)(
                      D.startContainer,
                      "vditor-wysiwyg__block"
                    )) &&
                      ye.lastElementChild.classList.contains(
                        "vditor-wysiwyg__preview"
                      ) &&
                      ((ye.lastElementChild.innerHTML =
                        ye.firstElementChild.innerHTML),
                      N(ye.lastElementChild, b));
                  else if ("ir" === b.currentMode) {
                    var ye;
                    (ye = (0, Z.fb)(
                      D.startContainer,
                      "vditor-ir__marker--pre"
                    )) &&
                      ye.nextElementSibling.classList.contains(
                        "vditor-ir__preview"
                      ) &&
                      ((ye.nextElementSibling.innerHTML = ye.innerHTML),
                      N(ye.nextElementSibling, b));
                  }
                  dt(b);
                }),
                ((this || y).timeId = -1),
                ((this || y).element = document.createElement("div")),
                ((this || y).element.className = "vditor-hint"),
                ((this || y).recentLanguage = ""),
                b.push({ key: ":" });
            }
            return (
              (e.prototype.render = function (b) {
                var S = this || y;
                if (window.getSelection().focusNode) {
                  var L,
                    H = getSelection().getRangeAt(0);
                  L =
                    H.startContainer.textContent.substring(0, H.startOffset) ||
                    "";
                  var D = this.getKey(L, b.options.hint.extend);
                  if (void 0 === D)
                    ((this || y).element.style.display = "none"),
                      clearTimeout((this || y).timeId);
                  else if (":" === (this || y).splitChar) {
                    var B =
                        "" === D ? b.options.hint.emoji : b.lute.GetEmojis(),
                      U = [];
                    Object.keys(B).forEach(function (y) {
                      0 === y.indexOf(D.toLowerCase()) &&
                        (B[y].indexOf(".") > -1
                          ? U.push({
                              html:
                                '<img src="' +
                                B[y] +
                                '" title=":' +
                                y +
                                ':"/> :' +
                                y +
                                ":",
                              value: ":" + y + ":",
                            })
                          : U.push({
                              html:
                                '<span class="vditor-hint__emoji">' +
                                B[y] +
                                "</span>" +
                                y,
                              value: B[y],
                            }));
                    }),
                      this.genHTML(U, D, b);
                  } else
                    b.options.hint.extend.forEach(function (L) {
                      L.key === S.splitChar &&
                        (clearTimeout(S.timeId),
                        (S.timeId = window.setTimeout(function () {
                          return Ht(S, void 0, void 0, function () {
                            var S;
                            return Nt(this || y, function (H) {
                              switch (H.label) {
                                case 0:
                                  return (
                                    (S = (this || y).genHTML), [4, L.hint(D)]
                                  );
                                case 1:
                                  return (
                                    S.apply(this || y, [H.sent(), D, b]), [2]
                                  );
                              }
                            });
                          });
                        }, b.options.hint.delay)));
                    });
                }
              }),
              (e.prototype.genHTML = function (b, S, L) {
                var H = this || y;
                if (0 !== b.length) {
                  var D = L[L.currentMode].element,
                    B = (0, Kt.Ny)(D),
                    U =
                      B.left +
                      ("left" === L.options.outline.position
                        ? L.outline.element.offsetWidth
                        : 0),
                    F = B.top,
                    Z = "";
                  b.forEach(function (y, b) {
                    if (!(b > 7)) {
                      var L = y.html;
                      if ("" !== S) {
                        var H = L.lastIndexOf(">") + 1,
                          D = L.substr(H),
                          B = D.toLowerCase().indexOf(S.toLowerCase());
                        B > -1 &&
                          ((D =
                            D.substring(0, B) +
                            "<b>" +
                            D.substring(B, B + S.length) +
                            "</b>" +
                            D.substring(B + S.length)),
                          (L = L.substr(0, H) + D));
                      }
                      Z +=
                        '<button data-value="' +
                        encodeURIComponent(y.value) +
                        ' "\n' +
                        (0 === b ? "class='vditor-hint--current'" : "") +
                        "> " +
                        L +
                        "</button>";
                    }
                  }),
                    ((this || y).element.innerHTML = Z);
                  var ye = parseInt(
                    document.defaultView
                      .getComputedStyle(D, null)
                      .getPropertyValue("line-height"),
                    10
                  );
                  ((this || y).element.style.top = F + (ye || 22) + "px"),
                    ((this || y).element.style.left = U + "px"),
                    ((this || y).element.style.display = "block"),
                    ((this || y).element.style.right = "auto"),
                    (this || y).element
                      .querySelectorAll("button")
                      .forEach(function (y) {
                        y.addEventListener("click", function (b) {
                          H.fillEmoji(y, L), b.preventDefault();
                        });
                      }),
                    (this || y).element.getBoundingClientRect().bottom >
                      window.innerHeight &&
                      ((this || y).element.style.top =
                        F - (this || y).element.offsetHeight + "px"),
                    (this || y).element.getBoundingClientRect().right >
                      window.innerWidth &&
                      (((this || y).element.style.left = "auto"),
                      ((this || y).element.style.right = "0"));
                } else (this || y).element.style.display = "none";
              }),
              (e.prototype.select = function (b, S) {
                if (
                  0 === (this || y).element.querySelectorAll("button").length ||
                  "none" === (this || y).element.style.display
                )
                  return !1;
                var L = (this || y).element.querySelector(
                  ".vditor-hint--current"
                );
                if ("ArrowDown" === b.key)
                  return (
                    b.preventDefault(),
                    b.stopPropagation(),
                    L.removeAttribute("class"),
                    L.nextElementSibling
                      ? (L.nextElementSibling.className =
                          "vditor-hint--current")
                      : ((this || y).element.children[0].className =
                          "vditor-hint--current"),
                    !0
                  );
                if ("ArrowUp" === b.key) {
                  if (
                    (b.preventDefault(),
                    b.stopPropagation(),
                    L.removeAttribute("class"),
                    L.previousElementSibling)
                  )
                    L.previousElementSibling.className = "vditor-hint--current";
                  else {
                    var H = (this || y).element.children.length;
                    (this || y).element.children[H - 1].className =
                      "vditor-hint--current";
                  }
                  return !0;
                }
                return (
                  !(
                    (0, F.yl)(b) ||
                    b.shiftKey ||
                    b.altKey ||
                    "Enter" !== b.key ||
                    b.isComposing
                  ) &&
                  (b.preventDefault(),
                  b.stopPropagation(),
                  this.fillEmoji(L, S),
                  !0)
                );
              }),
              (e.prototype.getKey = function (b, S) {
                var L,
                  H = this || y;
                if (
                  (((this || y).lastIndex = -1),
                  ((this || y).splitChar = ""),
                  S.forEach(function (y) {
                    var S = b.lastIndexOf(y.key);
                    H.lastIndex < S &&
                      ((H.splitChar = y.key), (H.lastIndex = S));
                  }),
                  -1 === (this || y).lastIndex)
                )
                  return L;
                var B = b.split((this || y).splitChar),
                  U = B[B.length - 1];
                if (B.length > 1 && U.trim() === U)
                  if (2 === B.length && "" === B[0] && B[1].length < 32)
                    L = B[1];
                  else {
                    var F = B[B.length - 2].slice(-1);
                    " " === (0, D.X)(F) && U.length < 32 && (L = U);
                  }
                return L;
              }),
              e
            );
          })(),
          en = (function () {
            function e(b) {
              (this || y).composingLock = !1;
              var S = document.createElement("div");
              (S.className = "vditor-ir"),
                (S.innerHTML =
                  '<pre class="vditor-reset" placeholder="' +
                  b.options.placeholder +
                  '"\n contenteditable="true" spellcheck="false"></pre>'),
                ((this || y).element = S.firstElementChild),
                this.bindEvent(b),
                ke(b, (this || y).element),
                Se(b, (this || y).element),
                Le(b, (this || y).element),
                _e(b, (this || y).element),
                xe(b, (this || y).element),
                Ce(b, (this || y).element),
                Me(b, (this || y).element, (this || y).copy),
                Te(b, (this || y).element, (this || y).copy);
            }
            return (
              (e.prototype.copy = function (y, b) {
                var S = getSelection().getRangeAt(0);
                if ("" !== S.toString()) {
                  y.stopPropagation(), y.preventDefault();
                  var L = document.createElement("div");
                  L.appendChild(S.cloneContents()),
                    y.clipboardData.setData(
                      "text/plain",
                      b.lute.VditorIRDOM2Md(L.innerHTML).trim()
                    ),
                    y.clipboardData.setData("text/html", "");
                }
              }),
              (e.prototype.bindEvent = function (b) {
                var S = this || y;
                (this || y).element.addEventListener("paste", function (y) {
                  Ct(b, y, {
                    pasteCode: function (y) {
                      document.execCommand("insertHTML", !1, y);
                    },
                  });
                }),
                  (this || y).element.addEventListener(
                    "compositionstart",
                    function (y) {
                      S.composingLock = !0;
                    }
                  ),
                  (this || y).element.addEventListener(
                    "compositionend",
                    function (y) {
                      (0, F.vU)() ||
                        R(b, getSelection().getRangeAt(0).cloneRange()),
                        (S.composingLock = !1);
                    }
                  ),
                  (this || y).element.addEventListener("input", function (y) {
                    if (
                      "deleteByDrag" !== y.inputType &&
                      "insertFromDrop" !== y.inputType
                    )
                      return S.preventInput
                        ? ((S.preventInput = !1),
                          void Tt(b, {
                            enableAddUndoStack: !0,
                            enableHint: !0,
                            enableInput: !0,
                          }))
                        : void (
                            S.composingLock ||
                            "‘" === y.data ||
                            "“" === y.data ||
                            "《" === y.data ||
                            R(
                              b,
                              getSelection().getRangeAt(0).cloneRange(),
                              !1,
                              y
                            )
                          );
                  }),
                  (this || y).element.addEventListener("click", function (y) {
                    if ("INPUT" === y.target.tagName)
                      return (
                        y.target.checked
                          ? y.target.setAttribute("checked", "checked")
                          : y.target.removeAttribute("checked"),
                        (S.preventInput = !0),
                        void Tt(b)
                      );
                    var L = (0, Kt.zh)(b),
                      D = (0, Z.fb)(y.target, "vditor-ir__preview");
                    if (
                      (D ||
                        (D = (0, Z.fb)(L.startContainer, "vditor-ir__preview")),
                      D &&
                        (D.previousElementSibling.firstElementChild
                          ? L.selectNodeContents(
                              D.previousElementSibling.firstElementChild
                            )
                          : L.selectNodeContents(D.previousElementSibling),
                        L.collapse(!0),
                        (0, Kt.Hc)(L),
                        Ae(b)),
                      "IMG" === y.target.tagName)
                    ) {
                      var B = y.target.parentElement.querySelector(
                        ".vditor-ir__marker--link"
                      );
                      B && (L.selectNode(B), (0, Kt.Hc)(L));
                    }
                    var U = (0, Z.a1)(y.target, "data-type", "a");
                    if (!U || U.classList.contains("vditor-ir__node--expand")) {
                      if (
                        y.target.isEqualNode(S.element) &&
                        S.element.lastElementChild &&
                        L.collapsed
                      ) {
                        var F = S.element.lastElementChild.getBoundingClientRect();
                        y.y > F.top + F.height &&
                          ("P" === S.element.lastElementChild.tagName &&
                          "" ===
                            S.element.lastElementChild.textContent
                              .trim()
                              .replace(H.g.ZWSP, "")
                            ? (L.selectNodeContents(S.element.lastElementChild),
                              L.collapse(!1))
                            : (S.element.insertAdjacentHTML(
                                "beforeend",
                                '<p data-block="0">' + H.g.ZWSP + "<wbr></p>"
                              ),
                              (0, Kt.ib)(S.element, L)));
                      }
                      "" === L.toString()
                        ? q(L, b)
                        : setTimeout(function () {
                            q((0, Kt.zh)(b), b);
                          }),
                        I(y, b),
                        X(b);
                    } else b.options.link.click ? b.options.link.click(U.querySelector(":scope > .vditor-ir__marker--link")) : b.options.link.isOpen && window.open(U.querySelector(":scope > .vditor-ir__marker--link").textContent);
                  }),
                  (this || y).element.addEventListener("keyup", function (y) {
                    if (!y.isComposing && !(0, F.yl)(y))
                      if (
                        ("Enter" === y.key && Ae(b),
                        X(b),
                        ("Backspace" !== y.key && "Delete" !== y.key) ||
                          "" === b.ir.element.innerHTML ||
                          1 !== b.ir.element.childNodes.length ||
                          !b.ir.element.firstElementChild ||
                          "P" !== b.ir.element.firstElementChild.tagName ||
                          0 !==
                            b.ir.element.firstElementChild.childElementCount ||
                          ("" !== b.ir.element.textContent &&
                            "\n" !== b.ir.element.textContent))
                      ) {
                        var L = (0, Kt.zh)(b);
                        "Backspace" === y.key
                          ? ((0, F.vU)() &&
                              "\n" === L.startContainer.textContent &&
                              1 === L.startOffset &&
                              ((L.startContainer.textContent = ""), q(L, b)),
                            S.element
                              .querySelectorAll(".language-math")
                              .forEach(function (y) {
                                var b = y.querySelector("br");
                                b && b.remove();
                              }))
                          : y.key.indexOf("Arrow") > -1
                          ? (("ArrowLeft" !== y.key &&
                              "ArrowRight" !== y.key) ||
                              Mt(b),
                            q(L, b))
                          : 229 === y.keyCode &&
                            "" === y.code &&
                            "Unidentified" === y.key &&
                            q(L, b);
                        var D = (0, Z.fb)(
                          L.startContainer,
                          "vditor-ir__preview"
                        );
                        if (D) {
                          if ("ArrowUp" === y.key || "ArrowLeft" === y.key)
                            return (
                              D.previousElementSibling.firstElementChild
                                ? L.selectNodeContents(
                                    D.previousElementSibling.firstElementChild
                                  )
                                : L.selectNodeContents(
                                    D.previousElementSibling
                                  ),
                              L.collapse(!1),
                              y.preventDefault(),
                              !0
                            );
                          if (
                            "SPAN" === D.tagName &&
                            ("ArrowDown" === y.key || "ArrowRight" === y.key)
                          )
                            return (
                              "html-entity" ===
                              D.parentElement.getAttribute("data-type")
                                ? (D.parentElement.insertAdjacentText(
                                    "afterend",
                                    H.g.ZWSP
                                  ),
                                  L.setStart(D.parentElement.nextSibling, 1))
                                : L.selectNodeContents(
                                    D.parentElement.lastElementChild
                                  ),
                              L.collapse(!1),
                              y.preventDefault(),
                              !0
                            );
                        }
                      } else b.ir.element.innerHTML = "";
                  });
              }),
              e
            );
          })(),
          It = function (y) {
            return "sv" === y.currentMode
              ? y.lute.Md2HTML(a(y))
              : "wysiwyg" === y.currentMode
              ? y.lute.VditorDOM2HTML(y.wysiwyg.element.innerHTML)
              : "ir" === y.currentMode
              ? y.lute.VditorIRDOM2HTML(y.ir.element.innerHTML)
              : void 0;
          },
          tn = n(895),
          nn = n(818),
          rn = (function () {
            function e(b) {
              ((this || y).element = document.createElement("div")),
                ((this || y).element.className = "vditor-outline"),
                ((this || y).element.innerHTML =
                  '<div class="vditor-outline__title">' +
                  b +
                  '</div>\n<div class="vditor-outline__content"></div>');
            }
            return (
              (e.prototype.render = function (b) {
                return "block" === b.preview.element.style.display
                  ? (0, nn.k)(
                      b.preview.element.lastElementChild,
                      (this || y).element.lastElementChild,
                      b
                    )
                  : (0, nn.k)(
                      b[b.currentMode].element,
                      (this || y).element.lastElementChild,
                      b
                    );
              }),
              (e.prototype.toggle = function (b, S, L) {
                var D;
                void 0 === S && (S = !0), void 0 === L && (L = !0);
                var B =
                  null === (D = b.toolbar.elements.outline) || void 0 === D
                    ? void 0
                    : D.firstElementChild;
                if (
                  (S && window.innerWidth >= H.g.MOBILE_WIDTH
                    ? (((this || y).element.style.display = "block"),
                      this.render(b),
                      null == B || B.classList.add("vditor-menu--current"))
                    : (((this || y).element.style.display = "none"),
                      null == B || B.classList.remove("vditor-menu--current")),
                  L && getSelection().rangeCount > 0)
                ) {
                  var U = getSelection().getRangeAt(0);
                  b[b.currentMode].element.contains(U.startContainer) &&
                    (0, Kt.Hc)(U);
                }
                z(b);
              }),
              e
            );
          })(),
          an = n(554),
          ln = (function () {
            function e(b) {
              var S = this || y;
              ((this || y).element = document.createElement("div")),
                ((this || y).element.className = "vditor-preview");
              var L = document.createElement("div");
              (L.className = "vditor-reset"),
                b.options.classes.preview &&
                  L.classList.add(b.options.classes.preview),
                (L.style.maxWidth = b.options.preview.maxWidth + "px"),
                L.addEventListener("copy", function (y) {
                  if ("TEXTAREA" !== y.target.tagName) {
                    var L = document.createElement("div");
                    (L.className = "vditor-reset"),
                      L.appendChild(
                        getSelection().getRangeAt(0).cloneContents()
                      ),
                      S.copyToX(b, L),
                      y.preventDefault();
                  }
                }),
                L.addEventListener("click", function (y) {
                  var H = (0, Z.lG)(y.target, "SPAN");
                  if (H && (0, Z.fb)(H, "vditor-toc")) {
                    var D = L.querySelector(
                      "#" + H.getAttribute("data-target-id")
                    );
                    D && (S.element.scrollTop = D.offsetTop);
                  } else {
                    if ("A" === y.target.tagName)
                      return (
                        b.options.link.click
                          ? b.options.link.click(y.target)
                          : b.options.link.isOpen &&
                            window.open(y.target.getAttribute("href")),
                        void y.preventDefault()
                      );
                    "IMG" === y.target.tagName &&
                      (b.options.image.preview
                        ? b.options.image.preview(y.target)
                        : b.options.image.isPreview &&
                          (0, Gt.E)(y.target, b.options.lang, b.options.theme));
                  }
                });
              var H = b.options.preview.actions,
                D = document.createElement("div");
              D.className = "vditor-preview__action";
              for (var B = [], U = 0; U < H.length; U++) {
                var we = H[U];
                if ("object" != typeof we)
                  switch (we) {
                    case "desktop":
                      B.push(
                        '<button type="button" class="vditor-preview__action--current" data-type="desktop">Desktop</button>'
                      );
                      break;
                    case "tablet":
                      B.push(
                        '<button type="button" data-type="tablet">Tablet</button>'
                      );
                      break;
                    case "mobile":
                      B.push(
                        '<button type="button" data-type="mobile">Mobile</button>'
                      );
                      break;
                    case "mp-wechat":
                      B.push(
                        '<button type="button" data-type="mp-wechat" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到公众号"><svg><use xlink:href="#vditor-icon-mp-wechat"></use></svg></button>'
                      );
                      break;
                    case "zhihu":
                      B.push(
                        '<button type="button" data-type="zhihu" class="vditor-tooltipped vditor-tooltipped__w" aria-label="复制到知乎"><svg><use xlink:href="#vditor-icon-zhihu"></use></svg></button>'
                      );
                  }
                else
                  B.push(
                    '<button type="button" data-type="' +
                      we.key +
                      '" class="' +
                      we.className +
                      '"' +
                      (we.tooltip ? ' aria-label="' + we.tooltip + '"' : "") +
                      '">' +
                      we.text +
                      "</button>"
                  );
              }
              (D.innerHTML = B.join("")),
                0 === H.length && (D.style.display = "none"),
                (this || y).element.appendChild(D),
                (this || y).element.appendChild(L),
                D.addEventListener((0, F.Le)(), function (y) {
                  var B = (0, ye.S)(y.target, "BUTTON");
                  if (B) {
                    var U = B.getAttribute("data-type"),
                      F = H.find(function (y) {
                        return (null == y ? void 0 : y.key) === U;
                      });
                    F
                      ? F.click(U)
                      : "mp-wechat" !== U && "zhihu" !== U
                      ? ((L.style.width =
                          "desktop" === U
                            ? "auto"
                            : "tablet" === U
                            ? "780px"
                            : "360px"),
                        L.scrollWidth > L.parentElement.clientWidth &&
                          (L.style.width = "auto"),
                        S.render(b),
                        D.querySelectorAll("button").forEach(function (y) {
                          y.classList.remove("vditor-preview__action--current");
                        }),
                        B.classList.add("vditor-preview__action--current"))
                      : S.copyToX(
                          b,
                          S.element.lastElementChild.cloneNode(!0),
                          U
                        );
                  }
                });
            }
            return (
              (e.prototype.render = function (b, S) {
                var L = this || y;
                if (
                  (clearTimeout((this || y).mdTimeoutId),
                  "none" !== (this || y).element.style.display)
                )
                  if (S) (this || y).element.lastElementChild.innerHTML = S;
                  else if (
                    "" !==
                    a(b).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                  ) {
                    var H = new Date().getTime(),
                      D = a(b);
                    (this || y).mdTimeoutId = window.setTimeout(function () {
                      if (b.options.preview.url) {
                        var y = new XMLHttpRequest();
                        y.open("POST", b.options.preview.url),
                          y.setRequestHeader(
                            "Content-Type",
                            "application/json;charset=UTF-8"
                          ),
                          (y.onreadystatechange = function () {
                            if (y.readyState === XMLHttpRequest.DONE)
                              if (200 === y.status) {
                                var S = JSON.parse(y.responseText);
                                if (0 !== S.code) return void b.tip.show(S.msg);
                                b.options.preview.transform &&
                                  (S.data = b.options.preview.transform(
                                    S.data
                                  )),
                                  (L.element.lastElementChild.innerHTML =
                                    S.data),
                                  L.afterRender(b, H);
                              } else {
                                var B = b.lute.Md2HTML(D);
                                b.options.preview.transform &&
                                  (B = b.options.preview.transform(B)),
                                  (L.element.lastElementChild.innerHTML = B),
                                  L.afterRender(b, H);
                              }
                          }),
                          y.send(JSON.stringify({ markdownText: D }));
                      } else {
                        var S = b.lute.Md2HTML(D);
                        b.options.preview.transform &&
                          (S = b.options.preview.transform(S)),
                          (L.element.lastElementChild.innerHTML = S),
                          L.afterRender(b, H);
                      }
                    }, b.options.preview.delay);
                  } else (this || y).element.lastElementChild.innerHTML = "";
                else
                  "renderPerformance" ===
                    (this || y).element.getAttribute("data-type") &&
                    b.tip.hide();
              }),
              (e.prototype.afterRender = function (b, S) {
                b.options.preview.parse &&
                  b.options.preview.parse((this || y).element);
                var L = new Date().getTime() - S;
                new Date().getTime() - S > 2600
                  ? (b.tip.show(
                      window.VditorI18n.performanceTip.replace(
                        "${x}",
                        L.toString()
                      )
                    ),
                    b.preview.element.setAttribute(
                      "data-type",
                      "renderPerformance"
                    ))
                  : "renderPerformance" ===
                      b.preview.element.getAttribute("data-type") &&
                    (b.tip.hide(),
                    b.preview.element.removeAttribute("data-type"));
                var H = b.preview.element.querySelector(
                  ".vditor-comment--focus"
                );
                H && H.classList.remove("vditor-comment--focus"),
                  (0, Ot.O)(b.preview.element.lastElementChild),
                  (0, Pt.s)(
                    b.options.preview.hljs,
                    b.preview.element.lastElementChild,
                    b.options.cdn
                  ),
                  (0, Bt.i)(
                    b.preview.element.lastElementChild,
                    b.options.cdn,
                    b.options.theme
                  ),
                  (0, Vt.K)(
                    b.preview.element.lastElementChild,
                    b.options.cdn,
                    b.options.theme
                  ),
                  (0, jt.P)(b.preview.element.lastElementChild, b.options.cdn),
                  (0, Rt.v)(b.preview.element.lastElementChild, b.options.cdn),
                  (0, Dt.p)(
                    b.preview.element.lastElementChild,
                    b.options.cdn,
                    b.options.theme
                  ),
                  (0, Ut.P)(
                    b.preview.element.lastElementChild,
                    b.options.cdn,
                    b.options.theme
                  ),
                  (0, Wt.B)(b.preview.element.lastElementChild, b.options.cdn),
                  (0, we.Q)(b.preview.element.lastElementChild, b.options.cdn),
                  (0, an.Y)(b.preview.element.lastElementChild);
                var D = b.preview.element,
                  B = b.outline.render(b);
                "" === B && (B = "[ToC]"),
                  D.querySelectorAll('[data-type="toc-block"]').forEach(
                    function (y) {
                      (y.innerHTML = B),
                        (0, qt.H)(y, {
                          cdn: b.options.cdn,
                          math: b.options.preview.math,
                        });
                    }
                  ),
                  (0, qt.H)(b.preview.element.lastElementChild, {
                    cdn: b.options.cdn,
                    math: b.options.preview.math,
                  });
              }),
              (e.prototype.copyToX = function (b, S, L) {
                void 0 === L && (L = "mp-wechat"),
                  "zhihu" !== L
                    ? S.querySelectorAll(".katex-html .base").forEach(function (
                        y
                      ) {
                        y.style.display = "initial";
                      })
                    : S.querySelectorAll(".language-math").forEach(function (
                        y
                      ) {
                        y.outerHTML =
                          '<img class="Formula-image" data-eeimg="true" src="//www.zhihu.com/equation?tex=" alt="' +
                          y.getAttribute("data-math") +
                          '\\" style="display: block; margin: 0 auto; max-width: 100%;">';
                      }),
                  (S.style.backgroundColor = "#fff"),
                  S.querySelectorAll("code").forEach(function (y) {
                    y.style.backgroundImage = "none";
                  }),
                  (this || y).element.append(S);
                var H = S.ownerDocument.createRange();
                H.selectNode(S),
                  (0, Kt.Hc)(H),
                  document.execCommand("copy"),
                  (this || y).element.lastElementChild.remove(),
                  b.tip.show(
                    "已复制，可到" +
                      ("zhihu" === L ? "知乎" : "微信公众号平台") +
                      "进行粘贴"
                  );
              }),
              e
            );
          })(),
          dn = (function () {
            function e(b) {
              ((this || y).element = document.createElement("div")),
                ((this || y).element.className =
                  "vditor-resize vditor-resize--" + b.options.resize.position),
                ((this || y).element.innerHTML =
                  '<div><svg><use xlink:href="#vditor-icon-resize"></use></svg></div>'),
                this.bindEvent(b);
            }
            return (
              (e.prototype.bindEvent = function (b) {
                var S = this || y;
                (this || y).element.addEventListener("mousedown", function (y) {
                  var L = document,
                    H = y.clientY,
                    D = b.element.offsetHeight,
                    B =
                      63 +
                      b.element.querySelector(".vditor-toolbar").clientHeight;
                  (L.ondragstart = function () {
                    return !1;
                  }),
                    window.captureEvents && window.captureEvents(),
                    S.element.classList.add("vditor-resize--selected"),
                    (L.onmousemove = function (y) {
                      "top" === b.options.resize.position
                        ? (b.element.style.height =
                            Math.max(B, D + (H - y.clientY)) + "px")
                        : (b.element.style.height =
                            Math.max(B, D + (y.clientY - H)) + "px"),
                        b.options.typewriterMode &&
                          (b.sv.element.style.paddingBottom =
                            b.sv.element.parentElement.offsetHeight / 2 + "px");
                    }),
                    (L.onmouseup = function () {
                      b.options.resize.after &&
                        b.options.resize.after(b.element.offsetHeight - D),
                        window.captureEvents && window.captureEvents(),
                        (L.onmousemove = null),
                        (L.onmouseup = null),
                        (L.ondragstart = null),
                        (L.onselectstart = null),
                        (L.onselect = null),
                        S.element.classList.remove("vditor-resize--selected");
                    });
                });
              }),
              e
            );
          })(),
          cn = (function () {
            function e(b) {
              ((this || y).composingLock = !1),
                ((this || y).element = document.createElement("pre")),
                ((this || y).element.className = "vditor-sv vditor-reset"),
                (this || y).element.setAttribute(
                  "placeholder",
                  b.options.placeholder
                ),
                (this || y).element.setAttribute("contenteditable", "true"),
                (this || y).element.setAttribute("spellcheck", "false"),
                this.bindEvent(b),
                ke(b, (this || y).element),
                Le(b, (this || y).element),
                _e(b, (this || y).element),
                xe(b, (this || y).element),
                Ce(b, (this || y).element),
                Me(b, (this || y).element, (this || y).copy),
                Te(b, (this || y).element, (this || y).copy);
            }
            return (
              (e.prototype.copy = function (y, b) {
                y.stopPropagation(),
                  y.preventDefault(),
                  y.clipboardData.setData(
                    "text/plain",
                    Ee(b[b.currentMode].element)
                  );
              }),
              (e.prototype.bindEvent = function (b) {
                var S = this || y;
                (this || y).element.addEventListener("paste", function (y) {
                  Ct(b, y, {
                    pasteCode: function (y) {
                      document.execCommand("insertHTML", !1, y);
                    },
                  });
                }),
                  (this || y).element.addEventListener("scroll", function () {
                    if ("block" === b.preview.element.style.display) {
                      var y = S.element.scrollTop,
                        L = S.element.clientHeight,
                        H =
                          S.element.scrollHeight -
                          parseFloat(S.element.style.paddingBottom || "0"),
                        D = b.preview.element;
                      D.scrollTop =
                        y / L > 0.5
                          ? ((y + L) * D.scrollHeight) / H - L
                          : (y * D.scrollHeight) / H;
                    }
                  }),
                  (this || y).element.addEventListener(
                    "compositionstart",
                    function (y) {
                      S.composingLock = !0;
                    }
                  ),
                  (this || y).element.addEventListener(
                    "compositionend",
                    function (y) {
                      (0, F.vU)() || V(b, y), (S.composingLock = !1);
                    }
                  ),
                  (this || y).element.addEventListener("input", function (y) {
                    if (
                      "deleteByDrag" !== y.inputType &&
                      "insertFromDrop" !== y.inputType &&
                      !S.composingLock &&
                      "‘" !== y.data &&
                      "“" !== y.data &&
                      "《" !== y.data
                    )
                      return S.preventInput
                        ? ((S.preventInput = !1),
                          void Ie(b, {
                            enableAddUndoStack: !0,
                            enableHint: !0,
                            enableInput: !0,
                          }))
                        : void V(b, y);
                  }),
                  (this || y).element.addEventListener("keyup", function (y) {
                    y.isComposing ||
                      (0, F.yl)(y) ||
                      (("Backspace" !== y.key && "Delete" !== y.key) ||
                      "" === b.sv.element.innerHTML ||
                      1 !== b.sv.element.childNodes.length ||
                      !b.sv.element.firstElementChild ||
                      "DIV" !== b.sv.element.firstElementChild.tagName ||
                      2 !== b.sv.element.firstElementChild.childElementCount ||
                      ("" !== b.sv.element.firstElementChild.textContent &&
                        "\n" !== b.sv.element.textContent)
                        ? "Enter" === y.key && Ae(b)
                        : (b.sv.element.innerHTML = ""));
                  });
              }),
              e
            );
          })(),
          un = (function () {
            function e() {
              ((this || y).element = document.createElement("div")),
                ((this || y).element.className = "vditor-tip");
            }
            return (
              (e.prototype.show = function (b, S) {
                var L = this || y;
                void 0 === S && (S = 6e3),
                  ((this || y).element.className =
                    "vditor-tip vditor-tip--show"),
                  0 === S
                    ? (((this || y).element.innerHTML =
                        '<div class="vditor-tip__content">' +
                        b +
                        '\n<div class="vditor-tip__close">X</div></div>'),
                      (this || y).element
                        .querySelector(".vditor-tip__close")
                        .addEventListener("click", function () {
                          L.hide();
                        }))
                    : (((this || y).element.innerHTML =
                        '<div class="vditor-tip__content">' + b + "</div>"),
                      setTimeout(function () {
                        L.hide();
                      }, S)),
                  (this || y).element.removeAttribute("style"),
                  setTimeout(function () {
                    L.element.getBoundingClientRect().top < 46 &&
                      ((L.element.style.position = "fixed"),
                      (L.element.style.top = "46px"));
                  }, 150);
              }),
              (e.prototype.hide = function () {
                ((this || y).element.className = "vditor-messageElementtip"),
                  ((this || y).element.innerHTML = "");
              }),
              e
            );
          })(),
          zt = function (y, b) {
            if (b.options.preview.mode !== y) {
              switch (((b.options.preview.mode = y), y)) {
                case "both":
                  (b.sv.element.style.display = "block"),
                    (b.preview.element.style.display = "block"),
                    b.preview.render(b),
                    u(b.toolbar.elements, ["both"]);
                  break;
                case "editor":
                  (b.sv.element.style.display = "block"),
                    (b.preview.element.style.display = "none"),
                    c(b.toolbar.elements, ["both"]);
              }
              b.devtools && b.devtools.renderEchart(b);
            }
          },
          pn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          mn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                "both" === S.options.preview.mode &&
                  D.element.children[0].classList.add("vditor-menu--current"),
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  D.element.firstElementChild.classList.contains(
                    H.g.CLASS_MENU_DISABLED
                  ) ||
                    (y.preventDefault(),
                    "sv" === S.currentMode &&
                      ("both" === S.options.preview.mode
                        ? zt("editor", S)
                        : zt("both", S)));
                }),
                D
              );
            }
            return pn(t, b), t;
          })(ge),
          Ft = function () {
            ((this || y).element = document.createElement("div")),
              ((this || y).element.className = "vditor-toolbar__br");
          },
          fn = n(312),
          hn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          vn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y,
                B = D.element.children[0],
                U = document.createElement("div");
              U.className =
                "vditor-hint" + (2 === L.level ? "" : " vditor-panel--arrow");
              var Z = "";
              return (
                H.g.CODE_THEME.forEach(function (y) {
                  Z += "<button>" + y + "</button>";
                }),
                (U.innerHTML =
                  '<div style="overflow: auto;max-height:' +
                  window.innerHeight / 2 +
                  'px">' +
                  Z +
                  "</div>"),
                U.addEventListener((0, F.Le)(), function (y) {
                  "BUTTON" === y.target.tagName &&
                    (v(S, ["subToolbar"]),
                    (S.options.preview.hljs.style = y.target.textContent),
                    (0, fn.Y)(y.target.textContent, S.options.cdn),
                    y.preventDefault(),
                    y.stopPropagation());
                }),
                D.element.appendChild(U),
                g(S, U, B, L.level),
                D
              );
            }
            return hn(t, b), t;
          })(ge),
          gn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          yn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y,
                D = H.element.children[0],
                B = document.createElement("div");
              B.className =
                "vditor-hint" + (2 === L.level ? "" : " vditor-panel--arrow");
              var U = "";
              return (
                Object.keys(S.options.preview.theme.list).forEach(function (y) {
                  U +=
                    '<button data-type="' +
                    y +
                    '">' +
                    S.options.preview.theme.list[y] +
                    "</button>";
                }),
                (B.innerHTML =
                  '<div style="overflow: auto;max-height:' +
                  window.innerHeight / 2 +
                  'px">' +
                  U +
                  "</div>"),
                B.addEventListener((0, F.Le)(), function (y) {
                  "BUTTON" === y.target.tagName &&
                    (v(S, ["subToolbar"]),
                    (S.options.preview.theme.current = y.target.getAttribute(
                      "data-type"
                    )),
                    (0, Zt.Z)(
                      S.options.preview.theme.current,
                      S.options.preview.theme.path
                    ),
                    y.preventDefault(),
                    y.stopPropagation());
                }),
                H.element.appendChild(B),
                g(S, B, D, L.level),
                H
              );
            }
            return gn(t, b), t;
          })(ge),
          bn = (function () {
            function e(b) {
              ((this || y).element = document.createElement("span")),
                ((this || y).element.className =
                  "vditor-counter vditor-tooltipped vditor-tooltipped__nw"),
                this.render(b, "");
            }
            return (
              (e.prototype.render = function (b, S) {
                var L = S.endsWith("\n") ? S.length - 1 : S.length;
                if ("text" === b.options.counter.type && b[b.currentMode]) {
                  var H = b[b.currentMode].element.cloneNode(!0);
                  H.querySelectorAll(".vditor-wysiwyg__preview").forEach(
                    function (y) {
                      y.remove();
                    }
                  ),
                    (L = H.textContent.length);
                }
                "number" == typeof b.options.counter.max
                  ? (L > b.options.counter.max
                      ? ((this || y).element.className =
                          "vditor-counter vditor-counter--error")
                      : ((this || y).element.className = "vditor-counter"),
                    ((this || y).element.innerHTML =
                      L + "/" + b.options.counter.max))
                  : ((this || y).element.innerHTML = "" + L),
                  (this || y).element.setAttribute(
                    "aria-label",
                    b.options.counter.type
                  ),
                  b.options.counter.after &&
                    b.options.counter.after(L, {
                      enable: b.options.counter.enable,
                      max: b.options.counter.max,
                      type: b.options.counter.type,
                    });
              }),
              e
            );
          })(),
          wn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          En = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                (D.element.children[0].innerHTML = L.icon),
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    y.currentTarget.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) || L.click(y, S);
                }),
                D
              );
            }
            return wn(t, b), t;
          })(ge),
          kn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Sn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                D.element.firstElementChild.addEventListener(
                  (0, F.Le)(),
                  function (y) {
                    var b = D.element.firstElementChild;
                    b.classList.contains(H.g.CLASS_MENU_DISABLED) ||
                      (y.preventDefault(),
                      b.classList.contains("vditor-menu--current")
                        ? (b.classList.remove("vditor-menu--current"),
                          (S.devtools.element.style.display = "none"),
                          z(S))
                        : (b.classList.add("vditor-menu--current"),
                          (S.devtools.element.style.display = "block"),
                          z(S),
                          S.devtools.renderEchart(S)));
                  }
                ),
                D
              );
            }
            return kn(t, b), t;
          })(ge),
          on = function () {
            ((this || y).element = document.createElement("div")),
              ((this || y).element.className = "vditor-toolbar__divider");
          },
          Ln = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Cn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y,
                D = document.createElement("div");
              D.className = "vditor-panel vditor-panel--arrow";
              var B = "";
              return (
                Object.keys(S.options.hint.emoji).forEach(function (y) {
                  var b = S.options.hint.emoji[y];
                  b.indexOf(".") > -1
                    ? (B +=
                        '<button data-value=":' +
                        y +
                        ': " data-key=":' +
                        y +
                        ':"><img\ndata-value=":' +
                        y +
                        ': " data-key=":' +
                        y +
                        ':" class="vditor-emojis__icon" src="' +
                        b +
                        '"/></button>')
                    : (B +=
                        '<button data-value="' +
                        b +
                        ' "\n data-key="' +
                        y +
                        '"><span class="vditor-emojis__icon">' +
                        b +
                        "</span></button>");
                }),
                (D.innerHTML =
                  '<div class="vditor-emojis" style="max-height: ' +
                  ("auto" === S.options.height
                    ? "auto"
                    : S.options.height - 80) +
                  'px">' +
                  B +
                  '</div><div class="vditor-emojis__tail">\n    <span class="vditor-emojis__tip"></span><span>' +
                  (S.options.hint.emojiTail || "") +
                  "</span>\n</div>"),
                H.element.appendChild(D),
                g(S, D, H.element.firstElementChild, L.level),
                H.bindEvent(S),
                H
              );
            }
            return (
              Ln(t, b),
              (t.prototype.bindEvent = function (b) {
                var S = this || y;
                (this || y).element.lastElementChild.addEventListener(
                  (0, F.Le)(),
                  function (y) {
                    var L = (0, ye.S)(y.target, "BUTTON");
                    if (L) {
                      y.preventDefault();
                      var H = L.getAttribute("data-value"),
                        D = (0, Kt.zh)(b),
                        B = H;
                      if (
                        ("wysiwyg" === b.currentMode
                          ? (B = b.lute.SpinVditorDOM(H))
                          : "ir" === b.currentMode &&
                            (B = b.lute.SpinVditorIRDOM(H)),
                        H.indexOf(":") > -1 && "sv" !== b.currentMode)
                      ) {
                        var U = document.createElement("div");
                        (U.innerHTML = B),
                          (B =
                            U.firstElementChild.firstElementChild.outerHTML +
                            " "),
                          (0, Kt.oC)(B, b);
                      } else
                        D.extractContents(),
                          D.insertNode(document.createTextNode(H));
                      D.collapse(!1),
                        (0, Kt.Hc)(D),
                        (S.element.lastElementChild.style.display = "none"),
                        dt(b);
                    }
                  }
                ),
                  (this || y).element.lastElementChild.addEventListener(
                    "mouseover",
                    function (y) {
                      var b = (0, ye.S)(y.target, "BUTTON");
                      b &&
                        (S.element.querySelector(
                          ".vditor-emojis__tip"
                        ).innerHTML = b.getAttribute("data-key"));
                    }
                  );
              }),
              t
            );
          })(ge),
          sn = function (y, b, S) {
            var L = document.createElement("a");
            "download" in L
              ? ((L.download = S),
                (L.style.display = "none"),
                (L.href = URL.createObjectURL(new Blob([b]))),
                document.body.appendChild(L),
                L.click(),
                L.remove())
              : y.tip.show(window.VditorI18n.downloadTip, 0);
          },
          Mn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Tn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y,
                D = H.element.children[0],
                B = document.createElement("div");
              return (
                (B.className =
                  "vditor-hint" +
                  (2 === L.level ? "" : " vditor-panel--arrow")),
                (B.innerHTML =
                  '<button data-type="markdown">Markdown</button>\n<button data-type="pdf">PDF</button>\n<button data-type="html">HTML</button>'),
                B.addEventListener((0, F.Le)(), function (y) {
                  var b = y.target;
                  if ("BUTTON" === b.tagName) {
                    switch (b.getAttribute("data-type")) {
                      case "markdown":
                        !(function (y) {
                          var b = a(y);
                          sn(y, b, b.substr(0, 10) + ".md");
                        })(S);
                        break;
                      case "pdf":
                        !(function (y) {
                          y.tip.show(window.VditorI18n.generate, 3800);
                          var b = document.querySelector("#vditorExportIframe");
                          b.contentDocument.open(),
                            b.contentDocument.write(
                              '<link rel="stylesheet" href="' +
                                y.options.cdn +
                                '/dist/index.css"/>\n<script src="' +
                                y.options.cdn +
                                '/dist/method.min.js"></script>\n<div id="preview" style="width: 800px"></div>\n<script>\nwindow.addEventListener("message", (e) => {\n  if(!e.data) {\n    return;\n  }\n  Vditor.preview(document.getElementById(\'preview\'), e.data, {\n    markdown: {\n      theme: "' +
                                y.options.preview.theme +
                                '"\n    },\n    hljs: {\n      style: "' +
                                y.options.preview.hljs.style +
                                '"\n    }\n  });\n  setTimeout(() => {\n        window.print();\n    }, 3600);\n}, false);\n</script>'
                            ),
                            b.contentDocument.close(),
                            setTimeout(function () {
                              b.contentWindow.postMessage(a(y), "*");
                            }, 200);
                        })(S);
                        break;
                      case "html":
                        !(function (y) {
                          var b = It(y),
                            S =
                              '<html><head><link rel="stylesheet" type="text/css" href="' +
                              y.options.cdn +
                              '/dist/index.css"/>\n<script src="' +
                              y.options.cdn +
                              "/dist/js/i18n/" +
                              y.options.lang +
                              '.js"></script>\n<script src="' +
                              y.options.cdn +
                              '/dist/method.min.js"></script></head>\n<body><div class="vditor-reset" id="preview">' +
                              b +
                              "</div>\n<script>\n    const previewElement = document.getElementById('preview')\n    Vditor.setContentTheme('" +
                              y.options.preview.theme.current +
                              "', '" +
                              y.options.preview.theme.path +
                              "');\n    Vditor.codeRender(previewElement);\n    Vditor.highlightRender(" +
                              JSON.stringify(y.options.preview.hljs) +
                              ", previewElement, '" +
                              y.options.cdn +
                              "');\n    Vditor.mathRender(previewElement, {\n        cdn: '" +
                              y.options.cdn +
                              "',\n        math: " +
                              JSON.stringify(y.options.preview.math) +
                              ",\n    });\n    Vditor.mermaidRender(previewElement, '" +
                              y.options.cdn +
                              "', '" +
                              y.options.theme +
                              "');\n    Vditor.markmapRender(previewElement, '" +
                              y.options.cdn +
                              "', '" +
                              y.options.theme +
                              "');\n    Vditor.flowchartRender(previewElement, '" +
                              y.options.cdn +
                              "');\n    Vditor.graphvizRender(previewElement, '" +
                              y.options.cdn +
                              "');\n    Vditor.chartRender(previewElement, '" +
                              y.options.cdn +
                              "', '" +
                              y.options.theme +
                              "');\n    Vditor.mindmapRender(previewElement, '" +
                              y.options.cdn +
                              "', '" +
                              y.options.theme +
                              "');\n    Vditor.abcRender(previewElement, '" +
                              y.options.cdn +
                              "');\n    Vditor.mediaRender(previewElement);\n    Vditor.speechRender(previewElement);\n</script>\n<script src=\"" +
                              y.options.cdn +
                              "/dist/js/icons/" +
                              y.options.icon +
                              '.js"></script></body></html>';
                          sn(y, S, b.substr(0, 10) + ".html");
                        })(S);
                    }
                    v(S, ["subToolbar"]),
                      y.preventDefault(),
                      y.stopPropagation();
                  }
                }),
                H.element.appendChild(B),
                g(S, B, D, L.level),
                H
              );
            }
            return Mn(t, b), t;
          })(ge),
          An = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          _n = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y;
              return H._bindEvent(S, L), H;
            }
            return (
              An(t, b),
              (t.prototype._bindEvent = function (b, S) {
                (this || y).element.children[0].addEventListener(
                  (0, F.Le)(),
                  function (L) {
                    L.preventDefault(),
                      b.element.className.includes("vditor--fullscreen")
                        ? (S.level || ((this || y).innerHTML = S.icon),
                          (b.element.style.zIndex = ""),
                          (document.body.style.overflow = ""),
                          b.element.classList.remove("vditor--fullscreen"),
                          Object.keys(b.toolbar.elements).forEach(function (y) {
                            var S = b.toolbar.elements[y].firstChild;
                            S &&
                              (S.className = S.className.replace("__s", "__n"));
                          }),
                          b.counter &&
                            (b.counter.element.className = b.counter.element.className.replace(
                              "__s",
                              "__n"
                            )))
                        : (S.level ||
                            ((this || y).innerHTML =
                              '<svg><use xlink:href="#vditor-icon-contract"></use></svg>'),
                          (b.element.style.zIndex = b.options.fullscreen.index.toString()),
                          (document.body.style.overflow = "hidden"),
                          b.element.classList.add("vditor--fullscreen"),
                          Object.keys(b.toolbar.elements).forEach(function (y) {
                            var S = b.toolbar.elements[y].firstChild;
                            S &&
                              (S.className = S.className.replace("__n", "__s"));
                          }),
                          b.counter &&
                            (b.counter.element.className = b.counter.element.className.replace(
                              "__n",
                              "__s"
                            ))),
                      b.devtools && b.devtools.renderEchart(b),
                      S.click && S.click(L, b),
                      z(b),
                      G(b);
                  }
                );
              }),
              t
            );
          })(ge),
          xn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Hn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y,
                D = document.createElement("div");
              return (
                (D.className = "vditor-hint vditor-panel--arrow"),
                (D.innerHTML =
                  '<button data-tag="h1" data-value="# ">' +
                  window.VditorI18n.heading1 +
                  " " +
                  (0, F.ns)("&lt;⌥⌘1>") +
                  '</button>\n<button data-tag="h2" data-value="## ">' +
                  window.VditorI18n.heading2 +
                  " &lt;" +
                  (0, F.ns)("⌥⌘2") +
                  '></button>\n<button data-tag="h3" data-value="### ">' +
                  window.VditorI18n.heading3 +
                  " &lt;" +
                  (0, F.ns)("⌥⌘3") +
                  '></button>\n<button data-tag="h4" data-value="#### ">' +
                  window.VditorI18n.heading4 +
                  " &lt;" +
                  (0, F.ns)("⌥⌘4") +
                  '></button>\n<button data-tag="h5" data-value="##### ">' +
                  window.VditorI18n.heading5 +
                  " &lt;" +
                  (0, F.ns)("⌥⌘5") +
                  '></button>\n<button data-tag="h6" data-value="###### ">' +
                  window.VditorI18n.heading6 +
                  " &lt;" +
                  (0, F.ns)("⌥⌘6") +
                  "></button>"),
                H.element.appendChild(D),
                H._bindEvent(S, D),
                H
              );
            }
            return (
              xn(t, b),
              (t.prototype._bindEvent = function (b, S) {
                var L = (this || y).element.children[0];
                L.addEventListener((0, F.Le)(), function (y) {
                  y.preventDefault(),
                    L.classList.contains(H.g.CLASS_MENU_DISABLED) ||
                      (L.blur(),
                      L.classList.contains("vditor-menu--current")
                        ? ("wysiwyg" === b.currentMode
                            ? (ne(b), Y(b))
                            : "ir" === b.currentMode && At(b, ""),
                          L.classList.remove("vditor-menu--current"))
                        : (v(b, ["subToolbar"]), (S.style.display = "block")));
                });
                for (var D = 0; D < 6; D++)
                  S.children
                    .item(D)
                    .addEventListener((0, F.Le)(), function (y) {
                      y.preventDefault(),
                        "wysiwyg" === b.currentMode
                          ? (te(b, y.target.getAttribute("data-tag")),
                            Y(b),
                            L.classList.add("vditor-menu--current"))
                          : "ir" === b.currentMode
                          ? (At(b, y.target.getAttribute("data-value")),
                            L.classList.add("vditor-menu--current"))
                          : je(b, y.target.getAttribute("data-value")),
                        (S.style.display = "none");
                    });
              }),
              t
            );
          })(ge),
          Nn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Dn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y;
              return (
                H.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    S.tip.show(
                      '<div style="margin-bottom:14px;font-size: 14px;line-height: 22px;min-width:300px;max-width: 360px;display: flex;">\n<div style="margin-top: 14px;flex: 1">\n    <div>Markdown 使用指南</div>\n    <ul style="list-style: none">\n        <li><a href="https://ld246.com/article/1583308420519" target="_blank">语法速查手册</a></li>\n        <li><a href="https://ld246.com/article/1583129520165" target="_blank">基础语法</a></li>\n        <li><a href="https://ld246.com/article/1583305480675" target="_blank">扩展语法</a></li>\n        <li><a href="https://ld246.com/article/1582778815353" target="_blank">键盘快捷键</a></li>\n    </ul>\n</div>\n<div style="margin-top: 14px;flex: 1">\n    <div>Vditor 支持</div>\n    <ul style="list-style: none">\n        <li><a href="https://github.com/Vanessa219/vditor/issues" target="_blank">Issues</a></li>\n        <li><a href="https://ld246.com/tag/vditor" target="_blank">官方讨论区</a></li>\n        <li><a href="https://ld246.com/article/1549638745630" target="_blank">开发手册</a></li>\n        <li><a href="https://ld246.com/guide/markdown" target="_blank">演示地址</a></li>\n    </ul>\n</div></div>',
                      0
                    );
                }),
                H
              );
            }
            return Nn(t, b), t;
          })(ge),
          On = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          In = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  if (
                    (y.preventDefault(),
                    !D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) && "sv" !== S.currentMode)
                  ) {
                    var b = (0, Kt.zh)(S),
                      L = (0, Z.lG)(b.startContainer, "LI");
                    L && it(S, L, b);
                  }
                }),
                D
              );
            }
            return On(t, b), t;
          })(ge),
          jn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Rn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    S.tip.show(
                      '<div style="max-width: 520px; font-size: 14px;line-height: 22px;margin-bottom: 14px;">\n<p style="text-align: center;margin: 14px 0">\n    <em>下一代的 Markdown 编辑器，为未来而构建</em>\n</p>\n<div style="display: flex;margin-bottom: 14px;flex-wrap: wrap;align-items: center">\n    <img src="https://unpkg.com/vditor/dist/images/logo.png" style="margin: 0 auto;height: 68px"/>\n    <div>&nbsp;&nbsp;</div>\n    <div style="flex: 1;min-width: 250px">\n        Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得、即时渲染（类似 Typora）和分屏预览模式。\n        它使用 TypeScript 实现，支持原生 JavaScript 以及 Vue、React、Angular 和 Svelte 等框架。\n    </div>\n</div>\n<div style="display: flex;flex-wrap: wrap;">\n    <ul style="list-style: none;flex: 1;min-width:148px">\n        <li>\n        项目地址：<a href="https://b3log.org/vditor" target="_blank">b3log.org/vditor</a>\n        </li>\n        <li>\n        开源协议：MIT\n        </li>\n    </ul>\n    <ul style="list-style: none;margin-right: 18px">\n        <li>\n        组件版本：Vditor v' +
                        H.H +
                        " / Lute v" +
                        Lute.Version +
                        '\n        </li>\n        <li>\n        赞助捐赠：<a href="https://ld246.com/sponsor" target="_blank">https://ld246.com/sponsor</a>\n        </li>\n    </ul>\n</div>\n</div>',
                      0
                    );
                }),
                D
              );
            }
            return jn(t, b), t;
          })(ge),
          Pn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          qn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) ||
                      "sv" === S.currentMode ||
                      Ye(S, "afterend");
                }),
                D
              );
            }
            return Pn(t, b), t;
          })(ge),
          Bn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Vn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) ||
                      "sv" === S.currentMode ||
                      Ye(S, "beforebegin");
                }),
                D
              );
            }
            return Bn(t, b), t;
          })(ge),
          Un = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Wn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  if (
                    (y.preventDefault(),
                    !D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) && "sv" !== S.currentMode)
                  ) {
                    var b = (0, Kt.zh)(S),
                      L = (0, Z.lG)(b.startContainer, "LI");
                    L && ot(S, L, b, L.parentElement);
                  }
                }),
                D
              );
            }
            return Un(t, b), t;
          })(ge),
          zn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Kn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                S.options.outline &&
                  D.element.firstElementChild.classList.add(
                    "vditor-menu--current"
                  ),
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    S.toolbar.elements.outline.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) ||
                      ((S.options.outline.enable = !D.element.firstElementChild.classList.contains(
                        "vditor-menu--current"
                      )),
                      S.outline.toggle(S, S.options.outline.enable));
                }),
                D
              );
            }
            return zn(t, b), t;
          })(ge),
          Gn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Fn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y;
              return H._bindEvent(S), H;
            }
            return (
              Gn(t, b),
              (t.prototype._bindEvent = function (b) {
                var S = this || y;
                (this || y).element.children[0].addEventListener(
                  (0, F.Le)(),
                  function (y) {
                    y.preventDefault();
                    var L = S.element.firstElementChild;
                    if (!L.classList.contains(H.g.CLASS_MENU_DISABLED)) {
                      var D = H.g.EDIT_TOOLBARS.concat([
                        "both",
                        "edit-mode",
                        "devtools",
                      ]);
                      L.classList.contains("vditor-menu--current")
                        ? (L.classList.remove("vditor-menu--current"),
                          "sv" === b.currentMode
                            ? ((b.sv.element.style.display = "block"),
                              "both" === b.options.preview.mode
                                ? (b.preview.element.style.display = "block")
                                : (b.preview.element.style.display = "none"))
                            : ((b[
                                b.currentMode
                              ].element.parentElement.style.display = "block"),
                              (b.preview.element.style.display = "none")),
                          p(b.toolbar.elements, D),
                          b.outline.render(b))
                        : (m(b.toolbar.elements, D),
                          (b.preview.element.style.display = "block"),
                          "sv" === b.currentMode
                            ? (b.sv.element.style.display = "none")
                            : (b[
                                b.currentMode
                              ].element.parentElement.style.display = "none"),
                          b.preview.render(b),
                          L.classList.add("vditor-menu--current"),
                          v(b, ["subToolbar", "hint", "popover"]),
                          setTimeout(function () {
                            b.outline.render(b);
                          }, b.options.preview.delay + 10)),
                        z(b);
                    }
                  }
                );
              }),
              t
            );
          })(ge),
          Zn = (function () {
            function e(b) {
              var S;
              if (
                (((this || y).SAMPLE_RATE = 5e3),
                ((this || y).isRecording = !1),
                ((this || y).readyFlag = !1),
                ((this || y).leftChannel = []),
                ((this || y).rightChannel = []),
                ((this || y).recordingLength = 0),
                "undefined" != typeof AudioContext)
              )
                S = new AudioContext();
              else {
                if (!webkitAudioContext) return;
                S = new webkitAudioContext();
              }
              (this || y).DEFAULT_SAMPLE_RATE = S.sampleRate;
              var L = S.createGain();
              S.createMediaStreamSource(b).connect(L),
                ((this || y).recorder = S.createScriptProcessor(2048, 2, 1)),
                ((this || y).recorder.onaudioprocess = null),
                L.connect((this || y).recorder),
                (this || y).recorder.connect(S.destination),
                ((this || y).readyFlag = !0);
            }
            return (
              (e.prototype.cloneChannelData = function (b, S) {
                (this || y).leftChannel.push(new Float32Array(b)),
                  (this || y).rightChannel.push(new Float32Array(S)),
                  ((this || y).recordingLength += 2048);
              }),
              (e.prototype.startRecordingNewWavFile = function () {
                (this || y).readyFlag &&
                  (((this || y).isRecording = !0),
                  ((this || y).leftChannel.length = (
                    this || y
                  ).rightChannel.length = 0),
                  ((this || y).recordingLength = 0));
              }),
              (e.prototype.stopRecording = function () {
                (this || y).isRecording = !1;
              }),
              (e.prototype.buildWavFileBlob = function () {
                for (
                  var b = this.mergeBuffers((this || y).leftChannel),
                    S = this.mergeBuffers((this || y).rightChannel),
                    L = new Float32Array(b.length),
                    H = 0;
                  H < b.length;
                  ++H
                )
                  L[H] = 0.5 * (b[H] + S[H]);
                (this || y).DEFAULT_SAMPLE_RATE > (this || y).SAMPLE_RATE &&
                  (L = this.downSampleBuffer(L, (this || y).SAMPLE_RATE));
                var D = 44 + 2 * L.length,
                  B = new ArrayBuffer(D),
                  U = new DataView(B);
                this.writeUTFBytes(U, 0, "RIFF"),
                  U.setUint32(4, D, !0),
                  this.writeUTFBytes(U, 8, "WAVE"),
                  this.writeUTFBytes(U, 12, "fmt "),
                  U.setUint32(16, 16, !0),
                  U.setUint16(20, 1, !0),
                  U.setUint16(22, 1, !0),
                  U.setUint32(24, (this || y).SAMPLE_RATE, !0),
                  U.setUint32(28, 2 * (this || y).SAMPLE_RATE, !0),
                  U.setUint16(32, 2, !0),
                  U.setUint16(34, 16, !0);
                var F = 2 * L.length;
                this.writeUTFBytes(U, 36, "data"), U.setUint32(40, F, !0);
                for (var Z = L.length, ye = 44, we = 0; we < Z; we++)
                  U.setInt16(ye, 32767 * L[we], !0), (ye += 2);
                return new Blob([U], { type: "audio/wav" });
              }),
              (e.prototype.downSampleBuffer = function (b, S) {
                if (S === (this || y).DEFAULT_SAMPLE_RATE) return b;
                if (S > (this || y).DEFAULT_SAMPLE_RATE) return b;
                for (
                  var L = (this || y).DEFAULT_SAMPLE_RATE / S,
                    H = Math.round(b.length / L),
                    D = new Float32Array(H),
                    B = 0,
                    U = 0;
                  B < D.length;

                ) {
                  for (
                    var F = Math.round((B + 1) * L), Z = 0, ye = 0, we = U;
                    we < F && we < b.length;
                    we++
                  )
                    (Z += b[we]), ye++;
                  (D[B] = Z / ye), B++, (U = F);
                }
                return D;
              }),
              (e.prototype.mergeBuffers = function (b) {
                for (
                  var S = new Float32Array((this || y).recordingLength),
                    L = 0,
                    H = b.length,
                    D = 0;
                  D < H;
                  ++D
                ) {
                  var B = b[D];
                  S.set(B, L), (L += B.length);
                }
                return S;
              }),
              (e.prototype.writeUTFBytes = function (y, b, S) {
                for (var L = S.length, H = 0; H < L; H++)
                  y.setUint8(b + H, S.charCodeAt(H));
              }),
              e
            );
          })(),
          Jn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Xn = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y;
              return H._bindEvent(S), H;
            }
            return (
              Jn(t, b),
              (t.prototype._bindEvent = function (b) {
                var S,
                  L = this || y;
                (this || y).element.children[0].addEventListener(
                  (0, F.Le)(),
                  function (y) {
                    if (
                      (y.preventDefault(),
                      !L.element.firstElementChild.classList.contains(
                        H.g.CLASS_MENU_DISABLED
                      ))
                    ) {
                      var D = b[b.currentMode].element;
                      if (S)
                        if (S.isRecording) {
                          S.stopRecording(), b.tip.hide();
                          var B = new File(
                            [S.buildWavFileBlob()],
                            "record" + new Date().getTime() + ".wav",
                            { type: "video/webm" }
                          );
                          We(b, [B]),
                            L.element.children[0].classList.remove(
                              "vditor-menu--current"
                            );
                        } else
                          b.tip.show(window.VditorI18n.recording),
                            D.setAttribute("contenteditable", "false"),
                            S.startRecordingNewWavFile(),
                            L.element.children[0].classList.add(
                              "vditor-menu--current"
                            );
                      else
                        navigator.mediaDevices
                          .getUserMedia({ audio: !0 })
                          .then(function (y) {
                            ((S = new Zn(
                              y
                            )).recorder.onaudioprocess = function (y) {
                              if (S.isRecording) {
                                var b = y.inputBuffer.getChannelData(0),
                                  L = y.inputBuffer.getChannelData(1);
                                S.cloneChannelData(b, L);
                              }
                            }),
                              S.startRecordingNewWavFile(),
                              b.tip.show(window.VditorI18n.recording),
                              D.setAttribute("contenteditable", "false"),
                              L.element.children[0].classList.add(
                                "vditor-menu--current"
                              );
                          })
                          .catch(function () {
                            b.tip.show(window.VditorI18n["record-tip"]);
                          });
                    }
                  }
                );
              }),
              t
            );
          })(ge),
          Yn = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          Qn = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                m({ redo: D.element }, ["redo"]),
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) || S.undo.redo(S);
                }),
                D
              );
            }
            return Yn(t, b), t;
          })(ge),
          $n = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          er = (function (b) {
            function t(S, L) {
              var D = b.call(this || y, S, L) || this || y;
              return (
                m({ undo: D.element }, ["undo"]),
                D.element.children[0].addEventListener((0, F.Le)(), function (
                  y
                ) {
                  y.preventDefault(),
                    D.element.firstElementChild.classList.contains(
                      H.g.CLASS_MENU_DISABLED
                    ) || S.undo.undo(S);
                }),
                D
              );
            }
            return $n(t, b), t;
          })(ge),
          tr = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })(),
          nr = (function (b) {
            function t(S, L) {
              var H = b.call(this || y, S, L) || this || y,
                D = '<input type="file"';
              return (
                S.options.upload.multiple && (D += ' multiple="multiple"'),
                S.options.upload.accept &&
                  (D += ' accept="' + S.options.upload.accept + '"'),
                (H.element.children[0].innerHTML =
                  "" +
                  (L.icon ||
                    '<svg><use xlink:href="#vditor-icon-upload"></use></svg>') +
                  D +
                  ">"),
                H._bindEvent(S),
                H
              );
            }
            return (
              tr(t, b),
              (t.prototype._bindEvent = function (b) {
                var S = this || y;
                (this || y).element.children[0].addEventListener(
                  (0, F.Le)(),
                  function (y) {
                    if (
                      S.element.firstElementChild.classList.contains(
                        H.g.CLASS_MENU_DISABLED
                      )
                    )
                      return y.stopPropagation(), void y.preventDefault();
                  }
                ),
                  (this || y).element
                    .querySelector("input")
                    .addEventListener("change", function (y) {
                      if (
                        S.element.firstElementChild.classList.contains(
                          H.g.CLASS_MENU_DISABLED
                        )
                      )
                        return y.stopPropagation(), void y.preventDefault();
                      0 !== y.target.files.length &&
                        We(b, y.target.files, y.target);
                    });
              }),
              t
            );
          })(ge),
          rr = (function () {
            function e(b) {
              var S = this || y,
                L = b.options;
              ((this || y).elements = {}),
                ((this || y).element = document.createElement("div")),
                ((this || y).element.className = "vditor-toolbar"),
                L.toolbar.forEach(function (y, L) {
                  var H = S.genItem(b, y, L);
                  if ((S.element.appendChild(H), y.toolbar)) {
                    var D = document.createElement("div");
                    (D.className = "vditor-hint vditor-panel--arrow"),
                      D.addEventListener((0, F.Le)(), function (y) {
                        D.style.display = "none";
                      }),
                      y.toolbar.forEach(function (y, H) {
                        (y.level = 2), D.appendChild(S.genItem(b, y, L + H));
                      }),
                      H.appendChild(D),
                      g(b, D, H.children[0]);
                  }
                }),
                b.options.toolbarConfig.hide &&
                  (this || y).element.classList.add("vditor-toolbar--hide"),
                b.options.toolbarConfig.pin &&
                  (this || y).element.classList.add("vditor-toolbar--pin"),
                b.options.counter.enable &&
                  ((b.counter = new bn(b)),
                  (this || y).element.appendChild(b.counter.element));
            }
            return (
              (e.prototype.genItem = function (b, S, L) {
                var H;
                switch (S.name) {
                  case "bold":
                  case "italic":
                  case "more":
                  case "strike":
                  case "line":
                  case "quote":
                  case "list":
                  case "ordered-list":
                  case "check":
                  case "code":
                  case "inline-code":
                  case "link":
                  case "table":
                    H = new ge(b, S);
                    break;
                  case "emoji":
                    H = new Cn(b, S);
                    break;
                  case "headings":
                    H = new Hn(b, S);
                    break;
                  case "|":
                    H = new on();
                    break;
                  case "br":
                    H = new Ft();
                    break;
                  case "undo":
                    H = new er(b, S);
                    break;
                  case "redo":
                    H = new Qn(b, S);
                    break;
                  case "help":
                    H = new Dn(b, S);
                    break;
                  case "both":
                    H = new mn(b, S);
                    break;
                  case "preview":
                    H = new Fn(b, S);
                    break;
                  case "fullscreen":
                    H = new _n(b, S);
                    break;
                  case "upload":
                    H = new nr(b, S);
                    break;
                  case "record":
                    H = new Xn(b, S);
                    break;
                  case "info":
                    H = new Rn(b, S);
                    break;
                  case "edit-mode":
                    H = new Qt(b, S);
                    break;
                  case "devtools":
                    H = new Sn(b, S);
                    break;
                  case "outdent":
                    H = new Wn(b, S);
                    break;
                  case "indent":
                    H = new In(b, S);
                    break;
                  case "outline":
                    H = new Kn(b, S);
                    break;
                  case "insert-after":
                    H = new qn(b, S);
                    break;
                  case "insert-before":
                    H = new Vn(b, S);
                    break;
                  case "code-theme":
                    H = new vn(b, S);
                    break;
                  case "content-theme":
                    H = new yn(b, S);
                    break;
                  case "export":
                    H = new Tn(b, S);
                    break;
                  default:
                    H = new En(b, S);
                }
                if (H) {
                  var D = S.name;
                  return (
                    ("br" !== D && "|" !== D) || (D += L),
                    ((this || y).elements[D] = H.element),
                    H.element
                  );
                }
              }),
              e
            );
          })(),
          ir = n(14),
          or = (function () {
            function e() {
              ((this || y).stackSize = 50),
                this.resetStack(),
                ((this || y).dmp = new ir());
            }
            return (
              (e.prototype.clearStack = function (y) {
                this.resetStack(), this.resetIcon(y);
              }),
              (e.prototype.resetIcon = function (b) {
                b.toolbar &&
                  ((this || y)[b.currentMode].undoStack.length > 1
                    ? p(b.toolbar.elements, ["undo"])
                    : m(b.toolbar.elements, ["undo"]),
                  0 !== (this || y)[b.currentMode].redoStack.length
                    ? p(b.toolbar.elements, ["redo"])
                    : m(b.toolbar.elements, ["redo"]));
              }),
              (e.prototype.undo = function (b) {
                if (
                  "false" !==
                    b[b.currentMode].element.getAttribute("contenteditable") &&
                  !((this || y)[b.currentMode].undoStack.length < 2)
                ) {
                  var S = (this || y)[b.currentMode].undoStack.pop();
                  S &&
                    ((this || y)[b.currentMode].redoStack.push(S),
                    this.renderDiff(S, b),
                    ((this || y)[b.currentMode].hasUndo = !0),
                    v(b, ["hint"]));
                }
              }),
              (e.prototype.redo = function (b) {
                if (
                  "false" !==
                  b[b.currentMode].element.getAttribute("contenteditable")
                ) {
                  var S = (this || y)[b.currentMode].redoStack.pop();
                  S &&
                    ((this || y)[b.currentMode].undoStack.push(S),
                    this.renderDiff(S, b, !0));
                }
              }),
              (e.prototype.recordFirstPosition = function (b, S) {
                if (
                  0 !== getSelection().rangeCount &&
                  !(
                    1 !== (this || y)[b.currentMode].undoStack.length ||
                    0 === (this || y)[b.currentMode].undoStack[0].length ||
                    (this || y)[b.currentMode].redoStack.length > 0 ||
                    ((0, F.vU)() && "Backspace" === S.key) ||
                    (0, F.G6)()
                  )
                ) {
                  var L = this.addCaret(b);
                  L.replace("<wbr>", "").replace(
                    " vditor-ir__node--expand",
                    ""
                  ) ===
                    (this || y)[
                      b.currentMode
                    ].undoStack[0][0].diffs[0][1].replace("<wbr>", "") &&
                    (((this || y)[
                      b.currentMode
                    ].undoStack[0][0].diffs[0][1] = L),
                    ((this || y)[b.currentMode].lastText = L));
                }
              }),
              (e.prototype.addToUndoStack = function (b) {
                var S = this.addCaret(b, !0),
                  L = (this || y).dmp.diff_main(
                    S,
                    (this || y)[b.currentMode].lastText,
                    !0
                  ),
                  H = (this || y).dmp.patch_make(
                    S,
                    (this || y)[b.currentMode].lastText,
                    L
                  );
                (0 === H.length &&
                  (this || y)[b.currentMode].undoStack.length > 0) ||
                  (((this || y)[b.currentMode].lastText = S),
                  (this || y)[b.currentMode].undoStack.push(H),
                  (this || y)[b.currentMode].undoStack.length >
                    (this || y).stackSize &&
                    (this || y)[b.currentMode].undoStack.shift(),
                  (this || y)[b.currentMode].hasUndo &&
                    (((this || y)[b.currentMode].redoStack = []),
                    ((this || y)[b.currentMode].hasUndo = !1),
                    m(b.toolbar.elements, ["redo"])),
                  (this || y)[b.currentMode].undoStack.length > 1 &&
                    p(b.toolbar.elements, ["undo"]));
              }),
              (e.prototype.renderDiff = function (b, S, L) {
                var H;
                if ((void 0 === L && (L = !1), L)) {
                  var D = (this || y).dmp.patch_deepCopy(b).reverse();
                  D.forEach(function (y) {
                    y.diffs.forEach(function (y) {
                      y[0] = -y[0];
                    });
                  }),
                    (H = (this || y).dmp.patch_apply(
                      D,
                      (this || y)[S.currentMode].lastText
                    )[0]);
                } else
                  H = (this || y).dmp.patch_apply(
                    b,
                    (this || y)[S.currentMode].lastText
                  )[0];
                if (
                  (((this || y)[S.currentMode].lastText = H),
                  (S[S.currentMode].element.innerHTML = H),
                  "sv" !== S.currentMode &&
                    S[S.currentMode].element
                      .querySelectorAll(
                        ".vditor-" +
                          S.currentMode +
                          "__preview[data-render='2']"
                      )
                      .forEach(function (y) {
                        N(y, S);
                      }),
                  S[S.currentMode].element.querySelector("wbr"))
                )
                  (0, Kt.ib)(
                    S[S.currentMode].element,
                    S[S.currentMode].element.ownerDocument.createRange()
                  ),
                    Ae(S);
                else {
                  var B = getSelection().getRangeAt(0);
                  B.setEndBefore(S[S.currentMode].element), B.collapse(!1);
                }
                O(S),
                  dt(S, {
                    enableAddUndoStack: !1,
                    enableHint: !1,
                    enableInput: !0,
                  }),
                  fe(S),
                  S[S.currentMode].element
                    .querySelectorAll(
                      ".vditor-" + S.currentMode + "__preview[data-render='2']"
                    )
                    .forEach(function (y) {
                      N(y, S);
                    }),
                  (this || y)[S.currentMode].undoStack.length > 1
                    ? p(S.toolbar.elements, ["undo"])
                    : m(S.toolbar.elements, ["undo"]),
                  0 !== (this || y)[S.currentMode].redoStack.length
                    ? p(S.toolbar.elements, ["redo"])
                    : m(S.toolbar.elements, ["redo"]);
              }),
              (e.prototype.resetStack = function () {
                ((this || y).ir = {
                  hasUndo: !1,
                  lastText: "",
                  redoStack: [],
                  undoStack: [],
                }),
                  ((this || y).sv = {
                    hasUndo: !1,
                    lastText: "",
                    redoStack: [],
                    undoStack: [],
                  }),
                  ((this || y).wysiwyg = {
                    hasUndo: !1,
                    lastText: "",
                    redoStack: [],
                    undoStack: [],
                  });
              }),
              (e.prototype.addCaret = function (y, b) {
                var S;
                if (
                  (void 0 === b && (b = !1),
                  0 !== getSelection().rangeCount &&
                    !y[y.currentMode].element.querySelector("wbr"))
                ) {
                  var L = getSelection().getRangeAt(0);
                  if (y[y.currentMode].element.contains(L.startContainer)) {
                    S = L.cloneRange();
                    var H = document.createElement("span");
                    (H.className = "vditor-wbr"), L.insertNode(H);
                  }
                }
                y.ir.element
                  .cloneNode(!0)
                  .querySelectorAll(
                    ".vditor-" + y.currentMode + "__preview[data-render='1']"
                  )
                  .forEach(function (y) {
                    (y.firstElementChild.classList.contains(
                      "language-echarts"
                    ) ||
                      y.firstElementChild.classList.contains(
                        "language-plantuml"
                      ) ||
                      y.firstElementChild.classList.contains(
                        "language-mindmap"
                      )) &&
                      (y.firstElementChild.removeAttribute(
                        "_echarts_instance_"
                      ),
                      y.firstElementChild.removeAttribute("data-processed"),
                      (y.firstElementChild.innerHTML =
                        y.previousElementSibling.firstElementChild.innerHTML),
                      y.setAttribute("data-render", "2")),
                      y.firstElementChild.classList.contains("language-math") &&
                        (y.setAttribute("data-render", "2"),
                        (y.firstElementChild.textContent = y.firstElementChild.getAttribute(
                          "data-math"
                        )),
                        y.firstElementChild.removeAttribute("data-math"));
                  });
                var D = y[y.currentMode].element.innerHTML;
                return (
                  y[y.currentMode].element
                    .querySelectorAll(".vditor-wbr")
                    .forEach(function (y) {
                      y.remove();
                    }),
                  b && S && (0, Kt.Hc)(S),
                  D.replace('<span class="vditor-wbr"></span>', "<wbr>")
                );
              }),
              e
            );
          })(),
          ar = n(640),
          lr = (function () {
            function e(b) {
              ((this || y).defaultOptions = {
                rtl: !1,
                after: void 0,
                cache: { enable: !0 },
                cdn: H.g.CDN,
                classes: { preview: "" },
                comment: { enable: !1 },
                counter: { enable: !1, type: "markdown" },
                debugger: !1,
                fullscreen: { index: 90 },
                height: "auto",
                hint: {
                  delay: 200,
                  emoji: {
                    "+1": "👍",
                    "-1": "👎",
                    confused: "😕",
                    eyes: "👀️",
                    heart: "❤️",
                    rocket: "🚀️",
                    smile: "😄",
                    tada: "🎉️",
                    angry: "😠",
                  },
                  emojiPath: H.g.CDN + "/dist/images/emoji",
                  extend: [],
                  parse: !0,
                },
                icon: "ant",
                lang: "zh_CN",
                mode: "ir",
                outline: { enable: !1, position: "left" },
                placeholder: "",
                preview: {
                  actions: ["desktop", "tablet", "mobile"],
                  delay: 1e3,
                  hljs: H.g.HLJS_OPTIONS,
                  markdown: H.g.MARKDOWN_OPTIONS,
                  math: H.g.MATH_OPTIONS,
                  maxWidth: 800,
                  mode: "both",
                  theme: H.g.THEME_OPTIONS,
                },
                link: { isOpen: !0 },
                image: { isPreview: !0 },
                resize: { enable: !1, position: "bottom" },
                theme: "classic",
                toolbar: [
                  "emoji",
                  "headings",
                  "bold",
                  "italic",
                  "strike",
                  "link",
                  "|",
                  "list",
                  "ordered-list",
                  "check",
                  "outdent",
                  "indent",
                  "|",
                  "quote",
                  "line",
                  "code",
                  "inline-code",
                  "insert-before",
                  "insert-after",
                  "|",
                  "upload",
                  // "record",
                  "table",
                  "|",
                  "undo",
                  "redo",
                  "|",
                  "fullscreen",
                  "edit-mode",
                  {
                    name: "more",
                    toolbar: [
                      "both",
                      "code-theme",
                      "content-theme",
                      "export",
                      "outline",
                      "preview",
                      "devtools",
                      // "info",
                      // "help",
                    ],
                  },
                ],
                toolbarConfig: { hide: !1, pin: !1 },
                typewriterMode: !1,
                undoDelay: 800,
                upload: {
                  extraData: {},
                  fieldName: "file[]",
                  filename: function (y) {
                    return y.replace(/\W/g, "");
                  },
                  linkToImgUrl: "",
                  max: 10485760,
                  multiple: !0,
                  url: "",
                  withCredentials: !1,
                },
                value: "",
                width: "auto",
              }),
                ((this || y).options = b);
            }
            return (
              (e.prototype.merge = function () {
                var b, S, L;
                (this || y).options &&
                  ((this || y).options.toolbar
                    ? ((this || y).options.toolbar = this.mergeToolbar(
                        (this || y).options.toolbar
                      ))
                    : ((this || y).options.toolbar = this.mergeToolbar(
                        (this || y).defaultOptions.toolbar
                      )),
                  (null ===
                    (S =
                      null === (b = (this || y).options.preview) || void 0 === b
                        ? void 0
                        : b.theme) || void 0 === S
                    ? void 0
                    : S.list) &&
                    ((this || y).defaultOptions.preview.theme.list = (
                      this || y
                    ).options.preview.theme.list),
                  (null === (L = (this || y).options.hint) || void 0 === L
                    ? void 0
                    : L.emoji) &&
                    ((this || y).defaultOptions.hint.emoji = (
                      this || y
                    ).options.hint.emoji),
                  (this || y).options.comment &&
                    ((this || y).defaultOptions.comment = (
                      this || y
                    ).options.comment));
                var H = (0, ar.T)(
                  (this || y).defaultOptions,
                  (this || y).options
                );
                if (H.cache.enable && !H.cache.id)
                  throw new Error(
                    "need options.cache.id, see https://ld246.com/article/1549638745630#options"
                  );
                return H;
              }),
              (e.prototype.mergeToolbar = function (b) {
                var S = this || y,
                  L = [
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-export"></use></svg>',
                      name: "export",
                      tipPosition: "ne",
                    },
                    {
                      hotkey: "⌘E",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>',
                      name: "emoji",
                      tipPosition: "ne",
                    },
                    {
                      hotkey: "⌘H",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
                      name: "headings",
                      tipPosition: "ne",
                    },
                    {
                      hotkey: "⌘B",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
                      name: "bold",
                      prefix: "**",
                      suffix: "**",
                      tipPosition: "ne",
                    },
                    {
                      hotkey: "⌘I",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
                      name: "italic",
                      prefix: "*",
                      suffix: "*",
                      tipPosition: "ne",
                    },
                    {
                      hotkey: "⌘D",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
                      name: "strike",
                      prefix: "~~",
                      suffix: "~~",
                      tipPosition: "ne",
                    },
                    {
                      hotkey: "⌘K",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
                      name: "link",
                      prefix: "[",
                      suffix: "](https://)",
                      tipPosition: "n",
                    },
                    { name: "|" },
                    {
                      hotkey: "⌘L",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
                      name: "list",
                      prefix: "* ",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⌘O",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
                      name: "ordered-list",
                      prefix: "1. ",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⌘J",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
                      name: "check",
                      prefix: "* [ ] ",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⇧⌘I",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
                      name: "outdent",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⇧⌘O",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
                      name: "indent",
                      tipPosition: "n",
                    },
                    { name: "|" },
                    {
                      hotkey: "⌘;",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
                      name: "quote",
                      prefix: "> ",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⇧⌘H",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
                      name: "line",
                      prefix: "---",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⌘U",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
                      name: "code",
                      prefix: "```",
                      suffix: "\n```",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⌘G",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
                      name: "inline-code",
                      prefix: "`",
                      suffix: "`",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⇧⌘B",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-before"></use></svg>',
                      name: "insert-before",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⇧⌘E",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-after"></use></svg>',
                      name: "insert-after",
                      tipPosition: "n",
                    },
                    { name: "|" },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
                      name: "upload",
                      tipPosition: "n",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-record"></use></svg>',
                      name: "record",
                      tipPosition: "n",
                    },
                    {
                      hotkey: "⌘M",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
                      name: "table",
                      prefix: "| col1",
                      suffix:
                        " | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |",
                      tipPosition: "n",
                    },
                    { name: "|" },
                    {
                      hotkey: "⌘Z",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
                      name: "undo",
                      tipPosition: "nw",
                    },
                    {
                      hotkey: "⌘Y",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
                      name: "redo",
                      tipPosition: "nw",
                    },
                    { name: "|" },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-more"></use></svg>',
                      name: "more",
                      tipPosition: "e",
                    },
                    {
                      hotkey: "⌘'",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>',
                      name: "fullscreen",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-edit"></use></svg>',
                      name: "edit-mode",
                      tipPosition: "nw",
                    },
                    {
                      hotkey: "⌘P",
                      icon:
                        '<svg><use xlink:href="#vditor-icon-both"></use></svg>',
                      name: "both",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-preview"></use></svg>',
                      name: "preview",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
                      name: "outline",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
                      name: "content-theme",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
                      name: "code-theme",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-bug"></use></svg>',
                      name: "devtools",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-info"></use></svg>',
                      name: "info",
                      tipPosition: "nw",
                    },
                    {
                      icon:
                        '<svg><use xlink:href="#vditor-icon-help"></use></svg>',
                      name: "help",
                      tipPosition: "nw",
                    },
                    { name: "br" },
                  ],
                  H = [];
                return (
                  b.forEach(function (y) {
                    var b = y;
                    L.forEach(function (S) {
                      "string" == typeof y && S.name === y && (b = S),
                        "object" == typeof y &&
                          S.name === y.name &&
                          (b = Object.assign({}, S, y));
                    }),
                      y.toolbar && (b.toolbar = S.mergeToolbar(y.toolbar)),
                      H.push(b);
                  }),
                  H
                );
              }),
              e
            );
          })(),
          sr = (function () {
            function e(b) {
              var S = this || y;
              ((this || y).composingLock = !1), ((this || y).commentIds = []);
              var L = document.createElement("div");
              (L.className = "vditor-wysiwyg"),
                (L.innerHTML =
                  '<pre class="vditor-reset" placeholder="' +
                  b.options.placeholder +
                  '"\n contenteditable="true" spellcheck="false"></pre>\n<div class="vditor-panel vditor-panel--none"></div>\n<div class="vditor-panel vditor-panel--none">\n    <button type="button" aria-label="' +
                  window.VditorI18n.comment +
                  '" class="vditor-icon vditor-tooltipped vditor-tooltipped__n">\n        <svg><use xlink:href="#vditor-icon-comment"></use></svg>\n    </button>\n</div>'),
                ((this || y).element = L.firstElementChild),
                ((this || y).popover = L.firstElementChild.nextElementSibling),
                ((this || y).selectPopover = L.lastElementChild),
                this.bindEvent(b),
                ke(b, (this || y).element),
                Se(b, (this || y).element),
                Le(b, (this || y).element),
                _e(b, (this || y).element),
                xe(b, (this || y).element),
                Ce(b, (this || y).element),
                Me(b, (this || y).element, (this || y).copy),
                Te(b, (this || y).element, (this || y).copy),
                b.options.comment.enable &&
                  ((this || y).selectPopover.querySelector(
                    "button"
                  ).onclick = function () {
                    var y,
                      L,
                      D = Lute.NewNodeID(),
                      B = getSelection().getRangeAt(0),
                      U = B.cloneRange(),
                      F = B.extractContents(),
                      ye = !1,
                      we = !1;
                    F.childNodes.forEach(function (b, S) {
                      var H = !1;
                      if (
                        (3 === b.nodeType
                          ? (H = !0)
                          : b.classList.contains("vditor-comment")
                          ? b.classList.contains("vditor-comment") &&
                            b.setAttribute(
                              "data-cmtids",
                              b.getAttribute("data-cmtids") + " " + D
                            )
                          : (H = !0),
                        H)
                      )
                        if (
                          3 !== b.nodeType &&
                          "0" === b.getAttribute("data-block") &&
                          0 === S &&
                          U.startOffset > 0
                        )
                          (b.innerHTML =
                            '<span class="vditor-comment" data-cmtids="' +
                            D +
                            '">' +
                            b.innerHTML +
                            "</span>"),
                            (y = b);
                        else if (
                          3 !== b.nodeType &&
                          "0" === b.getAttribute("data-block") &&
                          S === F.childNodes.length - 1 &&
                          U.endOffset < U.endContainer.textContent.length
                        )
                          (b.innerHTML =
                            '<span class="vditor-comment" data-cmtids="' +
                            D +
                            '">' +
                            b.innerHTML +
                            "</span>"),
                            (L = b);
                        else if (
                          3 !== b.nodeType &&
                          "0" === b.getAttribute("data-block")
                        )
                          0 === S
                            ? (ye = !0)
                            : S === F.childNodes.length - 1 && (we = !0),
                            (b.innerHTML =
                              '<span class="vditor-comment" data-cmtids="' +
                              D +
                              '">' +
                              b.innerHTML +
                              "</span>");
                        else {
                          var B = document.createElement("span");
                          B.classList.add("vditor-comment"),
                            B.setAttribute("data-cmtids", D),
                            b.parentNode.insertBefore(B, b),
                            B.appendChild(b);
                        }
                    });
                    var Dt = (0, Z.F9)(U.startContainer);
                    Dt &&
                      (y
                        ? (Dt.insertAdjacentHTML("beforeend", y.innerHTML),
                          y.remove())
                        : "" === Dt.textContent.trim().replace(H.g.ZWSP, "") &&
                          ye &&
                          Dt.remove());
                    var Ot = (0, Z.F9)(U.endContainer);
                    Ot &&
                      (L
                        ? (Ot.insertAdjacentHTML("afterbegin", L.innerHTML),
                          L.remove())
                        : "" === Ot.textContent.trim().replace(H.g.ZWSP, "") &&
                          we &&
                          Ot.remove()),
                      B.insertNode(F),
                      b.options.comment.add(
                        D,
                        B.toString(),
                        S.getComments(b, !0)
                      ),
                      Y(b, {
                        enableAddUndoStack: !0,
                        enableHint: !1,
                        enableInput: !1,
                      }),
                      S.hideComment();
                  });
            }
            return (
              (e.prototype.getComments = function (b, S) {
                var L = this || y;
                if (
                  (void 0 === S && (S = !1),
                  "wysiwyg" !== b.currentMode || !b.options.comment.enable)
                )
                  return [];
                ((this || y).commentIds = []),
                  (this || y).element
                    .querySelectorAll(".vditor-comment")
                    .forEach(function (y) {
                      L.commentIds = L.commentIds.concat(
                        y.getAttribute("data-cmtids").split(" ")
                      );
                    }),
                  ((this || y).commentIds = Array.from(
                    new Set((this || y).commentIds)
                  ));
                var H = [];
                return S
                  ? ((this || y).commentIds.forEach(function (y) {
                      H.push({
                        id: y,
                        top: L.element.querySelector(
                          '.vditor-comment[data-cmtids="' + y + '"]'
                        ).offsetTop,
                      });
                    }),
                    H)
                  : void 0;
              }),
              (e.prototype.triggerRemoveComment = function (b) {
                var S, L, H;
                if (
                  "wysiwyg" === b.currentMode &&
                  b.options.comment.enable &&
                  b.wysiwyg.commentIds.length > 0
                ) {
                  var D = JSON.parse(JSON.stringify((this || y).commentIds));
                  this.getComments(b);
                  var B =
                    ((S = D),
                    (L = (this || y).commentIds),
                    (H = new Set(L)),
                    S.filter(function (y) {
                      return !H.has(y);
                    }));
                  B.length > 0 && b.options.comment.remove(B);
                }
              }),
              (e.prototype.showComment = function () {
                var b = (0, Kt.Ny)((this || y).element);
                (this || y).selectPopover.setAttribute(
                  "style",
                  "left:" +
                    b.left +
                    "px;display:block;top:" +
                    Math.max(-8, b.top - 21) +
                    "px"
                );
              }),
              (e.prototype.hideComment = function () {
                (this || y).selectPopover.setAttribute("style", "display:none");
              }),
              (e.prototype.unbindListener = function () {
                window.removeEventListener(
                  "scroll",
                  (this || y).scrollListener
                );
              }),
              (e.prototype.copy = function (y, b) {
                var S = getSelection().getRangeAt(0);
                if ("" !== S.toString()) {
                  y.stopPropagation(), y.preventDefault();
                  var L = (0, Z.lG)(S.startContainer, "CODE"),
                    H = (0, Z.lG)(S.endContainer, "CODE");
                  if (L && H && H.isSameNode(L)) {
                    var D = "";
                    return (
                      (D =
                        "PRE" === L.parentElement.tagName
                          ? S.toString()
                          : "`" + S.toString() + "`"),
                      y.clipboardData.setData("text/plain", D),
                      void y.clipboardData.setData("text/html", "")
                    );
                  }
                  var B = (0, Z.lG)(S.startContainer, "A"),
                    U = (0, Z.lG)(S.endContainer, "A");
                  if (B && U && U.isSameNode(B)) {
                    var F = B.getAttribute("title") || "";
                    return (
                      F && (F = ' "' + F + '"'),
                      y.clipboardData.setData(
                        "text/plain",
                        "[" +
                          S.toString() +
                          "](" +
                          B.getAttribute("href") +
                          F +
                          ")"
                      ),
                      void y.clipboardData.setData("text/html", "")
                    );
                  }
                  var ye = document.createElement("div");
                  ye.appendChild(S.cloneContents()),
                    y.clipboardData.setData(
                      "text/plain",
                      b.lute.VditorDOM2Md(ye.innerHTML).trim()
                    ),
                    y.clipboardData.setData("text/html", "");
                }
              }),
              (e.prototype.bindEvent = function (b) {
                var S = this || y;
                this.unbindListener(),
                  window.addEventListener(
                    "scroll",
                    ((this || y).scrollListener = function () {
                      if (
                        (v(b, ["hint"]),
                        "block" === S.popover.style.display &&
                          "block" === S.selectPopover.style.display)
                      ) {
                        var y = parseInt(
                          S.popover.getAttribute("data-top"),
                          10
                        );
                        if ("auto" === b.options.height) {
                          if (b.options.toolbarConfig.pin) {
                            var L =
                              Math.max(
                                y,
                                window.scrollY - b.element.offsetTop - 8
                              ) + "px";
                            "block" === S.popover.style.display &&
                              (S.popover.style.top = L),
                              "block" === S.selectPopover.style.display &&
                                (S.selectPopover.style.top = L);
                          }
                        } else if (
                          b.options.toolbarConfig.pin &&
                          0 === b.toolbar.element.getBoundingClientRect().top
                        ) {
                          var H =
                            Math.max(
                              window.scrollY - b.element.offsetTop - 8,
                              Math.min(
                                y - b.wysiwyg.element.scrollTop,
                                S.element.clientHeight - 21
                              )
                            ) + "px";
                          "block" === S.popover.style.display &&
                            (S.popover.style.top = H),
                            "block" === S.selectPopover.style.display &&
                              (S.selectPopover.style.top = H);
                        }
                      }
                    })
                  ),
                  (this || y).element.addEventListener("scroll", function () {
                    if (
                      (v(b, ["hint"]),
                      b.options.comment &&
                        b.options.comment.enable &&
                        b.options.comment.scroll &&
                        b.options.comment.scroll(b.wysiwyg.element.scrollTop),
                      "block" === S.popover.style.display)
                    ) {
                      var y =
                          parseInt(S.popover.getAttribute("data-top"), 10) -
                          b.wysiwyg.element.scrollTop,
                        L = -8;
                      b.options.toolbarConfig.pin &&
                        0 === b.toolbar.element.getBoundingClientRect().top &&
                        (L = window.scrollY - b.element.offsetTop + L);
                      var H =
                        Math.max(L, Math.min(y, S.element.clientHeight - 21)) +
                        "px";
                      (S.popover.style.top = H),
                        (S.selectPopover.style.top = H);
                    }
                  }),
                  (this || y).element.addEventListener("paste", function (y) {
                    Ct(b, y, {
                      pasteCode: function (y) {
                        var S = (0, Kt.zh)(b),
                          L = document.createElement("template");
                        (L.innerHTML = y),
                          S.insertNode(L.content.cloneNode(!0));
                        var H = (0, Z.a1)(S.startContainer, "data-block", "0");
                        H
                          ? (H.outerHTML = b.lute.SpinVditorDOM(H.outerHTML))
                          : (b.wysiwyg.element.innerHTML = b.lute.SpinVditorDOM(
                              b.wysiwyg.element.innerHTML
                            )),
                          (0, Kt.ib)(b.wysiwyg.element, S);
                      },
                    });
                  }),
                  (this || y).element.addEventListener(
                    "compositionstart",
                    function () {
                      S.composingLock = !0;
                    }
                  ),
                  (this || y).element.addEventListener(
                    "compositionend",
                    function (y) {
                      var L = (0, ye.W)(
                        getSelection().getRangeAt(0).startContainer
                      );
                      L && "" === L.textContent
                        ? O(b)
                        : ((0, F.vU)() ||
                            ze(b, getSelection().getRangeAt(0).cloneRange(), y),
                          (S.composingLock = !1));
                    }
                  ),
                  (this || y).element.addEventListener("input", function (y) {
                    if (
                      "deleteByDrag" !== y.inputType &&
                      "insertFromDrop" !== y.inputType
                    ) {
                      if (S.preventInput)
                        return (S.preventInput = !1), void Y(b);
                      if (
                        S.composingLock ||
                        "‘" === y.data ||
                        "“" === y.data ||
                        "《" === y.data
                      )
                        Y(b);
                      else {
                        var L = getSelection().getRangeAt(0),
                          H = (0, Z.F9)(L.startContainer);
                        if (
                          (H || (ee(b, L), (H = (0, Z.F9)(L.startContainer))),
                          H)
                        ) {
                          for (
                            var D = (0, Kt.im)(H, b.wysiwyg.element, L).start,
                              B = !0,
                              U = D - 1;
                            U > H.textContent.substr(0, D).lastIndexOf("\n");
                            U--
                          )
                            if (
                              " " !== H.textContent.charAt(U) &&
                              "\t" !== H.textContent.charAt(U)
                            ) {
                              B = !1;
                              break;
                            }
                          0 === D && (B = !1);
                          var F = !0;
                          for (U = D - 1; U < H.textContent.length; U++)
                            if (
                              " " !== H.textContent.charAt(U) &&
                              "\n" !== H.textContent.charAt(U)
                            ) {
                              F = !1;
                              break;
                            }
                          var we = (0, ye.W)(
                            getSelection().getRangeAt(0).startContainer
                          );
                          we && "" === we.textContent && (O(b), we.remove()),
                            (B &&
                              "code-block" !== H.getAttribute("data-type")) ||
                            F ||
                            st(H.innerHTML) ||
                            (lt(H.innerHTML) && H.previousElementSibling)
                              ? "function" == typeof b.options.input &&
                                b.options.input(a(b))
                              : ze(b, L, y);
                        }
                      }
                    }
                  }),
                  (this || y).element.addEventListener("click", function (y) {
                    if ("INPUT" === y.target.tagName) {
                      var L = y.target;
                      return (
                        L.checked
                          ? L.setAttribute("checked", "checked")
                          : L.removeAttribute("checked"),
                        (S.preventInput = !0),
                        void Y(b)
                      );
                    }
                    if (
                      "IMG" !== y.target.tagName ||
                      y.target.parentElement.classList.contains(
                        "vditor-wysiwyg__preview"
                      )
                    ) {
                      if ("A" === y.target.tagName)
                        return (
                          b.options.link.click
                            ? b.options.link.click(y.target)
                            : b.options.link.isOpen &&
                              window.open(y.target.getAttribute("href")),
                          void y.preventDefault()
                        );
                      var D = (0, Kt.zh)(b);
                      if (
                        y.target.isEqualNode(S.element) &&
                        S.element.lastElementChild &&
                        D.collapsed
                      ) {
                        var B = S.element.lastElementChild.getBoundingClientRect();
                        y.y > B.top + B.height &&
                          ("P" === S.element.lastElementChild.tagName &&
                          "" ===
                            S.element.lastElementChild.textContent
                              .trim()
                              .replace(H.g.ZWSP, "")
                            ? (D.selectNodeContents(S.element.lastElementChild),
                              D.collapse(!1))
                            : (S.element.insertAdjacentHTML(
                                "beforeend",
                                '<p data-block="0">' + H.g.ZWSP + "<wbr></p>"
                              ),
                              (0, Kt.ib)(S.element, D)));
                      }
                      oe(b);
                      var U = (0, Z.fb)(y.target, "vditor-wysiwyg__preview");
                      U ||
                        (U = (0, Z.fb)(
                          (0, Kt.zh)(b).startContainer,
                          "vditor-wysiwyg__preview"
                        )),
                        U && re(U, b),
                        I(y, b);
                    } else
                      "link-ref" === y.target.getAttribute("data-type")
                        ? le(b, y.target)
                        : (function (y, b) {
                            var S = y.target;
                            b.wysiwyg.popover.innerHTML = "";
                            var r = function () {
                                S.setAttribute("src", H.value),
                                  S.setAttribute("alt", B.value),
                                  S.setAttribute("title", F.value);
                              },
                              L = document.createElement("span");
                            L.setAttribute(
                              "aria-label",
                              window.VditorI18n.imageURL
                            ),
                              (L.className =
                                "vditor-tooltipped vditor-tooltipped__n");
                            var H = document.createElement("input");
                            L.appendChild(H),
                              (H.className = "vditor-input"),
                              H.setAttribute(
                                "placeholder",
                                window.VditorI18n.imageURL
                              ),
                              (H.value = S.getAttribute("src") || ""),
                              (H.oninput = function () {
                                r();
                              }),
                              (H.onkeydown = function (y) {
                                ie(b, y);
                              });
                            var D = document.createElement("span");
                            D.setAttribute(
                              "aria-label",
                              window.VditorI18n.alternateText
                            ),
                              (D.className =
                                "vditor-tooltipped vditor-tooltipped__n");
                            var B = document.createElement("input");
                            D.appendChild(B),
                              (B.className = "vditor-input"),
                              B.setAttribute(
                                "placeholder",
                                window.VditorI18n.alternateText
                              ),
                              (B.style.width = "52px"),
                              (B.value = S.getAttribute("alt") || ""),
                              (B.oninput = function () {
                                r();
                              }),
                              (B.onkeydown = function (y) {
                                ie(b, y);
                              });
                            var U = document.createElement("span");
                            U.setAttribute(
                              "aria-label",
                              window.VditorI18n.title
                            ),
                              (U.className =
                                "vditor-tooltipped vditor-tooltipped__n");
                            var F = document.createElement("input");
                            U.appendChild(F),
                              (F.className = "vditor-input"),
                              F.setAttribute(
                                "placeholder",
                                window.VditorI18n.title
                              ),
                              (F.value = S.getAttribute("title") || ""),
                              (F.oninput = function () {
                                r();
                              }),
                              (F.onkeydown = function (y) {
                                ie(b, y);
                              }),
                              ce(S, b),
                              b.wysiwyg.popover.insertAdjacentElement(
                                "beforeend",
                                L
                              ),
                              b.wysiwyg.popover.insertAdjacentElement(
                                "beforeend",
                                D
                              ),
                              b.wysiwyg.popover.insertAdjacentElement(
                                "beforeend",
                                U
                              ),
                              ae(b, S);
                          })(y, b);
                  }),
                  (this || y).element.addEventListener("keyup", function (y) {
                    if (!y.isComposing && !(0, F.yl)(y)) {
                      "Enter" === y.key && Ae(b),
                        ("Backspace" !== y.key && "Delete" !== y.key) ||
                          "" === b.wysiwyg.element.innerHTML ||
                          1 !== b.wysiwyg.element.childNodes.length ||
                          !b.wysiwyg.element.firstElementChild ||
                          "P" !== b.wysiwyg.element.firstElementChild.tagName ||
                          0 !==
                            b.wysiwyg.element.firstElementChild
                              .childElementCount ||
                          ("" !== b.wysiwyg.element.textContent &&
                            "\n" !== b.wysiwyg.element.textContent) ||
                          (b.wysiwyg.element.innerHTML = "");
                      var S = (0, Kt.zh)(b);
                      if (
                        ("Backspace" === y.key &&
                          (0, F.vU)() &&
                          "\n" === S.startContainer.textContent &&
                          1 === S.startOffset &&
                          (S.startContainer.textContent = ""),
                        ee(b, S),
                        oe(b),
                        "ArrowDown" === y.key ||
                          "ArrowRight" === y.key ||
                          "Backspace" === y.key ||
                          "ArrowLeft" === y.key ||
                          "ArrowUp" === y.key)
                      ) {
                        ("ArrowLeft" !== y.key && "ArrowRight" !== y.key) ||
                          b.hint.render(b);
                        var L = (0, Z.fb)(
                          S.startContainer,
                          "vditor-wysiwyg__preview"
                        );
                        !L &&
                          3 !== S.startContainer.nodeType &&
                          S.startOffset > 0 &&
                          (D = S.startContainer).classList.contains(
                            "vditor-wysiwyg__block"
                          ) &&
                          (L = D.lastElementChild);
                        if (L)
                          if (
                            "none" !== L.previousElementSibling.style.display
                          ) {
                            var H = L.previousElementSibling;
                            if (
                              ("PRE" === H.tagName && (H = H.firstElementChild),
                              "ArrowDown" === y.key || "ArrowRight" === y.key)
                            ) {
                              var D,
                                B = (function (y) {
                                  for (var b = y; b && !b.nextSibling; )
                                    b = b.parentElement;
                                  return b.nextSibling;
                                })((D = L.parentElement));
                              if (B && 3 !== B.nodeType) {
                                var U = B.querySelector(
                                  ".vditor-wysiwyg__preview"
                                );
                                if (U) return void re(U, b);
                              }
                              if (3 === B.nodeType) {
                                for (
                                  ;
                                  0 === B.textContent.length && B.nextSibling;

                                )
                                  B = B.nextSibling;
                                S.setStart(B, 1);
                              } else S.setStart(B.firstChild, 0);
                            } else S.selectNodeContents(H), S.collapse(!1);
                          } else
                            "ArrowDown" === y.key || "ArrowRight" === y.key
                              ? re(L, b)
                              : re(L, b, !1);
                      }
                    }
                  });
              }),
              e
            );
          })(),
          dr = (function () {
            var e = function (y, b) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (y, b) {
                      y.__proto__ = b;
                    }) ||
                  function (y, b) {
                    for (var S in b) b.hasOwnProperty(S) && (y[S] = b[S]);
                  }),
                e(y, b)
              );
            };
            return function (b, S) {
              function r() {
                (this || y).constructor = b;
              }
              e(b, S),
                (b.prototype =
                  null === S
                    ? Object.create(S)
                    : ((r.prototype = S.prototype), new r()));
            };
          })();
        const cr = (function (b) {
          function t(S, L) {
            var D = b.call(this || y) || this || y;
            (D.version = H.H),
              "string" == typeof S &&
                (L
                  ? L.cache
                    ? L.cache.id || (L.cache.id = "vditor" + S)
                    : (L.cache = { id: "vditor" + S })
                  : (L = { cache: { id: "vditor" + S } }),
                (S = document.getElementById(S)));
            var U = new lr(L).merge();
            if (U.i18n) (window.VditorI18n = U.i18n), D.init(S, U);
            else {
              if (
                ![
                  "en_US",
                  "fr_FR",
                  "ja_JP",
                  "ko_KR",
                  "ru_RU",
                  "sv_SE",
                  "zh_CN",
                  "zh_TW",
                ].includes(U.lang)
              )
                throw new Error(
                  "options.lang error, see https://ld246.com/article/1549638745630#options"
                );
              var F = "vditorI18nScript",
                Z = F + U.lang;
              document
                .querySelectorAll('head script[id^="vditorI18nScript"]')
                .forEach(function (y) {
                  y.id !== Z && document.head.removeChild(y);
                }),
                (0, B.G)(U.cdn + "/dist/js/i18n/" + U.lang + ".js", Z).then(
                  function () {
                    D.init(S, U);
                  }
                );
            }
            return D;
          }
          return (
            dr(t, b),
            (t.prototype.setTheme = function (b, S, L, H) {
              ((this || y).vditor.options.theme = b),
                W((this || y).vditor),
                S &&
                  (((this || y).vditor.options.preview.theme.current = S),
                  (0, Zt.Z)(
                    S,
                    H || (this || y).vditor.options.preview.theme.path
                  )),
                L &&
                  (((this || y).vditor.options.preview.hljs.style = L),
                  (0, fn.Y)(L, (this || y).vditor.options.cdn));
            }),
            (t.prototype.getValue = function () {
              return a((this || y).vditor);
            }),
            (t.prototype.getCurrentMode = function () {
              return (this || y).vditor.currentMode;
            }),
            (t.prototype.focus = function () {
              "sv" === (this || y).vditor.currentMode
                ? (this || y).vditor.sv.element.focus()
                : "wysiwyg" === (this || y).vditor.currentMode
                ? (this || y).vditor.wysiwyg.element.focus()
                : "ir" === (this || y).vditor.currentMode &&
                  (this || y).vditor.ir.element.focus();
            }),
            (t.prototype.blur = function () {
              "sv" === (this || y).vditor.currentMode
                ? (this || y).vditor.sv.element.blur()
                : "wysiwyg" === (this || y).vditor.currentMode
                ? (this || y).vditor.wysiwyg.element.blur()
                : "ir" === (this || y).vditor.currentMode &&
                  (this || y).vditor.ir.element.blur();
            }),
            (t.prototype.disabled = function () {
              v((this || y).vditor, ["subToolbar", "hint", "popover"]),
                m(
                  (this || y).vditor.toolbar.elements,
                  H.g.EDIT_TOOLBARS.concat([
                    "undo",
                    "redo",
                    "fullscreen",
                    "edit-mode",
                  ])
                ),
                (this || y).vditor[
                  (this || y).vditor.currentMode
                ].element.setAttribute("contenteditable", "false");
            }),
            (t.prototype.enable = function () {
              p(
                (this || y).vditor.toolbar.elements,
                H.g.EDIT_TOOLBARS.concat([
                  "undo",
                  "redo",
                  "fullscreen",
                  "edit-mode",
                ])
              ),
                (this || y).vditor.undo.resetIcon((this || y).vditor),
                (this || y).vditor[
                  (this || y).vditor.currentMode
                ].element.setAttribute("contenteditable", "true");
            }),
            (t.prototype.getSelection = function () {
              return "wysiwyg" === (this || y).vditor.currentMode
                ? Ee((this || y).vditor.wysiwyg.element)
                : "sv" === (this || y).vditor.currentMode
                ? Ee((this || y).vditor.sv.element)
                : "ir" === (this || y).vditor.currentMode
                ? Ee((this || y).vditor.ir.element)
                : void 0;
            }),
            (t.prototype.renderPreview = function (b) {
              (this || y).vditor.preview.render((this || y).vditor, b);
            }),
            (t.prototype.getCursorPosition = function () {
              return (0, Kt.Ny)(
                (this || y).vditor[(this || y).vditor.currentMode].element
              );
            }),
            (t.prototype.isUploading = function () {
              return (this || y).vditor.upload.isUploading;
            }),
            (t.prototype.clearCache = function () {
              localStorage.removeItem((this || y).vditor.options.cache.id);
            }),
            (t.prototype.disabledCache = function () {
              (this || y).vditor.options.cache.enable = !1;
            }),
            (t.prototype.enableCache = function () {
              if (!(this || y).vditor.options.cache.id)
                throw new Error(
                  "need options.cache.id, see https://ld246.com/article/1549638745630#options"
                );
              (this || y).vditor.options.cache.enable = !0;
            }),
            (t.prototype.html2md = function (b) {
              return (this || y).vditor.lute.HTML2Md(b);
            }),
            (t.prototype.exportJSON = function (b) {
              return (this || y).vditor.lute.RenderJSON(b);
            }),
            (t.prototype.getHTML = function () {
              return It((this || y).vditor);
            }),
            (t.prototype.tip = function (b, S) {
              (this || y).vditor.tip.show(b, S);
            }),
            (t.prototype.setPreviewMode = function (b) {
              zt(b, (this || y).vditor);
            }),
            (t.prototype.deleteValue = function () {
              window.getSelection().isCollapsed ||
                document.execCommand("delete", !1);
            }),
            (t.prototype.updateValue = function (y) {
              document.execCommand("insertHTML", !1, y);
            }),
            (t.prototype.insertValue = function (b, S) {
              void 0 === S && (S = !0);
              var L = (0, Kt.zh)((this || y).vditor);
              L.collapse(!0);
              var H = document.createElement("template");
              (H.innerHTML = b),
                L.insertNode(H.content.cloneNode(!0)),
                "sv" === (this || y).vditor.currentMode
                  ? (((this || y).vditor.sv.preventInput = !0),
                    S && V((this || y).vditor))
                  : "wysiwyg" === (this || y).vditor.currentMode
                  ? (((this || y).vditor.wysiwyg.preventInput = !0),
                    S && ze((this || y).vditor, getSelection().getRangeAt(0)))
                  : "ir" === (this || y).vditor.currentMode &&
                    (((this || y).vditor.ir.preventInput = !0),
                    S &&
                      R((this || y).vditor, getSelection().getRangeAt(0), !0));
            }),
            (t.prototype.setValue = function (b, S) {
              var L = this || y;
              void 0 === S && (S = !1),
                "sv" === (this || y).vditor.currentMode
                  ? (((this || y).vditor.sv.element.innerHTML =
                      "<div data-block='0'>" +
                      (this || y).vditor.lute.SpinVditorSVDOM(b) +
                      "</div>"),
                    Ie((this || y).vditor, {
                      enableAddUndoStack: !0,
                      enableHint: !1,
                      enableInput: !1,
                    }))
                  : "wysiwyg" === (this || y).vditor.currentMode
                  ? he((this || y).vditor, b, {
                      enableAddUndoStack: !0,
                      enableHint: !1,
                      enableInput: !1,
                    })
                  : (((this || y).vditor.ir.element.innerHTML = (
                      this || y
                    ).vditor.lute.Md2VditorIRDOM(b)),
                    (this || y).vditor.ir.element
                      .querySelectorAll(".vditor-ir__preview[data-render='2']")
                      .forEach(function (y) {
                        N(y, L.vditor);
                      }),
                    Tt((this || y).vditor, {
                      enableAddUndoStack: !0,
                      enableHint: !1,
                      enableInput: !1,
                    })),
                (this || y).vditor.outline.render((this || y).vditor),
                b ||
                  (v((this || y).vditor, [
                    "emoji",
                    "headings",
                    "submenu",
                    "hint",
                  ]),
                  (this || y).vditor.wysiwyg.popover &&
                    ((this || y).vditor.wysiwyg.popover.style.display = "none"),
                  this.clearCache()),
                S && this.clearStack();
            }),
            (t.prototype.clearStack = function () {
              (this || y).vditor.undo.clearStack((this || y).vditor),
                (this || y).vditor.undo.addToUndoStack((this || y).vditor);
            }),
            (t.prototype.destroy = function () {
              ((this || y).vditor.element.innerHTML = (
                this || y
              ).vditor.originalInnerHTML),
                (this || y).vditor.element.classList.remove("vditor"),
                (this || y).vditor.element.removeAttribute("style");
              var b = document.getElementById("vditorIconScript");
              b && b.remove(),
                this.clearCache(),
                K(),
                (this || y).vditor.wysiwyg.unbindListener();
            }),
            (t.prototype.getCommentIds = function () {
              return "wysiwyg" !== (this || y).vditor.currentMode
                ? []
                : (this || y).vditor.wysiwyg.getComments(
                    (this || y).vditor,
                    !0
                  );
            }),
            (t.prototype.hlCommentIds = function (b) {
              if ("wysiwyg" === (this || y).vditor.currentMode) {
                var t = function (y) {
                  y.classList.remove("vditor-comment--hover"),
                    b.forEach(function (b) {
                      y.getAttribute("data-cmtids").indexOf(b) > -1 &&
                        y.classList.add("vditor-comment--hover");
                    });
                };
                (this || y).vditor.wysiwyg.element
                  .querySelectorAll(".vditor-comment")
                  .forEach(function (y) {
                    t(y);
                  }),
                  "none" !== (this || y).vditor.preview.element.style.display &&
                    (this || y).vditor.preview.element
                      .querySelectorAll(".vditor-comment")
                      .forEach(function (y) {
                        t(y);
                      });
              }
            }),
            (t.prototype.unHlCommentIds = function (b) {
              if ("wysiwyg" === (this || y).vditor.currentMode) {
                var t = function (y) {
                  b.forEach(function (b) {
                    y.getAttribute("data-cmtids").indexOf(b) > -1 &&
                      y.classList.remove("vditor-comment--hover");
                  });
                };
                (this || y).vditor.wysiwyg.element
                  .querySelectorAll(".vditor-comment")
                  .forEach(function (y) {
                    t(y);
                  }),
                  "none" !== (this || y).vditor.preview.element.style.display &&
                    (this || y).vditor.preview.element
                      .querySelectorAll(".vditor-comment")
                      .forEach(function (y) {
                        t(y);
                      });
              }
            }),
            (t.prototype.removeCommentIds = function (b) {
              var S = this || y;
              if ("wysiwyg" === (this || y).vditor.currentMode) {
                var n = function (y, b) {
                  var L = y.getAttribute("data-cmtids").split(" ");
                  L.find(function (y, S) {
                    if (y === b) return L.splice(S, 1), !0;
                  }),
                    0 === L.length
                      ? ((y.outerHTML = y.innerHTML),
                        (0, Kt.zh)(S.vditor).collapse(!0))
                      : y.setAttribute("data-cmtids", L.join(" "));
                };
                b.forEach(function (y) {
                  S.vditor.wysiwyg.element
                    .querySelectorAll(".vditor-comment")
                    .forEach(function (b) {
                      n(b, y);
                    }),
                    "none" !== S.vditor.preview.element.style.display &&
                      S.vditor.preview.element
                        .querySelectorAll(".vditor-comment")
                        .forEach(function (b) {
                          n(b, y);
                        });
                }),
                  Y((this || y).vditor, {
                    enableAddUndoStack: !0,
                    enableHint: !1,
                    enableInput: !1,
                  });
              }
            }),
            (t.prototype.init = function (b, S) {
              var L = this || y;
              ((this || y).vditor = {
                currentMode: S.mode,
                element: b,
                hint: new $t(S.hint.extend),
                lute: void 0,
                options: S,
                originalInnerHTML: b.innerHTML,
                outline: new rn(window.VditorI18n.outline),
                tip: new un(),
              }),
                ((this || y).vditor.sv = new cn((this || y).vditor)),
                ((this || y).vditor.undo = new or()),
                ((this || y).vditor.wysiwyg = new sr((this || y).vditor)),
                ((this || y).vditor.ir = new en((this || y).vditor)),
                ((this || y).vditor.toolbar = new rr((this || y).vditor)),
                S.resize.enable &&
                  ((this || y).vditor.resize = new dn((this || y).vditor)),
                (this || y).vditor.toolbar.elements.devtools &&
                  ((this || y).vditor.devtools = new U()),
                (S.upload.url || S.upload.handler) &&
                  ((this || y).vditor.upload = new Ue()),
                (0, B.G)(
                  S._lutePath || S.cdn + "/dist/js/lute/lute.min.js",
                  "vditorLuteScript"
                ).then(function () {
                  (L.vditor.lute = (0, tn.X)({
                    autoSpace: L.vditor.options.preview.markdown.autoSpace,
                    codeBlockPreview:
                      L.vditor.options.preview.markdown.codeBlockPreview,
                    emojiSite: L.vditor.options.hint.emojiPath,
                    emojis: L.vditor.options.hint.emoji,
                    fixTermTypo: L.vditor.options.preview.markdown.fixTermTypo,
                    footnotes: L.vditor.options.preview.markdown.footnotes,
                    headingAnchor: !1,
                    inlineMathDigit: L.vditor.options.preview.math.inlineDigit,
                    linkBase: L.vditor.options.preview.markdown.linkBase,
                    linkPrefix: L.vditor.options.preview.markdown.linkPrefix,
                    listStyle: L.vditor.options.preview.markdown.listStyle,
                    mark: L.vditor.options.preview.markdown.mark,
                    mathBlockPreview:
                      L.vditor.options.preview.markdown.mathBlockPreview,
                    paragraphBeginningSpace:
                      L.vditor.options.preview.markdown.paragraphBeginningSpace,
                    sanitize: L.vditor.options.preview.markdown.sanitize,
                    toc: L.vditor.options.preview.markdown.toc,
                  })),
                    (L.vditor.preview = new ln(L.vditor)),
                    (function (y) {
                      (y.element.innerHTML = ""),
                        y.element.classList.add("vditor"),
                        y.options.rtl && y.element.setAttribute("dir", "rtl"),
                        W(y),
                        (0, Zt.Z)(
                          y.options.preview.theme.current,
                          y.options.preview.theme.path
                        ),
                        "number" == typeof y.options.height
                          ? (y.element.style.height = y.options.height + "px")
                          : (y.element.style.height = y.options.height),
                        "number" == typeof y.options.minHeight &&
                          (y.element.style.minHeight =
                            y.options.minHeight + "px"),
                        "number" == typeof y.options.width
                          ? (y.element.style.width = y.options.width + "px")
                          : (y.element.style.width = y.options.width),
                        y.element.appendChild(y.toolbar.element);
                      var b = document.createElement("div");
                      if (
                        ((b.className = "vditor-content"),
                        "left" === y.options.outline.position &&
                          b.appendChild(y.outline.element),
                        b.appendChild(y.wysiwyg.element.parentElement),
                        b.appendChild(y.sv.element),
                        b.appendChild(y.ir.element.parentElement),
                        b.appendChild(y.preview.element),
                        y.toolbar.elements.devtools &&
                          b.appendChild(y.devtools.element),
                        "right" === y.options.outline.position &&
                          (y.outline.element.classList.add(
                            "vditor-outline--right"
                          ),
                          b.appendChild(y.outline.element)),
                        y.upload && b.appendChild(y.upload.element),
                        y.options.resize.enable &&
                          b.appendChild(y.resize.element),
                        b.appendChild(y.hint.element),
                        b.appendChild(y.tip.element),
                        y.element.appendChild(b),
                        b.addEventListener("click", function () {
                          v(y, ["subToolbar"]);
                        }),
                        y.toolbar.elements.export &&
                          y.element.insertAdjacentHTML(
                            "beforeend",
                            '<iframe id="vditorExportIframe" style="width: 100%;height: 0;border: 0"></iframe>'
                          ),
                        be(y, y.options.mode, J(y)),
                        document.execCommand(
                          "DefaultParagraphSeparator",
                          !1,
                          "p"
                        ),
                        navigator.userAgent.indexOf("iPhone") > -1 &&
                          void 0 !== window.visualViewport)
                      ) {
                        var S = !1,
                          r = function (b) {
                            S ||
                              ((S = !0),
                              requestAnimationFrame(function () {
                                S = !1;
                                var b = y.toolbar.element;
                                (b.style.transform = "none"),
                                  b.getBoundingClientRect().top < 0 &&
                                    (b.style.transform =
                                      "translate(0, " +
                                      -b.getBoundingClientRect().top +
                                      "px)");
                              }));
                          };
                        window.visualViewport.addEventListener("scroll", r),
                          window.visualViewport.addEventListener("resize", r);
                      }
                    })(L.vditor),
                    S.after && S.after(),
                    S.icon &&
                      (0, B.J)(
                        S.cdn + "/dist/js/icons/" + S.icon + ".js",
                        "vditorIconScript"
                      );
                });
            }),
            t
          );
        })(S.default);
      })(),
      L.default
    );
  })();
});
var S = b;
const L = b.Vditor;
export { L as Vditor, S as default };
