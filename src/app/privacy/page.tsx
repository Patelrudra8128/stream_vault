import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | StreamVault",
  description: "Privacy Policy for StreamVault.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl glass p-8 sm:p-12">
        <h1 className="mb-8 text-3xl font-extrabold text-white sm:text-4xl">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">1. Information We Collect</h2>
            <p>
              StreamVault is committed to protecting your privacy. We do not require registration or personal identification to browse 
              our directory. We automatically collect non-personally identifiable server log information, such as browser version, 
              referring URLs, and date/time stamps to monitor traffic levels and maintain directory operation.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">2. Local Storage & Age-Verification Cookies</h2>
            <p>
              To ensure compliance with age restrictions, we use standard functional cookies and `sessionStorage` strictly to store whether you have 
              acknowledged the 18+ adult warning screen. The functional cookie (`streamvault_age_accepted`) is retained on your browser so you are not 
              prompted on every visit. No personally identifiable information is linked to these cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">3. Third-Party Networks & Advertising</h2>
            <p>
              We index links hosted by independent third parties. Once you click an external link to view a video or gallery on a source site, 
              you are subject to their specific policies. External adult content host sites frequently utilize advertising networks, cookies, 
              and tracking pixels. StreamVault has no control over, and assumes no responsibility for, scripts or pop-ups deployed by third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">4. Data Safety</h2>
            <p>
              We implement basic security controls to protect the integrity of our directory. However, because communications are transmitted 
              via the public internet, we cannot guarantee absolute transmission security. We advise users to employ ad blockers and security plugins 
              for personal safety while exploring third-party links.
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
