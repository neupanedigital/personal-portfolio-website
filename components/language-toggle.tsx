'use client';

import {useEffect, useRef, useState} from 'react';

type Language = 'en' | 'ne';

// This is written as native Nepali website copy rather than a word-for-word translation.
const translations: Record<string, string> = {
  'Home':'गृहपृष्ठ','About Me':'मेरो परिचय','Services':'सेवाहरू','Blog':'लेखहरू','Contact':'सम्पर्क',
  'Book a Free Consultation Call':'निःशुल्क परामर्श लिनुहोस्','Close menu':'मेनु बन्द गर्नुहोस्','Menu':'मेनु',
  'HUMAN INSIGHT. AI ADVANTAGE.':'मानवीय बुझाइ। कृत्रिम बुद्धिमत्ताको साथ।','AI MARKETING & STRATEGY':'कृत्रिम बुद्धिमत्ता र बजार रणनीति',
  'Speaker at a podium, with a marketing approach connecting your business, customers, strategy, and growth':'व्यवसाय, ग्राहक, रणनीति र उन्नतिलाई जोड्ने बजार दृष्टिकोण प्रस्तुत गर्दै मञ्चमा वक्ता','Professional consultation in an office':'कार्यालयमा व्यावसायिक परामर्श','Office portrait holding a coffee mug':'कफीको कप समातेको कार्यालयीय तस्बिर','Facebook':'फेसबुक','Neupane Digital Service home':'Neupane Digital Service को गृहपृष्ठ','All rights reserved.':'सर्वाधिकार सुरक्षित।',
  'Smarter marketing.':'बुझेर गरिएको बजार प्रवर्द्धन।','Stronger connections.':'बलिया सम्बन्धहरू।','Real opportunity.':'वास्तविक अवसर।',
  'Grow your business with AI-powered digital marketing.':'कृत्रिम बुद्धिमत्ताको सहयोगमा आफ्नो व्यवसायको डिजिटल उपस्थिति बढाउनुहोस्।',
  'I help small and medium businesses attract the right customers, strengthen their online presence, and turn more enquiries into sales.':'साना तथा मध्यम व्यवसायलाई सही ग्राहकसम्म पुग्न, डिजिटल उपस्थिति बलियो बनाउन र जिज्ञासालाई बिक्रीमा बदल्न म सहयोग गर्छु।',
  'A customized marketing plan you can start implementing immediately.':'आजैदेखि लागू गर्न सकिने तपाईंको व्यवसायअनुकूल योजना।','Explore My Services':'मेरा सेवाहरू हेर्नुहोस्',
  'A CONNECTED APPROACH':'सम्बन्ध जोड्ने दृष्टिकोण','YOUR BUSINESS':'तपाईंको व्यवसाय','Built around':'केन्द्रमा राखेर','your growth':'तपाईंको उन्नति',
  '01 / UNDERSTAND':'०१ / बुझौँ','Your customers':'तपाईंका ग्राहक','02 / CONNECT':'०२ / जोडौँ','The right strategy':'उपयुक्त रणनीति','03 / IMPROVE':'०३ / सुधारौँ','Meaningful progress':'देखिने प्रगति',
  'Powered by AI.':'कृत्रिम बुद्धिमत्ताको सहयोग।','Guided by human judgment.':'मानवीय विवेकको मार्गदर्शन।','Built for small & medium businesses':'साना तथा मध्यम व्यवसायका लागि','Business first. Tools second.':'पहिले व्यवसाय। त्यसपछि उपकरण।','Clear plans, practical next steps':'स्पष्ट योजना। काम लाग्ने अर्को कदम।',

  'LESS GUESSWORK. MORE DIRECTION.':'अनुमान कम। दिशा स्पष्ट।','Good at your business.':'तपाईं आफ्नो व्यवसायमा निपुण हुनुहुन्छ।','Ready to get better at marketing?':'अब बजार प्रवर्द्धन अझ राम्रो बनाउने बेला हो?',
  'Running a business is already a full-time job. Your marketing should bring clarity, not another overwhelming to-do list.':'व्यवसाय चलाउनु आफैँमा पूर्णकालीन जिम्मेवारी हो। बजार प्रवर्द्धनले थप बोझ होइन, काम गर्ने स्पष्ट बाटो दिनुपर्छ।',
  'Hard to find online? Build a more discoverable presence.':'अनलाइन भेटिन गाह्रो छ? ग्राहकले सजिलै भेट्ने उपस्थिति बनाऔँ।','Inconsistent enquiries? Connect your message to the right people.':'सोधपुछ नियमित छैन? सही मानिससम्म सही सन्देश पुर्‍याऔँ।','Activity without sales? Improve the path from interest to action.':'गतिविधि धेरै, बिक्री कम? रुचिलाई निर्णयसम्म पुर्‍याउने बाटो सुधारौँ।','Short on time? Focus on the work that matters most.':'समय कम छ? सबैभन्दा असरदार काममा ध्यान दिऔँ।','Unsure about AI? Start with tools that solve an actual problem.':'कृत्रिम बुद्धिमत्ता कसरी प्रयोग गर्ने अन्योल छ? वास्तविक समस्या समाधान गर्ने ठाउँबाट सुरु गरौँ।',

  'HOW I CAN HELP':'म कसरी सहयोग गर्न सक्छु','The right support.':'सही सहयोग।','At the right stage.':'सही समयमा।','Connected marketing services, shaped around your business—not a one-size-fits-all checklist.':'तपाईंको व्यवसायको अवस्था र लक्ष्यअनुसार मिलाइएका सेवा—सबैलाई एउटै उपाय होइन।','Explore service':'सेवा हेर्नुहोस्',
  'AI Marketing Strategy & Consulting':'कृत्रिम बुद्धिमत्ता आधारित बजार रणनीति तथा परामर्श','A clear direction. A practical plan. The right tools for your business.':'स्पष्ट दिशा, काम गर्न मिल्ने योजना र तपाईंको व्यवसायलाई सुहाउने साधन।',
  'SEO & Content Marketing':'खोज प्रणाली अनुकूलन तथा सामग्री प्रवर्द्धन','Help the right customers find you when they’re looking for answers.':'ग्राहकले समाधान खोज्दा तपाईंको व्यवसाय सजिलै भेटिने बनाउनुहोस्।',
  'Social Media Strategy & Management':'सामाजिक सञ्जाल रणनीति तथा व्यवस्थापन','Show up consistently with content that gives people a reason to care.':'मानिसलाई चासो लाग्ने सामग्रीसहित नियमित र अर्थपूर्ण उपस्थिति बनाउनुहोस्।',
  'Paid Advertising & Lead Generation':'भुक्तानी विज्ञापन तथा सम्भावित ग्राहक पहिचान','Reach a relevant audience and turn interest into meaningful enquiries.':'सम्बन्धित दर्शकसम्म पुगेर रुचिलाई उपयोगी सोधपुछमा बदल्नुहोस्।',
  'Email Marketing & Automation':'विद्युतीय पत्र तथा स्वचालित सम्पर्क','Follow up thoughtfully and nurture customer relationships over time.':'समयमै आत्मीय सम्पर्क राख्दै ग्राहकसँगको सम्बन्ध बलियो बनाउनुहोस्।',
  'Website & Landing Page Optimization':'वेबसाइट तथा प्रवेश पृष्ठ सुधार','Make the journey from curious visitor to confident enquiry simpler.':'जिज्ञासु आगन्तुकलाई विश्वस्त भएर सम्पर्क गर्न सजिलो बाटो दिनुहोस्।',

  'A THOUGHTFUL WAY TO GROW':'सोचेर अघि बढ्ने बाटो','Your goals lead.':'तपाईंका लक्ष्य अगाडि।','The technology follows.':'प्रविधि त्यसको साधन।','AI can make marketing work more efficient. Human judgment makes it relevant. I bring the two together with a clear focus on your customers and your business.':'कृत्रिम बुद्धिमत्ताले काम छरितो बनाउन सक्छ, तर त्यसलाई तपाईंको व्यवसायसँग मिलाउने काम मानवीय विवेकले गर्छ। म दुवैलाई तपाईंका ग्राहक र लक्ष्यमा केन्द्रित गर्छु।','More about my approach':'मेरो काम गर्ने तरिकाबारे',
  'Strategy customized to your business':'तपाईंको व्यवसायअनुसारको रणनीति','Practical AI, with human review':'मानवीय जाँचसहितको व्यावहारिक कृत्रिम बुद्धिमत्ता','Measurable goals and useful progress reviews':'मापन गर्न मिल्ने लक्ष्य र नियमित समीक्षा','Clear communication without the jargon':'गाह्रो शब्दबिना स्पष्ट संवाद','Actionable recommendations you can use':'तुरुन्त काममा लगाउन मिल्ने सुझाव','Support that fits your time and resources':'तपाईंको समय र स्रोतअनुसार सहयोग',

  'FROM CONVERSATION TO ACTION':'कुराकानीदेखि कामसम्म','A clear next step. Then another.':'एउटा स्पष्ट कदम। त्यसपछि अर्को।','Let’s talk':'कुराकानी गरौँ','Book your free consultation and share what you want to improve.':'निःशुल्क परामर्श लिएर सुधार गर्न चाहेको कुरा साझा गर्नुहोस्।','Understand your business':'तपाईंको व्यवसाय बुझौँ','Review your customers, goals, and current marketing together.':'तपाईंका ग्राहक, लक्ष्य र अहिलेको बजार प्रवर्द्धन सँगै हेरौँ।','Build your plan':'योजना बनाऔँ','Receive a customized digital marketing plan with practical priorities.':'तपाईंको व्यवसायका प्राथमिकतासहितको व्यावहारिक डिजिटल योजना पाउनुहोस्।','Put it into action':'कार्यान्वयन गरौँ','Implement with your team or discuss optional ongoing support.':'आफ्नो टोलीसँग लागू गर्नुहोस् वा निरन्तर सहयोगबारे छलफल गर्नुहोस्।',

  'THE PERSON BEHIND THE PLAN':'योजनाको पछाडिको व्यक्ति','Marketing that starts':'पहिले सुन्ने','with listening.':'त्यसपछि सुझाउने बजार प्रवर्द्धन।','I believe useful advice should leave you knowing what to do next—and why it matters.':'राम्रो सुझावपछि अब के गर्ने र त्यो किन महत्वपूर्ण छ भन्ने तपाईंलाई स्पष्ट हुनुपर्छ भन्ने मेरो विश्वास छ।','Get to know my approach':'मेरो काम गर्ने शैली बुझ्नुहोस्','IDEAS YOU CAN PUT TO WORK':'काममा लगाउन मिल्ने विचार','A little clarity for':'तपाईंको अर्को कदमका लागि','your next move.':'थोरै स्पष्टता।','Explore the blog':'लेखहरू हेर्नुहोस्',

  'BEFORE WE TALK':'कुराकानीअघि','A few questions, answered.':'केही सामान्य प्रश्नका उत्तर','Who are your services for?':'यी सेवाहरू कसका लागि हुन्?','What happens during the free consultation?':'निःशुल्क परामर्शमा के हुन्छ?','Do I need to understand AI to work with you?':'तपाईंसँग काम गर्न कृत्रिम बुद्धिमत्ता बुझ्नैपर्छ?','Can you help if I already have a website or campaigns?':'वेबसाइट वा अभियान पहिल्यै छ भने पनि सहयोग गर्न सक्नुहुन्छ?','Can I implement the plan myself?':'योजना म आफैँ लागू गर्न सक्छु?','How do we measure progress?':'प्रगति कसरी थाहा पाउने?',
  'YOUR NEXT CHAPTER STARTS HERE':'तपाईंको अर्को अध्याय यहीँबाट','Let’s find your next opportunity for growth.':'तपाईंको उन्नतिको अर्को अवसर खोजौँ।','Practical advice. A clear direction. No pressure.':'काम लाग्ने सुझाव। स्पष्ट दिशा। कुनै दबाब छैन।','Marketing with a clear purpose (cta).':'स्पष्ट उद्देश्य भएको बजार प्रवर्द्धन।','Thoughtful marketing. Meaningful connections.':'सोचेर गरिएको बजार प्रवर्द्धन। अर्थपूर्ण सम्बन्ध।','Social profiles':'सामाजिक सञ्जाल',

  'ABOUT ME':'मेरो परिचय','Human understanding.':'मानवीय बुझाइ।','A smarter way forward.':'बुझेर अघि बढ्ने बाटो।','Making effective AI-powered marketing accessible to small and medium businesses.':'साना तथा मध्यम व्यवसायका लागि प्रभावकारी डिजिटल बजार प्रवर्द्धन सहज बनाउने।','Your business comes first.':'तपाईंको व्यवसाय नै पहिलो प्राथमिकता हो।','My mission is to help business owners make confident marketing decisions without needing to become experts in every tool. We start with your customers, your goals, and the resources you have.':'हरेक उपकरणको विशेषज्ञ बन्नु नपरी व्यवसाय मालिकले ढुक्क भएर निर्णय गर्न सकून् भन्ने मेरो उद्देश्य हो। हामी तपाईंका ग्राहक, लक्ष्य र उपलब्ध स्रोतबाट सुरु गर्छौँ।','Then we choose the strategies and tools that fit. The result is a plan that connects daily marketing work to clear business priorities.':'त्यसपछि तपाईंलाई मिल्ने रणनीति र साधन छान्छौँ। यसरी दैनिक कामलाई व्यवसायका स्पष्ट प्राथमिकतासँग जोड्ने योजना बन्छ।','HOW I APPROACH THE WORK':'म कामलाई कसरी अघि बढाउँछु','Clear thinking. Close collaboration.':'स्पष्ट सोच। नजिकको सहकार्य।','Listen before recommending':'सुझाव दिनुअघि ध्यान दिएर सुन्ने','Use AI with intention':'उद्देश्य पूरा हुने गरी कृत्रिम बुद्धिमत्ता प्रयोग गर्ने','Make progress visible':'प्रगति देखिने बनाउने',
  'Your customers, offer, and current challenges shape the work. Understanding comes before choosing a channel or a tool.':'तपाईंका ग्राहक, प्रस्ताव र अहिलेका चुनौतीले कामको दिशा तय गर्छन्। माध्यम वा साधन छान्नुअघि समस्या बुझ्नु पहिलो काम हो।','AI can support research, drafting, and routine tasks. Human review keeps the work accurate, relevant, and true to your business.':'कृत्रिम बुद्धिमत्ताले अनुसन्धान, मस्यौदा र दोहोरिने काममा साथ दिन सक्छ। मानवीय जाँचले सामग्री सही, उपयोगी र तपाईंको व्यवसायअनुकूल राख्छ।','We agree on useful measures, communicate clearly, and adjust the plan as we learn. You should understand what is happening and why.':'हामी उपयोगी मापदण्ड तय गर्छौँ, खुलेर संवाद गर्छौँ र सिकाइअनुसार योजना सुधार्छौँ। के भइरहेको छ र किन भइरहेको छ तपाईंलाई सधैँ थाहा हुन्छ।',

  'SERVICES':'सेवाहरू','Marketing support.':'बजार प्रवर्द्धनमा साथ।','Built around your business.':'तपाईंको व्यवसायलाई केन्द्रमा राखेर।','A connected approach to attracting customers, building trust, and turning interest into enquiries.':'ग्राहक आकर्षित गर्ने, विश्वास जगाउने र रुचिलाई सोधपुछमा बदल्ने एकीकृत तरिका।','Recommendations are customized to your goals, audience, resources, and current marketing. We’ll discuss your needs before recommending a scope of work.':'सुझाव तपाईंका लक्ष्य, ग्राहक, स्रोत र अहिलेको अवस्थाअनुसार तयार हुन्छन्। कामको दायरा तय गर्नुअघि तपाईंका आवश्यकताबारे कुरा गर्छौँ।','The challenge':'अहिलेको चुनौती','What we can work on':'हामीले सँगै सुधार्न सक्ने कुरा','A good fit for':'कसका लागि उपयोगी','The intended benefit':'अपेक्षित फाइदा',
  'Too many marketing options and no clear starting point.':'धेरै विकल्प छन्, तर कहाँबाट सुरु गर्ने स्पष्ट छैन।','Review your audience, goals, and current marketing':'ग्राहक, लक्ष्य र अहिलेको बजार प्रवर्द्धन समीक्षा गर्ने','Prioritize opportunities around your time and budget':'तपाईंको समय र बजेटअनुसार अवसरलाई प्राथमिकता दिने','Create an actionable roadmap and identify useful AI workflows':'कार्यान्वयन गर्न मिल्ने मार्गचित्र र उपयोगी कृत्रिम बुद्धिमत्ता कार्यप्रवाह बनाउने','Owners who want a focused plan before investing more in marketing.':'थप लगानी गर्नुअघि केन्द्रित योजना चाहने व्यवसायी।','Give your marketing a clear direction and make better-informed decisions.':'बजार प्रवर्द्धनलाई स्पष्ट दिशा दिई ढुक्क भएर निर्णय गर्न सहयोग गर्ने',
  'Your business is difficult to find online, or your content is not reaching relevant customers.':'तपाईंको व्यवसाय अनलाइन भेटिन गाह्रो छ वा सामग्री सही ग्राहकसम्म पुगिरहेको छैन।','Review search visibility and website content':'खोज परिणाममा देखिने अवस्था र वेबसाइट सामग्री समीक्षा गर्ने','Map customer questions to useful topics':'ग्राहकका प्रश्नलाई उपयोगी विषयसँग जोड्ने','Develop page improvements and an editorial plan':'पृष्ठ सुधार र सामग्री प्रकाशन योजना बनाउने','Businesses ready to build a more useful, discoverable online presence.':'अझ उपयोगी र सजिलै भेटिने अनलाइन उपस्थिति बनाउन तयार व्यवसाय।','Improve your chances of being found by people already interested in what you offer.':'तपाईंले दिने सेवामा रुचि राख्ने मानिसले तपाईंलाई भेट्ने सम्भावना बढाउने',
  'Posting takes time but lacks a consistent message or purpose.':'सामग्री राख्न समय लाग्छ, तर सन्देश र उद्देश्यमा निरन्तरता छैन।','Define content themes and a realistic publishing rhythm':'सामग्रीका विषय र धान्न सकिने प्रकाशन तालिका तय गर्ने','Plan audience-focused posts and creative briefs':'ग्राहकलाई केन्द्रमा राखेर पोस्ट र सिर्जनात्मक योजना बनाउने','Review engagement and refine your content':'प्रतिक्रिया समीक्षा गरी सामग्री सुधार्ने','Businesses that need a manageable, consistent social presence.':'व्यवस्थित र नियमित सामाजिक सञ्जाल उपस्थिति चाहने व्यवसाय।','Build familiarity and make it easier for potential customers to connect with you.':'ग्राहकलाई तपाईंको व्यवसायसँग परिचित गराउने र सम्पर्क गर्न सजिलो बनाउने',
  'Advertising spend is disconnected from the quality of your enquiries.':'विज्ञापन खर्च र सोधपुछको गुणस्तरबीच मेल छैन।','Clarify audience, offer, and campaign goals':'ग्राहक, प्रस्ताव र अभियानका लक्ष्य स्पष्ट गर्ने','Plan campaigns, creative tests, and landing pages':'अभियान, सिर्जनात्मक परीक्षण र प्रवेश पृष्ठ योजना बनाउने','Review lead quality and spending against agreed measures':'तय गरिएका मापदण्डअनुसार सम्भावित ग्राहक र खर्च समीक्षा गर्ने','Businesses with a clear offer and a budget to test paid channels.':'स्पष्ट प्रस्ताव र भुक्तानी माध्यम परीक्षण गर्ने बजेट भएका व्यवसाय।','Learn which messages and audiences are most likely to generate relevant enquiries.':'कुन सन्देश र कुन ग्राहक समूहबाट उपयोगी सोधपुछ आउँछ भन्ने बुझ्ने',
  'Interested customers slip away because follow-up is inconsistent.':'समयमै सम्पर्क नहुँदा रुचि राखेका ग्राहक टाढिन्छन्।','Map enquiry and customer follow-up journeys':'सोधपुछदेखि ग्राहक सम्पर्कसम्मको यात्रा नक्साङ्कन गर्ने','Create helpful email content and sequences':'उपयोगी विद्युतीय पत्र र सम्पर्क क्रम बनाउने','Review consent, segmentation, and performance':'सहमति, ग्राहक समूह र परिणाम समीक्षा गर्ने','Businesses with permission-based contacts and repeat customer opportunities.':'सम्पर्क गर्न अनुमति भएका ग्राहक र दोहोरिने कारोबारको सम्भावना भएका व्यवसाय।','Keep your business relevant with timely, useful communication.':'समयमै उपयोगी संवादमार्फत ग्राहकको सम्झनामा रहिरहने',
  'People visit your website but leave without taking the next step.':'मानिसहरू वेबसाइटमा आउँछन्, तर अर्को कदम नचाली फर्किन्छन्।','Review page clarity, mobile usability, and calls to action':'पृष्ठको स्पष्टता, मोबाइल प्रयोग र काम गर्न आग्रह गर्ने ठाउँ समीक्षा गर्ने','Identify friction in forms and customer journeys':'फारम र ग्राहक यात्राका अवरोध पहिचान गर्ने','Prioritize improvements and plan useful tests':'सुधारलाई प्राथमिकता दिई उपयोगी परीक्षण योजना बनाउने','Businesses with a website or campaigns that need a clearer path to enquiry.':'वेबसाइट वा अभियानबाट सोधपुछसम्मको बाटो स्पष्ट बनाउन चाहने व्यवसाय।','Help visitors understand your offer and take action with less friction.':'आगन्तुकलाई तपाईंको प्रस्ताव बुझ्न र सजिलै अघि बढ्न सहयोग गर्ने','Not sure where to start? Let’s work it out.':'कहाँबाट सुरु गर्ने थाहा छैन? सँगै तय गरौँ।',

  'THE MARKETING NOTEBOOK':'बजार प्रवर्द्धनका लेखहरू','Fresh thinking.':'नयाँ सोच।','Practical next steps.':'काम लाग्ने अर्को कदम।','Ideas to help you make sense of marketing, use AI thoughtfully, and move your business forward.':'बजार प्रवर्द्धन बुझ्न, कृत्रिम बुद्धिमत्ता सोचेर प्रयोग गर्न र व्यवसाय अघि बढाउन सहयोगी विचारहरू।','Search ideas, topics, or questions…':'विचार, विषय वा प्रश्न खोज्नुहोस्…','Article category':'लेखको श्रेणी','All categories':'सबै श्रेणी','article':'लेख','articles':'लेखहरू','No matching articles yet':'मिल्दो लेख भेटिएन','Try a broader search or choose another category.':'अलि फराकिलो शब्दले खोज्नुहोस् वा अर्को श्रेणी छान्नुहोस्।','Clear search and filters':'खोज र छनोट हटाउनुहोस्','Read article':'लेख पढ्नुहोस्','AI Marketing':'कृत्रिम बुद्धिमत्ता र बजार प्रवर्द्धन','Websites & Conversion':'वेबसाइट र रूपान्तरण','Strategy':'रणनीति','min read':'मिनेट पढाइ','All articles':'सबै लेख','Keep exploring':'थप पढ्नुहोस्',

  'LET’S START A CONVERSATION':'कुराकानी सुरु गरौँ','Your next step':'तपाईंको अर्को कदम','starts with a conversation.':'कुराकानीबाट सुरु हुन्छ।','Tell me where you are now, and where you’d like your business to go.':'तपाईं अहिले कहाँ हुनुहुन्छ र व्यवसायलाई कहाँ पुर्‍याउन चाहनुहुन्छ, बताउनुहोस्।','YOUR FREE CONSULTATION':'तपाईंको निःशुल्क परामर्श','Clarity for what comes next.':'अब के गर्ने भन्ने स्पष्टता।','During your free consultation, I’ll analyze your business, identify opportunities for growth, and create a customized digital marketing plan you can start implementing immediately.':'निःशुल्क परामर्शमा तपाईंको व्यवसाय र सम्भावनाहरू हेरेर, आजै लागू गर्न मिल्ने डिजिटल बजार प्रवर्द्धन योजना तयार गर्छु।','Prefer email?':'इमेलबाट कुरा गर्न चाहनुहुन्छ?','Tell me about your business.':'तपाईंको व्यवसायबारे बताउनुहोस्।','Share what you’re working on and where you’d like support. Fields marked * are required.':'तपाईं के गर्दै हुनुहुन्छ र कहाँ सहयोग चाहिन्छ, लेख्नुहोस्। * चिह्न भएका ठाउँ अनिवार्य छन्।','Full name':'पूरा नाम','Email address':'इमेल ठेगाना','Business name':'व्यवसायको नाम','Website URL':'वेबसाइट ठेगाना','Service of interest (optional)':'रुचिको सेवा (ऐच्छिक)','I’m not sure yet':'अहिले निश्चित छैन','Main business challenge or message *':'मुख्य व्यवसायिक चुनौती वा सन्देश *','Your details will be used to respond to your enquiry and arrange any consultation you request. FormSubmit processes this enquiry for email delivery. This form does not subscribe you to marketing emails. A request does not confirm an appointment.':'तपाईंका विवरण सोधपुछको जवाफ दिन र परामर्श मिलाउन मात्र प्रयोग हुन्छन्। FormSubmit ले इमेल पठाउन सहयोग गर्छ। यस फारमबाट प्रचारात्मक इमेल सुरु हुँदैन। अनुरोध पठाउँदैमा भेटघाट निश्चित हुँदैन।','Send Consultation / Business Enquiry':'परामर्श वा व्यवसायिक सोधपुछ पठाउनुहोस्','Sending your request…':'तपाईंको अनुरोध पठाइँदैछ…','Online enquiries are not connected yet. Requests cannot be delivered at the moment. Please return once the service is available.':'अनलाइन सोधपुछ सेवा अहिले उपलब्ध छैन। सेवा जोडिएपछि फेरि प्रयास गर्नुहोस्।','Your details are still here; please try again later.':'तपाईंका विवरण यहीँ छन्; केहीबेरपछि फेरि प्रयास गर्नुहोस्।','Unable to send your request. Please try again later.':'अनुरोध पठाउन सकिएन। केहीबेरपछि फेरि प्रयास गर्नुहोस्।','Human insight. AI advantage.':'मानवीय बुझाइ। कृत्रिम बुद्धिमत्ताको साथ।','Marketing with a clear purpose.':'स्पष्ट उद्देश्य भएको बजार प्रवर्द्धन।',

  'How Small Businesses Can Use AI to Improve Their Marketing':'साना व्यवसायले बजार प्रवर्द्धनमा कृत्रिम बुद्धिमत्ता कसरी प्रयोग गर्ने','How to Build a Digital Marketing Plan You Can Actually Implement':'वास्तवमै लागू गर्न मिल्ने डिजिटल योजना कसरी बनाउने','Turning Website Visitors into Leads: Practical Improvements for Small Businesses':'वेबसाइटका आगन्तुकलाई सम्भावित ग्राहकमा बदल्ने उपाय','Start with a real business problem, choose one useful workflow, and keep human judgment in the loop.':'वास्तविक व्यवसायिक समस्याबाट सुरु गर्नुहोस्, उपयोगी कामको एउटा क्रम छान्नुहोस् र मानवीय जाँच कायम राख्नुहोस्।','Turn a long list of marketing ideas into a focused plan that fits your goals, time, and resources.':'धेरै विचारलाई तपाईंका लक्ष्य, समय र स्रोतअनुसार केन्द्रित योजनामा बदल्नुहोस्।','Make your offer clearer, reduce friction, and give visitors a confident next step.':'आफ्नो प्रस्ताव स्पष्ट बनाउनुहोस्, अनावश्यक झन्झट घटाउनुहोस् र आगन्तुकलाई ढुक्क भएर अघि बढ्ने बाटो दिनुहोस्।','Read article (link)':'लेख पढ्नुहोस्','Explore AI Marketing Strategy & Consulting':'कृत्रिम बुद्धिमत्ता आधारित बजार रणनीति हेर्नुहोस्','Explore SEO & Content Marketing':'खोज प्रणाली र सामग्री प्रवर्द्धन हेर्नुहोस्','Explore Social Media Strategy & Management':'सामाजिक सञ्जाल रणनीति हेर्नुहोस्','Explore Paid Advertising & Lead Generation':'भुक्तानी विज्ञापन र सम्भावित ग्राहक पहिचान हेर्नुहोस्','Explore Email Marketing & Automation':'विद्युतीय पत्र र स्वचालित सम्पर्क हेर्नुहोस्','Explore Website & Landing Page Optimization':'वेबसाइट तथा प्रवेश पृष्ठ सुधार हेर्नुहोस्',

  'Marketing that starts with listening.':'सुनेर सुरु हुने बजार प्रवर्द्धन।','I help small and medium businesses grow their online presence with thoughtful strategy, useful AI tools, and marketing built around their customers. My goal is to make your next step clear, practical, and manageable.':'सोचिएको रणनीति, उपयोगी कृत्रिम बुद्धिमत्ता र ग्राहककेन्द्रित काममार्फत साना तथा मध्यम व्यवसायको डिजिटल उपस्थिति बढाउन म सहयोग गर्छु। तपाईंको अर्को कदम स्पष्ट र व्यवहारिक बनाउनु मेरो लक्ष्य हो।',
  'Choose a time using the booking provider. Appointment confirmation comes from the provider.':'सम्बन्धित सेवा प्रयोग गरेर समय छान्नुहोस्। भेटघाटको पुष्टि त्यही सेवाबाट आउनेछ।','Use the enquiry form to request a consultation. Submitting a request does not confirm an appointment; the next step will be arranged by email.':'परामर्शका लागि सोधपुछ फारम पठाउनुहोस्। फारम पठाउँदैमा भेटघाट निश्चित हुँदैन; अर्को कदम इमेलबाट मिलाइनेछ।','No. We start with your business and explain recommendations in plain English. AI is a supporting tool; you do not need technical knowledge to get started.':'पर्दैन। हामी तपाईंको व्यवसायबाट सुरु गर्छौँ र सुझाव सरल भाषामा बुझाउँछौँ। कृत्रिम बुद्धिमत्ता सहयोगी साधन मात्र हो; सुरु गर्न प्राविधिक ज्ञान आवश्यक छैन।','Yes. We can review what is already working, identify gaps, and prioritize improvements before introducing anything new.':'हुन्छ। अहिले चलिरहेको काम हेरेर कमी पहिचान गर्छौँ र नयाँ कुरा थप्नुअघि आवश्यक सुधारलाई प्राथमिकता दिन्छौँ।','Yes. The plan is designed to be actionable. You can implement it yourself, work with your team, or discuss optional ongoing support.':'हुन्छ। योजना काममा लगाउन मिल्ने गरी तयार हुन्छ। तपाईं आफैँ वा आफ्नो टोलीसँग लागू गर्न सक्नुहुन्छ, अथवा निरन्तर सहयोगबारे कुरा गर्न सक्नुहुन्छ।','We agree on measures that connect to your goals, such as relevant enquiries, conversion rates, search visibility, and lead quality. We review the starting point and progress together without promising specific results.':'तपाईंका लक्ष्यसँग जोडिने मापदण्ड—उपयोगी सोधपुछ, रूपान्तरण दर, खोजमा देखिने अवस्था र सम्भावित ग्राहकको गुणस्तर—मिलेर तय गर्छौँ। निश्चित परिणामको वाचा नगरी सुरुआती अवस्था र प्रगति सँगै हेर्छौँ।'
};

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<HTMLElement, Record<string, string>>();

