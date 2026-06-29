var f=(l,c,s)=>new Promise((d,g)=>{var m=r=>{try{p(s.next(r))}catch(x){g(x)}},b=r=>{try{p(s.throw(r))}catch(x){g(x)}},p=r=>r.done?d(r.value):Promise.resolve(r.value).then(m,b);p((s=s.apply(l,c)).next())});import{r as i,j as e,L as u}from"./react-vendor-w04w0yOG.js";import{X as h,Y as I}from"./vendor-Db1USzoO.js";import{g as v,N as R,F as A,c as y}from"./index-B4B4tUEM.js";import{m as n}from"./framer-motion-D6rx1S5v.js";import"./axios-BRaZGOG8.js";h.registerPlugin(I);const O=()=>{const l=i.useRef(null),c=i.useRef(null),s=i.useRef(null),d=i.useRef([]),[g,m]=i.useState([]),[b,p]=i.useState([]),[r,x]=i.useState({aboutText:"We construct artifacts of intentional identity. VN Fashion serves as a laboratory for sartorial experimentation, where textiles are treated as structural components to redefine the modern silhouette.",designerName:"VIDISHA NATEKAR",designerTitle:"FOUNDER & CREATIVE DIRECTOR",designerBio:"With over a decade of experience in traditional handcrafts and contemporary fashion design, Vidisha Natekar brings together the best of both worlds. She creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",designerImage:"/Me.jpg"}),[j,N]=i.useState(!0);i.useEffect(()=>{f(void 0,null,function*(){try{const t=yield y.getAbout();t&&x({aboutText:t.aboutText||"We construct artifacts of intentional identity. VN Fashion serves as a laboratory for sartorial experimentation, where textiles are treated as structural components to redefine the modern silhouette.",designerName:t.designerName||"VIDISHA NATEKAR",designerTitle:t.designerTitle||"FOUNDER & CREATIVE DIRECTOR",designerBio:t.designerBio||"With a background in architectural texturing and years of apprenticeship under master artisans, VIDISHA NATEKAR brings together the best of both worlds. He creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",designerImage:t.designerImage||"/Me.jpg"});const o=yield y.getTimeline();Array.isArray(o)&&o.length>0&&p(o)}catch(t){console.error("Error fetching data:",t)}finally{N(!1)}})},[]);const w={timeline:b.length>0?b.map(a=>({year:a.year||"",event:a.event||a.title||"",description:a.description||""})):[{year:"2013",event:"Started journey in fashion design",description:"Began apprenticeship with master artisans"},{year:"2015",event:"Established VN Fashion",description:"Launched custom design studio"},{year:"2017",event:"First bridal collection",description:"Created exclusive bridal wear line"},{year:"2019",event:"Award recognition",description:"Received recognition for traditional craftsmanship"},{year:"2021",event:"500+ designs milestone",description:"Completed 500+ custom designs"},{year:"2024",event:"Expanding services",description:"Added costume rental and expanded offerings"}]};i.useEffect(()=>{f(void 0,null,function*(){try{const t=yield y.getCertificates();Array.isArray(t)&&t.length>0&&m(t)}catch(t){console.error("Error fetching certificates:",t),m([])}})},[]);const E=a=>a.split("").map((t,o)=>e.jsx("span",{ref:T=>d.current[o]=T,className:"inline-block",style:{opacity:0},children:t===" "?" ":t},o));return i.useEffect(()=>{const a=h.context(()=>{c.current&&h.fromTo(c.current,{opacity:0,y:50},{scrollTrigger:{trigger:l.current,start:"top 85%",toggleActions:"play none none reverse"},opacity:1,y:0,duration:1,ease:"power3.out"}),d.current.length>0&&h.to(d.current,{scrollTrigger:{trigger:s.current,start:"top 85%",toggleActions:"play none none reverse"},opacity:1,duration:.04,stagger:.01,ease:"power2.out"})},l);return()=>a.revert()},[j]),e.jsxs("div",{className:"ab-page-root min-h-screen bg-[#fbfbfa] text-gray-900 overflow-x-hidden relative font-sans",children:[e.jsx("div",{className:"ab-faded-bg","aria-hidden":"true",children:e.jsx("img",{src:"/VN-5.jpg",alt:"",onError:a=>{a.target.src=v(r.designerImage)||"/HeroBg.jpg",a.target.onerror=t=>{t.target.src="/HeroBg.jpg"}}})}),e.jsx("div",{className:"ab-grain","aria-hidden":"true"}),e.jsx(R,{}),e.jsxs("div",{ref:l,className:"pt-36 pb-12 px-8 lg:px-20 relative z-10 max-w-6xl mx-auto w-full",children:[e.jsxs(n.div,{className:"mb-16 text-left",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[e.jsx("p",{className:"text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold",children:"OUR HERITAGE — EST. 2024"}),e.jsxs("h1",{ref:c,className:"text-5xl sm:text-7xl lg:text-[6.5rem] font-light leading-[0.95] tracking-tight text-gray-955 mb-8",style:{fontFamily:"'Playfair Display', serif"},children:[e.jsx("em",{children:"The"})," Art",e.jsx("br",{}),e.jsx("span",{className:"bg-gradient-to-r from-[#b8860b] via-[#8b6914] to-[#c9a84c] bg-clip-text text-transparent italic font-normal",children:"of Sartorial Identity"})]}),e.jsx("div",{className:"w-24 h-[1px] bg-[#b8860b] mt-8"})]}),e.jsx(n.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:.1},className:"max-w-4xl mx-auto px-4 sm:px-8 mb-20 text-center",children:e.jsxs("p",{className:"text-lg sm:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed italic",style:{fontFamily:"'Playfair Display', serif"},children:['"',r.aboutText,'"']})})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-8 lg:px-20 mb-32 relative z-10",children:[e.jsxs(n.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},className:"relative group w-full col-span-1",children:[e.jsx("div",{className:"absolute -inset-3 border border-[#b8860b] opacity-25 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"}),e.jsxs("div",{className:"w-full relative overflow-hidden bg-gray-100 aspect-[3/4] border border-gray-200/50 shadow-md",children:[e.jsx("img",{src:"/vidisha.jpg",alt:r.designerName||"Vidisha",className:"w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105",onError:a=>{a.target.src=v(r.designerImage)||"/Me.jpg",a.target.onerror=t=>{t.target.src="/Me.jpg"}}}),e.jsx("div",{className:"absolute inset-0 bg-[rgba(212,175,55,0.04)] mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"})]})]}),e.jsxs(n.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:.1},className:"bg-white border border-gray-150/70 p-8 rounded-sm shadow-sm flex flex-col justify-between",children:[e.jsxs("div",{children:[e.jsx("p",{className:"text-[9px] tracking-[0.25em] uppercase text-[#b8860b] mb-2 font-bold",children:"THE DESIGNER"}),e.jsx("h3",{className:"text-3xl font-light text-gray-950 mb-1",style:{fontFamily:"'Playfair Display', serif"},children:r.designerName||"Vidisha"}),e.jsx("p",{className:"text-[8px] tracking-[0.2em] uppercase text-gray-400 mb-6 font-semibold",children:r.designerTitle||"FOUNDER & CREATIVE DIRECTOR"}),e.jsx("p",{ref:s,className:"text-xs text-gray-650 leading-relaxed tracking-wide font-light mb-8",children:E(r.designerBio||"With a background in architectural texturing and years of apprenticeship under master artisans, VIDISHA NATEKAR brings together the best of both worlds. He creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.")})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 pt-6 border-t border-gray-100",children:[e.jsxs("div",{className:"flex flex-col gap-0.5",children:[e.jsx("span",{className:"text-[8px] tracking-[0.15em] uppercase text-[#b8860b] font-bold",children:"EXPERIENCE"}),e.jsx("span",{className:"text-base font-light text-gray-900",style:{fontFamily:"'Playfair Display', serif"},children:"10+ Years"})]}),e.jsxs("div",{className:"flex flex-col gap-0.5",children:[e.jsx("span",{className:"text-[8px] tracking-[0.15em] uppercase text-[#b8860b] font-bold",children:"MILESTONE"}),e.jsx("span",{className:"text-base font-light text-gray-900",style:{fontFamily:"'Playfair Display', serif"},children:"500+ Designs"})]})]})]}),e.jsxs(n.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:.2},className:"flex flex-col justify-between items-stretch bg-[#faf9f7] border border-gray-150/70 p-8 rounded-sm shadow-sm",children:[e.jsxs("div",{className:"flex justify-between items-center pb-6 border-b border-gray-200/60",children:[e.jsx("span",{className:"text-[9px] tracking-[0.3em] uppercase text-[#b8860b] font-bold",children:"VN STUDIO"}),e.jsx("span",{className:"text-[9px] tracking-[0.2em] uppercase text-gray-400",children:"EST. 2024"})]}),e.jsxs("div",{className:"py-6 flex-grow flex flex-col justify-center",children:[e.jsx("p",{className:"text-[8px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-4",children:"ACCREDITATIONS"}),g.length>0?e.jsx("div",{className:"flex flex-col gap-2.5",children:g.map((a,t)=>e.jsxs("div",{className:"text-[10px] tracking-[0.1em] text-gray-850 uppercase bg-white border border-gray-200/80 px-4 py-2.5 rounded-sm hover:border-[#b8860b] transition-all duration-300 shadow-xs hover:shadow-sm",children:["• ",a.title]},a._id||t))}):e.jsx("div",{className:"flex flex-col gap-2.5",children:["Traditional Textile Craft","Contemporary Silhouette Design","Artisanal Draping"].map((a,t)=>e.jsxs("div",{className:"text-[10px] tracking-[0.1em] text-gray-850 uppercase bg-white border border-gray-200/80 px-4 py-2.5 rounded-sm hover:border-[#b8860b] transition-all duration-300 shadow-xs hover:shadow-sm",children:["• ",a]},t))})]}),e.jsx("div",{className:"pt-6 border-t border-gray-200/60 text-center",children:e.jsx("p",{className:"text-[8px] tracking-[0.4em] uppercase text-gray-450",children:"COUTURE ATELIER"})})]})]}),e.jsxs("div",{className:"pt-28 border-t border-gray-200",children:[e.jsxs("div",{className:"max-w-6xl mx-auto w-full px-8 lg:px-20 mb-16",children:[e.jsx("p",{className:"text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold",children:"CHRONOLOGY"}),e.jsx("h2",{className:"text-4xl lg:text-5xl font-light text-gray-950 leading-tight",style:{fontFamily:"'Playfair Display', serif"},children:"Career Gallery"}),e.jsx("div",{className:"w-16 h-[1px] bg-[#b8860b] mt-6"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-8 lg:px-20 mb-32 relative z-10",children:w.timeline.map((a,t)=>e.jsxs(n.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-60px"},transition:{duration:.8,delay:t*.05},className:"group bg-white border border-gray-150/70 p-8 rounded-sm hover:border-[#b8860b]/35 hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[220px]",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-2xl font-light text-[#b8860b] italic block mb-2",style:{fontFamily:"'Playfair Display', serif"},children:a.year}),e.jsx("div",{className:"w-6 h-[1.5px] bg-[#b8860b] mb-4 transform scale-x-100 group-hover:scale-x-150 transition-transform duration-500 origin-left"}),e.jsx("h4",{className:"text-sm font-semibold text-gray-900 mb-2",children:a.event}),e.jsx("p",{className:"text-xs text-gray-500 leading-relaxed font-light tracking-wide",children:a.description})]}),e.jsxs("span",{className:"text-[8px] tracking-[0.15em] text-gray-400 uppercase mt-6 block",children:["PHASE 0",t+1]})]},t))})]}),e.jsxs(n.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},className:"mt-20 pt-20 border-t border-gray-200 text-center max-w-3xl mx-auto px-8 relative z-10",children:[e.jsx("p",{className:"text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-4 font-bold",children:"START YOUR EXPERIENCE"}),e.jsx("h3",{className:"text-4xl sm:text-5xl font-light text-gray-955 mb-8",style:{fontFamily:"'Playfair Display', serif"},children:"Begin Your Sartorial Journey"}),e.jsx("p",{className:"text-xs text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed font-light",children:"Let us construct an artifact of intentional identity tailored specifically to your silhouette. Book an appointment at our atelier."}),e.jsxs("div",{className:"flex justify-center gap-4 flex-wrap pb-16",children:[e.jsxs(u,{to:"/booking",className:"ab-page-btn ab-page-btn-primary",children:[e.jsx("span",{className:"ab-page-btn-fill"}),e.jsx("span",{className:"ab-page-btn-text",children:"Book Appointment"})]}),e.jsxs(u,{to:"/gallery",className:"ab-page-btn ab-page-btn-ghost",children:[e.jsx("span",{className:"ab-page-btn-fill"}),e.jsx("span",{className:"ab-page-btn-text",children:"Explore Collection"})]})]})]}),e.jsx(A,{}),e.jsx("style",{children:`
        /* Luxury film grain layer */
        .ab-page-root .ab-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          z-index: 5;
        }

        /* Faded background watermark */
        .ab-page-root .ab-faded-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.042;
          filter: grayscale(100%) contrast(1.05);
        }
        .ab-page-root .ab-faded-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Scoped signature buttons */
        .ab-page-btn {
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
        .ab-page-btn-fill {
          position: absolute;
          inset: 0;
          width: 0;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ab-page-btn-text {
          position: relative;
          z-index: 1;
        }
        .ab-page-btn-primary {
          background: #1a1a1a;
          color: #ffffff;
          border: 1.5px solid #1a1a1a;
        }
        .ab-page-btn-primary .ab-page-btn-fill {
          background: #b8860b;
        }
        .ab-page-btn-primary:hover .ab-page-btn-fill {
          width: 100%;
        }
        .ab-page-btn-ghost {
          background: transparent;
          color: #1a1a1a;
          border: 1.5px solid #1a1a1a;
        }
        .ab-page-btn-ghost .ab-page-btn-fill {
          background: #1a1a1a;
        }
        .ab-page-btn-ghost:hover {
          color: #ffffff;
        }
        .ab-page-btn-ghost:hover .ab-page-btn-fill {
          width: 100%;
        }
      `})]})};export{O as default};
