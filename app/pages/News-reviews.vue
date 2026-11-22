<!--
  pages/news-reviews/index.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /news-reviews        Articles link to /news-reviews/<slug>
  Needs: @nuxt/icon + @iconify-json/material-symbols
  Header and footer live in layouts/default.vue, not in this file.
  `articles` below is SAMPLE content. Replace with your API/CMS, e.g.:
    const { data: articles } = await useFetch('/api/articles')   // then use articles.value
-->
<script setup>
useSeoMeta({
    title: 'News & Reviews – BudsArena',
    description:
        'Honest reviews, launch news and buying advice to help you choose better earbuds.'
});

// ---------- SAMPLE articles (replace with real content) ----------
const articles = [
    {
        slug: 'realme-buds-air-7-review',
        type: 'Review',
        featured: true,
        rating: 4.3,
        image: '',
        date: '2026-11-20',
        readMin: 8,
        author: 'BudsArena Team',
        title: 'Realme Buds Air 7 review: a strong all-rounder',
        excerpt:
            'We tested the sound, noise cancellation, battery and calls to see who should buy it, and who should wait.'
    },
    {
        slug: 'realme-buds-air-7-review-short',
        type: 'Review',
        rating: 4.3,
        image: '',
        date: '2026-11-19',
        readMin: 6,
        author: 'BudsArena Team',
        title: 'Realme Buds Air 7 in daily use',
        excerpt: 'How the sound, ANC and battery hold up in daily use.'
    },
    {
        slug: 'best-earbuds-under-2000',
        type: 'Guide',
        image: '',
        date: '2026-11-18',
        readMin: 5,
        author: 'BudsArena Team',
        title: 'Best earbuds under ₹2,000',
        excerpt: 'Our shortlist, compared on battery, calls and latency.'
    },
    {
        slug: 'new-earbuds-launching-this-month',
        type: 'Launch',
        image: '',
        date: '2026-11-16',
        readMin: 3,
        author: 'BudsArena Team',
        title: 'New earbuds launching this month',
        excerpt: 'What to expect, with specs and prices as they are announced.'
    },
    {
        slug: 'oneplus-nord-buds-3-review',
        type: 'Review',
        rating: 4.1,
        image: '',
        date: '2026-11-14',
        readMin: 6,
        author: 'BudsArena Team',
        title: 'OnePlus Nord Buds 3 review',
        excerpt: 'A balanced pair for office work and commuting.'
    },
    {
        slug: 'another-earbuds-launch',
        type: 'Launch',
        image: '',
        date: '2026-11-12',
        readMin: 3,
        author: 'BudsArena Team',
        title: 'Another earbuds launch to watch',
        excerpt: 'Key features and how it compares with similar models.'
    },
    {
        slug: 'anc-or-transparency-mode',
        type: 'Guide',
        image: '',
        date: '2026-11-10',
        readMin: 4,
        author: 'BudsArena Team',
        title: 'ANC or transparency mode: which to use?',
        excerpt: 'When each mode helps, and how it affects battery.'
    },
    {
        slug: 'boat-airdopes-141-review',
        type: 'Review',
        rating: 4.0,
        image: '',
        date: '2026-11-08',
        readMin: 5,
        author: 'BudsArena Team',
        title: 'boAt Airdopes 141 review',
        excerpt: 'A budget pair with low latency for gaming.'
    },
    {
        slug: 'price-drops-this-week',
        type: 'News',
        image: '',
        date: '2026-11-06',
        readMin: 2,
        author: 'BudsArena Team',
        title: 'Price drops this week',
        excerpt: 'Earbuds that dropped in price recently.'
    }
];

const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Reviews', value: 'Review' },
    { label: 'News', value: 'News' },
    { label: 'Launches', value: 'Launch' },
    { label: 'Guides', value: 'Guide' }
];
const topics = [
    'ANC',
    'Gaming',
    'Battery',
    'Under ₹2,000',
    'Calls',
    'Launches',
    'Comparisons'
];
const PAGE = 6;

// ---------- State ----------
const type = ref('All');
const search = ref('');
const shown = ref(PAGE);

watch([type, search], () => (shown.value = PAGE));

const typeClass = { Review: '', Guide: '', News: 'n', Launch: 'l' };
const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    });
const newestFirst = (a, b) => b.date.localeCompare(a.date);

const filtered = computed(() => {
    const q = search.value.trim().toLowerCase();
    return articles
        .filter((a) => type.value === 'All' || a.type === type.value)
        .filter(
            (a) => !q || `${a.title} ${a.excerpt}`.toLowerCase().includes(q)
        )
        .sort(newestFirst);
});

