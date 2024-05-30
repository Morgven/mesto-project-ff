(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,o,c){var u=e.querySelector(".places__item.card").cloneNode(!0),i=u.querySelector(".card__title"),a=u.querySelector(".card__image"),l=u.querySelector(".card__like-button"),s=u.querySelector(".card__like-counter"),d=u.querySelector(".card__delete-button");return i.textContent=t.name,a.src=t.link,a.alt=t.name,s.textContent=t.likes.length,t.owner._id===r?d.addEventListener("click",(function(){return c(u,t._id)})):d.remove(),t.likes.some((function(e){return e._id===r}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return o(l,s,t._id)})),a.addEventListener("click",(function(){return n(t)})),u}function n(e,t,n){e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c),e.addEventListener("click",u)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c),e.removeEventListener("click",u)}function c(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function u(e){e.currentTarget===e.target&&o(e.currentTarget)}var i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function a(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.textContent=""}function l(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){a(e,n,t.inputErrorClass)})),l(n,e.querySelector(t.submitButtonSelector),t)}var d={baseUrl:"https://nomoreparties.co/v1/wff-cohort-15",headers:{authorization:"5dcf1aa1-8e2e-4665-9dbb-d84d3205566d","Content-Type":"application/json"}},p=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _,y=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),h=m.querySelector(".popup__close"),v=m.querySelector(".popup__form"),S=v.querySelector(".popup__input_type_name"),b=v.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),E=document.querySelector(".profile__image"),k=document.querySelector(".popup_type_edit-avatar"),C=k.querySelector(".popup__close"),L=k.querySelector(".popup__form"),x=L.querySelector(".popup__input_type_avatar-url"),A=document.querySelector(".profile__add-button"),U=document.querySelector(".popup_type_new-card"),T=U.querySelector(".popup__close"),w=U.querySelector(".popup__form"),j=w.querySelector(".popup__input_type_card-name"),O=w.querySelector(".popup__input_type_url"),B=document.querySelector(".popup_type_image"),P=document.querySelector(".popup__image"),D=document.querySelector(".popup__caption"),I=B.querySelector(".popup__close"),M=document.querySelector(".popup__button"),N=document.querySelector(".places__list");function J(e,t,r){e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))}(r).then((function(r){n(e,t,r)})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))}(r).then((function(r){n(e,t,r)})).catch((function(e){console.log(e)}))}function H(e,t){(function(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:d.headers}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))})(t).then((function(){!function(e){e.remove()}(e)})).catch((function(e){console.log(e)}))}function V(e){D.textContent=e.name,P.src=e.link,P.alt=e.name,r(B)}y.addEventListener("click",(function(){r(m),S.value=g.textContent,b.value=q.textContent,s(v,i)})),v.addEventListener("submit",(function(e){e.preventDefault(),M.textContent="Сохранение...",function(e,t){return fetch("".concat(d.baseUrl,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))}(S.value,b.value).then((function(e){g.textContent=e.name,q.textContent=e.about,o(m)})).catch((function(e){return console.log(e)})).finally((function(){return M.textContent="Сохранить"}))})),h.addEventListener("click",(function(){return o(m)})),E.addEventListener("click",(function(){L.reset(),r(k),s(L,i)})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),M.textContent="Сохранение...",(t=x.value,fetch("".concat(d.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:t})}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))).then((function(e){E.style.backgroundImage="url('".concat(e,"')"),L.reset(),o(k)})).catch((function(e){return console.log(e)})).finally((function(){return M.textContent="Сохранить"}))})),C.addEventListener("click",(function(){return o(k)})),A.addEventListener("click",(function(){w.reset(),r(U),s(w,i)})),w.addEventListener("submit",(function(e){var n,r;e.preventDefault(),M.textContent="Сохранение...",(n=j.value,r=O.value,fetch("".concat(d.baseUrl,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))).then((function(e){N.prepend(t(e,V,_,J,H)),w.reset(),o(U)})).catch((function(e){return console.log(e)})).finally((function(){return M.textContent="Сохранить"}))})),T.addEventListener("click",(function(){return o(U)})),I.addEventListener("click",(function(){return o(B)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),o.textContent=r}(e,t,n,t.validationMessage)}(e,o,t.inputErrorClass),l(n,r,t)}))}))}(t,e)}))}(i),Promise.all([fetch("".concat(d.baseUrl,"/users/me"),{headers:d.headers}).then((function(e){return p(e)})).catch((function(e){return console.log(e)})),fetch("".concat(d.baseUrl,"/cards"),{headers:d.headers}).then((function(e){return p(e)})).catch((function(e){return console.log(e)}))]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];_=c._id,g.textContent=c.name,q.textContent=c.about,E.style.backgroundImage="url('".concat(c.avatar,"')"),u.forEach((function(e){N.append(t(e,V,_,J,H))}))})).catch((function(e){return console.log(e)}))})();
//# sourceMappingURL=main.js.map