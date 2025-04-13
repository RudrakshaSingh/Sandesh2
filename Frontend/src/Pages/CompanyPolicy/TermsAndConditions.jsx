// Pages/TermsAndConditions.jsx
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4">
            <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8 md:p-10">
                {/* Header with Back Button */}
                <div className="flex items-center mb-6">
                    <Link
                        to="/"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="Go back to home"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
                    Sandesh Terms & Conditions
                </h1>

                {/* Introduction */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Welcome to Sandesh, your secure messaging platform. By using our services, you agree to these Terms
                    and Conditions. Please read them carefully to understand your rights and responsibilities.
                </p>

                {/* Terms List */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Account Usage</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>You must be at least 13 years old to create an account on Sandesh.</li>
                            <li>Provide accurate information during registration (email, name, etc.).</li>
                            <li>
                                You are responsible for maintaining the security of your account credentials. Notify us
                                immediately at{" "}
                                <a
                                    href="mailto:support@sandesh.com"
                                    className="text-blue-600 hover:underline"
                                    aria-label="Contact support"
                                >
                                    support@sandesh.com
                                </a>{" "}
                                if you suspect unauthorized access.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Messaging and Content</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>
                                Do not send unlawful, harmful, or offensive messages through Sandesh, including spam or
                                phishing attempts.
                            </li>
                            <li>
                                You retain ownership of your messages, but grant Sandesh a license to store and deliver
                                them securely.
                            </li>
                            <li>We may remove content that violates these terms without notice.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Contacts and Invitations</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>
                                Syncing contacts is optional. Sandesh will only access contacts with your explicit
                                permission.
                            </li>
                            <li>Invitations sent via Sandesh must respect recipients’ privacy and consent.</li>
                            <li>
                                You can manage or delete your contacts at any time through your profile settings.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Privacy and Data</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>
                                Your data is handled per our{" "}
                                <Link
                                    to="/privacy-policy"
                                    className="text-blue-600 hover:underline"
                                    aria-label="View privacy policy"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </li>
                            <li>We use encryption to protect your messages and profile information.</li>
                            <li>
                                You can delete your account at any time, removing all associated data (see{" "}
                                <Link
                                    to="/user/delete"
                                    className="text-blue-600 hover:underline"
                                    aria-label="Delete account"
                                >
                                    Account Deletion
                                </Link>
                                ).
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Changes to Terms</h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>We may update these terms to reflect new features or legal requirements.</li>
                            <li>Changes will be posted here, and continued use constitutes acceptance.</li>
                            <li>
                                For major updates, we’ll notify you via email or in-app alerts.
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Footer Note */}
                <p className="mt-8 text-gray-500 text-sm">
                    Questions? Contact us at{" "}
                    <a
                        href="mailto:support@sandesh.com"
                        className="text-blue-600 hover:underline"
                        aria-label="Contact support"
                    >
                        support@sandesh.com
                    </a>
                    . Last updated: April 2025.
                </p>
            </div>
        </div>
    );
};

export default TermsAndConditions;