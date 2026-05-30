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
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold text-white">1. Information We Collect</h2>
            <p>
              StreamVault respects your privacy. We do not require you to create an account to browse 
              our directory. We may collect non-personally identifiable information such as browser type, 
              referring site, and the date and time of each visitor request to better understand how 
              visitors use our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">2. Local Storage & Cookies</h2>
            <p>
              We use standard browser features like `localStorage` strictly for functional purposes, 
              such as remembering whether you have accepted our 18+ adult content warning. This ensures 
              a smoother user experience without repeatedly prompting you.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">3. Third-Party Content</h2>
            <p>
              Because StreamVault indexes content hosted elsewhere, clicking on a video link will take 
              you to a third-party website. These external websites have their own privacy policies and 
              may use cookies or tracking technologies. We have no control over these third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-white">4. Data Security</h2>
            <p>
              While we strive to use commercially acceptable means to protect your personal information, 
              no method of transmission over the internet or method of electronic storage is 100% secure. 
              We cannot guarantee its absolute security.
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
