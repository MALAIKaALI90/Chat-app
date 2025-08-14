import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="flex items-center justify-center pt-12 px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 w-full max-w-6xl h-[calc(100vh-6rem)]">
          {/* App Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl shadow-md">
            <h1 className="text-2xl font-bold text-white tracking-wide">💬 My Chat App</h1>
          </div>

          {/* Main Chat Layout */}
          <div className="flex h-[calc(100%-4rem)] rounded-b-2xl overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 bg-gray-50 border-r border-gray-200">
              <Sidebar />
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-gray-100">
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
