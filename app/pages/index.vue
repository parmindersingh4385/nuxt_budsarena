<!--
  pages/index.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /
  Needs: @nuxt/icon + @iconify-json/material-symbols
  The header and footer are NOT in this file: keep them in layouts/default.vue
  (AppHeader + <slot /> + AppBottomToolbar).
  Products and figures below are SAMPLE data. Replace with your API, e.g.:
    const { data: featured } = await useFetch('/api/earbuds/trending')
-->
<script setup>
useSeoMeta({
    title: 'BudsArena – Compare, Choose, Listen better',
    description:
        'Compare earbuds side by side, see which one wins on the features that matter to you, and buy with confidence.'
});

const search = ref('');
function onSearch() {
    const q = search.value.trim();
    navigateTo({ path: '/explore', query: q ? { q } : {} });
}

// Quick filters (adjust the query names to match your /explore page)
const chips = [
    { label: 'Under ₹2,000', to: '/explore?maxPrice=2000' },
    { label: 'With ANC', to: '/explore?anc=true' },
    { label: 'Gaming', to: '/explore?use=gaming' },
    { label: 'Best battery', to: '/explore?sort=battery' }
];

const steps = [
    {
        title: 'Compare',
        icon: 'material-symbols:compare-arrows',
        text: 'Put up to 4 earbuds side by side and see price, ANC, battery and latency in one table.'
    },
    {
        title: 'Choose',
        icon: 'material-symbols:check-circle-outline',
        text: 'The best value in every row is highlighted, with a plain-language verdict for each pair.'
    },
    {
        title: 'Listen better',
        icon: 'material-symbols:headphones-outline',
        text: 'Pick the earbuds that fit how you listen, then check the best price at trusted stores.'
    }
];

const needs = [
    {
        label: 'Gym',
        slug: 'gym',
        icon: 'material-symbols:fitness-center',
        text: 'Sweat-proof and secure fit'
    },
    {
        label: 'Office',
        slug: 'office',
        icon: 'material-symbols:business-center-outline',
        text: 'ANC and clear calls'
    },
    {
        label: 'Travel',
        slug: 'travel',
        icon: 'material-symbols:flight',
        text: 'Long battery, strong ANC'
    },
    {
        label: 'Students',
        slug: 'students',
        icon: 'material-symbols:school-outline',
        text: 'Great sound on a budget'
    },
    {
        label: 'Gaming',
        slug: 'gaming',
        icon: 'material-symbols:sports-esports-outline',
        text: 'Low latency modes'
    },
    {
        label: 'Calling',
        slug: 'calling',
        icon: 'material-symbols:phone-in-talk-outline',
        text: 'Best microphones'
    }
];

// ---------- SAMPLE products ----------
const featured = [
    {
        slug: 'realme-buds-air-7',
        brand: 'Realme',
        name: 'Realme Buds Air 7',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.3,
        reviews: 1245,
        price: 2999,
        mrp: 3999,
        anc: 50,
        battery: 52
    },
    {
        slug: 'oneplus-nord-buds-3',
        brand: 'OnePlus',
        name: 'OnePlus Nord Buds 3',
        image: 'https://m.media-amazon.com/images/I/519DDBTBbzL._SL1500_.jpg',
        rating: 4.1,
        reviews: 980,
        price: 2199,
        mrp: 2699,
        anc: 32,
        battery: 43
    },
    {
        slug: 'boat-airdopes-141',
        brand: 'boAt',
        name: 'boAt Airdopes 141',
        image: 'https://m.media-amazon.com/images/I/71UiIAqIAYL._SL1500_.jpg',
        rating: 4.0,
        reviews: 15210,
        price: 999,
        mrp: 4490,
        anc: 0,
        battery: 42
    },
    {
        slug: 'realme-buds-t300',
        brand: 'Realme',
        name: 'Realme Buds T300',
        image: 'https://m.media-amazon.com/images/I/61jFNCDeahL._SL1500_.jpg',
        rating: 4.2,
        reviews: 3120,
        price: 1999,
        mrp: 2999,
        anc: 30,
        battery: 40
    }
];

