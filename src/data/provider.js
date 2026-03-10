// Importera alla 15 sektioner
import { sections } from './sections.js';
import { section1Content, section1Test } from './content/section1.js';
import { section2to15Content, section2to15Test } from './content/section2-15.js';

/**
 * Hjälpfunktion för att hämta lektionsinnehåll baserat på sektion och lektions-id.
 */
export function getLessonContent(sectionId, lessonId) {
    if (sectionId === 1) {
        return section1Content[lessonId] || [];
    } else {
        // Returnera platshållare/skelett-innehåll för sektion 2-15
        return section2to15Content(sectionId, lessonId);
    }
}

/**
 * Hjälpfunktion för att hämta testfrågor baserat på sektion.
 */
export function getSectionTest(sectionId) {
    if (sectionId === 1) {
        return section1Test;
    } else {
        // Returnera platshållare för sektion 2-15
        return section2to15Test(sectionId);
    }
}

export function getSectionMetadata(sectionId) {
    return sections.find(s => s.id === sectionId);
}

export function getLessonMetadata(sectionId, lessonId) {
    const section = getSectionMetadata(sectionId);
    if (!section) return null;
    return section.lessons.find(l => l.id === lessonId);
}
