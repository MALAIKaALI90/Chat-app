import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-base-200 rounded-2xl shadow-lg p-6 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mt-1 text-sm text-base-content/70">
              Manage your personal information
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImg ||
                  authUser.profilePic ||
                  "https://i.pravatar.cc/300" // Placeholder image link
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-base-300 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-1 right-1 bg-primary text-primary-content p-2 rounded-full cursor-pointer shadow-md hover:scale-105 transition-transform ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
                <User className="w-4 h-4" /> Full Name
              </label>
              <p className="px-4 py-2 bg-base-100 rounded-lg border border-base-300 shadow-sm">
                {authUser?.fullName}
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <p className="px-4 py-2 bg-base-100 rounded-lg border border-base-300 shadow-sm">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Account Information</h2>
            <div className="rounded-lg border border-base-300 bg-base-100 divide-y divide-base-300">
              <div className="flex items-center justify-between px-4 py-2 text-sm">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2 text-sm">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
