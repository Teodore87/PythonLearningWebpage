/**
 * PyLearn - Internationalization (i18n) System
 * 
 * Hanterar översättningar mellan svenska och engelska för UI-strängar.
 * Lektionsinnehållet förblir på svenska — bara gränssnittets knappar,
 * etiketter och feedback-meddelanden översätts.
 * 
 * Språkval sparas i localStorage.
 */

const translations = {
    sv: {
        // Sidebar & Navigation
        'nav.totalProgress': 'Total framsteg',
        'nav.section': 'Sektion',
        'nav.sectionTest': '🎯 Sektionsprov',
        'nav.resources': '📚 Resurser',
        'nav.logout': '🚪 Logga ut',

        // Home
        'home.title': '🐍 PyLearn',
        'home.subtitle': 'Python-programmering för dig. Tydligt, interaktivt och skräddarsytt.',
        'home.description': 'Den här plattformen är byggd med fokus på enkelhet. Kursen är uppdelad i 15 sektioner. För att gå vidare från en sektion måste du klara ett prov med minst 90% rätt.',
        'home.startBtn': 'Starta Resan →',

        // Lesson navigation
        'lesson.prev': '← Föregående',
        'lesson.next': 'Nästa Lektion →',
        'lesson.finishAndTest': 'Markera klar & Gå till Prov →',

        // Exercises
        'exercise.label': 'ÖVNING',
        'exercise.correct': '🟢 Rätt!',
        'exercise.wrong': '🔴 Fel.',
        'exercise.tryAgain': 'Försök igen.',
        'exercise.goodJob': 'Bra jobbat.',
        'exercise.checkCode': '▶ Kontrollera kod',
        'exercise.writeCode': 'Du måste skriva lite kod först!',
        'exercise.missing': 'Du verkar sakna:',
        'exercise.goodCode': 'Bra kodat!',

        // Debug exercise
        'debug.label': 'FELSÖKNING',
        'debug.fixPrompt': 'Vilket är det rätta sättet att fixa koden?',
        'debug.bugFixed': '🟢 Bug Fixad!',
        'debug.stillWrong': '🔴 Fortfarande Fel.',

        // Drag & drop
        'dragdrop.dragThese': 'Dra dessa termer:',
        'dragdrop.allCorrect': '🟢 Helt rätt!',

        // Section test
        'test.title': 'Sektionsprov:',
        'test.intro': 'Visa vad du har lärt dig! Du måste svara rätt på minst <strong>90%</strong> av frågorna för att låsa upp nästa sektion.',
        'test.questionCount': 'Antal frågor:',
        'test.passingGrade': 'Krav för godkänt:',
        'test.minCorrect': 'Minst',
        'test.right': 'rätt',
        'test.retryInfo': 'Du kan göra provet hur många gånger du vill.',
        'test.startBtn': 'Starta Provet Nu',
        'test.questionOf': 'av',
        'test.prevQuestion': '← Föregående',
        'test.nextQuestion': 'Nästa fråga →',
        'test.submit': 'Lämna in prov',
        'test.passed': 'Provet avklarat!',
        'test.almostThere': 'Nästan där!',
        'test.score': 'Du fick',
        'test.of': 'av',
        'test.yourAnswers': 'Dina svar:',
        'test.yourAnswer': 'Ditt svar',
        'test.correctAnswerLabel': 'Rätt svar',
        'test.correctAnswer': '✓ Rätt',
        'test.wrongAnswer': '✗ Fel',
        'test.retry': 'Gör om provet',
        'test.continue': 'Fortsätt till nästa sektion →',

        // Locked section
        'locked.title': '🔒 Sektionen är låst',
        'locked.msg': 'Du måste klara Sektion {prev}-provet med minst 90% rätt för att låsa upp Sektion {current}.',
        'locked.goToTest': 'Gå till tidigare prov',

        // Section intro
        'sectionIntro.content': 'Innehåll:',
        'sectionIntro.startBtn': 'Starta Sektionen →',

        // Not found
        'notFound.title': 'Sidan hittades inte',
        'notFound.msg': 'Lektionen eller sektionen du försökte nå verkar inte existera ännu.',
        'notFound.back': 'Tillbaka till startsidan',

        // Resources
        'resources.title': '📚 Gratis Python-böcker',
        'resources.subtitle': 'Här är några utmärkta gratisförekommande böcker och resurser för att lära dig Python.',
        'resources.goHome': '← Tillbaka till startsidan',

        // Loading
        'loading': 'Laddar innehåll...',
        'error.loadFailed': 'Ett fel uppstod när sidan skulle laddas.',

        // Sidebar collapse
        'sidebar.collapse': 'Minimera sidofält',
        'sidebar.expand': 'Expandera sidofält',

        // Language
        'lang.switch': '🇬🇧 English',
    },

    en: {
        // Sidebar & Navigation
        'nav.totalProgress': 'Total progress',
        'nav.section': 'Section',
        'nav.sectionTest': '🎯 Section Test',
        'nav.resources': '📚 Resources',
        'nav.logout': '🚪 Logout',

        // Home
        'home.title': '🐍 PyLearn',
        'home.subtitle': 'Python programming for you. Clear, interactive and tailored.',
        'home.description': 'This platform is built with a focus on simplicity. The course is divided into 15 sections. To progress from a section you must pass a test with at least 90% correct answers.',
        'home.startBtn': 'Start the Journey →',

        // Lesson navigation
        'lesson.prev': '← Previous',
        'lesson.next': 'Next Lesson →',
        'lesson.finishAndTest': 'Mark done & Go to Test →',

        // Exercises
        'exercise.label': 'EXERCISE',
        'exercise.correct': '🟢 Correct!',
        'exercise.wrong': '🔴 Wrong.',
        'exercise.tryAgain': 'Try again.',
        'exercise.goodJob': 'Good job.',
        'exercise.checkCode': '▶ Check code',
        'exercise.writeCode': 'You need to write some code first!',
        'exercise.missing': 'You seem to be missing:',
        'exercise.goodCode': 'Good coding!',

        // Debug exercise
        'debug.label': 'DEBUGGING',
        'debug.fixPrompt': 'What is the correct way to fix the code?',
        'debug.bugFixed': '🟢 Bug Fixed!',
        'debug.stillWrong': '🔴 Still Wrong.',

        // Drag & drop
        'dragdrop.dragThese': 'Drag these terms:',
        'dragdrop.allCorrect': '🟢 All correct!',

        // Section test
        'test.title': 'Section Test:',
        'test.intro': 'Show what you have learned! You must answer at least <strong>90%</strong> of the questions correctly to unlock the next section.',
        'test.questionCount': 'Number of questions:',
        'test.passingGrade': 'Passing grade:',
        'test.minCorrect': 'At least',
        'test.right': 'correct',
        'test.retryInfo': 'You can retake the test as many times as you want.',
        'test.startBtn': 'Start the Test Now',
        'test.questionOf': 'of',
        'test.prevQuestion': '← Previous',
        'test.nextQuestion': 'Next question →',
        'test.submit': 'Submit test',
        'test.passed': 'Test passed!',
        'test.almostThere': 'Almost there!',
        'test.score': 'You got',
        'test.of': 'of',
        'test.yourAnswers': 'Your answers:',
        'test.yourAnswer': 'Your answer',
        'test.correctAnswerLabel': 'Correct answer',
        'test.correctAnswer': '✓ Correct',
        'test.wrongAnswer': '✗ Wrong',
        'test.retry': 'Retake the test',
        'test.continue': 'Continue to next section →',

        // Locked section
        'locked.title': '🔒 Section is Locked',
        'locked.msg': 'You must pass the Section {prev} test with at least 90% correct answers to unlock Section {current}.',
        'locked.goToTest': 'Go to previous test',

        // Section intro
        'sectionIntro.content': 'Contents:',
        'sectionIntro.startBtn': 'Start the Section →',

        // Not found
        'notFound.title': 'Page not found',
        'notFound.msg': 'The lesson or section you tried to reach does not seem to exist yet.',
        'notFound.back': 'Back to home',

        // Resources
        'resources.title': '📚 Free Python Books',
        'resources.subtitle': 'Here are some excellent free books and resources for learning Python.',
        'resources.goHome': '← Back to home',

        // Loading
        'loading': 'Loading content...',
        'error.loadFailed': 'An error occurred while loading the page.',

        // Sidebar collapse
        'sidebar.collapse': 'Collapse sidebar',
        'sidebar.expand': 'Expand sidebar',

        // Language
        'lang.switch': '🇸🇪 Svenska',
    }
};

