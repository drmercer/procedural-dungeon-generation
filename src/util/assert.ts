function getDevsAttention() {
  alert("Assertion failed!");
  debugger;
}

export function assertNotNull<T>(x: T): asserts x is NonNullable<T> {
  if (x == null) {
    getDevsAttention();
    throw new Error("Assertion failed! Expected value to be NonNullable");
  }
}

export function ensureNotNull<T>(x: T): NonNullable<T> {
  assertNotNull(x);
  return x;
}
