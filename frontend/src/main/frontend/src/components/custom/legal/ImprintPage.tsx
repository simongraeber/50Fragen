import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import Page from "@/components/shared/Layout/Page.tsx";
import HeadLine from "@/components/shared/Layout/HeadLine.tsx";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { scrollAnimation } from "@/components/shared/Layout/scrollAnimation.ts";
import { FaUser, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import GreetingsAnimation from "@/components/custom/legal/GreetingsAnimation.tsx";

function ImprintPage() {
  const { t } = useTranslation();

  return (
    <Page>
      <HeadLine className="mt-4">{t("imprint")}</HeadLine>

      <motion.section
        className="w-full px-4 pt-6 mb-16"
        variants={scrollAnimation}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Business Card Container */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ duration: 0.3 }}
          className="relative mx-auto max-w-md p-6 md:py-12 rounded-lg shadow-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
        >
          {/* Subtle Gradient Background */}
          <div
            className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-300 to-indigo-400
                       dark:from-purple-700 dark:to-indigo-900 rounded-full filter blur-2xl opacity-20 animate-pulse-slow"
          ></div>

          {/* Layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Left Column - Logo & Animation */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-2/5">
              <img
                src="/icon.svg"
                alt="Logo"
                className="w-24 h-24 mb-2 rounded-lg object-cover"
              />
              <div className="relative overflow-visible">
                <div className="pl-2 ptransform scale-[1.35] rotate-[-6deg]">
                  <GreetingsAnimation />
                </div>
              </div>
            </div>

            {/* Right Column - Name and Contact Information */}
            <div className="flex flex-col space-y-4 md:w-3/5 pr-2">
              {/* Name */}
              <div className="flex items-center">
                <FaUser className="text-primary mr-2 text-2xl" />
                <h2 className="font-bold text-xl">Simon Graeber</h2>
              </div>
              <div className="h-0.5 w-16 bg-primary mb-2"></div>

              {/* Contact Details */}
              <div className="flex flex-col space-y-2 text-sm">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-secondary-foreground mr-2 mt-1" />
                  <div>
                    <p>Mitthenheimer Str. 6</p>
                    <p>85764 Oberschleißheim</p>
                    <p>Germany</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div>
                    <FaEnvelope className="text-secondary-foreground -mr-2 mt-1" />
                  </div>
                  <div>
                    <Button variant="link" className="mt-1" asChild>
                      <a href="mailto:80-read-crewel@icloud.com">
                        80-read-crewel@icloud.com
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Go Home Button */}
      <div className="text-center mb-8">
        <Link to="/">
          <Button>{t("go_home")}</Button>
        </Link>
      </div>
    </Page>
  );
}

export default ImprintPage;