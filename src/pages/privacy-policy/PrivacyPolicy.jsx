import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
        <Navbar />
        <div className="bg-white p-6 md:p-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p>Last updated: July 06, 2024</p>
        <p className="mb-4">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>
        <p className="mb-4">
            We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Interpretation and Definitions</h2>
        
        <h3 className="text-xl font-bold mt-6 mb-2">Interpretation</h3>
        <p className="mb-4">
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-2">Definitions</h3>
        <p className="mb-4">
            For the purposes of this Privacy Policy:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
            <li><strong>Application</strong> refers to Gotruhub, the software program provided by the Company.</li>
            <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to AC & AC RESOURCES, 1 Ike Nduba Rd Isiachelle Village, Igbakwu.</li>
            <li><strong>Country</strong> refers to: Nigeria.</li>
            <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
            <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
            <li><strong>Service</strong> refers to the Application.</li>
            <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</li>
            <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
            <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
        </ul>

        {/* Add more sections similarly */}

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
            If you have any questions about this Privacy Policy, You can contact us:
        </p>
        <ul className="list-disc list-inside mb-4">
            <li>By visiting this page on our website: <a href="https://ac-and-ac-resources.vercel.app/" className="text-blue-600 underline">https://ac-and-ac-resources.vercel.app/</a></li>
        </ul>
        </div>
        <Footer />
    </div>
  );
};

export default PrivacyPolicy;