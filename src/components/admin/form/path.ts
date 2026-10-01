/** Immutable get/set on nested objects and arrays by a dotted path ("steps.0.title"). */
export type Path = (string | number)[];

export function getAt(value: unknown, path: Path): unknown {
  return path.reduce<unknown>((acc, key) => (acc == null ? undefined : (acc as Record<string | number, unknown>)[key]), value);
}

export function setAt<T>(value: T, path: Path, next: unknown): T {
  if (path.length === 0) return next as T;
  const [key, ...rest] = path;
  const current = (value ?? (typeof key === "number" ? [] : {})) as Record<string | number, unknown>;
  const child = setAt(current[key], rest, next);
  if (Array.isArray(current)) {
    const copy = [...current];
    copy[key as number] = child;
    return copy as T;
  }
  return { ...current, [key]: child } as T;
}

export const pathKey = (path: Path) => path.join(".");
