"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import MomentStory from "@/components/MomentStory";
import type { BirthInput } from "@/lib/types";

export default function Home() {
  const [input, setInput] = useState<BirthInput | null>(null);

  return (
    <AnimatePresence mode="wait">
      {!input ? (
        <motion.div
          key="landing"
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
        >
          <LandingPage onSubmit={setInput} />
        </motion.div>
      ) : (
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <MomentStory input={input} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
