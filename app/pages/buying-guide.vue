<!--
  pages/buying-guide.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /buying-guide
  Needs: @nuxt/icon + @iconify-json/material-symbols
  Header and footer live in layouts/default.vue, not in this file.
  Review the copy and the price bands before publishing: they are general guidance.
-->
<script setup>
const description =
    'ANC, latency, codecs and battery explained in plain language, so you know what to look for before you compare earbuds.';

// ---------- Content ----------
const useCases = [
    {
        label: 'Gym',
        slug: 'gym',
        icon: 'material-symbols:fitness-center',
        text: 'Look for IPX4 or higher sweat resistance and a secure fit.'
    },
    {
        label: 'Office',
        slug: 'office',
        icon: 'material-symbols:business-center-outline',
        text: 'Look for ANC, clear microphones and connecting to two devices.'
    },
    {
        label: 'Travel',
        slug: 'travel',
        icon: 'material-symbols:flight',
        text: 'Look for strong ANC, long total battery and a comfortable fit.'
    },
    {
        label: 'Students',
        slug: 'students',
        icon: 'material-symbols:school-outline',
        text: 'Look for a fair price, steady battery and low video delay.'
    },
    {
        label: 'Gaming',
        slug: 'gaming',
        icon: 'material-symbols:sports-esports-outline',
        text: 'Look for a low latency mode and a stable connection.'
    },
    {
        label: 'Calling',
        slug: 'calling',
        icon: 'material-symbols:phone-in-talk-outline',
        text: 'Look for several microphones and good voice pickup.'
    }
];

const features = [
    {
        title: 'Active noise cancellation (ANC)',
        icon: 'material-symbols:graphic-eq',
        text: 'Microphones listen to the noise around you and the earbuds cancel part of it. It helps on trains, flights and in busy offices.',
        look: 'A higher dB figure usually means stronger ANC, but fit and tuning matter too. Check reviews.'
    },
    {
        title: 'Battery life',
        icon: 'material-symbols:battery-full-outline',
        text: 'Brands list the hours from the earbuds alone and the total with the charging case. They are different numbers.',
        look: 'Compare the same type of number, and look at hours per charge as well as the total.'
    },
    {
        title: 'Latency',
        icon: 'material-symbols:speed-outline',
        text: 'The delay between your phone and the sound in your ears. It matters for games and videos.',
        look: 'Lower is better. A gaming or low latency mode is a good sign.'
    },
    {
        title: 'Audio codecs',
        icon: 'material-symbols:music-note-outline',
        text: 'The way audio is compressed over Bluetooth. SBC works with everything, AAC suits iPhones, and LDAC or aptX can sound better on supported phones.',
        look: 'Check that the codec matches your phone.'
    },
    {
        title: 'Bluetooth version',
        icon: 'material-symbols:bluetooth',
        text: 'Newer versions generally connect more reliably and use less power.',
        look: 'Bluetooth 5.3 or newer is a safe choice today.'
    },
    {
        title: 'Water resistance (IP)',
        icon: 'material-symbols:water-drop-outline',
        text: 'IPX4 handles sweat and splashes. A rating with a dust number, such as IP55, adds dust protection.',
        look: 'IPX4 is enough for most workouts. Choose higher for rain and heavy use.'
    },
    {
        title: 'Driver size',
        icon: 'material-symbols:speaker-outline',
        text: 'The speaker unit inside each earbud. A bigger driver can give fuller bass, but tuning matters more than size.',
        look: 'Use it as one clue, not the deciding factor.'
    },
    {
        title: 'Dual device connection',
        icon: 'material-symbols:devices-outline',
        text: 'Connects to your phone and laptop at once, so you can switch between them without pairing again.',
        look: 'Handy if you work and listen on more than one device.'
    }
];

