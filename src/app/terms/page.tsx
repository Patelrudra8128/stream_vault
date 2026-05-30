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
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using StreamVault, you agree to be bound by these Terms of Service. 
              If you do not agree with any part of these terms, you must not use our website. 
              You must be at least 18 years of age to use this service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">2. Nature of Service</h2>
            <p>
              StreamVault is a directory and search engine for publicly available video content. 
              We do not host, upload, or control any of the video content indexed on our site. 
              All video content is hosted by third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">3. External Links</h2>
            <p>
              Our website contains links to third-party websites. We are not responsible for the 
              content, privacy policies, or practices of any third-party websites or services. 
              You acknowledge and agree that StreamVault shall not be liable for any damage or loss 
              caused by your use of such external content.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">4. User Conduct</h2>
            <p>
              You agree to use StreamVault only for lawful purposes. You must not use our service 
              in any way that causes, or may cause, damage to the website or impairment of the 
              availability or accessibility of the service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any 
              changes by updating the date at the bottom of this page. Your continued use of the 
              site after such changes constitutes your acceptance of the new Terms of Service.
            </p>
          </section>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
