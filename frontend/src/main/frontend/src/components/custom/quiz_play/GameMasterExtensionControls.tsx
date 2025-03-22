import { QuizQuestionExtension } from "@/types/QuizQuestionExtension.ts";
import { Card } from "@/components/ui/card.tsx";
import { QuizQuestionExtensionFactory } from "@/components/custom/QuizQuestionExtension/QuizQuestionExtensionFactory.tsx";
import { motion, AnimatePresence } from "framer-motion";

interface GameMasterExtensionControlsControlsProps {
  questionExtensions: QuizQuestionExtension[];
  quizId: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function GameMasterExtensionControls({
                                       questionExtensions,
                                       quizId,
                                     }: GameMasterExtensionControlsControlsProps) {
  // Create a unique key that forces remounting when the array changes.
  const containerKey = `container-${questionExtensions.length}-${questionExtensions
    .map((ext) => ext.id)
    .join("-")}`;

  return (
    <motion.div
      key={containerKey}
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {questionExtensions.map((ext, index) => (
          <motion.div
            className="w-full"
            key={ext.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={index > 0 ? { zIndex: 10 } : {}}
          >
            <Card className="w-full p-4 items-center">
              <QuizQuestionExtensionFactory
                extension={ext}
                displayType={"gameMaster"}
                quizId={quizId}
              />
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default GameMasterExtensionControls;