// Featured story appears only on the unfiltered "All" view
const featured = computed(() =>
    type.value === 'All' && !search.value.trim()
        ? filtered.value.find((a) => a.featured)
        : null
);
const list = computed(() => filtered.value.filter((a) => a !== featured.value));
const visible = computed(() => list.value.slice(0, shown.value));

// Sidebar
const latestLaunches = computed(() =>
    articles
        .filter((a) => a.type === 'Launch' || a.type === 'News')
        .sort(newestFirst)
        .slice(0, 3)
);
const popularReviews = computed(() =>
    articles
        .filter((a) => a.type === 'Review' && a.rating)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
);

function pickTopic(t) {
    search.value = t;
    type.value = 'All';
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Newsletter ----------
const email = ref('');
const subStatus = ref(''); // '' | 'ok' | 'error' | 'sending'
async function subscribe() {
    if (!/.+@.+\..+/.test(email.value)) {
        subStatus.value = 'error';
        return;
    }
    subStatus.value = 'sending';
    try {
        // Create server/api/subscribe.post.js to handle this
        await $fetch('/api/subscribe', {
            method: 'POST',
            body: { email: email.value }
        });
        subStatus.value = 'ok';
        email.value = '';
    } catch (e) {
        subStatus.value = 'error';
    }
}
</script>

<template>
    <div class="nr">
        <div class="w">
            <header class="head">
                <nav class="crumbs" aria-label="Breadcrumb">
                    <NuxtLink to="/">Home</NuxtLink
                    ><span aria-hidden="true">›</span><b>News &amp; Reviews</b>
                </nav>
                <h1>News &amp; Reviews</h1>
                <p class="lead">
                    Honest reviews, launch news and buying advice to help you
                    choose better earbuds.
                </p>
            </header>

            <!-- Filter bar -->
            <div class="bar">
                <div class="tabs" role="tablist">
                    <button
                        v-for="t in tabs"
                        :key="t.value"
                        type="button"
                        role="tab"
                        class="tab"
                        :class="{ on: type === t.value }"
                        :aria-selected="type === t.value"
                        @click="type = t.value"
                    >
                        {{ t.label }}
                    </button>
                </div>
                <label class="sr">
                    <Icon name="material-symbols:search" />
                    <input
                        v-model="search"
                        type="search"
                        placeholder="Search articles…"
                        aria-label="Search articles"
                    />
                </label>
            </div>

            <div class="main">
                <div>
                    <!-- Featured -->
                    <NuxtLink
                        v-if="featured"
                        :to="`/news-reviews/${featured.slug}`"
                        class="feat"
                    >
                        <div class="ph">
                            <img
                                v-if="featured.image"
                                :src="featured.image"
                                :alt="featured.title"
                            />
                            <Icon
                                v-else
                                name="material-symbols:headphones-outline"
                                class="big"
                            />
                        </div>
                        <div class="fb">
                            <div class="top left">
                                <span
                                    class="tag"
                                    :class="typeClass[featured.type]"
                                    >{{ featured.type }}</span
                                >
                                <span v-if="featured.rating" class="rate"
                                    ><i>★</i>{{ featured.rating }}</span
                                >
                            </div>
                            <h2>{{ featured.title }}</h2>
                            <p>{{ featured.excerpt }}</p>
                            <div class="meta">
                                <span>{{ featured.author }}</span
                                ><span>•</span
                                ><span>{{ fmtDate(featured.date) }}</span
                                ><span>•</span
                                ><span>{{ featured.readMin }} min read</span>
                            </div>
                            <span class="read"
                                >Read the
                                {{
                                    featured.type === 'Review'
                                        ? 'review'
                                        : 'story'
                                }}
                                <Icon name="material-symbols:arrow-right-alt"
                            /></span>
                        </div>
                    </NuxtLink>

                    <!-- Grid -->
                    <div v-if="visible.length" class="grid">
                        <NuxtLink
                            v-for="a in visible"
                            :key="a.slug"
                            :to="`/news-reviews/${a.slug}`"
                            class="card"
                        >
                            <div class="ph">
                                <img
                                    v-if="a.image"
                                    :src="a.image"
                                    :alt="a.title"
                                    loading="lazy"
                                />
                                <Icon
                                    v-else
                                    name="material-symbols:headphones-outline"
                                    class="big"
                                />
                            </div>
                            <div class="cb">
                                <div class="top">
                                    <span
                                        class="tag"
                                        :class="typeClass[a.type]"
                                        >{{ a.type }}</span
                                    >
                                    <span v-if="a.rating" class="rate"
                                        ><i>★</i>{{ a.rating }}</span
                                    >
                                </div>
                                <h3>{{ a.title }}</h3>
                                <p>{{ a.excerpt }}</p>
                                <div class="meta">
                                    <span>{{ fmtDate(a.date) }}</span
                                    ><span>•</span
                                    ><span>{{ a.readMin }} min read</span>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                    <p v-else-if="!featured" class="empty">
                        No articles found. Try a different search or filter.
                    </p>

                    <button
                        v-if="list.length > shown"
                        type="button"
                        class="more"
                        @click="shown += PAGE"
                    >
                        Load more articles
                    </button>
                </div>

                <!-- Sidebar -->
                <aside class="side">
                    <section class="box">
                        <h2>Latest launches</h2>
                        <NuxtLink
                            v-for="a in latestLaunches"
                            :key="a.slug"
                            :to="`/news-reviews/${a.slug}`"
                            class="li"
                        >
                            <div class="ph">
                                <Icon
                                    name="material-symbols:headphones-outline"
                                />
                            </div>
                            <div>
                                <b>{{ a.title }}</b
                                ><span>{{ fmtDate(a.date) }}</span>
                            </div>
                        </NuxtLink>
                    </section>

                    <section class="box">
                        <h2>Popular reviews</h2>
                        <NuxtLink
                            v-for="a in popularReviews"
                            :key="a.slug"
                            :to="`/news-reviews/${a.slug}`"
                            class="li"
                        >
                            <div class="ph">
                                <Icon
                                    name="material-symbols:headphones-outline"
                                />
                            </div>
                            <div>
                                <b>{{ a.title }}</b
                                ><span>★ {{ a.rating }}</span>
                            </div>
                        </NuxtLink>
                    </section>

                    <section class="box">
                        <h2>Browse by topic</h2>
                        <div class="topics">
                            <button
                                v-for="t in topics"
                                :key="t"
                                type="button"
                                class="topic"
                                @click="pickTopic(t)"
                            >
                                {{ t }}
                            </button>
                        </div>
                    </section>

                    <form class="box nl" @submit.prevent="subscribe">
                        <h2>Get new reviews by email</h2>
                        <p>New reviews and launches, straight to your inbox.</p>
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Your email address"
                            aria-label="Email address"
                        />
                        <button
                            type="submit"
                            :disabled="subStatus === 'sending'"
                        >
                            {{
                                subStatus === 'sending'
                                    ? 'Subscribing…'
                                    : 'Subscribe'
                            }}
                        </button>
                        <small
                            v-if="subStatus === 'ok'"
                            class="ok"
                            role="status"
                            >Thanks! You are subscribed.</small
                        >
                        <small
                            v-if="subStatus === 'error'"
                            class="bad"
                            role="alert"
                            >Please enter a valid email and try again.</small
                        >
                    </form>
                </aside>
            </div>

            <!-- CTA -->
            <section class="band">
                <div>
                    <h2>Ready to compare?</h2>
                    <p>
                        Put your shortlist side by side and see which one wins.
                    </p>
                </div>
                <div class="bt">
                    <NuxtLink to="/compare">Start comparing</NuxtLink>
                    <NuxtLink to="/explore" class="o">Browse earbuds</NuxtLink>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.nr {
    color: #1b1d20;
    line-height: 1.5;
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
    padding-bottom: 60px;
}
.nr * {
    box-sizing: border-box;
}
.nr a {
    text-decoration: none;
    color: inherit;
}
.nr button {
    font: inherit;
    color: inherit;
    cursor: pointer;
}
.nr :focus-visible {
    outline: 2px solid #12605f;
    outline-offset: 2px;
}
.w {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 20px;
}

.head {
    padding-top: 40px;
}
.crumbs {
    display: flex;
    gap: 12px;
    font-size: 14px;
    color: #5f666d;
    margin-bottom: 14px;
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
    font-size: 40px;
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.02em;
}
.lead {
    margin: 10px 0 0;
    font-size: 16px;
    color: #5f666d;
    max-width: 600px;
}

.bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 28px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e8ea;
}
.tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.tab {
    border: 1px solid #d6dade;
    background: #fff;
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 14px;
    font-weight: 500;
    color: #33393e;
    transition: border-color 0.2s;
}
.tab:hover {
    border-color: #12605f;
}
.tab.on {
    background: #12605f;
    border-color: #12605f;
    color: #fff;
}
.sr {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    height: 42px;
    padding: 0 12px;
    width: 280px;
    color: #5f666d;
    font-size: 20px;
    background: #fff;
}
.sr:focus-within {
    border-color: #12605f;
    box-shadow: 0 0 0 3px rgba(18, 96, 95, 0.15);
}
.sr input {
    border: 0;
    outline: 0;
    flex: 1;
    font: inherit;
    font-size: 14px;
    min-width: 0;
    background: none;
    color: #1b1d20;
}

