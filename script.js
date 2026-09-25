// ===== Wedding configuration =====
const WEDDING_DATE = new Date('2026-11-11T04:30:00+05:30').getTime();
// Add your WhatsApp number here with country code, without + or spaces.
// Example: const RSVP_PHONE = '919876543210';
const RSVP_PHONE = '918939235704';

function updateCountdown(){
  const distance = WEDDING_DATE - Date.now();
  const values = distance <= 0 ? [0,0,0,0] : [
    Math.floor(distance / 86400000),
    Math.floor((distance / 3600000) % 24),
    Math.floor((distance / 60000) % 60),
    Math.floor((distance / 1000) % 60)
  ];
  ['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'));
}
updateCountdown(); setInterval(updateCountdown,1000);

const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const audio=document.getElementById('music'); const musicBtn=document.getElementById('musicBtn'); const musicLabel=document.getElementById('musicLabel');
musicBtn.addEventListener('click',async()=>{
  if(audio.paused){try{await audio.play();musicBtn.textContent='Ⅱ';musicLabel.textContent='Playing'}catch{musicLabel.textContent='Add MP3 to assets'}}
  else{audio.pause();musicBtn.textContent='♪';musicLabel.textContent='Our song'}
});

document.getElementById('rsvpForm').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const text=`Wedding RSVP – Kishore & Nivethitha%0A%0AName: ${encodeURIComponent(data.get('name'))}%0AAttendance: ${encodeURIComponent(data.get('attendance'))}%0AGuests: ${encodeURIComponent(data.get('guests'))}%0AMessage: ${encodeURIComponent(data.get('message')||'—')}`;
  if(RSVP_PHONE){window.open(`https://wa.me/${RSVP_PHONE}?text=${text}`,'_blank');}
  else alert('RSVP is ready. Add your WhatsApp number to RSVP_PHONE in script.js to enable direct RSVP messages.');
});