const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);
const bySlug = (slug) => featured.find((p) => p.slug === slug);

// Hero preview: first two featured products, best value highlighted
const duo = [featured[0], featured[1]];
const previewRows = [
    {
        label: 'Price',
        best: 'low',
        val: (p) => p.price,
        show: (p) => inr(p.price)
    },
    {
        label: 'ANC',
        best: 'high',
        val: (p) => p.anc,
        show: (p) => (p.anc ? `Up to ${p.anc}dB` : 'Not available')
    },
    {
        label: 'Battery',
        best: 'high',
        val: (p) => p.battery,
        show: (p) => `${p.battery}H`
    }
];
function isBest(row, p) {
    const vals = duo.map(row.val);
    if (new Set(vals).size === 1) return false;
    const target = row.best === 'high' ? Math.max(...vals) : Math.min(...vals);
    return row.val(p) === target;
}

const comparisons = [
    ['realme-buds-air-7', 'oneplus-nord-buds-3'],
    ['oneplus-nord-buds-3', 'boat-airdopes-141'],
    ['realme-buds-air-7', 'realme-buds-t300']
].map(([a, b]) => ({
    a: bySlug(a),
    b: bySlug(b),
    to: `/compare?ids=${a},${b}`
}));

const brands = [
    { name: 'Realme', slug: 'realme' },
    { name: 'OnePlus', slug: 'oneplus' },
    { name: 'boAt', slug: 'boat' },
    { name: 'JBL', slug: 'jbl' },
    { name: 'Sony', slug: 'sony' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'Noise', slug: 'noise' },
    { name: 'Nothing', slug: 'nothing' }
];
</script>