.main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 40px;
    align-items: start;
}

.ph {
    position: relative;
    background: #f3f4f5;
    display: grid;
    place-items: center;
    color: #aab1b8;
    overflow: hidden;
}
.ph img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.ph .big {
    font-size: 44px;
}
.tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    border-radius: 6px;
    padding: 3px 10px;
    background: #e3f4ec;
    color: #17734a;
}
.tag.n {
    background: #e8eefc;
    color: #2b4fb0;
}
.tag.l {
    background: #fff1e0;
    color: #9a5300;
}
.meta {
    font-size: 12.5px;
    color: #5f666d;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}
.rate {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
}
.rate i {
    font-style: normal;
    color: #f6a623;
}

.feat {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    border: 1px solid #e6e8ea;
    border-radius: 18px;
    overflow: hidden;
    margin-bottom: 28px;
    transition: box-shadow 0.2s;
}
.feat:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
}
.feat .ph {
    min-height: 330px;
}
.fb {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
}
.fb h2 {
    margin: 0;
    font-size: 28px;
    line-height: 1.25;
    font-weight: 600;
}
.fb p {
    margin: 0;
    color: #4a5158;
    font-size: 15px;
}
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.top.left {
    justify-content: flex-start;
    gap: 12px;
}
.read {
    color: #12605f;
    font-weight: 500;
    font-size: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
}
.card {
    border: 1px solid #e6e8ea;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition:
        box-shadow 0.2s,
        transform 0.2s;
}
.card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
}
.card .ph {
    height: 170px;
}
.cb {
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}
.cb h3 {
    margin: 0;
    font-size: 18px;
    line-height: 1.35;
    font-weight: 600;
}
.cb p {
    margin: 0;
    color: #5f666d;
    font-size: 14px;
}
.cb .meta {
    margin-top: auto;
    padding-top: 6px;
}
.more {
    display: block;
    margin: 30px auto 0;
    width: 220px;
    text-align: center;
    border: 1px solid #12605f;
    background: #fff;
    color: #12605f;
    border-radius: 10px;
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
}
.more:hover {
    background: #e6f5ef;
}
.empty {
    padding: 50px 0;
    text-align: center;
    color: #5f666d;
}

