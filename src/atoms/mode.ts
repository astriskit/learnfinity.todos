import { atom } from "jotai";

export const textMode = atom<"add" | "search">("add");
