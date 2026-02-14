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
            <h1 className="mb-6 text-3xl font-bold">Privacy Notice</h1>
            <p className="mb-4 text-gray-600">
                This Privacy Notice for AC & AC RESOURCES (doing business as AC & AC RESOURCES ) ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:
                Download and use our mobile application (Gotruhub ), or any other application of ours that links to this Privacy Notice
                Engage with us in other related ways, including any sales, marketing, or events <br />
                Please note that bank account details and other sensitive financial information are not collected directly through the Gotruhub mobile application. Such information is collected by authorised institutions through our web-based application, and the mobile application only accesses and uses the data via a shared backend infrastructure to facilitate approved activities and service delivery. <br />
                Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a className='font-bold text-blue-600' href="mailto:office@gotruhub.online">office@gotruhub.online</a>
            </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
            <p className="mb-2 font-bold text-gray-700">SUMMARY OF KEY POINTS</p>
            <p className="mb-4 text-gray-700">
                This summary highlights the key points of this Privacy Notice. You can find more details by reviewing the relevant sections below.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>What personal information do we process?</span> <br /> We process limited personal information provided by institutions and authorised users when the Services are used. The type of information depends on how the Services are accessed and the features used.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>Do we process any sensitive personal information?</span> <br />
               We may process limited categories of sensitive information, such as student-related data, only where necessary for service delivery and in accordance with applicable law or institutional authorisation.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>Do we collect any information from third parties?</span> <br /> 
                We do not collect personal information from marketing partners or social media platforms. Payment-related data is processed by our third-party payment processor, Paystack.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>How do we process your information?</span> <br /> 
                We process information to operate, manage, secure, and improve the Services, communicate service-related updates, and comply with legal obligations. Processing is carried out only where there is a lawful basis.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>When and with whom do we share personal information?</span> <br /> 
               We share personal information only in limited circumstances, such as with service providers supporting the operation of the Services or where required by law.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>How do we keep your information safe?</span> <br /> 
                 We use appropriate technical and organisational safeguards to protect personal information. However, no method of transmission or storage is completely secure.
            </p>
            {/* <p className="mb-4 text-gray-700">
                <span className='font-[600]'>In what situations and with which types of parties do we share personal information?</span> <br /> We may share information in specific situations and with specific categories of third parties. Learn more about when and with whom we share your personal information.
            </p> */}
            {/* <p className="mb-4 text-gray-700">
                <span className='font-[600]'>How do we keep your information safe?</span> <br /> We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.
            </p> */}
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>What are your privacy rights?</span> <br /> 
               Depending on your location, you may have rights regarding your personal information under applicable data protection laws.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>How do you exercise your rights?</span> <br /> You may exercise your rights by visiting <a target='_blank' className='font-bold text-blue-600' href=" https://gotruhub.online ">https://gotruhub.online</a> , or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
            <p className="mb-4 text-gray-700">
                <span className='font-[600]'>Want to learn more about what we do with any information we collect?</span> <br /> Review the Privacy Notice in full.
            </p>
        </div>

        {/* Table of Contents */}
        <div className="p-6 mb-8 rounded-lg bg-gray-50">
            <h2 className="mb-4 text-xl font-bold">Table of Contents</h2>
            <ol className="pl-6 space-y-2 text-gray-700 list-decimal">
            <li><a className="hover:text-blue-600">What Information Do We Collect?</a></li>
            <li><a className="hover:text-blue-600">How Do We Process Your Information?</a></li>
            <li><a className="hover:text-blue-600">When and With Whom Do We Share Your Personal Information?</a></li>
            <li><a className="hover:text-blue-600">How Do We Handle Your Social Logins?</a></li>
            <li><a className="hover:text-blue-600">How Long Do We Keep Your Information?</a></li>
            <li><a className="hover:text-blue-600">How Do We Keep Your Information Safe?</a></li>
            <li><a className="hover:text-blue-600">What Are Your Privacy Rights?</a></li>
            <li><a className="hover:text-blue-600">Controls for Do-Not-Track Features</a></li>
            <li><a className="hover:text-blue-600">Do We Make Updates to This Notice?</a></li>
            <li><a className="hover:text-blue-600">How Can You Contact Us About This Notice?</a></li>
            <li><a className="hover:text-blue-600">How Can You Review, Update, or Delete the Data We Collect From You?</a></li>
            </ol>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
           <section id="section1">
            <h2 className="mb-6 text-2xl font-bold">1. WHAT INFORMATION DO WE COLLECT?</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="mb-3 text-xl font-semibold">Personal Information You Disclose to Us</h3>
                    <p className="mb-4 italic">
                        In Short: We collect limited personal information provided by institutions and end-users as necessary to operate the Services.
                    </p>

                    <div className="space-y-4">
                        <p className="text-gray-700">
                            We collect personal information provided when institutions create and manage accounts, and when end-users interact with the Services as authorised by their institution.
                        </p>
                    </div>

                    <div className="mt-6">
                        <h4 className="mb-2">
                            Personal Information Collected
                        </h4>
                        <p className="mb-3 text-gray-700">
                            Depending on how the Services are used, we may process:
                        </p>

                        <ul className="pl-6 space-y-1 text-gray-700 list-disc">
                            <li>Names</li>
                            <li>Phone numbers</li>
                            <li>Email addresses</li>
                            <li>Usernames or account identifiers</li>
                            <li>Limited contact or authentication data</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <p className="font-semibold">Student and Institutional Data</p>
                        <p className="text-gray-700">
                            We may process student-related and institutional data submitted by schools solely for service delivery, record management, and reporting purposes, in accordance with the institution’s instructions.
                        </p>
                    </div>

                    <div className="mt-6">
                        <p className="font-semibold">Payment Data</p>
                        <p className="text-gray-700">
                            Where payments are made, necessary transaction data is processed by our third-party payment processor, Paystack. We do not collect or store debit or credit card details. Payment data is handled in accordance with Paystack’s privacy policy.
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <p>
                            <span className="font-[600]">Application Data.</span> <br />
                            If you use our mobile applications, we may collect the following where you grant permission:
                        </p>

                        <p>
                            Geolocation data (to support location-based features);
                        </p>

                        <p>
                            Device access data (such as camera or storage access, where required); and
                        </p>

                        <p>
                            Push notification preferences (for service-related alerts).
                        </p>

                        <p>
                            This information is used solely to operate, secure, and improve the Services.
                        </p>

                        <p>
                            All information provided must be accurate and kept up to date.
                        </p>
                    </div>
                </div>
            </div>
          </section>


           <section id="section2">
            <h2 className="mb-6 text-2xl font-bold">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>

            <div className="space-y-6">
                <div className="space-y-4">
                    <p className="text-gray-700">
                        We process personal information only as necessary to operate, administer, secure, and improve the Services, and to comply with applicable laws, including the Nigeria Data Protection Regulation (NDPR) and the General Data Protection Regulation (GDPR).
                    </p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="space-y-2">
                        <p className="font-semibold">Schools and Other Institutions</p>
                        <p>
                            We process information provided by schools for onboarding, account management, service delivery, payment processing, receipt generation, reporting, and record-keeping. Bank account details supplied by schools are processed solely for the purpose of receiving payments and maintaining accurate financial records.
                        </p>

                        <p className="font-semibold">End-Users</p>
                        <p>
                            We process limited personal information generated through use of the Services to enable platform functionality, support transactions and service interactions, deliver notifications and administrative communications, ensure security and prevent misuse, and improve system performance.
                        </p>

                        <p className="font-semibold">General Purposes</p>
                        <p>
                            Across all users, information may be processed to:
                        </p>

                        <ul className="pl-6 space-y-1 text-gray-700 list-disc">
                            <li>Maintain the security and integrity of the Services;</li>
                            <li>Communicate service-related information;</li>
                            <li>Monitor and improve operational performance; and</li>
                            <li>Comply with legal and regulatory obligations.</li>
                        </ul>
                    </div>
                </div>

                <p className="my-8">
                    We do not process personal information for purposes incompatible with the operation of the Services.
                </p>
            </div>
            </section>


            <section id="section3">
                <h2 className="mb-6 text-2xl font-bold">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            We share personal information only where necessary to operate the Services, comply with legal obligations, or support core business functions, and only with parties subject to appropriate confidentiality and data protection obligations.
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="space-y-2">

                            <p className="font-semibold">Service Providers</p>
                            <p>
                                We may share limited personal information with trusted third-party service providers who perform services on our behalf, including:
                            </p>

                            <ul className="pl-6 space-y-1 text-gray-700 list-disc">
                                <li>Cloud hosting and data storage providers;</li>
                                <li>Payment processors and financial service providers (for transaction processing);</li>
                                <li>Communication and notification service providers; and</li>
                                <li>Technical and infrastructure support providers.</li>
                            </ul>

                            <p>
                                These parties process information solely on our instructions and for the purposes described in this Privacy Notice.
                            </p>

                            <p className="font-semibold">Legal and Regulatory Requirements</p>
                            <p>
                                We may disclose personal information where required to comply with applicable laws, regulations, lawful requests, or government authorities.
                            </p>

                            <p className="font-semibold">Business Transfers</p>
                            <p>
                                In the event of a merger, acquisition, restructuring, or sale of all or part of our business, personal information may be transferred as part of that transaction, subject to applicable data protection laws.
                            </p>

                            <p>
                                We do not sell personal information and do not share personal information with third parties for independent marketing purposes.
                            </p>

                            <p className="font-semibold">Other Users</p>
                            <p>
                                Our Services are not designed for public user profiles or open user-to-user data sharing. Personal information provided by schools or end-users is not publicly visible to other users, except where limited information is required to enable specific service-related interactions within the platform.
                            </p>

                            <p className="font-semibold">Business Partners</p>
                            <p>
                                We do not share personal information with business partners for advertising, promotional, or independent commercial purposes.
                            </p>

                        </div>
                    </div>
                </div>
           </section>



          <section id="section4">
            <h2 className="mb-6 text-2xl font-bold">4. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>

            <div className="space-y-6">
                <div className="space-y-4">
                    <p className="text-gray-700">
                        We retain personal information only for as long as necessary to fulfil the purposes described in this Privacy Notice, unless a longer retention period is required or permitted by applicable law (including tax, accounting, or regulatory obligations).
                    </p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="space-y-2">
                        <p>
                            Where there is no ongoing legitimate business need to process personal information, we will delete or anonymise it, or securely store and restrict it until deletion is possible.
                        </p>
                    </div>
                </div>
            </div>
          </section>


            <section id="section5">
                <h2 className="mb-6 text-2xl font-bold">5. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            We use appropriate technical and organisational measures to protect personal information processed through the Services.
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security. Users access the Services and transmit information at their own risk.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section6">
                <h2 className="mb-6 text-2xl font-bold">6. WHAT ARE YOUR PRIVACY RIGHTS?</h2>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Depending on applicable data protection laws, you may have rights to access, correct, update, or delete your personal information, and to withdraw consent where processing is based on consent.
                        </p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="space-y-2">
                            <p className="font-[500]">Account Information</p>

                            <p>
                                Account holders may review or update their account information through account settings or by contacting us. Requests to deactivate or delete an account will be handled in accordance with applicable legal and regulatory requirements. Certain information may be retained where necessary to comply with legal obligations or prevent fraud.
                            </p>

                            <p>
                                To exercise your privacy rights or make enquiries, please contact us using the details provided in the section “HOW CAN YOU CONTACT US ABOUT THIS NOTICE?”.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="section7">
                <h2 className="mb-6 text-2xl font-bold">7. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                <p>
                    Some browsers and devices offer Do-Not-Track (DNT) settings. As there is no established industry standard for recognising DNT signals, our Services do not currently respond to such signals. We do not engage in cross-site tracking for advertising purposes.
                </p>

                <p>
                    If applicable standards are adopted in the future, we will update this Privacy Notice accordingly.
                </p>
            </section>

            <section id="section8">
                <h2 className="mb-6 text-2xl font-bold">8. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        {/* <div className='space-y-2'>
                            <p>Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                        </div> */}
                        <div className='space-y-2'>
                           <p>
                            We may update this Privacy Notice from time to time to reflect changes to our Services, legal requirements, or data protection practices. The revised version will be indicated by an updated date.
                            Where changes are material, we will provide appropriate notice through the Services or other reasonable means.
                           </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section9">
                <h2 className="mb-6 text-2xl font-bold">9. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                       <p>If you have questions or concerns about this Privacy Notice or our data protection practices, you may contact us using the contact details provided in the introduction to this Privacy Notice.</p>
                    </div>

                    {/* <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                        </div>
                        <div className='space-y-2'>
                            <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
                        </div>
                    </div> */}
                </div>
            </section>

            <section id="section10">
                <h2 className="mb-6 text-2xl font-bold">10. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>

                <div className="space-y-6">
                    <div>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                Personal data processed through the Services is primarily controlled by the institution (such as a school) with which you are registered. Requests to access, update, or delete personal information should be directed to your institution in the first instance.
                            </p>
                        </div>

                        <div className="mt-6 space-y-3">
                            <p>
                                We may act on such requests only where instructed or authorised by the relevant institution, or where required by applicable law. Any processing of such requests will be handled in accordance with the rights described in Section 7 (What Are Your Privacy Rights?) and applicable data protection laws.
                            </p>

                            <p>
                                For general privacy enquiries, please use the contact details provided in the introduction to this Privacy Notice.
                            </p>
                        </div>
                    </div>
                </div>
           </section>

            </div>
        </div>
        <Footer />
    </div>
  );
};

export default PrivacyPolicy;