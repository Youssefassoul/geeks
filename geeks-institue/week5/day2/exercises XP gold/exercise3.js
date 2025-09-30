let resolveAfter2Seconds = function () {
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
};

let resolveAfter1Second = function () {
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
};

let concurrentStart = async function () {
  console.log("==CONCURRENT START with await==");
  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Second();
  console.log(await slow);
  console.log(await fast);
};

setTimeout(concurrentStart, 4000);

//outcome:
// After ~4s delay (from setTimeout):
// ==CONCURRENT START with await==
// starting slow promise
// starting fast promise
// ~1s later (t ≈ 5s total): fast promise is done
// ~1s later (t ≈ 6s total): slow promise is done
// Immediately after slow resolves: slow
// Immediately after logging slow (fast already resolved): fast
