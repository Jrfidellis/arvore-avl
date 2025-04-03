var n=class{valor;esquerda;direita;constructor(e){this.valor=e,this.esquerda=null,this.direita=null}},u=class{constructor(e=r=>{}){this.visitar=e}raiz=null;nos=[];inserir(e){if(this.raiz===null){let r=new n(e);this.raiz=r,this.nos.push(r)}else this.inserirRecursivo(this.raiz,e)}inserirRecursivo(e,r){let i=new n(r);if(r<e.valor)e.esquerda===null?(e.esquerda=i,this.nos.push(i)):this.inserirRecursivo(e.esquerda,r);else if(r>e.valor)e.direita===null?(e.direita=i,this.nos.push(i)):this.inserirRecursivo(e.direita,r);else{globalThis.alert("Elemento j\xE1 existe na \xE1rvore");return}this.balancear(e)}balancear(e){let r=this.procurarPai(e.valor),i=this.calculaFatorDeBalanceamento(e),a=e;return i>1?(this.calculaFatorDeBalanceamento(e.esquerda)<0&&(e.esquerda=this.rotacaoEsquerda(e.esquerda)),a=this.rotacaoDireita(e)):i<-1&&(this.calculaFatorDeBalanceamento(e.direita)>0&&(e.direita=this.rotacaoDireita(e.direita)),a=this.rotacaoEsquerda(e)),r===null?this.raiz=a:r.esquerda===e?r.esquerda=a:r.direita=a,a}rotacaoDireita(e){let r=e.esquerda;if(!r)return e;let i=r.direita;return r.direita=e,e.esquerda=i,r}rotacaoEsquerda(e){let r=e.direita;if(!r)return e;let i=r.esquerda;return r.esquerda=e,e.direita=i,r}calculaFatorDeBalanceamento(e){let r=this.calculaAltura(e.esquerda),i=this.calculaAltura(e.direita);return r-i}calculaAltura(e,r=0){return e===null?r:Math.max(this.calculaAltura(e.esquerda,r+1),this.calculaAltura(e.direita,r+1))}pesquisar(e){let{no:r}=this.pesquisarComNo(this.raiz,e);return r}procurarPai(e){let{noAnterior:r}=this.pesquisarComNo(this.raiz,e);return r}pesquisarComNo(e,r){let i=null;for(;e!=null;){if(this.visitar(e),r==e.valor)return{no:e,noAnterior:i};r<e.valor?(i=e,e=e.esquerda):(i=e,e=e.direita)}return{no:null,noAnterior:null}}deletarPorCopia(e){let r=this.pesquisar(e);if(r==null){globalThis.alert("elemento n\xE3o est\xE1 na \xE1rvore");return}if(this.raiz==null){globalThis.alert("\xE1rvore est\xE1 vazia");return}if(r==this.raiz){this.raiz=null;return}let i=this.procurarPai(e);if(!i)throw new Error("pai de "+e+" n\xE3o encontrado");if(r.direita==null)r===this.raiz?(this.raiz,r.esquerda):i.esquerda===r?i.esquerda=r.esquerda:i.direita=r.esquerda;else if(r.esquerda===null)r===this.raiz?(this.raiz,r.direita):i.esquerda===r?i.esquerda=r.direita:i.direita=r.direita;else{let a=r.esquerda;for(;a.direita!=null;)a=a.direita;this.deletarPorCopia(a.valor),r.valor=a.valor}}deletarPorFusao(e){let r=this.pesquisar(e);if(r==null){globalThis.alert("elemento n\xE3o est\xE1 na \xE1rvore");return}if(this.raiz==null){globalThis.alert("\xE1rvore est\xE1 vazia");return}if(r==this.raiz){this.raiz=null;return}let i=this.procurarPai(e);if(!i)throw new Error("pai de "+e+" n\xE3o encontrado");if(r.direita==null)r===this.raiz?(this.raiz,r.esquerda):i.esquerda===r?i.esquerda=r.esquerda:i.direita=r.esquerda;else if(r.esquerda===null)r===this.raiz?(this.raiz,r.direita):i.esquerda===r?i.esquerda=r.direita:i.direita=r.direita;else{let a=r.esquerda;for(;a.direita!=null;)a=a.direita;a.direita=r.direita,this.raiz==r?this.raiz=r.esquerda:i.esquerda==r?i.esquerda=r.esquerda:i.direita=r.esquerda}}preordem(){let e=[];return this.preordemRecursivo(this.raiz,e),e}preordemRecursivo(e,r=[]){e!=null&&(r.push(e.valor),this.preordemRecursivo(e.esquerda,r),this.preordemRecursivo(e.direita,r))}emOrdem(){let e=[];return this.emOrdemRecursivo(this.raiz,e),e}emOrdemRecursivo(e,r=[]){e!=null&&(this.emOrdemRecursivo(e.esquerda,r),r.push(e.valor),this.emOrdemRecursivo(e.direita,r))}posOrdem(){let e=[];return this.posOrdemRecursivo(this.raiz,e),e}posOrdemRecursivo(e,r=[]){e!=null&&(this.posOrdemRecursivo(e.esquerda,r),this.posOrdemRecursivo(e.direita,r),r.push(e.valor))}};var o=[];function c(t){t!=null&&o.push(t)}function h(t){return new Promise(e=>{let r=document.getElementById(t.valor.toString());r?.style.setProperty("background-color","red"),setTimeout(()=>{r?.style.setProperty("background-color","#4caf50"),e(!0)},500)})}var s=new u(c);async function l(t=!1){let e=document.getElementById("main");if(e){e.innerHTML="";let r=document.createElement("ul");e.appendChild(r);let i=document.createElement("li");s.raiz?i.innerHTML=`<div id="${s.raiz?.valor}" class="no">${s.raiz?.valor}</div>`:i.innerHTML='<div class="no">\xC1rvore vazia</div>',r.appendChild(i),d(s.raiz,i)}if(t)for(let r of o)await h(r);o=[]}function d(t,e,r=0){if(t==null)return;let i=document.createElement("ul");if(e.appendChild(i),t.esquerda!=null){let a=document.createElement("li");a.innerHTML=`<div id="${t.esquerda?.valor}" class="no">${t.esquerda?.valor??""}</div>`,i.appendChild(a),d(t.esquerda,a,r+1)}else{let a=document.createElement("li");a.innerHTML="<span></span>",i.appendChild(a)}if(t.direita!=null){let a=document.createElement("li");a.innerHTML=`<div id="${t.direita?.valor}" class="no">${t.direita?.valor??""}</div>`,i.appendChild(a),d(t.direita,a,r+1)}else{let a=document.createElement("li");a.innerHTML="<span></span>",i.appendChild(a)}}globalThis.inserir=function(t){s.inserir(t),l()};globalThis.pesquisar=function(t){let e=s.pesquisar(t);if(!e){alert("Valor n\xE3o encontrado");return}alert("Fator de balanceamento do n\xF3 \xE9 "+s.calculaFatorDeBalanceamento(e)),l(!0)};globalThis.deletarPorCopia=function(t){s.deletarPorCopia(t),l()};globalThis.deletarPorFusao=function(t){s.deletarPorFusao(t),l()};globalThis.limpar=function(){s=new u(c),l()};l();
