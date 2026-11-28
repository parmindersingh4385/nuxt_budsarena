<!--
  pages/explore.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /explore
  Example: /explore?minPrice=3000&use=gym&anc=true
  Supported query params: q, minPrice, maxPrice, use, anc, sort (rating | low | high | reviews)
  Needs: @nuxt/icon + @iconify-json/material-symbols
  Header and footer live in layouts/default.vue, not in this file.
  `catalog` below is SAMPLE data. Replace with your API, e.g.:
    const { data: catalog } = await useFetch('/api/earbuds')   // then use catalog.value
-->
<script setup>
const route = useRoute();
const router = useRouter();

// ---------- SAMPLE data (replace with real data) ----------
const catalog = [
    {
        slug: 'oneplus-buds-4',
        name: 'OnePlus Buds 4',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.5,
        reviews: 2124,
        price: 5999,
        mrp: 6499,
        anc: 45,
        ip: 'IP55',
        uses: ['gym', 'travel', 'office'],
        highlight: {
            label: 'Workout ready',
            icon: 'material-symbols:directions-run'
        }
    },
    {
        slug: 'nothing-ear-a',
        name: 'Nothing Ear (a)',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.4,
        reviews: 1732,
        price: 5499,
        mrp: 6999,
        anc: 45,
        ip: 'IP54',
        uses: ['gym', 'office'],
        highlight: {
            label: 'Secure fit',
            icon: 'material-symbols:shield-outline'
        }
    },
    {
        slug: 'realme-buds-air-7-pro',
        name: 'Realme Buds Air 7 Pro',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.5,
        reviews: 987,
        price: 4999,
        mrp: 5999,
        anc: 50,
        ip: 'IP55',
        uses: ['gym', 'travel'],
        highlight: {
            label: 'Workout ready',
            icon: 'material-symbols:directions-run'
        }
    },
    {
        slug: 'jbl-tune-beam-2',
        name: 'JBL Tune Beam 2',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.3,
        reviews: 1265,
        price: 4499,
        mrp: 5999,
        anc: 40,
        ip: 'IP54',
        uses: ['gym', 'calling'],
        highlight: {
            label: 'Secure fit',
            icon: 'material-symbols:shield-outline'
        }
    },
    {
        slug: 'realme-buds-air-7',
        name: 'Realme Buds Air 7',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.3,
        reviews: 1245,
        price: 2999,
        mrp: 3999,
        anc: 50,
        ip: 'IP55',
        uses: ['travel', 'office', 'students'],
        highlight: {
            label: 'Long battery',
            icon: 'material-symbols:battery-full-outline'
        }
    },
    {
        slug: 'oneplus-nord-buds-3',
        name: 'OnePlus Nord Buds 3',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.1,
        reviews: 980,
        price: 2199,
        mrp: 2699,
        anc: 32,
        ip: 'IP55',
        uses: ['office', 'students', 'calling'],
        highlight: {
            label: 'Clear calls',
            icon: 'material-symbols:phone-in-talk-outline'
        }
    },
    {
        slug: 'boat-airdopes-141',
        name: 'boAt Airdopes 141',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.0,
        reviews: 15210,
        price: 999,
        mrp: 4490,
        anc: 0,
        ip: 'IPX4',
        uses: ['gaming', 'students', 'gym'],
        highlight: {
            label: 'Low latency',
            icon: 'material-symbols:speed-outline'
        }
    },
    {
        slug: 'realme-buds-t300',
        name: 'Realme Buds T300',
        image: 'https://m.media-amazon.com/images/I/61ieBxHtuKL._SL1500_.jpg',
        rating: 4.2,
        reviews: 3120,
        price: 1999,
        mrp: 2999,
        anc: 30,
        ip: 'IP55',
        uses: ['travel', 'students'],
        highlight: {
            label: 'Long battery',
            icon: 'material-symbols:battery-full-outline'
        }
    }
];

const useInfo = {
    gym: { label: 'Gym', blurb: 'workouts and an active lifestyle' },
    office: { label: 'Office', blurb: 'work and clear calls' },
    travel: { label: 'Travel', blurb: 'travel and long journeys' },
    students: {
        label: 'Students',
        blurb: 'study and everyday listening on a budget'
    },
    gaming: { label: 'Gaming', blurb: 'gaming with low latency' },
    calling: { label: 'Calling', blurb: 'clear calls' }
};

