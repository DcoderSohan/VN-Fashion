var E=Object.defineProperty,M=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var T=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var N=(t,i,a)=>i in t?E(t,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[i]=a,f=(t,i)=>{for(var a in i||(i={}))T.call(i,a)&&N(t,a,i[a]);if(w)for(var a of w(i))W.call(i,a)&&N(t,a,i[a]);return t},u=(t,i)=>M(t,B(i));var S=(t,i,a)=>new Promise((b,l)=>{var p=n=>{try{c(a.next(n))}catch(x){l(x)}},y=n=>{try{c(a.throw(n))}catch(x){l(x)}},c=n=>n.done?b(n.value):Promise.resolve(n.value).then(p,y);c((a=a.apply(t,i)).next())});import{r as d,j as e,l as I,m as z,M as A,a as P,P as H,n as q}from"./react-vendor-w04w0yOG.js";import{N as G,F as V,c as $}from"./index-CUmwqc4k.js";import{E as D}from"./ErrorModal-CgiqvDIq.js";import{m,A as L}from"./framer-motion-D6rx1S5v.js";import"./vendor-Db1USzoO.js";import"./axios-BRaZGOG8.js";const X=()=>{const[t,i]=d.useState({firstName:"",lastName:"",email:"",phone:"",contactNumber:"",message:""}),[a,b]=d.useState(!1),[l,p]=d.useState(""),[y,c]=d.useState(!1),[n,x]=d.useState(""),[g,s]=d.useState(""),h=r=>{const{name:o,value:v}=r.target;i(u(f({},t),{[o]:v})),o==="email"&&p(v&&!v.includes("@gmail.com")?"Please enter a valid Gmail address (@gmail.com)":"")},C=r=>S(void 0,null,function*(){if(r.preventDefault(),!t.email.includes("@gmail.com")){p("Please enter a valid Gmail address (@gmail.com)");return}p("");try{yield $.createContact({firstName:t.firstName,lastName:t.lastName,email:t.email,phone:t.phone,contactNumber:t.contactNumber||t.phone,message:t.message}),b(!0),i({firstName:"",lastName:"",email:"",phone:"",contactNumber:"",message:""})}catch(o){console.error("Contact submit error:",o),x("Failed to send message. Please try again."),c(!0)}}),k=String.raw`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

    .cpage {
      background: #fbfbfa; color: #1a1a1a;
      font-family: 'Inter', sans-serif; min-height: 100vh; overflow-x: hidden; position: relative;
    }

    /* Film grain */
    .cpage::before {
      content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022; mix-blend-mode: multiply;
    }

    /* Faded watermark background */
    .cwm {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url('/VN-6.jpg');
      background-size: cover; background-position: center;
      opacity: 0.04; filter: grayscale(1);
    }

    .cbody { position: relative; z-index: 1; }

    /* Left accent panel */
    .c-left-panel {
      background: #1a1a1a; color: #fbfbfa;
      padding: clamp(48px, 8vw, 80px) clamp(28px, 5vw, 56px);
      display: flex; flex-direction: column; justify-content: space-between;
      min-height: 520px;
    }

    /* Form field — underline style */
    .cfield {
      position: relative; border-bottom: 1px solid #d4cfc8;
      transition: border-color 0.3s; padding-bottom: 10px; margin-bottom: 0;
    }
    .cfield.focused { border-bottom-color: #b8860b; }
    .cfield.has-error { border-bottom-color: #c0392b; }

    .cfield label {
      display: block; font-size: 0.58rem; letter-spacing: 0.22em;
      text-transform: uppercase; font-weight: 600; color: #999; margin-bottom: 6px;
      transition: color 0.3s;
    }
    .cfield.focused label { color: #b8860b; }
    .cfield.has-error label { color: #c0392b; }

    .cfield input, .cfield textarea {
      width: 100%; background: transparent; border: none; outline: none;
      font-size: 0.9rem; color: #1a1a1a; font-weight: 300;
      font-family: 'Inter', sans-serif; resize: none;
    }
    .cfield textarea { min-height: 90px; }

    /* Gold submit button */
    .csub-btn {
      display: flex; align-items: center; justify-content: center; gap: 12px;
      width: 100%; background: #1a1a1a; color: #fbfbfa;
      font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 600; padding: 18px 32px; border: none; cursor: pointer;
      transition: background 0.28s, color 0.28s; margin-top: 6px;
    }
    .csub-btn:hover { background: #b8860b; }

    /* Info pill */
    .c-info-pill {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .c-info-pill:last-child { border-bottom: none; }
    .c-info-icon {
      width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; color: #b8860b; margin-top: 2px;
    }
    .c-info-label {
      font-size: 0.56rem; letter-spacing: 0.2em; text-transform: uppercase;
      font-weight: 600; color: rgba(255,255,255,0.45); margin-bottom: 5px;
    }
    .c-info-value {
      font-size: 0.85rem; color: rgba(255,255,255,0.88); font-weight: 300; line-height: 1.55;
    }
    .c-info-value a { color: inherit; text-decoration: none; }
    .c-info-value a:hover { color: #b8860b; }

    /* Gold line */
    .gold-bar { width: 40px; height: 1.5px; background: #b8860b; }

    /* Success screen */
    .c-success {
      display: flex; flex-direction: column; align-items: flex-start;
      gap: 18px; padding: 48px 0;
    }

    /* Panel image overlay */
    .panel-img-wrap { position: relative; overflow: hidden; }
    .panel-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block;
      filter: grayscale(0.3); transition: transform 0.7s ease; }
    .panel-img-wrap:hover img { transform: scale(1.04); }

    /* Divider line */
    .c-divider { width: 1px; background: #e0dbd3; align-self: stretch; }
  `,j={fontFamily:"'Cormorant Garamond', serif"},F=[{icon:e.jsx(A,{size:14}),label:"Studio Address",value:"Mumbai Studio, Maharashtra, India"},{icon:e.jsx(P,{size:14}),label:"Email",value:e.jsx("a",{href:"mailto:info@vnfashion.com",children:"info@vnfashion.com"})},{icon:e.jsx(H,{size:14}),label:"Phone",value:e.jsx("a",{href:"tel:+917798370430",children:"+91 77983 70430"})},{icon:e.jsx(q,{size:14}),label:"Atelier Hours",value:e.jsxs(e.Fragment,{children:["Mon – Sat  |  10:00 AM – 07:00 PM",e.jsx("br",{}),"Sunday: Closed"]})}];return e.jsxs("div",{className:"cpage",children:[e.jsx("style",{children:k}),e.jsx("div",{className:"cwm"}),e.jsx(G,{}),e.jsxs("div",{className:"cbody",style:{paddingTop:"128px",paddingBottom:"0"},children:[e.jsx("div",{style:{padding:"0 clamp(20px,5vw,80px) 56px",maxWidth:"1380px",margin:"0 auto"},children:e.jsxs(m.div,{initial:{opacity:0,y:28},animate:{opacity:1,y:0},transition:{duration:.7,ease:[.22,.61,.36,1]},children:[e.jsx("p",{style:{fontSize:"0.62rem",letterSpacing:"0.28em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"16px"},children:"Get In Touch"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:"20px"},children:[e.jsxs("h1",{style:u(f({},j),{fontSize:"clamp(2.8rem, 7vw, 6.5rem)",fontWeight:300,lineHeight:.94,letterSpacing:"-0.02em",color:"#1a1a1a",margin:0}),children:["Shape the future",e.jsx("br",{}),e.jsx("em",{style:{fontStyle:"italic"},children:"of your style."})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",paddingBottom:"8px"},children:[e.jsx("div",{className:"gold-bar"}),e.jsx("p",{style:{fontSize:"0.78rem",color:"#888",fontWeight:300,maxWidth:"280px",lineHeight:1.65,margin:0},children:"Every great design starts with a dialogue. Tell us your vision."})]})]})]})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:"680px"},className:"contact-main-grid",children:[e.jsx("style",{children:`
            @media(max-width:900px){
              .contact-main-grid { grid-template-columns: 1fr !important; }
            }
          `}),e.jsxs(m.div,{className:"c-left-panel",initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{duration:.75,ease:[.22,.61,.36,1]},children:[e.jsxs("div",{className:"panel-img-wrap",style:{marginBottom:"40px",height:"220px"},children:[e.jsx("img",{src:"/HeroBg.jpg",alt:"VN Fashion Atelier"}),e.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 60%)"}}),e.jsx("div",{style:{position:"absolute",bottom:"18px",left:"18px"},children:e.jsx("span",{style:{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:600,color:"#b8860b"},children:"VN Fashion Atelier"})})]}),e.jsxs("div",{children:[e.jsxs("p",{style:u(f({},j),{fontSize:"1.5rem",fontWeight:300,color:"rgba(255,255,255,0.9)",lineHeight:1.3,marginBottom:"32px"}),children:['"Crafted for those who',e.jsx("br",{}),'dare to be distinct."']}),e.jsx("div",{children:F.map((r,o)=>e.jsxs("div",{className:"c-info-pill",children:[e.jsx("div",{className:"c-info-icon",children:r.icon}),e.jsxs("div",{children:[e.jsx("p",{className:"c-info-label",children:r.label}),e.jsx("p",{className:"c-info-value",children:r.value})]})]},o))})]})]}),e.jsx(m.div,{style:{background:"#fbfbfa",padding:"clamp(40px,6vw,72px) clamp(24px,5vw,56px)"},initial:{opacity:0,x:30},animate:{opacity:1,x:0},transition:{duration:.75,ease:[.22,.61,.36,1],delay:.1},children:e.jsx(L,{mode:"wait",children:a?e.jsxs(m.div,{className:"c-success",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.5},children:[e.jsx("div",{style:{width:"52px",height:"52px",borderRadius:"50%",border:"1.5px solid #b8860b",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(I,{size:22,color:"#b8860b",strokeWidth:1.5})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.6rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"10px"},children:"Message Sent"}),e.jsx("h3",{style:u(f({},j),{fontSize:"2.5rem",fontWeight:300,color:"#1a1a1a",lineHeight:1.1,marginBottom:"12px"}),children:"Thank you."}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#888",lineHeight:1.75,fontWeight:300,maxWidth:"340px"},children:"Your message has been received. Our atelier team will be in touch with you shortly."})]}),e.jsxs("button",{onClick:()=>b(!1),style:{fontSize:"0.62rem",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#1a1a1a",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",padding:0,marginTop:"8px"},children:["Send Another Message ",e.jsx(z,{size:14})]})]},"success"):e.jsxs(m.form,{onSubmit:C,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4},children:[e.jsx("p",{style:{fontSize:"0.6rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"32px"},children:"Send a Message"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"},children:[e.jsxs("div",{className:`cfield${g==="firstName"?" focused":""}`,children:[e.jsx("label",{htmlFor:"firstName",children:"First Name *"}),e.jsx("input",{id:"firstName",name:"firstName",type:"text",required:!0,value:t.firstName,onChange:h,onFocus:()=>s("firstName"),onBlur:()=>s(""),placeholder:"Vidisha"})]}),e.jsxs("div",{className:`cfield${g==="lastName"?" focused":""}`,children:[e.jsx("label",{htmlFor:"lastName",children:"Last Name *"}),e.jsx("input",{id:"lastName",name:"lastName",type:"text",required:!0,value:t.lastName,onChange:h,onFocus:()=>s("lastName"),onBlur:()=>s(""),placeholder:"Natekar"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"},children:[e.jsxs("div",{className:`cfield${g==="email"?" focused":""}${l?" has-error":""}`,children:[e.jsx("label",{htmlFor:"email",children:l||"Email Address *"}),e.jsx("input",{id:"email",name:"email",type:"email",required:!0,value:t.email,onChange:h,onFocus:()=>s("email"),onBlur:()=>s(""),placeholder:"hello@gmail.com"})]}),e.jsxs("div",{className:`cfield${g==="phone"?" focused":""}`,children:[e.jsx("label",{htmlFor:"phone",children:"Phone Number *"}),e.jsx("input",{id:"phone",name:"phone",type:"tel",required:!0,value:t.phone,onChange:h,onFocus:()=>s("phone"),onBlur:()=>s(""),placeholder:"+91 98765 43210"})]})]}),e.jsxs("div",{className:`cfield${g==="message"?" focused":""}`,style:{marginBottom:"36px"},children:[e.jsx("label",{htmlFor:"message",children:"Your Message *"}),e.jsx("textarea",{id:"message",name:"message",required:!0,value:t.message,onChange:h,onFocus:()=>s("message"),onBlur:()=>s(""),placeholder:"Tell us about your vision, project, or inquiry...",rows:5})]}),e.jsxs("button",{type:"submit",className:"csub-btn",children:["Send Message ",e.jsx(z,{size:15})]}),e.jsx("p",{style:{fontSize:"0.62rem",color:"#aaa",marginTop:"16px",fontWeight:300,textAlign:"center",lineHeight:1.6},children:"We typically respond within 1–2 business days."})]},"form")})})]}),e.jsxs(m.div,{style:{borderTop:"1px solid #e0dbd3",padding:"28px clamp(20px,5vw,80px)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"18px",background:"#fbfbfa",position:"relative",zIndex:1},initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.7},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsx("div",{className:"gold-bar"}),e.jsx("span",{style:{fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:600,color:"#888"},children:"VN Fashion — Mumbai Atelier"})]}),e.jsx("div",{style:{display:"flex",gap:"24px"},children:["Instagram","Pinterest","Behance"].map(r=>e.jsx("a",{href:"#",style:{fontSize:"0.62rem",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:600,color:"#888",textDecoration:"none",transition:"color 0.2s"},onMouseEnter:o=>o.target.style.color="#b8860b",onMouseLeave:o=>o.target.style.color="#888",children:r},r))})]})]}),e.jsx(V,{}),e.jsx(D,{isOpen:y,onClose:()=>c(!1),title:"Error",message:n})]})};export{X as default};