<template>
    <div class="home">
        <!-- Hero -->
        <section class="hero">
            <div class="w hero-grid">
                <div>
                    <div class="eyebrow">Compare • Choose • Listen better</div>
                    <h1>Find the right earbuds, <em>faster.</em></h1>
                    <p class="lead">
                        Compare earbuds side by side, see which one wins on the
                        features that matter to you, and buy with confidence.
                    </p>

                    <form
                        class="search"
                        role="search"
                        @submit.prevent="onSearch"
                    >
                        <Icon name="material-symbols:search" class="s-ic" />
                        <input
                            v-model="search"
                            type="search"
                            placeholder="Search earbuds or brands…"
                            aria-label="Search earbuds or brands"
                        />
                        <button type="submit" class="go">Search</button>
                    </form>

                    <div class="chips">
                        <NuxtLink
                            v-for="c in chips"
                            :key="c.label"
                            :to="c.to"
                            class="chip"
                            >{{ c.label }}</NuxtLink
                        >
                    </div>

                    <div class="cta2">
                        <NuxtLink to="/compare">Start comparing</NuxtLink>
                        <NuxtLink to="/buying-guide" class="alt"
                            >Read buying guide</NuxtLink
                        >
                    </div>
                </div>

                <!-- Compare preview -->
                <div class="pv">
                    <div class="pvh">
                        <b>Compare in seconds</b><span>Sample comparison</span>
                    </div>
                    <div class="pvg">
                        <div />
                        <div v-for="p in duo" :key="p.slug" class="pvp">
                            <img v-if="p.image" :src="p.image" :alt="p.name" />
                            <Icon
                                v-else
                                name="material-symbols:headphones-outline"
                                class="ph"
                            />
                            <div>{{ p.name }}</div>
                        </div>
                        <template v-for="r in previewRows" :key="r.label">
                            <div class="pl">{{ r.label }}</div>
                            <div
                                v-for="p in duo"
                                :key="p.slug"
                                class="pc"
                                :class="{ b: isBest(r, p) }"
                            >
                                {{ r.show(p)
                                }}<span v-if="isBest(r, p)" class="tg"
                                    >Best</span
                                >
                            </div>
                        </template>
                    </div>
                    <NuxtLink
                        class="pvf"
                        :to="`/compare/${duo[0].slug}-vs-${duo[1].slug}`"
                        >Open full comparison</NuxtLink
                    >
                </div>
            </div>
        </section>

        <div class="w">
            <!-- Steps -->
            <section class="sec">
                <h2>How BudsArena helps</h2>
                <p class="sub">
                    Three simple steps from “which one?” to the right pair.
                </p>
                <div class="steps">
                    <div v-for="(s, i) in steps" :key="s.title" class="st">
                        <div class="n">
                            <span class="badge"><Icon :name="s.icon" /></span
                            >{{ i + 1 }}. {{ s.title }}
                        </div>
                        <p>{{ s.text }}</p>
                    </div>
                </div>
            </section>

            <!-- Needs -->
            <section class="sec">
                <h2>Find earbuds for your needs</h2>
                <p class="sub">
                    Start from how you listen, not from a spec sheet.
                </p>
                <div class="needs">
                    <NuxtLink
                        v-for="n in needs"
                        :key="n.slug"
                        :to="`/explore?use=${n.slug}`"
                        class="nd"
                    >
                        <span class="badge"><Icon :name="n.icon" /></span>
                        <b>{{ n.label }}</b>
                        <span class="nd-t">{{ n.text }}</span>
                    </NuxtLink>
                </div>
            </section>

            <!-- Popular comparisons -->
            <section class="sec">
                <h2>Popular comparisons</h2>
                <p class="sub">Head-to-head matchups people compare most.</p>
                <div class="comps">
                    <div v-for="c in comparisons" :key="c.to" class="cp">
                        <div class="cpm">
                            <div class="cpi">
                                <Icon
                                    name="material-symbols:headphones-outline"
                                    class="ph"
                                />{{ c.a.name }}
                            </div>
                            <span class="vs">VS</span>
                            <div class="cpi">
                                <Icon
                                    name="material-symbols:headphones-outline"
                                    class="ph"
                                />{{ c.b.name }}
                            </div>
                        </div>
                        <NuxtLink :to="c.to" class="l"
                            >Compare now
                            <Icon name="material-symbols:arrow-right-alt"
                        /></NuxtLink>
                    </div>
                </div>
            </section>

            <!-- Trending -->
            <section class="sec">
                <h2>Trending earbuds</h2>
                <p class="sub">Add any pair to Compare with one click.</p>
                <div class="picks">
                    <div v-for="p in featured" :key="p.slug" class="pk">
                        <NuxtLink :to="`/earbuds/${p.slug}`" class="pki">
                            <img
                                v-if="p.image"
                                :src="p.image"
                                :alt="p.name"
                                loading="lazy"
                            />
                            <Icon
                                v-else
                                name="material-symbols:headphones-outline"
                                class="ph big"
                            />
                        </NuxtLink>
                        <div class="br">{{ p.brand }}</div>
                        <NuxtLink :to="`/earbuds/${p.slug}`" class="nm">{{
                            p.name
                        }}</NuxtLink>
                        <div class="rt">
                            <span class="star">★</span> {{ p.rating }} ({{
                                new Intl.NumberFormat('en-IN').format(
                                    p.reviews
                                )
                            }})
                        </div>
                        <div class="pp">
                            <b>{{ inr(p.price) }}</b
                            ><s v-if="p.mrp > p.price">{{ inr(p.mrp) }}</s>
                        </div>
                        <NuxtLink :to="`/compare?ids=${p.slug}`" class="ad">
                            <Icon name="material-symbols:compare-arrows" />Add
                            to Compare
                        </NuxtLink>
                    </div>
                </div>
            </section>

            <!-- Brands -->
            <section class="sec">
                <h2>Browse by brand</h2>
                <p class="sub">Explore earbuds from popular brands.</p>
                <div class="brands">
                    <NuxtLink
                        v-for="b in brands"
                        :key="b.slug"
                        :to="`/brands/${b.slug}`"
                        class="bd"
                        >{{ b.name }}</NuxtLink
                    >
                </div>
                <NuxtLink to="/brands" class="more"
                    >All brands <Icon name="material-symbols:arrow-right-alt"
                /></NuxtLink>
            </section>

            <!-- Buying guide banner -->
            <section class="band">
                <div>
                    <h2>Not sure where to start?</h2>
                    <p>
                        Our buying guide explains ANC, latency, codecs and
                        battery in plain language.
                    </p>
                </div>
                <NuxtLink to="/buying-guide">Read the buying guide</NuxtLink>
            </section>
        </div>
    </div>