const sortOptions = [
    { value: 'rating', label: 'Top rated' },
    { value: 'reviews', label: 'Most reviewed' },
    { value: 'low', label: 'Price: Low to High' },
    { value: 'high', label: 'Price: High to Low' }
];

// ---------- Filters come from the URL ----------
const one = (v) => (Array.isArray(v) ? v[0] : v);
const num = (v) => {
    const s = one(v);
    if (s === undefined || s === null || s === '') return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
};

const minPrice = computed(() => num(route.query.minPrice));
const maxPrice = computed(() => num(route.query.maxPrice));
const use = computed(() => String(one(route.query.use) || '').toLowerCase());
const anc = computed(() => one(route.query.anc) === 'true');
const sort = computed(() =>
    sortOptions.some((o) => o.value === one(route.query.sort))
        ? one(route.query.sort)
        : 'rating'
);

const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);

function setQuery(patch) {
    const next = { ...route.query, ...patch };
    Object.keys(next).forEach((k) => {
        if (
            next[k] === null ||
            next[k] === undefined ||
            next[k] === '' ||
            next[k] === false
        )
            delete next[k];
    });
    return next;
}
const go = (patch) => router.push({ query: setQuery(patch) });

// ---------- Search box (updates ?q= after a short pause) ----------
const search = ref(String(one(route.query.q) || ''));
let timer;
watch(search, (v) => {
    clearTimeout(timer);
    timer = setTimeout(
        () => router.replace({ query: setQuery({ q: v.trim() }) }),
        300
    );
});
watch(
    () => route.query.q,
    (v) => {
        const s = String(one(v) || '');
        if (s !== search.value.trim()) search.value = s;
    }
);
onBeforeUnmount(() => clearTimeout(timer));

// ---------- Page text ----------
const heading = computed(() =>
    useInfo[use.value]
        ? `${useInfo[use.value].label} Earbuds`
        : 'Explore Earbuds'
);

const priceText = computed(() => {
    if (minPrice.value !== null && maxPrice.value !== null)
        return `priced between ${inr(minPrice.value)} and ${inr(maxPrice.value)}`;
    if (minPrice.value !== null) return `priced above ${inr(minPrice.value)}`;
    if (maxPrice.value !== null) return `priced under ${inr(maxPrice.value)}`;
    return '';
});

const description = computed(() => {
    let s = 'Explore earbuds';
    if (priceText.value) s += ` ${priceText.value}`;
    if (anc.value) s += ' with ANC';
    if (useInfo[use.value])
        s += `${priceText.value || anc.value ? ',' : ''} selected for ${useInfo[use.value].blurb}`;
    return s + '.';
});

useSeoMeta({
    title: () => `${heading.value} – BudsArena`,
    description: () => description.value
});

// ---------- Filter chips ----------
const chips = computed(() => {
    const list = [];
    if (minPrice.value !== null || maxPrice.value !== null) {
        let label;
        if (minPrice.value !== null && maxPrice.value !== null)
            label = `Price: ${inr(minPrice.value)} – ${inr(maxPrice.value)}`;
        else if (minPrice.value !== null)
            label = `Price: ${inr(minPrice.value)}+`;
        else label = `Price: Under ${inr(maxPrice.value)}`;
        list.push({
            key: 'price',
            label,
            clear: { minPrice: null, maxPrice: null }
        });
    }
    if (use.value)
        list.push({
            key: 'use',
            label: `Use: ${useInfo[use.value]?.label || use.value}`,
            clear: { use: null }
        });
    if (anc.value)
        list.push({ key: 'anc', label: 'ANC: Yes', clear: { anc: null } });
    return list;
});

function clearAll() {
    go({ minPrice: null, maxPrice: null, use: null, anc: null });
}

// ---------- Results ----------
const results = computed(() => {
    const q = search.value.trim().toLowerCase();
    const items = catalog.filter((p) => {
        if (minPrice.value !== null && p.price < minPrice.value) return false;
        if (maxPrice.value !== null && p.price > maxPrice.value) return false;
        if (use.value && !p.uses.includes(use.value)) return false;
        if (anc.value && !p.anc) return false;
        if (q && !p.name.toLowerCase().includes(q)) return false;
        return true;
    });
    if (sort.value === 'low') items.sort((a, b) => a.price - b.price);
    else if (sort.value === 'high') items.sort((a, b) => b.price - a.price);
    else if (sort.value === 'reviews')
        items.sort((a, b) => b.reviews - a.reviews);
    else items.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return items;
});

