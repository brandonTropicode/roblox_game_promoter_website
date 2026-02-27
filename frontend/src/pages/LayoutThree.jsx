/**
 * Layout Three:
 * - Minimal "contacts-style" table
 * - Shows Edit/Delete buttons ONLY in this layout (no functionality yet)
 * - No row click behavior
 */

export default function LayoutThree({ posts }) {
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

  const getMediaLabel = (post) => {
    if (post.type === "event" && post.bannerImage) return "banner";
    if (Array.isArray(post.images) && post.images.length > 0)
      return `${post.images.length} img`;
    return "—";
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Publish Date</th>
              <th className="px-4 py-3 font-semibold">Media</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                {/* Type */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center text-white text-xs px-2 py-1 rounded ${
                      typeColors[post.type] || "bg-gray-500"
                    }`}
                  >
                    {post.type?.toUpperCase()}
                  </span>
                </td>

                {/* Title */}
                <td className="px-4 py-3 text-gray-900 font-medium max-w-[420px] truncate">
                  {post.title}
                </td>

                {/* Publish Date */}
                <td className="px-4 py-3 text-gray-600">{post.publishDate}</td>

                {/* Media */}
                <td className="px-4 py-3 text-gray-600">{getMediaLabel(post)}</td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => console.log("Edit post:", post.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 transition"
                      onClick={() => console.log("Delete post:", post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}