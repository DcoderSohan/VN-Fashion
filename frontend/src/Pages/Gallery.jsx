import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi } from "../utils/api";
import { getImageUrl } from "../utils/helpers";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage]       = useState(null);
  const [allWorks, setAllWorks]                 = useState([]);
  const [categories, setCategories]             = useState(["All"]);
  const [loading, setLoading]                   = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const galleryData = await contentApi.getGallery();
        const transformed = galleryData.map((item, i) => ({
          id:          item._id || i + 1,
          title:       item.title       || "Untitled",
          image:       getImageUrl(item.image) || "/VN-1.jpg",
          category:    item.category    || "Uncategorized",
          description: item.description || "",
          materials:   item.materials   || "",
          price:       item.price       || "Contact for pricing",
          featured:    item.featured    || false,
        }));
        const sorted = transformed.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        setAllWorks(sorted);
        const cats = ["All", ...new Set(transformed.map(w => w.category).filter(Boolean))];
        setCategories(cats);
      } catch {
        const fallback = [
          { id:1, title:"Noir Voluminous Gown",   image:"/VN-1.jpg",                   category:"Couture",       description:"Structured black gown with dynamic pleats.",          featured:true  },
          { id:2, title:"Metallic Wave Texture",  image:"/featured_fabric_texture.png", category:"Textile Art",   description:"Iridescent fabric manipulation detail.",              featured:false },
          { id:3, title:"Structured Coat",         image:"/hero_fashion_model.png",      category:"Couture",       description:"Minimalist black coat with architectural shoulders.",  featured:false },
          { id:4, title:"Couture Concept Sketch", image:"/VN-3.jpg",                    category:"Sketches",      description:"Original design concept drafting.",                   featured:false },
          { id:5, title:"Pleated Gown Detail",    image:"/VN-2.jpg",                    category:"Couture",       description:"Volume and texturing experimentation.",                featured:false },
          { id:6, title:"Trench Coat Silhouette", image:"/VN-4.jpg",                    category:"Ready-To-Wear", description:"Modern structured silhouette.",                        featured:false },
          { id:7, title:"Woven Tapestry Detail",  image:"/VN-5.jpg",                    category:"Textile Art",   description:"Hand-woven heritage textile close-up.",               featured:false },
          { id:8, title:"Evening Drape",           image:"/VN-6.jpg",                    category:"Couture",       description:"Fluid silk evening silhouette.",                       featured:false },
        ];
        setAllWorks(fallback);
        setCategories(["All","Couture","Textile Art","Ready-To-Wear","Sketches"]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredWorks = useMemo(() =>
    selectedCategory === "All"
      ? allWorks
      : allWorks.filter(w => w.category === selectedCategory),
    [allWorks, selectedCategory]
  );

  const openLightbox  = useCallback(w  => setLightboxImage(w),    []);
  const closeLightbox = useCallback(()  => setLightboxImage(null), []);

  const navigateLightbox = useCallback((dir) => {
    if (!lightboxImage) return;
    const idx = filteredWorks.findIndex(w => w.id === lightboxImage.id);
    const next = dir === "next"
      ? (idx + 1) % filteredWorks.length
      : (idx - 1 + filteredWorks.length) % filteredWorks.length;
    setLightboxImage(filteredWorks[next]);
  }, [lightboxImage, filteredWorks]);

  useEffect(() => {
    if (!lightboxImage) return;
    const handle = (e) => {
      if (e.key === "ArrowLeft")  navigateLightbox("prev");
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [lightboxImage, navigateLightbox, closeLightbox]);

  /* Staggered masonry: pattern repeats every 8 items */
  const getSpan = (index) => {
    const spans = [2, 1, 2, 2, 1, 2, 2, 1];
    return spans[index % spans.length];
  };

  const css = String.raw`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

    .glry { background:#fbfbfa; color:#1a1a1a; font-family:'Inter',sans-serif; min-height:100vh; overflow-x:hidden; position:relative; }

    .glry::before {
      content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity:0.022; mix-blend-mode:multiply;
    }
    .glry-wm { position:fixed; inset:0; z-index:0; pointer-events:none;
      background-image:url('/VN-5.jpg'); background-size:cover; background-position:center;
      opacity:0.04; filter:grayscale(1); }
    .glry-bd { position:relative; z-index:1; }

    .ftab { font-size:0.62rem; letter-spacing:0.25em; text-transform:uppercase; font-weight:600;
      padding:0 0 6px; border-top:none; border-left:none; border-right:none;
      border-bottom:1.5px solid transparent; color:#888;
      transition:color 0.25s,border-color 0.25s; background:none; cursor:pointer; }
    .ftab.on { color:#1a1a1a; border-bottom-color:#b8860b; }
    .ftab:hover { color:#1a1a1a; }

    .mgrid { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:220px; gap:14px; }
    @media(max-width:1024px){ .mgrid { grid-template-columns:repeat(2,1fr); grid-auto-rows:200px; } }
    @media(max-width:640px) { .mgrid { grid-template-columns:1fr; grid-auto-rows:280px; } }

    .mitem { overflow:hidden; cursor:pointer; position:relative; }
    .mitem.s2 { grid-row:span 2; }
    .mitem.s1 { grid-row:span 1; }
    .mitem img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.65s ease; }
    .mitem:hover img { transform:scale(1.06); }

    .mov { position:absolute; inset:0;
      background:linear-gradient(to top, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.08) 50%, transparent 100%);
      opacity:0; transition:opacity 0.4s ease; display:flex; flex-direction:column;
      justify-content:flex-end; padding:20px 18px; }
    .mitem:hover .mov { opacity:1; }

    .ocat { font-size:0.58rem; letter-spacing:0.2em; text-transform:uppercase; color:#b8860b; font-weight:600; margin-bottom:4px; }
    .otit { font-family:'Cormorant Garamond',serif; font-weight:300; font-size:1.35rem; color:#fff; line-height:1.1; }
    .oarr { position:absolute; top:14px; right:14px; width:30px; height:30px;
      border:1px solid rgba(255,255,255,0.35); border-radius:50%;
      display:flex; align-items:center; justify-content:center; color:#fff; }
    .fbg { position:absolute; top:14px; left:14px; font-size:0.52rem; letter-spacing:0.2em;
      text-transform:uppercase; font-weight:700; color:#fff; background:#b8860b; padding:4px 9px; }

    .lbwrap { position:fixed; inset:0; z-index:9999; background:rgba(8,7,6,0.96);
      backdrop-filter:blur(12px); display:flex; align-items:center; justify-content:center; }
    .lbx { position:absolute; top:18px; right:18px; width:38px; height:38px;
      border:1px solid rgba(255,255,255,0.18); border-radius:50%;
      display:flex; align-items:center; justify-content:center; color:#fff;
      cursor:pointer; transition:background 0.2s; background:none; }
    .lbx:hover { background:rgba(255,255,255,0.1); }
    .lbn { position:absolute; top:50%; transform:translateY(-50%); width:42px; height:42px;
      border:1px solid rgba(255,255,255,0.18); border-radius:50%;
      display:flex; align-items:center; justify-content:center; color:#fff;
      cursor:pointer; transition:background 0.2s; background:none; }
    .lbn:hover { background:rgba(255,255,255,0.1); }
    .lbbk { display:inline-block; background:#b8860b; color:#fff; font-size:0.62rem;
      letter-spacing:0.25em; text-transform:uppercase; font-weight:600; padding:12px 30px;
      text-decoration:none; transition:opacity 0.22s; }
    .lbbk:hover { opacity:0.82; }
    .ctabk { display:inline-block; background:#1a1a1a; color:#fbfbfa; font-size:0.62rem;
      letter-spacing:0.25em; text-transform:uppercase; font-weight:600; padding:14px 34px;
      text-decoration:none; transition:background 0.25s; }
    .ctabk:hover { background:#b8860b; }

    @keyframes glry-spin { to { transform:rotate(360deg); } }
  `;

  const padStyle = { paddingTop:"128px", paddingBottom:"96px", paddingLeft:"clamp(20px,5vw,80px)", paddingRight:"clamp(20px,5vw,80px)" };
  const serif = { fontFamily:"'Cormorant Garamond', serif" };

  return (
    <div className="glry">
      <style>{css}</style>
      <div className="glry-wm" />
      <Navbar />

      <div className="glry-bd" style={padStyle}>
        <div style={{ maxWidth:"1380px", margin:"0 auto" }}>

          {/* ── Hero Header ─────────────────────────────── */}
          <motion.div style={{ marginBottom:"56px" }}
            initial={{ opacity:0, y:28 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, ease:[0.22,0.61,0.36,1] }}
          >
            <p style={{ fontSize:"0.62rem", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:600, color:"#b8860b", marginBottom:"14px" }}>
              Portfolio &amp; Works
            </p>

            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:"20px", marginBottom:"28px" }}>
              <h1 style={{ ...serif, fontSize:"clamp(3rem,8vw,7rem)", fontWeight:300, lineHeight:0.92, letterSpacing:"-0.02em", color:"#1a1a1a", margin:0 }}>
                The&nbsp;<em style={{ fontStyle:"italic" }}>Archive</em>
              </h1>
              <p style={{ fontSize:"0.82rem", color:"#888", lineHeight:1.75, fontWeight:300, maxWidth:"340px", margin:0 }}>
                An editorial collection of couture, textile experimentation, and ready-to-wear — each piece a study in proportion, material, and restraint.
              </p>
            </div>

            {/* Filter bar */}
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:"24px", paddingTop:"16px", borderTop:"1px solid #e0dbd3" }}>
              {categories.map(cat => (
                <button key={cat} className={"ftab" + (selectedCategory === cat ? " on" : "")} onClick={() => setSelectedCategory(cat)}>
                  {cat}
                </button>
              ))}
              <div style={{ marginLeft:"auto", fontSize:"0.62rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#888", fontWeight:500, display:"flex", alignItems:"center", gap:"6px" }}>
                <span style={{ color:"#1a1a1a", fontWeight:700, fontSize:"0.88rem" }}>{filteredWorks.length}</span>
                {filteredWorks.length === 1 ? "piece" : "pieces"}
              </div>
            </div>
          </motion.div>

          {/* ── Masonry Grid ─────────────────────────────── */}
          {loading ? (
            <div style={{ display:"flex", justifyContent:"center", padding:"100px 0" }}>
              <div style={{ width:"32px", height:"32px", borderRadius:"50%", border:"2px solid transparent", borderTopColor:"#b8860b", animation:"glry-spin 0.8s linear infinite" }} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key={selectedCategory} className="mgrid"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.35 }}
              >
                {filteredWorks.map((work, idx) => {
                  const span = getSpan(idx);
                  return (
                    <motion.div key={work.id}
                      className={"mitem s" + span}
                      initial={{ opacity:0, y:20 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ duration:0.55, delay:Math.min(idx * 0.06, 0.42), ease:[0.22,0.61,0.36,1] }}
                      onClick={() => openLightbox(work)}
                    >
                      <img src={work.image} alt={work.title} loading="lazy"
                        onError={e => { e.target.src = "/VN-1.jpg"; }} />
                      <div className="mov">
                        <div className="oarr"><ArrowUpRight size={13} /></div>
                        <p className="ocat">{work.category}</p>
                        <h3 className="otit">{work.title}</h3>
                      </div>
                      {work.featured && <div className="fbg">Featured</div>}
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {!loading && filteredWorks.length === 0 && (
            <div style={{ textAlign:"center", padding:"80px 0", color:"#888" }}>
              <p style={{ ...serif, fontSize:"2rem", fontWeight:300 }}>No pieces in this category yet.</p>
            </div>
          )}

          {/* ── CTA ─────────────────────────────────────── */}
          <motion.div
            style={{ marginTop:"120px", paddingTop:"52px", borderTop:"1px solid #e0dbd3" }}
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-80px" }}
            transition={{ duration:0.8, ease:[0.22,0.61,0.36,1] }}
          >
            <div style={{ display:"flex", flexWrap:"wrap", alignItems:"flex-end", justifyContent:"space-between", gap:"28px" }}>
              <div>
                <p style={{ fontSize:"0.62rem", letterSpacing:"0.25em", textTransform:"uppercase", fontWeight:600, color:"#b8860b", marginBottom:"14px" }}>
                  Commission &amp; Collaboration
                </p>
                <h2 style={{ ...serif, fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:300, lineHeight:1.1, color:"#1a1a1a", letterSpacing:"-0.01em", margin:0 }}>
                  Every garment begins<br />with a conversation.
                </h2>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"18px", alignItems:"flex-start" }}>
                <p style={{ fontSize:"0.82rem", color:"#888", lineHeight:1.75, fontWeight:300, maxWidth:"300px", margin:0 }}>
                  We are always seeking fresh perspectives and meaningful collaborations. Let's build something extraordinary together.
                </p>
                <Link to="/contact" className="ctabk">Get In Touch</Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <Footer />

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div className="lbwrap"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.3 }}
            onClick={closeLightbox}
          >
            <button className="lbx" onClick={closeLightbox}><X size={15} /></button>
            <button className="lbn" style={{ left:"14px" }} onClick={e => { e.stopPropagation(); navigateLightbox("prev"); }}><ChevronLeft size={17} /></button>

            <motion.div key={lightboxImage.id}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px", maxWidth:"760px", width:"100%", padding:"20px 16px" }}
              onClick={e => e.stopPropagation()}
              initial={{ opacity:0, scale:0.97 }}
              animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.97 }}
              transition={{ duration:0.28 }}
            >
              <img src={lightboxImage.image} alt={lightboxImage.title}
                style={{ maxHeight:"60vh", maxWidth:"100%", objectFit:"contain" }}
                onError={e => { e.target.src = "/VN-1.jpg"; }} />
              <div style={{ textAlign:"center", color:"#fff" }}>
                <p style={{ fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#b8860b", fontWeight:600, marginBottom:"8px" }}>{lightboxImage.category}</p>
                <h3 style={{ ...serif, fontWeight:300, fontSize:"clamp(1.5rem,4vw,2.4rem)", lineHeight:1.1, marginBottom:"10px" }}>{lightboxImage.title}</h3>
                {lightboxImage.description && (
                  <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.58)", lineHeight:1.75, maxWidth:"460px", margin:"0 auto 20px", fontWeight:300 }}>{lightboxImage.description}</p>
                )}
                <Link to="/booking"
                  state={{ designId:lightboxImage.id, designTitle:lightboxImage.title, designCategory:lightboxImage.category, designPrice:lightboxImage.price, designImage:lightboxImage.image }}
                  className="lbbk"
                  onClick={closeLightbox}
                >Book This Design</Link>
              </div>
            </motion.div>

            <button className="lbn" style={{ right:"14px" }} onClick={e => { e.stopPropagation(); navigateLightbox("next"); }}><ChevronRight size={17} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
