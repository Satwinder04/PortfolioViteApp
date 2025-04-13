import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const VisitorCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const { ref: footerRef, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const incrementCount = async () => {
      try {
        const { data: currentData, error: fetchError } = await supabase
          .from('visitor_count')
          .select('count')
          .single();

        if (fetchError) throw fetchError;

        const newCount = (currentData?.count || 0) + 1;
        
        const { error: updateError } = await supabase
          .from('visitor_count')
          .update({ count: newCount, last_updated: new Date().toISOString() })
          .eq('id', 1);

        if (updateError) throw updateError;

        setCount(newCount);
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    };

    incrementCount();

    const subscription = supabase
      .channel('visitor_count')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'visitor_count',
      }, (payload) => {
        setCount(payload.new.count);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <div ref={footerRef} className="absolute bottom-0 w-full h-screen pointer-events-none" />
      
      <AnimatePresence>
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="fixed bottom-8 right-8 bg-black text-light px-6 py-3 rounded-2xl backdrop-blur-md z-50 shadow-lg border border-gray-800/50 cursor-pointer transition-all duration-300 hover:bg-black/95 hover:border-gray-700/50"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isHovered ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="w-5 h-5 text-gray-400" />
              </motion.div>
              <div className="flex flex-col">
                <div className="h-5 overflow-hidden relative">
                  <motion.div
                    animate={{ y: isHovered ? -20 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <span className="block text-sm text-gray-400">Total Visitors</span>
                    <span className="block text-sm text-gray-400">Thanks for visiting!</span>
                  </motion.div>
                </div>
                <motion.span
                  className="text-xl font-semibold poppins-regular"
                  animate={{ scale: isHovered ? 1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {count.toLocaleString()}
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisitorCounter;



