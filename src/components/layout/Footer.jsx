
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc, increment, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const trackVisitor = async () => {
      try {
        const visitorKey = 'echoes_independence_visitor';

        const alreadyVisited = localStorage.getItem(visitorKey);

        const visitorRef = doc(db, 'websiteStats', 'visitors');

        if (!alreadyVisited) {
          await setDoc(
            visitorRef,
            {
              totalVisits: increment(1),
            },
            { merge: true }
          );

          localStorage.setItem(visitorKey, 'true');
        }

        const snapshot = await getDoc(visitorRef);

        if (snapshot.exists() && isMounted) {
          setVisitorCount(snapshot.data().totalVisits || 0);
        }
      } catch (error) {
        console.error('Visitor counter error:', error);
      }
    };

    trackVisitor();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="px-4 pb-6">
      <motion.div
        className="glass mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-3xl px-6 py-6 sm:flex-row sm:justify-between sm:gap-8 md:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <motion.img
            src="/images/logo.png"
            alt="Echoes of Independence: The Story of Pakistan"
            className="h-14 w-auto object-contain drop-shadow-[0_0_18px_rgba(29,185,84,0.35)] sm:h-16"
            whileHover={{
              scale: 1.04,
              filter: 'brightness(1.08)',
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 18,
            }}
          />

          <div className="text-center sm:text-left">
            <p className="font-semibold text-pk-mint">
              Echoes of Independence
            </p>

            <p className="text-xs text-pk-mist/70">
              The Story of Pakistan
            </p>
          </div>
        </div>

        {/* Credit */}
        <motion.p
          className="text-center text-sm text-pk-mist sm:text-right"
          whileHover={{ color: '#f4f7f2' }}
        >
          Built with pride for Pakistan{' '}
          <span className="text-red-400" aria-hidden>
            ❤️
          </span>{' '}
          by{' '}
          <span className="text-pk-mint transition-colors">
            Arsalan Sher
          </span>
        </motion.p>

        {/* Visitor Counter */}
        <motion.div
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-pk-mist/80 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{
            scale: 1.03,
            borderColor: 'rgba(29,185,84,0.25)',
          }}
        >
          <span
            className="h-2 w-2 rounded-full bg-pk-mint shadow-[0_0_10px_rgba(29,185,84,0.8)]"
            aria-hidden
          />

          <span>
            {visitorCount === null
              ? 'Counting visitors...'
              : `${visitorCount.toLocaleString()} people have visited`}
          </span>
        </motion.div>
      </motion.div>

      <p className="mx-auto mt-5 max-w-6xl text-center text-[11px] text-pk-mist/60">
        Historical content curated for educational storytelling. ©{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}