const saved = (p) => (p.mrp > p.price ? p.mrp - p.price : 0);
</script>

<template>
    <div class="explorePage">
        <div class="page-wrap">
            <header class="head">
                <nav class="crumbs" aria-label="Breadcrumb">
                    <NuxtLink to="/">Home</NuxtLink
                    ><span aria-hidden="true">›</span><b>Explore</b>
                </nav>
                <h1>{{ heading }}</h1>
                <p class="lead">
                    {{ description }}
                </p>
            </header>

            <!-- Search + sort -->
            <div class="bar">
                <label class="sr">
                    <Icon name="material-symbols:search" />
                    <input
                        v-model="search"
                        type="search"
                        :placeholder="
                            useInfo[use]
                                ? `Search ${use} earbuds…`
                                : 'Search earbuds…'
                        "
                        aria-label="Search earbuds"
                    />
                </label>
                <label class="sort">
                    <span>Sort by:</span>
                    <select
                        :value="sort"
                        @change="
                            go({
                                sort:
                                    $event.target.value === 'rating'
                                        ? null
                                        : $event.target.value
                            })
                        "
                    >
                        <option
                            v-for="o in sortOptions"
                            :key="o.value"
                            :value="o.value"
                        >
                            {{ o.label }}
                        </option>
                    </select>
                </label>
            </div>

            <!-- Active filters -->
            <div v-if="chips.length" class="chips">
                <span v-for="c in chips" :key="c.key" class="chip">
                    {{ c.label }}
                    <button
                        type="button"
                        :aria-label="`Remove filter ${c.label}`"
                        @click="go(c.clear)"
                    >
                        <Icon name="material-symbols:close" />
                    </button>
                </span>
                <button type="button" class="clear" @click="clearAll">
                    Clear all
                </button>
            </div>

            <p class="count" role="status">
                {{ results.length }}
                {{ results.length === 1 ? 'result' : 'results' }} found
            </p>

            <!-- Results -->
            <div v-if="results.length" class="grid">
                <NuxtLink
                    v-for="p in results"
                    :key="p.slug"
                    :to="`/earbuds/${p.slug}`"
                    class="card"
                >
                    <div class="img">
                        <img
                            v-if="p.image"
                            :src="p.image"
                            :alt="p.name"
                            loading="lazy"
                        />
                        <Icon
                            v-else
                            name="material-symbols:headphones-outline"
                            class="ph"
                        />
                        <span v-if="saved(p)" class="badge"
                            >{{ inr(saved(p)) }} OFF</span
                        >
                    </div>
                    <h2>{{ p.name }}</h2>
                    <div class="rate">
                        <Icon
                            name="material-symbols:star-rounded"
                            class="star"
                        /><b>{{ p.rating }}</b>
                        <span
                            >({{
                                new Intl.NumberFormat('en-IN').format(
                                    p.reviews
                                )
                            }})</span
                        >
                    </div>
                    <div class="price">
                        <strong>{{ inr(p.price) }}</strong
                        ><s v-if="p.mrp > p.price">{{ inr(p.mrp) }}</s>
                    </div>
                    <ul class="feat">
                        <li v-if="p.anc">
                            <Icon name="material-symbols:graphic-eq" />ANC
                        </li>
                        <li v-if="p.ip">
                            <Icon
                                name="material-symbols:water-drop-outline"
                            />{{ p.ip }}
                        </li>
                        <li v-if="p.highlight">
                            <Icon :name="p.highlight.icon" />{{
                                p.highlight.label
                            }}
                        </li>
                    </ul>
                </NuxtLink>
            </div>

            <div v-else class="empty">
                <Icon name="material-symbols:search-off" class="big" />
                <p>No earbuds match these filters.</p>
                <button
                    v-if="chips.length"
                    type="button"
                    class="btn"
                    @click="clearAll"
                >
                    Clear all filters
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.explorePage {
    color: #1b1d20;
    line-height: 1.5;
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
    padding-bottom: 70px;
}
.explorePage * {
    box-sizing: border-box;
}
.explorePage a {
    text-decoration: none;
    color: inherit;
}
.explorePage button {
    font: inherit;
    color: inherit;
    cursor: pointer;
}
.explorePage :focus-visible {
    outline: 2px solid #12605f;
    outline-offset: 2px;
}
.w {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 20px;
}

