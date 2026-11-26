import { createCn } from "cn/engine";
import tables from "./cn-tables";

export type { ClassValue } from "cn/engine";

// eslint-disable-next-line unicorn/no-top-level-side-effects -- Pure initialization of the compiled Tailwind class-merge engine from generated tables.
export const cn = createCn(tables);
