const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/About-SIQvpPrV.js","assets/react-vendor-BtVOV0a2.js","assets/vendor-Cj7CuQkd.js","assets/framer-motion-CsYkecwc.js","assets/axios-DnTtldoj.js","assets/Gallery-DvP55t4u.js","assets/Services-BpDhzJI0.js","assets/Booking-CSU2eqWh.js","assets/ErrorModal-Y7KFnOBk.js","assets/Contact-eeBfOJN5.js"])))=>i.map(i=>d[i]);
var f=(t,s,r)=>new Promise((o,n)=>{var l=d=>{try{a(r.next(d))}catch(m){n(m)}},i=d=>{try{a(r.throw(d))}catch(m){n(m)}},a=d=>d.done?o(d.value):Promise.resolve(d.value).then(l,i);a((r=r.apply(t,s)).next())});import{r as c,u as L,j as e,L as x,R as _,a as ee,X as te,B as ae,C as re,G as X,b as q,M as Y,c as P,E as ie,S as se,d as ne,P as oe,e as le,Y as ce,F as de,I as me,f as fe,g as pe,h as v,i as he}from"./react-vendor-BtVOV0a2.js";import{a as ge}from"./axios-DnTtldoj.js";import{A as xe,m as h}from"./framer-motion-CsYkecwc.js";import"./vendor-Cj7CuQkd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(n){if(n.ep)return;n.ep=!0;const l=r(n);fetch(n.href,l)}})();const ue="modulepreload",be=function(t){return"/"+t},O={},E=function(s,r,o){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));n=Promise.allSettled(r.map(d=>{if(d=be(d),d in O)return;O[d]=!0;const m=d.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${p}`))return;const u=document.createElement("link");if(u.rel=m?"stylesheet":ue,m||(u.as="script"),u.crossOrigin="",u.href=d,a&&u.setAttribute("nonce",a),document.head.appendChild(u),m)return new Promise((z,C)=>{u.addEventListener("load",z),u.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${d}`)))})}))}function l(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return n.then(i=>{for(const a of i||[])a.status==="rejected"&&l(a.reason);return s().catch(l)})},V=[{name:"Home",href:"/"},{name:"About",href:"/about"},{name:"Services",href:"/services"},{name:"Gallery",href:"/gallery"},{name:"Contact",href:"/contact"}],ye=()=>{const[t,s]=c.useState(!1),[r,o]=c.useState(!1),n=L();c.useEffect(()=>{const a=()=>o(window.scrollY>24);return window.addEventListener("scroll",a,{passive:!0}),()=>window.removeEventListener("scroll",a)},[]),c.useEffect(()=>(document.body.style.overflow=t?"hidden":"",()=>{document.body.style.overflow=""}),[t]),c.useEffect(()=>{s(!1)},[n.pathname]);const l=c.useCallback(()=>s(!1),[]),i=c.useCallback(()=>s(a=>!a),[]);return e.jsxs(e.Fragment,{children:[e.jsx("nav",{className:`vn-navbar${r?" scrolled":""}`,role:"navigation","aria-label":"Main navigation",children:e.jsxs("div",{className:"vn-nav-inner",children:[e.jsx(x,{to:"/",className:"vn-logo","aria-label":"VN Fashion — Home",children:"VN FASHION"}),e.jsx("ul",{className:"vn-links",role:"list",children:V.map(a=>e.jsx("li",{children:e.jsx(x,{to:a.href,className:`vn-link${n.pathname===a.href?" active":""}`,"aria-current":n.pathname===a.href?"page":void 0,children:a.name})},a.name))}),e.jsx("div",{className:"vn-cta",children:e.jsx(x,{to:"/booking",className:"vn-book-btn","aria-label":"Book an appointment",children:e.jsx("span",{className:"btn-text",children:"Book Appointment"})})}),e.jsxs("button",{className:`vn-hamburger${t?" open":""}`,onClick:i,"aria-label":t?"Close menu":"Open menu","aria-expanded":t,"aria-controls":"vn-drawer",children:[e.jsx("span",{className:"vn-bar","aria-hidden":"true"}),e.jsx("span",{className:"vn-bar","aria-hidden":"true"}),e.jsx("span",{className:"vn-bar","aria-hidden":"true"})]})]})}),e.jsx("div",{className:`vn-overlay${t?" visible":""}`,onClick:l,"aria-hidden":"true"}),e.jsxs("aside",{id:"vn-drawer",className:`vn-drawer${t?" open":""}`,"aria-label":"Mobile navigation","aria-hidden":!t,children:[e.jsxs("div",{className:"vn-drawer-head",children:[e.jsx(x,{to:"/",className:"vn-logo",onClick:l,"aria-label":"VN Fashion — Home",children:"VN FASHION"}),e.jsx("button",{className:"vn-drawer-close",onClick:l,"aria-label":"Close menu",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsx("line",{x1:"1",y1:"1",x2:"13",y2:"13",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("line",{x1:"13",y1:"1",x2:"1",y2:"13",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})})]}),e.jsx("nav",{className:"vn-drawer-nav","aria-label":"Drawer navigation",children:V.map(a=>e.jsxs(x,{to:a.href,className:`vn-drawer-link${n.pathname===a.href?" active":""}`,onClick:l,"aria-current":n.pathname===a.href?"page":void 0,children:[a.name,e.jsx("span",{className:"vn-drawer-arrow","aria-hidden":"true",children:"→"})]},a.name))}),e.jsxs("div",{className:"vn-drawer-footer",children:[e.jsx(x,{to:"/booking",className:"vn-drawer-book-btn",onClick:l,children:e.jsxs("span",{className:"btn-text",style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),"Book Appointment"]})}),e.jsx("p",{className:"vn-drawer-label",children:"EST. 2024 — ATELIER VN"})]})]})]})},H="'Playfair Display', 'Times New Roman', serif",B="'Raleway', system-ui, sans-serif",M=[{value:"5+",label:"Years"},{value:"200+",label:"Pieces"},{value:"100+",label:"Clients"}],we=["VN FASHION","COUTURE","ARTISAN CRAFT","HANDMADE","AVANT-GARDE","ATELIER VN"],je=()=>e.jsxs("section",{className:"hero-root","aria-label":"VN Fashion — Hero Section",children:[e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-left",children:[e.jsxs("h1",{className:"hero-heading",style:{fontFamily:H},children:[e.jsx("span",{className:"hero-heading-line",children:e.jsx("em",{children:"The"})}),e.jsx("span",{className:"hero-heading-line",children:"Architecture"}),e.jsx("span",{className:"hero-heading-line hero-heading-accent",children:"of Couture"})]}),e.jsxs("div",{className:"hero-subtitle-row",children:[e.jsx("div",{className:"hero-rule"}),e.jsxs("p",{className:"hero-subtitle",children:["A dialogue between structural",e.jsx("br",{}),"rigidity and fluid motion."]})]}),e.jsxs("div",{className:"hero-ctas",children:[e.jsxs(x,{to:"/gallery",className:"hero-btn hero-btn-primary",children:[e.jsx("span",{className:"hero-btn-fill"}),e.jsx("span",{className:"hero-btn-text",children:"Explore Collection"})]}),e.jsxs(x,{to:"/booking",className:"hero-btn hero-btn-ghost",children:[e.jsx("span",{className:"hero-btn-fill"}),e.jsx("span",{className:"hero-btn-text",children:"Book Appointment"})]})]}),e.jsx("div",{className:"hero-stats",children:M.map((t,s)=>e.jsxs(_.Fragment,{children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-value",style:{fontFamily:H},children:t.value}),e.jsx("span",{className:"hero-stat-label",children:t.label})]}),s<M.length-1&&e.jsx("div",{className:"hero-stat-divider"})]},t.label))})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-img-primary",children:[e.jsx("img",{src:"/VN-1.jpg",alt:"VN Fashion editorial — main look",className:"hero-img",loading:"eager",onError:t=>{t.target.src="/hero_fashion_model.png"}}),e.jsx("div",{className:"hero-img-overlay","aria-hidden":"true"}),e.jsx("div",{className:"hero-img-gradient"})]}),e.jsxs("div",{className:"hero-float-card",children:[e.jsx("img",{src:"/VN-2.jpg",alt:"VN Fashion — secondary editorial",className:"hero-float-img",loading:"eager",onError:t=>{t.target.src="/VN.jpg"}}),e.jsx("div",{className:"hero-float-overlay","aria-hidden":"true"}),e.jsxs("div",{className:"hero-float-label",style:{fontFamily:B},children:[e.jsx("span",{children:"S/S '24"}),e.jsx("span",{className:"hero-float-arrow",children:"→"})]})]}),e.jsx("div",{className:"hero-side-label",style:{fontFamily:B},children:"01 / COLLECTION"})]})]}),e.jsx("div",{className:"hero-ticker","aria-hidden":"true",children:e.jsx("div",{className:"hero-ticker-track",children:[...Array(3)].map((t,s)=>we.map((r,o)=>e.jsxs("span",{className:"hero-ticker-item",children:[r,e.jsx("span",{className:"hero-ticker-sep",children:"•"})]},`${s}-${o}`)))})}),e.jsx("style",{children:`

        /* ---- Section ---- */
        .hero-root {
          width: 100%;
          min-height: 100svh;
          background: #f8f7f5;
          display: flex;
          flex-direction: column;
          padding-top: 64px;
          overflow: hidden;
          position: relative;
        }

        /* ---- Top meta bar ---- */
        .hero-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem 0;
        }
        .hero-meta-label {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9ca3af;
        }
        @media (max-width: 640px) {
          .hero-meta { padding: 1rem 1.5rem 0; }
          .hero-meta-right { display: none; }
        }

        /* ---- Main grid ---- */
        .hero-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 2rem 3rem 2rem;
          align-items: center;
        }
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 1.5rem 1.5rem 2rem;
            gap: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .hero-grid { padding: 1.25rem 1.25rem 1.5rem; gap: 2rem; }
        }

        /* ── LEFT COLUMN ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-right: 3rem;
          animation: heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (max-width: 1023px) {
          .hero-left { padding-right: 0; order: 2; }
        }

        /* Collection tag */
        .hero-collection-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .hero-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
          flex-shrink: 0;
          animation: pulseDot 2.5s ease infinite;
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }

        /* Heading — Playfair Display */
        .hero-heading {
          display: flex;
          flex-direction: column;
          font-family: 'Playfair Display', 'Times New Roman', serif;
          font-size: clamp(3.4rem, 7.5vw, 7rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          margin-bottom: 2rem;
        }
        .hero-heading-line {
          display: block;
        }
        .hero-heading-line em {
          font-style: italic;
          font-weight: 400;
          color: #374151;
        }
        .hero-heading-accent {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(120deg, #b8860b 0%, #8b6914 40%, #c9a84c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtitle row */
        .hero-subtitle-row {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }
        .hero-rule {
          width: 40px;
          height: 1px;
          background: #0a0a0a;
          margin-top: 0.6rem;
          flex-shrink: 0;
        }
        .hero-subtitle {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b7280;
          line-height: 1.8;
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
        }
        .hero-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          text-decoration: none;
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.85rem 1.8rem;
          transition: color 0.4s ease;
        }
        .hero-btn-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #0a0a0a;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .hero-btn-text {
          position: relative;
          z-index: 1;
        }
        /* Primary (filled → white text on hover) */
        .hero-btn-primary {
          background: #0a0a0a;
          color: #ffffff;
          border: 1.5px solid #0a0a0a;
        }
        .hero-btn-primary .hero-btn-fill {
          background: #374151;
        }
        .hero-btn-primary:hover .hero-btn-fill { width: 100%; }
        /* Ghost (outline → fills black on hover) */
        .hero-btn-ghost {
          background: transparent;
          color: #0a0a0a;
          border: 1.5px solid #0a0a0a;
        }
        .hero-btn-ghost:hover { color: #ffffff; }
        .hero-btn-ghost:hover .hero-btn-fill { width: 100%; }

        /* Stats */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hero-stat-value {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 300;
          color: #0a0a0a;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .hero-stat-label {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
        }
        .hero-stat-divider {
          width: 1px;
          height: 36px;
          background: #e5e7eb;
        }

        /* ── RIGHT COLUMN ── */
        .hero-right {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: stretch;
          height: min(75vh, 680px);
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
        @media (max-width: 1023px) {
          .hero-right {
            order: 1;
            height: min(60vw, 420px);
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .hero-right { height: 70vw; min-height: 260px; }
        }

        /* Primary image */
        .hero-img-primary {
          position: relative;
          width: 70%;
          height: 100%;
          overflow: hidden;
          border-radius: 2px;
          background: #e5e7eb;
        }
        @media (max-width: 1023px) { .hero-img-primary { width: 65%; } }
        @media (max-width: 640px)  { .hero-img-primary { width: 72%; } }

        /* ---- Image: grayscale → color on hover ---- */
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          /* Start desaturated (matches the b&w editorial theme) */
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-img-primary:hover .hero-img {
          filter: grayscale(0%) contrast(1.0) saturate(1.1);
          transform: scale(1.04);
        }
        /* Warm amber overlay — fades away on hover revealing true color */
        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(212, 175, 55, 0.08);
          mix-blend-mode: multiply;
          opacity: 1;
          transition: opacity 0.7s ease;
          pointer-events: none;
          z-index: 1;
        }
        .hero-img-primary:hover .hero-img-overlay {
          opacity: 0;
        }
        .hero-img-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
          pointer-events: none;
          z-index: 2;
        }

        /* Floating secondary card */
        .hero-float-card {
          position: absolute;
          bottom: 10%;
          left: 0;
          width: 36%;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          border-radius: 2px;
          z-index: 10;
        }
        .hero-float-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.16);
        }
        @media (max-width: 1023px) {
          .hero-float-card {
            bottom: 8%;
            left: 4%;
            width: 30%;
          }
        }
        @media (max-width: 640px) {
          .hero-float-card { width: 32%; bottom: 6%; left: 2%; }
        }

        .hero-float-img {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: top;
          display: block;
          /* Also starts grayscale */
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s ease;
        }
        .hero-float-overlay {
          position: absolute;
          top: 0; left: 0; right: 0;
          /* Height = everything except the label bar */
          bottom: 2.2rem;
          background: rgba(180, 140, 20, 0.07);
          mix-blend-mode: multiply;
          opacity: 1;
          transition: opacity 0.65s ease;
          pointer-events: none;
          z-index: 1;
        }
        .hero-float-card:hover .hero-float-img {
          filter: grayscale(0%) contrast(1.0) saturate(1.15);
          transform: scale(1.06);
        }
        .hero-float-card:hover .hero-float-overlay {
          opacity: 0;
        }
        .hero-float-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #ffffff;
        }
        .hero-float-arrow {
          font-size: 0.75rem;
          transition: transform 0.25s ease;
        }
        .hero-float-card:hover .hero-float-arrow { transform: translateX(3px); }

        /* Side index label */
        .hero-side-label {
          position: absolute;
          right: -1.5rem;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d1d5db;
          white-space: nowrap;
          pointer-events: none;
        }
        @media (max-width: 1023px) { .hero-side-label { display: none; } }

        /* ── Ticker ── */
        .hero-ticker {
          border-top: 1px solid #e5e7eb;
          overflow: hidden;
          padding: 0.9rem 0;
          background: #f8f7f5;
        }
        .hero-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: tickerScroll 28s linear infinite;
        }
        .hero-ticker-item {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9ca3af;
          white-space: nowrap;
          padding: 0 0.25rem;
        }
        .hero-ticker-sep {
          margin: 0 1.25rem;
          opacity: 0.4;
        }

        /* ── Keyframes ── */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

      `})]}),R={BASE_URL:"/api",SERVER_BASE_URL:"",TIMEOUT:3e4},w={ABOUT:"/content/public/about",ACHIEVEMENTS:"/content/public/achievements",GALLERY:"/content/public/gallery",SERVICES:"/content/public/services",CATEGORIES:"/content/public/categories",CERTIFICATES:"/content/public/certificates",TIMELINE:"/content/public/timeline",TESTIMONIALS:"/content/public/testimonials",BOOKINGS:"/content/public/bookings",CONTACTS:"/content/public/contacts",SETTINGS:"/content/public/settings"},G={ABOUT:{aboutText:"We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.",designerName:"Vidisha",designerTitle:"Master Artisan & Designer",designerBio:"With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",designerImage:"/vidisha.jpg"},ACHIEVEMENTS:["10+ Years of Experience","500+ Custom Designs Created","Specialized in Bridal Wear"]},g=ge.create({baseURL:R.BASE_URL,timeout:R.TIMEOUT,headers:{"Content-Type":"application/json"}});g.interceptors.request.use(t=>(t.data instanceof FormData&&delete t.headers["Content-Type"],t),t=>Promise.reject(t));g.interceptors.response.use(t=>t,t=>(t.response?console.error("API Error:",t.response.status,t.response.data):t.request?console.error("Network Error:",t.request):console.error("Error:",t.message),Promise.reject(t)));const K=t=>t?t.startsWith("http://")||t.startsWith("https://")?t:t.startsWith("/api/uploads/")?`${R.SERVER_BASE_URL}${t}`:t:"",ve=t=>{if(!t)return"";const s=String(t).trim();return s.startsWith("₹")?s:`₹ ${s}`},j=(t,s)=>(console.error("API Error:",t),s),D={getAbout:()=>f(void 0,null,function*(){try{return(yield g.get(w.ABOUT)).data}catch(t){return j(t,G.ABOUT)}}),getAchievements:()=>f(void 0,null,function*(){try{return(yield g.get(w.ACHIEVEMENTS)).data||[]}catch(t){return j(t,G.ACHIEVEMENTS)}}),getGallery:()=>f(void 0,null,function*(){try{return(yield g.get(w.GALLERY)).data||[]}catch(t){return j(t,[])}}),getServices:()=>f(void 0,null,function*(){try{return(yield g.get(w.SERVICES)).data||[]}catch(t){return j(t,[])}}),getCategories:()=>f(void 0,null,function*(){try{return(yield g.get(w.CATEGORIES)).data||[]}catch(t){return j(t,[])}}),getCertificates:()=>f(void 0,null,function*(){try{return(yield g.get(w.CERTIFICATES)).data||[]}catch(t){return j(t,[])}}),getTimeline:()=>f(void 0,null,function*(){try{return(yield g.get(w.TIMELINE)).data||[]}catch(t){return j(t,[])}}),getTestimonials:()=>f(void 0,null,function*(){try{return(yield g.get(w.TESTIMONIALS)).data||[]}catch(t){return j(t,[])}}),createBooking:t=>f(void 0,null,function*(){return(yield g.post(w.BOOKINGS,t)).data}),createContact:t=>f(void 0,null,function*(){return(yield g.post(w.CONTACTS,t)).data}),getSettings:()=>f(void 0,null,function*(){return yield g.get(w.SETTINGS)})},Ne=Object.freeze(Object.defineProperty({__proto__:null,axiosInstance:g,contentApi:D,formatPrice:ve,getImageUrl:K},Symbol.toStringTag,{value:"Module"})),F="'Playfair Display', 'Times New Roman', serif",$="'Raleway', system-ui, sans-serif",ke=["Artisan Craft","Avant-Garde","Sustainable"],Se=()=>{const[t,s]=c.useState("We construct artifacts of intentional identity — where textiles become structural components that redefine the modern silhouette.");return c.useEffect(()=>{f(void 0,null,function*(){try{const o=yield(yield E(()=>f(void 0,null,function*(){const{contentApi:n}=yield Promise.resolve().then(()=>Ne);return{contentApi:n}}),void 0)).contentApi.getAbout();o!=null&&o.aboutText&&s(o.aboutText)}catch(o){}})},[]),e.jsxs("section",{id:"about",className:"ab-root","aria-label":"About VN Fashion",children:[e.jsx("div",{className:"ab-bg","aria-hidden":"true",children:e.jsx("img",{src:"/VN-5.jpg",alt:"",onError:r=>{r.target.src="/HeroBg.jpg"}})}),e.jsxs("div",{className:"ab-inner",children:[e.jsxs("div",{className:"ab-top",children:[e.jsx("div",{className:"ab-rule"}),e.jsx("span",{className:"ab-label",children:"VN Studio — Est. 2024"})]}),e.jsxs("div",{className:"ab-grid",children:[e.jsx("div",{className:"ab-left",children:e.jsxs("h2",{className:"ab-heading",style:{fontFamily:F},children:["Fashion as",e.jsx("br",{}),e.jsx("em",{children:"Architecture."})]})}),e.jsxs("div",{className:"ab-right",children:[e.jsx("p",{className:"ab-quote",style:{fontFamily:F},children:t}),e.jsx("div",{className:"ab-tags",children:ke.map((r,o)=>e.jsx("span",{className:"ab-tag",style:{fontFamily:$},children:r},o))}),e.jsxs(x,{to:"/about",className:"ab-cta",style:{fontFamily:$},children:[e.jsx("span",{className:"ab-cta-fill"}),e.jsx("span",{className:"ab-cta-text",children:"Our Full Story"}),e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",className:"ab-cta-arrow",children:[e.jsx("line",{x1:"0",y1:"7",x2:"12",y2:"7"}),e.jsx("polyline",{points:"7,2 12,7 7,12"})]})]})]})]}),e.jsxs("div",{className:"ab-strip",children:[["/VN-1.jpg","/VN-3.jpg","/VN-6.jpg"].map((r,o)=>e.jsx("div",{className:"ab-strip-img",children:e.jsx("img",{src:r,alt:`VN Fashion look ${o+1}`,loading:"lazy",onError:n=>{n.target.src="/VN.jpg"}})},o)),e.jsxs("div",{className:"ab-strip-text",style:{fontFamily:F},children:[e.jsx("span",{children:"S/S"}),e.jsx("em",{children:"2024"})]})]})]}),e.jsx("style",{children:`

        /* Root */
        .ab-root {
          position: relative;
          width: 100%;
          background: #0c0c0b;
          overflow: hidden;
          padding: 4rem 0 0;
        }

        /* Faded BG */
        .ab-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .ab-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          opacity: 0.05;
          filter: grayscale(100%);
          display: block;
        }

        /* Inner */
        .ab-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .ab-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .ab-inner { padding: 0 1.25rem; } }

        /* Top rule row */
        .ab-top {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        .ab-rule {
          width: 36px;
          height: 1px;
          background: #b8860b;
          flex-shrink: 0;
        }
        .ab-label {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* Two-column grid */
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 4rem;
          align-items: start;
          margin-bottom: 3.5rem;
        }
        @media (max-width: 768px) {
          .ab-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Left heading */
        .ab-left {}
        .ab-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin: 0;
        }
        .ab-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 55%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Right content */
        .ab-right {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .ab-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }

        /* Tags */
        .ab-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .ab-tag {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.4rem 0.85rem;
          transition: color 0.25s, border-color 0.25s;
        }
        .ab-tag:hover {
          color: #b8860b;
          border-color: #b8860b;
        }

        /* CTA */
        .ab-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          overflow: hidden;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.2);
          padding: 0.75rem 1.5rem;
          color: #ffffff;
          width: fit-content;
          transition: color 0.4s ease, border-color 0.4s ease;
        }
        .ab-cta-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #b8860b;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ab-cta:hover .ab-cta-fill { width: 100%; }
        .ab-cta:hover { border-color: #b8860b; }
        .ab-cta-text {
          position: relative;
          z-index: 1;
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .ab-cta-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .ab-cta:hover .ab-cta-arrow { transform: translateX(4px); }

        /* Bottom image strip */
        .ab-strip {
          display: flex;
          align-items: stretch;
          gap: 3px;
          height: 180px;
          position: relative;
        }
        @media (max-width: 640px) { .ab-strip { height: 130px; } }

        .ab-strip-img {
          flex: 1;
          overflow: hidden;
          background: #1a1a1a;
        }
        .ab-strip-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: grayscale(100%) brightness(0.7);
          transition: filter 0.6s ease, transform 0.6s ease;
        }
        .ab-strip-img:hover img {
          filter: grayscale(0%) brightness(0.9);
          transform: scale(1.06);
        }

        /* Floating text card in strip */
        .ab-strip-text {
          flex-shrink: 0;
          width: 100px;
          background: #b8860b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        @media (max-width: 480px) { .ab-strip-text { width: 70px; } }
        .ab-strip-text span {
          font-family: 'Playfair Display', serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .ab-strip-text em {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
          line-height: 1;
        }

      `})]})},I="'Playfair Display', 'Times New Roman', serif",N="'Raleway', system-ui, sans-serif",k=[{id:"f1",title:"Noir Collection",image:"/VN-1.jpg",category:"Bridal",description:"Exquisite handcrafted bridal wear",featured:!0},{id:"f2",title:"Iridescent Weave",image:"/VN-2.jpg",category:"Textile Art",description:"Structural fabric manipulation",featured:!1},{id:"f3",title:"Chromatic Portrait",image:"/VN-3.jpg",category:"Avant-Garde",description:"Futuristic couture editorial",featured:!1},{id:"f4",title:"Artisan Detail",image:"/aariWork.jpg",category:"Aari Work",description:"Hand-embroidered signature pieces",featured:!1}],Ee=()=>{const[t,s]=c.useState([]),[r,o]=c.useState(!0),n=ee();c.useEffect(()=>{f(void 0,null,function*(){try{o(!0);const d=(yield D.getGallery()).map((p,u)=>({id:p._id||u+1,title:p.title||"Untitled",image:K(p.image)||k[u%k.length].image,category:p.category||"Collection",description:p.description||"Exquisite handcrafted design",featured:p.featured||!1})),m=[...d.filter(p=>p.featured),...d.filter(p=>!p.featured)];s(m)}catch(a){s(k)}finally{o(!1)}})},[]);const l=c.useMemo(()=>{const a=t.slice(0,4);for(;a.length<4;)a.push(k[a.length]);return a},[t]),i=c.useCallback(a=>{n("/gallery",{state:{scrollToItem:a.id}})},[n]);return e.jsxs("section",{className:"fw-root","aria-label":"Featured Works",children:[e.jsxs("div",{className:"fw-inner",children:[e.jsxs("div",{className:"fw-header",children:[e.jsxs("div",{className:"fw-header-left",children:[e.jsx("span",{className:"fw-eyebrow",style:{fontFamily:N},children:"Selected Works"}),e.jsxs("h2",{className:"fw-heading",style:{fontFamily:I},children:["Featured ",e.jsx("em",{children:"Collection"})]})]}),e.jsxs(x,{to:"/gallery",className:"fw-viewall",style:{fontFamily:N},children:[e.jsx("span",{className:"fw-viewall-fill"}),e.jsx("span",{className:"fw-viewall-text",children:"View All"}),e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",className:"fw-viewall-arrow",children:[e.jsx("line",{x1:"0",y1:"7",x2:"12",y2:"7"}),e.jsx("polyline",{points:"7,2 12,7 7,12"})]})]})]}),r?e.jsx("div",{className:"fw-skeleton",children:[...Array(4)].map((a,d)=>e.jsx("div",{className:"fw-skel-col"},d))}):e.jsx("div",{className:"fw-panels",children:l.map((a,d)=>e.jsxs("div",{className:`fw-panel ${a.featured?"fw-panel-featured":""}`,onClick:()=>i(a),role:"button",tabIndex:0,onKeyDown:m=>m.key==="Enter"&&i(a),"aria-label":`View ${a.title}`,children:[e.jsxs("div",{className:"fw-panel-bg",children:[e.jsx("img",{src:a.image,alt:a.title,className:"fw-panel-img",loading:"lazy",onError:m=>{m.target.src=k[d%k.length].image}}),e.jsx("div",{className:"fw-panel-overlay"})]}),e.jsxs("div",{className:"fw-panel-number",style:{fontFamily:I},children:["0",d+1]}),e.jsxs("div",{className:"fw-panel-content",children:[e.jsx("span",{className:"fw-panel-cat",style:{fontFamily:N},children:a.category}),e.jsx("h3",{className:"fw-panel-title",style:{fontFamily:I},children:a.title}),e.jsx("p",{className:"fw-panel-desc",style:{fontFamily:N},children:a.description}),e.jsxs("div",{className:"fw-panel-action",style:{fontFamily:N},children:[e.jsx("span",{children:"DISCOVER"}),e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 14 14",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",className:"fw-panel-arrow",children:[e.jsx("line",{x1:"0",y1:"7",x2:"12",y2:"7"}),e.jsx("polyline",{points:"7,2 12,7 7,12"})]})]})]}),a.featured&&e.jsx("div",{className:"fw-panel-badge",style:{fontFamily:N},children:"Featured"})]},a.id||d))})]}),e.jsx("style",{children:`
        /* Root */
        .fw-root {
          width: 100%;
          background: #f8f7f5;
          padding: 5rem 0 5.5rem;
        }

        /* Inner */
        .fw-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .fw-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .fw-inner { padding: 0 1.25rem; } }

        /* Header */
        .fw-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1rem;
        }
        .fw-eyebrow {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 0.6rem;
        }
        .fw-heading {
          font-size: clamp(1.9rem, 3.5vw, 3rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          margin: 0;
        }
        .fw-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 60%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* View All CTA button */
        .fw-viewall {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          overflow: hidden;
          text-decoration: none;
          border: 1.5px solid #0a0a0a;
          padding: 0.65rem 1.3rem;
          color: #0a0a0a;
          flex-shrink: 0;
          transition: color 0.4s ease;
          white-space: nowrap;
        }
        .fw-viewall-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #0a0a0a;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .fw-viewall:hover .fw-viewall-fill { width: 100%; }
        .fw-viewall:hover { color: #ffffff; }
        .fw-viewall-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .fw-viewall-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .fw-viewall:hover .fw-viewall-arrow { transform: translateX(4px); }

        /* Panels layout container (Desktop) */
        .fw-panels {
          display: flex;
          gap: 12px;
          height: 520px;
          width: 100%;
        }

        /* Individual expanding panel */
        .fw-panel {
          position: relative;
          flex: 1;
          height: 100%;
          overflow: hidden;
          background: #1c1c1a;
          cursor: pointer;
          transition: flex 0.7s cubic-bezier(0.25, 1, 0.3, 1);
          border: 1px solid rgba(0, 0, 0, 0.03);
          outline: none;
        }

        .fw-panel:focus-visible {
          outline: 2px solid #b8860b;
          outline-offset: 2px;
        }

        /* Hover Expansion animation trigger */
        @media (min-width: 769px) {
          .fw-panel:hover {
            flex: 1.8;
          }
        }

        /* Panel background image wrapper */
        .fw-panel-bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
        }

        .fw-panel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          filter: grayscale(100%);
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.3, 1),
                      filter 0.6s ease;
        }

        .fw-panel:hover .fw-panel-img {
          filter: grayscale(0%);
          transform: scale(1.05);
        }

        /* Ambient dark gradient overlay */
        .fw-panel-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(10, 10, 10, 0.45) 50%,
            rgba(10, 10, 10, 0.1) 80%,
            transparent 100%
          );
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }

        .fw-panel:hover .fw-panel-overlay {
          opacity: 0.9;
        }

        /* Accent index number in background */
        .fw-panel-number {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: clamp(3rem, 5.5vw, 4.5rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.08);
          line-height: 1;
          letter-spacing: -0.05em;
          z-index: 2;
          pointer-events: none;
          transition: color 0.5s ease, transform 0.7s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .fw-panel:hover .fw-panel-number {
          color: rgba(184, 134, 11, 0.18);
          transform: translateY(-5px);
        }

        /* Panel content wrapper */
        .fw-panel-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.2rem 2rem;
          z-index: 3;
          display: flex;
          flex-direction: column;
          pointer-events: none;
        }

        .fw-panel-cat {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #c9a84c;
          margin-bottom: 0.7rem;
        }

        .fw-panel-title {
          font-size: clamp(1.25rem, 1.8vw, 1.7rem);
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 0.8rem;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        /* Description: transitions to slide open on hover on desktop */
        .fw-panel-desc {
          font-size: 0.78rem;
          line-height: 1.6;
          color: #d1d5db;
          margin: 0;
          max-width: 90%;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          transition: opacity 0.5s ease, max-height 0.5s cubic-bezier(0.25, 1, 0.3, 1), margin 0.5s ease;
        }

        @media (min-width: 769px) {
          .fw-panel:hover .fw-panel-desc {
            opacity: 1;
            max-height: 80px;
            margin-bottom: 1.5rem;
          }
        }

        /* Discover link animation */
        .fw-panel-action {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #ffffff;
          text-transform: uppercase;
          transition: color 0.4s ease, border-bottom-color 0.4s ease;
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.2);
          width: fit-content;
          padding-bottom: 3px;
        }

        .fw-panel-arrow {
          transition: transform 0.3s ease;
        }

        .fw-panel:hover .fw-panel-action {
          color: #e4c97e;
          border-bottom-color: #e4c97e;
        }

        .fw-panel:hover .fw-panel-arrow {
          transform: translateX(4px);
        }

        /* Featured top badge */
        .fw-panel-badge {
          position: absolute;
          top: 2rem;
          left: 2rem;
          background: rgba(184, 134, 11, 0.95);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.4rem 0.8rem;
          z-index: 4;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        /* Mobile Touch & Scroll adjustments (under 768px) */
        @media (max-width: 768px) {
          .fw-panels {
            height: auto;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 1.5rem;
            gap: 16px;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .fw-panels::-webkit-scrollbar {
            display: none;
          }

          .fw-panel {
            flex: 0 0 290px;
            height: 420px;
            scroll-snap-align: start;
          }

          .fw-panel-img {
            filter: grayscale(0%);
          }

          .fw-panel-desc {
            opacity: 1;
            max-height: 80px;
            margin-bottom: 1.2rem;
          }

          .fw-panel-overlay {
            opacity: 0.85;
          }

          .fw-panel-number {
            top: 1.5rem;
            right: 1.5rem;
            font-size: 3rem;
          }

          .fw-panel-badge {
            top: 1.5rem;
            left: 1.5rem;
          }

          .fw-panel-content {
            padding: 1.75rem 1.5rem;
          }
        }

        /* Pulse loading skeleton for vertical columns */
        .fw-skeleton {
          display: flex;
          gap: 12px;
          height: 520px;
          width: 100%;
        }

        .fw-skel-col {
          flex: 1;
          height: 100%;
          background: #e5e7eb;
          animation: fw-pulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .fw-skeleton {
            height: 420px;
            overflow-x: auto;
          }
          .fw-skel-col {
            flex: 0 0 290px;
          }
        }

        @keyframes fw-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.8; }
        }
      `})]})},Te=_.memo(Ee),Ae="'Playfair Display', 'Times New Roman', serif",T="'Raleway', system-ui, sans-serif",ze=()=>e.jsxs("section",{className:"js-root","aria-label":"Journal — The Geometry of Motion",children:[e.jsxs("div",{className:"js-inner",children:[e.jsxs("div",{className:"js-label-row",children:[e.jsx("div",{className:"js-label-line"}),e.jsx("span",{className:"js-label",style:{fontFamily:T},children:"Journal — C01"}),e.jsx("div",{className:"js-label-line js-label-flex"})]}),e.jsxs("div",{className:"js-grid",children:[e.jsxs("div",{className:"js-img-wrap",children:[e.jsx("img",{src:"/journal_motion_model.png",alt:"The Geometry of Motion — VN Fashion editorial",className:"js-img",loading:"lazy",onError:t=>{t.target.src="/VN-4.jpg"}}),e.jsx("div",{className:"js-img-overlay"}),e.jsx("div",{className:"js-img-tag",style:{fontFamily:T},children:"Editorial"})]}),e.jsxs("div",{className:"js-content",children:[e.jsxs("h2",{className:"js-heading",style:{fontFamily:Ae},children:["The Geometry",e.jsx("br",{}),e.jsx("em",{children:"of Motion"})]}),e.jsx("p",{className:"js-desc",style:{fontFamily:T},children:"Exploring the intersection of architectural rigidity and the fluid transition of sartorial form. An essay on movement, structure, and the human silhouette."}),e.jsxs(x,{to:"/gallery",className:"js-cta",style:{fontFamily:T},children:[e.jsx("span",{className:"js-cta-fill"}),e.jsx("span",{className:"js-cta-text",children:"Read the Essay"}),e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",className:"js-cta-arrow","aria-hidden":"true",children:[e.jsx("line",{x1:"0",y1:"7",x2:"12",y2:"7"}),e.jsx("polyline",{points:"7,2 12,7 7,12"})]})]})]})]})]}),e.jsx("style",{children:`
        .js-root {
          width: 100%;
          background: #ffffff;
          padding: 5rem 0;
        }
        .js-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .js-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .js-inner { padding: 0 1.25rem; } }

        /* Label row */
        .js-label-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .js-label-line { height: 1px; width: 32px; background: #e5e7eb; flex-shrink: 0; }
        .js-label-flex { flex: 1; }
        .js-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #9ca3af;
          white-space: nowrap;
        }

        /* Grid */
        .js-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .js-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* Image */
        .js-img-wrap {
          position: relative;
          overflow: hidden;
          background: #e5e7eb;
          aspect-ratio: 4 / 5;
        }
        .js-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: grayscale(30%);
          transition: filter 0.65s ease, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .js-img-wrap:hover .js-img {
          filter: grayscale(0%);
          transform: scale(1.04);
        }
        .js-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 50%);
          pointer-events: none;
        }
        .js-img-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(184, 134, 11, 0.9);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
        }

        /* Content */
        .js-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .js-heading {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.08;
          color: #0a0a0a;
          margin: 0;
        }
        .js-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 60%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .js-desc {
          font-size: 0.82rem;
          font-weight: 400;
          line-height: 1.85;
          color: #6b7280;
          margin: 0;
          max-width: 420px;
        }

        /* CTA */
        .js-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          overflow: hidden;
          text-decoration: none;
          border: 1.5px solid #0a0a0a;
          padding: 0.75rem 1.5rem;
          color: #0a0a0a;
          width: fit-content;
          transition: color 0.4s ease;
          margin-top: 0.5rem;
        }
        .js-cta-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #0a0a0a;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .js-cta:hover .js-cta-fill { width: 100%; }
        .js-cta:hover { color: #ffffff; }
        .js-cta-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .js-cta-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .js-cta:hover .js-cta-arrow { transform: translateX(4px); }
      `})]}),Ce="'Playfair Display', 'Times New Roman', serif",S="'Raleway', system-ui, sans-serif",Fe=()=>{const[t,s]=c.useState(""),[r,o]=c.useState(!1),n=l=>{l.preventDefault(),t&&(o(!0),s(""))};return e.jsxs("section",{id:"contact",className:"ct-root","aria-label":"Newsletter signup",children:[e.jsx("div",{className:"ct-bg","aria-hidden":"true",children:e.jsx("img",{src:"/VN-6.jpg",alt:"",onError:l=>{l.target.src="/HeroBgImg.jpg"}})}),e.jsx("div",{className:"ct-inner",children:e.jsxs("div",{className:"ct-grid",children:[e.jsxs("div",{className:"ct-left",children:[e.jsx("span",{className:"ct-eyebrow",style:{fontFamily:S},children:"Newsletter"}),e.jsxs("h2",{className:"ct-heading",style:{fontFamily:Ce},children:["Join the",e.jsx("br",{}),e.jsx("em",{children:"Collective."})]}),e.jsx("p",{className:"ct-desc",style:{fontFamily:S},children:"Private previews, atelier updates, and digital journals — delivered to your inbox."})]}),e.jsxs("div",{className:"ct-right",children:[r?e.jsxs("div",{className:"ct-success",style:{fontFamily:S},children:[e.jsx("span",{className:"ct-check",children:"✓"}),"You're in the collective"]}):e.jsxs("form",{onSubmit:n,className:"ct-form",children:[e.jsx("input",{id:"newsletter-email",type:"email",value:t,onChange:l=>s(l.target.value),placeholder:"Your email address",required:!0,className:"ct-input",style:{fontFamily:S}}),e.jsxs("button",{type:"submit",id:"newsletter-submit-btn",className:"ct-submit",style:{fontFamily:S},children:[e.jsx("span",{className:"ct-submit-fill"}),e.jsx("span",{className:"ct-submit-text",children:"Subscribe"})]})]}),e.jsx("p",{className:"ct-privacy",style:{fontFamily:S},children:"No spam. Unsubscribe anytime."})]})]})}),e.jsx("style",{children:`
        .ct-root {
          position: relative;
          width: 100%;
          background: #0c0c0b;
          overflow: hidden;
          padding: 4.5rem 0;
        }
        .ct-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .ct-bg img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.06;
          filter: grayscale(100%);
          display: block;
        }
        .ct-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .ct-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .ct-inner { padding: 0 1.25rem; } }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .ct-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* Left */
        .ct-eyebrow {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 0.8rem;
        }
        .ct-heading {
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.05;
          color: #ffffff;
          margin: 0 0 1rem;
        }
        .ct-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 60%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ct-desc {
          font-size: 0.78rem;
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255,255,255,0.45);
          max-width: 380px;
          margin: 0;
        }

        /* Right */
        .ct-form {
          display: flex;
          gap: 0;
          border: 1.5px solid rgba(255,255,255,0.15);
          overflow: hidden;
        }
        @media (max-width: 480px) {
          .ct-form { flex-direction: column; }
        }
        .ct-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          padding: 1rem 1.2rem;
        }
        .ct-input::placeholder {
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.62rem;
          font-weight: 600;
        }
        .ct-submit {
          position: relative;
          overflow: hidden;
          background: transparent;
          border: none;
          border-left: 1.5px solid rgba(255,255,255,0.15);
          color: #ffffff;
          cursor: pointer;
          padding: 1rem 1.6rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }
        @media (max-width: 480px) {
          .ct-submit {
            border-left: none;
            border-top: 1.5px solid rgba(255,255,255,0.15);
          }
        }
        .ct-submit-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #b8860b;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ct-submit:hover .ct-submit-fill { width: 100%; }
        .ct-submit-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .ct-privacy {
          margin-top: 0.75rem;
          font-size: 0.55rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .ct-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1.5px solid #b8860b;
          padding: 1rem 1.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b8860b;
        }
        .ct-check {
          font-size: 1rem;
          line-height: 1;
        }
      `})]})},Ie=({isOpen:t,onClose:s})=>{const r={name:"Sohan Sarang",role:"Full Stack Developer",image:"/Me.jpg",bio:"Passionate full stack developer specializing in modern web technologies. Creating beautiful, responsive, and performant web applications with React, Node.js, and MongoDB.",skills:["React","Node.js","MongoDB","Express","JavaScript","Tailwind CSS","Github","HTML","CSS"],portfolio:"https://sohan-sarang-portfolio.vercel.app/",email:"sohansarang21@gmail.com",github:"https://github.com/DcoderSohan",linkedin:"https://linkedin.com/in/sohan-sarang"};return e.jsx(xe,{children:t&&e.jsx(e.Fragment,{children:e.jsx(h.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.15,ease:[.4,0,.2,1]},onClick:s,className:"fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6",style:{willChange:"opacity"},children:e.jsxs(h.div,{initial:{opacity:0,scale:.9,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.9,y:20},transition:{type:"spring",damping:30,stiffness:400,mass:.5},onClick:o=>o.stopPropagation(),className:"bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-gray-700/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",style:{willChange:"transform, opacity"},children:[e.jsx(h.button,{onClick:s,whileHover:{scale:1.1,rotate:90},whileTap:{scale:.9},transition:{duration:.2},className:"absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800/90 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors shadow-lg","aria-label":"Close modal",children:e.jsx(te,{className:"w-4 h-4 sm:w-5 sm:h-5"})}),e.jsxs("div",{className:"p-4 sm:p-6 md:p-8",children:[e.jsx(h.div,{className:"flex justify-center mb-4 sm:mb-6",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.1,duration:.3},children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-0.5 sm:p-1",children:e.jsx("div",{className:"w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden",children:e.jsx("img",{src:r.image,alt:r.name,className:"w-full h-full object-cover"})})}),e.jsx("div",{className:"absolute -bottom-1.5 sm:-bottom-2 left-1/2 transform -translate-x-1/2",children:e.jsxs(h.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{delay:.25,type:"spring",stiffness:200,damping:15},className:"bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg flex items-center gap-1 sm:gap-1.5 whitespace-nowrap",children:[e.jsx(ae,{className:"w-2.5 h-2.5 sm:w-3 sm:h-3"}),e.jsx("span",{className:"hidden sm:inline",children:r.role}),e.jsx("span",{className:"sm:hidden",children:"Developer"})]})})]})}),e.jsx(h.h2,{className:"text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2 sm:mb-3",initial:{opacity:0,y:-10},animate:{opacity:1,y:0},transition:{delay:.15,duration:.3},children:r.name}),e.jsx(h.p,{className:"text-gray-300 text-xs sm:text-sm md:text-base text-center mb-4 sm:mb-6 leading-relaxed px-2",initial:{opacity:0},animate:{opacity:1},transition:{delay:.2,duration:.3},children:r.bio}),e.jsxs(h.div,{className:"mb-4 sm:mb-6",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.25,duration:.3},children:[e.jsxs("h3",{className:"text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2",children:[e.jsx(re,{className:"w-3 h-3 sm:w-4 sm:h-4"}),"Skills"]}),e.jsx("div",{className:"flex flex-wrap gap-1.5 sm:gap-2",children:r.skills.map((o,n)=>e.jsx(h.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.3+n*.03,type:"spring",stiffness:200},className:"px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-700/50 text-gray-300 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium border border-gray-600/50",children:o},o))})]}),e.jsxs(h.div,{className:"flex justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-6",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.35,duration:.3},children:[e.jsx(h.a,{href:r.github,target:"_blank",rel:"noopener noreferrer",whileHover:{scale:1.15,y:-3},whileTap:{scale:.9},transition:{duration:.2},className:"w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-md","aria-label":"GitHub",children:e.jsx(X,{className:"w-4 h-4 sm:w-5 sm:h-5"})}),e.jsx(h.a,{href:r.linkedin,target:"_blank",rel:"noopener noreferrer",whileHover:{scale:1.15,y:-3},whileTap:{scale:.9},transition:{duration:.2},className:"w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-md","aria-label":"LinkedIn",children:e.jsx(q,{className:"w-4 h-4 sm:w-5 sm:h-5"})}),e.jsx(h.a,{href:`mailto:${r.email}`,whileHover:{scale:1.15,y:-3},whileTap:{scale:.9},transition:{duration:.2},className:"w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-md","aria-label":"Email",children:e.jsx(Y,{className:"w-4 h-4 sm:w-5 sm:h-5"})})]}),e.jsxs(h.a,{href:r.portfolio,target:"_blank",rel:"noopener noreferrer",initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:.4,duration:.3},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},className:"w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95",children:[e.jsx(P,{className:"w-4 h-4 sm:w-5 sm:h-5"}),e.jsx("span",{children:"View Portfolio"}),e.jsx(ie,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"})]})]})]})})})})},b="'Raleway', system-ui, sans-serif",Re={Instagram:me,Facebook:de,Twitter:null,Youtube:ce,WhatsApp:le,LinkedIn:q,GitHub:X,Globe:P,Mail:Y,Phone:oe,MapPin:ne,Share2:se},Le=[{name:"Home",href:"/"},{name:"About",href:"/about"},{name:"Services",href:"/services"},{name:"Gallery",href:"/gallery"},{name:"Contact",href:"/contact"}],_e=[{name:"Bridal Wear",href:"/gallery"},{name:"Aari Embroidery",href:"/services"},{name:"Custom Designs",href:"/services"},{name:"Fabric Painting",href:"/services"},{name:"Ready-to-Wear",href:"/gallery"}],Pe=()=>{const t="7798370430",[s,r]=c.useState([]),[o,n]=c.useState(!1);c.useEffect(()=>{f(void 0,null,function*(){try{const i=yield D.getSettings();if(i.data){const a=i.data.socialLinks||[];r(a.sort((d,m)=>(d.order||0)-(m.order||0)))}}catch(i){r([{name:"Instagram",icon:"Instagram",url:"https://instagram.com/vnfashion",order:0},{name:"WhatsApp",icon:"WhatsApp",url:`https://api.whatsapp.com/send?phone=${t}`,order:1}])}})},[]);const l=c.useMemo(()=>s.map(i=>({name:i.name,icon:Re[i.icon]||P,href:i.url})),[s]);return e.jsxs("footer",{className:"ft-root","aria-label":"Site footer",children:[e.jsxs("div",{className:"ft-inner",children:[e.jsxs("div",{className:"ft-top",children:[e.jsx(x,{to:"/",className:"ft-logo",style:{fontFamily:"'Cormorant Garamond', serif"},"aria-label":"VN Fashion Home",children:"VN FASHION"}),e.jsx("p",{className:"ft-tagline",style:{fontFamily:b},children:"Atelier of intentional design"})]}),e.jsxs("div",{className:"ft-columns",children:[e.jsxs("div",{className:"ft-col ft-col-brand",children:[e.jsx("p",{className:"ft-blurb",style:{fontFamily:b},children:"Transforming fashion through intentional design and artisan craft. Each piece a testament to tradition and modernity."}),e.jsx("div",{className:"ft-socials",children:l.map(i=>{const a=i.icon;return a?e.jsx("a",{href:i.href,target:"_blank",rel:"noopener noreferrer","aria-label":i.name,className:"ft-social-icon",children:e.jsx(a,{size:15})},i.name):null})})]}),e.jsxs("div",{className:"ft-col",children:[e.jsx("h4",{className:"ft-col-heading",style:{fontFamily:b},children:"Navigation"}),e.jsx("ul",{className:"ft-links",children:Le.map(i=>e.jsx("li",{children:e.jsx(x,{to:i.href,className:"ft-link",style:{fontFamily:b},children:i.name})},i.name))})]}),e.jsxs("div",{className:"ft-col",children:[e.jsx("h4",{className:"ft-col-heading",style:{fontFamily:b},children:"Collections"}),e.jsx("ul",{className:"ft-links",children:_e.map(i=>e.jsx("li",{children:e.jsx(x,{to:i.href,className:"ft-link",style:{fontFamily:b},children:i.name})},i.name))})]}),e.jsxs("div",{className:"ft-col",children:[e.jsx("h4",{className:"ft-col-heading",style:{fontFamily:b},children:"Contact"}),e.jsxs("ul",{className:"ft-links",children:[e.jsx("li",{children:e.jsxs("a",{href:`tel:+91${t}`,className:"ft-link",style:{fontFamily:b},children:["+91 ",t]})}),e.jsx("li",{children:e.jsx("a",{href:"mailto:info@vnfashion.com",className:"ft-link",style:{fontFamily:b},children:"info@vnfashion.com"})}),e.jsx("li",{children:e.jsxs("p",{className:"ft-address",style:{fontFamily:b},children:["Gavade Ambere, Ratnagiri,",e.jsx("br",{}),"Maharashtra — 415 626"]})})]})]})]}),e.jsxs("div",{className:"ft-bottom",children:[e.jsxs("p",{className:"ft-copy",style:{fontFamily:b},children:["© ",new Date().getFullYear()," VN Fashion. All rights reserved."]}),e.jsxs("p",{className:"ft-credit",style:{fontFamily:b},children:["Designed & Developed by"," ",e.jsx("button",{onClick:()=>n(!0),className:"ft-credit-link",children:"Sohan Sarang"})]})]})]}),e.jsx(Ie,{isOpen:o,onClose:()=>n(!1)}),e.jsx("style",{children:`
        .ft-root {
          width: 100%;
          background: #f8f7f5;
          border-top: 1px solid #e5e7eb;
        }
        .ft-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .ft-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .ft-inner { padding: 0 1.25rem; } }

        /* Top */
        .ft-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        @media (max-width: 640px) {
          .ft-top { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        }
        .ft-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0a0a0a;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .ft-logo:hover { opacity: 0.7; }
        .ft-tagline {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }

        /* Columns */
        .ft-columns {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 3rem;
          padding: 2.5rem 0;
        }
        @media (max-width: 768px) {
          .ft-columns {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 480px) {
          .ft-columns { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        .ft-col {}
        .ft-col-heading {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
          margin: 0 0 1rem;
        }
        .ft-blurb {
          font-size: 0.78rem;
          font-weight: 400;
          line-height: 1.7;
          color: #6b7280;
          margin: 0 0 1.25rem;
          max-width: 280px;
        }
        .ft-socials {
          display: flex;
          gap: 0.5rem;
        }
        .ft-social-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e5e7eb;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
        }
        .ft-social-icon:hover {
          color: #ffffff;
          background: #0a0a0a;
          border-color: #0a0a0a;
        }

        .ft-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .ft-link {
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.25s;
        }
        .ft-link:hover { color: #0a0a0a; }
        .ft-address {
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Bottom bar */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          border-top: 1px solid #e5e7eb;
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .ft-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .ft-copy {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }
        .ft-credit {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }
        .ft-credit-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: inherit;
          font-weight: 700;
          letter-spacing: inherit;
          text-transform: uppercase;
          color: #0a0a0a;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-family: inherit;
          padding: 0;
          transition: color 0.25s;
        }
        .ft-credit-link:hover { color: #b8860b; }
      `})]})},De=_.memo(Pe),Oe="VN FASHION",y={IDLE:"idle",ENTER:"enter",HOLD:"hold",EXIT:"exit"};let A=null;const Ve=({children:t})=>{const s=L(),[r,o]=c.useState(y.IDLE),[n,l]=c.useState(t),i=c.useRef(s.pathname),a=c.useRef(!1);c.useEffect(()=>{if(s.pathname!==i.current){if(a.current){A={children:t,path:s.pathname};return}d(t,s.pathname),i.current=s.pathname}},[s.pathname]);function d(p,u){a.current=!0,o(y.ENTER);const z=setTimeout(()=>{o(y.HOLD),l(p),window.scrollTo({top:0,left:0,behavior:"instant"});const C=setTimeout(()=>{o(y.EXIT);const J=setTimeout(()=>{if(o(y.IDLE),a.current=!1,A){const{children:Q,path:Z}=A;A=null,i.current=Z,d(Q)}},600);return()=>clearTimeout(J)},350);return()=>clearTimeout(C)},500);return()=>clearTimeout(z)}const m=r!==y.IDLE;return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{opacity:1},children:n}),m&&e.jsx("div",{"aria-hidden":"true",style:{position:"fixed",inset:0,zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",background:"#0a0a0a",transform:r===y.ENTER||r===y.HOLD?"translateX(0)":"translateX(-100%)",animation:r===y.ENTER?"curtainIn 0.5s cubic-bezier(0.76, 0, 0.24, 1) forwards":r===y.EXIT?"curtainOut 0.6s cubic-bezier(0.76, 0, 0.24, 1) forwards":"none",pointerEvents:"none"},children:e.jsxs("div",{style:{opacity:r===y.HOLD?1:0,transform:r===y.HOLD?"translateY(0)":"translateY(12px)",transition:"opacity 0.25s ease, transform 0.25s ease",textAlign:"center",userSelect:"none"},children:[e.jsx("div",{style:{width:8,height:8,borderRadius:"50%",background:"#ffffff",margin:"0 auto 20px"}}),e.jsx("p",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(1.6rem, 5vw, 2.8rem)",fontWeight:300,letterSpacing:"0.4em",color:"#ffffff",textTransform:"uppercase",lineHeight:1},children:Oe}),e.jsx("div",{style:{width:60,height:1,background:"rgba(255,255,255,0.3)",margin:"18px auto 0"}})]})}),e.jsx("style",{children:`
        @keyframes curtainIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0);    }
        }
        @keyframes curtainOut {
          from { transform: translateX(0);     }
          to   { transform: translateX(-100%); }
        }
      `})]})},He=c.lazy(()=>E(()=>import("./About-SIQvpPrV.js"),__vite__mapDeps([0,1,2,3,4]))),Be=c.lazy(()=>E(()=>import("./Gallery-DvP55t4u.js"),__vite__mapDeps([5,1,2,3,4]))),Me=c.lazy(()=>E(()=>import("./Services-BpDhzJI0.js"),__vite__mapDeps([6,1,2,3,4]))),Ge=c.lazy(()=>E(()=>import("./Booking-CSU2eqWh.js"),__vite__mapDeps([7,1,2,8,3,4]))),$e=c.lazy(()=>E(()=>import("./Contact-eeBfOJN5.js"),__vite__mapDeps([9,1,2,8,3,4]))),We=()=>e.jsxs("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f5f4f2"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:36,height:36,border:"1.5px solid #0a0a0a",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.75s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{fontSize:"0.55rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"Unbounded, sans-serif"},children:"Loading"})]}),e.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]});function Ue(){return e.jsxs(e.Fragment,{children:[e.jsx(ye,{}),e.jsx(je,{}),e.jsx(Se,{}),e.jsx(Te,{}),e.jsx(ze,{}),e.jsx(Fe,{}),e.jsx(De,{})]})}function Xe(){const t=L();return e.jsx(Ve,{children:e.jsx(c.Suspense,{fallback:e.jsx(We,{}),children:e.jsxs(pe,{location:t,children:[e.jsx(v,{path:"/",element:e.jsx(Ue,{})}),e.jsx(v,{path:"/about",element:e.jsx(He,{})}),e.jsx(v,{path:"/services",element:e.jsx(Me,{})}),e.jsx(v,{path:"/gallery",element:e.jsx(Be,{})}),e.jsx(v,{path:"/booking",element:e.jsx(Ge,{})}),e.jsx(v,{path:"/contact",element:e.jsx($e,{})})]})})},t.pathname)}function W(){return e.jsx(fe,{children:e.jsx(Xe,{})})}const U=he.createRoot(document.getElementById("root"));"requestIdleCallback"in window?requestIdleCallback(()=>{U.render(e.jsx(c.StrictMode,{children:e.jsx(W,{})}))}):setTimeout(()=>{U.render(e.jsx(c.StrictMode,{children:e.jsx(W,{})}))},1);export{De as F,ye as N,D as c,ve as f,K as g};
