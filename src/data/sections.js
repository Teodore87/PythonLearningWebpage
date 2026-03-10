/**
 * PyLearn - Sektionsdata
 * 
 * Innehåller metadata och struktur för alla 15 avsnitt i kursplanen.
 * Används för att rendera sidofältet (navigationen) och routa rätt.
 */

export const sections = [
    {
        id: 1,
        title: "Grunder",
        description: "Lär dig Pythons syntax, variabler och grundläggande datatyper.",
        lessons: [
            { id: 1, title: "Syntax" },
            { id: 2, title: "Variabler" },
            { id: 3, title: "Strängar" },
            { id: 4, title: "Tal" },
            { id: 5, title: "Booleska värden" },
            { id: 6, title: "Konstanter" },
            { id: 7, title: "Kommentarer" },
            { id: 8, title: "Typomvandling" }
        ]
    },
    {
        id: 2,
        title: "Operatorer",
        description: "Matematiska beräkningar och logiska jämförelser.",
        lessons: [
            { id: 1, title: "Aritmetiska operatorer" },
            { id: 2, title: "Tilldelningsoperatorer" },
            { id: 3, title: "Jämförelseoperatorer" },
            { id: 4, title: "Logiska operatorer" }
        ]
    },
    {
        id: 3,
        title: "Kontrollflöde",
        description: "If-satser och loopar för att styra programmets väg.",
        lessons: [
            { id: 1, title: "if...else-sats" },
            { id: 2, title: "Ternär operator" },
            { id: 3, title: "for-loop med range()" },
            { id: 4, title: "while-loop" },
            { id: 5, title: "break" },
            { id: 6, title: "continue" },
            { id: 7, title: "pass" }
        ]
    },
    {
        id: 4,
        title: "Funktioner",
        description: "Återanvändbar kod och funktionsanrop.",
        lessons: [
            { id: 1, title: "Python-funktioner" },
            { id: 2, title: "Standardparametrar" },
            { id: 3, title: "Nyckelordsargument" },
            { id: 4, title: "Rekursiva funktioner" },
            { id: 5, title: "Lambda-uttryck" },
            { id: 6, title: "Docstrings" }
        ]
    },
    {
        id: 5,
        title: "Listor",
        description: "Hantera samlingar av data effektivt.",
        lessons: [
            { id: 1, title: "Lista" },
            { id: 2, title: "Tuple" },
            { id: 3, title: "Sortera en lista på plats" },
            { id: 4, title: "Sortera en lista" },
            { id: 5, title: "Skiva en lista" },
            { id: 6, title: "Packa upp en lista" },
            { id: 7, title: "Iterera över en lista" },
            { id: 8, title: "Hitta index för ett element" },
            { id: 9, title: "Iterabler" },
            { id: 10, title: "Transformera listelement med map()" },
            { id: 11, title: "Filtrera listelement med filter()" },
            { id: 12, title: "Reducera listelement med reduce()" },
            { id: 13, title: "List comprehensions" }
        ]
    },
    {
        id: 6,
        title: "Ordböcker (dictionaries)",
        description: "Lagra data i nyckel/värde-par.",
        lessons: [
            { id: 1, title: "Dictionary" },
            { id: 2, title: "Dictionary comprehension" }
        ]
    },
    {
        id: 7,
        title: "Mängder (sets)",
        description: "Unika värden och mängdlära.",
        lessons: [
            { id: 1, title: "Set" },
            { id: 2, title: "Set comprehension" },
            { id: 3, title: "Union av mängder" },
            { id: 4, title: "Snitt av mängder" },
            { id: 5, title: "Differens av mängder" },
            { id: 6, title: "Symmetrisk differens" },
            { id: 7, title: "Delmängd (subset)" },
            { id: 8, title: "Övermängd (superset)" },
            { id: 9, title: "Disjunkta mängder" }
        ]
    },
    {
        id: 8,
        title: "Felhantering",
        description: "Hantering av körtidsfel med try/except.",
        lessons: [
            { id: 1, title: "try...except" },
            { id: 2, title: "try...except...finally" },
            { id: 3, title: "try...except...else" }
        ]
    },
    {
        id: 9,
        title: "Mer om Python-loopar",
        description: "Avancerade loopkonstruktioner.",
        lessons: [
            { id: 1, title: "for...else" },
            { id: 2, title: "while...else" },
            { id: 3, title: "do...while (emulering)" }
        ]
    },
    {
        id: 10,
        title: "Mer om Python-funktioner",
        description: "Avancerade funktioner och typer.",
        lessons: [
            { id: 1, title: "Packa upp tupler" },
            { id: 2, title: "args-parametrar" },
            { id: 3, title: "kwargs-parametrar" },
            { id: 4, title: "Partiella funktioner" },
            { id: 5, title: "Typanvisningar (type hints)" }
        ]
    },
    {
        id: 11,
        title: "Moduler och paket",
        description: "Organisera större projekt i flera filer.",
        lessons: [
            { id: 1, title: "Moduler" },
            { id: 2, title: "Sökväg för modulimport" },
            { id: 3, title: "__name__-variabeln" },
            { id: 4, title: "Paket" },
            { id: 5, title: "Privata funktioner" }
        ]
    },
    {
        id: 12,
        title: "Arbeta med filer",
        description: "Läsa och skriva text- och CSV-filer.",
        lessons: [
            { id: 1, title: "Läsa från en textfil" },
            { id: 2, title: "Skriva till en textfil" },
            { id: 3, title: "Skapa en ny textfil" },
            { id: 4, title: "Kontrollera om en fil finns" },
            { id: 5, title: "Läsa CSV-filer" },
            { id: 6, title: "Skriva CSV-filer" },
            { id: 7, title: "Byta namn på en fil" },
            { id: 8, title: "Ta bort en fil" }
        ]
    },
    {
        id: 13,
        title: "Arbetskataloger",
        description: "Hantera mappar och filsökvägar.",
        lessons: [
            { id: 1, title: "Arbeta med kataloger" },
            { id: 2, title: "Lista filer i en katalog" }
        ]
    },
    {
        id: 14,
        title: "Fler Strängar",
        description: "Avancerad textformatering.",
        lessons: [
            { id: 1, title: "F-strängar" },
            { id: 2, title: "Råa strängar (raw strings)" },
            { id: 3, title: "Backslash" }
        ]
    },
    {
        id: 15,
        title: "Tredjepartspaket, PIP",
        description: "Ladda ner andras kod med pakethanteraren PIP.",
        lessons: [
            { id: 1, title: "PyPI och pip" },
            { id: 2, title: "Virtuella miljöer" },
            { id: 3, title: "Installera pipenv på Windows" }
        ]
    }
];
