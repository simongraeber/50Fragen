import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const availableLanguages = {
  en: "🇬🇧 English",
  de: "🇩🇪 Deutsch"
}

const resources = {
  en: {
    translation: {
      displayed_language: "English",

      imprint: "Imprint",
      privacy: "Privacy",
      terms: "Terms",
      terms_h: "Terms Of Service",
      question: "Question",
      answer: "Answer",
      type: "Type",
      q_type: "Question Type",
      buzzerquestion: "Buzzer Question",
      estimationquestion: "Estimation Question",
      delete: "Delete",
      save: "Save",
      actions: "Actions",
      previous: "Previous",
      next: "Next",
      start: "Start",
      edit: "Edit",
      score: "Score",
      user: "User",
      correct: "Correct",
      submit: "Submit",
      go_home: "Go back to Home Page",

      // Home Page
      h_welcome: "Welcome to 50Fragen",
      h_sub1: "50Fragen is not just a quiz game—it’s an immersive experience that connects friends both online and in person.",
      h_sub2: "Create a Quiz, with buzzer and estimation rounds. Then, invite your friends you will be the host and they will be the players.",
      h_ready: "Ready to play?",
      h_see: "See Your Quizzes",
      h_login: "Log in to start playing!",
      h_create: "Create a Quiz",
      h_create_t: "Build unique quiz games with personalized questions. You can create questions where the user needs to buzz in or estimate the answer where players need to guess the answer.",
      h_play: "Play with Friends",
      h_play_t: "Join your friends on Discord or get together in person—the game. The Start the game and share the link with your friends.",
      h_real: "Real-Time Buzzing",
      h_real_t: "Experience real-time feedback and excitement as players buzz in to answer or type their estimations. Every second counts when the buzzer goes off! You, as the host, can easily award points to the players.",
      h_buzz: "Buzzer it!",
      h_buzz_t: "Experience the thrill of buzzing. Click the button below to see how it feels to be the first to answer a question:",
      h_genius: "You are a genius!",

      // Edit Page
      e_order_updated: "Question order updated",
      e_q_name_updated: "Quiz name updated",
      e_q_name_updated_to: "Quiz name updated to: ",
      e_new_q: "New question",
      e_new_answer: "New answer",
      e_back: "Back to Quiz List",
      e_q_name: "Quiz Name",
      e_add_q: "Add Question",
      e_e_q: "Edit Question",
      e_check_delete: "Are you sure you want to delete this question?",
      e_update_t: "Update the question text, answer, and type below. Click save when you’re done.",
      e_gen_q: "Generate Question",
      e_ai_q: "AI Question",
      e_ai_q_t: "Let Chat generate a Question for you.",
      e_category: "Category",
      e_ai_disclaimer: "Chat can make mistakes. Please review the question before saving.",
      e_error_adding_q: "Error adding question",

      // Overview
      o_your_q: "Your Quizzes",
      o_new_q: "New Quiz",
      o_edit_q: "Edit Quiz",
      o_start_q: "Start Quiz",
      o_no_q_found: "No Quizzes found.",
      o_last_mod: "Last Modified",
      o_name: "Name",
      o_filter_by_name: "Filter by name...",

      // Play Page
      p_buzzed: "buzzed in!",
      p_show_answer: "Show Answers",
      p_give_p: "Give Points",
      p_show_q: "Show Question",
      p_q_not_found: "Quiz not found.",
      p_q_has_no_q: "⚠️ This quiz has no questions yet.",
      p_add_q: "Add a question",
      p_what_gess: "What is your guess?",
      p_what_gess_placeholder: "Enter your answer here",

      // Login
      l_sign_discord: "Sign in with Discord",
      l_now_logged_in: "You are now logged in",
      l_now_logged_out: "You are now logged out",
      l_error: "Login error: Failed to fetch user details",
      l_error2: "Authentication error occurred",
      l_unknown: "Unknown authentication state",

      // Errors
      er_error: "Error",
      er_reload: "Reload Page",
      er_not_found: "Page not found",
      er_unauthorized: "Unauthorized"
    },
  },
  de: {
    translation: {
      displayed_language: "Deutsch",

      imprint: "Impressum",
      privacy: "Datenschutz",
      terms: "AGB",
      terms_h: "Nutzungsbedingungen",
      question: "Frage",
      answer: "Antwort",
      type: "Typ",
      q_type: "Fragentyp",
      buzzerquestion: "Buzzer-Frage",
      estimationquestion: "Schätzfrage",
      delete: "Löschen",
      save: "Speichern",
      actions: "Aktionen",
      previous: "Zurück",
      next: "Weiter",
      start: "Start",
      edit: "Bearbeiten",
      score: "Punkte",
      user: "Benutzer",
      correct: "Richtig",
      submit: "Absenden",
      go_home: "Zurück zur Start Seite",

      // Home Page
      h_welcome: "Willkommen bei 50Fragen",
      h_sub1: "50Fragen ist nicht einfach nur ein Quiz – es ist ein spannendes Erlebnis, das Freunde online und vor Ort zusammenbringt.",
      h_sub2: "Erstelle ein Quiz mit Buzzer- und Schätzrunden. Lade danach deine Freunde ein – du bist der Gastgeber und sie die Spieler.",
      h_ready: "Bereit zum Spielen?",
      h_see: "Deine Quizze ansehen",
      h_login: "Melde dich an, um loszulegen!",
      h_create: "Quiz erstellen",
      h_create_t: "Baue einzigartige Quiz-Spiele mit deinen eigenen Fragen. Du kannst Fragen gestalten, bei denen die Teilnehmer buzzern oder schätzen müssen.",
      h_play: "Mit Freunden spielen",
      h_play_t: "Schließ dich mit deinen Freunden auf Discord an oder trefft euch persönlich – der Spaß wartet. Starte das Spiel und teile den Link mit deinen Freunden.",
      h_real: "Echtzeit-Buzzing",
      h_real_t: "Erlebe in Echtzeit, wie die Spannung steigt, wenn Spieler buzzern oder ihre Schätzungen eingeben. Jede Sekunde zählt, wenn der Buzzer losgeht! Als Gastgeber kannst du den Spielern ganz einfach Punkte geben.",
      h_buzz: "Drück den Buzzer!",
      h_buzz_t: "Spür den Nervenkitzel! Klick unten, um herauszufinden, wie es sich anfühlt, als Erster eine Frage zu beantworten:",
      h_genius: "Du bist ein Genie!",

      // Edit Page
      e_order_updated: "Fragenreihenfolge aktualisiert",
      e_q_name_updated: "Quizname aktualisiert",
      e_q_name_updated_to: "Quizname geändert in: ",
      e_new_q: "Neue Frage",
      e_new_answer: "Neue Antwort",
      e_back: "Zurück zur Quiz-Liste",
      e_q_name: "Quizname",
      e_add_q: "Frage hinzufügen",
      e_e_q: "Frage bearbeiten",
      e_check_delete: "Bist du sicher, dass du diese Frage löschen möchtest?",
      e_update_t: "Aktualisiere unten die Frage, Antwort und den Typ. Klick auf 'Speichern', wenn du fertig bist.",
      e_gen_q: "Frage generieren",
      e_ai_q: "KI Frage",
      e_ai_q_t: "Lass Chat eine Frage für dich generieren.",
      e_category: "Kategorie",
      e_ai_disclaimer: "Chat kann Fehler machen. Bitte überprüfe die Frage, bevor du sie speicherst.",
      e_error_adding_q: "Fehler beim Hinzufügen der Frage",

      // Overview
      o_your_q: "Deine Quizze",
      o_new_q: "Neues Quiz",
      o_edit_q: "Quiz bearbeiten",
      o_start_q: "Quiz starten",
      o_no_q_found: "Keine Quizze gefunden.",
      o_last_mod: "Zuletzt geändert",
      o_name: "Name",
      o_filter_by_name: "Suchen ...",

      // Play Page
      p_buzzed: "hat gebuzzert!",
      p_show_answer: "Antworten anzeigen",
      p_give_p: "Punkte vergeben",
      p_show_q: "Frage anzeigen",
      p_q_not_found: "Quiz nicht gefunden.",
      p_q_has_no_q: "⚠️ Dieses Quiz enthält bisher keine Fragen.",
      p_add_q: "Frage hinzufügen",
      p_what_gess: "Was schätzt du?",
      p_what_gess_placeholder: "Gib hier deine Antwort ein",

      // Login
      l_sign_discord: "Mit Discord anmelden",
      l_now_logged_in: "Du bist jetzt angemeldet",
      l_now_logged_out: "Du bist jetzt abgemeldet",
      l_error: "Login-Fehler: Abrufen der Benutzerdaten fehlgeschlagen",
      l_error2: "Ein Authentifizierungsfehler ist aufgetreten",
      l_unknown: "Unbekannter Authentifizierungsstatus",

      // Errors
      er_error: "Fehler",
      er_reload: "Seite neu laden",
      er_not_found: "Seite nicht gefunden",
      er_unauthorized: "Nicht autorisiert"
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["navigator", "htmlTag", "path", "subdomain"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;