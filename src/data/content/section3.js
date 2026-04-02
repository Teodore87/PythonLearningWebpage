/**
 * PyLearn - Innehåll för Sektion 3 (Kontrollflöde)
 *
 * Innehåller texter, kodexempel och interaktiva övningar
 * för lektion 1-7 och det slutgiltiga sektionsprovet.
 *
 * Struktur och stil matchar section2.js
 */

// Formatet för lektionsinnehåll är en array av block:
// { type: 'text' | 'code' | 'exercise_mcq' | 'exercise_dragdrop' | 'exercise_code' | 'exercise_debug', content/data: ... }

export const section3Content = {
    // Lektion 1: if...else-sats
    1: [
        { type: 'text', content: '<strong>if...else</strong>-satser låter din kod fatta beslut. Du kör en kodbit om ett villkor är sant, och en annan om det inte är det.' },
        { type: 'text', content: 'Du kan också använda <code>elif</code> (else if) för flera alternativa vägar utan att behöva nästla många if-satser.' },
        { type: 'code', content: 'age = 17\nif age >= 18:\n    print("Du får rösta")\nelif age == 17:\n    print("Snart 18!")\nelse:\n    print("Du är under 18")' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad skrivs ut om age = 18 i koden ovan?',
                options: [
                    'Du är under 18',
                    'Snart 18!',
                    'Du får rösta',
                    'Inget skrivs ut'
                ],
                correctIndex: 2,
                explanation: 'När age >= 18 är sant körs den första grenen och skriver "Du får rösta".'
            }
        }
    ],

    // Lektion 2: Ternär operator (villkorsuttryck)
    2: [
        { type: 'text', content: 'En <strong>ternär operator</strong> (villkorsuttryck) är ett kort sätt att skriva en enkel if/else på en rad.' },
        { type: 'text', content: 'Formatet är: <code>värde_if_sant if villkor else värde_if_falskt</code> — användbart för att tilldela eller skriva ut snabbt.' },
        { type: 'code', content: 'age = 20\nstatus = "vuxen" if age >= 18 else "barn"\nprint(status)  # Skriver "vuxen"' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad blir värdet av status om age = 16 i exemplet ovan?',
                options: [
                    '"vuxen"',
                    '"barn"',
                    'True',
                    'False'
                ],
                correctIndex: 1,
                explanation: 'Eftersom age >= 18 är falskt väljs värdet efter else: "barn".'
            }
        }
    ],

    // Lektion 3: for-loop med range()
    3: [
        { type: 'text', content: '<strong>for</strong>-loopar används för att upprepa kod för varje element i en sekvens. För att iterera över ett intervall av tal är <code>range()</code> praktiskt.' },
        { type: 'text', content: 'Range genererar tal från start (inklusive) till stopp (exklusive). Du kan också ange steg (step).' },
        { type: 'code', content: 'for i in range(5):\n    print(i)  # 0 1 2 3 4\n\nfor i in range(2, 8, 2):\n    print(i)  # 2 4 6' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad skrivs ut av list(range(3, 7))?',
                options: [
                    '[3, 4, 5, 6]',
                    '[3, 4, 5, 6, 7]',
                    '[0, 1, 2, 3, 4, 5, 6]',
                    '[3, 5]'
                ],
                correctIndex: 0,
                explanation: 'range(3,7) ger talen 3,4,5,6 — stoppvärdet 7 ingår inte.'
            }
        }
    ],

    // Lektion 4: while-loop
    4: [
        { type: 'text', content: '<strong>while</strong>-loopar körs så länge ett villkor är sant. Använd while när du inte vet i förväg hur många iterationer som behövs.' },
        { type: 'text', content: 'Var försiktig så att villkoret så småningom blir falskt, annars får du en oändlig loop.' },
        { type: 'code', content: 'count = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# Skriver 0 1 2 3 4' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad händer om du glömmer att öka count i exemplet ovan?',
                options: [
                    'Loopen körs en gång och slutar',
                    'Programmet kraschar omedelbart',
                    'Loopen blir oändlig (körs för alltid)',
                    'count blir automatiskt större'
                ],
                correctIndex: 2,
                explanation: 'Om count aldrig ändras förblir villkoret True och loopen körs oändligt.'
            }
        }
    ],

    // Lektion 5: break
    5: [
        { type: 'text', content: '<strong>break</strong> avslutar en loop omedelbart och hoppar vidare till koden efter loopen. Används när du hittat det du söker eller vill stoppa tidigt.' },
        { type: 'code', content: 'for i in range(10):\n    if i == 4:\n        break\n    print(i)\n# Skriver 0 1 2 3' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad händer när break körs inuti en for-loop?',
                options: [
                    'Hoppar till nästa iteration',
                    'Avslutar hela programmet',
                    'Avslutar loopen och fortsätter efter den',
                    'Ignoreras'
                ],
                correctIndex: 2,
                explanation: 'break avslutar den närmaste omgivande loopen och exekveringen fortsätter efter loopen.'
            }
        }
    ],

    // Lektion 6: continue
    6: [
        { type: 'text', content: '<strong>continue</strong> hoppar över resten av den aktuella iterationen och går vidare till nästa. Användbart för att ignorera vissa värden utan att bryta loopen.' },
        { type: 'code', content: 'for i in range(6):\n    if i % 2 == 0:\n        continue\n    print(i)\n# Skriver 1 3 5 (jämna tal hoppas över)' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad gör continue i en loop?',
                options: [
                    'Avslutar loopen helt',
                    'Hoppar över resten av aktuell iteration och fortsätter med nästa',
                    'Återställer loopvariabeln',
                    'Stoppar programmet'
                ],
                correctIndex: 1,
                explanation: 'continue hoppar direkt till nästa iteration utan att köra koden som följer i den aktuella iterationen.'
            }
        }
    ],

    // Lektion 7: pass
    7: [
        { type: 'text', content: '<strong>pass</strong> är en platshållare som inte gör någonting. Används när syntax kräver ett block men du inte vill skriva kod där ännu.' },
        { type: 'code', content: 'def framtida_funktion():\n    pass  # TODO: implementera senare\n\nfor i in range(3):\n    if i == 1:\n        pass  # inget händer, men strukturen är giltig' },
        {
            type: 'exercise_mcq', data: {
                question: 'När är pass användbart?',
                options: [
                    'När du vill hoppa ur en loop',
                    'När du behöver en tom funktion eller block som ännu inte implementerats',
                    'När du vill avsluta programmet',
                    'När du vill skriva kommentarer'
                ],
                correctIndex: 1,
                explanation: 'pass låter dig ha ett giltigt, tomt block som senare kan fyllas med kod.'
            }
        }
    ]
};

