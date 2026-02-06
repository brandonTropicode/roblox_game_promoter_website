export default function Post({ post }) {
    const typeColors = {
        post: "bg-blue-500",
        update: "bg-green-500",
        event: "bg-purple-500",
    };

    const shorten = (text,max = 150) => {
        if (! text) return""
        return text.length > max ? text.substring(0,max) + "..." : text
    }
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
		</div>
	)
}