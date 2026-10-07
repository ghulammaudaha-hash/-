import {
  CategoryInfo,
  Article,
  BreakingNewsItem,
  VideoItem,
  PhotoStory,
  LiveBlogEntry,
  SportsScore,
  Advertisement,
  SiteSettings,
  AdminUser,
} from '../types/news';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'top', nameHi: 'मुख्य समाचार', nameEn: 'Top News', slug: 'top' },
  { id: 'india', nameHi: 'भारत', nameEn: 'India', slug: 'india' },
  { id: 'world', nameHi: 'दुनिया', nameEn: 'World', slug: 'world' },
  { id: 'up', nameHi: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh', slug: 'up' },
  { id: 'politics', nameHi: 'राजनीति', nameEn: 'Politics', slug: 'politics' },
  { id: 'business', nameHi: 'बिजनेस', nameEn: 'Business', slug: 'business' },
  { id: 'sports', nameHi: 'खेल', nameEn: 'Sports', slug: 'sports' },
  { id: 'entertainment', nameHi: 'मनोरंजन', nameEn: 'Entertainment', slug: 'entertainment' },
  { id: 'tech', nameHi: 'टेक्नोलॉजी', nameEn: 'Tech', slug: 'tech' },
  { id: 'health', nameHi: 'स्वास्थ्य', nameEn: 'Health', slug: 'health' },
  { id: 'education', nameHi: 'शिक्षा', nameEn: 'Education', slug: 'education' },
  { id: 'lifestyle', nameHi: 'लाइफस्टाइल', nameEn: 'Lifestyle', slug: 'lifestyle' },
  { id: 'video', nameHi: 'वीडियो', nameEn: 'Videos', slug: 'video' },
  { id: 'photo', nameHi: 'फोटो', nameEn: 'Photos', slug: 'photo' },
  { id: 'live', nameHi: 'लाइव', nameEn: 'Live', slug: 'live' },
];