const tiers = [
    {
        label: 'Under ₹1,000',
        text: 'Basic listening and casual calls. Expect fewer features, so check battery and fit.',
        query: { maxPrice: 1000 }
    },
    {
        label: '₹1,000 – ₹2,000',
        text: 'The most popular range. Look for a good battery and a low latency mode.',
        query: { minPrice: 1000, maxPrice: 2000 }
    },
    {
        label: '₹2,000 – ₹3,000',
        text: 'ANC and better call quality start to appear. Compare noise cancellation closely.',
        query: { minPrice: 2000, maxPrice: 3000 }
    },
    {
        label: 'Above ₹3,000',
        text: 'Stronger ANC, better codecs and more polish. Make sure you will use the extras.',
        query: { minPrice: 3000 }
    }
];

const checklist = [
    'It fits comfortably for an hour or more',
    'It works with your phone’s codec',
    'You checked battery per charge, not only with the case',
    'It has the water resistance you need',
    'You read recent reviews and the warranty terms',
    'You compared at least two alternatives'
];

const faqs = [
    {
        q: 'Is ANC worth paying for?',
        a: 'If you travel, commute or work in a noisy place, yes. If you mostly listen at home, you can save money by skipping it.'
    },
    {
        q: 'How much should I spend?',
        a: 'Start with your main use, then choose the lowest price that has the features you need. Extra features you won’t use are wasted money.'
    },
    {
        q: 'What does IPX4 mean?',
        a: 'The earbuds can handle sweat and splashes of water from any direction, but they are not made for swimming.'
    },
    {
        q: 'Do bigger drivers mean better sound?',
        a: 'Not always. Tuning and fit change the sound more than driver size does.'
    }
];

const sections = [
    { id: 'listen', label: 'Start with how you listen' },
    { id: 'features', label: 'Features explained' },
    { id: 'budget', label: 'Choose by budget' },
    { id: 'checklist', label: 'Before you buy' },
    { id: 'faq', label: 'Common questions' }
];

// ---------- SEO (page + FAQ rich result) ----------
useSeoMeta({
    title: 'Earbuds Buying Guide – BudsArena',
    description,
    ogTitle: 'Earbuds Buying Guide – BudsArena',
    ogDescription: description
});

useHead({
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a }
                }))
            })
        }
    ]
});

// ---------- Quick finder ----------
const finder = reactive({ budget: 'low', use: 'daily', anc: 'nice' });

function findEarbuds() {
    const query = {};
    if (finder.budget === 'low') query.maxPrice = 2000;
    if (finder.budget === 'mid')
        Object.assign(query, { minPrice: 2000, maxPrice: 3000 });
    if (finder.budget === 'high') query.minPrice = 3000;
    if (finder.use !== 'daily') query.use = finder.use;
    if (finder.anc === 'must') query.anc = 'true';
    navigateTo({ path: '/explore', query });
}

// ---------- Checklist + FAQ ----------
const ticked = ref([]);
function toggleTick(i) {
    ticked.value = ticked.value.includes(i)
        ? ticked.value.filter((n) => n !== i)
        : [...ticked.value, i];
}
const openFaq = ref(0);

// ---------- Highlight the current section in the contents list ----------
const active = ref(sections[0].id);
let observer;
onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter((e) => e.isIntersecting)
                .sort(
                    (a, b) =>
                        a.boundingClientRect.top - b.boundingClientRect.top
                );
            if (visible.length) active.value = visible[0].target.id;
        },
        { rootMargin: '-20% 0px -65% 0px' }
    );
    sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
    });
});
onBeforeUnmount(() => observer && observer.disconnect());
</script>

