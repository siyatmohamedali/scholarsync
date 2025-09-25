
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="prose prose-lg mx-auto max-w-4xl text-foreground/90">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Privacy Policy</h1>
        <p>
          <em>Last Updated: {new Date().toLocaleDateString()}</em>
        </p>

        <p>
          Welcome to ScholarSync ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2 className="font-headline">Collection of Your Information</h2>
        <p>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </p>
        <ul>
          <li>
            <strong>Personal Data:</strong> Personally identifiable information, such as your name, and email address, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Site.
          </li>
          <li>
            <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
          </li>
          <li>
            <strong>Financial Data:</strong> We do not collect or store any financial information. All financial transactions are handled by our third-party payment processors.
          </li>
        </ul>

        <h2 className="font-headline">Use of Your Information</h2>
        <p>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Notify you of updates to the Site.</li>
        </ul>
        
        <h2 className="font-headline">Third-Party Websites and Advertisers</h2>
        <p>
          The Site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
        </p>
        <p>
          We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to the Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.
        </p>

        <h2 className="font-headline">Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us.
        </p>
      </div>
    </div>
  );
}
