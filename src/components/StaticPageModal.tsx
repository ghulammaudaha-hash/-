import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const StaticPageModal: React.FC = () => {
  const { activeModal, setActiveModal, articles, categories: catList } = useNews() as any;

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-sm shadow-2xl flex flex-col overflow-hidden border border-stone-200">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <span className="font-serif font-bold text-base">
            {activeModal === 'about' && 'हमारे बारे में (About Dainik Khabar)'}
            {activeModal === 'editorial' && 'संपादकीय नीति एवं आचार संहिता (Editorial Policy)'}
            {activeModal === 'privacy' && 'गोपनीयता नीति (Privacy Policy)'}
            {activeModal === 'terms' && 'नियम एवं शर्तें (Terms & Conditions)'}
            {activeModal === 'advertise' && 'विज्ञापन के अवसर (Advertise With Us)'}
            {activeModal === 'sitemap' && 'वेबसाइट साइटमैप (XML Sitemap Overview)'}
          </span>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1 text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-stone-700 leading-relaxed font-sans">
          
          {activeModal === 'about' && (
            <>
              <h3 className="font-serif font-black text-xl text-stone-900">
                दैनिक खबर: निष्पक्ष पत्रकारिता का सशक्त मंच
              </h3>
              <p>
                <strong>दैनिक खबर</strong> भारत का एक अग्रणी और स्वतंत्र डिजिटल हिंदी समाचार पोर्टल है, जिसकी स्थापना तथ्यों की शुद्धता, संवैधानिक मूल्यों और बेबाक जन-सरोकारों को प्राथमिकता देने के उद्देश्य से की गई है।
              </p>
              <h4 className="font-serif font-bold text-base text-stone-900 mt-4">
                हमारे तीन मूल स्तंभ:
              </h4>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>सत्य:</strong> प्रत्येक खबर का दोहरे स्रोतों से कठोर सत्यापन।</li>
                <li><strong>निष्पक्षता:</strong> किसी भी राजनीतिक या व्यावसायिक पूर्वाग्रह से मुक्त रिपोर्टिंग।</li>
                <li><strong>विश्वसनीयता:</strong> सनसनीखेज फेक न्यूज़ के दौर में ठोस और तथ्यात्मक विश्लेषण।</li>
              </ul>
              <p className="mt-3">
                हमारा मुख्यालय नई दिल्ली में स्थित है, और देश भर के सभी राज्यों में हमारे अनुभवी संवाददाताओं का नेटवर्क 24 घंटे कार्यरत है।
              </p>
            </>
          )}

          {activeModal === 'editorial' && (
            <>
              <h3 className="font-serif font-black text-xl text-stone-900">
                संपादकीय दिशानिर्देश एवं त्रुटि सुधार नीति
              </h3>
              <p>
                दैनिक खबर प्रेस काउंसिल ऑफ इंडिया (PCI) और डिजिटल समाचार प्रकाशक आचार संहिता का पूर्णतः पालन करता है।
              </p>
              <h4 className="font-serif font-bold text-base text-stone-900 mt-3">
                1. सत्यता और तथ्य-जांच (Fact Checking)
              </h4>
              <p>
                हमारी संपादकीय डेस्क केवल आधिकारिक वक्तव्यों, ज़मीनी साक्ष्यों और प्रामाणिक दस्तावेजों के आधार पर खबरें प्रकाशित करती है। सोशल मीडिया पर प्रसारित अपुष्ट दावों को तब तक प्रसारित नहीं किया जाता जब तक उनकी प्रामाणिकता सिद्ध न हो।
              </p>
              <h4 className="font-serif font-bold text-base text-stone-900 mt-3">
                2. भूल सुधार नीति (Corrections Policy)
              </h4>
              <p>
                यदि किसी रिपोर्ट में अनजाने में कोई तथ्यात्मक त्रुटि होती है, तो उसे तुरंत सार्वजनिक नोट के साथ सुधारा जाता है। पाठक हमें <span className="font-mono text-red-600">editor@dainikkhabar.news</span> पर सीधे सुधार हेतु लिख सकते हैं।
              </p>
            </>
          )}

          {activeModal === 'privacy' && (
            <>
              <h3 className="font-serif font-black text-xl text-stone-900">
                उपयोगकर्ता गोपनीयता सुरक्षा नीति
              </h3>
              <p>
                हम अपने पाठकों की गोपनीयता का सम्मान करते हैं। यह नीति स्पष्ट करती है कि हम किस प्रकार सूचनाओं को सुरक्षित रखते हैं।
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>हम पाठकों से उनकी सहमति के बिना कोई भी व्यक्तिगत वित्तीय डेटा एकत्रित नहीं करते।</li>
                <li>न्यूज़लेटर सदस्यता हेतु केवल ईमेल पता दर्ज किया जाता है, जिसे किसी तीसरे पक्ष को बेचा या साझा नहीं किया जाता।</li>
                <li>वेबसाइट के सुचारू संचालन और पाठक वरीयताओं को समझने हेतु सामान्य कुकीज़ (Cookies) का उपयोग किया जाता है।</li>
              </ul>
            </>
          )}

          {activeModal === 'terms' && (
            <>
              <h3 className="font-serif font-black text-xl text-stone-900">
                वेबसाइट उपयोग के नियम एवं शर्तें
              </h3>
              <p>
                दैनिक खबर पोर्टल का उपयोग करने पर आप निम्नलिखित शर्तों से सहमत होते हैं:
              </p>
              <ul className="list-disc list-inside space-y-1.5 mt-2">
                <li>पोर्टल पर प्रकाशित सभी टेक्स्ट, वीडियो और छवियां कॉपीराइट संरक्षित हैं।</li>
                <li>कमेंट सेक्शन में किसी भी प्रकार की अभद्र, साम्प्रदायिक या गैर-कानूनी टिप्पणी पर विधिक कार्रवाई की जा सकती है।</li>
                <li>संपादक को किसी भी आपत्तिजनक टिप्पणी को बिना पूर्व सूचना हटाने का अधिकार है।</li>
              </ul>
            </>
          )}

          {activeModal === 'advertise' && (
            <>
              <h3 className="font-serif font-black text-xl text-stone-900">
                दैनिक खबर पर अपने ब्रांड का प्रचार करें
              </h3>
              <p>
                लाखों जागरूक हिंदी पाठकों तक सीधे पहुंचें। हमारे पास बैनर, स्पॉन्सर्ड आर्टिकल्स और वीडियो प्रायोजन के विविध विकल्प उपलब्ध हैं।
              </p>
              <div className="bg-stone-100 p-4 rounded text-xs space-y-1 mt-3">
                <p><strong>विज्ञापन संपर्क:</strong> ads@dainikkhabar.news</p>
                <p><strong>फ़ोन:</strong> +91 11 2345 6789</p>
                <p><strong>मासिक पृष्ठ दृश्य (Pageviews):</strong> 1.5 करोड़+</p>
              </div>
            </>
          )}

          {activeModal === 'sitemap' && (
            <>
              <h3 className="font-serif font-black text-xl text-stone-900">
                XML साइटमैप संरचना
              </h3>
              <p className="text-xs text-stone-600 mb-3">
                सर्च इंजन बॉट्स और Google News बॉट्स के लिए अनुक्रमित मुख्य URL संरचना:
              </p>
              <div className="bg-stone-900 text-stone-200 p-4 rounded font-mono text-xs space-y-1 overflow-x-auto">
                <p>https://dainikkhabar.news/sitemap.xml</p>
                <p>https://dainikkhabar.news/news-sitemap.xml (Google News)</p>
                <p>https://dainikkhabar.news/category/india</p>
                <p>https://dainikkhabar.news/category/world</p>
                <p>https://dainikkhabar.news/category/up</p>
                <p>https://dainikkhabar.news/category/sports</p>
                <p>https://dainikkhabar.news/category/tech</p>
                <p>https://dainikkhabar.news/video</p>
                <p>https://dainikkhabar.news/photo</p>
                <p>https://dainikkhabar.news/live</p>
              </div>
            </>
          )}

        </div>

        {/* Modal Bottom */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 text-right">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-1.5 bg-stone-900 text-white rounded text-xs font-bold cursor-pointer"
          >
            बंद करें
          </button>
        </div>

      </div>
    </div>
  );
};
