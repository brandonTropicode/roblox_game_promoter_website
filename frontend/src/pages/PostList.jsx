import Post from "./Post";

export default function PostList({ posts }) {
  // Sort posts by publish date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  // Empty state
  if (sortedPosts.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 text-lg font-semibold">
        Your posts will show here
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {sortedPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
