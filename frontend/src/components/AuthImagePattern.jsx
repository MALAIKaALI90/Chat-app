const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12">
      <div className="max-w-md text-center text-white">
        
        {/* Animated Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg border border-white/30 ${
                i % 2 === 0 ? "animate-pulse" : "animate-bounce"
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3 drop-shadow-lg">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-white/80 text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