function dynamicNepali(source: string): string | undefined {
  if (source.includes('All rights reserved.')) return source.replace('All rights reserved.', 'सर्वाधिकार सुरक्षित।').replace('Thoughtful marketing. Meaningful connections.', translations['Thoughtful marketing. Meaningful connections.'] || 'सोचेर गरिएको बजार प्रवर्द्धन। अर्थपूर्ण सम्बन्ध।');
  const count = source.match(/^(\d+) (article|articles)$/);
  if (count) return `${count[1]} ${count[1] === '1' ? 'लेख' : 'लेखहरू'}`;
  const meta = source.match(/^(.+?) · (\d+) (min read|MIN READ)$/);
  if (meta) return `${translations[meta[1]] || meta[1]} · ${meta[2]} मिनेट पढाइ`;
  if (source.startsWith('Read ')) return `पढ्नुहोस्: ${translations[source.slice(5)] || source.slice(5)}`;
  if (source.startsWith('Explore ')) return `हेर्नुहोस्: ${translations[source.slice(8)] || source.slice(8)}`;
  return undefined;
}

function translatePage(language: Language) {
  const nodes: Text[] = [];
  const collect = (root: Node) => root.childNodes.forEach(child => {
    if (child.nodeType === 3) {
      const text = child as Text;
      if (!text.parentElement?.closest('[data-language-toggle]') && !['SCRIPT', 'STYLE'].includes(text.parentElement?.tagName || '')) {
        if (!originalText.has(text)) originalText.set(text, text.nodeValue || '');
        nodes.push(text);
      }
    } else if (child.nodeType === 1 && !(child as Element).matches('script,style,[data-language-toggle]')) {
      collect(child);
    }
  });
  collect(document.body);
  nodes.forEach(text => {
    const source = originalText.get(text) || '';
    const trimmed = source.trim();
    const replacement = language === 'ne' ? (translations[trimmed] || dynamicNepali(trimmed)) : undefined;
    const value = language === 'ne' && replacement ? replacement : source;
    text.nodeValue = source.replace(trimmed, value);
  });

  document.querySelectorAll<HTMLElement>('[aria-label],[title],[placeholder]').forEach(el => {
    if (el.closest('[data-language-toggle]')) return;
    if (!originalAttributes.has(el)) {
      const attrs: Record<string, string> = {};
      for (const attr of ['aria-label', 'title', 'placeholder']) {
        const value = el.getAttribute(attr);
        if (value) attrs[attr] = value;
      }
      originalAttributes.set(el, attrs);
    }
    const attrs = originalAttributes.get(el) || {};
    for (const attr of ['aria-label', 'title', 'placeholder']) {
      const source = attrs[attr];
      if (!source) continue;
      const replacement = language === 'ne' ? (translations[source] || dynamicNepali(source)) : undefined;
      el.setAttribute(attr, language === 'ne' && replacement ? replacement : source);
    }
  });
  document.documentElement.lang = language === 'ne' ? 'ne' : 'en';
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>('en');
  const languageRef = useRef<Language>('en');
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang');
    const stored = requested === 'ne' || requested === 'en' ? requested : ((localStorage.getItem('site-language') as Language | null) || 'en');
    languageRef.current = stored;
    setLanguage(stored);
    translatePage(stored);
    const observer = new MutationObserver(() => translatePage(languageRef.current));
    observer.observe(document.body, {childList: true, subtree: true});
    return () => observer.disconnect();
  }, []);
  function choose(next: Language) {
    languageRef.current = next;
    localStorage.setItem('site-language', next);
    setLanguage(next);
    translatePage(next);
  }
  return <div className="language-toggle" data-language-toggle role="group" aria-label="Language selection"><button type="button" className={language === 'en' ? 'active' : ''} onClick={() => choose('en')} aria-pressed={language === 'en'}>Eng</button><span aria-hidden="true">|</span><button type="button" className={language === 'ne' ? 'active' : ''} onClick={() => choose('ne')} aria-pressed={language === 'ne'}>नेपाली</button></div>;
}
