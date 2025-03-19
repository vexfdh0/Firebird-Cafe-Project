import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Extended to 5 seconds for a more immersive experience

    // Animation phase transitions
    const phaseTimers = [
      setTimeout(() => setAnimationPhase(1), 1000),
      setTimeout(() => setAnimationPhase(2), 2000),
      setTimeout(() => setAnimationPhase(3), 3000),
      setTimeout(() => setAnimationPhase(4), 4000),
    ];

    return () => {
      clearTimeout(timer);
      phaseTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Background animated elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-600 filter blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-yellow-800 filter blur-xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute top-1/2 left-1/3 w-60 h-60 rounded-full bg-stone-600 filter blur-xl"
        />
      </div>

      <div className="text-center z-10 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          {/* Glowing effect around logo */}
          <div className="absolute inset-0 rounded-full bg-yellow-600 opacity-30 filter blur-xl scale-110"></div>

          <img
            src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=coffee&backgroundColor=f59e0b"
            alt="Firebird Cafe"
            className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-yellow-600 shadow-2xl relative z-10 bg-yellow-50 p-2"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-4xl font-bold text-yellow-400 mb-3 tracking-wide"
        >
          Firebird Café
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="text-stone-300 mb-6 text-lg"
        >
          Jack E. Singley Academy
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.4, duration: 2 }}
          className="h-1 bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-800 rounded-full w-64 mx-auto"
        />

        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.7 }}
        >
          <p className="text-stone-300 text-sm italic">
            "{animationPhase >= 1 ? "Where culinary excellence" : ""}"
          </p>
          <p className="text-stone-300 text-sm italic">
            "{animationPhase >= 2 ? "meets academic achievement" : ""}"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.7 }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="text-stone-400 text-sm mb-3">
            Premium dining experience
          </p>

          {/* Animated loading indicator */}
          <div className="flex space-x-2 mt-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
              className="w-2 h-2 bg-yellow-600 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="w-2 h-2 bg-yellow-600 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="w-2 h-2 bg-yellow-600 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
