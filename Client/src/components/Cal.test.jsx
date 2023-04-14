import { Calonepoint } from "./CalOnepoint"
import { calCramer } from "./Matrix/Cal_Cramer"

test("testcal_onepoint", () => {
    let cal = Calonepoint(0, "1/4+x/2");
    expect(cal.xnew).toBe(0.4999999701976776);
  })

  test("testcal_cramer", () => {
    let cal = calCramer([[2, 3, 5, 0],[3, 1, -2, -2],[1, 3, 4, -3]]);
    expect(cal.xnew).toEqual([1.5, -3.5, 1.5]);
  })