import React from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const PrivacyPolicy = () => {
  return (
    <div>
        <Navbar />
        <div className="lg:px-[100px] md:px-[60px] px-[16px] py-8">
        {/* Header Section */}
        <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6">Privacy Notice</h1>
            <p className="text-gray-600 mb-4">
            For AC & AC RESOURCES (doing business as AC & AC RESOURCES) ('we', 'us', or 'our')
            </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
            <p className="text-gray-700 mb-4">
            This Privacy Notice describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li className="mb-2">Download and use our mobile application (Gotruhub), or any other application of ours that links to this Privacy Notice</li>
            <li className="mb-2">Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li><a href="#section1" className="hover:text-blue-600">What Information Do We Collect?</a></li>
            <li><a href="#section2" className="hover:text-blue-600">How Do We Process Your Information?</a></li>
            <li><a href="#section3" className="hover:text-blue-600">When and With Whom Do We Share Your Personal Information?</a></li>
            <li><a href="#section4" className="hover:text-blue-600">How Do We Handle Your Social Logins?</a></li>
            <li><a href="#section5" className="hover:text-blue-600">How Long Do We Keep Your Information?</a></li>
            <li><a href="#section6" className="hover:text-blue-600">How Do We Keep Your Information Safe?</a></li>
            <li><a href="#section7" className="hover:text-blue-600">What Are Your Privacy Rights?</a></li>
            <li><a href="#section8" className="hover:text-blue-600">Controls for Do-Not-Track Features</a></li>
            <li><a href="#section9" className="hover:text-blue-600">Do We Make Updates to This Notice?</a></li>
            <li><a href="#section10" className="hover:text-blue-600">How Can You Contact Us About This Notice?</a></li>
            <li><a href="#section11" className="hover:text-blue-600">How Can You Review, Update, or Delete the Data We Collect From You?</a></li>
            </ol>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
            <section id="section1">
            <h2 className="text-2xl font-bold mb-6">1. What Information Do We Collect?</h2>
            
            <div className="space-y-6">
                <div>
                <h3 className="text-xl font-semibold mb-3">Personal information you disclose to us</h3>
                <p className="italic mb-4">In Short: We collect personal information that you provide to us.</p>
                
                <div className="space-y-4">
                    <p className="text-gray-700">We collect personal information that you voluntarily provide to us when you:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Register on the Services</li>
                    <li>Express interest in our products and Services</li>
                    <li>Participate in activities on the Services</li>
                    <li>Contact us</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Personal Information Provided by You:</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Names</li>
                    <li>Phone numbers</li>
                    <li>Email addresses</li>
                    <li>Job titles</li>
                    <li>Usernames</li>
                    <li>Contact or authentication data</li>
                    <li>Debit/credit card numbers</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Sensitive Information:</h4>
                    <p className="text-gray-700">When necessary, with your consent or as otherwise permitted by applicable law, we process:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                    <li>Biometric data</li>
                    <li>Student data</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Application Data:</h4>
                    <p className="text-gray-700">If you use our application(s), we may collect:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Geolocation Information</li>
                    <li>Mobile Device Access</li>
                    <li>Push Notifications</li>
                    </ul>
                </div>
                </div>

                <div>
                <h3 className="text-xl font-semibold mb-3">Google API</h3>
                <p className="text-gray-700">Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.</p>
                </div>
            </div>
            </section>

            <section id="section2">
            <h2 className="text-2xl font-bold mb-6">2. How Do We Process Your Information?</h2>
            <div className="space-y-4 text-gray-700">
                <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                
                <p className="font-semibold mt-4">We process your personal information for a variety of reasons, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and authentication</li>
                <li>To deliver and facilitate delivery of services</li>
                <li>To respond to user inquiries/offer support</li>
                <li>To send administrative information</li>
                <li>To fulfil and manage your orders</li>
                <li>To enable user-to-user communications</li>
                <li>To protect our Services</li>
                <li>To evaluate and improve our Services</li>
                <li>To comply with our legal obligations</li>
                </ul>
            </div>
            </section>

            <section id="section3">
            <h2 className="text-2xl font-bold mb-6">3. When and With Whom Do We Share Your Personal Information?</h2>
            <div className="space-y-4 text-gray-700">
                <p>We may share information with these categories of third parties:</p>
                <ul className="list-disc pl-6 space-y-2">
                <li>Cloud Computing Services</li>
                <li>Communication & Collaboration Tools</li>
                <li>Data Storage Service Providers</li>
                <li>Finance & Accounting Tools</li>
                <li>Government Entities</li>
                <li>Order Fulfilment Service Providers</li>
                <li>Payment Processors</li>
                <li>Website Hosting Service Providers</li>
                </ul>

                <div className="mt-6">
                <p className="font-semibold">We may also share information in these situations:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Business Transfers</li>
                    <li>Affiliates</li>
                    <li>Business Partners</li>
                    <li>Other Users</li>
                    <li>Offer Wall</li>
                </ul>
                </div>
            </div>
            </section>

            <section id="section4">
            <h2 className="text-2xl font-bold mb-6">4. How Do We Handle Your Social Logins?</h2>
            <div className="space-y-4 text-gray-700">
                <p>Our Services offer you the ability to register and log in using your third-party social media account details. Where you choose to do this, we will receive certain profile information about you from your social media provider.</p>
                <p>The profile information we receive may vary depending on the social media provider concerned, but will often include your:</p>
                <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Friends list</li>
                <li>Profile picture</li>
                </ul>
            </div>
            </section>

            <section id="section5">
            <h2 className="text-2xl font-bold mb-6">5. How Long Do We Keep Your Information?</h2>
            <div className="space-y-4 text-gray-700">
                <p>We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information.</p>
            </div>
            </section>

            <section id="section6">
            <h2 className="text-2xl font-bold mb-6">6. How Do We Keep Your Information Safe?</h2>
            <div className="space-y-4 text-gray-700">
                <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process.</p>
                <p>However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
            </div>
            </section>

            <section id="section7">
            <h2 className="text-2xl font-bold mb-6">7. What Are Your Privacy Rights?</h2>
            <div className="space-y-6">
                <div>
                <h3 className="text-xl font-semibold mb-3">Your Rights Under GDPR (For EU Users)</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate data</li>
                    <li>Delete your data ("Right to be Forgotten")</li>
                    <li>Restrict processing of your data</li>
                    <li>Withdraw consent at any time</li>
                    <li>Data portability</li>
                </ul>
                </div>

                <div>
                <h3 className="text-xl font-semibold mb-3">Your Rights Under CCPA (For California Users)</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Know what personal data we collect and how we use it</li>
                    <li>Request deletion of your personal data</li>
                    <li>Opt out of data selling</li>
                    <li>Non-discrimination for exercising your rights</li>
                </ul>
                </div>
            </div>
            </section>

            <section id="section8">
            <h2 className="text-2xl font-bold mb-6">8. Controls for Do-Not-Track Features</h2>
            <div className="text-gray-700">
                <p>Most web browsers and some mobile operating systems include a Do-Not-Track ('DNT') feature. At this stage, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>
            </div>
            </section>

            <section id="section9">
            <h2 className="text-2xl font-bold mb-6">9. Do We Make Updates to This Notice?</h2>
            <div className="text-gray-700">
                <p>Yes, we will update this notice as necessary to stay compliant with relevant laws. We may notify you either by prominently posting a notice of such changes or by directly sending you a notification.</p>
            </div>
            </section>

            <section id="section10">
            <h2 className="text-2xl font-bold mb-6">10. How Can You Contact Us About This Notice?</h2>
            <div className="bg-gray-50 p-6 rounded-lg text-gray-700">
                <p className="mb-4">If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO):</p>
                <ul className="space-y-2">
                <li>Email: <a href="mailto:abuchisworld33@gmail.com" className="text-blue-600 hover:underline">abuchisworld33@gmail.com</a></li>
                <li>Phone: +234 9020060037</li>
                <li>Address:<br />
                    AC & AC RESOURCES<br />
                    Data Protection Officer<br />
                    #1 Ike Nduba Road,<br />
                    Igbakwu, Anambra 433112<br />
                    Nigeria
                </li>
                </ul>
            </div>
            </section>

            <section id="section11">
            <h2 className="text-2xl font-bold mb-6">11. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
            <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                <li>Request access to the personal information we collect from you</li>
                <li>Request that we correct any information you believe is inaccurate</li>
                <li>Request that we delete your personal information</li>
                <li>Withdraw your consent to our processing of your personal information</li>
                </ul>
                <p className="mt-4">To submit a request, please visit: <a href="http://www.acandacresources.com" className="text-blue-600 hover:underline">http://www.acandacresources.com</a></p>
            </div>
            </section>
        </div>
        </div>
        <Footer />
    </div>
  );
};

export default PrivacyPolicy;