import { useState, useEffect } from 'react';
import { 
  Shield, ChevronRight, X, Terminal, 
  AlertTriangle, CheckCircle2, ArrowRight, 
  Users, Network 
} from 'lucide-react';

import { createClient } from '@supabase/supabase-js';
let supabase = null;
try {
  const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch {
  console.warn("Supabase credentials not found. Running in local mock mode.");
}

const THEMES = {
  corporate: {
    bg: 'bg-slate-50',
    text: 'text-slate-900',
    card: 'bg-white shadow-xl border border-slate-200',
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    input: 'bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900',
    font: 'font-sans',
    headerFont: 'font-serif',
    accent: 'text-blue-600',
    badge: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  terminal: {
    bg: 'bg-[#0a0a0a]',
    text: 'text-[#00ff41]',
    card: 'bg-black border border-[#00ff41]/30',
    primary: 'bg-[#00ff41] text-black hover:bg-[#00cc33]',
    secondary: 'bg-black border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41]/10',
    input: 'bg-black border border-[#00ff41]/30 text-[#00ff41] focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41]',
    font: 'font-mono',
    headerFont: 'font-mono tracking-tight',
    accent: 'text-[#00ff41]',
    badge: 'bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/30',
  },
  operations: {
    bg: 'bg-slate-50',
    text: 'text-slate-800',
    card: 'bg-white shadow-xl border border-indigo-100 rounded-3xl',
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
    secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl',
    input: 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl',
    font: 'font-sans',
    headerFont: 'font-sans tracking-tight',
    accent: 'text-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  }
};

const LandingPage = ({ onNavigate }) => {
  const [isHtnModalOpen, setIsHtnModalOpen] = useState(false);
  const theme = THEMES.operations; // Landing page defaults to the clean ops look

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} ${theme.font} selection:bg-indigo-200 selection:text-indigo-900`}>
      <HtnModal isOpen={isHtnModalOpen} onClose={() => setIsHtnModalOpen(false)} theme={theme} />

      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-indigo-100">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
          <img
              src="/favicon.svg"
              alt="PYM ENERGY"
              className="h-10 w-auto"
            />
          <h1 className={`text-xl font-bold ${theme.headerFont} tracking-wide text-slate-900`} >
            PYM ENERGY
            </h1>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://www.peplink.com" 
            target="_blank" 
            rel="noreferrer"
            className="hidden md:flex items-center shrink-0 transition-opacity hover:opacity-90"
            title="Authorized Peplink Silver Partner"
          >
            <img 
              src="/peplink-silver-partner.svg" 
              alt="Peplink Silver Partner" 
              className="h-16 w-auto shrink-0"
            />
          </a>
          <button 
            onClick={() => setIsHtnModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <Shield size={14} />
            HTN Compliant
          </button>
          <button 
            onClick={() => onNavigate('/ops')}
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Run Diagnostic <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl sm:text-6xl font-extrabold ${theme.headerFont} tracking-tight text-slate-900 mb-6 leading-tight`}>
            Fix operational bottlenecks.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              Deploy resilient systems.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            We diagnose software friction and automate manual workflows. Get clear technical blueprints through an asynchronous audit—no sales calls required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('/ops')}
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
            >
              Initiate Triage Flow <ChevronRight size={18} />
            </button>
            <span className="text-sm text-slate-500 font-medium">No sales calls. Async blueprints.</span>
          </div>
        </div>
      </section>

      {/* Leadership Profile */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <img 
              src="tymz_headshot.png" 
              alt="Tymz Pollack" 
              className="relative z-10 rounded-3xl shadow-xl w-full max-w-md mx-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
              <Terminal size={14} /> Lead Architect
            </div>
            <h3 className={`text-3xl font-bold ${theme.headerFont} text-slate-900 mb-2`}>Tymz Pollack</h3>
            <p className="text-indigo-600 font-medium mb-6">MBA, BSIT</p>
            
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Tymz Pollack combines 15 years of software engineering with an MBA in systems strategy. He builds custom data integrations, automates backend handoffs, and designs fault-tolerant networks for growing operations.
              </p>
            </div>
            
            <div className="mt-8 flex gap-4">
              <a href="https://linkedin.com/in/tymzpollack" target="_blank" rel="noreferrer" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                Connect on LinkedIn &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className={`text-3xl font-bold ${theme.headerFont} text-slate-900 mb-4`}>Operational Architecture</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">We don't offer open-ended consulting. We deploy rapid, structural sprints to eliminate technical and operational debt.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <CheckCircle2 size={24} />
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="text-xl font-bold text-slate-900">Systems & Operations Audit</h4>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">$500</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A structured 2-week diagnosis of software bottlenecks, manual data entry, and workflow friction. Includes a comprehensive action brief.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <Users size={24} />
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="text-xl font-bold text-slate-900">Fractional Systems Leadership</h4>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">$1,500/mo</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Dedicated asynchronous advisory and monthly reviews to keep internal systems stable as operations scale.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 text-amber-600">
                  <Network size={24} />
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="text-xl font-bold text-slate-900">Peplink Network Architecture</h4>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">Silver VAR</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Certified multi-WAN bonding, SpeedFusion failover tuning, and enterprise router deployment for mission-critical connectivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-slate-900 py-16 px-6 text-center">
        <h3 className={`text-3xl font-bold ${theme.headerFont} text-white mb-6`}>Identify your operational bottlenecks.</h3>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Submit your tech stack and current friction points through our intake portal. Qualified submissions receive a custom video diagnosis within 48 hours.
        </p>
        <button 
          onClick={() => onNavigate('/ops')}
          className="bg-indigo-500 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-indigo-400 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
        >
          Start Async Diagnostic &gt;_
        </button>

        {/* Peplink Authorized Reseller & Brand Clear Space */}
        <div className="mt-16 pt-12 border-t border-slate-800 flex flex-col items-center">
          <div className="py-6 px-12 mb-3">
            <img 
              src="/peplink_logo.svg" 
              alt="Peplink" 
              className="w-28 h-auto mx-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            PYM Energy, LLC is an Authorized Peplink Silver Value-Added Reseller providing certified SpeedFusion SD-WAN engineering and Tier-1 enterprise hardware support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
            <span>&copy; {new Date().getFullYear()} PYM Energy, LLC.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1"><Shield size={12} /> HTN Compliant Architecture</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const HtnModal = ({ isOpen, onClose, theme }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
    <div className={`max-w-lg w-full p-6 rounded-lg ${theme.card} ${theme.font} relative shadow-2xl`}>
      <button onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity">
        <X size={20} />
      </button>
      <div className="flex items-center gap-3 mb-4">
        <Shield className={theme.accent} size={24} />
        <h3 className={`text-xl ${theme.headerFont} font-semibold`}>Horizon Trust Network (HTN)</h3>
      </div>
      <div className="space-y-4 opacity-90 text-sm leading-relaxed">
        <p>
          The Horizon Trust Network (HTN) is a federated 501(c)(3) standard for data privacy, infrastructural integrity, and educational resource allocation.
        </p>
        <p>
          <strong>Why we require compliance:</strong><br/>
          PYM Energy operates under strict HTN guidelines. We do not sell, syndicate, or broker your operational data. All diagnostic information submitted through this portal is encrypted and used exclusively for architectural feasibility assessments.
        </p>
        <p>
          <strong>The Blueprint Initiative:</strong><br/>
          Capital generated from PYM Energy integrations directly supports HTN's objective of establishing decentralized, high-tech vocational academies in the midwest corridor.
        </p>
      </div>
      <button 
        onClick={onClose}
        className={`mt-6 w-full py-2 px-4 rounded ${theme.primary} font-medium transition-colors`}
      >
        Acknowledge & Close
      </button>
    </div>
  </div>
);

const TriageFlow = ({ currentPath, onNavigate }) => {
  const determineTheme = (path) => {
    const lowerPath = path.toLowerCase();
    if (lowerPath.includes('/audit')) return 'corporate';
    if (lowerPath.includes('/dev')) return 'terminal';
    return 'operations';
  };

  const themeName = determineTheme(currentPath);
  const [step, setStep] = useState(1);
  const [isHtnModalOpen, setIsHtnModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    painPoint: '',
    techStack: '',
    budgetQualified: null,
    email: ''
  });
  const [isRejected, setIsRejected] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = THEMES[themeName] || THEMES.operations;

  const handleNext = () => setStep(s => s + 1);
  
  const handleBudgetSelection = (qualified) => {
    setFormData({ ...formData, budgetQualified: qualified });
    if (!qualified) {
      setIsRejected(true);
    } else {
      handleNext();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      if (supabase) {
        const { error } = await supabase.rpc('submit_triage_lead', {
          p_email: formData.email,
          p_pain_point: formData.painPoint,
          p_tech_stack: formData.techStack,
          p_budget_qualified: formData.budgetQualified
        });
        
        if (error) throw error;
        
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit diagnostic:", error);
      alert("System Error: Could not establish connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (isRejected) {
      return (
        <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4 text-amber-500">
            <AlertTriangle size={24} />
            <h2 className={`text-xl ${theme.headerFont} font-semibold`}>Diagnostic Terminated</h2>
          </div>
          <p className="mb-6 opacity-90 leading-relaxed">
            PYM Energy architecture sprints require a minimum capital allocation to ensure immediate, frictionless deployment. We do not engage in open-ended consulting retainers.
          </p>
          <p className="opacity-90 leading-relaxed">
            We recommend revisiting this diagnostic once the operational budget is secured for this fiscal quarter.
          </p>
          <button 
            onClick={() => onNavigate('/')}
            className={`mt-8 px-4 py-2 text-sm rounded-md font-medium transition-all ${theme.secondary}`}
          >
            Return to Home
          </button>
        </div>
      );
    }

    if (isSubmitted) {
      return (
        <div className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
          <CheckCircle2 size={48} className={`mx-auto mb-4 ${theme.accent}`} />
          <h2 className={`text-2xl ${theme.headerFont} font-semibold mb-2`}>Protocol Initiated</h2>
          <p className="opacity-90 max-w-md mx-auto mb-8">
            Diagnostic parameters received. A systems architect will review your stack and return a custom structural blueprint and video briefing to <strong>{formData.email}</strong> within 48 hours.
          </p>
          <button 
            onClick={() => onNavigate('/')}
            className={`px-6 py-2 text-sm rounded-md font-medium transition-all ${theme.secondary}`}
          >
            Return to Home
          </button>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className={`text-xl ${theme.headerFont} font-semibold mb-2`}>1. Define Operational Friction</h2>
            <p className="text-sm opacity-70 mb-6">Identify the primary bottleneck in your current data workflow.</p>
            <textarea
              autoFocus
              className={`w-full p-3 rounded-xl min-h-[120px] outline-none transition-all ${theme.input}`}
              placeholder="e.g., Our sales CRM does not sync with our warehouse ERP, requiring 20 hours of manual data entry per week..."
              value={formData.painPoint}
              onChange={(e) => setFormData({...formData, painPoint: e.target.value})}
            />
            <button 
              disabled={!formData.painPoint.trim()}
              onClick={handleNext}
              className={`mt-4 w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.primary}`}
            >
              Proceed <ChevronRight size={18} />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className={`text-xl ${theme.headerFont} font-semibold mb-2`}>2. Isolate the Environment</h2>
            <p className="text-sm opacity-70 mb-6">List the primary software platforms currently operating within this workflow.</p>
            <input
              type="text"
              autoFocus
              className={`w-full p-3 rounded-xl outline-none transition-all ${theme.input}`}
              placeholder="e.g., SAP, Salesforce, custom SQL, legacy AS400"
              value={formData.techStack}
              onChange={(e) => setFormData({...formData, techStack: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' && formData.techStack.trim() && handleNext()}
            />
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className={`px-4 py-3 rounded-xl font-medium transition-all ${theme.secondary}`}>Back</button>
              <button 
                disabled={!formData.techStack.trim()}
                onClick={handleNext}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.primary}`}
              >
                Proceed <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className={`text-xl ${theme.headerFont} font-semibold mb-2`}>3. Deployment Criteria</h2>
            <p className="text-sm opacity-70 mb-6">
              PYM Energy executes high-impact, rapid integration sprints. Does the resolution of this technical debt have an allocated capital budget exceeding $15,000 USD?
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => handleBudgetSelection(true)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all border ${themeName === 'terminal' ? 'border-[#00ff41]/50 hover:bg-[#00ff41]/10' : 'border-slate-200 hover:border-slate-900 bg-white'}`}
              >
                Yes, capital is allocated.
              </button>
              <button 
                onClick={() => handleBudgetSelection(false)}
                className={`w-full p-4 rounded-xl text-left font-medium transition-all border ${themeName === 'terminal' ? 'border-red-900/50 text-red-500 hover:bg-red-900/20' : 'border-slate-200 hover:border-red-600 hover:text-red-600 bg-white'}`}
              >
                No, this is exploratory.
              </button>
            </div>
            <button onClick={() => setStep(2)} className={`mt-6 px-4 py-2 text-sm rounded-xl font-medium transition-all ${theme.secondary}`}>Back</button>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className={`text-xl ${theme.headerFont} font-semibold mb-2`}>4. Async Handoff</h2>
            <p className="text-sm opacity-70 mb-6">
              PYM operates entirely asynchronously to maximize execution speed. Enter your direct email to receive the custom architectural blueprint within 48 hours. No introductory call required.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                autoFocus
                className={`w-full p-3 rounded-xl outline-none transition-all ${theme.input}`}
                placeholder="Corporate Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep(3)} className={`px-4 py-3 rounded-xl font-medium transition-all ${theme.secondary}`}>Back</button>
                <button 
                  type="submit"
                  disabled={!formData.email.trim() || !formData.email.includes('@') || isSubmitting}
                  className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${theme.primary}`}
                >
                  {isSubmitting ? 'Transmitting...' : 'Request Blueprint'}
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme.bg} ${theme.text} ${theme.font}`}>
      <HtnModal isOpen={isHtnModalOpen} onClose={() => setIsHtnModalOpen(false)} theme={theme} />

      <header className={`w-full p-6 flex items-center justify-between border-b ${themeName === 'terminal' ? 'border-[#00ff41]/20' : 'border-slate-200 bg-white/50 backdrop-blur'}`}>
        <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('/')}>
          <h1 className={`text-lg font-bold ${theme.headerFont} tracking-wide`}>PYM ENERGY</h1>
          <span className="text-xs opacity-60 uppercase tracking-widest mt-1">Architecture & Audits</span>
        </div>
        
        <button 
          onClick={() => setIsHtnModalOpen(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-all hover:opacity-80 mt-8 sm:mt-0 ${theme.badge}`}
        >
          <Shield size={14} />
          <span className="hidden sm:inline">HTN Compliant Data Standards</span>
          <span className="sm:hidden">HTN Compliant</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-xl">
          {!isRejected && !isSubmitted && (
            <div className="flex gap-2 mb-8 px-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    step >= i 
                      ? (themeName === 'terminal' ? 'bg-[#00ff41]' : themeName === 'operations' ? 'bg-indigo-600' : 'bg-slate-900') 
                      : (themeName === 'terminal' ? 'bg-[#00ff41]/20' : 'bg-slate-200')
                  }`} 
                />
              ))}
            </div>
          )}

          <div className={`w-full p-6 sm:p-10 rounded-2xl transition-all duration-300 ${theme.card}`}>
            {renderStep()}
          </div>

          <div className="mt-8 text-center text-xs opacity-50 flex items-center justify-center gap-2">
            <Shield size={12} />
            <span>End-to-end encrypted. Zero data syndication.</span>
          </div>
        </div>
      </main>
    </div>
  );
};


export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    // Initialize the route synchronously before the first render
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = () => setCurrentPath(window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const navigate = (path) => {
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', path);
      } catch {
        // Silently swallow the security error in sandboxed preview environments
        console.warn("Sandbox routing active: URL history push blocked.");
      }
      setCurrentPath(path);
    }
  };

  // Route Logic
  if (currentPath === '/' || currentPath === '') {
    return <LandingPage onNavigate={navigate} />;
  }

  // All other routes (/ops, /dev, /audit) fall into the Triage Flow
  return <TriageFlow currentPath={currentPath} onNavigate={navigate} />;
}