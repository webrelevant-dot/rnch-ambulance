'use strict';
const tariffData={adult:{name:'Врачебная бригада',swao:8000,mkad:12000,near:15000},child:{name:'Педиатрическая бригада',mkad:15000,near:17000},resus:{name:'Реанимационная бригада',mkad:14000,near:17000},paramedic:{name:'Фельдшерская бригада'}};
const locationNames={swao:'Москва, ЮЗАО',mkad:'В пределах МКАД',near:'За МКАД, до 25 км',far:'За МКАД, более 25 км'};
let currentTeam='adult';
const locationField=document.getElementById('location');
function updateEstimate(){
 const team=tariffData[currentTeam],swaoOption=locationField.querySelector('[value="swao"]');
 swaoOption.disabled=currentTeam!=='adult';
 if(swaoOption.disabled&&locationField.value==='swao')locationField.value='mkad';
 const location=locationField.value,amount=team[location],price=document.getElementById('estimate-price'),label=document.getElementById('estimate-label');
 label.replaceChildren(document.createTextNode(team.name),document.createElement('br'));
 const small=document.createElement('small');small.textContent=locationNames[location];label.append(small);
 const needsQuote=typeof amount!=='number';
 price.textContent=needsQuote?'По согласованию':new Intl.NumberFormat('ru-RU').format(amount)+' ₽';
 price.classList.toggle('custom-price',needsQuote);
 document.getElementById('estimate-note').textContent=currentTeam==='paramedic'?'Стоимость и условия выезда фельдшерской бригады уточнит диспетчер.':location==='far'?'Дальний маршрут и доплаты рассчитывает диспетчер. Автоматический расчёт не применяется.':'Опубликованный тариф Med.ru. Итоговую стоимость уточнит диспетчер.';
 document.querySelectorAll('[data-team]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.team===currentTeam)));
}
 document.querySelectorAll('[data-team]').forEach(b=>b.addEventListener('click',()=>{currentTeam=b.dataset.team;updateEstimate();}));
 locationField.addEventListener('change',updateEstimate);updateEstimate();
// Фоновое видео без текстового элемента управления; учитывает уменьшение движения.
const heroVideo=document.querySelector('.hero-video');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
function applyMotionPreference(){if(motionPreference.matches){heroVideo.removeAttribute('autoplay');heroVideo.pause();}else{heroVideo.muted=true;heroVideo.play().catch(()=>{});}}
motionPreference.addEventListener('change',applyMotionPreference);applyMotionPreference();
