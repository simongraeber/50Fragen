import { QuizQuestionExtension } from "@/types/QuizQuestionExtension.ts";
import { QuizQuestionExtensionFactory } from "@/components/custom/QuizQuestionExtension/QuizQuestionExtensionFactory.tsx";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface QuestionExtensionDisplayProps {
  questionExtensions: QuizQuestionExtension[];
}

function QuestionExtensionDisplay({ questionExtensions }: QuestionExtensionDisplayProps) {
  const prevCountRef = useRef(questionExtensions.length);
  const isNewItemAdded = questionExtensions.length > prevCountRef.current;

  useEffect(() => {
    prevCountRef.current = questionExtensions.length;
  }, [questionExtensions.length]);

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {questionExtensions.map((ext, index) => (
          <motion.div
            key={ext.id}
            layout
            layoutId={ext.id}
            initial={index === 0 && isNewItemAdded ? { opacity: 0, y: -30 } : { opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
              layoutTransition: {
                duration: 0.4,
                ease: "easeOut"
              }
            }}
            className="w-full items-center pt-2"
          >
            <QuizQuestionExtensionFactory
              extension={ext}
              displayType={"play"}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default QuestionExtensionDisplay;