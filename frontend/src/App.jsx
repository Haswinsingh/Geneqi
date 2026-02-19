import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import GenderDashboard from './pages/GenderDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SectionDetail from './pages/SectionDetail';
import ChatBot from './components/ChatBot';
import ConsentPopup from './components/ConsentPopup';
import { Languages, Shield, LogOut } from 'lucide-react';

export const AppContext = createContext();

const Navigation = () => {
    const { lang, setLang, t, user, logout } = useContext(AppContext);
    // Removed useNavigate since it's not used directly here

    return (
        <nav>
            <div className="container h-20 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
                    <Shield className="text-primary group-hover:rotate-12 transition-transform" size={28} />
                    <span className="font-heading tracking-tight">Geneqi</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link to="/" className="text-text-muted hover:text-white transition-colors">{t('Home')}</Link>
                    <Link to="/about" className="text-text-muted hover:text-white transition-colors">{t('About Mission')}</Link>
                    <Link to="/contact" className="text-text-muted hover:text-white transition-colors">{t('Contact')}</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                        className="btn-glass px-3 py-2 text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                        <Languages size={14} /> {lang === 'en' ? 'Tamil' : 'English'}
                    </button>
                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium hidden sm:block">{t('Hello')}, {user.username}</span>
                            <button onClick={logout} className="btn btn-glass px-4 py-2 text-sm flex items-center gap-2 hover:bg-red-500/20 hover:border-red-500/50">
                                <LogOut size={16} /> {t('Logout')}
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary px-5 py-2.5 text-sm">
                            {t('Login')}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

function App() {
    const [lang, setLang] = useState('en');
    const [consent, setConsent] = useState(localStorage.getItem('user-consent') === 'true');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    const translations = {
        en: {
            heroTitle: "Choose Your Path to Support and Opportunity",
            heroSub: "Access scholarships, healthcare, welfare schemes, and legal support tailored to your needs.",
            male: "Male",
            female: "Female",
            others: "Transgender / Others",
            "Home": "Home",
            "About Mission": "About Mission",
            "Contact": "Contact",
            "Login": "Login",
            "Logout": "Logout",
            "Hello": "Hello",
            "Dashboard": "Dashboard",
            "Empowering": "Empowering",
            "Curated resources": "Curated resources, legal support, and opportunities specifically tailored for you.",
            "Scholarships & Mentorship": "Scholarships & Mentorship",
            "Health & Fitness": "Health & Fitness",
            "Employment & Schemes": "Employment & Schemes",
            "Legal Support": "Legal Support",
            "Social Security": "Social Security",
            "Scholarships for Girls": "Scholarships for Girls",
            "Maternity & Health": "Maternity & Health",
            "Women Empowerment": "Women Empowerment",
            "Safety & Legal Rights": "Safety & Legal Rights",
            "Social Support": "Social Support",
            "Inclusive Education": "Inclusive Education",
            "Inclusive Healthcare": "Inclusive Healthcare",
            "Livelihood & Rights": "Livelihood & Rights",
            "Legal Protection": "Legal Protection",
            "Social Welfare": "Social Welfare",
            "View All": "View All",
            "Apply Now": "Apply Now",
            "VERIFIED": "VERIFIED",
            "Back to Dashboard": "Back to Dashboard",
            "Dashboard not found for": "Dashboard not found for",
            "No specific schemes found for this category yet.": "No specific schemes found for this category yet."
        },
        ta: {
            heroTitle: "ஆதரவு மற்றும் வாய்ப்புக்கான உங்கள் பாதையைத் தேர்வுசெய்க",
            heroSub: "உங்கள் தேவைகளுக்கு ஏற்ப உதவித்தொகை, சுகாதாரம் மற்றும் சட்ட ஆதரவை அணுகவும்.",
            male: "ஆண்",
            female: "பெண்",
            others: "திருநங்கை / மற்றவர்",
            "Home": "முகப்பு",
            "About Mission": "எங்கள் நோக்கம்",
            "Contact": "தொடர்பு",
            "Login": "உள்நுழைக",
            "Logout": "வெளியேறு",
            "Hello": "வணக்கம்",
            "Dashboard": "டாஷ்போர்டு",
            "Empowering": "அதிகாரம் பெறும்",
            "Curated resources": "உங்களுக்காக பிரத்யேகமாகத் தொகுக்கப்பட்ட வளங்கள், சட்ட ஆதரவு மற்றும் வாய்ப்புகள்.",
            "Scholarships & Mentorship": "உதவித்தொகை & வழிகாட்டுதல்",
            "Health & Fitness": "சுகாதாரம் & உடற்தகுதி",
            "Employment & Schemes": "வேலைவாய்ப்பு & திட்டங்கள்",
            "Legal Support": "சட்ட ஆதரவு",
            "Social Security": "சமூக பாதுகாப்பு",
            "Scholarships for Girls": "பெண்களுக்கான உதவித்தொகை",
            "Maternity & Health": "மகப்பேறு & சுகாதாரம்",
            "Women Empowerment": "பெண்கள் அதிகாரம்",
            "Safety & Legal Rights": "பாதுகாப்பு & சட்ட உரிமைகள்",
            "Social Support": "சமூக ஆதரவு",
            "Inclusive Education": "உள்ளடக்கிய கல்வி",
            "Inclusive Healthcare": "உள்ளடக்கிய சுகாதாரம்",
            "Livelihood & Rights": "வாழ்வாதாரம் & உரிமைகள்",
            "Legal Protection": "சட்ட பாதுகாப்பு",
            "Social Welfare": "சமூக நலம்",
            "View All": "அனைத்தையும் காண்க",
            "Apply Now": "விண்ணப்பிக்க",
            "VERIFIED": "சரிபார்க்கப்பட்டது",
            "Back to Dashboard": "டாஷ்போர்டுக்கு திரும்பு",
            "Dashboard not found for": "டாஷ்போர்டு கிடைக்கவில்லை -",
            "No specific schemes found for this category yet.": "இந்த வகைக்கு குறிப்பிட்ட திட்டங்கள் எதுவும் இல்லை."
        }
    };

    const t = (key) => translations[lang][key] || key;

    return (
        <AppContext.Provider value={{ lang, setLang, t, user, login, logout }}>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="bg-mesh"></div>
                <div className="glow-orb"></div>
                <Navigation />

                <main className="pt-24 min-h-screen">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/dashboard/:gender" element={<GenderDashboard />} />
                        <Route path="/dashboard/:gender/:sectionId" element={<SectionDetail />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>

                <ChatBot />
                {!consent && <ConsentPopup onAccept={() => {
                    setConsent(true);
                    localStorage.setItem('user-consent', 'true');
                }} />}
            </Router>
        </AppContext.Provider>
    );
}

export default App;
