const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 ${
            idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>

          {/* Message Content */}
          <div className="flex flex-col gap-2 max-w-[70%]">
            {/* Username */}
            <div className="h-3 w-20 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>

            {/* Chat Bubble */}
            <div
              className={`rounded-2xl px-4 py-3 ${
                idx % 2 === 0 ? "bg-gray-100" : "bg-blue-100"
              }`}
            >
              <div className="h-4 w-40 mb-2 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
              <div className="h-4 w-28 rounded bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