// Aktuellt språk, hämtas från localStorage eller defaultar till svenska
let currentLanguage = localStorage.getItem('pylearn_lang') || 'sv';

/**
 * Hämtar en översatt sträng baserat på nyckel.
 * @param {string} key Översättningsnyckel, t.ex. 'home.title'
 * @param {Object} params Valfria parametrar för interpolering, t.ex. { prev: 1, current: 2 }
 * @returns {string} Den översatta strängen
 */
export function t(key, params = {}) {
    let text = translations[currentLanguage]?.[key] || translations['sv']?.[key] || key;

    // Enkel interpolering: ersätt {param} med faktiskt värde
    for (const [paramKey, paramValue] of Object.entries(params)) {
        text = text.replace(`{${paramKey}}`, paramValue);
    }

    return text;
}

/**
 * Hämtar aktuellt språk.
 * @returns {string} 'sv' eller 'en'
 */
export function getLanguage() {
    return currentLanguage;
}

/**
 * Byter språk och sparar i localStorage.
 * @param {string} lang 'sv' eller 'en'
 */
export function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('pylearn_lang', lang);
}

/**
 * Växlar mellan svenska och engelska.
 * @returns {string} Det nya språket
 */
export function toggleLanguage() {
    const newLang = currentLanguage === 'sv' ? 'en' : 'sv';
    setLanguage(newLang);
    return newLang;
}
