<script setup>
const product = {
    name: 'Realme Buds Air 7',
    brand: 'Realme',
    brandUrl: '/brands/realme',
    rating: 4.3,
    reviews: 1245,
    verified: true,
    price: 2999,
    mrp: 3999,
    buyUrl: '#',
    images: [], // add image URLs, e.g. '/images/realme-buds-air-7-1.webp'
    verdict:
        'A strong choice for music lovers looking for powerful bass, good ANC, and long battery life. It also performs well in gaming with low latency and offers a comfortable fit for all-day use.',
    bestFor: ['Music', 'Bass Lovers', 'Gaming', 'Daily Use'],
    notIdealFor: ['Calls in Crowd', 'Wireless Charging'],
    specs: [
        { icon: 'battery', value: '52H', label: 'Total Battery' },
        { icon: 'anc', value: '50dB', label: 'ANC' },
        { icon: 'target', value: '88ms', label: 'Low Latency' },
        { icon: 'drop', value: 'IP55', label: 'Water Resistant' },
        { icon: 'dual', value: 'Dual Device', label: 'Connection' }
    ]
};

const active = ref(0);
const favourite = ref(false);
const inCompare = ref(false);
const inWishlist = ref(false);

const count = computed(() => product.images.length);
const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);
const saved = computed(() => (product.mrp ?? 0) - product.price);
const percent = computed(() =>
    product.mrp ? Math.round((saved.value / product.mrp) * 100) : 0
);
const starFill = computed(() => `${(product.rating / 5) * 100}%`);

function go(step) {
    if (!count.value) return;
    active.value = (active.value + step + count.value) % count.value;
}

async function share() {
    if (!import.meta.client) return;
    try {
        if (navigator.share)
            await navigator.share({ title: product.name, url: location.href });
        else await navigator.clipboard.writeText(location.href);
    } catch {}
}
</script>

