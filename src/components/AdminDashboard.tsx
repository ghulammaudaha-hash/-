import React, { useState } from 'react';
import {
  X,
  FilePlus,
  ListFilter,
  Flame,
  Video,
  Camera,
  Settings,
  Radio,
  Trash2,
  Edit3,
  CheckCircle,
  Eye,
  LogOut,
  UserCheck,
  Shield,
  BarChart3,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { Article, CategoryId, AdminRole } from '../types/news';
import { CATEGORIES } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    adminUser,
    loginAdmin,
    logoutAdmin,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    breakingNews,
    addBreakingNews,
    updateBreakingNews,
    deleteBreakingNews,
    videos,
    addVideo,
    deleteVideo,
    photoStories,
    addPhotoStory,
    deletePhotoStory,
    liveUpdates,
    addLiveUpdate,
    deleteLiveUpdate,
    advertisements,
    toggleAd,
    siteSettings,
    updateSettings,
    resetToDefaults,
  } = useNews();

  // Tab State: 'overview' | 'articles' | 'new-article' | 'breaking' | 'videos' | 'photos' | 'ads' | 'settings'
  const [activeTab, setActiveTab] = useState<'overview' | 'articles' | 'new-article' | 'breaking' | 'videos' | 'photos' | 'ads' | 'settings'>('overview');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginRole, setLoginRole] = useState<AdminRole>('super_admin');

  // Edit / New Article Form State
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formSubhead, setFormSubhead] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryId>('india');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formFeaturedImage, setFormFeaturedImage] = useState('');
  const [formImageCaption, setFormImageCaption] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('राजेश माथुर');
  const [formAuthorRole, setFormAuthorRole] = useState('वरिष्ठ संपादक');
  const [formTags, setFormTags] = useState('भारत, राजनीति, विकास');
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [formIsLead, setFormIsLead] = useState(false);
  const [formSeoTitle, setFormSeoTitle] = useState('');
  const [formSeoDesc, setFormSeoDesc] = useState('');

  // New Breaking News Form
  const [newBnText, setNewBnText] = useState('');
  const [newBnUrgent, setNewBnUrgent] = useState(false);

  // New Video Form
  const [newVidTitle, setNewVidTitle] = useState('');
  const [newVidCategory, setNewVidCategory] = useState<CategoryId>('tech');
  const [newVidDuration, setNewVidDuration] = useState('04:30');
  const [newVidUrl, setNewVidUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [newVidThumb, setNewVidThumb] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80');
  const [newVidDesc, setNewVidDesc] = useState('');

  // Toast / feedback message
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  if (!isAdminOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(loginUsername, loginRole);
    showToast('सफलतापूर्वक लॉगिन किया गया!');
  };

  // Open Edit Mode
  const startEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setFormTitle(art.title);
    setFormSubhead(art.subhead || '');
    setFormCategory(art.category);
    setFormSummary(art.summary);
    setFormContent(art.content);
    setFormFeaturedImage(art.featuredImage);
    setFormImageCaption(art.imageCaption || '');
    setFormAuthorName(art.author.name);
    setFormAuthorRole(art.author.role);
    setFormTags(art.tags.join(', '));
    setFormStatus(art.status);
    setFormIsLead(!!art.isLeadStory);
    setFormSeoTitle(art.seoTitle || '');
    setFormSeoDesc(art.seoDescription || '');
    setActiveTab('new-article');
  };

  // Clear Form
  const resetArticleForm = () => {
    setEditingArticleId(null);
    setFormTitle('');
    setFormSubhead('');
    setFormCategory('india');
    setFormSummary('');
    setFormContent('');
    setFormFeaturedImage('https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80');
    setFormImageCaption('');
    setFormAuthorName(adminUser?.name || 'राजेश माथुर');
    setFormAuthorRole('संपादक');
    setFormTags('');
    setFormStatus('published');
    setFormIsLead(false);
    setFormSeoTitle('');
    setFormSeoDesc('');
  };

  // Save Article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArr = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const articleData = {
      title: formTitle,
      subhead: formSubhead,
      slug: formTitle.slice(0, 40).replace(/\s+/g, '-').toLowerCase(),
      category: formCategory,
      summary: formSummary,
      content: formContent.includes('<p') ? formContent : `<p class="mb-4">${formContent}</p>`,
      featuredImage: formFeaturedImage || 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      imageCaption: formImageCaption,
      author: {
        name: formAuthorName,
        role: formAuthorRole,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      },
      publishedAt: 'अभी-अभी',
      tags: tagsArr,
      readTime: '3 मिनट',
      status: formStatus,
      isLeadStory: formIsLead,
      seoTitle: formSeoTitle || formTitle,
      seoDescription: formSeoDesc || formSummary,
    };

    if (editingArticleId) {
      updateArticle(editingArticleId, articleData);
      showToast('लेख सफलतापूर्वक अपडेट किया गया!');
    } else {
      addArticle(articleData);
      showToast('नया समाचार लेख सफलतापूर्वक प्रकाशित किया गया!');
    }

    resetArticleForm();
    setActiveTab('articles');
  };

  // Save Breaking News
  const handleAddBreaking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBnText.trim()) return;
    addBreakingNews({
      textHi: newBnText,
      timestamp: 'अभी-अभी',
      isUrgent: newBnUrgent,
      active: true,
    });
    setNewBnText('');
    setNewBnUrgent(false);
    showToast('ब्रेकिंग न्यूज़ जोड़ी गई!');
  };

  // Save Video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVidTitle.trim()) return;
    addVideo({
      title: newVidTitle,
      category: newVidCategory,
      duration: newVidDuration,
      videoUrl: newVidUrl,
      thumbnailUrl: newVidThumb,
      publishedAt: 'अभी-अभी',
      description: newVidDesc,
      authorName: adminUser?.name || 'संपादकीय टीम',
      tags: ['वीडियो', 'दैनिक खबर'],
    });
    setNewVidTitle('');
    setNewVidDesc('');
    showToast('नया वीडियो जोड़ा गया!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] rounded-sm shadow-2xl flex flex-col overflow-hidden border border-stone-300">
        
        {/* Top Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded overflow-hidden shrink-0 border border-red-700/40 bg-red-800">
              <img
                src="/src/assets/images/dainik_samvad_news_logo_1791380404722.jpg"
                alt="दैनिक खबर लोगो"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">
                दैनिक खबर — संपादकीय नियंत्रण कक्ष (CMS)
              </h2>
              <p className="text-xs text-stone-400">
                सामग्री प्रबंधन, लाइव बुलेटिन एवं डिजिटल प्रकाशन प्रणाली
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {adminUser && (
              <div className="hidden sm:flex items-center gap-2 text-xs bg-stone-800 px-3 py-1.5 rounded">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-stone-200">{adminUser.name}</span>
                <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold uppercase">
                  {adminUser.role}
                </span>
                <button
                  onClick={logoutAdmin}
                  className="text-stone-400 hover:text-red-400 ml-2 cursor-pointer"
                  title="लॉगआउट"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 cursor-pointer"
              aria-label="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {toastMsg && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-6 flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Content Body: If NOT logged in, show login form */}
        {!adminUser ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full my-auto text-center">
            <Shield className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <h3 className="font-serif font-bold text-xl text-stone-900 mb-1">
              संपादकीय पोर्टल लॉगिन
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              दैनिक खबर के संपादकों, संवाददाताओं और व्यवस्थापकों के लिए सुरक्षित प्रवेश
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">उपयोगकर्ता नाम (Username):</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full text-sm p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">भूमिका (Role):</label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as AdminRole)}
                  className="w-full text-sm p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none bg-white"
                >
                  <option value="super_admin">सुपर एडमिन (Super Admin)</option>
                  <option value="editor">वरिष्ठ संपादक (Senior Editor)</option>
                  <option value="reporter">संवाददाता (Reporter)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-sm transition-colors cursor-pointer"
              >
                सुरक्षित लॉगिन करें
              </button>

              <p className="text-[11px] text-stone-400 text-center pt-2">
                डेमो के लिए किसी भी नाम से सीधा लॉगिन उपलब्ध है।
              </p>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard with Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-stone-100 border-r border-stone-200 p-4 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'overview' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>सिस्टम अवलोकन</span>
              </button>

              <button
                onClick={() => {
                  resetArticleForm();
                  setActiveTab('new-article');
                }}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'new-article' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <FilePlus className="w-4 h-4" />
                <span>नया लेख लिखें</span>
              </button>

              <button
                onClick={() => setActiveTab('articles')}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'articles' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <ListFilter className="w-4 h-4" />
                <span>लेख प्रबंधन ({articles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('breaking')}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'breaking' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>ब्रेकिंग न्यूज़ ({breakingNews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'videos' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>वीडियो प्रबंधन ({videos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('ads')}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'ads' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>विज्ञापन नियंत्रण</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 rounded text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                  activeTab === 'settings' ? 'bg-red-600 text-white' : 'text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>वेबसाइट सेटिंग्स</span>
              </button>
            </aside>

            {/* Main Tab Content */}
            <main className="flex-1 p-6 overflow-y-auto max-h-[calc(92vh-70px)] bg-white">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="font-serif font-black text-xl text-stone-900 pb-2 border-b border-stone-200">
                    संपादकीय डैशबोर्ड मेट्रिक्स
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded">
                      <span className="text-xs text-stone-500 font-bold block">कुल प्रकाशित लेख</span>
                      <span className="font-serif font-black text-2xl text-stone-900 mt-1 block">
                        {articles.length}
                      </span>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded">
                      <span className="text-xs text-stone-500 font-bold block">सक्रिय ब्रेकिंग खबरें</span>
                      <span className="font-serif font-black text-2xl text-red-600 mt-1 block">
                        {breakingNews.filter((b) => b.active).length}
                      </span>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded">
                      <span className="text-xs text-stone-500 font-bold block">लाइव वीडियो बुलेटिन</span>
                      <span className="font-serif font-black text-2xl text-stone-900 mt-1 block">
                        {videos.length}
                      </span>
                    </div>
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded">
                      <span className="text-xs text-stone-500 font-bold block">आज के कुल पाठक</span>
                      <span className="font-serif font-black text-2xl text-emerald-600 mt-1 block">
                        3,18,420
                      </span>
                    </div>
                  </div>

                  {/* Fast Action Buttons */}
                  <div className="p-5 bg-red-50/50 border border-red-200 rounded flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-base text-stone-900">
                        ताज़ा खबर अभी पोस्ट करें
                      </h4>
                      <p className="text-xs text-stone-600">
                        नया समाचार तुरंत होमपेज और मुख्य ग्रिड पर लाइव हो जाएगा।
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        resetArticleForm();
                        setActiveTab('new-article');
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>नया आर्टिकल बनाएं</span>
                    </button>
                  </div>

                  {/* Reset Demo Data Button */}
                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                    <span>डेमो डाटा रीसेट करना चाहते हैं?</span>
                    <button
                      onClick={() => {
                        if (confirm('क्या आप सभी डेमो डाटा को रीसेट करना चाहते हैं?')) {
                          resetToDefaults();
                          showToast('डिफ़ॉल्ट डेटा सफलतापूर्वक बहाल किया गया!');
                        }
                      }}
                      className="text-stone-600 hover:text-red-600 underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>रीसेट डिफ़ॉल्ट डेटा</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: NEW / EDIT ARTICLE FORM */}
              {activeTab === 'new-article' && (
                <form onSubmit={handleSaveArticle} className="space-y-4 max-w-4xl">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h3 className="font-serif font-black text-xl text-stone-900">
                      {editingArticleId ? 'समाचार लेख संपादित करें' : 'नया समाचार लेख प्रकाशित करें'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as any)}
                        className="text-xs p-1.5 border border-stone-300 rounded font-semibold bg-stone-50"
                      >
                        <option value="published">तुरंत प्रकाशित (Published)</option>
                        <option value="draft">ड्राफ्ट (Draft)</option>
                        <option value="scheduled">शेड्यूल (Scheduled)</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer shadow-xs"
                      >
                        {editingArticleId ? 'अपडेट सुरक्षित करें' : 'लेख प्रकाशित करें'}
                      </button>
                    </div>
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      हिंदी मुख्य शीर्षक (Headline) *
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="उदा. इसरो का बड़ा ऐलान: अगली पीढ़ी के चंद्रयान मिशन का नया रोडमैप तैयार"
                      required
                      className="w-full text-base font-serif p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  {/* Subhead */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      उप-शीर्षक (Subheadline):
                    </label>
                    <input
                      type="text"
                      value={formSubhead}
                      onChange={(e) => setFormSubhead(e.target.value)}
                      placeholder="संक्षिप्त परिप्रेक्ष्य या मुख्य बिंदु"
                      className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  {/* Category & Lead story toggle */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">श्रेणी (Category) *:</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as CategoryId)}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none bg-white font-semibold"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nameHi} ({c.nameEn})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">लेखक का नाम:</label>
                      <input
                        type="text"
                        value={formAuthorName}
                        onChange={(e) => setFormAuthorName(e.target.value)}
                        className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 text-xs font-bold text-stone-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formIsLead}
                          onChange={(e) => setFormIsLead(e.target.checked)}
                          className="w-4 h-4 text-red-600"
                        />
                        <span>होमपेज पर प्रमुख खबर (Lead Story) बनाएं</span>
                      </label>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        मुख्य चित्र URL (Featured Image URL):
                      </label>
                      <input
                        type="url"
                        value={formFeaturedImage}
                        onChange={(e) => setFormFeaturedImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        चित्र का विवरण एवं साभार (Caption):
                      </label>
                      <input
                        type="text"
                        value={formImageCaption}
                        onChange={(e) => setFormImageCaption(e.target.value)}
                        placeholder="उदा. श्रीहरिकोटा से प्रक्षेपण का दृश्य (फोटो साभार: इसरो)"
                        className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      संक्षिप्त सारांश (Summary/Deck) *:
                    </label>
                    <textarea
                      rows={2}
                      value={formSummary}
                      onChange={(e) => setFormSummary(e.target.value)}
                      placeholder="होमपेज कार्ड्स और सोशल शेयर के लिए 2 वाक्यों का सारांश"
                      required
                      className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Full Body Content */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      संपूर्ण समाचार सामग्री (Full Article Content) *:
                    </label>
                    <textarea
                      rows={8}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      placeholder="पैराग्राफ, कोट्स और विस्तृत विवरण यहां लिखें... (HTML टैग्स समर्थित हैं)"
                      required
                      className="w-full text-xs font-sans p-3 border border-stone-300 rounded focus:border-red-600 focus:outline-none leading-relaxed"
                    ></textarea>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      टैग्स (Tags - अल्पविराम से अलग करें):
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="उदा. इसरो, विज्ञान, अंतरिक्ष, चंद्रयान"
                      className="w-full text-xs p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </form>
              )}

              {/* TAB 3: ARTICLES LIST */}
              {activeTab === 'articles' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h3 className="font-serif font-black text-xl text-stone-900">
                      सभी प्रकाशित समाचार ({articles.length})
                    </h3>
                    <button
                      onClick={() => {
                        resetArticleForm();
                        setActiveTab('new-article');
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>नया जोड़ें</span>
                    </button>
                  </div>

                  <div className="divide-y divide-stone-200 border border-stone-200 rounded">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.featuredImage}
                            alt=""
                            className="w-14 h-10 object-cover rounded shrink-0 border"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase text-red-600">
                              {art.category}
                            </span>
                            <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                              {art.title}
                            </h4>
                            <span className="text-[11px] text-stone-400">
                              {art.publishedAt} · {art.views} व्यूज
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => startEditArticle(art)}
                            className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-stone-100 rounded cursor-pointer"
                            title="संपादित करें"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm('क्या आप इस लेख को हटाना चाहते हैं?')) {
                                deleteArticle(art.id);
                                showToast('लेख हटा दिया गया!');
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-red-50 rounded cursor-pointer"
                            title="हटाएं"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: BREAKING NEWS */}
              {activeTab === 'breaking' && (
                <div className="space-y-6">
                  <h3 className="font-serif font-black text-xl text-stone-900 pb-2 border-b border-stone-200">
                    लाइव ब्रेकिंग न्यूज़ टिकर नियंत्रण
                  </h3>

                  {/* Add Breaking News Form */}
                  <form onSubmit={handleAddBreaking} className="bg-stone-50 p-4 rounded border border-stone-200 space-y-3">
                    <h4 className="font-bold text-xs text-stone-800">नया ब्रेकिंग अलर्ट जोड़ें:</h4>
                    <input
                      type="text"
                      placeholder="ब्रेकिंग समाचार हेडलाइन लिखें..."
                      value={newBnText}
                      onChange={(e) => setNewBnText(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-1.5 text-xs text-red-600 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newBnUrgent}
                          onChange={(e) => setNewBnUrgent(e.target.checked)}
                        />
                        <span>अति-महत्वपूर्ण (Urgent Flash)</span>
                      </label>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer"
                      >
                        टिकर में जोड़ें
                      </button>
                    </div>
                  </form>

                  {/* Active List */}
                  <div className="space-y-2">
                    {breakingNews.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-white border border-stone-200 rounded flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <button
                            onClick={() => updateBreakingNews(item.id, { active: !item.active })}
                            className={`w-3 h-3 rounded-full cursor-pointer ${item.active ? 'bg-red-600' : 'bg-stone-300'}`}
                            title="सक्रिय/निष्क्रिय करें"
                          />
                          <span className="font-medium text-stone-900 truncate">{item.textHi}</span>
                          {item.isUrgent && (
                            <span className="text-[10px] bg-yellow-400 text-stone-900 px-1 font-bold rounded">
                              URGENT
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteBreakingNews(item.id)}
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: VIDEO MANAGEMENT */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <h3 className="font-serif font-black text-xl text-stone-900 pb-2 border-b border-stone-200">
                    वीडियो एवं बुलेटिन प्रबंधन
                  </h3>

                  <form onSubmit={handleAddVideo} className="bg-stone-50 p-4 rounded border border-stone-200 space-y-3">
                    <h4 className="font-bold text-xs text-stone-800">नया वीडियो अपलोड/लिंक करें:</h4>
                    <input
                      type="text"
                      placeholder="वीडियो का शीर्षक *"
                      value={newVidTitle}
                      onChange={(e) => setNewVidTitle(e.target.value)}
                      required
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="url"
                        placeholder="वीडियो URL (MP4 या YouTube) *"
                        value={newVidUrl}
                        onChange={(e) => setNewVidUrl(e.target.value)}
                        required
                        className="text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                      <input
                        type="url"
                        placeholder="थंबनेल इमेज URL *"
                        value={newVidThumb}
                        onChange={(e) => setNewVidThumb(e.target.value)}
                        required
                        className="text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={newVidCategory}
                        onChange={(e) => setNewVidCategory(e.target.value as CategoryId)}
                        className="text-xs p-2.5 bg-white border border-stone-300 rounded"
                      >
                        <option value="tech">टेक्नोलॉजी</option>
                        <option value="politics">राजनीति</option>
                        <option value="sports">खेल</option>
                        <option value="world">दुनिया</option>
                      </select>
                      <input
                        type="text"
                        placeholder="अवधि (उदा. 05:40)"
                        value={newVidDuration}
                        onChange={(e) => setNewVidDuration(e.target.value)}
                        className="text-xs p-2.5 bg-white border border-stone-300 rounded"
                      />
                    </div>
                    <textarea
                      placeholder="संक्षिप्त विवरण..."
                      rows={2}
                      value={newVidDesc}
                      onChange={(e) => setNewVidDesc(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded"
                    ></textarea>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer"
                      >
                        वीडियो प्रकाशित करें
                      </button>
                    </div>
                  </form>

                  {/* Video List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {videos.map((vid) => (
                      <div key={vid.id} className="p-3 bg-white border border-stone-200 rounded flex gap-3 items-center justify-between">
                        <div className="flex gap-2 items-center min-w-0">
                          <img src={vid.thumbnailUrl} alt="" className="w-16 h-10 object-cover rounded shrink-0" />
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs truncate">{vid.title}</h5>
                            <span className="text-[10px] text-stone-400">{vid.duration} · {vid.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteVideo(vid.id)}
                          className="text-stone-400 hover:text-red-600 p-1 cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: ADS MANAGEMENT */}
              {activeTab === 'ads' && (
                <div className="space-y-6">
                  <h3 className="font-serif font-black text-xl text-stone-900 pb-2 border-b border-stone-200">
                    डिजिटल विज्ञापन प्रणाली (Ad Management)
                  </h3>

                  <div className="space-y-3">
                    {advertisements.map((ad) => (
                      <div
                        key={ad.id}
                        className="p-4 bg-white border border-stone-200 rounded flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase text-stone-500">
                              स्थान: {ad.position}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${ad.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                              {ad.enabled ? 'सक्रिय (ACTIVE)' : 'निष्क्रिय (DISABLED)'}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm text-stone-900">{ad.headline}</h4>
                          <span className="text-xs text-stone-500">{ad.sponsorName}</span>
                        </div>

                        <button
                          onClick={() => toggleAd(ad.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded cursor-pointer transition-colors ${
                            ad.enabled
                              ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {ad.enabled ? 'बंद करें' : 'सक्रिय करें'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SETTINGS & SEO */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  <h3 className="font-serif font-black text-xl text-stone-900 pb-2 border-b border-stone-200">
                    वेबसाइट एवं SEO सेटिंग्स
                  </h3>

                  <div className="space-y-4 text-xs">
                    {/* Logo Management */}
                    <div className="p-4 bg-stone-50 border border-stone-200 rounded">
                      <label className="block font-bold text-stone-800 text-sm mb-2">वेबसाइट लोगो (Official Logo):</label>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-16 h-16 rounded border border-stone-300 bg-stone-900 overflow-hidden shrink-0">
                          <img
                            src={siteSettings.logoUrl || '/src/assets/images/dainik_samvad_news_logo_1791380404722.jpg'}
                            alt="लोगो पूर्वावलोकन"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-stone-600 mb-1">
                            वर्तमान में सक्रिय आधिकारिक संपादकीय सील लोगो। हेडर और फुटर में स्वतः दिखाई देगा।
                          </p>
                          <span className="text-[11px] text-emerald-600 font-bold">✓ सक्रिय लोगो प्रदर्शित हो रहा है</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block font-bold text-stone-700">कस्टम लोगो छवि URL:</label>
                        <input
                          type="url"
                          value={siteSettings.logoUrl || ''}
                          onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                          placeholder="/src/assets/images/dainik_samvad_news_logo_1791380404722.jpg"
                          className="w-full p-2 border border-stone-300 rounded focus:border-red-600 focus:outline-none bg-white font-mono text-[11px]"
                        />
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              updateSettings({ logoUrl: '/src/assets/images/dainik_samvad_news_logo_1791380404722.jpg' });
                              showToast('आधिकारिक संपादकीय लोगो बहाल किया गया!');
                            }}
                            className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded font-semibold text-[11px] cursor-pointer"
                          >
                            आधिकारिक सील लोगो बहाल करें
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">संपादकीय टैगलाइन (Hindi):</label>
                      <input
                        type="text"
                        value={siteSettings.taglineHi}
                        onChange={(e) => updateSettings({ taglineHi: e.target.value })}
                        className="w-full p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">संपादकीय ईमेल संपर्क:</label>
                      <input
                        type="email"
                        value={siteSettings.contactEmail}
                        onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                        className="w-full p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">कार्यालय का पता:</label>
                      <input
                        type="text"
                        value={siteSettings.address}
                        onChange={(e) => updateSettings({ address: e.target.value })}
                        className="w-full p-2.5 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-stone-200">
                      <span className="font-bold text-stone-800 block mb-2">XML Sitemap और Schema स्टेटस:</span>
                      <p className="text-stone-500">
                        साइटमैप स्वचालित रूप से Google News और Schema.org NewsMediaOrganization मानकों के अनुरूप अपडेट होता है।
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>
    </div>
  );
};
