import Button from "../components/universal/Button";
import happy from "../resources/frontpage/happy.png";
import { useAuth } from "react-oidc-context";

export default function FrontPage() {
  const { isAuthenticated, signinRedirect } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-online-blue to-online-blue-700">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Autobank
            </h1>
            <p className="text-online-blue-200 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
              Trenger du a sende inn kvitteringer for personlige utlegg? 
              Autobank er et hjelpemiddel for studenter i Online som onsker a soke om 
              okonomisk stotte eller sende inn kvitteringer. Onlines okonomiansvarlige 
              vil behandle dine henvendelser fortlopende.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {!isAuthenticated && (
                <button
                  onClick={() => signinRedirect()}
                  className="bg-online-orange text-online-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors shadow-lg"
                >
                  Logg inn
                </button>
              )}
              {isAuthenticated && (
                <a
                  href="/kvittering"
                  className="bg-online-orange text-online-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors shadow-lg"
                >
                  Send inn kvittering
                </a>
              )}
              <a
                href="/faq"
                className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Les FAQ
              </a>
              <a
                href="mailto:appkom@online.ntnu.no"
                className="text-online-orange hover:text-online-orange-300 font-medium transition-colors"
              >
                Kontakt oss
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 hidden lg:flex justify-center">
            <img
              src={happy}
              alt="Glad person"
              className="money-honey w-72 h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-online-blue-700/50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-white text-center mb-12">
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              number="1"
              title="Logg inn"
              description="Bruk din Online-konto for a logge inn pa Autobank"
            />
            <FeatureCard
              number="2"
              title="Last opp kvittering"
              description="Fyll ut skjemaet og last opp bilde av kvitteringen din"
            />
            <FeatureCard
              number="3"
              title="Fa refusjon"
              description="Bankom behandler foresporselen og utbetaler pengene"
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-online-orange/10 border-y border-online-orange/20 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-online-blue-100 text-lg">
            Folg med i din profil for a se statusoppdateringer pa dine saker.
          </p>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

function FeatureCard({ number, title, description }: FeatureCardProps) {
  return (
    <div className="bg-online-blue-600/50 backdrop-blur-sm rounded-xl p-6 text-center border border-online-blue-500/30">
      <div className="w-12 h-12 bg-online-orange text-online-blue-900 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-online-blue-200 text-sm">{description}</p>
    </div>
  );
}