<template>
    <div class="guide">
        <!-- Header -->
        <section class="hero">
            <div class="w hero-grid">
                <div>
                    <nav class="crumbs" aria-label="Breadcrumb">
                        <NuxtLink to="/">Home</NuxtLink
                        ><span aria-hidden="true">›</span><b>Buying Guide</b>
                    </nav>
                    <h1>Earbuds buying guide, <em>made simple.</em></h1>
                    <p class="lead">
                        ANC, latency, codecs and battery explained in plain
                        language, so you know what to look for before you
                        compare.
                    </p>
                </div>

                <form class="qf" @submit.prevent="findEarbuds">
                    <h2>Quick finder</h2>
                    <p>Answer three questions and see earbuds that match.</p>
                    <label class="fld"
                        ><span>Your budget</span>
                        <select v-model="finder.budget">
                            <option value="low">Under ₹2,000</option>
                            <option value="mid">₹2,000 – ₹3,000</option>
                            <option value="high">Above ₹3,000</option>
                        </select>
                    </label>
                    <label class="fld"
                        ><span>Main use</span>
                        <select v-model="finder.use">
                            <option value="daily">Daily listening</option>
                            <option value="gym">Gym</option>
                            <option value="gaming">Gaming</option>
                            <option value="travel">Travel</option>
                        </select>
                    </label>
                    <label class="fld"
                        ><span>Noise cancellation</span>
                        <select v-model="finder.anc">
                            <option value="nice">Nice to have</option>
                            <option value="must">Must have</option>
                            <option value="no">Not needed</option>
                        </select>
                    </label>
                    <button type="submit" class="go">
                        Show matching earbuds
                    </button>
                </form>
            </div>
        </section>

        <div class="w body">
            <!-- Contents -->
            <nav class="toc" aria-label="On this page">
                <h3>On this page</h3>
                <a
                    v-for="s in sections"
                    :key="s.id"
                    :href="`#${s.id}`"
                    :class="{ on: active === s.id }"
                    >{{ s.label }}</a
                >
            </nav>

            <div>
                <!-- Use cases -->
                <section id="listen" class="sec">
                    <h2>Start with how you listen</h2>
                    <p class="sub">
                        The best earbuds depend on where and how you use them.
                    </p>
                    <div class="uc">
                        <NuxtLink
                            v-for="u in useCases"
                            :key="u.slug"
                            :to="`/explore?use=${u.slug}`"
                            class="u"
                        >
                            <span class="badge"><Icon :name="u.icon" /></span>
                            <div>
                                <b>{{ u.label }}</b
                                ><span>{{ u.text }}</span>
                            </div>
                        </NuxtLink>
                    </div>
                </section>

                <!-- Features -->
                <section id="features" class="sec">
                    <h2>Features explained</h2>
                    <p class="sub">
                        What each spec means for you, and what to look for.
                    </p>
                    <div class="ft">
                        <article v-for="f in features" :key="f.title" class="f">
                            <div class="fh">
                                <span class="badge"
                                    ><Icon :name="f.icon"
                                /></span>
                                <h3>{{ f.title }}</h3>
                            </div>
                            <p>{{ f.text }}</p>
                            <div class="look">
                                <i>What to look for:</i> {{ f.look }}
                            </div>
                        </article>
                    </div>
                </section>

                <!-- Budget -->
                <section id="budget" class="sec">
                    <h2>Choose by budget</h2>
                    <p class="sub">
                        A rough guide to what each price range offers. Prices
                        change often, so check the live price.
                    </p>
                    <div class="tiers">
                        <div v-for="t in tiers" :key="t.label" class="t">
                            <b>{{ t.label }}</b>
                            <span>{{ t.text }}</span>
                            <NuxtLink :to="{ path: '/explore', query: t.query }"
                                >See earbuds</NuxtLink
                            >
                        </div>
                    </div>
                </section>

                <!-- Checklist -->
                <section id="checklist" class="sec">
                    <h2>Before you buy</h2>
                    <p class="sub">
                        A quick checklist to avoid regret. Tap an item to tick
                        it off.
                    </p>
                    <div class="chk">
                        <button
                            v-for="(c, i) in checklist"
                            :key="c"
                            type="button"
                            class="ck"
                            :class="{ done: ticked.includes(i) }"
                            :aria-pressed="ticked.includes(i)"
                            @click="toggleTick(i)"
                        >
                            <Icon
                                :name="
                                    ticked.includes(i)
                                        ? 'material-symbols:check-circle'
                                        : 'material-symbols:check-circle-outline'
                                "
                            />
                            {{ c }}
                        </button>
                    </div>
                </section>

                <!-- FAQ -->
                <section id="faq" class="sec">
                    <h2>Common questions</h2>
                    <p class="sub">Short answers to what people ask most.</p>
                    <div class="faq">
                        <div v-for="(f, i) in faqs" :key="f.q" class="q">
                            <button
                                type="button"
                                class="qh"
                                :aria-expanded="openFaq === i"
                                :aria-controls="`faq-${i}`"
                                @click="openFaq = openFaq === i ? -1 : i"
                            >
                                {{ f.q }}
                                <Icon
                                    :name="
                                        openFaq === i
                                            ? 'material-symbols:keyboard-arrow-up'
                                            : 'material-symbols:keyboard-arrow-down'
                                    "
                                />
                            </button>
                            <p v-show="openFaq === i" :id="`faq-${i}`">
                                {{ f.a }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- CTA -->
                <section class="band">
                    <div>
                        <h2>Ready to compare?</h2>
                        <p>
                            Put your shortlist side by side and see which one
                            wins.
                        </p>
                    </div>
                    <div class="bt">
                        <NuxtLink to="/compare">Start comparing</NuxtLink>
                        <NuxtLink to="/explore" class="o"
                            >Browse earbuds</NuxtLink
                        >
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>
.guide {
    color: #1b1d20;
    line-height: 1.5;
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
    scroll-behavior: smooth;
}
.guide * {
    box-sizing: border-box;
}
.guide a {
    text-decoration: none;
    color: inherit;
}
.guide button {
    font: inherit;
    cursor: pointer;
}
.guide :focus-visible {
    outline: 2px solid #12605f;
    outline-offset: 2px;
}
.w {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero */
.hero {
    background: #f1f7f5;
}
.hero-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 56px;
    align-items: center;
    padding-top: 56px;
    padding-bottom: 56px;
}
.crumbs {
    display: flex;
    gap: 12px;
    font-size: 14px;
    color: #5f666d;
    margin-bottom: 18px;
}
.crumbs a {
    color: #12605f;
}
.crumbs b {
    color: #1b1d20;
    font-weight: 500;
}
h1 {
    margin: 0;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 700;
    letter-spacing: -0.02em;
}
h1 em {
    font-style: normal;
    color: #12605f;
}
.lead {
    margin: 16px 0 0;
    font-size: 17px;
    color: #4a5158;
    max-width: 520px;
}

/* Quick finder */
.qf {
    background: #fff;
    border: 1px solid #dfe6e4;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 12px 30px rgba(15, 60, 58, 0.08);
}
.qf h2 {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 600;
}
.qf p {
    margin: 0 0 16px;
    font-size: 13px;
    color: #5f666d;
}
.fld {
    display: block;
    margin-bottom: 12px;
}
.fld span {
    display: block;
    font-size: 12.5px;
    font-weight: 500;
    color: #33393e;
    margin-bottom: 5px;
}
.fld select {
    width: 100%;
    height: 44px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    padding: 0 12px;
    font: inherit;
    font-size: 14px;
    background: #fff;
    color: #1b1d20;
}
.go {
    width: 100%;
    height: 46px;
    border: 0;
    border-radius: 8px;
    background: #12605f;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    margin-top: 4px;
}
.go:hover {
    background: #0f5150;
}

/* Body layout */
.body {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr);
    gap: 56px;
    padding-top: 56px;
}
.toc {
    position: sticky;
    top: 24px;
    align-self: start;
}
.toc h3 {
    margin: 0 0 12px;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5f666d;
    font-weight: 600;
}
.toc a {
    display: block;
    padding: 9px 14px;
    border-left: 2px solid #e6e8ea;
    font-size: 14px;
    color: #4a5158;
    transition: background 0.2s;
}
.toc a:hover {
    background: #f6f8f8;
}
.toc a.on {
    border-left-color: #12605f;
    color: #12605f;
    font-weight: 600;
    background: #f1f7f5;
}

