var T=Object.defineProperty,E=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var k=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var N=(r,s,a)=>s in r?T(r,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[s]=a,x=(r,s)=>{for(var a in s||(s={}))A.call(s,a)&&N(r,a,s[a]);if(k)for(var a of k(s))F.call(s,a)&&N(r,a,s[a]);return r},y=(r,s)=>E(r,I(s));var z=(r,s,a)=>new Promise((f,p)=>{var j=o=>{try{l(a.next(o))}catch(d){p(d)}},i=o=>{try{l(a.throw(o))}catch(d){p(d)}},l=o=>o.done?f(o.value):Promise.resolve(o.value).then(j,i);l((a=a.apply(r,s)).next())});import{r as g,i as H,j as e,m as b,k as L,n as S,o as W,U as C,T as D,X as M}from"./react-vendor-AJ74e7NP.js";import{N as R,g as w,F as V,c as G}from"./index-DqkDPiNr.js";import{m as c,A as B}from"./framer-motion-B-QtNzEm.js";import"./vendor-Cj7CuQkd.js";import"./axios-DnTtldoj.js";const h={fontFamily:"'Cormorant Garamond', serif"},_=()=>{const[r,s]=g.useState([]),[a,f]=g.useState(!0),[p,j]=g.useState("All"),[i,l]=g.useState(null),o=H();g.useEffect(()=>{z(void 0,null,function*(){f(!0);const m=yield G.getClassBanners();s(Array.isArray(m)?m.filter(u=>u.isActive!==!1):[]),f(!1)})},[]);const d=["All",...new Set(r.map(t=>t.category).filter(Boolean))],v=p==="All"?r:r.filter(t=>t.category===p),n=r.find(t=>t.isFeatured);return e.jsxs("div",{className:"cp-root",children:[e.jsx("style",{children:`
    .cp-root {
      background: #fbfbfa;
      color: #1a1a1a;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    .cp-wm {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url('/VN-3.jpg');
      background-size: cover;
      background-position: center;
      opacity: 0.035;
      filter: grayscale(1);
    }
    .cp-grain {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022;
      mix-blend-mode: multiply;
    }
    .cp-body { position: relative; z-index: 1; }

    /* Hero strip */
    .cp-hero {
      padding: 140px clamp(20px,5vw,80px) 48px;
      max-width: 1380px;
      margin: 0 auto;
    }
    .gold-bar { width: 40px; height: 1.5px; background: #b8860b; display: inline-block; }

    /* Featured banner */
    .cp-featured {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      background: #ffffff;
      border: 1px solid #eaeae5;
      margin: 0 clamp(20px, 5vw, 80px) 64px;
      overflow: hidden;
      height: 480px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
      cursor: pointer;
      position: relative;
    }
    .cp-featured-content {
      padding: clamp(32px, 6vw, 64px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #faf9f6;
    }
    .cp-featured-img-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 360px;
      overflow: hidden;
      background: #1a1a1a;
    }
    .cp-featured-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cp-featured:hover .cp-featured-img { transform: scale(1.04); }
    @media (max-width: 960px) {
      .cp-featured {
        grid-template-columns: 1fr !important;
      }
      .cp-featured-img-wrap {
        height: 320px;
        min-height: 320px;
      }
    }

    /* Category tabs */
    .cp-tabs {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 40px;
      padding: 0 clamp(20px,5vw,80px);
    }
    .cp-tab {
      padding: 10px 20px;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 600;
      color: #666;
      background: #faf9f6;
      border: 1px solid #e5e2db;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cp-tab:hover {
      color: #1a1a1a;
      border-color: #1a1a1a;
    }
    .cp-tab.active {
      color: #ffffff;
      background: #1a1a1a;
      border-color: #1a1a1a;
    }

    /* Editorial List */
    .cp-list {
      display: flex;
      flex-direction: column;
      gap: 48px;
      margin: 0 clamp(20px,5vw,80px) 80px;
    }
    .cp-row-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #ffffff;
      border: 1px solid #eaeae5;
      overflow: hidden;
      height: 420px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
      cursor: pointer;
    }
    .cp-row-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
    }
    .cp-row-card.alternate {
      direction: rtl;
    }
    .cp-row-card.alternate > * {
      direction: ltr;
    }
    .cp-row-img-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 380px;
      overflow: hidden;
      background: #f5f4f0;
    }
    .cp-row-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cp-row-card:hover .cp-row-img {
      transform: scale(1.04);
    }
    .cp-row-body {
      padding: clamp(24px, 4vw, 48px);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cp-card-cat {
      font-size: 0.58rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: #b8860b;
    }
    .cp-card-title {
      font-size: 1.6rem;
      font-weight: 300;
      color: #1a1a1a;
      line-height: 1.25;
      margin-bottom: 12px;
    }
    .cp-card-desc {
      font-size: 0.82rem;
      color: #666;
      font-weight: 300;
      line-height: 1.65;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .cp-card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      border-top: 1px solid #f0ede9;
      padding-top: 16px;
    }
    .cp-meta-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
      color: #777;
    }
    .cp-card-price {
      font-size: 1rem;
      font-weight: 600;
      color: #b8860b;
      font-family: 'Cormorant Garamond', serif;
    }
    .cp-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(4px);
      color: #b8860b;
      border: 1px solid rgba(184, 134, 11, 0.15);
      font-size: 0.55rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      z-index: 2;
    }
    @media (max-width: 768px) {
      .cp-row-card {
        grid-template-columns: 1fr;
        height: auto !important;
      }
      .cp-row-card.alternate {
        direction: ltr;
      }
      .cp-row-img-wrap {
        height: 280px;
        min-height: 280px;
      }
    }

    /* Lightbox / Detail Modal */
    .cp-modal-bg {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(10,10,10,0.88);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .cp-modal {
      background: #fbfbfa;
      max-width: 900px;
      width: 100%;
      height: min(600px, 80vh);
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      overflow: hidden;
    }
    @media (max-width: 640px) {
      .cp-modal {
        grid-template-columns: 1fr;
        height: auto;
        max-height: 90vh;
        overflow-y: auto;
      }
      .cp-modal-img {
        height: 260px;
        min-height: 260px;
      }
      .cp-modal-body {
        height: auto !important;
        overflow-y: visible !important;
      }
    }
    .cp-modal-img-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      background: #faf9f6;
    }
    .cp-modal-img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
      filter: grayscale(0.1);
    }
    .cp-modal-body {
      padding: 40px 36px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow-y: auto;
      height: 100%;
    }
    .cp-modal-close {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(10,10,10,0.7);
      border: none;
      color: #fff;
      cursor: pointer;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: background 0.2s;
    }
    .cp-modal-close:hover { background: #b8860b; }
    .cp-modal-enroll {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #1a1a1a;
      color: #fbfbfa;
      font-size: 0.62rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 600;
      padding: 16px 28px;
      border: none;
      cursor: pointer;
      transition: background 0.28s;
      margin-top: auto;
    }
    .cp-modal-enroll:hover { background: #b8860b; }
    .cp-detail-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #e0dbd3;
    }
    .cp-detail-row:last-of-type { border-bottom: none; }
    .cp-detail-icon {
      width: 30px; height: 30px;
      border: 1px solid #e0dbd3;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      color: #b8860b;
    }

    /* Empty state */
    .cp-empty {
      text-align: center;
      padding: 100px 20px;
      color: #aaa;
    }

    /* Skeleton */
    .cp-skel {
      background: linear-gradient(90deg, #f0ede9 25%, #e8e4df 50%, #f0ede9 75%);
      background-size: 200% 100%;
      animation: cp-shimmer 1.4s infinite;
      border-radius: 2px;
    }
    @keyframes cp-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}),e.jsx("div",{className:"cp-wm"}),e.jsx("div",{className:"cp-grain"}),e.jsx(R,{}),e.jsxs("div",{className:"cp-body",children:[e.jsx("div",{className:"cp-hero",children:e.jsxs(c.div,{initial:{opacity:0,y:28},animate:{opacity:1,y:0},transition:{duration:.7,ease:[.22,.61,.36,1]},children:[e.jsx("p",{style:{fontSize:"0.62rem",letterSpacing:"0.28em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"16px"},children:"VN Fashion — Atelier Sessions"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:"20px"},children:[e.jsxs("h1",{style:y(x({},h),{fontSize:"clamp(2.8rem, 7vw, 6.5rem)",fontWeight:300,lineHeight:.94,letterSpacing:"-0.02em",color:"#1a1a1a",margin:0}),children:["Our ",e.jsx("em",{style:{fontStyle:"italic"},children:"Classes."})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",paddingBottom:"8px"},children:[e.jsx("span",{className:"gold-bar"}),e.jsx("p",{style:{fontSize:"0.78rem",color:"#888",fontWeight:300,maxWidth:"300px",lineHeight:1.65,margin:0},children:"Learn the art of Aari embroidery and bespoke fashion design from master artisans."})]})]})]})}),!a&&n&&e.jsxs(c.div,{className:"cp-featured",initial:{opacity:0,y:15},animate:{opacity:1,y:0},transition:{duration:.8,delay:.15},onClick:()=>l(n),children:[e.jsxs("div",{className:"cp-featured-content",children:[e.jsx("p",{style:{fontSize:"0.6rem",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:700,color:"#b8860b",marginBottom:"16px"},children:"✦ Featured Masterclass"}),e.jsx("h2",{style:y(x({},h),{fontSize:"clamp(1.8rem, 3.2vw, 3rem)",fontWeight:300,color:"#1a1a1a",lineHeight:1.15,marginBottom:"18px"}),children:n.title}),n.description&&e.jsx("p",{style:{fontSize:"0.85rem",color:"#666",fontWeight:300,lineHeight:1.75,marginBottom:"28px"},children:n.description}),e.jsxs("div",{style:{display:"flex",gap:"24px",flexWrap:"wrap",alignItems:"center",marginTop:"auto",paddingTop:"20px"},children:[n.price&&e.jsx("span",{style:{fontSize:"1.25rem",fontWeight:500,color:"#b8860b",letterSpacing:"0.02em",fontFamily:"'Cormorant Garamond', serif"},children:n.price}),e.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.62rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:600,color:"#1a1a1a"},children:["Explore Details ",e.jsx(b,{size:14,style:{color:"#b8860b"}})]})]})]}),e.jsx("div",{className:"cp-featured-img-wrap",children:e.jsx("img",{src:w(n.image),alt:n.title,className:"cp-featured-img",onError:t=>{t.target.parentElement.style.display="none",t.target.style.display="none"}})})]}),e.jsx("div",{className:"cp-tabs",children:d.map(t=>e.jsx("button",{className:`cp-tab${p===t?" active":""}`,onClick:()=>j(t),children:t},t))}),a?e.jsx("div",{className:"cp-list",children:[1,2].map(t=>e.jsxs("div",{className:`cp-row-card${t%2===1?" alternate":""}`,style:{cursor:"default"},children:[e.jsx("div",{className:"cp-row-img-wrap",children:e.jsx("div",{className:"cp-skel",style:{width:"100%",height:"100%",borderRadius:0}})}),e.jsxs("div",{className:"cp-row-body",style:{width:"100%"},children:[e.jsx("div",{className:"cp-skel",style:{width:"80px",height:"10px",marginBottom:"16px"}}),e.jsx("div",{className:"cp-skel",style:{width:"60%",height:"28px",marginBottom:"14px"}}),e.jsx("div",{className:"cp-skel",style:{width:"90%",height:"12px",marginBottom:"8px"}}),e.jsx("div",{className:"cp-skel",style:{width:"80%",height:"12px",marginBottom:"24px"}}),e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsx("div",{className:"cp-skel",style:{width:"80px",height:"14px"}}),e.jsx("div",{className:"cp-skel",style:{width:"80px",height:"14px"}})]})]})]},t))}):v.length===0?e.jsxs("div",{className:"cp-empty",children:[e.jsx(L,{size:40,color:"#e0dbd3",strokeWidth:1,style:{marginBottom:"20px"}}),e.jsx("p",{style:{fontSize:"0.8rem",fontWeight:300},children:r.length===0?"No classes available yet. Check back soon!":"No classes in this category."})]}):e.jsx(c.div,{layout:!0,className:"cp-list",children:e.jsx(B,{mode:"popLayout",children:v.map((t,m)=>e.jsxs(c.div,{layout:!0,className:`cp-row-card${m%2===1?" alternate":""}`,initial:{opacity:0,y:24},animate:{opacity:1,y:0},exit:{opacity:0,scale:.98},transition:{duration:.5,delay:m*.05,ease:[.22,.61,.36,1]},onClick:()=>l(t),children:[e.jsxs("div",{className:"cp-row-img-wrap",children:[t.isFeatured&&e.jsx("span",{className:"cp-badge",children:"Featured"}),e.jsx("img",{src:w(t.image),alt:t.title,className:"cp-row-img",loading:"lazy",onError:u=>{u.target.parentElement.style.background="#2a2a2a",u.target.style.display="none"}})]}),e.jsxs("div",{className:"cp-row-body",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:"12px",marginBottom:"8px"},children:[t.category&&e.jsx("span",{className:"cp-card-cat",children:t.category}),t.price&&e.jsx("span",{className:"cp-card-price",children:t.price})]}),e.jsx("h3",{className:"cp-card-title",style:h,children:t.title}),t.description&&e.jsx("p",{className:"cp-card-desc",style:{WebkitLineClamp:3},children:t.description}),e.jsxs("div",{className:"cp-card-meta",children:[t.duration&&e.jsxs("span",{className:"cp-meta-pill",children:[e.jsx(S,{size:12})," ",t.duration]}),t.schedule&&e.jsxs("span",{className:"cp-meta-pill",children:[e.jsx(W,{size:12})," ",t.schedule]}),t.seats&&e.jsxs("span",{className:"cp-meta-pill",children:[e.jsx(C,{size:12})," ",t.seats," seats"]})]}),e.jsxs("div",{style:{marginTop:"24px",display:"flex",alignItems:"center",gap:"6px",fontSize:"0.62rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:600,color:"#1a1a1a"},children:["View Details & Enroll ",e.jsx(b,{size:13,style:{color:"#b8860b"}})]})]})]},t._id))})}),e.jsxs(c.div,{style:{borderTop:"1px solid #e0dbd3",padding:"28px clamp(20px,5vw,80px)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"18px",background:"#fbfbfa"},initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.7},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[e.jsx("span",{className:"gold-bar"}),e.jsx("span",{style:{fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:600,color:"#888"},children:"Interested in joining a class?"})]}),e.jsxs("button",{onClick:()=>o("/booking"),style:{display:"flex",alignItems:"center",gap:"10px",background:"#1a1a1a",color:"#fbfbfa",border:"none",cursor:"pointer",padding:"13px 24px",fontSize:"0.62rem",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,transition:"background 0.28s"},onMouseEnter:t=>t.currentTarget.style.background="#b8860b",onMouseLeave:t=>t.currentTarget.style.background="#1a1a1a",children:["Book a Consultation ",e.jsx(b,{size:13})]})]})]}),e.jsx(V,{}),e.jsx(B,{children:i&&e.jsx(c.div,{className:"cp-modal-bg",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25},onClick:t=>{t.target===t.currentTarget&&l(null)},children:e.jsxs(c.div,{className:"cp-modal",initial:{opacity:0,scale:.96,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.96,y:10},transition:{duration:.35,ease:[.22,.61,.36,1]},children:[i.image&&e.jsx("div",{className:"cp-modal-img-wrap",children:e.jsx("img",{src:w(i.image),alt:i.title,className:"cp-modal-img",onError:t=>{t.target.parentElement.style.display="none",t.target.style.display="none"}})}),e.jsxs("div",{className:"cp-modal-body",children:[i.category&&e.jsx("p",{style:{fontSize:"0.56rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:700,color:"#b8860b"},children:i.category}),e.jsx("h2",{style:y(x({},h),{fontSize:"2rem",fontWeight:300,color:"#1a1a1a",lineHeight:1.1,margin:0}),children:i.title}),i.subtitle&&e.jsx("p",{style:{fontSize:"0.85rem",color:"#666",fontWeight:300},children:i.subtitle}),i.description&&e.jsx("p",{style:{fontSize:"0.82rem",color:"#777",lineHeight:1.75,fontWeight:300},children:i.description}),e.jsxs("div",{children:[i.instructor&&e.jsxs("div",{className:"cp-detail-row",children:[e.jsx("div",{className:"cp-detail-icon",children:e.jsx(D,{size:12})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.52rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"#aaa",fontWeight:600,marginBottom:"3px"},children:"Instructor"}),e.jsx("p",{style:{fontSize:"0.85rem",color:"#1a1a1a",fontWeight:300},children:i.instructor})]})]}),i.duration&&e.jsxs("div",{className:"cp-detail-row",children:[e.jsx("div",{className:"cp-detail-icon",children:e.jsx(S,{size:12})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.52rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"#aaa",fontWeight:600,marginBottom:"3px"},children:"Duration"}),e.jsx("p",{style:{fontSize:"0.85rem",color:"#1a1a1a",fontWeight:300},children:i.duration})]})]}),i.schedule&&e.jsxs("div",{className:"cp-detail-row",children:[e.jsx("div",{className:"cp-detail-icon",children:e.jsx(W,{size:12})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.52rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"#aaa",fontWeight:600,marginBottom:"3px"},children:"Schedule"}),e.jsx("p",{style:{fontSize:"0.85rem",color:"#1a1a1a",fontWeight:300},children:i.schedule})]})]}),i.seats&&e.jsxs("div",{className:"cp-detail-row",children:[e.jsx("div",{className:"cp-detail-icon",children:e.jsx(C,{size:12})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.52rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"#aaa",fontWeight:600,marginBottom:"3px"},children:"Availability"}),e.jsxs("p",{style:{fontSize:"0.85rem",color:"#1a1a1a",fontWeight:300},children:[i.seats," seats available"]})]})]}),i.price&&e.jsxs("div",{style:{padding:"16px 0",marginTop:"4px"},children:[e.jsx("p",{style:{fontSize:"0.52rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"#aaa",fontWeight:600,marginBottom:"6px"},children:"Investment"}),e.jsx("p",{style:x({fontSize:"1.5rem",fontWeight:600,color:"#b8860b"},h),children:i.price})]})]}),e.jsxs("button",{className:"cp-modal-enroll",onClick:()=>{l(null),o("/booking")},children:["Enroll / Book Now ",e.jsx(b,{size:13})]})]}),e.jsx("button",{className:"cp-modal-close",onClick:()=>l(null),children:e.jsx(M,{size:15})})]})})})]})};export{_ as default};
