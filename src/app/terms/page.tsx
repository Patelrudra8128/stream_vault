import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | StreamVault",
  description: "Terms of Service and Usage Guidelines for StreamVault.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl glass p-8 sm:p-12">
        <h1 className="mb-8 text-3xl font-extrabold text-white sm:text-4xl">
          Terms of Service
        </h1>
        
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">1. Acceptance of Terms & Age Restrictions</h2>
            <p>
              By accessing and using StreamVault, you agree to be bound by these Terms of Service. 
              **You must be at least 18 years of age or the age of majority in your jurisdiction, whichever is older, to access or use this website.** 
              This website indexes and displays links to mature, adult, and sexually explicit content. If you are under 18, do not consent to viewing adult materials, 
              or find such material offensive, you must exit this website immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">2. Nature of Service & Adult Content Indexing</h2>
            <p>
              StreamVault operates strictly as an index and search directory for mature and adult content publicly available on the internet. 
              We do not host, upload, record, or stream any video content, photographs, or galleries on our own servers. 
              All external links and gallery previews are hosted by independent, non-affiliated third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">3. Third-Party Links & Content Disclaimer</h2>
            <p>
              Our directory lists links leading to external websites containing mature or sexually explicit material. We do not control, monitor, 
              endorse, or accept responsibility for the content, advertisements, privacy policies, safety, or practices of any third-party websites or services. 
              You acknowledge and agree that StreamVault shall not be held liable for any damages, losses, or issues arising from your access to such external links.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">4. User Compliance & Conduct</h2>
            <p>
              You agree to use StreamVault only for personal, lawful purposes. You represent that viewing adult material is legal in your community or jurisdiction. 
              You must not attempt to bypass access screens, scrape content inappropriately, or use our indexing service for any unlawful activities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">5. Intellectual Property & DMCA removal</h2>
            <p>
              All trademarks and indexing lists are the property of their respective owners. Since we only index third-party links, 
              removal requests for original videos must be sent directly to the respective host platforms. If you wish to request the removal of an index link 
              from StreamVault, please contact us with the specific URLs for review.
            </p>
          </section>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-6 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