.sec {
    margin-bottom: 64px;
    scroll-margin-top: 24px;
}
.sec h2 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.01em;
}
.sub {
    margin: 8px 0 24px;
    color: #5f666d;
    font-size: 15px;
}
.badge {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #e6f5ef;
    color: #12605f;
    display: grid;
    place-items: center;
    flex: none;
    font-size: 22px;
}

.uc {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 14px;
}
.u {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 14px;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}
.u:hover {
    border-color: #12605f;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.u b {
    font-size: 16px;
    font-weight: 600;
    display: block;
}
.u span {
    font-size: 13.5px;
    color: #5f666d;
    display: block;
    margin-top: 4px;
    line-height: 1.5;
}
.u .badge {
    display: grid;
    margin: 0;
    color: #12605f;
    font-size: 22px;
}
.u div span:not(.badge) {
    display: block;
}

.ft {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 16px;
}
.f {
    border: 1px solid #e6e8ea;
    border-radius: 16px;
    padding: 22px;
}
.fh {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
}
.fh h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
}
.f p {
    margin: 0;
    font-size: 14.5px;
    color: #33393e;
}
.look {
    margin-top: 14px;
    background: #f1f7f5;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 13.5px;
    color: #33393e;
}
.look i {
    font-style: normal;
    font-weight: 600;
    color: #12605f;
}

