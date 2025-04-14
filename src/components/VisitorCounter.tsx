import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const VisitorCounter = () => {
  const [count, setCount] = useState<number>(0);

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
    <div className="fixed bottom-8 right-8 bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-lg">
      <div className="flex flex-col">
        <span className="text-xl text-gray-300">{count.toLocaleString()}</span>
        <span className="text-sm text-gray-400">views</span>
      </div>
    </div>
  );
};

export default VisitorCounter;

