import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";

const LikeCounter = () => {
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const { data, error } = await supabase
          .from("like_count")
          .select("count")
          .single();

        if (error) throw error;
        setLikeCount(data?.count || 0);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    // Check if user has already liked (using localStorage)
    const userHasLiked = localStorage.getItem("userHasLiked") === "true";
    setHasLiked(userHasLiked);

    fetchLikeCount();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel("like_count")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "like_count",
        },
        (payload) => {
          setLikeCount(payload.new.count);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setIsLoading(true);
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("like_count")
        .select("count")
        .single();

      if (fetchError) throw fetchError;

      const newCount = (currentData?.count || 0) + 1;

      const { error: updateError } = await supabase
        .from("like_count")
        .update({ count: newCount, last_updated: new Date().toISOString() })
        .eq("id", 1);

      if (updateError) throw updateError;

      setLikeCount(newCount);
      setHasLiked(true);
      localStorage.setItem("userHasLiked", "true");
    } catch (error) {
      console.error("Error updating like count:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-24 bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-lg">
      <div className="flex gap-2 items-center">
        <motion.button
          onClick={handleLike}
          disabled={hasLiked || isLoading}
          className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 scale-150 ${
            hasLiked
              ? "bg-transparent  text-white"
              : "bg-transparent text-gray-300 hover:text-white"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          whileHover={!hasLiked && !isLoading ? { scale: 1.1 } : {}}
          whileTap={!hasLiked && !isLoading ? { scale: 0.95 } : {}}
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={hasLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={hasLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
        </motion.button>
        <div className="flex flex-col items-center">
          <span className="text-xl text-gray-300">
            {likeCount.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400">likes</span>
        </div>
      </div>
    </div>
  );
};

export default LikeCounter;
