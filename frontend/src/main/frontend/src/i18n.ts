import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

export const availableLanguages = {
  en: "🇬🇧 English",
  de: "🇩🇪 Deutsch",
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
      close: "Close",
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
      e_question_extensions: "Extensions",
      e_check_delete_extension: "Are you sure you want to delete this extension?",
      e_q_updated: "Question updated",
      e_extension_deleted: "Extension deleted",
      // Question Extensions
      attachedImage: "Image Attachment",
      ex_showImage: "Show Image",
      ex_image: "Image",
      ex_select_ex: "Add Extension",
      ex_click_file_change: "Click to change image",
      ex_click_drag_drop: "Click to upload or drag and drop",

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
      p_link_copied: "Link Copied",
      p_invite: "Invite Friends to join the Quiz",
      p_copy_link: "Copy Link",
      p_gess_send: "Answer Sent",
      p_change_q_type: "Change Question Type",
      p_no_active_game: "The Quiz is not active‼️",

      // Login
      l_sign_in: "Sign in:",
      l_now_logged_in: "You are now logged in",
      l_now_logged_out: "You are now logged out",
      l_error: "Login error: Failed to fetch user details",
      l_error2: "Authentication error occurred",
      l_unknown: "Unknown authentication state",
      l_t_google: "Sign in with Google",
      l_t_discord: "Sign in with Discord",

      // Errors
      er_error: "Error",
      er_reload: "Reload Page",
      er_not_found: "Page not found",
      er_unauthorized: "Unauthorized",

      // Legal
      privacyPolicy: {
        title: "Privacy Policy",
        generalInformation: {
          title: "1. General Information",
          text: "This Privacy Policy explains how {{company}} ('we' or 'us') processes, stores, and protects your personal data in accordance with the EU General Data Protection Regulation (GDPR). This website is hosted in {{jurisdiction}}.",
        },
        dataController: {
          title: "2. Data Controller",
          text: "Data Controller: {{company}}\nAddress: Mitthenheimer Str. 6, 85764 Oberschleißheim, Germany\nE-Mail: 80-read-crewel@icloud.com",
        },
        dataCollection: {
          title: "3. Data Collection",
          text: "We collect the data you provide when you register, create a quiz, or participate in a quiz. For login purposes, we use an OAuth2 client that provides your unique user identifier ('sub'). Information such as your name and profile picture is processed only during the authentication process (gateway) and is not stored permanently – however, it may be visible to other participants during an active quiz session.",
        },
        purposes: {
          title: "4. Purposes of Processing",
          text: "We process your data for the following purposes:",
          list: [
            "Providing and improving our quiz services",
            "Functionally mapping quiz data to your user identifier",
            "Compliance with legal obligations",
          ],
        },
        userRights: {
          title: "5. Your Rights",
          text: "You have the right to access, rectify, or delete your personal data, to restrict processing, to data portability, and to object to the processing of your data. Please contact us at 80-read-crewel@icloud.com to exercise these rights.",
        },
        dataSecurity: {
          title: "6. Data Security",
          text: "We implement technical and organizational measures to protect your data, including SSL encryption. Our server is located in Germany.",
        },
        policyChanges: {
          title: "7. Changes to this Policy",
          text: "We reserve the right to update this Privacy Policy from time to time. The most current version will always be published on our website.",
        },
        contact: {
          title: "8. Contact",
          text: "If you have any questions regarding this Privacy Policy, please contact us at 80-read-crewel@icloud.com.",
        },
      },
    },
    termsOfService: {
      title: "Terms of Service",
      acceptance: {
        title: "1. Acceptance of Terms",
        text: "By accessing or using our services, you agree to be bound by these Terms of Service. If you do not accept these terms, please refrain from using our services.",
      },
      modifications: {
        title: "2. Modifications",
        text: "We reserve the right to modify these Terms of Service at any time. The most current version will always be published on our website.",
      },
      usage: {
        title: "3. Use of Services",
        text: "You agree to use our services solely for their intended, lawful purposes. Any misuse that disrupts operation or compromises security is prohibited.",
      },
      intellectualProperty: {
        title: "4. Intellectual Property",
        text: "All content, trademarks, and other proprietary rights on this platform are owned by {{company}} or its licensors. Unauthorized use is strictly prohibited.",
      },
      dataProtection: {
        title: "5. Data Protection",
        text: "Your data is processed in accordance with our Privacy Policy, which complies with the GDPR.",
      },
      limitation: {
        title: "6. Limitation of Liability",
        text: "Our services are provided 'as is' without any warranty. {{company}} is not liable for any direct or indirect damages arising from the use of our services.",
      },
      governingLaw: {
        title: "7. Governing Law",
        text: "These Terms of Service are governed by the laws of the Federal Republic of Germany. Jurisdiction, if applicable by law, is the location of {{company}}'s registered office.",
      },
    }
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
      close: "Schließen",
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
      e_question_extensions: "Erweiterungen",
      e_check_delete_extension: "Bist du sicher, dass du diese Erweiterung löschen möchtest",
      e_q_updated: "Frage wurde aktualisiert",
      e_extension_deleted: "Erweiterung gelöscht",
      // Question Extensions
      attachedImage: "Bild Anhang",
      ex_showImage: "Bild anzeigen",
      ex_image: "Bild",
      ex_select_ex: "Erweiterung hinzufügen",


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
      p_link_copied: "Link kopiert",
      p_invite: "Lade deine Freunde zum Quiz ein",
      p_copy_link: "Link kopieren",
      p_gess_send: "Antwort gesendet",
      p_change_q_type: "Frage-Typ ändern",
      p_no_active_game: "Das Quiz ist nicht aktiv‼️",

      // Login
      l_sign_in: "Anmelden:",
      l_now_logged_in: "Du bist jetzt angemeldet",
      l_now_logged_out: "Du bist jetzt abgemeldet",
      l_error: "Login-Fehler: Abrufen der Benutzerdaten fehlgeschlagen",
      l_error2: "Ein Authentifizierungsfehler ist aufgetreten",
      l_unknown: "Unbekannter Authentifizierungsstatus",
      l_t_google: "Mit Google anmelden",
      l_t_discord: "Mit Discord anmelden",

      // Errors
      er_error: "Fehler",
      er_reload: "Seite neu laden",
      er_not_found: "Seite nicht gefunden",
      er_unauthorized: "Nicht autorisiert",

      // Legal
      privacyPolicy: {
        title: "Datenschutzerklärung",
        generalInformation: {
          title: "1. Allgemeine Informationen",
          text: "Diese Datenschutzerklärung erklärt, wie {{company}} („wir“ oder „uns“) Ihre personenbezogenen Daten gemäß der EU-Datenschutz-Grundverordnung (DSGVO) verarbeitet, speichert und schützt. Diese Webseite wird in {{jurisdiction}} gehostet.",
        },
        dataController: {
          title: "2. Verantwortliche Stelle",
          text: "Verantwortliche Stelle: {{company}}\nAdresse: Mitthenheimer Str. 6, 85764 Oberschleißheim, Germany\nE-Mail: 80-read-crewel@icloud.com",
        },
        dataCollection: {
          title: "3. Datenerhebung",
          text: "Wir erheben die von Ihnen bereitgestellten Daten, wenn Sie sich registrieren, ein Quiz erstellen oder an einem Quiz teilnehmen. Für den Login nutzen wir einen OAuth2‑Client, der Ihre eindeutige Benutzerkennung (sub) übermittelt. Informationen wie Ihr Name und Profilbild werden ausschließlich im Rahmen des Authentifizierungsprozesses (Gateway) verarbeitet und nicht dauerhaft gespeichert – sie können jedoch während eines aktiven Quizspiels für andere Teilnehmer sichtbar sein.",
        },
        purposes: {
          title: "4. Zwecke der Verarbeitung",
          text: "Wir verarbeiten Ihre Daten zu folgenden Zwecken:",
          list: [
            "Bereitstellung und Verbesserung unserer Quiz-Dienste",
            "Funktionsbezogene Zuordnung von Quiz-Daten zu Ihrer Nutzerkennung",
            "Erfüllung gesetzlicher Verpflichtungen",
          ],
        },
        userRights: {
          title: "5. Ihre Rechte",
          text: "Sie haben das Recht auf Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten, auf Einschränkung der Verarbeitung, Datenübertragbarkeit sowie auf Widerspruch gegen die Verarbeitung. Bitte kontaktieren Sie uns unter 80-read-crewel@icloud.com, um diese Rechte auszuüben.",
        },
        dataSecurity: {
          title: "6. Datensicherheit",
          text: "Wir setzen technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen – dazu gehört unter anderem die SSL‑Verschlüsselung. Unser Server befindet sich in Deutschland.",
        },
        policyChanges: {
          title: "7. Änderungen dieser Erklärung",
          text: "Wir behalten uns vor, diese Datenschutzerklärung gelegentlich zu aktualisieren. Die jeweils aktuelle Version wird stets auf unserer Webseite veröffentlicht.",
        },
        contact: {
          title: "8. Kontakt",
          text: "Für Fragen zum Datenschutz kontaktieren Sie uns bitte unter 80-read-crewel@icloud.com.",
        },
      },
      termsOfService: {
        title: "Nutzungsbedingungen",
        acceptance: {
          title: "1. Zustimmung zu den Bedingungen",
          text: "Durch den Zugriff auf oder die Nutzung unserer Dienste erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Sollten Sie nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.",
        },
        modifications: {
          title: "2. Änderungen",
          text: "Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Die aktuell gültige Version wird stets auf unserer Webseite veröffentlicht.",
        },
        usage: {
          title: "3. Nutzung der Dienste",
          text: "Sie verpflichten sich, unsere Dienste ausschließlich im vorgesehenen und rechtmäßigen Rahmen zu nutzen. Jegliche missbräuchliche Verwendung, die den Betrieb oder die Sicherheit beeinträchtigen könnte, ist untersagt.",
        },
        intellectualProperty: {
          title: "4. Geistiges Eigentum",
          text: "Alle Inhalte, Marken und sonstigen Urheberrechte auf dieser Plattform sind Eigentum von {{company}} oder unserer Lizenzgeber. Eine unerlaubte Nutzung ist strengstens untersagt.",
        },
        dataProtection: {
          title: "5. Datenschutz",
          text: "Die Verarbeitung Ihrer Daten erfolgt gemäß unserer Datenschutzerklärung, die den Anforderungen der DSGVO entspricht.",
        },
        limitation: {
          title: "6. Haftungsbeschränkung",
          text: "Unsere Dienste werden 'wie besehen' bereitgestellt – ohne Gewährleistung. {{company}} haftet nicht für direkte oder indirekte Schäden, die aus der Nutzung entstehen.",
        },
        governingLaw: {
          title: "7. Anwendbares Recht",
          text: "Diese Bedingungen unterliegen dem Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz von {{company}}.",
        },
      },
    },
  },
}

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
  })