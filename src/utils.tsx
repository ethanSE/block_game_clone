import { Color } from "three";

export const heightColor = (n: number) => {
    const c1 = new Color(0xffc371);
    const c2 = new Color(0xff5f6d);
    return c1.lerp(c2, n / 4);
}