import React, { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="p-4 border-t border-purple-800/30 backdrop-blur-lg message-input-container relative">
      {/* Starry Background Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-indigo-900/40 to-purple-900/40 animate-gradient"></div>
        <div className="stars absolute inset-0"></div>
        <div className="twinkling absolute inset-0"></div>
      </div>

      {imagePreview && (
        <div className="relative mb-4 p-2 rounded-lg border border-cyan-500/60 bg-gradient-to-br from-gray-900/90 to-blue-900/90 shadow-neon-sm overflow-hidden group">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-xs mx-auto rounded-md object-cover image-preview-glow transition-all duration-300 group-hover:brightness-110"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-600/80 rounded-full p-1.5 text-white hover:bg-red-500/90 transition-all duration-300 transform hover:scale-110 hover:shadow-neon-md focus:outline-none focus:ring-2 focus:ring-red-500/70 z-10"
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
          <div className="absolute inset-0 image-preview-border-effect opacity-0 group-hover:opacity-100"></div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center space-x-3 relative z-10">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-full bg-gradient-to-r from-gray-900/80 via-indigo-950/80 to-purple-950/80 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/80 border border-transparent input-field-neon-glow transition-all duration-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 rounded-full bg-gradient-to-br from-green-500/80 to-blue-500/80 text-white flex items-center justify-center shadow-lg hover:shadow-neon-md transition-all duration-300 transform hover:scale-110 btn-icon-glow relative overflow-hidden"
          aria-label="Attach image"
        >
          <Image size={20} />
          <div className="btn-glow-effect absolute inset-0 opacity-0 hover:opacity-100"></div>
        </button>

        <button
          type="submit"
          className="p-3 rounded-full bg-gradient-to-br from-purple-600/80 to-pink-600/80 text-white flex items-center justify-center shadow-lg hover:shadow-neon-md transition-all duration-300 transform hover:scale-110 btn-icon-glow relative overflow-hidden"
          aria-label="Send message"
        >
          <Send size={20} />
          <div className="btn-glow-effect absolute inset-0 opacity-0 hover:opacity-100"></div>
        </button>
      </form>

      {/* Internal CSS for custom animations and effects */}
      <style jsx>{`
        .message-input-container {
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.85));
          box-shadow: 0 -5px 20px rgba(0, 255, 255, 0.2), 0 -2px 10px rgba(255, 0, 255, 0.15);
          animation: fadeInSlideUp 0.6s ease-out forwards;
        }

        /* Starry Background */
        .stars {
          background: 
            radial-gradient(0.8px 0.8px at 20px 30px, #fff, transparent),
            radial-gradient(0.6px 0.6px at 40px 50px, rgba(0, 255, 255, 0.7), transparent),
            radial-gradient(0.5px 0.5px at 60px 20px, rgba(255, 0, 255, 0.7), transparent);
          background-repeat: repeat;
          background-size: 150px 80px;
          animation: zoom 15s alternate infinite;
          z-index: 0;
        }

        .twinkling {
          background: 
            radial-gradient(0.5px 0.5px at 30px 40px, rgba(0, 255, 255, 0.8), transparent),
            radial-gradient(0.4px 0.4px at 70px 60px, rgba(255, 0, 255, 0.8), transparent);
          background-size: 200px 100px;
          animation: move-twink-back 80s linear infinite;
          z-index: 1;
        }

        @keyframes zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }

        @keyframes move-twink-back {
          from { background-position: 0 0; }
          to { background-position: -3000px 1500px; }
        }

        @keyframes animate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 10s ease infinite;
        }

        .shadow-neon-sm {
          box-shadow: 
            0 0 10px rgba(0, 255, 255, 0.5),
            0 0 15px rgba(255, 0, 255, 0.3);
        }

        .shadow-neon-md {
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.7),
            0 0 30px rgba(255, 0, 255, 0.5);
        }

        .input-field-neon-glow {
          box-shadow: 0 0 6px rgba(0, 255, 255, 0.4);
        }

        .input-field-neon-glow:focus {
          box-shadow: 
            0 0 15px rgba(0, 255, 255, 0.8),
            0 0 25px rgba(255, 0, 255, 0.6);
          border-color: rgba(0, 255, 255, 0.9);
        }

        .btn-icon-glow {
          box-shadow: 
            0 0 8px rgba(0, 255, 255, 0.4),
            0 0 15px rgba(255, 0, 255, 0.3);
        }

        .btn-icon-glow:hover {
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.9),
            0 0 30px rgba(255, 0, 255, 0.7);
          transform: scale(1.12);
        }

        .btn-glow-effect {
          background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.3), transparent);
          transition: opacity 0.3s ease;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .image-preview-glow {
          box-shadow: 0 0 12px rgba(0, 255, 255, 0.6);
        }

        .group:hover .image-preview-glow {
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.9),
            0 0 30px rgba(255, 0, 255, 0.7);
          transform: scale(1.03);
        }

        .image-preview-border-effect {
          background: linear-gradient(
            45deg,
            rgba(0, 255, 255, 0.3),
            rgba(255, 0, 255, 0.3),
            rgba(0, 255, 255, 0.3)
          );
          background-size: 300%;
          animation: rotateBorder 3s linear infinite;
          transition: opacity 0.3s ease;
        }

        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 
              0 0 10px rgba(0, 255, 255, 0.6),
              0 0 20px rgba(255, 0, 255, 0.4);
          }
          100% {
            box-shadow: 
              0 0 20px rgba(0, 255, 255, 0.9),
              0 0 35px rgba(255, 0, 255, 0.7);
          }
        }

        @keyframes rotateBorder {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default MessageInput;