import { createSlug, digitsFaToEn } from "@persian-tools/persian-tools";

export function generateBaseSlug(title) {
  if (!title || typeof title !== "string") return "";

  let normalized = title.trim().replace(/\s+/g, " ");
  normalized = digitsFaToEn(normalized);

  return createSlug(normalized);
}