<template>
    <div class="pd">
        <!-- Icon sprite -->
        <svg width="0" height="0" style="position: absolute" aria-hidden="true">
            <symbol id="pd-bag" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
            </symbol>
            <symbol id="pd-swap" viewBox="0 0 24 24">
                <path d="M17 3l4 4-4 4" />
                <path d="M3 7h18" />
                <path d="M7 21l-4-4 4-4" />
                <path d="M21 17H3" />
            </symbol>
            <symbol id="pd-heart" viewBox="0 0 24 24">
                <path
                    d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"
                />
            </symbol>
            <symbol id="pd-bolt" viewBox="0 0 24 24">
                <path d="M13 2 3 14h9l-1 8 10-12h-9z" />
            </symbol>
            <symbol id="pd-clock" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
            </symbol>
            <symbol id="pd-share" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </symbol>
            <symbol id="pd-shield" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </symbol>
            <symbol id="pd-spark" viewBox="0 0 24 24">
                <path
                    d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z"
                />
            </symbol>
            <symbol id="pd-battery" viewBox="0 0 24 24">
                <rect x="6" y="4" width="12" height="18" rx="2" />
                <path d="M10 2h4" />
                <path d="M12 9v6M9 12h6" />
            </symbol>
            <symbol id="pd-anc" viewBox="0 0 24 24">
                <path d="M3 10v4M7 7v10M11 4v16M15 7v10M19 10v4M22 11v2" />
            </symbol>
            <symbol id="pd-target" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1.5" />
            </symbol>
            <symbol id="pd-drop" viewBox="0 0 24 24">
                <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
            </symbol>
            <symbol id="pd-dual" viewBox="0 0 24 24">
                <path d="M4 8h16l-4-4" />
                <path d="M20 16H4l4 4" />
            </symbol>
            <symbol id="pd-prev" viewBox="0 0 24 24">
                <path d="M15 5l-7 7 7 7" />
            </symbol>
            <symbol id="pd-next" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
            </symbol>
        </svg>

        <nav class="crumbs" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">›</span>
            <NuxtLink :to="product.brandUrl || '#'">{{
                product.brand
            }}</NuxtLink
            ><span aria-hidden="true">›</span>
            <b>{{ product.name }}</b>
        </nav>

        <div class="grid">
            <!-- Gallery -->
            <section aria-label="Product images">
                <div class="stage">
                    <button
                        class="round nav prev"
                        aria-label="Previous image"
                        @click="go(-1)"
                    >
                        <svg class="i"><use href="#pd-prev" /></svg>
                    </button>
                    <button
                        class="round nav next"
                        aria-label="Next image"
                        @click="go(1)"
                    >
                        <svg class="i"><use href="#pd-next" /></svg>
                    </button>
                    <button
                        class="round fav"
                        :class="{ on: favourite }"
                        :aria-pressed="favourite"
                        aria-label="Save to favourites"
                        @click="favourite = !favourite"
                    >
                        <svg class="i"><use href="#pd-heart" /></svg>
                    </button>
                    <img
                        v-if="count"
                        :src="product.images[active]"
                        :alt="`${product.name} image ${active + 1}`"
                        class="main-img"
                    />
                </div>

                <div class="thumbs" role="tablist">
                    <button
                        v-for="(src, k) in product.images"
                        :key="src + k"
                        class="thumb"
                        role="tab"
                        :aria-selected="k === active"
                        :aria-label="`Image ${k + 1}`"
                        @click="active = k"
                    >
                        <img :src="src" alt="" loading="lazy" />
                    </button>
                </div>

                <div class="specs">
                    <div v-for="s in product.specs" :key="s.label" class="spec">
                        <svg class="i"><use :href="`#pd-${s.icon}`" /></svg>
                        <b>{{ s.value }}</b>
                        <small>{{ s.label }}</small>
                    </div>
                </div>
            </section>

            <!-- Info -->
            <section>
                <div class="head">
                    <div>
                        <h1>{{ product.name }}</h1>
                        <NuxtLink class="brand" :to="product.brandUrl || '#'">{{
                            product.brand
                        }}</NuxtLink>
                    </div>
                    <button class="share" @click="share">
                        <svg class="i"><use href="#pd-share" /></svg>Share
                    </button>
                </div>

                <div class="rate">
                    <span
                        class="stars"
                        :style="{ '--fill': starFill }"
                        role="img"
                        :aria-label="`${product.rating} out of 5 stars`"
                        >★★★★★</span
                    >
                    <b>{{ product.rating }}</b>
                    <span class="n"
                        >({{
                            new Intl.NumberFormat('en-IN').format(
                                product.reviews
                            )
                        }}
                        reviews)</span
                    >
                    <span v-if="product.verified" class="ver"
                        ><svg class="i"><use href="#pd-shield" /></svg
                        >Verified</span
                    >
                </div>

                <div class="price">
                    <span class="now">{{ inr(product.price) }}</span>
                    <template v-if="product.mrp && product.mrp > product.price">
                        <span class="old">{{ inr(product.mrp) }}</span>
                        <span class="off">{{ percent }}% OFF</span>
                    </template>
                </div>
                <div v-if="saved > 0" class="deal">
                    <span class="good"
                        ><svg class="i"><use href="#pd-bolt" /></svg>Good
                        Price</span
                    >
                    <span
                        ><svg class="i"><use href="#pd-clock" /></svg>You save
                        {{ inr(saved) }} ({{ percent }}%)</span
                    >
                </div>

                <div class="cta">
                    <a
                        class="btn primary"
                        :href="product.buyUrl"
                        target="_blank"
                        rel="noopener sponsored"
                    >
                        <svg class="i"><use href="#pd-bag" /></svg>View Best
                        Price
                    </a>
                    <button
                        class="btn"
                        :class="{ on: inCompare }"
                        :aria-pressed="inCompare"
                        @click="inCompare = !inCompare"
                    >
                        <svg class="i"><use href="#pd-swap" /></svg
                        >{{ inCompare ? 'Added to Compare' : 'Add to Compare' }}
                    </button>
                    <button
                        class="btn"
                        :class="{ on: inWishlist }"
                        :aria-pressed="inWishlist"
                        @click="inWishlist = !inWishlist"
                    >
                        <svg class="i"><use href="#pd-heart" /></svg
                        >{{ inWishlist ? 'In Wishlist' : 'Add to Wishlist' }}
                    </button>
                </div>

                <div class="verdict">
                    <h2>
                        <svg class="i spark"><use href="#pd-spark" /></svg
                        >BudsArena Verdict
                    </h2>
                    <p>{{ product.verdict }}</p>
                    <div class="fit">
                        <div>
                            <h3>Best For</h3>
                            <div class="tags">
                                <span
                                    v-for="t in product.bestFor"
                                    :key="t"
                                    class="tag"
                                    >{{ t }}</span
                                >
                            </div>
                        </div>
                        <div>
                            <h3>Not Ideal For</h3>
                            <div class="tags">
                                <span
                                    v-for="t in product.notIdealFor"
                                    :key="t"
                                    class="tag no"
                                    >{{ t }}</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.pd {
    --bg: #fff;
    --surface: #f3f4f5;
    --text: #1b1d20;
    --muted: #5f666d;
    --line: #e6e8ea;
    --brand: #12605f;
    --brand-ink: #fff;
    --vbg: linear-gradient(135deg, #e6f5ef, #f1faf6);
    --vline: #cfe6dc;
    --good: #17734a;
    --goodbg: #ddf3e7;
    --bad: #d32f2f;
    --badbg: #fdeeee;
    --badline: #f4b9b9;
    --tagbg: #e3f4ec;
    --star: #f6a623;
    --empty: #d9dcdf;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 16px;
    color: var(--text);
    line-height: 1.5;
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
}
@media (prefers-color-scheme: dark) {
    .pd {
        --bg: #101315;
        --surface: #1b1f22;
        --text: #eef0f1;
        --muted: #a3abb2;
        --line: #2c3236;
        --brand: #2a9d9d;
        --brand-ink: #08191a;
        --vbg: linear-gradient(135deg, #14282a, #112224);
        --vline: #24474a;
        --good: #6fdca2;
        --goodbg: #173a2a;
        --bad: #ff8b8b;
        --badbg: #3a1a1a;
        --badline: #6b2d2d;
        --tagbg: #173a2a;
        --empty: #3a4146;
    }
}
.pd * {
    box-sizing: border-box;
}
.pd a {
    color: inherit;
    text-decoration: none;
}
.pd button {
    font: inherit;
    cursor: pointer;
    color: inherit;
}
.pd :focus-visible {
    outline: 2px solid var(--brand);
    outline-offset: 2px;
}
.i {
    width: 1em;
    height: 1em;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    flex: none;
}
.crumbs {
    padding: 16px 0 18px;
    font-size: 14px;
    color: var(--muted);
    display: flex;
    gap: 12px;
    align-items: center;
}
.crumbs a {
    color: var(--brand);
}
.crumbs b {
    color: var(--text);
    font-weight: 500;
}
.grid {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr);
    gap: 36px;
    align-items: start;
}

.stage {
    position: relative;
    background: var(--surface);
    border-radius: 14px;
    aspect-ratio: 1.5/1;
    display: grid;
    place-items: center;
    overflow: hidden;
}
.main-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}
.round {
    position: absolute;
    border-radius: 50%;
    border: 0;
    background: #fff;
    color: #222;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    display: grid;
    place-items: center;
    z-index: 2;
}
.round.nav {
    width: 34px;
    height: 34px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
}
.prev {
    left: 10px;
}
.next {
    right: 10px;
}
.round.fav {
    width: 30px;
    height: 30px;
    right: 10px;
    top: 10px;
    font-size: 15px;
}
.round.fav.on {
    color: #e53935;
}
.round.fav.on .i {
    fill: #e53935;
}
.thumbs {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
    margin-top: 14px;
}
.thumb {
    width: 100%;
    aspect-ratio: 1.1/1;
    background: var(--surface);
    border: 1.5px solid transparent;
    border-radius: 8px;
    padding: 6px;
    overflow: hidden;
}
.thumb[aria-selected='true'] {
    border-color: var(--brand);
}
.thumb img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}

