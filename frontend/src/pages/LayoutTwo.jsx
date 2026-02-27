/**
 * Layout Two:
 * - Instagram-style 3-column grid
 * - Square tiles
 * - Title always visible (bottom overlay)
 * - Type badge overlay (top-left)
 * - No click behavior
 */

export default function LayoutTwo({ posts }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-6 text-center text-gray-500">
        No posts yet.
      </div>
    );
  }

  const typeColors = {
    post: "bg-blue-500",
    update: "bg-green-500",
    event: "bg-purple-500",
  };

  const getPreviewImage = (post) => {
    if (post.type === "event" && post.bannerImage) {
      return post.bannerImage;
    }

    if (post.images?.length > 0) {
      return post.images[0];
    }

    return null;
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => {
        const previewImage = getPreviewImage(post);

        return (
          <div
            key={post.id}
            className="relative w-full aspect-square rounded-lg overflow-hidden shadow-sm border bg-gray-100"
          >
            {/* Image or Placeholder */}
            {previewImage ? (
              <img
                src={previewImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Image
              </div>
            )}

            {/* Type Badge (Top Left) */}
            <span
              className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                typeColors[post.type] || "bg-gray-500"
              }`}
            >
              {post.type?.toUpperCase()}
            </span>

            {/* Title Overlay (Bottom, Always Visible) */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-3 py-2 truncate">
              {post.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}