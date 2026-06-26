const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/About-FytoN1v2.js","assets/react-vendor-AJ74e7NP.js","assets/vendor-Cj7CuQkd.js","assets/framer-motion-B-QtNzEm.js","assets/axios-DnTtldoj.js","assets/Gallery-fsqmyYhl.js","assets/Services--vNf2BNv.js","assets/Booking-BXMiGeEP.js","assets/ErrorModal-D7EBTfR3.js","assets/Contact-DMLta98d.js","assets/Classes-CQsN8BGf.js"])))=>i.map(i=>d[i]);
var ce=Object.defineProperty;var G=Object.getOwnPropertySymbols;var de=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable;var W=(t,a,s)=>a in t?ce(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s,U=(t,a)=>{for(var s in a||(a={}))de.call(a,s)&&W(t,s,a[s]);if(G)for(var s of G(a))me.call(a,s)&&W(t,s,a[s]);return t};var f=(t,a,s)=>new Promise((c,r)=>{var i=d=>{try{n(s.next(d))}catch(m){r(m)}},l=d=>{try{n(s.throw(d))}catch(m){r(m)}},n=d=>d.done?c(d.value):Promise.resolve(d.value).then(i,l);n((s=s.apply(t,a)).next())});import{r as o,j as e,u as V,L as g,R as P,S as fe,M as pe,P as he,a as ge,G as ie,b as ue,c as be,d as xe,Y as ye,F as we,I as ve,B as je,e as Ne,f as N,g as ke}from"./react-vendor-AJ74e7NP.js";import{a as Ee}from"./axios-DnTtldoj.js";import"./vendor-Cj7CuQkd.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();const Se="modulepreload",Te=function(t){return"/"+t},Y={},k=function(a,s,c){let r=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),n=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));r=Promise.allSettled(s.map(d=>{if(d=Te(d),d in Y)return;Y[d]=!0;const m=d.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${v}`))return;const h=document.createElement("link");if(h.rel=m?"stylesheet":Se,m||(h.as="script"),h.crossOrigin="",h.href=d,n&&h.setAttribute("nonce",n),document.head.appendChild(h),m)return new Promise((w,j)=>{h.addEventListener("load",w),h.addEventListener("error",()=>j(new Error(`Unable to preload CSS for ${d}`)))})}))}function i(l){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=l,window.dispatchEvent(n),!n.defaultPrevented)throw l}return r.then(l=>{for(const n of l||[])n.status==="rejected"&&i(n.reason);return a().catch(i)})},Ae="'Playfair Display', 'Times New Roman', serif",q="'Raleway', system-ui, sans-serif",ze=["V","N"," ","F","A","S","H","I","O","N"],Fe=({onComplete:t})=>{const[a,s]=o.useState(!1),[c,r]=o.useState(!1),[i,l]=o.useState(!1),[n,d]=o.useState(!1),m=o.useRef(null),v=o.useRef(null),h=o.useRef(null),w=o.useRef(null);return o.useEffect(()=>{document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",document.body.style.height="100%",document.documentElement.style.height="100%";const j=setTimeout(()=>s(!0),100),E=setTimeout(()=>r(!0),500),I=setTimeout(()=>l(!0),750),C=750,B=1500;let R=null;const $=z=>{R||(R=z);const H=z-R,L=Math.min(H/B*100,100);if(m.current&&(m.current.textContent=`${Math.floor(L)}%`),v.current&&(v.current.style.transform=`scaleX(${L/100})`),h.current&&(h.current.style.left=`${L}%`),H<B)w.current=requestAnimationFrame($);else{const oe=setTimeout(()=>{d(!0);const le=setTimeout(()=>{document.body.style.overflow="",document.documentElement.style.overflow="",document.body.style.height="",document.documentElement.style.height="";const M=document.getElementById("initial-bg");M&&M.remove(),t()},850);return()=>clearTimeout(le)},350);return()=>clearTimeout(oe)}},ne=setTimeout(()=>{w.current=requestAnimationFrame($)},C);return()=>{clearTimeout(j),clearTimeout(E),clearTimeout(I),clearTimeout(ne),w.current&&cancelAnimationFrame(w.current),document.body.style.overflow="",document.documentElement.style.overflow="",document.body.style.height="",document.documentElement.style.height="";const z=document.getElementById("initial-bg");z&&z.remove()}},[t]),e.jsxs("div",{className:`il-root${n?" il-exiting":""}`,"aria-label":"Loading VN Fashion",role:"status",children:[e.jsxs("div",{className:"il-panels","aria-hidden":"true",children:[e.jsx("div",{className:"il-panel il-panel-l"}),e.jsx("div",{className:"il-panel il-panel-r"})]}),e.jsx("div",{className:"il-grain","aria-hidden":"true"}),e.jsxs("div",{className:"il-center",children:[e.jsx("div",{className:"il-brand-row","aria-label":"VN FASHION",children:ze.map((j,E)=>e.jsx("span",{className:`il-letter${a?" il-letter-in":""}`,style:{fontFamily:Ae,transitionDelay:a?`${E*50}ms`:"0ms"},"aria-hidden":"true",children:j},E))}),e.jsx("p",{className:`il-sub${c?" il-sub-in":""}`,style:{fontFamily:q},children:"Couture Atelier"}),e.jsx("div",{className:`il-dot${c?" il-dot-in":""}`,"aria-hidden":"true"}),e.jsxs("div",{className:`il-bar-wrap${i?" il-bar-wrap-in":""}`,children:[e.jsxs("div",{className:"il-bar-track",children:[e.jsx("div",{ref:v,className:"il-bar-fill",style:{transform:"scaleX(0)"}}),e.jsx("div",{ref:h,className:"il-bar-glow",style:{left:"0%"}})]}),e.jsxs("div",{className:"il-bar-footer",style:{fontFamily:q},children:[e.jsx("span",{className:"il-loading-text",children:"Loading"}),e.jsx("span",{ref:m,className:"il-percent",children:"0%"})]})]})]}),e.jsx("div",{className:`il-curtain${n?" il-curtain-in":""}`,"aria-hidden":"true"}),e.jsx("style",{children:`
        .il-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          z-index: 999999;
          background: #0c0c0b;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          will-change: transform, opacity;
        }

        /* Smooth hardware accelerated slide exit */
        .il-exiting {
          animation: il-slide-up 0.85s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes il-slide-up {
          from { transform: translateY(0); opacity: 1; }
          to   { transform: translateY(-100%); opacity: 1; }
        }

        /* Background layout layers */
        .il-panels {
          position: absolute;
          inset: -2px;
          pointer-events: none;
        }
        .il-panel {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
        }
        .il-panel-l {
          left: 0;
          background: linear-gradient(135deg, #111110 0%, #0c0c0b 100%);
          border-right: 1px solid rgba(184, 134, 11, 0.06);
        }
        .il-panel-r {
          right: 0;
          background: linear-gradient(225deg, #131311 0%, #0c0c0b 100%);
        }

        /* Subtle luxury film grain overlay */
        .il-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        .il-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1.5rem;
          width: 100%;
          max-width: 520px;
          text-align: center;
        }

        /* Staggered brand typography reveal */
        .il-brand-row {
          display: flex;
          align-items: baseline;
          gap: 0;
          margin-bottom: 0.9rem;
          overflow: hidden;
        }

        .il-letter {
          display: inline-block;
          font-size: clamp(2.4rem, 9vw, 4.2rem);
          font-weight: 300;
          letter-spacing: 0.22em;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1;
          opacity: 0;
          transform: translateY(35px) rotateX(25deg);
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .il-letter-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }

        .il-sub {
          font-size: clamp(0.52rem, 2vw, 0.62rem);
          font-weight: 700;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #c9a84c;
          margin: 0 0 1.4rem;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          will-change: transform, opacity;
        }
        .il-sub-in {
          opacity: 1;
          transform: translateY(0);
        }

        .il-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #b8860b;
          margin-bottom: 1.8rem;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
        }
        .il-dot-in {
          opacity: 1;
          transform: scale(1);
        }

        /* Clean progress meter layout */
        .il-bar-wrap {
          width: min(280px, 80vw);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          will-change: transform, opacity;
        }
        .il-bar-wrap-in {
          opacity: 1;
          transform: translateY(0);
        }

        .il-bar-track {
          position: relative;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin-bottom: 0.9rem;
          overflow: visible;
        }

        .il-bar-fill {
          position: absolute;
          inset: 0;
          transform-origin: left center;
          background: linear-gradient(90deg, #8a6300, #b8860b 40%, #e4c97e 80%, #f0d98e 100%);
          will-change: transform;
        }

        .il-bar-glow {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e4c97e;
          box-shadow: 0 0 10px 3px rgba(228, 201, 126, 0.6);
          pointer-events: none;
          will-change: left;
        }

        .il-bar-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .il-loading-text {
          font-size: 0.52rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
        }

        .il-percent {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }

        /* Veil transition element */
        .il-curtain {
          position: absolute;
          inset: -2px;
          z-index: 10;
          background: linear-gradient(180deg, #b8860b 0%, #0c0c0b 100%);
          transform: translateY(100%);
          pointer-events: none;
          will-change: transform;
        }
        .il-curtain-in {
          animation: il-curtain-rise 0.65s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes il-curtain-rise {
          from { transform: translateY(100%); }
          to   { transform: translateY(-100%); }
        }

        @media (max-width: 480px) {
          .il-letter {
            letter-spacing: 0.14em;
          }
          .il-bar-wrap {
            width: 85vw;
          }
        }
      `})]})},X=[{name:"Home",href:"/"},{name:"About",href:"/about"},{name:"Services",href:"/services"},{name:"Gallery",href:"/gallery"},{name:"Classes",href:"/classes"},{name:"Contact",href:"/contact"}],Ie=()=>{const[t,a]=o.useState(!1),[s,c]=o.useState(!1),r=V();o.useEffect(()=>{const n=()=>c(window.scrollY>24);return window.addEventListener("scroll",n,{passive:!0}),()=>window.removeEventListener("scroll",n)},[]),o.useEffect(()=>(document.body.style.overflow=t?"hidden":"",()=>{document.body.style.overflow=""}),[t]),o.useEffect(()=>{a(!1)},[r.pathname]);const i=o.useCallback(()=>a(!1),[]),l=o.useCallback(()=>a(n=>!n),[]);return e.jsxs(e.Fragment,{children:[e.jsx("nav",{className:`vn-navbar${s?" scrolled":""}`,role:"navigation","aria-label":"Main navigation",children:e.jsxs("div",{className:"vn-nav-inner",children:[e.jsx(g,{to:"/",className:"vn-logo","aria-label":"VN Fashion — Home",children:"VN FASHION"}),e.jsx("ul",{className:"vn-links",role:"list",children:X.map(n=>e.jsx("li",{children:e.jsx(g,{to:n.href,className:`vn-link${r.pathname===n.href?" active":""}`,"aria-current":r.pathname===n.href?"page":void 0,children:n.name})},n.name))}),e.jsx("div",{className:"vn-cta",children:e.jsx(g,{to:"/booking",className:"vn-book-btn","aria-label":"Book an appointment",children:e.jsx("span",{className:"btn-text",children:"Book Appointment"})})}),e.jsxs("button",{className:`vn-hamburger${t?" open":""}`,onClick:l,"aria-label":t?"Close menu":"Open menu","aria-expanded":t,"aria-controls":"vn-drawer",children:[e.jsx("span",{className:"vn-bar","aria-hidden":"true"}),e.jsx("span",{className:"vn-bar","aria-hidden":"true"}),e.jsx("span",{className:"vn-bar","aria-hidden":"true"})]})]})}),e.jsx("div",{className:`vn-overlay${t?" visible":""}`,onClick:i,"aria-hidden":"true"}),e.jsxs("aside",{id:"vn-drawer",className:`vn-drawer${t?" open":""}`,"aria-label":"Mobile navigation","aria-hidden":!t,children:[e.jsxs("div",{className:"vn-drawer-head",children:[e.jsx(g,{to:"/",className:"vn-logo",onClick:i,"aria-label":"VN Fashion — Home",children:"VN FASHION"}),e.jsx("button",{className:"vn-drawer-close",onClick:i,"aria-label":"Close menu",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[e.jsx("line",{x1:"1",y1:"1",x2:"13",y2:"13",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("line",{x1:"13",y1:"1",x2:"1",y2:"13",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"})]})})]}),e.jsx("nav",{className:"vn-drawer-nav","aria-label":"Drawer navigation",children:X.map(n=>e.jsxs(g,{to:n.href,className:`vn-drawer-link${r.pathname===n.href?" active":""}`,onClick:i,"aria-current":r.pathname===n.href?"page":void 0,children:[n.name,e.jsx("span",{className:"vn-drawer-arrow","aria-hidden":"true",children:"→"})]},n.name))}),e.jsxs("div",{className:"vn-drawer-footer",children:[e.jsx(g,{to:"/booking",className:"vn-drawer-book-btn",onClick:i,children:e.jsxs("span",{className:"btn-text",style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),e.jsx("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),e.jsx("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),e.jsx("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),"Book Appointment"]})}),e.jsx("p",{className:"vn-drawer-label",children:"EST. 2024 — ATELIER VN"})]})]})]})},K="'Playfair Display', 'Times New Roman', serif",J="'Raleway', system-ui, sans-serif",Q=[{value:"5+",label:"Years"},{value:"200+",label:"Pieces"},{value:"100+",label:"Clients"}],Ce=["VN FASHION","COUTURE","ARTISAN CRAFT","HANDMADE","AVANT-GARDE","ATELIER VN"],Re=()=>e.jsxs("section",{className:"hero-root","aria-label":"VN Fashion — Hero Section",children:[e.jsx("div",{className:"hero-faded-bg","aria-hidden":"true"}),e.jsxs("div",{className:"hero-grid",children:[e.jsxs("div",{className:"hero-left",children:[e.jsxs("h1",{className:"hero-heading",style:{fontFamily:K},children:[e.jsx("span",{className:"hero-heading-line",children:e.jsx("em",{children:"The"})}),e.jsx("span",{className:"hero-heading-line",children:"Architecture"}),e.jsx("span",{className:"hero-heading-line hero-heading-accent",children:"of Couture"})]}),e.jsxs("div",{className:"hero-subtitle-row",children:[e.jsx("div",{className:"hero-rule"}),e.jsxs("p",{className:"hero-subtitle",children:["A dialogue between structural",e.jsx("br",{}),"rigidity and fluid motion."]})]}),e.jsxs("div",{className:"hero-ctas",children:[e.jsxs(g,{to:"/gallery",className:"hero-btn hero-btn-primary",children:[e.jsx("span",{className:"hero-btn-fill"}),e.jsx("span",{className:"hero-btn-text",children:"Explore Collection"})]}),e.jsxs(g,{to:"/booking",className:"hero-btn hero-btn-ghost",children:[e.jsx("span",{className:"hero-btn-fill"}),e.jsx("span",{className:"hero-btn-text",children:"Book Appointment"})]})]}),e.jsx("div",{className:"hero-stats",children:Q.map((t,a)=>e.jsxs(P.Fragment,{children:[e.jsxs("div",{className:"hero-stat",children:[e.jsx("span",{className:"hero-stat-value",style:{fontFamily:K},children:t.value}),e.jsx("span",{className:"hero-stat-label",children:t.label})]}),a<Q.length-1&&e.jsx("div",{className:"hero-stat-divider"})]},t.label))})]}),e.jsxs("div",{className:"hero-right",children:[e.jsxs("div",{className:"hero-img-primary",children:[e.jsx("img",{src:"/VN-1.jpg",alt:"VN Fashion editorial — main look",className:"hero-img",loading:"eager",onError:t=>{t.target.src="/hero_fashion_model.png"}}),e.jsx("div",{className:"hero-img-overlay","aria-hidden":"true"}),e.jsx("div",{className:"hero-img-gradient"})]}),e.jsxs("div",{className:"hero-float-card",children:[e.jsx("img",{src:"/VN-2.jpg",alt:"VN Fashion — secondary editorial",className:"hero-float-img",loading:"eager",onError:t=>{t.target.src="/VN.jpg"}}),e.jsx("div",{className:"hero-float-overlay","aria-hidden":"true"}),e.jsxs("div",{className:"hero-float-label",style:{fontFamily:J},children:[e.jsx("span",{children:"S/S '24"}),e.jsx("span",{className:"hero-float-arrow",children:"→"})]})]}),e.jsx("div",{className:"hero-side-label",style:{fontFamily:J},children:"01 / COLLECTION"})]})]}),e.jsx("div",{className:"hero-ticker","aria-hidden":"true",children:e.jsx("div",{className:"hero-ticker-track",children:[...Array(3)].map((t,a)=>Ce.map((s,c)=>e.jsxs("span",{className:"hero-ticker-item",children:[s,e.jsx("span",{className:"hero-ticker-sep",children:"•"})]},`${a}-${c}`)))})}),e.jsx("style",{children:`

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

        /* Faded background watermark (matches About/Services/Contact) */
        .hero-faded-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: url('/VN-1.jpg');
          background-size: cover;
          background-position: top center;
          opacity: 0.04;
          filter: grayscale(1);
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

      `})]}),O={BASE_URL:"/api",SERVER_BASE_URL:"",TIMEOUT:3e4},u={ABOUT:"/content/public/about",ACHIEVEMENTS:"/content/public/achievements",GALLERY:"/content/public/gallery",SERVICES:"/content/public/services",CATEGORIES:"/content/public/categories",CERTIFICATES:"/content/public/certificates",TIMELINE:"/content/public/timeline",TESTIMONIALS:"/content/public/testimonials",BOOKINGS:"/content/public/bookings",CONTACTS:"/content/public/contacts",SETTINGS:"/content/public/settings",CLASS_BANNERS:"/content/public/class-banners"},Z={ABOUT:{aboutText:"We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.",designerName:"Vidisha",designerTitle:"Master Artisan & Designer",designerBio:"With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",designerImage:"/vidisha.jpg"},ACHIEVEMENTS:["10+ Years of Experience","500+ Custom Designs Created","Specialized in Bridal Wear"]},p=Ee.create({baseURL:O.BASE_URL,timeout:O.TIMEOUT,headers:{"Content-Type":"application/json"}});p.interceptors.request.use(t=>(t.data instanceof FormData&&delete t.headers["Content-Type"],t),t=>Promise.reject(t));p.interceptors.response.use(t=>t,t=>(t.response?console.error("API Error:",t.response.status,t.response.data):t.request?console.error("Network Error:",t.request):console.error("Error:",t.message),Promise.reject(t)));const se=t=>t?t.startsWith("http://")||t.startsWith("https://")?t:t.startsWith("/api/uploads/")?`${O.SERVER_BASE_URL}${t}`:t:"",Le=t=>{if(!t)return"";const a=String(t).trim();return a.startsWith("₹")?a:`₹ ${a}`},y=(t,a)=>(console.error("API Error:",t),a),D={getAbout:()=>f(void 0,null,function*(){try{return(yield p.get(u.ABOUT)).data}catch(t){return y(t,Z.ABOUT)}}),getAchievements:()=>f(void 0,null,function*(){try{return(yield p.get(u.ACHIEVEMENTS)).data||[]}catch(t){return y(t,Z.ACHIEVEMENTS)}}),getGallery:()=>f(void 0,null,function*(){try{return(yield p.get(u.GALLERY)).data||[]}catch(t){return y(t,[])}}),getServices:()=>f(void 0,null,function*(){try{return(yield p.get(u.SERVICES)).data||[]}catch(t){return y(t,[])}}),getCategories:()=>f(void 0,null,function*(){try{return(yield p.get(u.CATEGORIES)).data||[]}catch(t){return y(t,[])}}),getCertificates:()=>f(void 0,null,function*(){try{return(yield p.get(u.CERTIFICATES)).data||[]}catch(t){return y(t,[])}}),getTimeline:()=>f(void 0,null,function*(){try{return(yield p.get(u.TIMELINE)).data||[]}catch(t){return y(t,[])}}),getTestimonials:()=>f(void 0,null,function*(){try{return(yield p.get(u.TESTIMONIALS)).data||[]}catch(t){return y(t,[])}}),createBooking:t=>f(void 0,null,function*(){return(yield p.post(u.BOOKINGS,t)).data}),createContact:t=>f(void 0,null,function*(){return(yield p.post(u.CONTACTS,t)).data}),getSettings:()=>f(void 0,null,function*(){return yield p.get(u.SETTINGS)}),getClassBanners:()=>f(void 0,null,function*(){try{return(yield p.get(u.CLASS_BANNERS)).data||[]}catch(t){return y(t,[])}})},_e=Object.freeze(Object.defineProperty({__proto__:null,axiosInstance:p,contentApi:D,formatPrice:Le,getImageUrl:se},Symbol.toStringTag,{value:"Module"})),_="'Playfair Display', 'Times New Roman', serif",ee="'Raleway', system-ui, sans-serif",Oe=["Artisan Craft","Avant-Garde","Sustainable"],Ve=()=>{const[t,a]=o.useState("We construct artifacts of intentional identity — where textiles become structural components that redefine the modern silhouette.");return o.useEffect(()=>{f(void 0,null,function*(){try{const c=yield(yield k(()=>f(void 0,null,function*(){const{contentApi:r}=yield Promise.resolve().then(()=>_e);return{contentApi:r}}),void 0)).contentApi.getAbout();c!=null&&c.aboutText&&a(c.aboutText)}catch(c){}})},[]),e.jsxs("section",{id:"about",className:"ab-root","aria-label":"About VN Fashion",children:[e.jsx("div",{className:"ab-bg","aria-hidden":"true",children:e.jsx("img",{src:"/VN-5.jpg",alt:"",onError:s=>{s.target.src="/HeroBg.jpg"}})}),e.jsxs("div",{className:"ab-inner",children:[e.jsxs("div",{className:"ab-top",children:[e.jsx("div",{className:"ab-rule"}),e.jsx("span",{className:"ab-label",children:"VN Studio — Est. 2024"})]}),e.jsxs("div",{className:"ab-grid",children:[e.jsx("div",{className:"ab-left",children:e.jsxs("h2",{className:"ab-heading",style:{fontFamily:_},children:["Fashion as",e.jsx("br",{}),e.jsx("em",{children:"Architecture."})]})}),e.jsxs("div",{className:"ab-right",children:[e.jsx("p",{className:"ab-quote",style:{fontFamily:_},children:t}),e.jsx("div",{className:"ab-tags",children:Oe.map((s,c)=>e.jsx("span",{className:"ab-tag",style:{fontFamily:ee},children:s},c))}),e.jsxs(g,{to:"/about",className:"ab-cta",style:{fontFamily:ee},children:[e.jsx("span",{className:"ab-cta-fill"}),e.jsx("span",{className:"ab-cta-text",children:"Our Full Story"}),e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",className:"ab-cta-arrow",children:[e.jsx("line",{x1:"0",y1:"7",x2:"12",y2:"7"}),e.jsx("polyline",{points:"7,2 12,7 7,12"})]})]})]})]}),e.jsxs("div",{className:"ab-strip",children:[["/VN-1.jpg","/VN-3.jpg","/VN-6.jpg"].map((s,c)=>e.jsx("div",{className:"ab-strip-img",children:e.jsx("img",{src:s,alt:`VN Fashion look ${c+1}`,loading:"lazy",onError:r=>{r.target.src="/VN.jpg"}})},c)),e.jsxs("div",{className:"ab-strip-text",style:{fontFamily:_},children:[e.jsx("span",{children:"S/S"}),e.jsx("em",{children:"2024"})]})]})]}),e.jsx("style",{children:`

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

      `})]})},te="'Playfair Display', 'Times New Roman', serif",S="'Raleway', system-ui, sans-serif",T=[{id:"f1",title:"Noir Collection",image:"/VN-1.jpg",category:"Bridal",description:"Exquisite handcrafted bridal wear",featured:!0},{id:"f2",title:"Iridescent Weave",image:"/VN-2.jpg",category:"Textile Art",description:"Structural fabric manipulation",featured:!1},{id:"f3",title:"Chromatic Portrait",image:"/VN-3.jpg",category:"Avant-Garde",description:"Futuristic couture editorial",featured:!1},{id:"f4",title:"Artisan Detail",image:"/aariWork.jpg",category:"Aari Work",description:"Hand-embroidered signature pieces",featured:!1}],Pe=()=>{const[t,a]=o.useState([]),[s,c]=o.useState(!0);o.useEffect(()=>{f(void 0,null,function*(){try{c(!0);const l=(yield D.getGallery()).map((d,m)=>({id:d._id||m+1,title:d.title||"Untitled",image:se(d.image)||T[m%T.length].image,category:d.category||"Collection",description:d.description||"Exquisite handcrafted design",featured:d.featured||!1})),n=[...l.filter(d=>d.featured),...l.filter(d=>!d.featured)];a(n)}catch(i){a(T)}finally{c(!1)}})},[]);const r=o.useMemo(()=>{const i=t.slice(0,4);for(;i.length<4;)i.push(T[i.length]);return i},[t]);return e.jsxs("section",{className:"fw-root","aria-label":"Featured Works",children:[e.jsxs("div",{className:"fw-inner",children:[e.jsxs("div",{className:"fw-header",children:[e.jsxs("div",{className:"fw-header-left",children:[e.jsx("span",{className:"fw-eyebrow",style:{fontFamily:S},children:"Selected Works"}),e.jsxs("h2",{className:"fw-heading",style:{fontFamily:te},children:["Featured ",e.jsx("em",{children:"Collection"})]})]}),e.jsxs(g,{to:"/gallery",className:"fw-viewall",style:{fontFamily:S},children:[e.jsx("span",{className:"fw-viewall-fill"}),e.jsx("span",{className:"fw-viewall-text",children:"View All"}),e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 14 14",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",className:"fw-viewall-arrow",children:[e.jsx("line",{x1:"0",y1:"7",x2:"12",y2:"7"}),e.jsx("polyline",{points:"7,2 12,7 7,12"})]})]})]}),s?e.jsx("div",{className:"fw-skeleton",children:[...Array(2)].map((i,l)=>e.jsxs("div",{className:"fw-skel-row",children:[e.jsx("div",{className:"fw-skel-img"}),e.jsx("div",{className:"fw-skel-text"})]},l))}):e.jsx("div",{className:"fw-checkerboard",children:r.map((i,l)=>{const n=l%2===0;return e.jsxs("div",{className:`fw-row ${n?"fw-row-normal":"fw-row-reverse"}`,children:[e.jsx("div",{className:"fw-img-col",children:e.jsxs("div",{className:"fw-img-wrapper",children:[e.jsx("img",{src:i.image,alt:i.title,className:"fw-img",loading:"lazy",onError:d=>{d.target.src=T[l%T.length].image}}),e.jsx("div",{className:"fw-overlay"}),e.jsx("div",{className:"fw-color-shimmer"}),e.jsx("div",{className:"fw-glint"}),i.featured&&e.jsx("span",{className:"fw-badge",style:{fontFamily:S},children:"Featured"})]})}),e.jsx("div",{className:"fw-content-col",children:e.jsxs("div",{className:"fw-content-box",children:[e.jsxs("div",{className:"fw-meta-header",children:[e.jsxs("span",{className:"fw-num",style:{fontFamily:S},children:["0",l+1]}),e.jsx("span",{className:"fw-separator",children:"/"}),e.jsx("span",{className:"fw-cat",style:{fontFamily:S},children:i.category})]}),e.jsx("h3",{className:"fw-title",style:{fontFamily:te},children:i.title}),e.jsx("p",{className:"fw-desc",style:{fontFamily:S},children:i.description})]})})]},i.id||l)})})]}),e.jsx("style",{children:`
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
          margin-bottom: 3.5rem;
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

        /* View All CTA */
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

        /* Checkerboard grid container */
        .fw-checkerboard {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          width: 100%;
          padding: 2rem 0;
        }

        /* Single row base */
        .fw-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 4rem;
          background: #ffffff;
          border: 1px solid rgba(10, 10, 10, 0.03);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }

        .fw-row-normal {
          flex-direction: row;
        }

        .fw-row-reverse {
          flex-direction: row-reverse;
        }

        /* Column base */
        .fw-img-col {
          flex: 1;
          width: 50%;
          overflow: hidden;
        }

        .fw-content-col {
          flex: 1;
          width: 50%;
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fw-content-box {
          max-width: 440px;
          width: 100%;
        }

        /* Image frame wrapper */
        .fw-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          overflow: hidden;
          background: #1c1c1a;
        }

        .fw-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          /* start: fully desaturated + slightly darkened */
          filter: grayscale(100%) brightness(0.75) contrast(1.05);
          transition: transform 1.4s cubic-bezier(0.25, 1, 0.3, 1),
                      filter 0.9s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .fw-row:hover .fw-img,
        .fw-row:active .fw-img {
          /* on hover: full colour, slight warmth, zoom */
          filter: grayscale(0%) brightness(1.05) contrast(1.02) saturate(1.15);
          transform: scale(1.05);
        }

        /* Dark veil – dims the image by default, lifts on hover */
        .fw-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.30);
          pointer-events: none;
          transition: background 0.7s cubic-bezier(0.25, 1, 0.3, 1);
          z-index: 1;
        }

        .fw-row:hover .fw-overlay {
          background: rgba(10, 10, 10, 0.0);
        }

        /* Gold shimmer overlay – invisible by default, glows on hover */
        .fw-color-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(184, 134, 11, 0.0)   0%,
            rgba(201, 168, 76, 0.0)  50%,
            rgba(228, 201, 126, 0.0) 100%
          );
          mix-blend-mode: soft-light;
          pointer-events: none;
          transition: background 0.9s cubic-bezier(0.25, 1, 0.3, 1),
                      opacity 0.9s ease;
          opacity: 0;
          z-index: 2;
        }

        .fw-row:hover .fw-color-shimmer {
          background: linear-gradient(
            135deg,
            rgba(184, 134, 11, 0.55)   0%,
            rgba(201, 168, 76, 0.30)  50%,
            rgba(255, 220, 100, 0.15) 100%
          );
          opacity: 1;
        }

        /* Diagonal glint sweep */
        .fw-glint {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 230, 140, 0.0) 45%,
            rgba(255, 255, 255, 0.0) 50%,
            rgba(255, 230, 140, 0.0) 55%,
            transparent 100%
          );
          pointer-events: none;
          transition: background 0.5s ease, transform 0.9s ease;
          transform: translateX(-120%) skewX(-20deg);
          z-index: 3;
        }

        .fw-row:hover .fw-glint {
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 230, 140, 0.0) 40%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 230, 140, 0.0) 60%,
            transparent 100%
          );
          transform: translateX(120%) skewX(-20deg);
        }

        /* Badge overlay */
        .fw-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: rgba(184, 134, 11, 0.95);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* Metadata Details */
        .fw-meta-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.6rem;
        }

        .fw-num {
          font-size: 0.65rem;
          font-weight: 700;
          color: #9ca3af;
          letter-spacing: 0.05em;
        }

        .fw-separator {
          font-size: 0.65rem;
          color: #d1d5db;
        }

        .fw-cat {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a84c;
        }

        .fw-title {
          font-size: clamp(1.5rem, 2.2vw, 2.2rem);
          font-weight: 600;
          color: #0a0a0a;
          margin: 0 0 0.8rem;
          line-height: 1.2;
          letter-spacing: -0.015em;
          transition: color 0.4s ease;
        }

        .fw-row:hover .fw-title {
          color: #b8860b;
        }

        .fw-desc {
          font-size: 0.85rem;
          line-height: 1.65;
          color: #4b5563;
          margin: 0;
        }

        /* Mobile adjustments (stacked rows) */
        @media (max-width: 768px) {
          .fw-checkerboard {
            gap: 2.5rem;
          }

          .fw-row {
            flex-direction: column !important;
            gap: 0;
          }

          .fw-img-col, .fw-content-col {
            width: 100% !important;
            flex: none;
          }

          .fw-content-col {
            padding: 2rem 1.5rem;
            justify-content: flex-start;
          }

          .fw-img-wrapper {
            aspect-ratio: 4 / 3 !important;
          }

          .fw-title {
            font-size: 1.5rem;
          }

          .fw-desc {
            font-size: 0.8rem;
          }
        }


        /* Skeleton loading */
        .fw-skeleton {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          width: 100%;
        }

        .fw-skel-row {
          display: flex;
          align-items: center;
          gap: 4rem;
          width: 100%;
          height: 320px;
        }

        .fw-skel-img {
          flex: 1;
          height: 100%;
          background: #e5e7eb;
          animation: fw-pulse 1.5s ease-in-out infinite;
        }

        .fw-skel-text {
          flex: 1;
          height: 80px;
          background: #e5e7eb;
          animation: fw-pulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .fw-skel-row {
            flex-direction: column;
            gap: 1.5rem;
            height: auto;
          }
          .fw-skel-img {
            width: 100%;
            height: 240px;
          }
          .fw-skel-text {
            width: 100%;
            height: 80px;
          }
        }

        @keyframes fw-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.8; }
        }
      `})]})},De=P.memo(Pe),Be="'Playfair Display', 'Times New Roman', serif",A="'Raleway', system-ui, sans-serif",$e=()=>{const[t,a]=o.useState(""),[s,c]=o.useState(!1),r=i=>{i.preventDefault(),t&&(c(!0),a(""))};return e.jsxs("section",{id:"contact",className:"ct-root","aria-label":"Newsletter signup",children:[e.jsx("div",{className:"ct-bg","aria-hidden":"true",children:e.jsx("img",{src:"/VN-6.jpg",alt:"",onError:i=>{i.target.src="/HeroBgImg.jpg"}})}),e.jsx("div",{className:"ct-inner",children:e.jsxs("div",{className:"ct-grid",children:[e.jsxs("div",{className:"ct-left",children:[e.jsx("span",{className:"ct-eyebrow",style:{fontFamily:A},children:"Newsletter"}),e.jsxs("h2",{className:"ct-heading",style:{fontFamily:Be},children:["Join the",e.jsx("br",{}),e.jsx("em",{children:"Collective."})]}),e.jsx("p",{className:"ct-desc",style:{fontFamily:A},children:"Private previews, atelier updates, and digital journals — delivered to your inbox."})]}),e.jsxs("div",{className:"ct-right",children:[s?e.jsxs("div",{className:"ct-success",style:{fontFamily:A},children:[e.jsx("span",{className:"ct-check",children:"✓"}),"You're in the collective"]}):e.jsxs("form",{onSubmit:r,className:"ct-form",children:[e.jsx("input",{id:"newsletter-email",type:"email",value:t,onChange:i=>a(i.target.value),placeholder:"Your email address",required:!0,className:"ct-input",style:{fontFamily:A}}),e.jsxs("button",{type:"submit",id:"newsletter-submit-btn",className:"ct-submit",style:{fontFamily:A},children:[e.jsx("span",{className:"ct-submit-fill"}),e.jsx("span",{className:"ct-submit-text",children:"Subscribe"})]})]}),e.jsx("p",{className:"ct-privacy",style:{fontFamily:A},children:"No spam. Unsubscribe anytime."})]})]})}),e.jsx("style",{children:`
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

        /* ── Mobile: stack form vertically ── */
        @media (max-width: 768px) {
          .ct-form {
            flex-direction: column;
            border: none;
            gap: 0.75rem;
          }
          .ct-input {
            width: 100%;
            box-sizing: border-box;
            font-size: 1rem; /* prevents iOS auto-zoom */
            padding: 0.95rem 1.1rem;
            border: 1.5px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.04);
          }
          .ct-input::placeholder {
            font-size: 0.72rem;
          }
          .ct-submit {
            width: 100%;
            box-sizing: border-box;
            border-left: none;
            border: none;
            background: #b8860b;
            padding: 1rem;
            color: #ffffff;
            justify-content: center;
          }
          /* Hide the fill span on mobile – button already has bg */
          .ct-submit .ct-submit-fill { display: none; }
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
      `})]})},b="'Raleway', system-ui, sans-serif",He={Instagram:ve,Facebook:we,Twitter:null,Youtube:ye,WhatsApp:xe,LinkedIn:be,GitHub:ue,Globe:ie,Mail:ge,Phone:he,MapPin:pe,Share2:fe},Me=[{name:"Home",href:"/"},{name:"About",href:"/about"},{name:"Services",href:"/services"},{name:"Gallery",href:"/gallery"},{name:"Contact",href:"/contact"}],Ge=[{name:"Bridal Wear",href:"/gallery"},{name:"Aari Embroidery",href:"/services"},{name:"Custom Designs",href:"/services"},{name:"Fabric Painting",href:"/services"},{name:"Ready-to-Wear",href:"/gallery"}],We=()=>{const t="7798370430",[a,s]=o.useState([]);o.useEffect(()=>{f(void 0,null,function*(){try{const r=yield D.getSettings();if(r.data){const i=r.data.socialLinks||[];s(i.sort((l,n)=>(l.order||0)-(n.order||0)))}}catch(r){s([{name:"Instagram",icon:"Instagram",url:"https://instagram.com/vnfashion",order:0},{name:"WhatsApp",icon:"WhatsApp",url:`https://api.whatsapp.com/send?phone=${t}`,order:1}])}})},[]);const c=o.useMemo(()=>a.map(r=>({name:r.name,icon:He[r.icon]||ie,href:r.url})),[a]);return e.jsxs("footer",{className:"ft-root","aria-label":"Site footer",children:[e.jsxs("div",{className:"ft-inner",children:[e.jsxs("div",{className:"ft-top",children:[e.jsx(g,{to:"/",className:"ft-logo",style:{fontFamily:"'Cormorant Garamond', serif"},"aria-label":"VN Fashion Home",children:"VN FASHION"}),e.jsx("p",{className:"ft-tagline",style:{fontFamily:b},children:"Atelier of intentional design"})]}),e.jsxs("div",{className:"ft-columns",children:[e.jsxs("div",{className:"ft-col ft-col-brand",children:[e.jsx("p",{className:"ft-blurb",style:{fontFamily:b},children:"Transforming fashion through intentional design and artisan craft. Each piece a testament to tradition and modernity."}),e.jsx("div",{className:"ft-socials",children:c.map(r=>{const i=r.icon;return i?e.jsx("a",{href:r.href,target:"_blank",rel:"noopener noreferrer","aria-label":r.name,className:"ft-social-icon",children:e.jsx(i,{size:15})},r.name):null})})]}),e.jsxs("div",{className:"ft-col",children:[e.jsx("h4",{className:"ft-col-heading",style:{fontFamily:b},children:"Navigation"}),e.jsx("ul",{className:"ft-links",children:Me.map(r=>e.jsx("li",{children:e.jsx(g,{to:r.href,className:"ft-link",style:{fontFamily:b},children:r.name})},r.name))})]}),e.jsxs("div",{className:"ft-col",children:[e.jsx("h4",{className:"ft-col-heading",style:{fontFamily:b},children:"Collections"}),e.jsx("ul",{className:"ft-links",children:Ge.map(r=>e.jsx("li",{children:e.jsx(g,{to:r.href,className:"ft-link",style:{fontFamily:b},children:r.name})},r.name))})]}),e.jsxs("div",{className:"ft-col",children:[e.jsx("h4",{className:"ft-col-heading",style:{fontFamily:b},children:"Contact"}),e.jsxs("ul",{className:"ft-links",children:[e.jsx("li",{children:e.jsxs("a",{href:`tel:+91${t}`,className:"ft-link",style:{fontFamily:b},children:["+91 ",t]})}),e.jsx("li",{children:e.jsx("a",{href:"mailto:info@vnfashion.com",className:"ft-link",style:{fontFamily:b},children:"info@vnfashion.com"})}),e.jsx("li",{children:e.jsxs("p",{className:"ft-address",style:{fontFamily:b},children:["Ratnagiri,",e.jsx("br",{}),"Maharashtra — 415 626"]})})]})]})]}),e.jsxs("div",{className:"ft-bottom",children:[e.jsxs("p",{className:"ft-copy",style:{fontFamily:b},children:["© ",new Date().getFullYear()," VN Fashion. All rights reserved."]}),e.jsxs("p",{className:"ft-credit",style:{fontFamily:b},children:["Designed & Developed by"," ",e.jsx("a",{href:"https://sohansarang.vercel.app/",target:"_blank",rel:"noopener noreferrer",className:"ft-credit-link",children:"Sohan Sarang"})]})]})]}),e.jsx("style",{children:`
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
            align-items: center;
            text-align: center;
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
      `})]})},Ue=P.memo(We),Ye="VN FASHION",x={IDLE:"idle",ENTER:"enter",HOLD:"hold",EXIT:"exit"};let F=null;const qe=({children:t})=>{const a=V(),[s,c]=o.useState(x.IDLE),[r,i]=o.useState(t),l=o.useRef(a.pathname),n=o.useRef(!1);o.useEffect(()=>{if(a.pathname!==l.current){if(n.current){F={children:t,path:a.pathname};return}d(t,a.pathname),l.current=a.pathname}},[a.pathname]);function d(v,h){n.current=!0,c(x.ENTER);const w=setTimeout(()=>{c(x.HOLD),i(v),window.scrollTo({top:0,left:0,behavior:"instant"});const j=setTimeout(()=>{c(x.EXIT);const E=setTimeout(()=>{if(c(x.IDLE),n.current=!1,F){const{children:I,path:C}=F;F=null,l.current=C,d(I)}},400);return()=>clearTimeout(E)},300);return()=>clearTimeout(j)},400);return()=>clearTimeout(w)}const m=s!==x.IDLE;return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{opacity:1},children:r}),m&&e.jsx("div",{"aria-hidden":"true",style:U({position:"fixed",inset:0,zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"all",animation:s===x.ENTER?"blurFadeIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards":s===x.EXIT?"blurFadeOut 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards":"none"},s===x.HOLD&&{opacity:1,backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",background:"rgba(12, 12, 11, 0.88)"}),children:e.jsxs("div",{style:{opacity:s===x.HOLD?1:0,transform:s===x.HOLD?"scale(1) translateY(0)":"scale(0.97) translateY(8px)",transition:"opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",textAlign:"center",userSelect:"none"},children:[e.jsx("div",{style:{width:38,height:38,border:"1.5px solid rgba(184, 134, 11, 0.15)",borderTopColor:"#b8860b",borderRadius:"50%",margin:"0 auto 20px",animation:"spinGold 0.8s linear infinite"}}),e.jsx("p",{style:{fontFamily:"'Cormorant Garamond', serif",fontSize:"clamp(1.8rem, 5.5vw, 2.8rem)",fontWeight:300,letterSpacing:"0.45em",color:"#ffffff",textTransform:"uppercase",lineHeight:1,margin:0},children:Ye}),e.jsx("p",{style:{fontFamily:"'Raleway', sans-serif",fontSize:"0.55rem",fontWeight:600,letterSpacing:"0.3em",color:"#c9a84c",textTransform:"uppercase",marginTop:"12px",opacity:.8},children:"Couture Atelier"})]})}),e.jsx("style",{children:`
        @keyframes blurFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            background: rgba(12, 12, 11, 0);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(12, 12, 11, 0.88);
          }
        }
        @keyframes blurFadeOut {
          from {
            opacity: 1;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(12, 12, 11, 0.88);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            background: rgba(12, 12, 11, 0);
          }
        }
        @keyframes spinGold {
          to { transform: rotate(360deg); }
        }
      `})]})},Xe=o.lazy(()=>k(()=>import("./About-FytoN1v2.js"),__vite__mapDeps([0,1,2,3,4]))),Ke=o.lazy(()=>k(()=>import("./Gallery-fsqmyYhl.js"),__vite__mapDeps([5,1,2,3,4]))),Je=o.lazy(()=>k(()=>import("./Services--vNf2BNv.js"),__vite__mapDeps([6,1,2,3,4]))),Qe=o.lazy(()=>k(()=>import("./Booking-BXMiGeEP.js"),__vite__mapDeps([7,1,2,8,3,4]))),Ze=o.lazy(()=>k(()=>import("./Contact-DMLta98d.js"),__vite__mapDeps([9,1,2,8,3,4]))),et=o.lazy(()=>k(()=>import("./Classes-CQsN8BGf.js"),__vite__mapDeps([10,1,2,3,4]))),tt=()=>e.jsxs("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f5f4f2"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:36,height:36,border:"1.5px solid #0a0a0a",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.75s linear infinite",margin:"0 auto 16px"}}),e.jsx("p",{style:{fontSize:"0.55rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#9ca3af",fontFamily:"Unbounded, sans-serif"},children:"Loading"})]}),e.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg); } }"})]});function rt(){return e.jsxs(e.Fragment,{children:[e.jsx(Ie,{}),e.jsx(Re,{}),e.jsx(Ve,{}),e.jsx(De,{}),e.jsx($e,{}),e.jsx(Ue,{})]})}function at(){const t=V();return e.jsx(qe,{children:e.jsx(o.Suspense,{fallback:e.jsx(tt,{}),children:e.jsxs(Ne,{location:t,children:[e.jsx(N,{path:"/",element:e.jsx(rt,{})}),e.jsx(N,{path:"/about",element:e.jsx(Xe,{})}),e.jsx(N,{path:"/services",element:e.jsx(Je,{})}),e.jsx(N,{path:"/gallery",element:e.jsx(Ke,{})}),e.jsx(N,{path:"/classes",element:e.jsx(et,{})}),e.jsx(N,{path:"/booking",element:e.jsx(Qe,{})}),e.jsx(N,{path:"/contact",element:e.jsx(Ze,{})})]})})},t.pathname)}function re(){const[t,a]=o.useState(!0);return e.jsxs(e.Fragment,{children:[t&&e.jsx(Fe,{onComplete:()=>a(!1)}),e.jsx(je,{children:e.jsx(at,{})})]})}const ae=ke.createRoot(document.getElementById("root"));"requestIdleCallback"in window?requestIdleCallback(()=>{ae.render(e.jsx(o.StrictMode,{children:e.jsx(re,{})}))}):setTimeout(()=>{ae.render(e.jsx(o.StrictMode,{children:e.jsx(re,{})}))},1);export{Ue as F,Ie as N,D as c,Le as f,se as g};
