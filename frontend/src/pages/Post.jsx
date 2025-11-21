export default function Post({ post }) {
  // Helper: shorten long text
  const shorten = (text, max = 150) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  // Color-coded badges by type
  const typeColors = {
    post: "bg-blue-500",
    update: "bg-green-500",
    event: "bg-purple-500",
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      
      {/* Header Row: Type Badge + Publish Date */}
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-white text-xs px-2 py-1 rounded ${typeColors[post.type]}`}
        >
          {post.type.toUpperCase()}
        </span>

        <span className="text-gray-500 text-xs">
          {post.publishDate}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>

      {/* TYPE-SPECIFIC RENDERING */}
      {post.type === "post" && (
        <div>
          <p className="text-gray-700 mb-3">
            {shorten(post.body)}
          </p>

          {post.images?.length > 0 && (
            <img
              src={post.images[0]}
              alt="Post Thumbnail"
              className="w-32 h-32 object-cover rounded border"
            />
          )}
        </div>
      )}

      {post.type === "update" && (
        <div>
          {/* Summary */}
          <p className="text-gray-700 mb-3">
            {shorten(post.summary)}
          </p>

          {/* Changes List */}
          {post.changes?.length > 0 && (
            <ul className="list-disc list-inside text-gray-700 mb-3">
              {post.changes.slice(0, 3).map((change, i) => (
                <li key={i}>{change}</li>
              ))}
              {post.changes.length > 3 && (
                <li className="text-gray-500">…more</li>
              )}
            </ul>
          )}

          {/* Version */}
          {post.version && (
            <p className="text-sm text-gray-600 mb-3">
              Version: <span className="font-semibold">{post.version}</span>
            </p>
          )}

          {/* Images Preview */}
          {post.images?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {post.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="Update Preview"
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {post.type === "event" && (
        <div>
          <p className="text-gray-700 mb-3">
            {shorten(post.description)}
          </p>

          {/* Date Range */}
          {(post.startDate || post.endDate) && (
            <p className="text-sm text-gray-600 mb-3">
              {post.startDate} → {post.endDate}
            </p>
          )}

          {/* Reward */}
          {post.reward && (
            <p className="text-sm text-gray-700 mb-3">
              Reward: <span className="font-semibold">{post.reward}</span>
            </p>
          )}

          {/* Banner Image */}
          {post.bannerImage && (
            <img
              src={post.bannerImage}
              alt="Event Banner"
              className="w-full h-40 object-cover rounded border"
            />
          )}
        </div>
      )}
    </div>
  );
}
