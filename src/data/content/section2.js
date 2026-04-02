/**
 * PyLearn - Innehåll för Sektion 2 (Operatorer)
 * 
 * Fullständigt lektionsinnehåll med texter, kodexempel och interaktiva övningar
 * för alla 4 lektioner samt ett 10-frågorsprov för sektionen.
 */

export const section2Content = {
    // Lektion 1: Aritmetiska operatorer
    1: [
        { type: 'text', content: '<strong>Aritmetiska operatorer</strong> (arithmetic operators) är de matematiska grundoperationerna du redan känner igen från skolan. Python kan användas som en avancerad miniräknare!' },
        { type: 'text', content: 'Här är de viktigaste:' },
        { type: 'text', content: '<ul><li><code>+</code> Addition (plus)</li><li><code>-</code> Subtraktion (minus)</li><li><code>*</code> Multiplikation (gånger)</li><li><code>/</code> Division (delat med) — ger alltid ett <strong>float</strong></li><li><code>//</code> Heltalsdivision — ger bara heltalet, rundas nedåt</li><li><code>%</code> Modulus — ger <em>resten</em> vid division</li><li><code>**</code> Exponent — upphöjt till</li></ul>' },
        { type: 'code', content: 'print(10 + 3)   # 13\nprint(10 - 3)   # 7\nprint(10 * 3)   # 30\nprint(10 / 3)   # 3.3333...\nprint(10 // 3)  # 3\nprint(10 % 3)   # 1  (resten av 10/3)\nprint(2 ** 4)   # 16 (2 upphöjt till 4)' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad blir resultatet av 17 % 5?',
                options: [
                    '3',
                    '2',
                    '3.4',
                    '5'
                ],
                correctIndex: 1,
                explanation: '17 / 5 = 3 med rest 2. Modulus (%) ger just resten, alltså 2.'
            }
        },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad blir resultatet av 7 / 2?',
                options: [
                    '3',
                    '3.5',
                    '3.0',
                    '4'
                ],
                correctIndex: 1,
                explanation: 'Vanlig division (/) ger ALLTID ett float-resultat i Python. 7 / 2 = 3.5.'
            }
        }
    ],

    // Lektion 2: Tilldelningsoperatorer
    2: [
        { type: 'text', content: '<strong>Tilldelningsoperatorer</strong> (assignment operators) används för att tilldela och uppdatera värden i variabler.' },
        { type: 'text', content: 'Den enklaste är <code>=</code> som ger en variabel ett värde. Men det finns genvägar för att kombinera beräkning och tilldelning:' },
        { type: 'code', content: 'x = 10      # Tilldela: x blir 10\n\nx += 5      # Samma som: x = x + 5   → x blir 15\nx -= 3      # Samma som: x = x - 3   → x blir 12\nx *= 2      # Samma som: x = x * 2   → x blir 24\nx //= 4     # Samma som: x = x // 4  → x blir 6\n\nprint(x)    # 6' },
        { type: 'text', content: 'Dessa genvägar gör koden kortare och mer lättläst. Du kommer använda <code>+=</code> och <code>-=</code> väldigt ofta, t.ex. för att öka eller minska en räknare i en loop.' },
        {
            type: 'exercise_mcq', data: {
                question: 'Om x = 20, vad blir x efter att koden x //= 3 har körts?',
                options: [
                    '6.666',
                    '7',
                    '6',
                    '18'
                ],
                correctIndex: 2,
                explanation: 'x //= 3 gör heltalsdivision: 20 // 3 = 6 (avrundas nedåt). x blir 6.'
            }
        }
    ],

    // Lektion 3: Jämförelseoperatorer
    3: [
        { type: 'text', content: '<strong>Jämförelseoperatorer</strong> (comparison operators) jämför två värden och returnerar alltid ett booleskt värde: <code>True</code> eller <code>False</code>.' },
        { type: 'text', content: '<ul><li><code>==</code> Lika med (OBS! Inte <code>=</code> som är tilldelning!)</li><li><code>!=</code> Inte lika med</li><li><code>&gt;</code> Större än</li><li><code>&lt;</code> Mindre än</li><li><code>&gt;=</code> Större än eller lika med</li><li><code>&lt;=</code> Mindre än eller lika med</li></ul>' },
        // Här blir != till ett likamed tecken med ett snedstreck igenom. Kan vara svårt att förstå som nybörjare. Samma med <= och >=, dom ger tecken som blir svåra för nybörjare.
        { type: 'code', content: 'print(5 == 5)    # True\nprint(5 != 3)    # True\nprint(10 > 20)   # False\nprint(3 <= 3)    # True\n\nname = "Anna"\nprint(name == "Anna")   # True\nprint(name == "anna")   # False (skiftlägeskänsligt!)' },
        { type: 'text', content: '<strong>Vanligt misstag:</strong> Att blanda ihop <code>=</code> (tilldelning) och <code>==</code> (jämförelse). Om du skriver <code>if x = 5</code> får du ett felmeddelande. Det ska vara <code>if x == 5</code>.' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad ger uttrycket "hej" == "Hej"?',
                options: [
                    'True',
                    'False',
                    'Error',
                    'None'
                ],
                correctIndex: 1,
                explanation: 'Python är skiftlägeskänsligt: "hej" och "Hej" har olika stor/liten bokstav och anses inte lika.'
            }
        },
        {
            type: 'exercise_mcq', data: {
                question: 'Vilken operator kontrollerar om två värden INTE är lika?',
                options: [
                    '<>',
                    '!==',
                    '!=',
                    'not='
                ],
                correctIndex: 2,
                explanation: 'I Python används != ("utropstecken lika med") för att kolla om värden inte är lika.'
            }
        }
    ],

    // Lektion 4: Logiska operatorer
    4: [
        { type: 'text', content: '<strong>Logiska operatorer</strong> (logical operators) används för att kombinera flera villkor. De är extremt ofta använda i if-satser och loopar.' },
        { type: 'text', content: '<ul><li><code>and</code> — Båda villkoren måste vara True</li><li><code>or</code> — Minst ett villkor måste vara True</li><li><code>not</code> — Vänder True till False och tvärtom</li></ul>' },
        { type: 'code', content: 'age = 25\nhas_license = True\n\n# and: båda måste vara sanna\ncan_drive = age >= 18 and has_license\nprint(can_drive)        # True\n\n# or: minst en måste vara sann\nis_weekend = False\nis_holiday = True\nfree_day = is_weekend or is_holiday\nprint(free_day)         # True\n\n# not: vänder värdet\nis_raining = False\nprint(not is_raining)   # True' },
        { type: 'text', content: '<strong>Minnestips:</strong> Tänk på <code>and</code> som "OCH" och <code>or</code> som "ELLER". Om du frågar "Har jag kaka OCH mjölk?" krävs båda. Om du frågar "Har jag kaka ELLER mjölk?" räcker en av dem.' },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad ger uttrycket: True and False?',
                options: [
                    'True',
                    'False',
                    'None',
                    'Error'
                ],
                correctIndex: 1,
                explanation: 'Med "and" måste BÅDA vara True. Eftersom ena sidan är False, blir resultatet False.'
            }
        },
        {
            type: 'exercise_mcq', data: {
                question: 'Vad ger uttrycket: not (5 > 3)?',
                options: [
                    'True',
                    'False',
                    '5',
                    'Error'
                ],
                correctIndex: 1,
                explanation: '5 > 3 är True. "not True" vänder det till False.'
            }
        }
    ]
};

