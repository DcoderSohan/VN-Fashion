var g=(r,n,i)=>new Promise((l,o)=>{var d=a=>{try{t(i.next(a))}catch(x){o(x)}},p=a=>{try{t(i.throw(a))}catch(x){o(x)}},t=a=>a.done?l(a.value):Promise.resolve(a.value).then(d,p);t((i=i.apply(r,n)).next())});import{r as c,j as e,L as b}from"./react-vendor-w04w0yOG.js";import{c as m,N as f,f as h,F as u}from"./index-DrAGCnwu.js";import{m as s}from"./framer-motion-D6rx1S5v.js";import"./vendor-Db1USzoO.js";import"./axios-BRaZGOG8.js";const E=()=>{const[r,n]=c.useState([]),[i,l]=c.useState(!0);c.useEffect(()=>{o()},[]);const o=()=>g(void 0,null,function*(){try{l(!0);const t=yield m.getServices();n(t||[])}catch(t){console.error("Error fetching services:",t),n([])}finally{l(!1)}}),d=[{_id:"1",title:"Bespoke Tailoring",description:"Exclusive custom apparel crafted to your precise measurements. Includes fabric consultation, custom pattern drafting, and multiple fittings for perfection.",price:"5000",category:"Couture"},{_id:"2",title:"Creative Direction",description:"Consultation and conceptual direction for luxury collections, fashion editorials, and brand styling to define unique aesthetic statements.",price:"15000",category:"Consulting"},{_id:"3",title:"Consultancy",description:"One-on-one personal style analysis, wardrobe curations, and wardrobe audits matching traditional artisan crafts with modern silhouettes.",price:"3000",category:"Styling"}],p=r.length>0?r:d;return c.useEffect(()=>{window.scrollTo(0,0)},[]),e.jsxs("div",{className:"ab-page-root min-h-screen bg-[#fbfbfa] text-gray-900 overflow-x-hidden relative font-sans",children:[e.jsx("div",{className:"ab-faded-bg","aria-hidden":"true",children:e.jsx("img",{src:"/VN-6.jpg",alt:"",onError:t=>{t.target.src="/HeroBg.jpg"}})}),e.jsx("div",{className:"ab-grain","aria-hidden":"true"}),e.jsx(f,{}),e.jsxs("div",{className:"pt-36 pb-12 px-8 lg:px-20 relative z-10 max-w-6xl mx-auto w-full",children:[e.jsxs(s.div,{className:"mb-16 text-left",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[e.jsx("p",{className:"text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold",children:"STUDIO OFFERINGS"}),e.jsxs("h1",{className:"text-5xl sm:text-7xl lg:text-[6.5rem] font-light leading-[0.95] tracking-tight text-gray-955 mb-8",style:{fontFamily:"'Playfair Display', serif"},children:[e.jsx("em",{children:"The"})," Offerings",e.jsx("br",{}),e.jsx("span",{className:"bg-gradient-to-r from-[#b8860b] via-[#8b6914] to-[#c9a84c] bg-clip-text text-transparent italic font-normal",children:"of Couture & Consultancy"})]}),e.jsx("div",{className:"w-24 h-[1px] bg-[#b8860b] mt-8"})]}),e.jsx(s.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:.1},className:"max-w-4xl mx-auto px-4 sm:px-8 mb-24 text-center",children:e.jsx("p",{className:"text-lg sm:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed italic",style:{fontFamily:"'Playfair Display', serif"},children:'"We construct bespoke sartorial experiences. VN Fashion offers intentional tailoring, custom silhouettes, and creative art direction for the modern identity."'})})]}),e.jsx("div",{className:"relative z-10 max-w-6xl mx-auto px-8 lg:px-20 mb-32",children:i?e.jsx("div",{className:"flex justify-center items-center py-24",children:e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8860b]"})}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch",children:p.map((t,a)=>e.jsxs(s.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8,delay:a*.1},className:"group bg-white border border-gray-150/70 p-8 rounded-sm shadow-sm hover:shadow-md hover:border-[#b8860b]/25 transition-all duration-500 flex flex-col justify-between min-h-[360px] relative",children:[e.jsxs("div",{className:"absolute top-4 right-4 font-light select-none pointer-events-none ab-outline-num z-0",style:{fontFamily:"'Playfair Display', serif"},children:["0",a+1]}),e.jsxs("div",{className:"relative z-10 flex-grow flex flex-col items-start",children:[e.jsx("span",{className:"text-[9px] tracking-[0.25em] text-[#b8860b] font-bold block mb-4 uppercase",children:t.category||"Atelier"}),e.jsx("h3",{className:"text-2xl font-light text-gray-950 mb-4",style:{fontFamily:"'Playfair Display', serif"},children:t.title}),e.jsx("p",{className:"text-xs text-gray-550 leading-relaxed mb-6 font-light tracking-wide flex-grow",children:t.description}),t.price&&e.jsxs("div",{className:"text-xs text-gray-600 font-semibold tracking-wider mb-8",children:["FROM ",h(t.price)]})]}),e.jsxs(b,{to:"/booking",state:{serviceId:t._id,serviceTitle:t.title,serviceDescription:t.description,servicePrice:t.price,serviceCategory:t.category},className:"ab-page-btn ab-page-btn-primary mt-auto w-full text-center justify-center relative z-10",children:[e.jsx("span",{className:"ab-page-btn-fill"}),e.jsx("span",{className:"ab-page-btn-text",children:"Book Appointment"})]})]},t._id))})}),e.jsx("div",{className:"pt-28 pb-12 px-8 lg:px-20 relative z-10 border-t border-gray-200",children:e.jsx("div",{className:"max-w-6xl mx-auto w-full",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",children:[e.jsxs(s.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},children:[e.jsx("p",{className:"text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold",children:"ATELIER CRAFT"}),e.jsx("h2",{className:"text-3xl sm:text-4xl font-light text-gray-955 leading-tight mb-6",style:{fontFamily:"'Playfair Display', serif"},children:"Meticulous Craftsmanship, Tailored Silhouettes"}),e.jsx("p",{className:"text-sm text-gray-600 leading-relaxed font-light mb-4",children:"Every garment created at our atelier is treated as a structural work of art. We combine traditional Indian handcrafts and embroidery with modern architectural silhouettes to draft pieces of unique, intentional identity."})]}),e.jsx("div",{className:"space-y-6",children:[{title:"Bespoke Fitting Sessions",desc:"Three rigorous fitting stages to ensure absolute anatomical precision and silhouette perfection."},{title:"Artisanal Hand Embroidery",desc:"Intricate Aari work and traditional threadwork crafted by generational master artisans."},{title:"Sourced Fine Textiles",desc:"Only the finest organic cotton, silks, brocades, and custom woven textiles make it to our cutting boards."}].map((t,a)=>e.jsxs(s.div,{initial:{opacity:0,x:20},whileInView:{opacity:1,x:0},viewport:{once:!0},transition:{duration:.8,delay:a*.15},className:"flex gap-6 items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0",children:[e.jsxs("span",{className:"text-lg font-light text-[#b8860b] italic",style:{fontFamily:"'Playfair Display', serif"},children:["0",a+1]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-900 mb-1",children:t.title}),e.jsx("p",{className:"text-xs text-gray-500 leading-relaxed font-light",children:t.desc})]})]},a))})]})})}),e.jsxs(s.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},className:"mt-20 pt-20 border-t border-gray-200 text-center max-w-3xl mx-auto px-8 relative z-10",children:[e.jsx("p",{className:"text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-4 font-bold",children:"START YOUR EXPERIENCE"}),e.jsx("h3",{className:"text-4xl sm:text-5xl font-light text-gray-955 mb-8",style:{fontFamily:"'Playfair Display', serif"},children:"Define Your Silhouette"}),e.jsx("p",{className:"text-xs text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed font-light",children:"Collaborate with us to draft a unique garment tailored specifically to your silhouette. Book a styling consultation."}),e.jsxs("div",{className:"flex justify-center gap-4 flex-wrap pb-16",children:[e.jsxs(b,{to:"/booking",className:"ab-page-btn ab-page-btn-primary",children:[e.jsx("span",{className:"ab-page-btn-fill"}),e.jsx("span",{className:"ab-page-btn-text",children:"Book Appointment"})]}),e.jsxs(b,{to:"/gallery",className:"ab-page-btn ab-page-btn-ghost",children:[e.jsx("span",{className:"ab-page-btn-fill"}),e.jsx("span",{className:"ab-page-btn-text",children:"Explore Collection"})]})]})]}),e.jsx(u,{}),e.jsx("style",{children:`
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

        /* Giant outline number behind cards */
        .ab-page-root .ab-outline-num {
          font-size: clamp(5rem, 10vw, 7rem);
          line-height: 1;
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(184, 134, 11, 0.12);
          opacity: 0.85;
          will-change: transform, opacity;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), -webkit-text-stroke 0.4s ease;
        }
        .group:hover .ab-outline-num {
          transform: translateY(-8px) scale(1.03);
          -webkit-text-stroke: 1px rgba(184, 134, 11, 0.25);
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
      `})]})};export{E as default};