.crumbs {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 20px 0 14px;
    font-size: 14px;
    color: #5f666d;
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
    font-size: 32px;
    line-height: 1.2;
    font-weight: 600;
}
.lead {
    margin: 10px 0 0;
    font-size: 15px;
    color: #5f666d;
}

.bar {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    margin: 24px 0 18px;
}
.sr {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 42px;
    padding: 0 12px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    background: #fff;
    color: #6b7280;
    font-size: 20px;
}
.sr:focus-within {
    border-color: #12605f;
    box-shadow: 0 0 0 3px rgba(18, 96, 95, 0.15);
}
.sr input {
    flex: 1;
    border: 0;
    outline: 0;
    background: none;
    font: inherit;
    font-size: 14px;
    color: #1b1d20;
    min-width: 0;
}
.sort {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #5f666d;
    white-space: nowrap;
}
.sort select {
    height: 42px;
    min-width: 170px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    padding: 0 40px 0 12px;
    font: inherit;
    font-size: 14px;
    color: #1b1d20;
    background-color: #fff;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%235f666d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
}
.sort select:focus {
    border-color: #12605f;
    box-shadow: 0 0 0 3px rgba(18, 96, 95, 0.15);
    outline: none;
}

.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: 18px;
}
.chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #e3f4ec;
    color: #0f4f4e;
    border-radius: 999px;
    padding: 6px 6px 6px 14px;
    font-size: 13px;
    font-weight: 500;
}
.chip button {
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border: 0;
    border-radius: 50%;
    background: none;
    font-size: 18px;
    color: #4a6b68;
}
.chip button:hover {
    background: rgba(18, 96, 95, 0.15);
}
.clear {
    border: 0;
    background: none;
    color: #12605f;
    font-size: 13px;
    font-weight: 600;
    padding: 8px;
}
.clear:hover {
    text-decoration: underline;
}
.count {
    margin: 0 0 14px;
    font-size: 13px;
    color: #6b7280;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
}
.card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 12px 16px;
    background: #fff;
    border: 1px solid #e6e8ea;
    border-radius: 12px;
    transition:
        box-shadow 0.2s,
        transform 0.2s,
        border-color 0.2s;
}
.card:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #cfe6dc;
}
.img {
    position: relative;
    aspect-ratio: 1.2/1;
    background: #f3f4f5;
    border-radius: 8px;
    display: grid;
    place-items: center;
    overflow: hidden;
}
.img img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    mix-blend-mode: multiply;
}
.ph {
    font-size: 52px;
    color: #b7bcc2;
}
.badge {
    position: absolute;
    left: 8px;
    top: 8px;
    background: #ddf3e7;
    color: #17734a;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 600;
}
.card h2 {
    margin: 4px 0 0;
    font-size: 14.5px;
    font-weight: 500;
    line-height: 1.35;
}
.rate {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #6b7280;
}
.rate b {
    color: #1b1d20;
    font-weight: 600;
}
.star {
    color: #f6a623;
    font-size: 18px;
}
.price {
    display: flex;
    align-items: baseline;
    gap: 8px;
}
.price strong {
    font-size: 17px;
    font-weight: 700;
}
.price s {
    color: #8a8f98;
    font-size: 13px;
}
.feat {
    list-style: none;
    margin: 4px 0 0;
    padding: 10px 0 0;
    border-top: 1px solid #eef0f1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    font-size: 12px;
    color: #5f666d;
}
.feat li {
    display: flex;
    align-items: center;
    gap: 5px;
}
.feat :deep(svg) {
    width: 16px;
    height: 16px;
    color: #6b7280;
}

.empty {
    padding: 70px 0;
    text-align: center;
    color: #5f666d;
}
.big {
    font-size: 48px;
    color: #b7bcc2;
}
.btn {
    margin-top: 6px;
    border: 1px solid #12605f;
    background: #fff;
    color: #12605f;
    border-radius: 10px;
    padding: 10px 22px;
    font-size: 14px;
    font-weight: 500;
}
.btn:hover {
    background: #e6f5ef;
}

@media (max-width: 760px) {
    h1 {
        font-size: 26px;
    }
    .lead {
        font-size: 14px;
    }
    .bar {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
    }
    .sort {
        justify-content: space-between;
    }
    .sort select {
        flex: 1;
    }
    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
    }
    .card h2 {
        font-size: 14px;
    }
    .price strong {
        font-size: 16px;
    }
}
@media (max-width: 420px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