// ============================================
// PROV: SEKTION 2
// Krav för att låsa upp Sektion 3: 90% (Minst 9 av 10)
// ============================================

export const section2Test = [
    {
        question: "1. Vad blir resultatet av 15 // 4?",
        options: ["3.75", "3", "4", "3.0"],
        correctIndex: 1
    },
    {
        question: "2. Vilken operator ger resten vid division?",
        options: ["//", "/", "%", "**"],
        correctIndex: 2
    },
    {
        question: "3. Vad gör operatorn **?",
        options: ["Multiplikation", "Division", "Exponent (upphöjt till)", "Kommentar"],
        correctIndex: 2
    },
    {
        question: "4. Om y = 10, vad blir y efter y += 5?",
        options: ["5", "10", "15", "50"],
        correctIndex: 2
    },
    {
        question: "5. Vilken jämförelseoperator kontrollerar om två värden är lika?",
        options: ["=", "==", "===", "!="],
        correctIndex: 1
    },
    {
        question: "6. Vad ger uttrycket 10 > 10?",
        options: ["True", "False", "10", "Error"],
        correctIndex: 1
    },
    {
        question: "7. Vad ger True or False?",
        options: ["True", "False", "Error", "None"],
        correctIndex: 0
    },
    {
        question: "8. Vad gör operatorn not?",
        options: [
            "Jämför två värden",
            "Vänder True till False och tvärtom",
            "Adderar två tal",
            "Kontrollerar om variabeln finns"
        ],
        correctIndex: 1
    },
    {
        question: "9. Vad blir 10 / 5 i Python?",
        options: ["2", "2.0", "2.5", "Error"],
        correctIndex: 1
    },
    {
        question: "10. Vad ger uttrycket: not (True and False)?",
        options: ["True", "False", "None", "Error"],
        correctIndex: 0
    }
];
