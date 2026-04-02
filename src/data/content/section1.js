/**
 * PyLearn - Innehåll för Sektion 1 (Grunder)
 * 
 * Innehåller texter, kodexempel och interaktiva övningar
 * för lektion 1-8 och det slutgiltiga sektionsprovet.
 */

// Formatet för lektionsinnehåll är en array av block:
// { type: 'text' | 'code' | 'exercise_mcq' | 'exercise_dragdrop' | 'exercise_code' | 'exercise_debug', content/data: ... }

export const section1Content = {
    // Lektion 1: Syntax
    1: [
        { type: 'text', content: 'Välkommen till din första lektion! <strong>Syntax</strong> är helt enkelt grammatiken för ett programmeringsspråk. Det är reglerna för hur du skriver kod så att datorn förstår dig.' },
        { type: 'text', content: 'I Python är syntaxen designad för att vara väldigt ren och lättläst — nästan som engelska. En av de viktigaste sakerna att veta är att Python använder <em>indentering</em> (mellanrum i början av en rad) för att förstå vilka rader som hör ihop i block. Andra språk använder ofta fiskmåsar <code>{}</code> för detta.' },
        { type: 'code', content: 'if 5 > 2:\n    print("Fem är större än två!") # Detta är indenterat\n' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad används för att definiera kodblock i Python?',
                options: [
                    'Måsvingar {}',
                    'Indentering (korta mellanrum/tab)',
                    'Parenteser ()',
                    'Semikolon ;'
                ],
                correctIndex: 1,
                explanation: 'Python bygger helt på indentering för att gruppera kod, vilket gör språket mycket läsbart!'
            }
        }
    ],

    // Lektion 2: Variabler
    2: [
        { type: 'text', content: 'En <strong>variabel</strong> är som en namngiven låda där du kan spara information för att använda senare. Du behöver inte deklarera vilken typ av information det är i förväg.' },
        { type: 'text', content: 'Ett bra variabelnamn beskriver vad som finns i "lådan". Om du sparar ett namn, kalla variabeln för <code>name</code> hellre än bara <code>x</code>.' },
        { type: 'code', content: 'name = "Anna"\nage = 25\n\nprint(name)\nprint(age)' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vilken av följande är det Tydligaste och BÄSTA variabelnamnet för en användares ålder?',
                options: [
                    'x = 25',
                    'a = 25',
                    'age = 25',
                    'number_twenty_five = 25'
                ],
                correctIndex: 2,
                explanation: '"age" beskriver exakt vad värdet representerar. Korta men tydliga namn är bäst!'
            }
        }
    ],

    // Lektion 3: Strängar
    3: [
        { type: 'text', content: 'En <strong>sträng</strong> (string) är text. I Python kan du skapa strängar genom att sätta texten i apostrofer eller citattecken.' },
        { type: 'code', content: 'greeting1 = "Hej världen!"\ngreeting2 = \'Python är kul\'' },
        { type: 'text', content: 'Du kan slå ihop flera strängar med ett plustecken (<code>+</code>).' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad blir resultatet av koden: print("Hej " + "Anna")?',
                options: [
                    '"Hej" + "Anna"',
                    'En krasch/error.',
                    'Hej Anna',
                    'HejAnna'
                ],
                correctIndex: 2,
                explanation: 'Utskriften sammanfogar strängarna exakt som de är. Eftersom det finns ett mellanslag efter "Hej " blir det "Hej Anna".'
            }
        }
    ],

    // Lektion 4: Tal
    4: [
        { type: 'text', content: 'Det finns två huvudsakliga typer av nuffror i Python som du behöver känna till:' },
        { type: 'text', content: '<ul><li><strong>Heltal (int):</strong> Tal utan decimaler: <code>10</code>, <code>-5</code>, <code>1000</code></li><li><strong>Flyttal (float):</strong> Tal med decimaler: <code>3.14</code>, <code>-1.5</code></li></ul>' },
        { type: 'text', content: 'P.S. Tänk på att använda <strong>punkt</strong> istället för komma för decimaler i koder!' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vilken datatyp är siffran 3.14?',
                options: [
                    'int',
                    'float',
                    'string',
                    'bool'
                ],
                correctIndex: 1,
                explanation: 'Siffror med decimaler (punkt) är av typen float (flyttal).'
            }
        }
    ],

    // Lektion 5: Booleska värden
    5: [
        { type: 'text', content: 'En <strong>Boolesk variabel</strong> (boolean) kan bara ha ETT av TVÅ värden: Antingen <code>True</code> (sant) eller <code>False</code> (falskt). Tänk på det som en strömbrytare - antingen på eller av.' },
        { type: 'code', content: 'is_raining = True\nhas_umbrella = False' },
        { type: 'text', content: 'Datorn använder ofta booleska värden i bakgrunden. Tex när du frågar om 10 är större än 9, svarar Python med <code>True</code>.' },
        {
            type: 'exercise_mcq', data: {
                question: 'Om du skriver koden: result = (5 > 10). Vad blir värdet i variabeln result?',
                options: [
                    '5',
                    '10',
                    'True',
                    'False'
                ],
                correctIndex: 3,
                explanation: 'Eftersom 5 INTE är större än 10 utvärderas påståendet till False.'
            }
        }
    ],

    // Lektion 6: Konstanter
    6: [
        { type: 'text', content: 'En <strong>konstant</strong> är en typ av variabel vars värde INTE ska ändras. Vissa språk har ett särskilt nyckelord för detta, men Python saknar det.' },
        { type: 'text', content: 'För att visa andra programmerare att en variabel är en konstant, använder man enbart VERSALER i namnet som en överenskommen konvention.' },
        {
            type: 'code', content: 'PI = 3.14159\nMAX_USERS = 100\n\n# Båda dessa variabler GÅR att ändra, men koden ' +
                'säger "rör ej!"\n# Genom att namnen har stora bokstäver.'
        },
        {
            type: 'exercise_mcq', data: {
                question: 'Hur skapar du en konstant enligt god kod-standard i Python?',
                options: [
                    'Genom att använda ordet "const" framför.',
                    'Det går inte alls.',
                    'Genom att enbart använda STORA_BOKSTÄVER.',
                    'Genom att sätta värdet inom parenteser.'
                ],
                correctIndex: 2,
                explanation: 'Stora bokstäver (UPPER_CASE) är konventionen i Python för att signalera till andra att "Detta värde är konstant, ändra det inte!".'
            }
        }
    ],

    // Lektion 7: Kommentarer
    7: [
        { type: 'text', content: 'Kommentarer skrivs i din kod för att lämna anteckningar. Datorn ignorerar helt allt som är en kommentar. De är till för dig och andra människor!' },
        { type: 'text', content: 'I Python skapas en kommentar med en brädgård (hashtag) <code>#</code>.' },
        { type: 'code', content: '# Detta är en kommentar!\nprint("Hej") # Koden innan brädgården körs, texten efter ignoreras.' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vilket tecken används för att skriva en kommentar?',
                options: [
                    '//',
                    '#',
                    '/*',
                    '--'
                ],
                correctIndex: 1,
                explanation: 'Brädgård (#) gör resten av raden till en kommentar i Python.'
            }
        }
    ],

    // Lektion 8: Typomvandling
    8: [
        { type: 'text', content: 'Ibland har du ett värde av en typ, men behöver att det ska vara en annan typ. Till exempel, om du läser in ett nummer från ett textfält på nätet kommer det in som en <strong>sträng</strong>.' },
        { type: 'text', content: 'För att kunna räkna matematik på den måste du omvandla typen. Vi använder <code>int()</code>, <code>float()</code> och <code>str()</code> för att omvandla.' },
        { type: 'code', content: 'text_number = "50"\n# Omvandla från sträng till heltal:\nreal_number = int(text_number)\n\nprint(real_number + 10) # Detta blir 60' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vilken funktion används för att omvandla siffran 5 till strängen "5"?',
                options: [
                    'int()',
                    'string()',
                    'str()',
                    'float()'
                ],
                correctIndex: 2,
                explanation: 'str() används för att omvandla andra datatyper till en sträng (text).'
            }
        }
    ]
};