</template>

<style scoped>
.home {
    color: #1b1d20;
    line-height: 1.5;
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
}
.home * {
    box-sizing: border-box;
}
.home a {
    text-decoration: none;
    color: inherit;
}
.home :focus-visible {
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
    grid-template-columns: 1.05fr 1fr;
    gap: 56px;
    align-items: center;
    padding-top: 72px;
    padding-bottom: 72px;
}
.eyebrow {
    font-size: 13px;
    font-weight: 600;
    color: #12605f;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
h1 {
    margin: 12px 0 0;
    font-size: 56px;
    line-height: 1.08;
    font-weight: 700;
    letter-spacing: -0.02em;
}
h1 em {
    font-style: normal;
    color: #12605f;
}
.lead {
    margin: 18px 0 28px;
    font-size: 17px;
    color: #4a5158;
    max-width: 520px;
}
.search {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #fff;
    border: 1px solid #cfd8d6;
    border-radius: 12px;
    padding: 6px 6px 6px 16px;
    max-width: 540px;
}
.s-ic {
    font-size: 22px;
    color: #5f666d;
}
.search input {
    flex: 1;
    border: 0;
    outline: 0;
    font: inherit;
    font-size: 15px;
    background: none;
    height: 44px;
    min-width: 0;
}
.go {
    background: #12605f;
    color: #fff;
    border: 0;
    border-radius: 8px;
    height: 44px;
    padding: 0 22px;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}
.go:hover {
    background: #0f5150;
}
.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
}
.chip {
    background: #fff;
    border: 1px solid #d6dede;
    border-radius: 999px;
    padding: 7px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #33393e;
    transition: border-color 0.2s;
}
.chip:hover {
    border-color: #12605f;
}
.cta2 {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    margin-top: 26px;
    font-size: 14px;
    font-weight: 500;
}
.cta2 a {
    color: #12605f;
    border-bottom: 1.5px solid #12605f;
}
.cta2 a.alt {
    color: #33393e;
    border-color: #33393e;
}

/* Compare preview */
.pv {
    background: #fff;
    border: 1px solid #dfe6e4;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 12px 30px rgba(15, 60, 58, 0.08);
}
.pvh {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #5f666d;
    margin-bottom: 14px;
}
.pvh b {
    color: #1b1d20;
    font-weight: 600;
    font-size: 14px;
}
.pvg {
    display: grid;
    grid-template-columns: 90px 1fr 1fr;
    column-gap: 12px;
}
.pvp {
    background: #f3f4f5;
    border-radius: 12px;
    padding: 14px 10px 10px;
    text-align: center;
    margin-bottom: 4px;
}
.pvp img {
    width: 90px;
    height: 60px;
    object-fit: contain;
    mix-blend-mode: multiply;
}
.pvp div {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
    margin-top: 6px;
}
.ph {
    font-size: 40px;
    color: #b7bcc2;
}
.ph.big {
    font-size: 56px;
}
.pl {
    font-size: 12.5px;
    color: #5f666d;
    padding: 13px 0;
    border-top: 1px solid #eef0f1;
}
.pc {
    font-size: 14px;
    font-weight: 500;
    padding: 13px 10px;
    border-top: 1px solid #eef0f1;
    display: flex;
    align-items: center;
    gap: 6px;
}
.pc.b {
    background: #eaf7f0;
    color: #17734a;
    font-weight: 600;
}
.tg {
    background: #17734a;
    color: #fff;
    border-radius: 5px;
    font-size: 10px;
    padding: 1px 6px;
    font-weight: 600;
}
.pvf {
    margin-top: 14px;
    display: block;
    text-align: center;
    background: #12605f;
    color: #fff !important;
    border-radius: 8px;
    padding: 11px;
    font-size: 14px;
    font-weight: 500;
}
.pvf:hover {
    background: #0f5150;
}