export const INITIAL_BREAKING_NEWS: BreakingNewsItem[] = [
  {
    id: 'bn-1',
    textHi: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने अगली पीढ़ी के चंद्रयान मिशन के परीक्षण की घोषणा की',
    textEn: 'ISRO announces timeline for next-generation lunar exploration mission',
    articleId: 'art-1',
    timestamp: '10 मिनट पहले',
    isUrgent: true,
    active: true,
  },
  {
    id: 'bn-2',
    textHi: 'शेयर बाजार में रिकॉर्ड उछाल, सेंसेक्स 82,400 के पार और निफ्टी नई ऊंचाई पर पहुंचा',
    textEn: 'Sensex touches record high above 82,400 led by tech and banking rally',
    articleId: 'art-5',
    timestamp: '25 मिनट पहले',
    isUrgent: false,
    active: true,
  },
  {
    id: 'bn-3',
    textHi: 'उत्तर प्रदेश में नई सौर ऊर्जा नीति को कैबिनेट की मंजूरी, 50,000 मेगावाट का लक्ष्य तय',
    textEn: 'UP Cabinet approves ambitious clean energy policy with 50,000 MW target',
    articleId: 'art-3',
    timestamp: '42 मिनट पहले',
    isUrgent: false,
    active: true,
  },
  {
    id: 'bn-4',
    textHi: 'आईसीसी विश्व टेस्ट चैंपियनशिप: भारतीय क्रिकेट टीम ने ब्रिस्बेन में दर्ज की ऐतिहासिक जीत',
    textEn: 'WTC: India claims memorable victory in Brisbane test match',
    articleId: 'art-6',
    timestamp: '1 घंटा पहले',
    isUrgent: true,
    active: true,
  },
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-hero',
    title: 'विशेष रिपोर्ट: क्या भारत का नया सेमीकंडक्टर मिशन वैश्विक चिप संकट को बदल देगा?',
    category: 'tech',
    duration: '06:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2 घंटे पहले',
    views: 142300,
    description: 'गुजरात के धोलेरा और असम में बन रहे देश के पहले स्वदेशी चिप फैब्रिकेशन प्लांट्स का ज़मीनी जायज़ा। विशेषज्ञों से जानिए कि भारत वैश्विक आपूर्ति श्रृंखला में कैसे महाशक्ति बन सकता है।',
    isHero: true,
    authorName: 'राजेश माथुर, वरिष्ठ तकनीकी संपादक',
    tags: ['सेमीकंडक्टर', 'तकनीक', 'भारत निर्माण', 'अर्थव्यवस्था'],
  },
  {
    id: 'vid-2',
    title: 'संसद में नए बजट प्रस्तावों पर तीखी बहस, वित्त मंत्री ने दिए सभी सवालों के जवाब',
    category: 'politics',
    duration: '04:12',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    publishedAt: '4 घंटे पहले',
    views: 89400,
    description: 'लोकसभा में आम जनता के करों में राहत और बुनियादी ढांचे के विकास पर पक्ष और विपक्ष के बीच जोरदार चर्चा।',
    authorName: 'अनुराग शर्मा',
    tags: ['संसद', 'बजट', 'राजनीति'],
  },
  {
    id: 'vid-3',
    title: 'हिमालय में जलवायु परिवर्तन का गहरा असर: ग्लेशियरों की पिघलती बर्फ से वैज्ञानिकों की चिंता',
    category: 'world',
    duration: '08:20',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    publishedAt: '7 घंटे पहले',
    views: 65120,
    description: 'पर्यावरणविदों की चेतावनी, जानिए गंगा और ब्रह्मपुत्र जैसी जीवनदायिनी नदियों के जलस्तर पर क्या प्रभाव पड़ेगा।',
    authorName: 'नीलिमा जोशी',
    tags: ['पर्यावरण', 'हिमालय', 'ग्लेशियर'],
  },
  {
    id: 'vid-4',
    title: 'विराट कोहली की ऐतिहासिक शतकीय पारी के बाद ड्रेसिंग रूम से खास बातचीत',
    category: 'sports',
    duration: '03:50',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=800&q=80',
    publishedAt: '12 घंटे पहले',
    views: 310500,
    description: 'दबाव के क्षणों में कैसे संभाली पारी, कप्तान और कोच ने बताया मैच का टर्निंग पॉइंट।',
    authorName: 'विवेक वर्मा',
    tags: ['क्रिकेट', 'विराट कोहली', 'टीम इंडिया'],
  },
  {
    id: 'vid-5',
    title: 'आर्टिफिशियल इंटेलिजेंस और भारत के ग्रामीण युवाओं का भविष्य',
    category: 'tech',
    duration: '05:30',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    publishedAt: '1 दिन पहले',
    views: 45200,
    description: 'किस तरह भाषाई एआई टूल्स किसानों और ग्रामीण छात्रों के लिए अवसर खोल रहे हैं।',
    authorName: 'स्वाति सिंह',
    tags: ['AI', 'एजुकेशन', 'ग्रामीण भारत'],
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'इसरो का महत्वाकांक्षी कदम: अगली पीढ़ी के चंद्र अन्वेषण और गगनयान मिशन की रूपरेखा तैयार',
    subhead: 'भारतीय वैज्ञानिकों ने स्वदेशी रॉकेट प्रौद्योगिकी और क्रू मॉड्यूल परीक्षण में पाई बड़ी सफलता',
    slug: 'isro-next-gen-lunar-mission-update',
    category: 'india',
    summary: 'भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने अपने आगामी मिशनों के लिए प्रमुख परीक्षण सफलतापूर्वक पूरे कर लिए हैं। गगनयान के मानवरहित उड़ान परीक्षण की तारीखों का ऐलान जल्द होने की उम्मीद है।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) ने अंतरिक्ष अन्वेषण के क्षेत्र में एक और ऐतिहासिक मील का पत्थर पार किया है। वैज्ञानिकों ने गगनयान मानव अंतरिक्ष उड़ान मिशन के तहत जीवन रक्षक प्रणालियों और रॉकेट प्रणोदन का अंतिम दौर का जमीनी परीक्षण पूरा कर लिया है।</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-6 mb-3">क्रू मॉड्यूल सुरक्षा में पूर्ण आत्मनिर्भरता</h2>
      <p class="mb-4">इसरो के वरिष्ठ अधिकारियों के अनुसार, इस परीक्षण के दौरान आपातकालीन क्रू एस्केप सिस्टम का बारीकी से मूल्यांकन किया गया। बेंगलुरु और श्रीहरिकोटा के वैज्ञानिकों की संयुक्त टीम ने अत्यधिक दबाव और विभिन्न मौसमी परिस्थितियों में इस तकनीक को परखा।</p>

      <blockquote class="border-l-4 border-red-600 pl-4 py-2 italic text-slate-700 bg-red-50/50 rounded-r my-6">
        "हमारा उद्देश्य केवल अंतरिक्ष में पहुंचना नहीं है, बल्कि हमारे अंतरिक्ष यात्रियों की शत-प्रतिशत सुरक्षित वापसी सुनिश्चित करना है। यह परीक्षण हमारे पूरे देश के लिए गौरव का क्षण है।"
        <span class="block text-xs font-semibold text-slate-500 mt-1">— डॉ. एस. सोमनाथ, अंतरिक्ष आयोग</span>
      </blockquote>

      <h2 class="text-2xl font-bold text-slate-900 mt-6 mb-3">चंद्रमा पर स्थायी उपस्थिति की तैयारी</h2>
      <p class="mb-4">चंद्रयान-3 की ऐतिहासिक लैंडिंग के बाद अब भारत चंद्र नमूना वापसी मिशन (Chandrayaan-4) की दिशा में कदम बढ़ा रहा है। इसमें चंद्रमा की सतह से मिट्टी और चट्टानों के नमूने पृथ्वी पर वापस लाए जाएंगे।</p>

      <ul class="list-disc list-inside space-y-2 mb-4 text-slate-800">
        <li>मानवरहित गगनयान उड़ान इसी वर्ष के अंत तक निर्धारित।</li>
        <li>चंद्रमा की सतह पर रोबोटिक बेस स्थापित करने के लिए अंतरराष्ट्रीय अंतरिक्ष एजेंसियों से सहयोग।</li>
        <li>निजी अंतरिक्ष स्टार्टअप्स को भी सैटेलाइट निर्माण में भागीदार बनाया गया।</li>
      </ul>

      <p class="mb-4">वैज्ञानिकों का मानना है कि इन मिशनों से न केवल वैज्ञानिक समझ बढ़ेगी, बल्कि भविष्य में दूरसंचार, मौसम पूर्वानुमान और खनिज खोज के क्षेत्र में भारत को रणनीतिक बढ़त हासिल होगी।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1517976487507-5b38f8303d79?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'श्रीहरिकोटा स्थित सतीश धवन अंतरिक्ष केंद्र से रॉकेट प्रक्षेपण का विहंगम दृश्य। (फोटो साभार: इसरो)',
    author: {
      name: 'प्रमोद नारायण',
      role: 'वरिष्ठ विज्ञान संवाददाता',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    publishedAt: 'आज, 10:30 पूर्वाह्न',
    updatedAt: 'आज, 11:15 पूर्वाह्न',
    views: 48920,
    shares: 3410,
    isLeadStory: true,
    isTrending: true,
    tags: ['इसरो', 'गगनयान', 'चंद्रयान', 'विज्ञान', 'भारत'],
    readTime: '4 मिनट',
    status: 'published',
    comments: [
      {
        id: 'c-1',
        authorName: 'अमित कुमार',
        authorCity: 'लखनऊ',
        text: 'भारतीय वैज्ञानिकों पर पूरे देश को गर्व है। आत्मनिर्भर भारत का यह सच्चा उदाहरण है।',
        createdAt: '1 घंटा पहले',
        likes: 24,
      },
      {
        id: 'c-2',
        authorName: 'सुनीता मेहता',
        authorCity: 'पुणे',
        text: 'इसरो की कम लागत में उच्च तकनीक हमेशा दुनिया को हैरान करती है। शानदार कवरेज!',
        createdAt: '30 मिनट पहले',
        likes: 12,
      },
    ],
    seoTitle: 'इसरो गगनयान और चंद्र मिशन: भारतीय अंतरिक्ष अनुसंधान का नया अध्याय',
    seoDescription: 'इसरो ने गगनयान के महत्वपूर्ण क्रू मॉड्यूल परीक्षण पूरे किए, चंद्रयान-4 की तैयारी तेज़। विस्तृत रिपोर्ट पढ़ें।',
  },
  {
    id: 'art-2',
    title: 'विदेश नीति: भारत और आसियान देशों के बीच समुद्री सुरक्षा और व्यापार समझौते पर सहमति',
    subhead: 'इंडो-पैसिफिक क्षेत्र में खुली और नियम-आधारित व्यवस्था को मजबूत करने का संकल्प',
    slug: 'india-asean-maritime-security-trade-pact',
    category: 'world',
    summary: 'जकार्ता में आयोजित शिखर सम्मेलन में दोनों पक्षों ने व्यापारिक बाधाओं को दूर करने और समुद्री व्यापार मार्गों की सुरक्षा के लिए साझा कार्यबल गठित करने का निर्णय लिया है।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">भारत और दक्षिण-पूर्व एशियाई राष्ट्रों के संगठन (ASEAN) ने अपने रणनीतिक संबंधों को एक नई ऊंचाई प्रदान करते हुए मुक्त व्यापार समझौते (FTA) की व्यापक समीक्षा शुरू करने पर सहमति जताई है।</p>
      <h2 class="text-2xl font-bold text-slate-900 mt-6 mb-3">व्यापारिक संतुलन पर जोर</h2>
      <p class="mb-4">विदेश मंत्री ने अपने संबोधन में कहा कि डिजिटल कनेक्टिविटी, आपूर्ति श्रृंखला लचीलापन और हरित ऊर्जा के क्षेत्र में सहयोग अब प्राथमिकता है। भारत की एक्ट ईस्ट पॉलिसी का यह एक प्रमुख स्तंभ है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'शिखर सम्मेलन के दौरान दोनों पक्षों के प्रतिनिधियों की उच्च स्तरीय बैठक।',
    author: {
      name: 'सुभाष चंद्र',
      role: 'अंतरराष्ट्रीय मामलों के विश्लेषक',
    },
    publishedAt: 'आज, 09:15 पूर्वाह्न',
    views: 22400,
    shares: 890,
    tags: ['विदेश नीति', 'आसियान', 'व्यापार', 'कूटनीति'],
    readTime: '3 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-3',
    title: 'उत्तर प्रदेश: पूर्वांचल और बुंदेलखंड में सौर पार्कों का जाल, 50,000 मेगावाट बिजली का नया रोडमैप',
    subhead: 'राज्य कैबिनेट ने नई नवीकरणीय ऊर्जा नीति को दी मंजूरी, एक लाख नए रोजगार सृजन का दावा',
    slug: 'up-solar-energy-parks-policy-announcement',
    category: 'up',
    summary: 'उत्तर प्रदेश सरकार ने राज्य को देश का प्रमुख सौर ऊर्जा हब बनाने के लिए 30,000 करोड़ रुपये के निवेश प्रस्तावों को हरी झंडी दिखाई है। किसानों की बंजर जमीनों पर सोलर फार्म लगाए जाएंगे।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">लखनऊ में मुख्यमंत्री की अध्यक्षता में हुई कैबिनेट बैठक में नई सौर ऊर्जा नीति 2026-30 को मंजूरी मिल गई है। इस नीति का मुख्य उद्देश्य राज्य की पारंपरिक तापीय बिजली पर निर्भरता को कम करना और किसानों की आय में इजाफा करना है।</p>
      <h2 class="text-2xl font-bold text-slate-900 mt-6 mb-3">किसानों को मिलेगा नियमित किराया</h2>
      <p class="mb-4">नीति के तहत जो किसान सौर पार्कों के लिए अपनी अनुपजाऊ या कम उपजाऊ जमीन देंगे, उन्हें प्रति एकड़ निश्चित वार्षिक किराया दिया जाएगा, जिसमें हर तीन साल में वृद्धि का प्रावधान है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'बुंदेलखंड के झांसी क्षेत्र में स्थापित विशाल सोलर पैनल प्लांट।',
    author: {
      name: 'अखिलेश त्रिपाठी',
      role: 'विशेष संवाददाता, लखनऊ',
    },
    publishedAt: 'आज, 08:30 पूर्वाह्न',
    views: 31200,
    shares: 1420,
    tags: ['उत्तर प्रदेश', 'सोलर ऊर्जा', 'बुंदेलखंड', 'विकास'],
    readTime: '4 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-4',
    title: 'संसद का मानसून सत्र: महिला आरक्षण और डिजिटल सुरक्षा विधेयकों पर सर्वदलीय बैठक',
    subhead: 'सदन की कार्यवाही सुचारू रूप से चलाने के लिए सरकार ने विपक्ष से मांगा रचनात्मक सहयोग',
    slug: 'parliament-session-digital-security-all-party-meet',
    category: 'politics',
    summary: 'आगामी सत्र में पेश होने वाले सात प्रमुख विधेयकों पर सहमति बनाने के लिए संसद भवन परिसर में गहन विचार-विमर्श हुआ। साइबर सुरक्षा और नागरिकों के डेटा संरक्षण पर रहेगा खास ध्यान।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">संसदीय कार्य मंत्री ने आज नई दिल्ली में सभी राजनीतिक दलों के सदन नेताओं के साथ बैठक की। बैठक में जनहित के मुद्दों पर विस्तार से चर्चा हुई।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'संसद भवन के बाहर राजनीतिक दलों के प्रतिनिधियों की आवाजाही।',
    author: {
      name: 'मीनाक्षी सेन',
      role: 'राजनीतिक संपादक',
    },
    publishedAt: 'आज, 07:45 पूर्वाह्न',
    views: 19800,
    shares: 670,
    tags: ['संसद', 'राजनीति', 'विधेयक', 'नई दिल्ली'],
    readTime: '3 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-5',
    title: 'भारतीय शेयर बाजार में बहार: सेंसेक्स 82,400 के नए ऑल-टाइम हाई पर, बैंकिंग और आईटी शेयरों में तेजी',
    subhead: 'विदेशी संस्थागत निवेशकों (FII) की भारी लिवाली और मजबूत जीडीपी विकास दर के आंकड़ों से मिला संबल',
    slug: 'stock-market-sensex-nifty-record-high-rally',
    category: 'business',
    summary: 'दलाल स्ट्रीट पर आज उत्साह का माहौल रहा। खुदरा निवेशकों और घरेलू म्यूचुअल फंड्स की निरंतर खरीदारी से बाज़ार पूंजीकरण 450 लाख करोड़ रुपये के स्तर को पार कर गया।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">बॉम्बे स्टॉक एक्सचेंज (BSE) का संवेदी सूचकांक सेंसेक्स आज शुरुआती कारोबार से ही हरे निशान में दौड़ता रहा। दोपहर के सत्र में 650 अंकों से अधिक की छलांग लगाकर यह अब तक के उच्चतम स्तर पर पहुंच गया।</p>
      <h2 class="text-2xl font-bold text-slate-900 mt-6 mb-3">किन क्षेत्रों में सबसे ज्यादा चमक?</h2>
      <p class="mb-4">बैंकिंग, ऑटोमोबाइल, और आईटी इंडेक्स में 2 से 3 प्रतिशत तक की बढ़त दर्ज की गई। मुद्रास्फीति के अनुकूल आंकड़ों ने भी बाजार के मिजाज को मजबूत किया है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'स्टॉक एक्सचेंज स्क्रीन पर हरे रंग में चमकते सूचकांक और शेयर भाव।',
    author: {
      name: 'संजय काबरा',
      role: 'मार्केट एनालिस्ट',
    },
    publishedAt: 'आज, 11:40 पूर्वाह्न',
    views: 41200,
    shares: 2850,
    tags: ['शेयर बाजार', 'सेंसेक्स', 'निफ्टी', 'अर्थव्यवस्था', 'बिजनेस'],
    readTime: '3 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-6',
    title: 'ब्रिस्बेन टेस्ट: भारत ने रोमांचक मुकाबले में ऑस्ट्रेलिया को 3 विकेट से हराया, सीरीज में 2-1 की अजेय बढ़त',
    subhead: 'ऋषभ पंत और यशस्वी जायसवाल की शतकीय साझेदारी ने रचा नया इतिहास',
    slug: 'india-vs-australia-brisbane-test-cricket-victory',
    category: 'sports',
    summary: 'पांचवें दिन के अंतिम सत्र में भारतीय बल्लेबाजों ने 328 रनों के कठिन लक्ष्य का पीछा करते हुए गाबा के मैदान पर लगातार दूसरी बार यादगार विजय हासिल की।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">ब्रिस्बेन के गाबा मैदान पर भारतीय क्रिकेट टीम ने एक बार फिर साबित कर दिया कि भारतीय युवा शक्ति किसी भी चुनौती के आगे झुकती नहीं है। पांच मैचों की बॉर्डर-गावस्कर ट्रॉफी के चौथे टेस्ट मैच में भारत ने ऑस्ट्रेलिया को एक रोमांचक मुकाबले में मात दी।</p>
      <h2 class="text-2xl font-bold text-slate-900 mt-6 mb-3">मैच का निर्णायक मोड़</h2>
      <p class="mb-4">जब टीम इंडिया ने 180 रन पर चार प्रमुख विकेट गंवा दिए थे, तब विकेटकीपर बल्लेबाज ऋषभ पंत ने आक्रामक खेल दिखाते हुए मात्र 98 गेंदों में अपना शतक पूरा किया। उन्होंने ऑस्ट्रेलियाई तेज गेंदबाजों की रणनीति को पूरी तरह ध्वस्त कर दिया।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'मैच जीतने के बाद भारतीय टीम का ऐतिहासिक जश्न।',
    author: {
      name: 'अतुल वासन',
      role: 'खेल संपादक',
    },
    publishedAt: 'आज, 01:20 अपराह्न',
    views: 85400,
    shares: 12400,
    tags: ['क्रिकेट', 'टीम इंडिया', 'टेस्ट मैच', 'खेल', 'बॉर्डर गावस्कर'],
    readTime: '5 मिनट',
    status: 'published',
    comments: [
      {
        id: 'c-3',
        authorName: 'रोहित जोशी',
        authorCity: 'इंदौर',
        text: 'क्या कमाल की जीत है! गाबा में फिर से तिरंगा लहराया।',
        createdAt: '15 मिनट पहले',
        likes: 45,
      },
    ],
  },
  {
    id: 'art-7',
    title: 'आर्टिफिशियल इंटेलिजेंस: क्या जनरेटिव एआई भारत में 1 करोड़ नए जॉब्स पैदा कर सकता है?',
    subhead: 'नैसकॉम की ताज़ा रिपोर्ट में टेक पेशेवरों के लिए स्किल अपग्रेडेशन की अनिवार्यता पर जोर',
    slug: 'generative-ai-job-opportunities-india-nasscom-report',
    category: 'tech',
    summary: 'भारत दुनिया में सबसे बड़ा एआई टैलेंट पूल बनने की दिशा में तेजी से आगे बढ़ रहा है। हेल्थकेयर, शिक्षा और फिनटेक सेक्टर में मांग दोगुनी होने का अनुमान।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">जनरेटिव आर्टिफिशियल इंटेलिजेंस (GenAI) को लेकर जहां दुनिया भर में रोजगार छिनने की आशंकाएं जताई जा रही थीं, वहीं भारत में इसका एक बेहद सकारात्मक पहलू सामने आ रहा है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'डेटा सेंटर और एआई मॉडल ट्रेनिंग का प्रतीकात्मक चित्र।',
    author: {
      name: 'सोनल माथुर',
      role: 'टेक रिपोर्टर',
    },
    publishedAt: 'आज, 06:10 पूर्वाह्न',
    views: 29800,
    shares: 1950,
    tags: ['एआई', 'टेक्नोलॉजी', 'नौकरी', 'नैसकॉम'],
    readTime: '4 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-8',
    title: 'स्वास्थ्य सलाह: गर्मियों में डिहाइड्रेशन और हीट स्ट्रोक से बचने के 5 अचूक घरेलू उपाय',
    subhead: 'आयुर्वेदिक विशेषज्ञों ने बताया सत्तू, छाछ और बेल के शरबत का वैज्ञानिक महत्व',
    slug: 'health-tips-heatstroke-prevention-summer-diet',
    category: 'health',
    summary: 'बढ़ते तापमान और लू के प्रकोप के बीच डॉक्टरों ने धूप में निकलने से पहले पर्याप्त पानी पीने और तरल पदार्थों का सेवन बढ़ाने की सलाह दी है।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">देश के कई हिस्सों में तापमान 42 डिग्री से ऊपर पहुंच चुका है। ऐसे मौसम में शरीर में पानी और इलेक्ट्रोलाइट्स का संतुलन बनाए रखना बेहद आवश्यक है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'प्राकृतिक स्वास्थ्य और संतुलित जीवनशैली।',
    author: {
      name: 'डॉ. वंदना शर्मा',
      role: 'स्वास्थ्य विशेषज्ञ',
    },
    publishedAt: 'कल, 05:30 अपराह्न',
    views: 34500,
    shares: 4100,
    tags: ['स्वास्थ्य', 'गर्मी', 'आयुर्वेद', 'फिटनेस'],
    readTime: '3 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-9',
    title: 'फिल्म समीक्षा: भारतीय सिनेमा में क्षेत्रीय कहानियों का स्वर्णिम दौर, अंतरराष्ट्रीय स्तर पर बज रहा डंका',
    subhead: 'कान्स और ऑस्कर में स्वतंत्र फिल्मकारों की धाक, बड़े बजट की मसाला फिल्मों पर भारी पड़ी असली कहानी',
    slug: 'indian-cinema-regional-movies-international-recognition',
    category: 'entertainment',
    summary: 'मलयालम, मराठी और हिंदी की स्वतंत्र फिल्मों ने साबित किया है कि बिना भारी-भरकम स्टारकास्ट के भी दर्शक सिनेमाघरों तक खिंचे चले आते हैं यदि कथानक दमदार हो।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">सिनेमाई इतिहास में 2026 को क्षेत्रीय सिनेमा की अभूतपूर्व क्रांति के वर्ष के रूप में याद किया जाएगा। सिनेमाघरों के टिकट खिड़की पर दर्शकों का झुकाव अब रियलिस्टिक और ज़मीनी किरदारों की ओर बढ़ा है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'सिनेमा हॉल में दर्शकों का उत्साह।',
    author: {
      name: 'आकाश दीप',
      role: 'फिल्म समीक्षक',
    },
    publishedAt: 'कल, 03:15 अपराह्न',
    views: 24300,
    shares: 1100,
    tags: ['मनोरंजन', 'सिनेमा', 'फिल्म', 'बॉलीवुड'],
    readTime: '4 मिनट',
    status: 'published',
    comments: [],
  },
  {
    id: 'art-10',
    title: 'शिक्षा सुधार: नई राष्ट्रीय शिक्षा नीति (NEP) के तहत कोडिंग और कौशल विकास अब प्राथमिक कक्षाओं से अनिवार्य',
    subhead: 'सीबीएसई और राज्य बोर्ड्स ने शुरू किया शिक्षकों का व्यापक प्रशिक्षण कार्यक्रम',
    slug: 'education-nep-coding-skill-development-schools',
    category: 'education',
    summary: 'रटने की पुरानी व्यवस्था को समाप्त करने के लिए अब अनुभवात्मक और प्रोजेक्ट-बेस्ड लर्निंग पर जोर। मातृभाषा में शिक्षा देने के नतीजे बेहद उत्साहजनक रहे हैं।',
    content: `
      <p class="lead font-medium text-lg text-slate-800 mb-4">शिक्षा मंत्रालय ने सभी राज्यों के शिक्षा सचिवों के साथ समीक्षा बैठक की। छठी कक्षा से वोकेशनल ट्रेनिंग और व्यावहारिक विज्ञान प्रयोगों को अनिवार्य किया गया है।</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'स्मार्ट क्लासरूम में टैबलेट के जरिए पढ़ाई करते स्कूली छात्र।',
    author: {
      name: 'कविता रस्तोगी',
      role: 'शिक्षा संवाददाता',
    },
    publishedAt: 'कल, 11:20 पूर्वाह्न',
    views: 18700,
    shares: 980,
    tags: ['शिक्षा', 'NEP', 'सीबीएसई', 'छात्र', 'स्कूल'],
    readTime: '3 मिनट',
    status: 'published',
    comments: [],
  },
];

export const INITIAL_PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'photo-1',
    title: 'तस्वीरों में देखिए: वसंत ऋतु में कश्मीर की डल झील और ट्यूलिप गार्डन का जादुई सौंदर्य',
    category: 'lifestyle',
    publishedAt: '2 घंटे पहले',
    author: 'आसिफ खान, श्रीनगर',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    description: 'एशिया के सबसे बड़े ट्यूलिप गार्डन में खिले 70 किस्मों के 15 लाख से अधिक रंग-बिरंगे फूल। पर्यटकों के चेहरे पर बिखरी मुस्कान।',
    views: 52100,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
        caption: 'जबरवान पहाड़ियों की तलहटी में फैले रंग-बिरंगे ट्यूलिप के अनंत खेत।',
        credit: 'आसिफ खान / दैनिक खबर',
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'डल झील में तैरते शिकारे और सुबह की शांत धुंध का मनोहारी नजारा।',
        credit: 'आसिफ खान / दैनिक खबर',
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'झेलम नदी के किनारे खिले चिनार और बादाम के पेड़ों की बहार।',
        credit: 'दैनिक खबर फ़ोटो ब्यूरो',
      },
    ],
  },
  {
    id: 'photo-2',
    title: 'महाकुंभ और गंगा आरती: बनारस के घाटों पर आस्था और प्रकाश का अलौकिक संगम',
    category: 'photo',
    publishedAt: '1 दिन पहले',
    author: 'रवि शास्त्री, वाराणसी',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'दशाश्वमेध घाट पर दीपों की जगमगाहट और लाखों श्रद्धालुओं का श्रद्धा भाव। कैमरे की नज़र से देखिए पवित्र बनारस।',
    views: 89400,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
        caption: 'दशाश्वमेध घाट पर शाम की महाआरती का विहंगम दृश्य।',
        credit: 'रवि शास्त्री / दैनिक खबर',
      },
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        caption: 'गंगा की लहरों पर तैरते अनगिनत दीयों की रोशनी।',
        credit: 'दैनिक खबर फ़ोटो ब्यूरो',
      },
    ],
  },
];

export const INITIAL_LIVE_UPDATES: LiveBlogEntry[] = [
  {
    id: 'live-1',
    timestamp: '2026-10-07T11:45:00',
    timeDisplay: '11:45 पूर्वाह्न',
    title: 'इसरो अध्यक्ष का ताज़ा बयान: गगनयान परीक्षण में सभी पैरामीटर 100% सफल',
    content: 'कंट्रोल सेंटर से मिली जानकारी के अनुसार रॉकेट इंजन का थ्रस्ट और क्रू केबिन का वायुदाब निर्धारित मानकों के पूरी तरह अनुरूप पाया गया है।',
    isUrgent: true,
    author: 'डेस्क रिपोर्टर, नई दिल्ली',
  },
  {
    id: 'live-2',
    timestamp: '2026-10-07T11:20:00',
    timeDisplay: '11:20 पूर्वाह्न',
    title: 'सेंसेक्स में 700 अंकों का उछाल, विदेशी निवेशकों की बंपर लिवाली जारी',
    content: 'एचडीएफसी बैंक, रिलायंस इंडस्ट्रीज और टीसीएस के शेयरों में 2.5% की जोरदार तेजी के दम पर सूचकांक रिकॉर्ड स्तर पर पहुंचा।',
    isUrgent: false,
    author: 'बिजनेस डेस्क, मुंबई',
  },
  {
    id: 'live-3',
    timestamp: '2026-10-07T10:50:00',
    timeDisplay: '10:50 पूर्वाह्न',
    title: 'मौसम विभाग का अलर्ट: उत्तर भारत में अगले 48 घंटों में हल्की बारिश और तेज हवाएं संभव',
    content: 'पश्चिमी विक्षोभ की सक्रियता के कारण दिल्ली-एनसीआर, पंजाब और हरियाणा में तापमान में 3 से 4 डिग्री की गिरावट आने की संभावना।',
    isUrgent: false,
    author: 'मौसम केंद्र, नई दिल्ली',
  },
  {
    id: 'live-4',
    timestamp: '2026-10-07T10:15:00',
    timeDisplay: '10:15 पूर्वाह्न',
    title: 'उत्तर प्रदेश सरकार ने बुंदेलखंड एक्सप्रेसवे पर औद्योगिक गलियारे के लिए भूमि अधिग्रहण शुरू किया',
    content: 'कैबिनेट के फैसले के बाद चित्रकूट, बांदा और हमीरपुर में औद्योगिक क्लस्टर्स के लिए 1200 एकड़ जमीन अधिसूचित की गई।',
    isUrgent: false,
    author: 'राज्य ब्यूरो, लखनऊ',
  },
];

export const INITIAL_SPORTS_SCORE: SportsScore = {
  id: 'score-1',
  tournament: 'बॉर्डर-गावस्कर ट्रॉफी 2026',
  matchType: 'चौथा टेस्ट मैच (ब्रिस्बेन)',
  team1: {
    name: 'ऑस्ट्रेलिया',
    score: '369 & 294',
    overs: '84.2 ov',
  },
  team2: {
    name: 'भारत',
    score: '336 & 329/7',
    overs: '91.0 ov',
  },
  status: 'भारत 3 विकेट से विजयी',
  highlightText: 'ऋषभ पंत 112* (114 गेंद), शुभमन गिल 91 रन। ऐतिहासिक गाबा फतह।',
  isLive: false,
};

export const INITIAL_ADVERTISEMENTS: Advertisement[] = [
  {
    id: 'ad-header',
    position: 'header',
    enabled: true,
    sponsorName: 'राष्ट्रीय सौर ऊर्जा मिशन',
    headline: 'अपने घर की छत पर लगाएं सोलर पैनल, पाएं 40% तक सरकारी सब्सिडी',
    subtext: 'पीएम सूर्य घर मुफ्त बिजली योजना से जुड़ें और बिजली बिल शून्य करें',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=728&q=80',
    targetUrl: 'https://pmsuryaghar.gov.in',
    callToAction: 'अभी आवेदन करें →',
  },
  {
    id: 'ad-sidebar',
    position: 'sidebar',
    enabled: true,
    sponsorName: 'डिजिटल साक्षरता भारत',
    headline: 'मुफ्त तकनीकी कौशल सीखें',
    subtext: 'आर्टिफिशियल इंटेलिजेंस और कोडिंग के 100+ निःशुल्क कोर्सेज',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
    targetUrl: '#',
    callToAction: 'फ्री रजिस्टर करें',
  },
  {
    id: 'ad-infeed',
    position: 'in-feed',
    enabled: true,
    sponsorName: 'भारतीय स्टेट बैंक',
    headline: 'सुरक्षित और तीव्र डिजिटल बैंकिंग - कभी भी, कहीं भी',
    subtext: 'योनो ऐप डाउनलोड करें और पाएँ आकर्षक पर्सनल लोन ऑफर्स',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
    targetUrl: '#',
    callToAction: 'विस्तार से जानें',
  },
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandNameHi: 'दैनिक खबर',
  brandNameEn: 'Dainik Khabar',
  taglineHi: 'सत्य • निष्पक्षता • विश्वसनीयता',
  taglineEn: 'Truth • Impartiality • Credibility',
  logoUrl: '/src/assets/images/dainik_samvad_news_logo_1791380404722.jpg',
  contactEmail: 'editor@dainikkhabar.news',
  contactPhone: '+91 11 2345 6789',
  address: 'खबर भवन, 14 संसद मार्ग, नई दिल्ली 110001',
  socialLinks: {
    twitter: 'https://twitter.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    whatsapp: 'https://whatsapp.com',
    telegram: 'https://telegram.org',
    instagram: 'https://instagram.com',
  },
  adsEnabled: true,
  breakingNewsEnabled: true,
};

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-1',
    username: 'admin',
    name: 'राजेश माथुर',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'adm-2',
    username: 'editor',
    name: 'मीनाक्षी सेन',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  },
];
