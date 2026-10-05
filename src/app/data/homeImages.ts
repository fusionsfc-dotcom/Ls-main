// Verified demo screenshots and service diagrams matched to the page content.
// Diagrams carry an explicit caption; they are not product screenshots.
// Provenance: docs/experience-assets.json
const visual = (name: string) => `/images/experience/${name}.svg`;
export const homeImages = {
  hero: visual('architecture'), cancerPlatform: visual('hospital-platform'),
  rehabApp: visual('patient-app'), spaceAx: visual('workflow'),
  medical: visual('medical'), corporate: visual('corporate'),
  construction: visual('construction'), hospitality: visual('hospitality'), trust: visual('pvm'),
} as const;
export type HomeImageKey = keyof typeof homeImages;
export const axImages = {
  hero: visual('architecture'), diagnosis: visual('diagnosis'), automation: visual('workflow'),
  webapp: visual('webapp'), saas: visual('saas'), strategy: visual('strategy'),
  aiConsult: visual('ai-consult'), platform: visual('architecture'),
} as const;
export const bizImages = { hero: visual('corporate'), system: visual('workflow'), cta: visual('corporate') } as const;
export const medImages = {
  hero: visual('medical'), intro: visual('medical'), patientApp: visual('patient-app'),
  hospitalSys: visual('hospital-platform'), pvm: visual('pvm'), care: visual('medical'),
} as const;
