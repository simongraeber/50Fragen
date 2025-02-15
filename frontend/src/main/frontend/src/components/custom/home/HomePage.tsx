import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store.ts"
import DiscordLogInButton from "@/components/shared/DiscordLogInButton.tsx"

const scrollAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

function HomePage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const user = useSelector((state: RootState) => state.authentication.user)

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen
                 bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))]
                 text-[hsl(var(--foreground))] overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-indigo-400
                   dark:from-purple-700 dark:to-indigo-900 rounded-full filter blur-3xl opacity-20 animate-pulse"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-indigo-400
                   dark:from-purple-700 dark:to-indigo-900 rounded-full filter blur-3xl opacity-20 animate-pulse delay-200"
      ></div>

      {/* Hero Section */}
      <motion.section
        className="w-full py-16 px-4 text-center"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to 50Fragen
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-6">
          50Fragen is not just a quiz game—it’s an immersive experience that
          connects friends both online and in person.
        </p>
        <p className="text-lg max-w-2xl mx-auto">
          Create a Quiz, with buzzer and estimation rounds. Then, invite your friends you will be the host and they will be the players.
        </p>
      </motion.section>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {user && user.id ? (
            <>
            <span className="text-xl text-gray-700 dark:text-gray-300">
              Hey, {user.name}! Ready to play?
            </span>
              <Button
                className="m-4"
                size="lg"
                variant="outline"
                onClick={() => navigate("/quizzes")}
              >
                See Your Quizzes
              </Button>
            </>
          ) :
          <>
          <span className="text-xl text-gray-t00 dark:text-gray-300">
            Log in to start playing!
          </span>
            <DiscordLogInButton />
          </>
        }
      </motion.div>


      {/* Information Cards */}
      <motion.section
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 mb-16"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">
            1 Create a Quiz
          </CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-400">
            Build unique quiz games with personalized questions.
            You can create questions where the user needs to buzz in or
            estimate the answer where players need to guess the answer.
          </CardContent>
        </Card>
        <Card className="p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">
            2 Play with Friends
          </CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-400">
            Join your friends on Discord or get together in person—the game.
            The Start the game and share the link with your friends.
          </CardContent>
        </Card>
        <Card className="p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2 dark:text-gray-200">
            3 Real-Time Buzzing
          </CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-400">
            Experience real-time feedback and excitement as players buzz in to answer or type their estimations.
            Every second counts when the buzzer goes off! You, as the host, can easily award points to the players.
          </CardContent>
        </Card>
      </motion.section>

      {/* Interactive Demo Section */}
      <motion.section
        className="w-full max-w-4xl px-4 mb-16"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl rounded-xl">
          <CardTitle className="text-3xl font-bold mb-4">
            Buzzer it!
          </CardTitle>
          <CardContent className="flex flex-col items-center">
            <p className="mb-6 text-center">
              Experience the thrill of buzzing. Click the button below to see how it feels to be the first to answer a
              question:
            </p>
            <Round3DButton onClick={() =>
              toast({
                variant: "success",
                title: "WOW 🤩",
                description: "You are a genius!",
              })} />
          </CardContent>
        </Card>
      </motion.section>

      {/* Footer Spacer */}
      <div className="h-16">
        <Link to={"/imprint"} className="text-gray-500 dark:text-gray-400 p-4 pr-8">Imprint</Link>
        <Link to={"/privacy"} className="text-gray-500 dark:text-gray-400 p-4">Privacy</Link>
        <Link to={"/terms"} className="text-gray-500 dark:text-gray-400 p-4 pl-8">Terms</Link>
      </div>
    </div>
  )
}

export default HomePage