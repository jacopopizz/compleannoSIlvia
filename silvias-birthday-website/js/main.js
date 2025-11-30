// Floating hearts generator + image fallback
(function(){
    // spawn hearts
    function spawnHeart(){
        const heart = document.createElement('div');
        heart.className = 'heart';
        const size = 18 + Math.random()*28;
        heart.style.width = heart.style.height = size + 'px';
        const left = Math.random()*100;
        heart.style.left = left + 'vw';
        heart.style.background = 'transparent';
        // tweak pseudo elements color via inline background
        heart.style.setProperty('--accent', '#ff6fa3');
        document.body.appendChild(heart);
        setTimeout(()=> heart.remove(), 7000);
    }
    // spawn regularly
    setInterval(spawnHeart, 700);

    // replace broken images with placeholders
    function setPlaceholder(img){
        const wrapper = document.createElement('div');
        wrapper.className = 'img-placeholder';
        wrapper.textContent = 'Lovely memory — image not found';
        img.replaceWith(wrapper);
    }
    document.querySelectorAll('img').forEach(img=>{
        img.addEventListener('error', ()=> setPlaceholder(img));
        // optional click to open large
        img.addEventListener('click', ()=> {
            const w = window.open('', '_blank');
            w.document.write('<title>Memory</title>');
            const newImg = w.document.createElement('img');
            newImg.src = img.src;
            newImg.style.maxWidth = '95vw';
            newImg.style.maxHeight = '95vh';
            w.document.body.style.display='flex';
            w.document.body.style.alignItems='center';
            w.document.body.style.justifyContent='center';
            w.document.body.style.background='#fff7fb';
            w.document.body.appendChild(newImg);
        });
    });

    // small random sparkles in header
    const header = document.querySelector('header');
    if(header){
        for(let i=0;i<8;i++){
            const s = document.createElement('div');
            s.className = 'sparkle';
            s.style.left = (10 + Math.random()*80) + '%';
            s.style.top = (10 + Math.random()*60) + '%';
            s.style.opacity = Math.random()*0.9 + 0.1;
            header.appendChild(s);
            (function(el){ setTimeout(()=> el.remove(), 2500 + Math.random()*4000); })(s);
        }
    }
})();

    // Floating hearts (gentle ambient) — spawn periodically
    function spawnHeart(){
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        const size = 10 + Math.random()*38;
        heart.style.width = heart.style.height = size + 'px';
        heart.style.left = (10 + Math.random()*80) + 'vw';
        heart.style.bottom = '-60px';
        heart.style.zIndex = 9998;
        heart.style.pointerEvents = 'none';
        heart.style.transform = 'rotate(45deg)';
        heart.style.background = 'linear-gradient(45deg,#ff6fa3,#ffb3d1)';
        heart.style.borderRadius = '20% 20% 0 0';
        heart.style.boxShadow = '0 6px 20px rgba(75,40,55,0.08)';
        heart.style.transition = 'transform 6s linear, opacity 6s linear';
        document.body.appendChild(heart);
        // create rounded lobes using pseudo-like elements
        const l = document.createElement('div'); const r = document.createElement('div');
        [l,r].forEach(el=>{
            el.style.position='absolute'; el.style.width = size+'px'; el.style.height = size+'px';
            el.style.borderRadius='50%'; el.style.top = '-'+(size/2)+'px'; el.style.background='inherit';
        });
        heart.appendChild(l); heart.appendChild(r);
        l.style.left = '0'; r.style.left = (size/2)+'px';
        // animate up
        requestAnimationFrame(()=> {
            heart.style.transform = 'translateY(-120vh) rotate(45deg) scale(0.9)';
            heart.style.opacity = '0';
        });
        setTimeout(()=> heart.remove(), 7000);
    }
    setInterval(spawnHeart, 800);

    // Surprise: simple confetti hearts
    function surprise() {
        for (let i=0;i<28;i++){
            const p = document.createElement('div');
            p.className = 'confetti';
            const sz = 8 + Math.random()*18;
            p.style.position = 'fixed';
            p.style.left = (40 + Math.random()*20) + 'vw';
            p.style.top = (45 + Math.random()*10) + 'vh';
            p.style.width = p.style.height = sz+'px';
            p.style.borderRadius = '50%';
            const hue = 330 + Math.random()*30;
            p.style.background = `hsl(${hue} ${80}% ${60}%)`;
            p.style.opacity = '0.95';
            p.style.zIndex = 10000;
            p.style.pointerEvents = 'none';
            p.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
            p.style.transition = 'transform 1.8s cubic-bezier(.17,.67,.28,1), opacity 1.8s linear';
            document.body.appendChild(p);
            // animate outward
            const dx = (Math.random()-0.5)*120;
            const dy = - (120 + Math.random()*240);
            requestAnimationFrame(()=> {
                p.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`;
                p.style.opacity = '0';
            });
            setTimeout(()=> p.remove(), 2000);
        }
    }

    surpriseBtn.addEventListener('click', () => {
        surprise();
        // subtle pulse on hero
        const heroInner = document.querySelector('.hero-inner');
        if (heroInner){
            heroInner.animate([{ transform:'scale(1)' }, { transform: 'scale(1.02)' }, { transform:'scale(1)' }], { duration:800, easing:'ease-out' });
        }
    });

    // Accessibility: ensure images lazy-loaded and no JS errors


// ...existing code...
/*
  main.js pulito:
  - nessun window.open
  - clic sulle 4 immagini mostra solo la scritta corrispondente
  - gestione immagini rotte (placeholder)
  - decorazioni leggere (cuori)
*/
document.addEventListener('DOMContentLoaded', () => {
    const imgs = Array.from(document.querySelectorAll('.gallery img'));
    const lightbox = document.getElementById('lightbox');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const captionEl = document.getElementById('lightbox-caption');
    const surpriseBtn = document.getElementById('surpriseBtn');

    // Messaggi predefiniti (uno per ogni immagine, nello stesso ordine)
    const messages = [
        "Il nostro primo incontro — ricordo ancora il tuo sorriso come se fosse ieri.",
        "Tutto il giorno insieme — ogni momento con te è un piccolo universo di gioia e risate.",
        "Regali per Jacopo — i regali possono svanire, il tuo affetto resta: grazie di esistere.",
        "Sorpresa per Silvia — ti meriti tutto perché tu sei il mio posto felice è accanto a te."
    ];

    function openCaptionOnlyForIndex(i){
        const text = messages[i] || "Un ricordo speciale";
        if (captionEl && lightbox) {
            captionEl.textContent = text;
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden','false');
            document.body.style.overflow = 'hidden';
        } else {
            // come fallback mostra alert (solo se lightbox mancante)
            alert(text);
        }
    }

    function closeLightbox(){
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden','true');
        if (captionEl) captionEl.textContent = '';
        document.body.style.overflow = '';
    }

    // Assicura che non ci siano listener precedenti indesiderati:
    imgs.forEach(img => {
        img.replaceWith(img.cloneNode(true));
    });

    // Ricollega reference a immagini fresche
    const freshImgs = Array.from(document.querySelectorAll('.gallery img'));

    freshImgs.forEach((img, idx) => {
        img.addEventListener('click', (e) => {
            // blocca eventuali comportamenti predefiniti (non aprire link/nuove schede)
            if (e.preventDefault) e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            openCaptionOnlyForIndex(idx);
        });

        img.addEventListener('error', () => {
            const ph = document.createElement('div');
            ph.className = 'img-placeholder';
            ph.textContent = 'Ricordo non disponibile';
            img.replaceWith(ph);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    }

    // Decorative hearts (non intrusive, no window.open)
    function spawnHeart(){
        const heart = document.createElement('div');
        heart.className = 'heart';
        const size = 12 + Math.random()*30;
        heart.style.width = heart.style.height = size + 'px';
        heart.style.left = (8 + Math.random()*84) + 'vw';
        heart.style.bottom = '-60px';
        heart.style.zIndex = 9998;
        heart.style.pointerEvents = 'none';
        heart.style.setProperty('--accent', '#ff6fa3');
        document.body.appendChild(heart);
        requestAnimationFrame(()=> {
            heart.style.transform = 'translateY(-120vh) rotate(45deg) scale(.9)';
            heart.style.opacity = '0';
        });
        setTimeout(()=> heart.remove(), 7000);
    }
    setInterval(spawnHeart, 900);

    // Surprise effect (kept but harmless)
    function surprise() {
        for (let i=0;i<18;i++){
            const p = document.createElement('div');
            const sz = 8 + Math.random()*16;
            p.style.position = 'fixed';
            p.style.left = (40 + Math.random()*20) + 'vw';
            p.style.top = (45 + Math.random()*10) + 'vh';
            p.style.width = p.style.height = sz+'px';
            p.style.borderRadius = '50%';
            p.style.background = `hsl(${330 + Math.random()*30} 80% 60%)`;
            p.style.opacity = '0.95';
            p.style.zIndex = 10000;
            p.style.pointerEvents = 'none';
            p.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
            p.style.transition = 'transform 1.6s cubic-bezier(.17,.67,.28,1), opacity 1.6s linear';
            document.body.appendChild(p);
            const dx = (Math.random()-0.5)*120;
            const dy = - (120 + Math.random()*240);
            requestAnimationFrame(()=> {
                p.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`;
                p.style.opacity = '0';
            });
            setTimeout(()=> p.remove(), 1600);
        }
    }
    if (surpriseBtn) surpriseBtn.addEventListener('click', () => { surprise(); });
});
// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const imgs = Array.from(document.querySelectorAll('.gallery img'));
    const lightbox = document.getElementById('lightbox');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const captionEl = document.getElementById('lightbox-caption');
    const surpriseBtn = document.getElementById('surpriseBtn');

    const messages = [
        "Il nostro primo incontro — ricordo ancora il tuo sorriso come se fosse ieri.",
        "Ogni momento con te è un piccolo universo di gioia e risate.",
        "I regali possono svanire, il tuo affetto resta: grazie di esistere.",
        "La tua sorpresa ha reso tutto perfetto — il mio posto felice è accanto a te."
    ];

    function openCaptionOnlyForIndex(i){
        const text = messages[i] || "Un ricordo speciale";
        if (captionEl && lightbox) {
            captionEl.textContent = text;
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden','false');
            document.body.style.overflow = 'hidden';
        } else {
            alert(text);
        }
    }

    function closeLightbox(){
        if (!lightbox) return;
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden','true');
        if (captionEl) captionEl.textContent = '';
        document.body.style.overflow = '';
    }

    // rimuove eventuali listener precedenti
    imgs.forEach(img => img.replaceWith(img.cloneNode(true)));
    const freshImgs = Array.from(document.querySelectorAll('.gallery img'));

    freshImgs.forEach((img, idx) => {
        img.addEventListener('click', (e) => {
            if (e.preventDefault) e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            spawnClickHeart(e.clientX + window.scrollX, e.clientY + window.scrollY);
            openCaptionOnlyForIndex(idx);
        });
        img.addEventListener('error', () => {
            const ph = document.createElement('div');
            ph.className = 'img-placeholder';
            ph.textContent = 'Ricordo non disponibile';
            img.replaceWith(ph);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    }

    // crea un cuoricino nella posizione (x,y)
    function spawnClickHeart(x, y, small=false){
        const heart = document.createElement('div');
        heart.className = 'click-heart' + (small ? ' small' : '');
        heart.textContent = '❤';
        document.body.appendChild(heart);
        // posiziona centrando il cuore sul punto cliccato
        const rect = heart.getBoundingClientRect();
        heart.style.left = (x - rect.width/2) + 'px';
        heart.style.top = (y - rect.height/2) + 'px';
        // rimuove dopo animazione
        setTimeout(()=> {
            heart.remove();
        }, 1200);
    }

    // cuoricini anche su click generico (escludi pulsanti/link/lightbox)
    document.addEventListener('click', (e) => {
        const exclude = e.target.closest('button, a, .btn, .lightbox, .lightbox *');
        if (exclude) return;
        spawnClickHeart(e.clientX + window.scrollX, e.clientY + window.scrollY, window.innerWidth < 600);
    });

    // decorative floating hearts (non intrusive)
    function spawnHeart(){
        const heart = document.createElement('div');
        heart.className = 'heart';
        const size = 12 + Math.random()*30;
        heart.style.width = heart.style.height = size + 'px';
        heart.style.left = (8 + Math.random()*84) + 'vw';
        heart.style.bottom = '-60px';
        heart.style.zIndex = 9998;
        heart.style.pointerEvents = 'none';
        heart.style.setProperty('--accent', '#ff6fa3');
        document.body.appendChild(heart);
        requestAnimationFrame(()=> {
            heart.style.transform = 'translateY(-120vh) rotate(45deg) scale(.9)';
            heart.style.opacity = '0';
        });
        setTimeout(()=> heart.remove(), 7000);
    }
    setInterval(spawnHeart, 900);

    // surprise effect
    function surprise() {
        for (let i=0;i<18;i++){
            const p = document.createElement('div');
            const sz = 8 + Math.random()*16;
            p.style.position = 'fixed';
            p.style.left = (40 + Math.random()*20) + 'vw';
            p.style.top = (45 + Math.random()*10) + 'vh';
            p.style.width = p.style.height = sz+'px';
            p.style.borderRadius = '50%';
            p.style.background = `hsl(${330 + Math.random()*30} 80% 60%)`;
            p.style.opacity = '0.95';
            p.style.zIndex = 10000;
            p.style.pointerEvents = 'none';
            p.style.transform = `translateY(0) rotate(${Math.random()*360}deg)`;
            p.style.transition = 'transform 1.6s cubic-bezier(.17,.67,.28,1), opacity 1.6s linear';
            document.body.appendChild(p);
            const dx = (Math.random()-0.5)*120;
            const dy = - (120 + Math.random()*240);
            requestAnimationFrame(()=> {
                p.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*720}deg)`;
                p.style.opacity = '0';
            });
            setTimeout(()=> p.remove(), 1600);
        }
    }
    if (surpriseBtn) surpriseBtn.addEventListener('click', () => { surprise(); });
});