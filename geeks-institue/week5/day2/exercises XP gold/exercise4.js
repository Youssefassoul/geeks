const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  // Intentionally broken endpoint to test error handling (404 -> triggers catch)
  "https://jsonplaceholder.typicode.com/albummm",
];

const getData = async function () {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async (url) => {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`Request failed: ${resp.status}`);
        }
        return await resp.json();
      })
    );
    console.log("users", users);
    console.log("posts", posts);
    console.log("albums", albums);
  } catch (error) {
    console.log("ooooooops");
  }
};

getData();
