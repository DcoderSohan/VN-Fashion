var B=Object.defineProperty,G=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var N=(r,a,t)=>a in r?B(r,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[a]=t,b=(r,a)=>{for(var t in a||(a={}))H.call(a,t)&&N(r,t,a[t]);if(S)for(var t of S(a))R.call(a,t)&&N(r,t,a[t]);return r},j=(r,a)=>G(r,D(a));var W=(r,a,t)=>new Promise((f,p)=>{var v=l=>{try{g(t.next(l))}catch(m){p(m)}},k=l=>{try{g(t.throw(l))}catch(m){p(m)}},g=l=>l.done?f(l.value):Promise.resolve(l.value).then(v,k);g((t=t.apply(r,a)).next())});import{r as s,j as e,A as F,L as z,X as P,C as M,h as _}from"./react-vendor-AJ74e7NP.js";import{N as U,F as O,c as q,g as X}from"./index-Eia-J4Tj.js";import{m as x,A as T}from"./framer-motion-B-QtNzEm.js";import"./vendor-Cj7CuQkd.js";import"./axios-DnTtldoj.js";const ee=()=>{const[r,a]=s.useState("All"),[t,f]=s.useState(null),[p,v]=s.useState([]),[k,g]=s.useState(["All"]),[l,m]=s.useState(!0);s.useEffect(()=>{W(void 0,null,function*(){try{m(!0);const d=(yield q.getGallery()).map((n,C)=>({id:n._id||C+1,title:n.title||"Untitled",image:X(n.image)||"/VN-1.jpg",category:n.category||"Uncategorized",description:n.description||"",materials:n.materials||"",price:n.price||"Contact for pricing",featured:n.featured||!1})),y=d.sort((n,C)=>(C.featured?1:0)-(n.featured?1:0));v(y);const V=["All",...new Set(d.map(n=>n.category).filter(Boolean))];g(V)}catch(o){v([{id:1,title:"Noir Voluminous Gown",image:"/VN-1.jpg",category:"Couture",description:"Structured black gown with dynamic pleats.",featured:!0},{id:2,title:"Metallic Wave Texture",image:"/featured_fabric_texture.png",category:"Textile Art",description:"Iridescent fabric manipulation detail.",featured:!1},{id:3,title:"Structured Coat",image:"/hero_fashion_model.png",category:"Couture",description:"Minimalist black coat with architectural shoulders.",featured:!1},{id:4,title:"Couture Concept Sketch",image:"/VN-3.jpg",category:"Sketches",description:"Original design concept drafting.",featured:!1},{id:5,title:"Pleated Gown Detail",image:"/VN-2.jpg",category:"Couture",description:"Volume and texturing experimentation.",featured:!1},{id:6,title:"Trench Coat Silhouette",image:"/VN-4.jpg",category:"Ready-To-Wear",description:"Modern structured silhouette.",featured:!1},{id:7,title:"Woven Tapestry Detail",image:"/VN-5.jpg",category:"Textile Art",description:"Hand-woven heritage textile close-up.",featured:!1},{id:8,title:"Evening Drape",image:"/VN-6.jpg",category:"Couture",description:"Fluid silk evening silhouette.",featured:!1}]),g(["All","Couture","Textile Art","Ready-To-Wear","Sketches"])}finally{m(!1)}})},[]);const c=s.useMemo(()=>r==="All"?p:p.filter(i=>i.category===r),[p,r]),A=s.useCallback(i=>f(i),[]),h=s.useCallback(()=>f(null),[]),u=s.useCallback(i=>{if(!t)return;const o=c.findIndex(y=>y.id===t.id),d=i==="next"?(o+1)%c.length:(o-1+c.length)%c.length;f(c[d])},[t,c]);s.useEffect(()=>{if(!t)return;const i=o=>{o.key==="ArrowLeft"&&u("prev"),o.key==="ArrowRight"&&u("next"),o.key==="Escape"&&h()};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[t,u,h]);const E=i=>{const o=[2,1,2,2,1,2,2,1];return o[i%o.length]},I=String.raw`
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
  `,L={paddingTop:"128px",paddingBottom:"96px",paddingLeft:"clamp(20px,5vw,80px)",paddingRight:"clamp(20px,5vw,80px)"},w={fontFamily:"'Cormorant Garamond', serif"};return e.jsxs("div",{className:"glry",children:[e.jsx("style",{children:I}),e.jsx("div",{className:"glry-wm"}),e.jsx(U,{}),e.jsx("div",{className:"glry-bd",style:L,children:e.jsxs("div",{style:{maxWidth:"1380px",margin:"0 auto"},children:[e.jsxs(x.div,{style:{marginBottom:"56px"},initial:{opacity:0,y:28},animate:{opacity:1,y:0},transition:{duration:.7,ease:[.22,.61,.36,1]},children:[e.jsx("p",{style:{fontSize:"0.62rem",letterSpacing:"0.28em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"14px"},children:"Portfolio & Works"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:"20px",marginBottom:"28px"},children:[e.jsxs("h1",{style:j(b({},w),{fontSize:"clamp(3rem,8vw,7rem)",fontWeight:300,lineHeight:.92,letterSpacing:"-0.02em",color:"#1a1a1a",margin:0}),children:["The ",e.jsx("em",{style:{fontStyle:"italic"},children:"Archive"})]}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#888",lineHeight:1.75,fontWeight:300,maxWidth:"340px",margin:0},children:"An editorial collection of couture, textile experimentation, and ready-to-wear — each piece a study in proportion, material, and restraint."})]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"24px",paddingTop:"16px",borderTop:"1px solid #e0dbd3"},children:[k.map(i=>e.jsx("button",{className:"ftab"+(r===i?" on":""),onClick:()=>a(i),children:i},i)),e.jsxs("div",{style:{marginLeft:"auto",fontSize:"0.62rem",letterSpacing:"0.15em",textTransform:"uppercase",color:"#888",fontWeight:500,display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{style:{color:"#1a1a1a",fontWeight:700,fontSize:"0.88rem"},children:c.length}),c.length===1?"piece":"pieces"]})]})]}),l?e.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"100px 0"},children:e.jsx("div",{style:{width:"32px",height:"32px",borderRadius:"50%",border:"2px solid transparent",borderTopColor:"#b8860b",animation:"glry-spin 0.8s linear infinite"}})}):e.jsx(T,{mode:"wait",children:e.jsx(x.div,{className:"mgrid",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.35},children:c.map((i,o)=>{const d=E(o);return e.jsxs(x.div,{className:"mitem s"+d,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.55,delay:Math.min(o*.06,.42),ease:[.22,.61,.36,1]},onClick:()=>A(i),children:[e.jsx("img",{src:i.image,alt:i.title,loading:"lazy",onError:y=>{y.target.src="/VN-1.jpg"}}),e.jsxs("div",{className:"mov",children:[e.jsx("div",{className:"oarr",children:e.jsx(F,{size:13})}),e.jsx("p",{className:"ocat",children:i.category}),e.jsx("h3",{className:"otit",children:i.title})]}),i.featured&&e.jsx("div",{className:"fbg",children:"Featured"})]},i.id)})},r)}),!l&&c.length===0&&e.jsx("div",{style:{textAlign:"center",padding:"80px 0",color:"#888"},children:e.jsx("p",{style:j(b({},w),{fontSize:"2rem",fontWeight:300}),children:"No pieces in this category yet."})}),e.jsx(x.div,{style:{marginTop:"120px",paddingTop:"52px",borderTop:"1px solid #e0dbd3"},initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-80px"},transition:{duration:.8,ease:[.22,.61,.36,1]},children:e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:"28px"},children:[e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.62rem",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"14px"},children:"Commission & Collaboration"}),e.jsxs("h2",{style:j(b({},w),{fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:300,lineHeight:1.1,color:"#1a1a1a",letterSpacing:"-0.01em",margin:0}),children:["Every garment begins",e.jsx("br",{}),"with a conversation."]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"18px",alignItems:"flex-start"},children:[e.jsx("p",{style:{fontSize:"0.82rem",color:"#888",lineHeight:1.75,fontWeight:300,maxWidth:"300px",margin:0},children:"We are always seeking fresh perspectives and meaningful collaborations. Let's build something extraordinary together."}),e.jsx(z,{to:"/contact",className:"ctabk",children:"Get In Touch"})]})]})})]})}),e.jsx(O,{}),e.jsx(T,{children:t&&e.jsxs(x.div,{className:"lbwrap",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},onClick:h,children:[e.jsx("button",{className:"lbx",onClick:h,children:e.jsx(P,{size:15})}),e.jsx("button",{className:"lbn",style:{left:"14px"},onClick:i=>{i.stopPropagation(),u("prev")},children:e.jsx(M,{size:17})}),e.jsxs(x.div,{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"24px",maxWidth:"760px",width:"100%",padding:"20px 16px"},onClick:i=>i.stopPropagation(),initial:{opacity:0,scale:.97},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.97},transition:{duration:.28},children:[e.jsx("img",{src:t.image,alt:t.title,style:{maxHeight:"60vh",maxWidth:"100%",objectFit:"contain"},onError:i=>{i.target.src="/VN-1.jpg"}}),e.jsxs("div",{style:{textAlign:"center",color:"#fff"},children:[e.jsx("p",{style:{fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#b8860b",fontWeight:600,marginBottom:"8px"},children:t.category}),e.jsx("h3",{style:j(b({},w),{fontWeight:300,fontSize:"clamp(1.5rem,4vw,2.4rem)",lineHeight:1.1,marginBottom:"10px"}),children:t.title}),t.description&&e.jsx("p",{style:{fontSize:"0.82rem",color:"rgba(255,255,255,0.58)",lineHeight:1.75,maxWidth:"460px",margin:"0 auto 20px",fontWeight:300},children:t.description}),e.jsx(z,{to:"/booking",state:{designId:t.id,designTitle:t.title,designCategory:t.category,designPrice:t.price,designImage:t.image},className:"lbbk",onClick:h,children:"Book This Design"})]})]},t.id),e.jsx("button",{className:"lbn",style:{right:"14px"},onClick:i=>{i.stopPropagation(),u("next")},children:e.jsx(_,{size:17})})]})})]})};export{ee as default};
