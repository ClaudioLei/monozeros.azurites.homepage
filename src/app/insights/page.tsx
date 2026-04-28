import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import { ArrowRight, Clock } from "lucide-react";

const articles = [
  {
    slug: "mdr-schweiz",
    title: "MDR in der Schweiz: Was Unternehmen jetzt wissen müssen",
    excerpt: "Managed Detection & Response gewinnt im Schweizer Markt an Bedeutung. Was unterscheidet MDR von traditionellen SOC-Services und warum ist es für Mid-Market-Unternehmen relevant?",
    category: "MDR",
    readTime: "6 Min.",
  },
  {
    slug: "braucht-mein-unternehmen-ein-soc",
    title: "Braucht mein Unternehmen ein SOC?",
    excerpt: "Nicht jedes Unternehmen braucht ein eigenes Security Operations Center. Wann ein internes SOC sinnvoll ist und wann Managed Services die bessere Wahl.",
    category: "Strategie",
    readTime: "5 Min.",
  },
  {
    slug: "microsoft-defender-ohne-soc",
    title: "Microsoft Defender ohne SOC: Warum Tools allein nicht reichen",
    excerpt: "Microsoft Defender ist ein leistungsstarkes Tool – aber ohne professionelle Überwachung und Analyse bleiben kritische Bedrohungen unentdeckt.",
    category: "Technologie",
    readTime: "4 Min.",
  },
  {
    slug: "incident-response-checkliste",
    title: "Incident Response Checkliste für Schweizer Unternehmen",
    excerpt: "Eine strukturierte Checkliste für die Reaktion auf Sicherheitsvorfälle. Von der Erkennung bis zur Recovery.",
    category: "Incident Response",
    readTime: "7 Min.",
  },
  {
    slug: "soc-outsourcing-schweiz",
    title: "SOC Outsourcing in der Schweiz: Chancen und Überlegungen",
    excerpt: "Das Outsourcing von Security Operations wird für Schweizer Unternehmen zunehmend attraktiv. Was bei der Auswahl eines Partners zu beachten ist.",
    category: "SOC",
    readTime: "5 Min.",
  },
  {
    slug: "cybersecurity-kmu-schweiz",
    title: "Cybersecurity für KMU in der Schweiz: Pragmatisch statt perfekt",
    excerpt: "Kleine und mittlere Unternehmen stehen vor besonderen Security-Herausforderungen. Ein pragmatischer Ansatz für mehr Schutz ohne Überinvestition.",
    category: "KMU",
    readTime: "4 Min.",
  },
];

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-anthracite-dark">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <p className="text-sm font-semibold tracking-widest uppercase text-electric-blue-light mb-5">
            Insights
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-3xl">
            Wissen und Perspektiven
          </h1>
          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl">
            Analysen, Checklisten und Strategien für Schweizer Cybersecurity – praxisnah und auf den Punkt.
          </p>
        </div>
      </section>

      {/* Articles */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group p-7 rounded-2xl border border-border bg-white hover:shadow-lg hover:border-electric-blue/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-electric-blue-glow text-electric-blue">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-text-tertiary">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-anthracite-dark mb-3 group-hover:text-electric-blue transition-colors">
                {article.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <span className="text-sm font-medium text-electric-blue group-hover:underline">
                Weiterlesen
              </span>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section dark>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Security-Wissen direkt in Ihr Postfach
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Bleiben Sie informiert über Cybersecurity-Themen für Schweizer Unternehmen.
          </p>
          <Button href="/kontakt" size="lg">
            Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
