import{r as s,j as n}from"./react-BCcS7c0c.js";import"./@babel-m2JXyA6a.js";const B=()=>{const[S,u]=s.useState(!1),[w,c]=s.useState(""),[p,b]=s.useState("en-US"),[N,R]=s.useState(null),i=s.useRef(null),h=s.useRef(null),m=s.useRef(null),[x,l]=s.useState(""),[T,a]=s.useState(!0),j=[{no:"18",name:"Filipino",native:"Filipino",code:"tl-PH"}],C=()=>{const t=window.SpeechRecognition||window.webkitSpeechRecognition,o=new t;o.lang=p,o.interimResults=!0,m.current=o,i.current.classList.add("recording"),i.current.querySelector("p").innerHTML="Listening...",o.start();let e=[];o.onresult=r=>{const g=r.results[0][0].transcript;if(r.results[0].isFinal){c(D=>D+" "+g),l("");const f=new Blob(e,{type:"audio/wav"});R(f),k(f)}else l(g);a(!1)},o.onend=()=>{d()},o.onerror=r=>{d(),r.error==="no-speech"?alert("No speech was detected. Stopping..."):r.error==="audio-capture"?alert("No microphone was found. Ensure that a microphone is installed."):r.error==="not-allowed"?alert("Permission to use microphone is blocked."):r.error==="aborted"?alert("Listening Stopped."):alert("Error occurred in recognition: "+r.error)}},d=()=>{m.current.stop(),i.current.querySelector("p").innerHTML="Start Listening",i.current.classList.remove("recording"),u(!1)},L=()=>{S?d():(C(),u(!0))},k=t=>{const o=new FormData;o.append("audio",t,"audio.wav"),fetch("/api/upload-audio",{method:"POST",body:o}).then(e=>e.json()).then(e=>{console.log("Speech recognition result:",e),c(e.userSpeechText),a(!1)}).catch(e=>{console.error("Error uploading audio:",e)})},y=()=>{const t=h.current.innerText,o="speech.txt",e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),e.setAttribute("download",o),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)},v=()=>{c(""),l(""),a(!0)};return n.jsxs("div",{children:[n.jsx("div",{children:n.jsx("select",{id:"language",value:p,onChange:t=>b(t.target.value),children:j.map(t=>n.jsxs("option",{value:t.code,children:[t.name," (",t.native,")"]},t.no))})}),n.jsx("button",{className:"record",ref:i,onClick:L,children:n.jsx("p",{children:"Start Listening"})}),n.jsxs("div",{className:"result",ref:h,children:[n.jsx("p",{children:w}),x&&n.jsx("p",{className:"interim",children:x})]}),n.jsx("button",{className:"download",onClick:y,disabled:T,children:"Download"}),n.jsx("button",{className:"clear",onClick:v,children:"Clear"})]})};export{B as default};
