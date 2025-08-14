import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="max-w-md text-center space-y-6 p-8 rounded-2xl shadow-lg bg-base-100 border border-base-300">
        
        {/* Icon Display */}
        <div className="flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-bounce shadow-md"
          >
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-primary">
          Welcome to Chatty! 💬
        </h2>
        <p className="text-base-content/70 leading-relaxed">
          Select a conversation from the sidebar to start chatting with your friends and colleagues.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
