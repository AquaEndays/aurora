import React, { useState, useEffect } from 'react';

export default function App() {
  // --- ÉTATS GLOBAUX ---
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'spots'
  const [lang, setLang] = useState('FR'); 
  const [darkMode, setDarkMode] = useState(false);
  const [shopCategory, setShopCategory] = useState('Tous');
  
  // Gestion Panier & Favoris
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  // Modales
  const [showCartModal, setShowCartModal] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  // Recherche & Avis
  const [searchTerm, setSearchTerm] = useState('');
  const [userRatings, setUserRatings] = useState({});

  // --- ADMIN SECRET (3 clics sur logo) ---
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  // --- TEXTES & TRADUCTIONS ---
  const t = {
    FR: {
      nav: { shop: "Boutique", spots: "Destinations", about: "L'Histoire", contact: "Contact" },
      header: { welcome: "L'Esprit Aurora", subtitle: "L'élégance du surf, la chaleur des tropiques." },
      spots: { title: "Explorez le Monde.", search: "Rechercher (Kribi, Biarritz...)" },
      cart: { title: "Mon Panier", empty: "Votre panier est vide.", total: "Total", order: "Commander sur WhatsApp" },
      fav: { title: "Mes Coups de Cœur", empty: "Aucun favori pour l'instant.", addCart: "Ajouter au panier" },
      about: { 
        title: "Né entre deux océans.", 
        p1: "Aurora n'est pas juste une marque, c'est un pont entre deux mondes. Née de la rencontre entre les vagues puissantes de l'Atlantique Nord et la douceur des eaux du Golfe de Guinée.",
        p2: "Nous concevons des équipements pour ceux qui ne choisissent pas entre performance et style. Du sable noir de Limbe aux falaises d'Étretat.",
        close: "Fermer l'histoire"
      },
      footer: { desc: "La plateforme ultime pour les passionnés d'océan.", rights: "Tous droits réservés." },
      actions: { add: "Ajouter", see: "Voir", map: "Voir sur la carte" }
    },
    EN: {
      nav: { shop: "Shop", spots: "Travel", about: "Our Story", contact: "Contact" },
      header: { welcome: "The Aurora Spirit", subtitle: "Surf elegance meets tropical warmth." },
      spots: { title: "Roam the World.", search: "Search (Kribi, Biarritz...)" },
      cart: { title: "My Cart", empty: "Your cart is empty.", total: "Total", order: "Order via WhatsApp" },
      fav: { title: "My Wishlist", empty: "No favorites yet.", addCart: "Add to Cart" },
      about: { 
        title: "Born between two oceans.", 
        p1: "Aurora is more than a brand, it is a bridge between two worlds. Born from the meeting of the powerful North Atlantic waves and the softness of the Gulf of Guinea waters.",
        p2: "We design gear for those who refuse to choose between performance and style. From Limbe's black sands to Étretat's cliffs.",
        close: "Close Story"
      },
      footer: { desc: "The ultimate platform for ocean lovers.", rights: "All rights reserved." },
      actions: { add: "Add to Cart", see: "Details", map: "See on Map" }
    }
  }[lang];

  // --- EFFETS ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- FONCTIONS ---
  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLike = (e, product) => {
    e.stopPropagation();
    if (favorites.some(f => f.id === product.id)) {
      setFavorites(favorites.filter(f => f.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const openWhatsApp = (items) => {
    const phoneNumber = "237651426493"; 
    let message = "";
    if (Array.isArray(items)) {
        const list = items.map(i => `- ${i.name} (${i.price}€)`).join('\n');
        message = `Bonjour Aurora ! Je souhaite commander :\n${list}\nTotal: ${items.reduce((a,b)=>a+b.price,0)}€`;
    } else {
        message = `Bonjour Aurora ! Je suis intéressé par : ${items.name}`;
    }
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Admin Logic
  const handleLogoClick = () => {
    if (logoClicks + 1 === 3) { setShowAdminLogin(true); setLogoClicks(0); } 
    else { setLogoClicks(c => c + 1); setTimeout(() => setLogoClicks(0), 1000); }
  };
  const handleAdminAuth = () => {
    if (adminPass === 'admin2026') { setIsAdmin(true); setShowAdminLogin(false); setActiveTab('admin'); }
    else alert('Accès refusé');
  };

  // --- DONNÉES (Images Unsplash IDs stables) ---
  const allProducts = [
    { id: 1, name: "Rio Sunset Bikini", cat: "Maillots", price: 45, img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Deep Blue Shorts", cat: "Maillots", price: 39, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Noir Chic One-Piece", cat: "Maillots", price: 55, img: "https://images.unsplash.com/photo-1574941662858-a83cb2b08269?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Aurora Longboard", cat: "Planches", price: 850, img: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Pro Shaper Shortboard", cat: "Planches", price: 620, img: "https://images.unsplash.com/photo-1505497288674-8b65671f0088?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Mineral SPF 50", cat: "Skin Care", price: 28, img: "https://images.unsplash.com/photo-1556228720-1987bb48eb4d?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Coco Glow Oil", cat: "Skin Care", price: 18, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Tortoise Shades", cat: "Accessoires", price: 110, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80" },
  ];

  const allSpots = [
    { id: 1, name: "Chutes de la Lobé", region: "Kribi, Cameroun", img: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?auto=format&fit=crop&w=800&q=80", desc: "L'unique endroit où les chutes d'eau plongent directement dans l'océan.", pleasures: ["Crevettes", "Pirogue", "Cascade"] },
    { id: 2, name: "Seme Beach", region: "Limbe, Cameroun", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", desc: "Sable volcanique noir au pied du Mont Cameroun.", pleasures: ["Volcan", "Botanique", "Poisson"] },
    { id: 3, name: "Calanque d'En-Vau", region: "Marseille, France", img: "https://images.unsplash.com/photo-1566373719003-8d261e469550?auto=format&fit=crop&w=800&q=80", desc: "Des falaises vertigineuses et une eau d'un bleu irréel.", pleasures: ["Kayak", "Escalade", "Baignade"] },
    { id: 4, name: "Grande Plage", region: "Biarritz, France", img: "https://images.unsplash.com/photo-1559567963-324393694f4b?auto=format&fit=crop&w=800&q=80", desc: "Le surf impérial face au célèbre palais.", pleasures: ["Surf", "Casino", "Halles"] },
    { id: 5, name: "Maya Bay", region: "Thaïlande", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80", desc: "Le joyau tropical caché.", pleasures: ["Plongée", "Bateau", "Sable fin"] },
  ];

  const filteredProducts = shopCategory === 'Tous' ? allProducts : allProducts.filter(p => p.cat === shopCategory);
  const filteredSpots = allSpots.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Loading Screen
  if (loading) return (
    <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-black tracking-widest animate-pulse italic">AURORA.</h1>
    </div>
  );

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'} min-h-screen flex flex-col transition-colors duration-500 font-sans selection:bg-orange-500 selection:text-white`}>
      
      {/* --- NAVBAR PREMIUM --- */}
      <nav className={`sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b backdrop-blur-xl transition-all ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-12 transition">A</div>
          <span className="text-2xl font-black tracking-tighter">AURORA<span className="text-orange-500">.</span></span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wider opacity-80">
            <button onClick={() => setActiveTab('shop')} className={`hover:text-orange-500 transition-colors ${activeTab === 'shop' ? 'text-orange-500' : ''}`}>{t.nav.shop}</button>
            <button onClick={() => setActiveTab('spots')} className={`hover:text-blue-500 transition-colors ${activeTab === 'spots' ? 'text-blue-500' : ''}`}>{t.nav.spots}</button>
            <button onClick={() => setShowAboutModal(true)} className="hover:text-orange-500 transition-colors">{t.nav.about}</button>
            <button onClick={scrollToFooter} className="hover:text-orange-500 transition-colors">{t.nav.contact}</button>
        </div>

        {/* Tools */}
        <div className="flex items-center gap-4">
            {/* Switchers */}
            <div className={`flex items-center rounded-lg border p-1 ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
                <button onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} className="px-2 text-xs font-black hover:text-orange-500 transition">{lang}</button>
                <div className="w-[1px] h-3 bg-current opacity-20 mx-1"></div>
                <button onClick={() => setDarkMode(!darkMode)} className="px-2 text-sm hover:scale-110 transition">{darkMode ? '☀️' : '🌙'}</button>
            </div>

            {/* Icons */}
            <button onClick={() => setShowFavModal(true)} className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                ❤️ {favorites.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>}
            </button>
            <button onClick={() => setShowCartModal(true)} className="relative bg-slate-900 dark:bg-white text-white dark:text-black p-3 rounded-full hover:scale-105 active:scale-95 transition shadow-xl">
                🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white dark:border-slate-900">{cart.length}</span>}
            </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow">
        
        {/* 1. BOUTIQUE VIEW */}
        {activeTab === 'shop' && (
          <main className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
               <div>
                  <h1 className="text-5xl md:text-7xl font-black italic mb-4 tracking-tight">{t.header.welcome}</h1>
                  <p className="opacity-60 text-lg font-medium max-w-md">{t.header.subtitle}</p>
               </div>
               <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['Tous', 'Maillots', 'Planches', 'Skin Care', 'Accessoires'].map(cat => (
                    <button key={cat} onClick={() => setShopCategory(cat)} className={`px-6 py-3 rounded-full border-2 text-xs font-black uppercase tracking-widest transition-all ${shopCategory === cat ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'}`}>{cat}</button>
                  ))}
               </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
               {filteredProducts.map(p => (
                 <div key={p.id} className="group relative">
                    <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-5 bg-slate-100 dark:bg-slate-800 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                       <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       <button onClick={(e) => toggleLike(e, p)} className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 active:scale-90 transition z-10">
                         {favorites.some(f => f.id === p.id) ? "❤️" : "🤍"}
                       </button>
                       {/* Quick Add Overlay */}
                       <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                         <button onClick={() => setCart([...cart, p])} className="w-full bg-white text-black font-black py-4 rounded-xl shadow-xl hover:bg-orange-500 hover:text-white transition uppercase text-xs tracking-widest">{t.actions.add}</button>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
                          <span className="text-orange-500 font-black text-lg">{p.price}€</span>
                       </div>
                       <p className="text-xs opacity-50 uppercase tracking-wider mb-3">{p.cat}</p>
                    </div>
                 </div>
               ))}
            </div>
          </main>
        )}

        {/* 2. SPOTS VIEW */}
        {activeTab === 'spots' && (
          <main className="max-w-7xl mx-auto px-6 py-12 animate-fadeIn">
             <div className="text-center mb-20">
                <h2 className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 italic">{t.spots.title}</h2>
                <div className="relative max-w-xl mx-auto group">
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
                   <input type="text" placeholder={t.spots.search} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={`relative w-full px-8 py-5 rounded-full border-2 outline-none text-center font-bold text-lg transition ${darkMode ? 'bg-slate-900 border-slate-700 focus:border-blue-500' : 'bg-white border-slate-100 focus:border-blue-500'}`} />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSpots.map(s => (
                  <div key={s.id} onClick={() => setSelectedSpot(s)} className={`group rounded-[2.5rem] p-3 border transition-all cursor-pointer hover:-translate-y-2 duration-500 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-100 hover:shadow-2xl'}`}>
                     <div className="h-64 rounded-[2rem] overflow-hidden relative mb-6">
                        <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                           ⭐ {userRatings[s.id] || "4.8"}
                        </div>
                     </div>
                     <div className="px-4 pb-4">
                        <p className="text-blue-500 font-black text-xs uppercase tracking-widest mb-2">{s.region}</p>
                        <h3 className="text-3xl font-black mb-3">{s.name}</h3>
                        <p className="opacity-60 text-sm line-clamp-2 leading-relaxed mb-6">{s.desc}</p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-40 group-hover:opacity-100 transition">
                           <span>{t.actions.see}</span> <span className="text-xl">→</span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </main>
        )}

        {/* 3. ADMIN VIEW */}
        {activeTab === 'admin' && isAdmin && (
           <div className="max-w-4xl mx-auto px-6 py-20 text-center">
              <h1 className="text-5xl font-black text-red-600 mb-12 border-b-4 border-red-600 inline-block pb-4">ADMIN COMMAND</h1>
              <div className="grid grid-cols-3 gap-6">
                 <div className="bg-slate-800 text-white p-8 rounded-3xl">
                    <div className="text-4xl font-black mb-2">{cart.reduce((a,b)=>a+b.price,0)}€</div>
                    <div className="text-xs uppercase opacity-50 tracking-widest">Panier Actuel</div>
                 </div>
                 <div className="bg-slate-800 text-white p-8 rounded-3xl">
                    <div className="text-4xl font-black mb-2">{favorites.length}</div>
                    <div className="text-xs uppercase opacity-50 tracking-widest">Favoris</div>
                 </div>
                 <div className="bg-slate-800 text-white p-8 rounded-3xl">
                    <div className="text-4xl font-black mb-2">{Object.keys(userRatings).length}</div>
                    <div className="text-xs uppercase opacity-50 tracking-widest">Avis Déposés</div>
                 </div>
              </div>
           </div>
        )}

      </div>

      {/* --- FOOTER --- */}
      <footer id="footer" className={`py-20 px-6 border-t mt-20 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
               <h4 className="text-3xl font-black mb-6 tracking-tighter">AURORA<span className="text-orange-500">.</span></h4>
               <p className="opacity-60 leading-relaxed max-w-sm font-medium">{t.footer.desc}</p>
            </div>
            <div>
               <h5 className="font-black uppercase mb-6 text-xs tracking-[0.2em] text-orange-500">{t.nav.contact}</h5>
               <ul className="space-y-4 text-sm font-bold opacity-70">
                  <li>Douala, Cameroun</li>
                  <li>hello@aurora.cm</li>
                  <li className="text-green-500">+237 651426493</li>
               </ul>
            </div>
            <div className="opacity-40 text-xs font-bold pt-8 md:pt-0">
               <p>© 2026 Aurora Inc.</p>
               <p>{t.footer.rights}</p>
            </div>
         </div>
      </footer>

      {/* --- MODALES --- */}

      {/* A. PANIER */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setShowCartModal(false)}>
           <div className={`w-full max-w-md h-full p-10 flex flex-col shadow-2xl animate-slideIn ${darkMode ? 'bg-slate-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-4xl font-black italic">{t.cart.title}</h2>
                 <button onClick={() => setShowCartModal(false)} className="text-2xl opacity-30 hover:opacity-100">✕</button>
              </div>
              <div className="flex-grow overflow-y-auto space-y-6">
                 {cart.length === 0 ? <p className="opacity-50 text-center mt-10">{t.cart.empty}</p> : cart.map((item, i) => (
                    <div key={i} className="flex gap-4 items-center">
                       <img src={item.img} className="w-20 h-20 rounded-xl object-cover" />
                       <div className="flex-grow">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-orange-500 font-black">{item.price}€</p>
                       </div>
                       <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-red-500 font-black px-2">✕</button>
                    </div>
                 ))}
              </div>
              <div className="border-t pt-8 mt-4 border-slate-100 dark:border-slate-800">
                 <div className="flex justify-between text-2xl font-black mb-6"><span>{t.cart.total}</span><span>{cart.reduce((a,b)=>a+b.price,0)}€</span></div>
                 <button onClick={() => openWhatsApp(cart)} className="w-full py-5 bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition shadow-lg shadow-green-500/30">{t.cart.order}</button>
              </div>
           </div>
        </div>
      )}

      {/* B. FAVORIS (NOUVEAU) */}
      {showFavModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setShowFavModal(false)}>
           <div className={`w-full max-w-md h-full p-10 flex flex-col shadow-2xl animate-slideIn ${darkMode ? 'bg-slate-900' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-4xl font-black italic text-orange-500">{t.fav.title}</h2>
                 <button onClick={() => setShowFavModal(false)} className="text-2xl opacity-30 hover:opacity-100">✕</button>
              </div>
              <div className="flex-grow overflow-y-auto space-y-6">
                 {favorites.length === 0 ? <p className="opacity-50 text-center mt-10">{t.fav.empty}</p> : favorites.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-dashed pb-4 border-slate-200 dark:border-slate-700">
                       <img src={item.img} className="w-16 h-16 rounded-xl object-cover" />
                       <div className="flex-grow">
                          <p className="font-bold text-sm">{item.name}</p>
                          <button onClick={() => { setCart([...cart, item]); }} className="text-xs font-black uppercase text-blue-500 hover:underline mt-1">{t.fav.addCart}</button>
                       </div>
                       <button onClick={(e) => toggleLike(e, item)} className="text-2xl">💔</button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* C. MODALE A PROPOS (PRO DESIGN) */}
      {showAboutModal && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4" onClick={() => setShowAboutModal(false)}>
            <div className={`max-w-5xl w-full rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row ${darkMode ? 'bg-slate-950 border border-slate-800' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
               {/* Image Side */}
               <div className="md:w-1/2 h-64 md:h-[600px] relative">
                  <img src="https://images.unsplash.com/photo-1512106374988-c97f427f63b6?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
                     <h3 className="text-white text-4xl font-black italic">{t.about.title}</h3>
                  </div>
               </div>
               {/* Text Side */}
               <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-8">A</div>
                  <div className="space-y-6 text-lg leading-relaxed opacity-80 font-medium">
                     <p>{t.about.p1}</p>
                     <p>{t.about.p2}</p>
                  </div>
                  <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" className="h-8 opacity-30 invert dark:invert-0" alt="signature" />
                     <button onClick={() => setShowAboutModal(false)} className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition">{t.about.close}</button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* D. DETAILS SPOT */}
      {selectedSpot && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setSelectedSpot(null)}>
            <div className={`max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-[3rem] flex flex-col md:flex-row shadow-2xl ${darkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
               <div className="md:w-1/2 h-96 md:h-auto relative">
                  <img src={selectedSpot.img} className="w-full h-full object-cover" />
                  <button onClick={() => setSelectedSpot(null)} className="absolute top-6 left-6 bg-white/20 backdrop-blur p-3 rounded-full text-white hover:bg-white hover:text-black transition md:hidden">✕</button>
               </div>
               <div className="md:w-1/2 p-12 md:p-16">
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-blue-500 font-black uppercase text-xs tracking-[0.2em]">{selectedSpot.region}</span>
                     <button onClick={() => setSelectedSpot(null)} className="hidden md:block text-3xl opacity-30 hover:opacity-100">✕</button>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">{selectedSpot.name}</h2>
                  
                  <div className="space-y-10">
                     <p className="text-xl leading-relaxed opacity-70">{selectedSpot.desc}</p>
                     <div>
                        <h4 className="font-black text-xs uppercase mb-4 tracking-widest opacity-40">Incontournables</h4>
                        <div className="flex flex-wrap gap-3">
                           {selectedSpot.pleasures.map((p, i) => <span key={i} className="bg-slate-100 dark:bg-slate-800 px-5 py-2 rounded-full text-xs font-bold uppercase">{p}</span>)}
                        </div>
                     </div>
                     <div className="pt-8 border-t dark:border-slate-800">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSpot.name + " " + selectedSpot.region)}`} target="_blank" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg shadow-blue-500/30">
                           <span>📍 {t.actions.map}</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* E. LOGIN ADMIN */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4">
           <div className="bg-slate-900 p-10 rounded-3xl w-full max-w-sm text-center border border-slate-800 shadow-2xl">
              <h3 className="text-white font-black text-2xl mb-8 tracking-widest">RESTRICTED AREA</h3>
              <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} className="w-full bg-slate-800 text-white px-4 py-4 rounded-xl mb-4 text-center outline-none focus:ring-2 focus:ring-red-500 text-xl tracking-widest" placeholder="••••••"/>
              <button onClick={handleAdminAuth} className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition uppercase tracking-widest text-xs">Access</button>
              <button onClick={() => setShowAdminLogin(false)} className="mt-6 text-slate-500 text-xs font-bold uppercase hover:text-white">Cancel</button>
           </div>
        </div>
      )}

    </div>
  );
}