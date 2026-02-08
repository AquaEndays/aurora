import React, { useState, useEffect } from 'react';

function App() {
  // --- ÉTATS ---
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shop');
  const [shopCategory, setShopCategory] = useState('Tous');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(null);
  
  // États d'interaction
  const [likedProducts, setLikedProducts] = useState({}); // Pour liker les produits
  const [userRatings, setUserRatings] = useState({}); // Pour noter les lieux

  // Admin secret
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- FONCTION WHATSAPP ---
  const openWhatsApp = (product) => {
    const phoneNumber = "237651426493"; 
    const message = `Bonjour Aurora ! Je suis super intéressé par le produit "${product.name}" à ${product.price}€. Est-il encore disponible ?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // --- FONCTION LIKE ---
  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --- FONCTION NOTATION ---
  const rateSpot = (spotId, rating) => {
    setUserRatings(prev => ({ ...prev, [spotId]: rating }));
  };

  // --- DONNÉES MASSIVES ---
  const allProducts = [
    // MAILLOTS
    { id: 1, name: "Bikini Rio Sunset", cat: "Maillots", price: 45, img: "https://images.unsplash.com/photo-1582533019014-681966952864?w=500&auto=format&fit=crop&q=60" },
    { id: 2, name: "Short de Bain Azur", cat: "Maillots", price: 39, img: "https://images.unsplash.com/photo-1555806443-4f9e1591f211?w=500&auto=format&fit=crop&q=60" },
    { id: 3, name: "Une Pièce Noir Chic", cat: "Maillots", price: 55, img: "https://images.unsplash.com/photo-1574941662858-a83cb2b08269?w=500&auto=format&fit=crop&q=60" },
    { id: 4, name: "Short Tropical Kribi", cat: "Maillots", price: 42, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60" },
    
    // PLANCHES
    { id: 5, name: "Aurora Longboard 9.0", cat: "Planches", price: 850, img: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=500&auto=format&fit=crop&q=60" },
    { id: 6, name: "Shortboard Performance", cat: "Planches", price: 620, img: "https://images.unsplash.com/photo-1537519646099-335112f03225?w=500&auto=format&fit=crop&q=60" },
    { id: 7, name: "Paddle Gonflable Pro", cat: "Planches", price: 450, img: "https://images.unsplash.com/photo-1543329873-1961917cb6e6?w=500&auto=format&fit=crop&q=60" },
    { id: 8, name: "Bodyboard Fun", cat: "Planches", price: 120, img: "https://images.unsplash.com/photo-1570529046429-23f208151f15?w=500&auto=format&fit=crop&q=60" },

    // SKIN CARE
    { id: 9, name: "Serum Solaire 50+", cat: "Skin Care", price: 28, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&auto=format&fit=crop&q=60" },
    { id: 10, name: "Huile de Coco Pure", cat: "Skin Care", price: 18, img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60" },
    { id: 11, name: "Après-Soleil Aloe", cat: "Skin Care", price: 22, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60" },

    // ACCESSOIRES
    { id: 12, name: "Lunettes Polarisées", cat: "Accessoires", price: 110, img: "https://images.unsplash.com/photo-1511499767390-90342f16b117?w=500&auto=format&fit=crop&q=60" },
    { id: 13, name: "Serviette Microfibre", cat: "Accessoires", price: 35, img: "https://images.unsplash.com/photo-1616397397087-c1894d01b606?w=500&auto=format&fit=crop&q=60" },
    { id: 14, name: "Sac Étanche 20L", cat: "Accessoires", price: 45, img: "https://images.unsplash.com/photo-1621344485584-375685959952?w=500&auto=format&fit=crop&q=60" },
    { id: 15, name: "Casquette Trucker", cat: "Accessoires", price: 25, img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60" },
  ];

  const allSpots = [
    // CAMEROUN
    { 
      id: 1, name: "Chutes de la Lobé", region: "Kribi, Cameroun", rating: "4.9", 
      img: "https://images.unsplash.com/photo-1563297732-c5188448b48d?w=600&auto=format&fit=crop&q=60",
      desc: "Un phénomène unique au monde où un fleuve se jette directement dans l'océan par des cascades spectaculaires. Kribi est la perle balnéaire du Cameroun.",
      pleasures: ["Dégustation de crevettes fraîches", "Douche sous la cascade", "Pirogue traditionnelle"],
      coords: "2.8833° N, 9.9000° E"
    },
    { 
      id: 2, name: "Plage de Seme", region: "Limbe, Cameroun", rating: "4.7", 
      img: "https://images.unsplash.com/photo-1662497673627-c1808064a7cc?w=600&auto=format&fit=crop&q=60",
      desc: "Le sable volcanique noir de Limbe offre un contraste saisissant avec la végétation luxuriante et le Mont Cameroun en toile de fond.",
      pleasures: ["Grillades de poisson braisé", "Vue sur le Mont Cameroun", "Balade au jardin botanique"],
      coords: "4.0167° N, 9.2167° E"
    },
    
    // FRANCE
    { 
      id: 3, name: "Calanque d'En-Vau", region: "Marseille, France", rating: "4.9", 
      img: "https://images.unsplash.com/photo-1549275062-790101d24490?w=600&auto=format&fit=crop&q=60",
      desc: "L'une des plus grandioses calanques avec ses hautes falaises. Eau turquoise garantie.",
      pleasures: ["Escalade", "Kayak", "Randonnée"],
      coords: "43.2023° N, 5.4983° E"
    },
    { 
      id: 4, name: "Grande Plage", region: "Biarritz, France", rating: "4.8", 
      img: "https://images.unsplash.com/photo-1533602120014-41139474936d?w=600&auto=format&fit=crop&q=60",
      desc: "Le berceau du surf en Europe. Élégance impériale et vagues puissantes de l'Atlantique.",
      pleasures: ["Surf pour tous niveaux", "Casino", "Palais de l'Impératrice"],
      coords: "43.4832° N, 1.5586° W"
    },
    { 
      id: 5, name: "Plage de Palombaggia", region: "Corse, France", rating: "5.0", 
      img: "https://images.unsplash.com/photo-1594895655452-c07a38914619?w=600&auto=format&fit=crop&q=60",
      desc: "Sable blanc, pins parasols et rochers rouges. Un air de Caraïbes en Méditerranée.",
      pleasures: ["Snorkeling", "Farniente", "Restaurants de plage"],
      coords: "41.5568° N, 9.3377° E"
    },
    { 
      id: 6, name: "Étretat", region: "Normandie, France", rating: "4.7", 
      img: "https://images.unsplash.com/photo-1528659132579-2495b597c48f?w=600&auto=format&fit=crop&q=60",
      desc: "Des falaises de craie blanche vertigineuses sculptées par la mer. Un paysage impressionniste.",
      pleasures: ["Balade sur les falaises", "Jardins d'Étretat", "Coucher de soleil"],
      coords: "49.7075° N, 0.2033° E"
    },

    // RESTE DU MONDE
    { 
      id: 7, name: "Anse Source d'Argent", region: "Seychelles", rating: "5.0", 
      img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&auto=format&fit=crop&q=60",
      desc: "Probablement la plage la plus photographiée au monde avec ses blocs de granit.",
      pleasures: ["Photos", "Vélo", "Tortues"],
      coords: "4.3715° S, 55.8272° E"
    },
    { 
      id: 8, name: "Maya Bay", region: "Thaïlande", rating: "4.8", 
      img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&auto=format&fit=crop&q=60",
      desc: "La plage célèbre du film 'La Plage'. Un cirque calcaire fermé aux eaux émeraudes.",
      pleasures: ["Plongée", "Longtail boat", "Nature"],
      coords: "7.6775° N, 98.7656° E"
    },
  ];

  // --- LOGIQUE FILTRES ---
  const filteredProducts = shopCategory === 'Tous' ? allProducts : allProducts.filter(p => p.cat === shopCategory);
  const filteredSpots = allSpots.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.region.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  // --- LOGIQUE ADMIN ---
  const handleLogoClick = () => {
    if (logoClicks + 1 === 3) { setShowAdminLogin(true); setLogoClicks(0); } 
    else { setLogoClicks(c => c + 1); setTimeout(() => setLogoClicks(0), 1000); }
  };
  const handleAdminLogin = () => {
    if (adminPass === 'admin2026') { setIsAdmin(true); setShowAdminLogin(false); setActiveTab('admin'); } 
    else { alert("Mot de passe incorrect (admin2026)"); }
  };

  if (loading) return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center">
      <h1 className="text-white text-5xl font-black tracking-widest animate-pulse">AURORA</h1>
      <p className="text-orange-500 mt-4 tracking-widest uppercase text-sm">Chargement des vagues...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
          {/* Remplace 'src' par '/logo.png' si tu as mis l'image dans le dossier public */}
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg hover:rotate-12 transition">A</div>
          <span className="text-2xl font-black tracking-tighter">AURORA<span className="text-orange-500">.</span></span>
        </div>
        <div className="hidden md:flex bg-slate-100 p-1 rounded-full gap-1">
          <button onClick={() => setActiveTab('shop')} className={`px-6 py-2 rounded-full text-sm font-bold transition ${activeTab === 'shop' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Boutique</button>
          <button onClick={() => setActiveTab('spots')} className={`px-6 py-2 rounded-full text-sm font-bold transition ${activeTab === 'spots' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Explorer</button>
          {isAdmin && <button onClick={() => setActiveTab('admin')} className="px-6 py-2 rounded-full text-sm font-bold bg-slate-800 text-white shadow-sm">Dashboard</button>}
        </div>
        <button onClick={() => setShowCartModal(true)} className="relative bg-slate-900 text-white p-3 rounded-full hover:bg-orange-500 transition active:scale-90 shadow-lg">
          🛒 {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cart.length}</span>}
        </button>
      </nav>

      {/* CONTENU */}
      <div className="flex-grow">
        
        {/* --- ONGLE 1: BOUTIQUE --- */}
        {activeTab === 'shop' && (
          <main className="max-w-7xl mx-auto px-6 py-10">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6">Le Shop Aurora</h2>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-start">
                {['Tous', 'Maillots', 'Planches', 'Skin Care', 'Accessoires'].map(cat => (
                  <button key={cat} onClick={() => setShopCategory(cat)} className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm border-2 transition ${shopCategory === cat ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-500 hover:border-slate-300'}`}>{cat}</button>
                ))}
              </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <div key={p.id} className="group flex flex-col bg-white rounded-3xl p-3 border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4 cursor-pointer">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    
                    {/* BOUTON LIKE (COEUR) */}
                    <button onClick={(e) => toggleLike(e, p.id)} className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full shadow-sm hover:scale-110 transition">
                      {likedProducts[p.id] ? "❤️" : "🤍"}
                    </button>

                    {/* BOUTON ADD CART */}
                    <button onClick={() => setCart([...cart, p])} className="absolute bottom-3 right-3 bg-white text-black p-3 rounded-xl shadow-lg hover:bg-orange-500 hover:text-white transition active:scale-90">➕</button>
                  </div>
                  
                  <div className="px-2 pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg leading-tight">{p.name}</h3>
                      <p className="text-orange-600 font-black text-lg">{p.price}€</p>
                    </div>
                    {/* BOUTON COMMANDER WHATSAPP */}
                    <button 
                      onClick={() => openWhatsApp(p)}
                      className="w-full mt-2 bg-green-500/10 text-green-700 hover:bg-green-500 hover:text-white border border-green-200 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
                    >
                      <span>💬</span> Commander sur WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* --- ONGLET 2: EXPLORER --- */}
        {activeTab === 'spots' && (
          <main className="max-w-7xl mx-auto px-6 py-10">
            <header className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-blue-900">Évadez-vous.</h2>
              <div className="relative max-w-lg mx-auto">
                <input type="text" placeholder="Cameroun, France, Thaïlande..." className="w-full bg-slate-50 border-2 border-slate-200 px-6 py-4 rounded-full focus:border-blue-500 outline-none transition font-medium text-lg pl-12" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSpots.map(s => (
                <div key={s.id} onClick={() => setSelectedSpot(s)} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition duration-500 cursor-pointer group transform hover:-translate-y-2">
                  <div className="h-72 overflow-hidden relative">
                    <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-black shadow-sm flex items-center gap-1">
                      ⭐ {userRatings[s.id] || s.rating}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-white/20">
                      {s.region}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{s.name}</h3>
                    <p className="text-slate-500 line-clamp-2 text-sm mb-6">{s.desc}</p>
                    <button className="w-full py-3 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition">Explorer le guide</button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        )}

        {/* --- ONGLET 3: ADMIN --- */}
        {activeTab === 'admin' && isAdmin && (
          <main className="max-w-4xl mx-auto px-6 py-10 text-center">
            <h1 className="text-3xl font-black text-red-600 mb-4">MODE ADMIN ACTIVÉ</h1>
            <p>Bienvenue maître du monde. Voici vos stats.</p>
            {/* ... Contenu admin précédent ... */}
          </main>
        )}
      </div>

      {/* --- FOOTER (REMIS !) --- */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-black">A</div>
              <h4 className="text-2xl font-black tracking-tight">AURORA.</h4>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              La plateforme ultime pour les passionnés de mer. Du Mont Cameroun aux vagues de Biarritz, trouvez votre équipement et votre prochaine destination.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase text-orange-500 text-xs tracking-widest">Liens Rapides</h5>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li onClick={() => setActiveTab('shop')} className="hover:text-white cursor-pointer transition">Boutique</li>
              <li onClick={() => setActiveTab('spots')} className="hover:text-white cursor-pointer transition">Destinations</li>
              <li className="hover:text-white cursor-pointer transition">À propos</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 uppercase text-orange-500 text-xs tracking-widest">Nous contacter</h5>
            <ul className="space-y-4 text-slate-300 text-sm">
              <li>📍 Douala, Cameroun</li>
              <li>📧 hello@aurora.cm</li>
              <li>📞 +237 651426493</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-600 text-xs">
          © 2026 Aurora Inc. Fait avec ❤️ au Cameroun.
        </div>
      </footer>

      {/* --- MODALES --- */}

      {/* A. GUIDE DÉTAILLÉ (Avec Notation) */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedSpot(null)}>
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
               <img src={selectedSpot.img} className="w-full h-full object-cover" />
               <button onClick={() => setSelectedSpot(null)} className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full md:hidden">✕</button>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 bg-white relative">
              <button onClick={() => setSelectedSpot(null)} className="hidden md:block absolute top-6 right-6 text-slate-300 hover:text-black text-2xl">✕</button>
              
              <span className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-2 block">{selectedSpot.region}</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">{selectedSpot.name}</h2>
              
              {/* SYSTÈME DE NOTATION */}
              <div className="flex items-center gap-2 mb-8 bg-slate-50 p-3 rounded-xl w-max">
                <span className="text-sm font-bold text-slate-500">Notez ce lieu :</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      onClick={() => rateSpot(selectedSpot.id, star)}
                      className={`text-xl transition ${star <= (userRatings[selectedSpot.id] || 0) ? 'text-yellow-400 scale-110' : 'text-slate-200 hover:text-yellow-200'}`}
                    >★</button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-3">L'expérience</h4>
                  <p className="text-slate-600 leading-relaxed">{selectedSpot.desc}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-3">À ne pas manquer</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpot.pleasures.map((plaisir, i) => (
                      <span key={i} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold">
                        {plaisir}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-6">
                   <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedSpot.name + " " + selectedSpot.region)}`} target="_blank" className="inline-flex items-center gap-2 text-slate-900 font-black underline decoration-orange-500 underline-offset-4 hover:text-orange-600">
                     🗺️ Voir sur la carte
                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B. ADMIN LOGIN */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl shadow-orange-500/20">
            <h3 className="text-white font-black text-2xl mb-2">Accès Secret 🔒</h3>
            <input type="password" autoFocus placeholder="Mot de passe..." className="w-full bg-slate-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 mb-4 text-center tracking-widest mt-4" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} />
            <button onClick={handleAdminLogin} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600">Entrer</button>
            <button onClick={() => setShowAdminLogin(false)} className="mt-4 text-slate-500 text-sm hover:text-white">Annuler</button>
          </div>
        </div>
      )}

      {/* C. PANIER */}
      {showCartModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-8 flex flex-col shadow-2xl animate-slideIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black">Mon Panier ({cart.length})</h2>
              <button onClick={() => setShowCartModal(false)} className="text-2xl text-slate-400 hover:text-black">✕</button>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <img src={item.img} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-sm text-slate-900">{item.name}</p>
                    <p className="text-orange-600 font-bold">{item.price}€</p>
                  </div>
                </div>
              ))}
              {cart.length === 0 && <div className="text-center mt-20 text-slate-400">Votre panier est vide 😢</div>}
            </div>
            <div className="border-t pt-4 bg-white">
              <div className="flex justify-between text-xl font-black mb-4"><span>Total</span><span>{totalPrice}€</span></div>
              <button onClick={() => openWhatsApp({name: "Mon Panier complet", price: totalPrice})} className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg flex justify-center gap-2">
                <span>💬</span> Finaliser sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;