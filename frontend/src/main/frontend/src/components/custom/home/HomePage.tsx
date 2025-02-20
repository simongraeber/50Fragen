import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Round3DButton from "@/components/custom/quiz_play/BuzzerButton"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store.ts"
import DiscordLogInButton from "@/components/shared/DiscordLogInButton.tsx"
import { scrollAnimation } from "@/components/shared/Layout/scrollAnimation.ts"
import HeadLine from "@/components/shared/Layout/HeadLine.tsx"
import Page from "@/components/shared/Layout/Page.tsx"
import { useTranslation } from "react-i18next";

function HomePage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.authentication.user)

  return (
    <Page>
      {/* Decorative Background Elements */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-indigo-400
                   dark:from-purple-700 dark:to-indigo-900 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-indigo-400
                   dark:from-purple-700 dark:to-indigo-900 rounded-full filter blur-3xl opacity-20 animate-pulse-slow delay-200"
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
          {t("h_welcome")}
        </h1>
        <p className="text-xl max-w-3xl mx-auto mb-6">
          {t("h_sub1")}
        </p>
        <p className="text-lg max-w-2xl mx-auto">
          {t("h_sub2")}
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
              Hey, {user.name}! {t("h_ready")}
            </span>
              <Button
                className="m-4"
                size="lg"
                variant="outline"
                onClick={() => navigate("/quizzes")}
              >
                {t("h_see")}
              </Button>
            </>
          ) :
          <>
          <span className="text-xl text-gray-t00 dark:text-gray-300">
            {t("h_login")}
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
          <CardTitle>
            <HeadLine
              disableDefaultSize={true}
              className="text-3xl lg:text-2xl !text-left">
              1 {t("h_create")}
            </HeadLine>
          </CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-400">
            {t("h_create_t")}
          </CardContent>
        </Card>
        <Card className="p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardTitle>
            <HeadLine
              disableDefaultSize={true}
              className="text-3xl lg:text-2xl !text-left">
              2 {t("h_play")}
            </HeadLine>
          </CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-400">
            {t("h_play_t")}
          </CardContent>
        </Card>
        <Card className="p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <CardTitle>
            <HeadLine
              disableDefaultSize={true}
              className="text-3xl lg:text-2xl !text-left">
              3 {t("h_real")}
            </HeadLine>
          </CardTitle>
          <CardContent className="text-gray-600 dark:text-gray-400">
            {t("h_real_t")}
          </CardContent>
        </Card>
      </motion.section>

      {/* Interactive Demo Section */}
      <motion.section
        className="w-full max-w-4xl px-4 mb-16"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Card className="p-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl rounded-xl">
          <CardTitle className="text-3xl font-bold mb-4">
            {t("h_buzz")}
          </CardTitle>
          <CardContent className="flex flex-col items-center">
            <p className="mb-6 text-center">
              {t("h_buzz_t")}
            </p>
            <Round3DButton onClick={() =>
              toast({
                variant: "success",
                title: "WOW 🤩",
                description: t("h_genius"),
              })} />
          </CardContent>
        </Card>
      </motion.section>

      {/* Footer Spacer */}
      <div className="h-16 z-0">
        <Link to={"/imprint"} className="text-gray-500 dark:text-gray-400 p-4 pr-8">
          {t("imprint")}
        </Link>
        <Link to={"/privacy"} className="text-gray-500 dark:text-gray-400 p-4">
          {t("privacy")}
        </Link>
        <Link to={"/terms"} className="text-gray-500 dark:text-gray-400 p-4 pl-8">
          {t("terms")}
        </Link>
      </div>
    </Page>
  )
}

export default HomePage