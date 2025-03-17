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
      <HeadLine>{t("imprint")}</HeadLine>

      <motion.section
        className="w-full px-4 mb-16"
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
          className="relative mx-auto max-w-2xl p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900"
        >
          {/* Subtle Gradient Background */}
          <div
            className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-300 to-indigo-400
                       dark:from-purple-700 dark:to-indigo-900 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
          ></div>

          {/* Layout */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Left Column - Centered Logo */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-3/5">
              {/* Larger square logo */}
              <img
                src="/icon.svg"
                alt="Logo"
                className="w-32 h-32 mb-4 rounded-lg object-cover"
              />
              <GreetingsAnimation />
            </div>

            {/* Right Column - Name and Contact Information */}
            <div className="flex flex-col space-y-4 w-2/5 pr-3">
              {/* Name aligned to the left */}
              <div className="flex items-center">
                <FaUser className="text-primary mr-2 text-3xl" />
                <h2 className="font-bold text-2xl">Simon Graeber</h2>
              </div>
              <div className="h-1 w-20 bg-primary mb-4"></div>

              {/* Contact Details */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-600 mr-2 mt-1 min-w-[16px]" />
                  <div>
                    <p>Mitthenheimer Str. 6</p>
                    <p>85764 Oberschleißheim</p>
                    <p>Germany</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-600 mr-2 min-w-[16px]" />
                  <p>80-read-crewel@icloud.com</p>
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