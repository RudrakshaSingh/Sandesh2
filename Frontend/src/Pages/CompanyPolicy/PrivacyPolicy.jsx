import React, { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  // Sections data structure for easy navigation and collapsible sections
  const sections = [
    { id: 'interpretation', title: 'Interpretation and Definitions', level: 1 },
    { id: 'data-collection', title: 'Collecting and Using Your Personal Data', level: 1 },
    { id: 'data-types', title: 'Types of Data Collected', level: 2, parent: 'data-collection' },
    { id: 'personal-data', title: 'Personal Data', level: 3, parent: 'data-types' },
    { id: 'usage-data', title: 'Usage Data', level: 3, parent: 'data-types' },
    { id: 'third-party', title: 'Information from Third-Party Social Media Services', level: 3, parent: 'data-types' },
    { id: 'tracking', title: 'Tracking Technologies and Cookies', level: 3, parent: 'data-types' },
    { id: 'data-use', title: 'Use of Your Personal Data', level: 2, parent: 'data-collection' },
    { id: 'data-retention', title: 'Retention of Your Personal Data', level: 2, parent: 'data-collection' },
    { id: 'data-transfer', title: 'Transfer of Your Personal Data', level: 2, parent: 'data-collection' },
    { id: 'data-deletion', title: 'Delete Your Personal Data', level: 2, parent: 'data-collection' },
    { id: 'data-disclosure', title: 'Disclosure of Your Personal Data', level: 2, parent: 'data-collection' },
    { id: 'data-security', title: 'Security of Your Personal Data', level: 2, parent: 'data-collection' },
    { id: 'children', title: 'Children\'s Privacy', level: 1 },
    { id: 'other-links', title: 'Links to Other Websites', level: 1 },
    { id: 'policy-changes', title: 'Changes to this Privacy Policy', level: 1 },
    { id: 'contact', title: 'Contact Us', level: 1 },
  ];

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: April 09, 2025</p>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-gray-700">
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection 
          and use of information in accordance with this Privacy Policy.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Table of Contents</h2>
        <nav>
          <ul className="space-y-1">
            {sections.filter(section => section.level === 1).map(section => (
              <li key={section.id}>
                <button 
                  onClick={() => document.getElementById(section.id).scrollIntoView({ behavior: 'smooth' })}
                  className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content sections */}
      <div className="space-y-8">
        <section id="interpretation" className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-3 bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('interpretation')}
          >
            <h2 className="text-2xl font-bold text-blue-800">Interpretation and Definitions</h2>
            <span className="text-blue-800 text-2xl">{activeSection === 'interpretation' ? '−' : '+'}</span>
          </div>
          
          {activeSection === 'interpretation' && (
            <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Interpretation</h3>
              <p className="mb-4 text-gray-700">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. 
                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Definitions</h3>
              <p className="mb-2 text-gray-700">For the purposes of this Privacy Policy:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
                <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Sandesh, GGSIPU, USICT, d block - 303.</li>
                <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                <li><strong>Country</strong> refers to: Delhi, India</li>
                <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
              </ul>
            </div>
          )}
        </section>

        <section id="data-collection" className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-3 bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('data-collection')}
          >
            <h2 className="text-2xl font-bold text-blue-800">Collecting and Using Your Personal Data</h2>
            <span className="text-blue-800 text-2xl">{activeSection === 'data-collection' ? '−' : '+'}</span>
          </div>
          
          {activeSection === 'data-collection' && (
            <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
              <section id="data-types" className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Types of Data Collected</h3>
                
                <div id="personal-data" className="mb-3 pl-4 border-l-4 border-blue-200">
                  <h4 className="text-lg font-medium mb-2 text-blue-600">Personal Data</h4>
                  <p className="mb-2 text-gray-700">
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. 
                    Personally identifiable information may include, but is not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Usage Data</li>
                  </ul>
                </div>
                
                <div id="usage-data" className="mb-3 pl-4 border-l-4 border-blue-200">
                  <h4 className="text-lg font-medium mb-2 text-blue-600">Usage Data</h4>
                  <p className="mb-2 text-gray-700">Usage Data is collected automatically when using the Service.</p>
                  <p className="mb-2 text-gray-700">
                    Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), 
                    browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, 
                    the time spent on those pages, unique device identifiers and other diagnostic data.
                  </p>
                </div>
                
                {/* More sections would continue here */}
              </section>
              
              <section id="data-use" className="mb-4">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Use of Your Personal Data</h3>
                <p className="mb-2 text-gray-700">The Company may use Personal Data for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.
                  </li>
                  <li>
                    <strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. 
                    The Personal Data You provide can give You access to different functionalities of the Service 
                    that are available to You as a registered user.
                  </li>
                  {/* More list items would continue here */}
                </ul>
              </section>
              
              {/* More sections would continue here */}
            </div>
          )}
        </section>

        {/* More main sections would continue here */}

        <section id="contact" className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer p-3 bg-gray-100 rounded-t-lg"
            onClick={() => toggleSection('contact')}
          >
            <h2 className="text-2xl font-bold text-blue-800">Contact Us</h2>
            <span className="text-blue-800 text-2xl">{activeSection === 'contact' ? '−' : '+'}</span>
          </div>
          
          {activeSection === 'contact' && (
            <div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
              <p className="mb-2 text-gray-700">If you have any questions about this Privacy Policy, You can contact us:</p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>By email: <a href="mailto:Info@sandesh.com" className="text-blue-600 hover:underline">Info@sandesh.com</a></li>
              </ul>
            </div>
          )}
        </section>
      </div>

      <footer className="mt-8 pt-6 border-t text-center text-gray-500 text-sm">
        <p>© 2025 Sandesh. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;