/* Sections */
.sec {
    padding-top: 35px;
}
.sec h2 {
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.01em;
}
.sub {
    margin: 8px 0 28px;
    color: #5f666d;
    font-size: 15px;
}
.badge {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: #e6f5ef;
    color: #12605f;
    display: grid;
    place-items: center;
    font-size: 24px;
    flex: none;
}

.steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}
.st {
    border: 1px solid #e6e8ea;
    border-radius: 16px;
    padding: 26px;
}
.st .n {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 600;
}
.st p {
    margin: 12px 0 0;
    color: #5f666d;
    font-size: 14.5px;
}

.needs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 14px;
}
.nd {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition:
        border-color 0.2s,
        box-shadow 0.2s;
}
.nd:hover {
    border-color: #12605f;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.nd .badge {
    width: 42px;
    height: 42px;
    font-size: 22px;
}
.nd b {
    font-size: 16px;
    font-weight: 600;
}
.nd-t {
    font-size: 13px;
    color: #5f666d;
    line-height: 1.45;
}

.comps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
}
.cp {
    border: 1px solid #e6e8ea;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.cpm {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cpi {
    flex: 1;
    background: #f3f4f5;
    border-radius: 10px;
    padding: 10px 6px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}
.vs {
    font-size: 12px;
    font-weight: 700;
    color: #12605f;
    background: #e6f5ef;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    flex: none;
}
.cp .l {
    color: #12605f;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
}
.cp .l:hover {
    text-decoration: underline;
}

.picks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
}
.pk {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.pki {
    position: relative;
    background: #f3f4f5;
    border-radius: 10px;
    height: 150px;
    display: grid;
    place-items: center;
    overflow: hidden;
}
.pki img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    mix-blend-mode: multiply;
}
.pk .br {
    font-size: 12px;
    color: #12605f;
    font-weight: 500;
    margin-top: 6px;
}
.pk .nm {
    font-size: 15.5px;
    font-weight: 600;
}
.pk .nm:hover {
    color: #12605f;
}
.pk .rt {
    font-size: 13px;
    color: #5f666d;
}
.star {
    color: #f6a623;
}
.pp {
    display: flex;
    align-items: baseline;
    gap: 8px;
}
.pp b {
    font-size: 20px;
    font-weight: 700;
}
.pp s {
    color: #6b7280;
    font-size: 13px;
}
.ad {
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid #12605f;
    color: #12605f;
    border-radius: 8px;
    padding: 9px;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
}
.ad:hover {
    background: #e6f5ef;
}

.brands {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
.bd {
    border: 1px solid #e6e8ea;
    border-radius: 12px;
    padding: 14px 26px;
    font-size: 15px;
    font-weight: 600;
    color: #33393e;
    transition: border-color 0.2s;
}
.bd:hover {
    border-color: #12605f;
}
.more {
    margin-top: 22px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #12605f;
    font-weight: 500;
    font-size: 14px;
}

.band {
    margin: 80px 0 60px;
    background: #12605f;
    color: #fff;
    border-radius: 20px;
    padding: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
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
.band a {
    background: #fff;
    color: #12605f;
    border-radius: 10px;
    padding: 13px 26px;
    font-weight: 600;
    font-size: 15px;
    white-space: nowrap;
}

@media (max-width: 860px) {
    .hero-grid {
        grid-template-columns: 1fr;
        gap: 36px;
        padding-top: 44px;
        padding-bottom: 44px;
    }
    h1 {
        font-size: 40px;
    }
    .sec h2 {
        font-size: 26px;
    }
    .steps {
        grid-template-columns: 1fr;
    }
    .band {
        flex-direction: column;
        align-items: flex-start;
        padding: 28px;
    }
}
</style>
