/**
 * PyLearn - Placeholder för framtida sektioner
 * 
 * I en fullständig applikation skulle detta vara separata filer (section2.js, section3.js osv), 
 * men vi fyller dem med generiskt skelettinnehåll härifrån tills de faktiskt skrivs.
 */

export function section2to15Content(sectionId, lessonId) {
    return [
        { type: 'text', content: 'Detta är en placeholder för framtida lektioner.' },
        { type: 'text', content: `Du letar efter Sektion ${sectionId}, Lektion ${lessonId}, som handlar om ett avancerat python-koncept.` },
        { type: 'code', content: '# Kodexempel för framtiden\nprint("Sektion ' + sectionId + ' byggs snart upp!")' },
        {
            type: 'exercise_mcq', data: {
                question: `Är du redo för att fortsätta koda?`,
                options: [
                    'Nej, jag vill vila.',
                    'Ja, absolut!'
                ],
                correctIndex: 1,
                explanation: 'Snyggt!'
            }
        }
    ];
}

export function section2to15Test(sectionId) {
    return [
        {
            question: `Detta är ett dummy-prov för sektion ${sectionId}. Klicka på "B" för att klara frågan.`,
            options: ["Fel Svar", "Rätt Svar", "Också Fel"],
            correctIndex: 1
        },
        {
            question: `Vill du låsa upp nästa sektion?`,
            options: ["Kanske", "Ja!", "Nej"],
            correctIndex: 1
        }
    ];
}
