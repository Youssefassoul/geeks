// Global variable 'a', starts at 0
let a = 0;

// ------------------------------
// funcOne
// Inside this function, we make a NEW 'a' (not the global one).
// First it’s 5, then we change it to 3 because it's bigger than 1.
// So when we alert, it shows 3.
function funcOne() {
  let a = 5;
  if (a > 1) {
    a = 3;
  }
  alert(`inside the funcOne function ${a}`); // 3
}

// ------------------------------
// funcTwo
// Here we don’t use "let", so this changes the GLOBAL 'a'.
// After this function runs, global 'a' will be 5.
function funcTwo() {
  a = 5;
}

// ------------------------------
// funcThree
// This just shows the GLOBAL 'a'.
// If funcTwo() was never called → still 0.
// If funcTwo() was called → now 5.
function funcThree() {
  alert(`inside the funcThree function ${a}`); // 0 or 5
}

// ------------------------------
// funcFour
// This sets window.a = "hello".
// Important: the global 'let a' and window.a are NOT the same thing.
// So now we have two different 'a':
//   - the script one (0 or 5)
//   - the window one ("hello")
function funcFour() {
  window.a = "hello";
}

// ------------------------------
// funcFive
// This looks at the GLOBAL 'a' (the let a).
// It does NOT use window.a.
// So it will show 0 (if funcTwo never ran) or 5 (if funcTwo ran).
function funcFive() {
  alert(`inside the funcFive function ${a}`); // 0 or 5
}

// ------------------------------
// funcSix
// Inside this function we create a brand-new 'a' with value "test".
// It hides all other versions of 'a'.
// So it will always show "test".
function funcSix() {
  let a = "test";
  alert(`inside the funcSix function ${a}`); // "test"
}

// ------------------------------
// if block
// Inside the block → we make a new 'a' = 5 → shows 5.
// Outside the block → we go back to the global 'a'.
// Global 'a' is 0 unless funcTwo ran (then it's 5).
if (true) {
  let a = 5;
  alert(`in the if block ${a}`); // 5
}
alert(`outside of the if block ${a}`); // 0 or 5
