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
                This Privacy Notice for AC & AC RESOURCES (doing business as AC & AC RESOURCES ) ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:
                Download and use our mobile application (Gotruhub ), or any other application of ours that links to this Privacy Notice
                Engage with us in other related ways, including any sales, marketing, or events <br />
                Please note that bank account details and other sensitive financial information are not collected directly through the Gotruhub mobile application. Such information is collected by authorised institutions through our web-based application, and the mobile application only accesses and uses the data via a shared backend infrastructure to facilitate approved activities and service delivery. <br />
                Questions or concerns? Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a className='text-blue-600 font-bold' href="mailto:office@gotruhub.online">office@gotruhub.online</a>
            </p>
        </div>

        {/* Introduction */}
        <div className="mb-8">
            <p className="text-gray-700 font-bold mb-2">SUMMARY OF KEY POINTS</p>
            <p className="text-gray-700 mb-4">
                This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>What personal information do we process?</span> <br /> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Personal and financial information, including bank account details where applicable, are primarily collected through our web-based platforms by authorized institutions, not directly through our mobile application. Learn more about personal information you disclose to us. Learn more about personal information you disclose to us.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>Do we process any sensitive personal information?</span> <br /> Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. The Gotruhub mobile application does not directly collect sensitive personal or bank account information; it only accesses such data via a shared backend infrastructure to facilitate approved services. Learn more about sensitive information we process.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>Do we collect any information from third parties?</span> <br /> We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more about information collected from other sources.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>How do we process your information?</span> <br /> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>In what situations and with which types of parties do we share personal information?</span> We may share information in specific situations and with specific categories of third parties. Learn more about when and with whom we share your personal information.
            </p>
            {/* <p className="text-gray-700 mb-4">
                <span className='font-[600]'>How do we keep your information safe?</span> <br />  We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.
            </p> */}
            {/* <p className="text-gray-700 mb-4">
                <span className='font-[600]'>In what situations and with which types of parties do we share personal information?</span> <br /> We may share information in specific situations and with specific categories of third parties. Learn more about when and with whom we share your personal information.
            </p> */}
            {/* <p className="text-gray-700 mb-4">
                <span className='font-[600]'>How do we keep your information safe?</span> <br /> We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.
            </p> */}
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>What are your rights?</span> <br /> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>How do you exercise your rights?</span> <br /> The easiest way to exercise your rights is by visiting <a target='_blank' className='text-blue-600 font-bold' href="https://www.acandac.online/">https://www.acandac.online/</a> , or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
            </p>
            <p className="text-gray-700 mb-4">
                <span className='font-[600]'>Want to learn more about what we do with any information we collect?</span> <br /> Review the Privacy Notice in full.
            </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
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
                <h2 className="text-2xl font-bold mb-6">1. What Information Do We Collect?</h2>
            
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Personal information you disclose to us</h3>
                        <p className="italic mb-4">In Short: We collect personal information that you provide to us. This information is primarily collected through our web-based platforms and related services, not directly through the Gotruhub mobile application.</p>
                        
                        <div className="space-y-4">
                            <p className="text-gray-700">We collect personal information that you voluntarily provide to us when you register on the Services, Where the mobile application is used, it accesses such information through a shared backend infrastructure to facilitate approved activities.</p>
                        </div>

                        <div className="mt-6">
                            <h4 className="mb-2">Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</h4>
                            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                <li>Names</li>
                                <li>Phone numbers</li>
                                <li>Email addresses</li>
                                <li>Job titles</li>
                                <li>Usernames</li>
                                <li>Contact or authentication data</li>
                                <li>Sensitive Information </li> When necessary, with your consent or as otherwise permitted by applicable law, 
                                    we process the following categories of sensitive information:
                                <li>Biometric data</li>
                                <li>Student data</li>
                            </ul>
                        </div>
                        <div className='mt-6'>
                            <p className="font-semibold">Payment Data</p>
                            <p className="text-gray-700">We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. This payment information is collected and processed through our web-based platforms and is not collected directly through the Gotruhub mobile application. All payment data is handled and stored by Paystack . You may find their privacy notice link(s) here:</p>
                            <a target='_blank' className='text-blue-500' href="https://paystack.com/privacy/merchant#:~:text=Paystack%20does%20not%20sell%2C%20trade,Service%20providers">Paystack privacy policy</a>
                        </div>

                        {/* <div className="mt-6">
                            <p>
                                Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called 'HOW DO WE HANDLE YOUR SOCIAL LOGINS?' below.
                            </p>
                        </div> */}
                        <div className="mt-6 space-y-3">
                            <p>
                                <span className='font-[600]'>Application Data.</span> <br /> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
                            </p>
                            <p>
                                Geolocation Information. We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. We do not use geolocation data to collect or infer bank account details or other sensitive financial information. If you wish to change our access or permissions, you may do so in your device's settings.
                            </p>
                            <p>
                                Mobile Device Access. We may request access or permission to certain features from your mobile device, including your mobile device's camera, storage, and other features. Access to these features does not include access to banking applications, financial credentials, or payment instruments. If you wish to change our access or permissions, you may do so in your device's settings.
                            </p>
                            <p>
                                Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.
                            </p>
                            <p>
                                This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes. It is not used to collect, store, or process bank account details or sensitive financial information.
                            </p>
                            <p>
                                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
                            </p>
                            <div>
                                <p className='font-semibold'>
                                    Institutional Bank Account Information
                                </p>
                                <p>
                                    Authorized institutions using our web-based services may provide bank account details for the purpose of receiving payments and settlements. This information is collected and stored through our web platform and is not collected through the Gotruhub mobile application.
                                </p>
                                <br />
                                <p>
                                    Such bank account information is used solely for payment settlement purposes and is not shared with unauthorized parties. We do not collect or store end-user (student or parent) bank account details.
                                </p>
                            </div>
                            {/* <div>
                                <p className='font-semibold'>
                                    Google API
                                </p>
                                <p>
                                    Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Information collected from other sources
                                </p>
                                <p>
                                    In Short: We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.
                                </p>
                            </div>
                            <p>
                                In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behaviour data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for purposes of targeted advertising and event promotion.
                            </p>
                            <p>
                                If you interact with us on a social media platform using your social media account (e.g. Facebook or X), we receive personal information about you from such platforms such as your name, email address, and gender. You may have the right to withdraw your consent to processing your personal information. Learn more about withdrawing your consent. Any personal information that we collect from your social media account depends on your social media account's privacy settings. Please note that their own use of your information is not governed by this Privacy Notice.
                            </p> */}
                        </div>
                    </div>
                </div>
            </section>

            <section id="section2">
                <h2 className="text-2xl font-bold mb-6">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>
                                We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
                            </p>
                            <p>
                                To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.
                            </p>
                            <p>
                                To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.
                            </p>
                            <p>
                                To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
                            </p>
                            <p>
                                To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.
                            </p>
                            <p>
                                To fulfil and manage your orders. We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.
                            </p>
                        </div>
                    </div>
                    <p className='my-8'>
                        To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.
                    </p>
                    <div className="space-y-3">
                        <p>
                            To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.
                        </p>
                        <p>
                            To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.
                        </p>
                        <p>
                            To comply with our legal obligations. We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.
                        </p>
                    </div>
                </div>
            </section>

            <section id="section3">
                <h2 className="text-2xl font-bold mb-6">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: We may share information in specific situations described in this section and/or with the following categories of third parties.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>
                                Vendors, Consultants, and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors, or agents ('third parties') who perform services for us or on our behalf and require access to such information to do that work.
                            </p>
                            <p>
                                The categories of third parties we may share personal information with are as follows:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                <li>Cloud Computing Services</li>
                                <li>Communication & Collaboration Tools</li>
                                <li>Data Storage Service Providers</li>
                                <li>Finance & Accounting Tools</li>
                                <li>Government Entities</li>
                                <li>Order Fulfilment Service Providers</li>
                                <li>Payment Processors</li>
                                <li>Website Hosting Service Providers</li>
                            </ul>
                            <p>
                                We also may need to share your personal information in the following situations:
                            </p>
                            <p>
                                <span className='font-[500]'>Business Transfers.</span> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                            </p>
                            <p>
                                <span className='font-[500]'>Affiliates.</span> We may share your information with our affiliates, in which case we will require those affiliates to honour this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
                            </p>
                            <p>
                                <span className='font-[500]'>Business Partners.</span> We may share your information with our business partners to offer you certain products, services, or promotions.
                            </p>
                            <p>
                                <span className='font-[500]'>Other Users.</span> When you share personal information or otherwise interact with public areas of the Services, such personal information may be viewed by all users and may be publicly made available outside the Services in perpetuity. If you interact with other users of our Services and register for our Services through a social network (such as Facebook), your contacts on the social network will see your name, profile photo, and descriptions of your activity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile.
                            </p>
                            <p>
                                <span className='font-[500]'>Offer Wall.</span> Our application(s) may display a third-party hosted 'offer wall'. Such an offer wall allows third-party advertisers to offer virtual currency, gifts, or other items to users in return for the acceptance and completion of an advertisement offer. Such an offer wall may appear in our application(s) and be displayed to you based on certain data, such as your geographic area or demographic information. When you click on an offer wall, you will be brought to an external website belonging to other persons and will leave our application(s). A unique identifier, such as your user ID, will be shared with the offer wall provider in order to prevent fraud and properly credit your account with the relevant reward.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section4">
                <h2 className="text-2xl font-bold mb-6">4. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>
                                Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                            </p>
                            <p>
                                We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section5">
                <h2 className="text-2xl font-bold mb-6">5. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>
                                We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.
                            </p>
                            <p>
                                When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section6">
                <h2 className="text-2xl font-bold mb-6">6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: We aim to protect your personal information through a system of organisational and technical security measures.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section7">
                <h2 className="text-2xl font-bold mb-6">7. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short:  You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                        </div>
                        <div className='space-y-2'>
                            <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
                        </div>
                        <div>
                            <p className='font-[500]'>Account Information</p>
                            <div className='space-y-2'>
                                <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
                                <p>Log in to your account settings and update your user account.</p>
                                <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
                                <p>If you have questions or comments about your privacy rights, you may email us at <a href="mailto:acandacdomain@gmail.com">acandacdomain@gmail.com</a> .</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section8">
                <h2 className="text-2xl font-bold mb-6">8. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                <p>
                    Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
                </p>
            </section>

            <section id="section9">
                <h2 className="text-2xl font-bold mb-6">9. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                        </div>
                        <div className='space-y-2'>
                            <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section10">
                <h2 className="text-2xl font-bold mb-6">10. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            
                <div className="space-y-6">
                    <div className="space-y-4">
                        <p className="text-gray-700">If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at <a className='font-[500] text-blue-500' href="mailto:abuchisworld33@gmail.com">abuchisworld33@gmail.com</a>, by phone at <a className='font-[500] text-blue-500' href="tel:+2349020060037"></a>, or contact us by post at:</p>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className='space-y-2'>
                            <p>Withdrawing your consent: If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                        </div>
                        <div className='space-y-2'>
                            <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section11">
                <h2 className="text-2xl font-bold mb-6">11. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
            
                <div className="space-y-6">
                    <div>
                        <div className="space-y-4">
                            <p className="text-gray-700">You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.</p>
                        </div>

                        <div className="mt-6 space-y-3">
                            <p>
                                Application Data. If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
                            </p>
                            <p>i. Your Rights Under GDPR (For EU Users)</p>
                            <div className='pl-5 space-y-3'>
                                <p>
                                    If you are in the European Economic Area (EEA), you have the right to:
                                </p>
                                <p>
                                    Access your personal data
                                </p>
                                <p>
                                    Correct inaccurate data
                                </p>
                                <p>
                                    Delete your data (“Right to be Forgotten”)
                                </p>
                                <p>
                                    Restrict processing of your data
                                </p>
                                <p>
                                    Withdraw consent at any time
                                </p>
                                <p>
                                    Data portability (receive a copy of your data in a structured format)
                                </p>
                                <p>
                                    To exercise your rights, contact us at [your contact email].
                                </p>
                                <p>
                                    If you interact with us on a social media platform using your social media account (e.g. Facebook or X), we receive personal information about you from such platforms such as your name, email address, and gender. You may have the right to withdraw your consent to processing your personal information. Learn more about withdrawing your consent. Any personal information that we collect from your social media account depends on your social media account's privacy settings. Please note that their own use of your information is not governed by this Privacy Notice.
                                </p>
                            </div>
                            <p>
                                ii. Your Rights Under CCPA (For California Users)
                            </p>
                            <div className='pl-5 space-y-3'>
                                <p>
                                    If you are a California resident, you have the right to:
                                </p>
                                <p>
                                    Know what personal data we collect and how we use it
                                </p>
                                <p>
                                    Request deletion of your personal data
                                </p>
                                <p>
                                    Opt out of data selling (we do not sell personal data)
                                </p>
                                <p>
                                    Non-discrimination for exercising your rights
                                </p>
                            </div>
                            <p>
                                To submit a request, contact us at [your contact email].
                            </p>
                            <p>
                                If you have questions or comments about your privacy rights, you may email us at <a className='text-blue-500 font-500' href="mailto:acandacdomain@gmail.com">acandacdomain@gmail.com</a>
                            </p>
                            <p>
                                To request to review, update, or delete your personal information, please contact the Organization/institution where you belong and was registered at.
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