.side {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.box {
    border: 1px solid #e6e8ea;
    border-radius: 16px;
    padding: 20px;
}
.box h2 {
    margin: 0 0 14px;
    font-size: 16px;
    font-weight: 600;
}
.li {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #eef0f1;
    align-items: flex-start;
}
.box h2 + .li {
    border-top: 0;
    padding-top: 0;
}
.li .ph {
    width: 64px;
    height: 52px;
    border-radius: 8px;
    flex: none;
    font-size: 24px;
}
.li b {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
}
.li:hover b {
    color: #12605f;
}
.li span {
    font-size: 12px;
    color: #5f666d;
}
.topics {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
.topic {
    border: 1px solid #d6dade;
    background: #fff;
    border-radius: 999px;
    padding: 6px 14px;
    font-size: 13px;
    color: #33393e;
}
.topic:hover {
    border-color: #12605f;
    color: #12605f;
}
.nl {
    background: #f1f7f5;
    border-color: #dfe6e4;
}
.nl p {
    margin: 0 0 12px;
    font-size: 13.5px;
    color: #4a5158;
}
.nl input {
    width: 100%;
    height: 42px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    padding: 0 12px;
    font: inherit;
    font-size: 14px;
    margin-bottom: 10px;
    background: #fff;
}
.nl button {
    width: 100%;
    height: 42px;
    border: 0;
    border-radius: 8px;
    background: #12605f;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
}
.nl button:hover {
    background: #0f5150;
}
.nl button:disabled {
    opacity: 0.7;
    cursor: wait;
}
.nl small {
    display: block;
    margin-top: 10px;
    font-size: 12.5px;
}
.ok {
    color: #17734a;
}
.bad {
    color: #c62828;
}

.band {
    margin-top: 64px;
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
.bt {
    display: flex;
    gap: 12px;
    flex: none;
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

@media (max-width: 900px) {
    .main {
        grid-template-columns: 1fr;
    }
    .feat {
        grid-template-columns: 1fr;
    }
    .feat .ph {
        min-height: 220px;
    }
    .grid {
        grid-template-columns: 1fr;
    }
    .bar {
        flex-direction: column;
        align-items: stretch;
    }
    .sr {
        width: 100%;
    }
    .tabs {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 4px;
    }
    .tab {
        white-space: nowrap;
    }
    h1 {
        font-size: 32px;
    }
    .band {
        flex-direction: column;
        align-items: flex-start;
        padding: 28px;
    }
    .bt {
        flex-wrap: wrap;
    }
}
</style>