// ============================================
// PROV: SEKTION 1
// Krav för att låsa upp Sektion 2: 90% (Minst 9 av 10)
// ============================================

export const section1Test = [
    {
        question: "1. Vad är korrekt syntax för att skapa en variabel med värdet 10?",
        options: ["10 = x", "int x = 10", "x = 10", "variabel x: 10"],
        correctIndex: 2
    },
    {
        question: "2. Hur kommenterar man kod i Python?",
        options: ["// Kommentar", "/* Kommentar */", "# Kommentar", "@ Kommentar"], // <!-- --> Gav ett tomt alternativ
        correctIndex: 2
    },
    {
        question: "3. Vilken datatyp är värdet 5.5?",
        options: ["int", "float", "str", "bool"],
        correctIndex: 1
    },
    {
        question: "4. Vad används för att definiera var ett kodblock börjar och slutar?",
        options: ["Parenteser", "Måsvingar {}", "Indentering", "Semikolon"],
        correctIndex: 2
    },
    {
        question: "5. Om koden kör if (5 > 2): vad utvärderas (5 > 2) till?",
        options: ["True", "False", "Yes", "Null"],
        correctIndex: 0
    },
    {
        question: "6. Hur signalerar man att en variabel är en konstant i Python?",
        options: ["Använder const", "Lägger till en stjärna framför", "SKRIVER_MED_VERSALER", "Sätter siffran till negativ"],
        correctIndex: 2
    },
    {
        question: "7. Vad kallas textdatatypen i Python?",
        options: ["Character (char)", "String (str)", "Text (txt)", "Word (wrd)"], // (str) gav nästan svaret då det stod ensamt
        correctIndex: 1
    },
    {
        question: "8. Hur omvandlar du strängen \"25\" till ett räkningsbart nummer?",
        options: ["int(\"25\")", "number(\"25\")", "\"25\".toInt()", "str(\"25\")"],
        correctIndex: 0
    },
    {
        question: "9. Vilket variabelnamn är BÄST av följande?",
        options: ["a = 15", "x12 = 15", "antal_anvandare = 15", "var = 15"],
        correctIndex: 2
    },
    {
        question: "10. Vad är resultatet av \"Hej\" + \"Då\" i Python?",
        options: ["HejDå", "Hej Då", "En crash", "Null"],
        correctIndex: 0
    }
];
