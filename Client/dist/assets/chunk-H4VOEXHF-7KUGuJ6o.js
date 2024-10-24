import{t as Q,j as X,h as V,u as W,f as I,n as Y,H as Z,I as ee,e as se,r as ae,q as te,v as oe,x as f,c as re,g as A,J as le}from"./chunk-DBLREEYE-BCf7xM7G.js";import{l as de,j as x,b as ne,r as v}from"./index-CTjF65Bf.js";var M=Q({slots:{base:["flex","flex-col","relative","overflow-hidden","h-auto","outline-none","text-foreground","box-border","bg-content1",...X],header:["flex","p-3","z-10","w-full","justify-start","items-center","shrink-0","overflow-inherit","color-inherit","subpixel-antialiased"],body:["relative","flex","flex-1","w-full","p-3","flex-auto","flex-col","place-content-inherit","align-items-inherit","h-auto","break-words","text-left","overflow-y-auto","subpixel-antialiased"],footer:["p-3","h-auto","flex","w-full","items-center","overflow-hidden","color-inherit","subpixel-antialiased"]},variants:{shadow:{none:{base:"shadow-none"},sm:{base:"shadow-small"},md:{base:"shadow-medium"},lg:{base:"shadow-large"}},radius:{none:{base:"rounded-none",header:"rounded-none",footer:"rounded-none"},sm:{base:"rounded-small",header:"rounded-t-small",footer:"rounded-b-small"},md:{base:"rounded-medium",header:"rounded-t-medium",footer:"rounded-b-medium"},lg:{base:"rounded-large",header:"rounded-t-large",footer:"rounded-b-large"}},fullWidth:{true:{base:"w-full"}},isHoverable:{true:{base:"data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2"}},isPressable:{true:{base:"cursor-pointer"}},isBlurred:{true:{base:["bg-background/80","dark:bg-background/20","backdrop-blur-md","backdrop-saturate-150"]}},isFooterBlurred:{true:{footer:["bg-background/10","backdrop-blur","backdrop-saturate-150"]}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:"",false:{base:"transition-transform-background motion-reduce:transition-none"}}},compoundVariants:[{isPressable:!0,class:"data-[pressed=true]:scale-[0.97] tap-highlight-transparent"}],defaultVariants:{radius:"lg",shadow:"md",fullWidth:!1,isHoverable:!1,isPressable:!1,isDisabled:!1,isFooterBlurred:!1}}),[ie,ue]=de({name:"CardContext",strict:!0,errorMessage:"useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"}),O=V((e,o)=>{var a;const{as:r,className:l,children:s,...i}=e,d=r||"div",u=W(o),{slots:t,classNames:p}=ue(),C=I(p==null?void 0:p.body,l);return x.jsx(d,{ref:u,className:(a=t.body)==null?void 0:a.call(t,{class:C}),...i,children:s})});O.displayName="NextUI.CardBody";var pe=O;function be(e){var o,a,r,l;const s=ne(),[i,d]=Y(e,M.variantKeys),{ref:u,as:t,children:p,onClick:C,onPress:T,autoFocus:E,className:U,classNames:b,allowTextSelectionOnPress:q=!0,...m}=i,c=W(u),D=t||(e.isPressable?"button":"div"),$=typeof D=="string",n=(a=(o=e.disableAnimation)!=null?o:s==null?void 0:s.disableAnimation)!=null?a:!1,g=(l=(r=e.disableRipple)!=null?r:s==null?void 0:s.disableRipple)!=null?l:!1,F=I(b==null?void 0:b.base,U),{onClick:z,onClear:H,ripples:N}=Z(),j=R=>{!n&&!g&&c.current&&z(R)},{buttonProps:B,isPressed:w}=ee({onPress:T,elementType:t,isDisabled:!e.isPressable,onClick:se(C,j),allowTextSelectionOnPress:q,...m},c),{hoverProps:P,isHovered:k}=ae({isDisabled:!e.isHoverable,...m}),{isFocusVisible:y,isFocused:J,focusProps:_}=te({autoFocus:E}),h=v.useMemo(()=>M({...d,disableAnimation:n}),[oe(d),n]),K=v.useMemo(()=>({slots:h,classNames:b,disableAnimation:n,isDisabled:e.isDisabled,isFooterBlurred:e.isFooterBlurred,fullWidth:e.fullWidth}),[h,b,e.isDisabled,e.isFooterBlurred,n,e.fullWidth]),G=v.useCallback((R={})=>({ref:c,className:h.base({class:F}),tabIndex:e.isPressable?0:-1,"data-hover":f(k),"data-pressed":f(w),"data-focus":f(J),"data-focus-visible":f(y),"data-disabled":f(e.isDisabled),...re(e.isPressable?{...B,..._,role:"button"}:{},e.isHoverable?P:{},A(m,{enabled:$}),A(R))}),[c,h,F,$,e.isPressable,e.isHoverable,e.isDisabled,k,w,y,B,_,P,m]),L=v.useCallback(()=>({ripples:N,onClear:H}),[N,H]);return{context:K,domRef:c,Component:D,classNames:b,children:p,isHovered:k,isPressed:w,disableAnimation:n,isPressable:e.isPressable,isHoverable:e.isHoverable,disableRipple:g,handleClick:j,isFocusVisible:y,getCardProps:G,getRippleProps:L}}var S=V((e,o)=>{const{children:a,context:r,Component:l,isPressable:s,disableAnimation:i,disableRipple:d,getCardProps:u,getRippleProps:t}=be({...e,ref:o});return x.jsxs(l,{...u(),children:[x.jsx(ie,{value:r,children:a}),s&&!i&&!d&&x.jsx(le,{...t()})]})});S.displayName="NextUI.Card";var me=S;export{pe as a,me as c,ue as u};