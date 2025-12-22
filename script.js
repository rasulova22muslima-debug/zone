const items = document.querySelectorAll('.header__nav-list_item');

items.forEach((item, index) => {
    setTimeout(() => {
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 250);
});


class ParallaxElements {
    constructor(selector) {
        this.items = document.querySelectorAll(selector);
        window.addEventListener('mousemove', e => this.move(e));
    }

    move(e) {
        const { innerWidth, innerHeight } = window;

        this.items.forEach(item => {
            const speed = item.dataset.speed || 2;
            const x = (e.clientX - innerWidth / 2) / (20 / speed);
            const y = (e.clientY - innerHeight / 2) / (20 / speed);

            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}
let parallaxElements = new ParallaxElements('[data-speed]');



class TypeWriterOnScroll {
    constructor(selector, speed = 100) {
        this.element = document.querySelector(selector);
        this.text = this.element.innerText;
        this.element.innerText = '';
        this.speed = speed;
        this.index = 0;

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.type();
                        observer.unobserve(this.element);
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(this.element);
    }

    type() {
        if (this.index < this.text.length) {
            this.element.innerText += this.text[this.index];
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}
let typeOnScroll = new TypeWriterOnScroll('.title__h', 100);



class Card3DEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector)
        if (!this.elements || this.elements.length === 0) return

        this.elements.forEach(el => {
            el.style.transformStyle = 'preserve-3d'
            el.addEventListener('mousemove', e => this.applyRotation(e, el))
            el.addEventListener('mouseleave', () => this.resetRotation(el))
        })
    }

    applyRotation(event, el) {
        const rect = el.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const halfW = rect.width / 2
        const halfH = rect.height / 2

        const rotX = ((halfH - y) / halfH) * 10
        const rotY = ((x - halfW) / halfW) * 10

        el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
        el.style.transition = 'transform 0s'
    }

    resetRotation(el) {
        el.style.transition = 'transform 0.6s ease'
        el.style.transform = 'none'
        setTimeout(() => { el.style.transition = '' }, 700)
    }
}
const card3DEffect = new Card3DEffect('.card__desc')


class Card3DRotate {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        if (!this.cards || this.cards.length === 0) return;

        this.cards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.addEventListener('mousemove', e => this.handleRotate(e, card));
            card.addEventListener('mouseout', () => this.reset(card));
        });
    }

    handleRotate(event, card) {
        const rect = card.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;

        const rotX = ((halfHeight - posY) / halfHeight) * 10;
        const rotY = ((posX - halfWidth) / halfWidth) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        card.style.transition = 'transform 0s';
    }

    reset(card) {
        card.style.transition = 'transform 0.6s ease';
        card.style.transform = 'none';
        setTimeout(() => { card.style.transition = '' }, 700);
    }
}
const team3DRotation = new Card3DRotate('.team__desc-card');



window.addEventListener("scroll", () => {
    const scrolled= window.scrollY;
    const shift = scrolled * 0.3; 

    document.body.style.backgroundPositionY = `-${shift}px`;
});

