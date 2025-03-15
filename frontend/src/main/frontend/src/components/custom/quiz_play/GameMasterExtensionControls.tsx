import { QuizQuestionExtension } from "@/types/QuizQuestionExtension.ts"
import { Card } from "@/components/ui/card.tsx"
import {
  QuizQuestionExtensionFactory,
} from "@/components/custom/QuizQuestionExtension/QuizQuestionExtensionFactory.tsx"
import { motion } from "framer-motion"

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
}

const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

function GameMasterExtensionControls({ questionExtensions, quizId }: GameMasterExtensionControlsControlsProps) {
  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {questionExtensions.map((ext) => (
        <motion.div
          className="w-full"
          key={ext.id}
          variants={cardVariants}
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
    </motion.div>
  )
}

export default GameMasterExtensionControls