// ============================================
// PROV: SEKTION 3
// Krav för att låsa upp Sektion 4: 90% (Minst 9 av 10)
// ============================================

export const section3Test = [
    {
        question: "1. Vilket nyckelord används för att skapa en alternativ gren efter if i Python?",
        options: ["elseif", "elif", "else if", "otherwise"],
        correctIndex: 1
    },
    {
        question: "2. Vad gör uttrycket: x = 'ja' if cond else 'nej' ?",
        options: ["En vanlig if-sats", "En ternär/inline if som tilldelar x beroende på cond", "En loop", "Ett funktionsanrop"],
        correctIndex: 1
    },
    {
        question: "3. Vad ger list(range(2, 6))?",
        options: ["[2, 3, 4, 5]", "[2, 3, 4, 5, 6]", "[0,1,2,3,4,5]", "[2,4]"],
        correctIndex: 0
    },
    {
        question: "4. Vilket av följande är en risk med while-loopar?",
        options: ["De kan inte iterera över listor", "De kan skapa oändliga loopar om villkoret aldrig blir falskt", "De är alltid långsammare än for-loopar", "De kräver range()"],
        correctIndex: 1
    },
    {
        question: "5. Vad gör break inuti en loop?",
        options: ["Hoppar till nästa iteration", "Avslutar loopen omedelbart", "Ignorerar villkoret", "Startar loopen om från början"],
        correctIndex: 1
    },
    {
        question: "6. Vad händer när continue körs i en loop?",
        options: ["Loopen avslutas", "Resten av aktuell iteration hoppas över och nästa iteration börjar", "Programmet kraschar", "Variabeln nollställs"],
        correctIndex: 1
    },
    {
        question: "7. Vad gör pass i Python?",
        options: ["Avslutar programmet", "Gör ingenting; en platshållare för ett tomt block", "Hoppar över en iteration", "Skriver ut text"],
        correctIndex: 1
    },
    {
        question: "8. Vilket av följande är korrekt syntax för en enkel if-sats?",
        options: ["if x > 0 { print(x) }", "if x > 0: print(x)", "if (x > 0) then print(x)", "if x > 0 -> print(x)"],
        correctIndex: 1
    },
    {
        question: "9. Vad skrivs ut av följande kod?\nfor i in range(4):\n    if i == 2:\n        break\n    print(i)",
        options: ["0 1 2 3", "0 1", "0 1 2", "1 2 3"],
        correctIndex: 1
    },
    {
        question: "10. Vilket uttryck beskriver bäst skillnaden mellan for och while?",
        options: ["for används för villkor, while för sekvenser", "for upprepar tills ett villkor blir falskt, while itererar över en sekvens", "for itererar över en sekvens; while körs så länge ett villkor är sant", "Det finns ingen skillnad"],
        correctIndex: 2
    }
];
