var ae=Object.defineProperty,re=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var O=(s,n,o)=>n in s?ae(s,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[n]=o,c=(s,n)=>{for(var o in n||(n={}))ne.call(n,o)&&O(s,o,n[o]);if(L)for(var o of L(n))le.call(n,o)&&O(s,o,n[o]);return s},m=(s,n)=>re(s,oe(n));var I=(s,n,o)=>new Promise((h,j)=>{var u=t=>{try{r(o.next(t))}catch(p){j(p)}},l=t=>{try{r(o.throw(t))}catch(p){j(p)}},r=t=>t.done?h(t.value):Promise.resolve(t.value).then(u,l);r((o=o.apply(s,n)).next())});import{u as de,i as ce,r as d,j as e,k as V,l as me,m as U,n as pe,o as ge}from"./react-vendor-w04w0yOG.js";import{N as xe,g as fe,f as G,F as be,c as K}from"./index-CUmwqc4k.js";import{E as he}from"./ErrorModal-CgiqvDIq.js";import{m as f,A as ue}from"./framer-motion-D6rx1S5v.js";import"./vendor-Db1USzoO.js";import"./axios-BRaZGOG8.js";const ve=["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM"],Te=()=>{var k,B,P,z,W,F,M,E,A;const s=de(),n=ce(),[o,h]=d.useState([]),[j,u]=d.useState(!0),[l,r]=d.useState(""),[t,p]=d.useState({serviceId:((k=s.state)==null?void 0:k.serviceId)||"",serviceTitle:((B=s.state)==null?void 0:B.serviceTitle)||"",servicePrice:((P=s.state)==null?void 0:P.servicePrice)||"",serviceCategory:((z=s.state)==null?void 0:z.serviceCategory)||"",designId:((W=s.state)==null?void 0:W.designId)||"",designTitle:((F=s.state)==null?void 0:F.designTitle)||"",designCategory:((M=s.state)==null?void 0:M.designCategory)||"",designPrice:((E=s.state)==null?void 0:E.designPrice)||"",designImage:((A=s.state)==null?void 0:A.designImage)||"",date:"",time:"",firstName:"",lastName:"",email:"",phone:"",contactNumber:"",notes:""}),[J,S]=d.useState(!1),[b,C]=d.useState(null),[Q,N]=d.useState(!1),[X,T]=d.useState("");d.useEffect(()=>{I(void 0,null,function*(){try{u(!0);const a=yield K.getServices();h(a||[])}catch(a){console.error("Error fetching services:",a),h([])}finally{u(!1)}})},[]),d.useEffect(()=>{s.state&&p(i=>{var a,x,y,D,q,$,H,R,_;return m(c({},i),{serviceId:((a=s.state)==null?void 0:a.serviceId)||i.serviceId,serviceTitle:((x=s.state)==null?void 0:x.serviceTitle)||i.serviceTitle,servicePrice:((y=s.state)==null?void 0:y.servicePrice)||i.servicePrice,serviceCategory:((D=s.state)==null?void 0:D.serviceCategory)||i.serviceCategory,designId:((q=s.state)==null?void 0:q.designId)||i.designId,designTitle:(($=s.state)==null?void 0:$.designTitle)||i.designTitle,designCategory:((H=s.state)==null?void 0:H.designCategory)||i.designCategory,designPrice:((R=s.state)==null?void 0:R.designPrice)||i.designPrice,designImage:((_=s.state)==null?void 0:_.designImage)||i.designImage})})},[s.state]);const Y=new Date().toISOString().split("T")[0],w=new Date;w.setMonth(w.getMonth()+3);const Z=w.toISOString().split("T")[0],g=i=>{p(m(c({},t),{[i.target.name]:i.target.value}))},ee=i=>I(void 0,null,function*(){if(i.preventDefault(),!t.serviceId&&!t.designId||!t.date||!t.time||!t.firstName||!t.lastName||!t.email||!t.phone){T("Please fill in all required fields to place your order"),N(!0);return}try{const a={firstName:t.firstName,lastName:t.lastName,email:t.email,phone:t.phone,contactNumber:t.contactNumber||t.phone,serviceId:t.serviceId||"",serviceTitle:t.serviceTitle||"",servicePrice:t.servicePrice||"",serviceCategory:t.serviceCategory||"",designId:t.designId||"",designTitle:t.designTitle||"",designCategory:t.designCategory||"",designPrice:t.designPrice||"",designImage:t.designImage||"",date:t.date,time:t.time,notes:t.notes||"",status:"pending"},x=yield K.createBooking(a),y=m(c({},a),{_id:x._id,name:`${t.firstName} ${t.lastName}`,serviceName:t.serviceTitle||t.designTitle||"Custom Service",bookingId:`BK${x._id}`,submittedAt:new Date().toLocaleString()});C(y),S(!0),window.scrollTo({top:0,behavior:"smooth"})}catch(a){console.error("Error submitting order:",a),T("Failed to submit order. Please try again."),N(!0)}}),te=()=>{S(!1),C(null),p({serviceId:"",serviceTitle:"",servicePrice:"",serviceCategory:"",designId:"",designTitle:"",designCategory:"",designPrice:"",designImage:"",date:"",time:"",firstName:"",lastName:"",email:"",phone:"",contactNumber:"",notes:""})},v={fontFamily:"'Cormorant Garamond', serif"},ie=`
    .bpage {
      background: #fbfbfa;
      color: #1a1a1a;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    .bpage::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022;
      mix-blend-mode: multiply;
    }
    .bwm {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url('/VN-3.jpg');
      background-size: cover;
      background-position: center;
      opacity: 0.04;
      filter: grayscale(1);
    }
    .bbody { position: relative; z-index: 1; }
    .b-left-panel {
      background: #1a1a1a;
      color: #fbfbfa;
      padding: clamp(48px, 8vw, 80px) clamp(28px, 5vw, 56px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 520px;
    }
    .bfield {
      position: relative;
      border-bottom: 1px solid #d4cfc8;
      transition: border-color 0.3s;
      padding-bottom: 10px;
      margin-bottom: 0;
    }
    .bfield.focused { border-bottom-color: #b8860b; }
    .bfield label {
      display: block;
      font-size: 0.58rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-weight: 600;
      color: #999;
      margin-bottom: 6px;
      transition: color 0.3s;
    }
    .bfield.focused label { color: #b8860b; }
    .bfield input,
    .bfield select,
    .bfield textarea {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.9rem;
      color: #1a1a1a;
      font-weight: 300;
      font-family: 'Inter', sans-serif;
      resize: none;
      cursor: pointer;
    }
    .bfield select option { background: #fff; color: #1a1a1a; }
    .bfield textarea { min-height: 80px; }
    .bsub-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      background: #1a1a1a;
      color: #fbfbfa;
      font-size: 0.62rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 600;
      padding: 18px 32px;
      border: none;
      cursor: pointer;
      transition: background 0.28s, color 0.28s;
      margin-top: 6px;
    }
    .bsub-btn:hover { background: #b8860b; }
    .b-info-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .b-info-item:last-child { border-bottom: none; }
    .b-info-icon {
      width: 34px;
      height: 34px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #b8860b;
      margin-top: 2px;
    }
    .b-info-label {
      font-size: 0.56rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 600;
      color: rgba(255,255,255,0.45);
      margin-bottom: 5px;
    }
    .b-info-value {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.88);
      font-weight: 300;
      line-height: 1.55;
    }
    .gold-bar-b { width: 40px; height: 1.5px; background: #b8860b; }
    .b-design-preview {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.12);
      margin-bottom: 20px;
    }
    .b-design-preview img {
      width: 100%;
      object-fit: cover;
      display: block;
      filter: grayscale(0.3);
      transition: transform 0.7s ease;
      aspect-ratio: 3/4;
    }
    .b-design-preview:hover img { transform: scale(1.04); }
    .b-success {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
      padding: 48px 0;
    }
    .booking-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 700px;
    }
    @media (max-width: 900px) {
      .booking-main-grid { grid-template-columns: 1fr !important; }
    }
  `,se=[{icon:e.jsx(V,{size:14}),label:"Atelier Service",value:"Bespoke Tailoring & Fittings"},{icon:e.jsx(pe,{size:14}),label:"Working Hours",value:e.jsxs("span",{children:["Mon – Sat | 10:00 AM – 07:00 PM",e.jsx("br",{}),"Sunday: Closed"]})},{icon:e.jsx(ge,{size:14}),label:"Booking Window",value:"Up to 3 months in advance"}];return e.jsxs("div",{className:"bpage",children:[e.jsx("style",{children:ie}),e.jsx("div",{className:"bwm"}),e.jsx(xe,{}),e.jsxs("div",{className:"bbody",style:{paddingTop:"128px",paddingBottom:"0"},children:[e.jsx("div",{style:{padding:"0 clamp(20px,5vw,80px) 56px",maxWidth:"1380px",margin:"0 auto"},children:e.jsxs(f.div,{initial:{opacity:0,y:28},animate:{opacity:1,y:0},transition:{duration:.7,ease:[.22,.61,.36,1]},children:[e.jsx("p",{style:{fontSize:"0.62rem",letterSpacing:"0.28em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"16px"},children:"Appointments & Consultations"}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:"20px"},children:[e.jsxs("h1",{style:m(c({},v),{fontSize:"clamp(2.8rem, 7vw, 6.5rem)",fontWeight:300,lineHeight:.94,letterSpacing:"-0.02em",color:"#1a1a1a",margin:0}),children:["Request a",e.jsx("br",{}),e.jsx("em",{style:{fontStyle:"italic"},children:"Consultation."})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",paddingBottom:"8px"},children:[e.jsx("div",{className:"gold-bar-b"}),e.jsx("p",{style:{fontSize:"0.78rem",color:"#888",fontWeight:300,maxWidth:"280px",lineHeight:1.65,margin:0},children:"Reserve your fitting session with our master artisans at the VN Fashion Atelier."})]})]})]})}),e.jsxs("div",{className:"booking-main-grid",children:[e.jsxs(f.div,{className:"b-left-panel",initial:{opacity:0,x:-30},animate:{opacity:1,x:0},transition:{duration:.75,ease:[.22,.61,.36,1]},children:[t.designImage&&t.designTitle?e.jsxs("div",{className:"b-design-preview",children:[e.jsx("img",{src:fe(t.designImage),alt:t.designTitle,onError:i=>{i.target.style.display="none"}}),e.jsx("div",{style:{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:"linear-gradient(to top, rgba(0,0,0,0.7), transparent)"}}),e.jsx("div",{style:{position:"absolute",bottom:"14px",left:"14px"},children:e.jsx("span",{style:{fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:600,color:"#b8860b"},children:t.designCategory})})]}):e.jsxs("div",{style:{marginBottom:"40px"},children:[e.jsx("div",{style:{width:"52px",height:"52px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"20px"},children:e.jsx(V,{size:20,color:"#b8860b",strokeWidth:1.5})}),e.jsxs("p",{style:m(c({},v),{fontSize:"1.5rem",fontWeight:300,color:"rgba(255,255,255,0.9)",lineHeight:1.3,marginBottom:"8px"}),children:['"Crafted for those who',e.jsx("br",{}),'dare to be distinct."']})]}),(t.designTitle||t.serviceTitle)&&e.jsxs("div",{style:{marginBottom:"24px",paddingBottom:"24px",borderBottom:"1px solid rgba(255,255,255,0.1)"},children:[e.jsx("p",{style:{fontSize:"0.56rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.45)",fontWeight:600,marginBottom:"6px"},children:"Selected Item"}),e.jsx("p",{style:m(c({},v),{fontSize:"1.3rem",fontWeight:300,color:"rgba(255,255,255,0.9)",marginBottom:"4px"}),children:t.designTitle||t.serviceTitle}),(t.designPrice||t.servicePrice)&&e.jsx("p",{style:{fontSize:"0.75rem",color:"#b8860b",fontWeight:500,letterSpacing:"0.1em"},children:G(t.designPrice||t.servicePrice)})]}),e.jsx("div",{children:se.map((i,a)=>e.jsxs("div",{className:"b-info-item",children:[e.jsx("div",{className:"b-info-icon",children:i.icon}),e.jsxs("div",{children:[e.jsx("p",{className:"b-info-label",children:i.label}),e.jsx("p",{className:"b-info-value",children:i.value})]})]},a))})]}),e.jsx(f.div,{style:{background:"#fbfbfa",padding:"clamp(40px,6vw,72px) clamp(24px,5vw,56px)"},initial:{opacity:0,x:30},animate:{opacity:1,x:0},transition:{duration:.75,ease:[.22,.61,.36,1],delay:.1},children:e.jsx(ue,{mode:"wait",children:J?e.jsxs(f.div,{className:"b-success",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.5},children:[e.jsx("div",{style:{width:"52px",height:"52px",borderRadius:"50%",border:"1.5px solid #b8860b",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(me,{size:22,color:"#b8860b",strokeWidth:1.5})}),e.jsxs("div",{children:[e.jsx("p",{style:{fontSize:"0.6rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"10px"},children:"Booking Confirmed"}),e.jsx("h3",{style:m(c({},v),{fontSize:"2.5rem",fontWeight:300,color:"#1a1a1a",lineHeight:1.1,marginBottom:"12px"}),children:"Booking Placed."}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#888",lineHeight:1.75,fontWeight:300,maxWidth:"340px",marginBottom:"24px"},children:"Thank you! We will review your consultation request and contact you shortly at your email or phone number."}),b&&e.jsx("div",{style:{borderTop:"1px solid #e0dbd3",borderBottom:"1px solid #e0dbd3",padding:"20px 0",marginBottom:"24px",display:"flex",flexDirection:"column",gap:"12px",maxWidth:"360px"},children:[{label:"Order ID",value:b.bookingId},{label:"Item",value:b.serviceName},{label:"Date",value:b.date},{label:"Time",value:b.time}].map(i=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"0.58rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:600,color:"#aaa"},children:i.label}),e.jsx("span",{style:{fontSize:"0.8rem",fontWeight:400,color:"#1a1a1a"},children:i.value})]},i.label))})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[e.jsxs("button",{onClick:te,style:{fontSize:"0.62rem",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#fbfbfa",background:"#1a1a1a",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",padding:"14px 24px"},children:["Book Another ",e.jsx(U,{size:14})]}),e.jsx("button",{onClick:()=>n("/"),style:{fontSize:"0.62rem",letterSpacing:"0.25em",textTransform:"uppercase",fontWeight:600,color:"#1a1a1a",background:"transparent",border:"1px solid #d4cfc8",cursor:"pointer",padding:"14px 24px"},children:"Back Home"})]})]},"success"):e.jsxs(f.form,{onSubmit:ee,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4},children:[e.jsx("p",{style:{fontSize:"0.6rem",letterSpacing:"0.22em",textTransform:"uppercase",fontWeight:600,color:"#b8860b",marginBottom:"32px"},children:"Appointment Details"}),e.jsx("div",{style:{marginBottom:"28px"},children:e.jsxs("div",{className:`bfield${l==="serviceId"?" focused":""}`,children:[e.jsx("label",{htmlFor:"serviceId",children:"Select Service *"}),e.jsxs("select",{id:"serviceId",name:"serviceId",value:t.serviceId,onChange:i=>{const a=o.find(x=>x._id===i.target.value);p(m(c({},t),{serviceId:i.target.value,serviceTitle:(a==null?void 0:a.title)||"",servicePrice:(a==null?void 0:a.price)||"",serviceCategory:(a==null?void 0:a.category)||"",designId:i.target.value?"":t.designId,designTitle:i.target.value?"":t.designTitle,designCategory:i.target.value?"":t.designCategory,designPrice:i.target.value?"":t.designPrice}))},required:!t.serviceTitle&&!t.designTitle,onFocus:()=>r("serviceId"),onBlur:()=>r(""),children:[e.jsx("option",{value:"",children:"Choose a service..."}),o.map(i=>e.jsxs("option",{value:i._id,children:[i.title," ",i.price?`— ${G(i.price)}`:""]},i._id))]})]})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"},children:[e.jsxs("div",{className:`bfield${l==="date"?" focused":""}`,children:[e.jsx("label",{htmlFor:"date",children:"Date *"}),e.jsx("input",{id:"date",type:"date",name:"date",value:t.date,onChange:g,min:Y,max:Z,required:!0,onFocus:()=>r("date"),onBlur:()=>r("")})]}),e.jsxs("div",{className:`bfield${l==="time"?" focused":""}`,children:[e.jsx("label",{htmlFor:"time",children:"Time Slot *"}),e.jsxs("select",{id:"time",name:"time",value:t.time,onChange:g,required:!0,onFocus:()=>r("time"),onBlur:()=>r(""),children:[e.jsx("option",{value:"",children:"Choose a time..."}),ve.map(i=>e.jsx("option",{value:i,children:i},i))]})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"},children:[e.jsxs("div",{className:`bfield${l==="firstName"?" focused":""}`,children:[e.jsx("label",{htmlFor:"firstName",children:"First Name *"}),e.jsx("input",{id:"firstName",type:"text",name:"firstName",required:!0,value:t.firstName,onChange:g,onFocus:()=>r("firstName"),onBlur:()=>r(""),placeholder:"Vidisha"})]}),e.jsxs("div",{className:`bfield${l==="lastName"?" focused":""}`,children:[e.jsx("label",{htmlFor:"lastName",children:"Last Name *"}),e.jsx("input",{id:"lastName",type:"text",name:"lastName",required:!0,value:t.lastName,onChange:g,onFocus:()=>r("lastName"),onBlur:()=>r(""),placeholder:"Natekar"})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"28px"},children:[e.jsxs("div",{className:`bfield${l==="email"?" focused":""}`,children:[e.jsx("label",{htmlFor:"email",children:"Email Address *"}),e.jsx("input",{id:"email",type:"email",name:"email",required:!0,value:t.email,onChange:g,onFocus:()=>r("email"),onBlur:()=>r(""),placeholder:"hello@gmail.com"})]}),e.jsxs("div",{className:`bfield${l==="phone"?" focused":""}`,children:[e.jsx("label",{htmlFor:"phone",children:"Phone Number *"}),e.jsx("input",{id:"phone",type:"tel",name:"phone",required:!0,value:t.phone,onChange:g,onFocus:()=>r("phone"),onBlur:()=>r(""),placeholder:"+91 98765 43210"})]})]}),e.jsxs("div",{className:`bfield${l==="notes"?" focused":""}`,style:{marginBottom:"36px"},children:[e.jsx("label",{htmlFor:"notes",children:"Additional Notes"}),e.jsx("textarea",{id:"notes",name:"notes",rows:4,value:t.notes,onChange:g,onFocus:()=>r("notes"),onBlur:()=>r(""),placeholder:"Tell us about your vision, specific requirements, or preferred fabric..."})]}),e.jsxs("button",{type:"submit",className:"bsub-btn",children:["Place Appointment Request ",e.jsx(U,{size:15})]}),e.jsx("p",{style:{fontSize:"0.62rem",color:"#aaa",marginTop:"16px",fontWeight:300,textAlign:"center",lineHeight:1.6},children:"We typically respond within 1–2 business days to confirm your slot."})]},"form")})})]}),e.jsxs(f.div,{style:{borderTop:"1px solid #e0dbd3",padding:"28px clamp(20px,5vw,80px)",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"18px",background:"#fbfbfa",position:"relative",zIndex:1},initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.7},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e.jsx("div",{className:"gold-bar-b"}),e.jsx("span",{style:{fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",fontWeight:600,color:"#888"},children:"VN Fashion — Mumbai Atelier"})]}),e.jsx("div",{style:{display:"flex",gap:"24px"},children:["Instagram","Pinterest","Behance"].map(i=>e.jsx("a",{href:"#",style:{fontSize:"0.62rem",letterSpacing:"0.18em",textTransform:"uppercase",fontWeight:600,color:"#888",textDecoration:"none",transition:"color 0.2s"},onMouseEnter:a=>a.target.style.color="#b8860b",onMouseLeave:a=>a.target.style.color="#888",children:i},i))})]})]}),e.jsx(be,{}),e.jsx(he,{isOpen:Q,onClose:()=>N(!1),title:"Error",message:X})]})};export{Te as default};
