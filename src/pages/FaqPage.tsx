export default function FaqPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Retningslinjer for kvitteringer
          </h1>
          <p className="text-online-blue-200 text-lg">
            For alle medlemmer i Online
          </p>
        </header>

        {/* Main Content Card */}
        <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6 md:p-8">
          <Section title="Bakgrunn">
            <p className="text-online-blue-100 leading-relaxed">
              Hensikten med disse retningslinjene er a gi forutsigbarhet for arbeidet til alle Onlines
              okonomiansvarlige, slik at de klarer a holde Bankoms frister samt folge gjeldende regler for
              tilbakebetaling og foringer av kjop.
            </p>
          </Section>

          <Section title="Gyldig kvittering">
            <p className="text-online-blue-100 leading-relaxed mb-4">
              Alle kvitteringsskjema krever gyldig kvittering for at Bankom kan registrere kjop, og eventuelt betale
              tilbake for utlegg.
            </p>
            <p className="text-white font-medium mb-3">En gyldig kvittering har:</p>
            <ul className="space-y-2 text-online-blue-100">
              <ListItem>Dato for nar kvitteringen er skrevet ut</ListItem>
              <ListItem>Selgers navn og adresse, og/eller organisasjonsnummer</ListItem>
              <ListItem>Beskrivelse av varen/tjenesten, og omfanget av den</ListItem>
              <ListItem>Tidspunktet for sted av levering av varen/tjenesten</ListItem>
              <ListItem>
                Eventuell merverdiavgift (moms) og andre avgifter knyttet til transaksjonen som kreves spesifisert i lov
                eller forskrift. Merverdiavgift skal angis i norske kroner.
              </ListItem>
            </ul>
            <p className="text-online-blue-300 text-sm mt-4 italic">
              *I noen tilfeller krever Onlines drift innkjop av varer og/eller tjenester fra utlandet. I slike tilfeller
              skal det alltid avklares med okonomiansvarlig for Online for kjopet gjennomfores.
            </p>
          </Section>

          <Section title="Utlegg med kort fra Online">
            <p className="text-online-blue-100 leading-relaxed mb-4">
              Utlegg pa vegne av Online skal alltid avklares med sin okonomiansvarlig for kjopet gjennomfores. Ved
              utlegg med ett av Online sine kort skal kvitteringsskjema med gyldig kvittering som beskrevet ovenfor
              sendes til Bankom innen tre virkedager. Hvis man ikke far kvittering fra kjopet ma man ta kontakt med
              selger for a skaffe gyldig kvittering. Hvis dette ikke fungerer skal man varsle umiddelbart til ansvarlig
              person i Bankom.
            </p>
            <div className="bg-online-orange/10 border border-online-orange/30 rounded-lg p-4 mt-4">
              <p className="text-online-orange font-medium">
                Ved utlegg med ett av Online sine kort skal det sendes ett kvitteringsskjema for hvert kjop.
              </p>
            </div>
          </Section>

          <Section title="Utlegg med eget bankkort">
            <p className="text-online-blue-100 leading-relaxed mb-4">
              Frist for innsending av kvitteringsskjema for utlegg pa egen regning er 7 dager. Kvitteringsskjema kan
              sendes inn etter dette ved god grunn og avtale med okonomiansvarlig fra sin komite. Hvis kvitteringsskjema
              kommer etter denne fristen uten avtale kan ikke Bankom garantere at pengene blir tilbakebetalt.
            </p>
            <p className="text-online-blue-100 leading-relaxed">
              Ved utlegg med eget bankkort kan man sende kvitteringsskjema for flere utlegg i ett skjema. Da er det
              viktig at alle kvitteringene for utlegget blir med, og at summen i skjemaet stemmer med hva som er lagt
              ut.
            </p>
          </Section>

          <Section title="Brudd pa frister" isLast>
            <p className="text-online-blue-100 leading-relaxed">
              Ved brudd pa noen av fristene ovenfor skal det gis vinstraff i ansvarlig komite for anledningen betalingen
              er for.
            </p>
          </Section>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-online-blue-200 mb-4">
            Har du sporsmal? Ta kontakt med Bankom.
          </p>
          <a
            href="mailto:bankom@online.ntnu.no"
            className="inline-block bg-online-orange text-online-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors"
          >
            Kontakt Bankom
          </a>
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

function Section({ title, children, isLast = false }: SectionProps) {
  return (
    <section className={isLast ? "" : "mb-8 pb-8 border-b border-online-blue-500/30"}>
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-online-orange rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  );
}

interface ListItemProps {
  children: React.ReactNode;
}

function ListItem({ children }: ListItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-1.5 h-1.5 bg-online-orange rounded-full mt-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}
