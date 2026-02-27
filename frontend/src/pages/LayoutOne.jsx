import Post from "./Post";

/**
 * Layout One:
 * - Uses the existing Post component (full card view)
 * - Mirrors the current "feed" experience
 */
export default function LayoutOne({ posts }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
        No posts yet.
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}