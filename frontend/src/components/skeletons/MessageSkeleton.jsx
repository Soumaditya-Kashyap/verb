import React from 'react';

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      {skeletonMessages.map((_, idx) => (
        <div 
          key={idx} 
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"} skeleton-message-container`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border-2 border-transparent neon-skeleton-border">
              {/* Avatar Skeleton */}
              <div className="skeleton w-full h-full rounded-full skeleton-glow" />
            </div>
          </div>

          <div className="chat-header mb-1">
            {/* Timestamp Skeleton */}
            <div className="skeleton h-4 w-20 skeleton-glow rounded-md" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            {/* Message Bubble Skeleton */}
            <div 
              className="skeleton h-16 w-[200px] skeleton-glow rounded-lg relative overflow-hidden" 
              style={{
                width: `${Math.floor(Math.random() * (250 - 100 + 1)) + 100}px`, // Random width for variety
                height: `${Math.floor(Math.random() * (40 - 20 + 1)) + 20}px` // Random height for variety
              }}
            >
              {/* Shimmer effect inside the bubble */}
              <div className="skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      ))}

      {/* CSS for custom styles and animations */}
      <style jsx>{`
        .skeleton-message-container {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .skeleton {
          background-color: rgba(40, 0, 40, 0.6); /* Darker base for neon */
          position: relative;
          overflow: hidden;
        }

        .skeleton-glow {
          box-shadow: 0 0 5px rgba(0, 255, 255, 0.2), 0 0 10px rgba(255, 0, 255, 0.1);
        }

        .neon-skeleton-border {
          border-color: rgba(0, 255, 255, 0.3); /* Cyan border */
          box-shadow: 0 0 8px rgba(0, 255, 255, 0.4), 0 0 12px rgba(255, 0, 255, 0.3); /* Neon glow */
        }

        .skeleton-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
          animation: shimmer 1.5s infinite linear;
        }

        /* Keyframe Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        /* Custom Scrollbar (from ChatContainer for consistency) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(0, 255, 255, 0.9), rgba(255, 0, 255, 0.9));
          border-radius: 10px;
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.4);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(0, 255, 255, 1), rgba(255, 0, 255, 1));
          box-shadow: 
            inset 0 0 8px rgba(0, 0, 0, 0.4),
            0 0 15px rgba(0, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

export default MessageSkeleton;