.tiers {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    overflow: hidden;
}
.t {
    display: grid;
    grid-template-columns: 200px 1fr 120px;
    gap: 16px;
    align-items: center;
    padding: 18px 22px;
    border-top: 1px solid #eef0f1;
}
.t:first-child {
    border-top: 0;
}
.t b {
    font-size: 16px;
    font-weight: 600;
}
.t span {
    font-size: 14px;
    color: #5f666d;
}
.t a {
    color: #12605f;
    font-size: 14px;
    font-weight: 500;
    text-align: right;
}
.t a:hover {
    text-decoration: underline;
}

.chk {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 12px;
}
.ck {
    display: flex;
    gap: 12px;
    align-items: center;
    border: 1px solid #e6e8ea;
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 14.5px;
    background: #fff;
    text-align: left;
    transition:
        border-color 0.2s,
        background 0.2s;
}
.ck:hover {
    border-color: #12605f;
}
.ck :deep(svg) {
    width: 22px;
    height: 22px;
    color: #9aa3aa;
    flex: none;
}
.ck.done {
    background: #eaf7f0;
    border-color: #cfe6dc;
}
.ck.done :deep(svg) {
    color: #17734a;
}

.faq {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    overflow: hidden;
}
.q {
    padding: 0 22px;
    border-top: 1px solid #eef0f1;
}
.q:first-child {
    border-top: 0;
}
.qh {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 18px 0;
    border: 0;
    background: none;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
}
.qh :deep(svg) {
    width: 24px;
    height: 24px;
    flex: none;
    color: #5f666d;
}
.q p {
    margin: 0 0 18px;
    font-size: 14.5px;
    color: #4a5158;
    max-width: 680px;
}

.band {
    margin-bottom: 60px;
    background: #12605f;
    color: #fff;
    border-radius: 20px;
    padding: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
}

.band > div:first-child {
    flex: 1;
    min-width: 0;
}

.band h2 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
}
.band p {
    margin: 8px 0 0;
    color: #cfe6e4;
    font-size: 15px;
}
/* .bt {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
} */

.bt {
    display: flex;
    flex-wrap: nowrap;
    flex: none;
    gap: 12px;
}

.bt a {
    border-radius: 10px;
    padding: 13px 24px;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
    background: #fff;
    color: #12605f;
}
.bt a.o {
    background: none;
    color: #fff;
    border: 1px solid #fff;
}

@media (max-width: 860px) {
    .hero-grid {
        grid-template-columns: 1fr;
        gap: 32px;
        padding-top: 40px;
        padding-bottom: 40px;
    }
    h1 {
        font-size: 36px;
    }
    .body {
        grid-template-columns: 1fr;
        gap: 0;
        padding-top: 32px;
    }
    .toc {
        position: static;
        display: flex;
        gap: 8px;
        overflow-x: auto;
        margin-bottom: 32px;
        padding-bottom: 4px;
    }
    .toc h3 {
        display: none;
    }
    .toc a {
        border: 1px solid #e6e8ea;
        border-radius: 999px;
        white-space: nowrap;
    }
    .sec h2 {
        font-size: 26px;
    }
    .ft {
        grid-template-columns: 1fr;
    }
    .t {
        grid-template-columns: 1fr;
        gap: 6px;
    }
    .t a {
        text-align: left;
    }
    .band {
        flex-direction: column;
        align-items: flex-start;
        padding: 28px;
    }
}
</style>