.specs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-top: 18px;
    border-top: 1px solid var(--line);
    padding-top: 18px;
}
.spec {
    text-align: center;
    padding: 0 4px;
    border-right: 1px solid var(--line);
}
.spec:last-child {
    border-right: 0;
}
.spec .i {
    font-size: 22px;
    color: var(--brand);
    margin-bottom: 6px;
}
.spec b {
    display: block;
    font-weight: 500;
    font-size: 13px;
}
.spec small {
    display: block;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.3;
}

.head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: flex-start;
}
h1 {
    margin: 0;
    font-size: clamp(26px, 3.6vw, 28px);
    line-height: 1.15;
    font-weight: 600;
    letter-spacing: -0.01em;
}
.brand {
    display: inline-block;
    margin-top: 10px;
    color: var(--brand);
    font-weight: 500;
    font-size: 15px;
}
.share {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--line);
    background: var(--bg);
    border-radius: 10px;
    padding: 9px 16px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
}
.rate {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 12px;
    font-size: 14px;
}
.stars {
    font-size: 22px;
    letter-spacing: 1px;
    line-height: 1;
    background: linear-gradient(
        90deg,
        var(--star) var(--fill),
        var(--empty) var(--fill)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.rate b {
    font-weight: 600;
}
.rate .n {
    color: var(--muted);
}
.ver {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid var(--vline);
    background: var(--vbg);
    color: var(--brand);
    border-radius: 6px;
    padding: 2px 9px;
    font-size: 11px;
}
.price {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 20px;
}
.now {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
}
.old {
    font-size: 18px;
    color: var(--muted);
    text-decoration: line-through;
    font-weight: 500;
}
.off {
    background: var(--goodbg);
    color: var(--good);
    border-radius: 8px;
    padding: 4px 14px;
    font-weight: 600;
    font-size: 14px;
}
.deal {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 12px;
    font-size: 14px;
    color: var(--muted);
}
.deal span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.good {
    background: var(--goodbg);
    color: var(--good);
    border-radius: 8px;
    padding: 5px 12px;
    font-weight: 500;
}

.cta {
    display: grid;
    grid-template-columns: 1.25fr 1fr 0.85fr;
    gap: 12px;
    margin-top: 20px;
}
.btn {
    border: 1px solid var(--line);
    background: var(--bg);
    color: var(--text);
    border-radius: 8px;
    height: 42px;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}
.btn.primary {
    background: var(--brand);
    border-color: var(--brand);
    color: var(--brand-ink);
}
.btn:hover {
    filter: brightness(0.96);
}
.btn.on {
    background: var(--goodbg);
    color: var(--good);
}

.verdict {
    margin-top: 20px;
    background: var(--vbg);
    border: 1px solid var(--vline);
    border-radius: 12px;
    padding: 18px 20px;
}
.verdict h2 {
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
}
.verdict .spark {
    color: var(--brand);
    fill: currentColor;
    stroke: none;
}
.verdict p {
    margin: 0 0 16px;
    font-size: 14.5px;
}
.fit {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.fit > div:first-child {
    padding-right: 18px;
    border-right: 1px solid var(--vline);
}
.fit > div:last-child {
    padding-left: 18px;
}
.fit h3 {
    margin: 0 0 10px;
    font-size: 13.5px;
    font-weight: 600;
}
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.tag {
    font-size: 12px;
    padding: 5px 11px;
    border-radius: 6px;
    background: var(--tagbg);
    color: var(--good);
    border: 1px solid var(--vline);
}
.tag.no {
    background: var(--badbg);
    color: var(--bad);
    border-color: var(--badline);
}

@media (max-width: 860px) {
    .grid {
        grid-template-columns: 1fr;
    }
    .cta,
    .fit {
        grid-template-columns: 1fr;
    }
    .fit > div:first-child {
        padding: 0 0 14px;
        border-right: 0;
        border-bottom: 1px solid var(--vline);
    }
    .fit > div:last-child {
        padding: 14px 0 0;
    }
}
</style>
