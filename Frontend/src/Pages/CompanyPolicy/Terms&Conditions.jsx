import React from 'react';

function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Terms & Conditions</h1>
      <p className="text-gray-700 mb-4">
        Welcome to our Terms & Conditions page. Please read the following terms carefully before using our services.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>By accessing this website, you agree to comply with these terms.</li>
        <li>Unauthorized use of this website may give rise to a claim for damages.</li>
        <li>We reserve the right to update these terms at any time without notice.</li>
      </ul>
    </div>
  );
}

export default TermsAndConditions;