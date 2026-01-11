const courseContent = {
  "Web Development": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Launch into modern web creation with HTML, CSS, and JavaScript. Build responsive, interactive websites from scratch.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Publish professional websites</li>
      <li>Work with frameworks like React</li>
      <li>Debug and optimize for browsers</li>
      <li>Deploy and maintain projects</li>
      <li>Step into freelance or junior dev roles</li>
    </ul>
  `,
  "Data Science": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Turn raw data into insights using Python and machine learning. Learn to analyze, visualize, and predict.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Master Pandas and NumPy</li>
      <li>Build predictive models with scikit-learn</li>
      <li>Visualize with Matplotlib and Seaborn</li>
      <li>Understand data ethics and bias</li>
      <li>Prepare for analyst or data scientist roles</li>
    </ul>
  `,
  Cybersecurity: `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Defend digital assets with ethical hacking and network security. Learn to identify threats and protect systems.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Spot vulnerabilities and secure networks</li>
      <li>Use tools like Wireshark and Kali Linux</li>
      <li>Apply encryption and secure protocols</li>
      <li>Run penetration testing scenarios</li>
      <li>Prepare for cybersecurity certifications</li>
    </ul>
  `,
  "Software Engineering": ` <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
   <p class="text-gray-700 leading-relaxed"> Design, build, and maintain scalable software systems. Learn modern engineering practices for reliable applications. </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6> <ul class="list-disc list-inside space-y-1 text-gray-700"> <li>Apply software design principles</li>
     <li>Use version control with Git</li> <li>Write and run automated tests</li> <li>Deploy applications to the cloud</li>
   <li>Prepare for developer and engineering roles</li> </ul> `,

  "Project Management": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Lead projects with confidence using Agile, Scrum, and classic frameworks. Deliver results on time and budget.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Create timelines and Gantt charts</li>
      <li>Manage teams and resources effectively</li>
      <li>Use tools like Trello and Asana</li>
      <li>Handle risk and change management</li>
      <li>Prepare for PMP or Agile certifications</li>
    </ul>
  `,
  "Business Administration": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Gain a solid foundation in business operations, finance, and strategic decision-making for leadership roles.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Understand financial statements and budgeting</li>
      <li>Explore marketing and operations strategies</li>
      <li>Develop leadership and communication skills</li>
      <li>Apply business ethics and governance</li>
      <li>Prepare for managerial or entrepreneurial roles</li>
    </ul>
  `,
  "Human Resources": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Manage talent, build culture, and drive organizational growth. Equip yourself to lead HR initiatives.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Recruit and onboard effectively</li>
      <li>Design performance and reward systems</li>
      <li>Handle conflict and employee relations</li>
      <li>Understand labor laws and compliance</li>
      <li>Prepare for HR generalist or specialist roles</li>
    </ul>
  `,

  "Leadership & Strategy": ` <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6> <p class="text-gray-700 leading-relaxed"> Develop leadership skills and strategic thinking to guide organizations toward growth and innovation. </p> <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6> <ul class="list-disc list-inside space-y-1 text-gray-700"> <li>Lead teams with vision</li> <li>Make strategic decisions</li> <li>Manage organizational change</li> <li>Communicate effectively with stakeholders</li> <li>Prepare for leadership roles</li> </ul> `,
  "Graphic Design": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Master visual communication, typography, and layout design. Create compelling graphics for print and digital.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Design logos, posters, and brand assets</li>
      <li>Work with Adobe Illustrator and Photoshop</li>
      <li>Apply color theory and composition</li>
      <li>Build a professional design portfolio</li>
      <li>Prepare for freelance or agency roles</li>
    </ul>
  `,
  "UI/UX Design": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Design intuitive interfaces and seamless user experiences for web and mobile platforms.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Create wireframes and prototypes</li>
      <li>Use tools like Figma and Adobe XD</li>
      <li>Conduct user research and testing</li>
      <li>Design for accessibility and responsiveness</li>
      <li>Prepare for UI/UX design roles</li>
    </ul>
  `,
  "Digital Branding": `
    <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
    <p class="text-gray-700 leading-relaxed">
      Craft powerful brand identities and digital campaigns that resonate across platforms.
    </p>
    <h6 class="text-lg font-semibold text-violet-700 mt-4">What You'll Achieve</h6>
    <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Develop brand strategy and voice</li>
      <li>Create visual identity systems</li>
      <li>Design for social media and marketing</li>
      <li>Understand audience targeting</li>
      <li>Prepare for branding or strategist roles</li>
    </ul>
  `,
  "Creative Media": ` <h6 class="text-lg font-semibold text-violet-700 mt-4">Course Overview</h6>
   <p class="text-gray-700 leading-relaxed">
    Produce engaging multimedia content with video, audio, and motion graphics for digital platforms. </p>
     <h6 class="text-lg font-semibold text-violet-700 mt-4">
     What You'll Achieve</h6> <ul class="list-disc list-inside space-y-1 text-gray-700">
      <li>Edit videos and audio professionally</li> 
      <li>Create motion graphics and animations</li> 
      <li>Tell stories through multimedia</li> 
      <li>Build a creative portfolio</li> 
      <li>Prepare for media and content roles</li> </ul> `,
};
