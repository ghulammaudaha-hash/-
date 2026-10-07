import React from 'react';
import {
  ArrowUp,
  Twitter,
  Facebook,
  Youtube,
  Send,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { CATEGORIES } from '../data/initialData';
import { CategoryId } from '../types/news';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const {
    siteSettings,
    setSelectedCategory,
    setActiveArticleId,
    setActiveModal,
    language,
  } = useNews();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-stone-300 pt-12 pb-8 border-t-4 border-red-600 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer: Brand, Tagline, and Social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-8 border-b border-stone-800 gap-6">
          <Logo variant="dark" size="md" />

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={siteSettings.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="X / Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={siteSettings.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded bg-stone-800 hover:bg-red-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="ml-4 w-9 h-9 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="ऊपर जाएं"
              aria-label="ऊपर जाएं"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4-Column Footer Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-xs">
          {/* Column 1: Categories Part 1 */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 pb-1 border-b border-stone-800">
              {language === 'hi' ? 'प्रमुख समाचार' : 'News Sections'}
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {language === 'hi' ? cat.nameHi : cat.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories Part 2 */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 pb-1 border-b border-stone-800">
              {language === 'hi' ? 'विशेष एवं मल्टीमीडिया' : 'Special & Multimedia'}
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(6, 12).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {language === 'hi' ? cat.nameHi : cat.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate & Policies */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 pb-1 border-b border-stone-800">
              {language === 'hi' ? 'संस्थागत एवं नीतियां' : 'Editorial & Policies'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  हमारे बारे में (About Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('editorial')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  संपादकीय नीति (Editorial Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('privacy')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  गोपनीयता नीति (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('terms')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  नियम एवं शर्तें (Terms & Conditions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('advertise')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  विज्ञापन दें (Advertise With Us)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('sitemap')}
                  className="text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  साइटमैप (XML Sitemap)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 pb-1 border-b border-stone-800">
              {language === 'hi' ? 'मुख्यालय संपर्क' : 'Contact Office'}
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>{siteSettings.contactEmail}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>{siteSettings.contactPhone}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 border-t border-stone-800 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 दैनिक खबर (Dainik Khabar Media Network). सर्वाधिकार सुरक्षित। किसी भी सामग्री का अनधिकृत पुनरुत्पादन प्रतिबंधित है।
          </p>
          <div className="flex items-center gap-4">
            <span>RNI Regn No: DELHIN/2026/84920</span>
            <span>·</span>
            <span>प्रेस काउंसिल ऑफ इंडिया के मानकों के अनुरूप</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
