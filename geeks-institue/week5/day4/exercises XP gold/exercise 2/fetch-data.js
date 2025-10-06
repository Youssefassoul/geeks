import axios from "axios";

export async function fetchPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = response.data;

    posts.forEach((post) => {
      console.log(`Post ${post.id}: ${post.title}`);
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
}
