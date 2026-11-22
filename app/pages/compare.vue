<!--
  pages/compare.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /compare            (or /compare?ids=realme-buds-air-7,boat-airdopes-141)
  Needs: @nuxt/icon + @iconify-json/material-symbols
  The `catalog` below is SAMPLE data. Replace it with your API, e.g.:
    const { data: catalog } = await useFetch('/api/earbuds')   // then use catalog.value
-->
<script setup>
useSeoMeta({
    title: 'Compare Earbuds – BudsArena',
    description:
        'Compare up to 4 earbuds side by side across price, features and specifications.'
});

const MAX = 4;

// ---------- Sample data (replace with real data) ----------
const catalog = [
    {
        slug: 'realme-buds-air-7',
        name: 'Realme Buds Air 7',
        brand: 'Realme',
        image: '',
        rating: 4.3,
        reviews: 1245,
        price: 2999,
        mrp: 3999,
        buyUrl: '#',
        anc: 50,
        driver: 12.4,
        codecs: 'AAC, SBC',
        battery: 52,
        port: 'USB Type-C',
        latency: 88,
        bluetooth: 5.4,
        ip: 'IP55',
        ipRank: 55,
        dual: true,
        verdict:
            'Best all-rounder: strong ANC, the longest battery and the newest Bluetooth.',
        bestFor: ['Music', 'Bass Lovers', 'Daily Use'],
        notIdeal: ['Calls in Crowd']
    },
    {
        slug: 'oneplus-nord-buds-3',
        name: 'OnePlus Nord Buds 3',
        brand: 'OnePlus',
        image: '',
        rating: 4.1,
        reviews: 980,
        price: 2199,
        mrp: 2699,
        buyUrl: '#',
        anc: 32,
        driver: 12.4,
        codecs: 'AAC, SBC',
        battery: 43,
        port: 'USB Type-C',
        latency: 94,
        bluetooth: 5.3,
        ip: 'IP55',
        ipRank: 55,
        dual: true,
        verdict:
            'A balanced pick if you want a clean sound and solid battery at a mid price.',
        bestFor: ['Calls', 'Office'],
        notIdeal: ['Heavy gaming']
    },
    {
        slug: 'boat-airdopes-141',
        name: 'boAt Airdopes 141',
        brand: 'boAt',
        image: '',
        rating: 4.0,
        reviews: 15210,
        price: 999,
        mrp: 4490,
        buyUrl: '#',
        anc: 0,
        driver: 13,
        codecs: 'SBC',
        battery: 42,
        port: 'USB Type-C',
        latency: 50,
        bluetooth: 5.3,
        ip: 'IPX4',
        ipRank: 4,
        dual: false,
        verdict:
            'The budget choice, with the lowest price and the lowest latency for gaming.',
        bestFor: ['Gaming', 'Budget'],
        notIdeal: ['Noise cancellation']
    },
    {
        slug: 'realme-buds-t300',
        name: 'Realme Buds T300',
        brand: 'Realme',
        image: '',
        rating: 4.2,
        reviews: 3120,
        price: 1999,
        mrp: 2999,
        buyUrl: '#',
        anc: 30,
        driver: 12.4,
        codecs: 'AAC, SBC',
        battery: 40,
        port: 'USB Type-C',
        latency: 88,
        bluetooth: 5.3,
        ip: 'IP55',
        ipRank: 55,
        dual: true,
        verdict:
            'A value pick with decent ANC and a long battery for the price.',
        bestFor: ['Daily Use', 'Travel'],
        notIdeal: ['Gaming']
    }
];

// ---------- Selection (kept in the URL so it can be shared) ----------
const route = useRoute();
const router = useRouter();

const fromUrl = String(route.query.ids || '')
    .split(',')
    .filter((id) => catalog.some((p) => p.slug === id))
    .slice(0, MAX);

const selectedIds = ref(
    fromUrl.length ? fromUrl : catalog.slice(0, 3).map((p) => p.slug)
);
const selected = computed(() =>
    selectedIds.value.map((id) => catalog.find((p) => p.slug === id))
);

watch(
    selectedIds,
    (ids) =>
        router.replace({ query: ids.length ? { ids: ids.join(',') } : {} }),
    { deep: true }
);

const diffOnly = ref(false);
const adding = ref(false);
const term = ref('');

const options = computed(() => {
    const q = term.value.trim().toLowerCase();
    return catalog.filter(
        (p) =>
            !selectedIds.value.includes(p.slug) &&
            `${p.brand} ${p.name}`.toLowerCase().includes(q)
    );
});

function add(slug) {
    if (selectedIds.value.length < MAX) selectedIds.value.push(slug);
    term.value = '';
    adding.value = false;
}
function remove(slug) {
    selectedIds.value = selectedIds.value.filter((id) => id !== slug);
}
function clearAll() {
    selectedIds.value = [];
}

// ---------- Helpers ----------
const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);
const off = (p) =>
    p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

// ---------- Comparison rows ----------
// best: 'high' | 'low' | null  (which value wins), val = value used to compare, show = text shown
const sections = [
    {
        title: 'Overview',
        icon: 'material-symbols:auto-awesome-outline',
        rows: [
            {
                label: 'Price',
                best: 'low',
                val: (p) => p.price,
                show: (p) => inr(p.price)
            },
            {
                label: 'BudsArena rating',
                best: 'high',
                val: (p) => p.rating,
                show: (p) => `${p.rating} / 5`
            }
        ]
    },
    {
        title: 'Sound & noise control',
        icon: 'material-symbols:graphic-eq',
        rows: [
            {
                label: 'Active noise cancellation',
                best: 'high',
                val: (p) => p.anc,
                show: (p) => (p.anc ? `Up to ${p.anc}dB` : 'Not available')
            },
            {
                label: 'Driver size',
                best: 'high',
                val: (p) => p.driver,
                show: (p) => `${p.driver}mm`
            },
            {
                label: 'Codecs',
                best: null,
                val: (p) => p.codecs,
                show: (p) => p.codecs
            }
        ]
    },
    {
        title: 'Battery',
        icon: 'material-symbols:battery-full-outline',
        rows: [
            {
                label: 'Total battery life',
                best: 'high',
                val: (p) => p.battery,
                show: (p) => `${p.battery}H`
            },
            {
                label: 'Charging port',
                best: null,
                val: (p) => p.port,
                show: (p) => p.port
            }
        ]
    },
    {
        title: 'Performance & build',
        icon: 'material-symbols:speed-outline',
        rows: [
            {
                label: 'Low latency mode',
                best: 'low',
                val: (p) => p.latency,
                show: (p) => `${p.latency}ms`
            },
            {
                label: 'Bluetooth',
                best: 'high',
                val: (p) => p.bluetooth,
                show: (p) => p.bluetooth
            },
            {
                label: 'Water resistance',
                best: 'high',
                val: (p) => p.ipRank,
                show: (p) => p.ip
            },
            {
                label: 'Dual device connection',
                best: 'high',
                val: (p) => (p.dual ? 1 : 0),
                show: (p) => (p.dual ? 'Yes' : 'No')
            }
        ]
    }
];

function allSame(row) {
    return new Set(selected.value.map((p) => String(row.val(p)))).size <= 1;
}

const visibleSections = computed(() =>
    sections
        .map((s) => ({
            ...s,
            rows: s.rows.filter(
                (r) =>
                    !(diffOnly.value && selected.value.length > 1 && allSame(r))
            )
        }))
        .filter((s) => s.rows.length)
);

function isBest(row, p) {
    if (!row.best || selected.value.length < 2 || allSame(row)) return false;
    const values = selected.value.map(row.val);
    const target =
        row.best === 'high' ? Math.max(...values) : Math.min(...values);
    return row.val(p) === target;
}
</script>

<template>
    <div class="cmp">
        <nav class="crumbs" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">›</span
            ><b>Compare</b>
        </nav>

        <div class="scroll">
            <div class="inner">
                <!-- Header: side panel + product cards -->
                <div class="grid">
                    <div class="side">
                        <div>
                            <h1>Compare Earbuds</h1>
                            <p class="sub">
                                Compare up to {{ MAX }} earbuds side by side.
                            </p>
                            <div class="cnt">
                                <span class="dots" aria-hidden="true">
                                    <i
                                        v-for="n in MAX"
                                        :key="n"
                                        class="dot"
                                        :class="{ on: n <= selected.length }"
                                    />
                                </span>
                                {{ selected.length }} of {{ MAX }} selected
                            </div>
                        </div>
                        <div class="ctrlbox">
                            <label class="sw"
                                ><input v-model="diffOnly" type="checkbox" />
                                Show differences only</label
                            >
                            <button
                                type="button"
                                class="ghost"
                                :disabled="!selected.length"
                                @click="clearAll"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>

                    <div v-for="p in selected" :key="p.slug" class="pc">
                        <button
                            type="button"
                            class="rm"
                            :aria-label="`Remove ${p.name}`"
                            @click="remove(p.slug)"
                        >
                            <Icon name="material-symbols:close" />
                        </button>
                        <div class="pimg">
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
                        </div>
                        <div class="brand">{{ p.brand }}</div>
                        <div class="pname">{{ p.name }}</div>
                        <div class="rt">
                            <Icon
                                name="material-symbols:star-rounded"
                                class="star"
                            /><b>{{ p.rating }}</b>
                            <span class="mut"
                                >({{
                                    new Intl.NumberFormat('en-IN').format(
                                        p.reviews
                                    )
                                }})</span
                            >
                        </div>
                        <div class="pr">
                            <b>{{ inr(p.price) }}</b
                            ><s v-if="p.mrp > p.price">{{ inr(p.mrp) }}</s>
                            <span v-if="off(p)" class="off"
                                >{{ off(p) }}% OFF</span
                            >
                        </div>
                        <a
                            class="btn"
                            :href="p.buyUrl"
                            target="_blank"
                            rel="noopener sponsored"
                            >View Best Price</a
                        >
                        <NuxtLink class="lnk" :to="`/earbuds/${p.slug}`"
                            >Full details</NuxtLink
                        >
                    </div>

                    <!-- Add slot -->
                    <div v-if="selected.length < MAX" class="add">
                        <template v-if="!adding">
                            <button
                                type="button"
                                class="add-btn"
                                @click="adding = true"
                            >
                                <span class="plus"
                                    ><Icon name="material-symbols:add"
                                /></span>
                                Add earbuds to compare
                                <span class="mut small"
                                    >Search by name or brand</span
                                >
                            </button>
                        </template>
                        <template v-else>
                            <input
                                v-model="term"
                                class="add-input"
                                type="search"
                                placeholder="Search earbuds…"
                                aria-label="Search earbuds to add"
                                autofocus
                            />
                            <ul class="opts">
                                <li v-for="o in options" :key="o.slug">
                                    <button type="button" @click="add(o.slug)">
                                        <b>{{ o.name }}</b
                                        ><span class="mut">{{
                                            inr(o.price)
                                        }}</span>
                                    </button>
                                </li>
                                <li v-if="!options.length" class="none">
                                    No earbuds found
                                </li>
                            </ul>
                            <button
                                type="button"
                                class="cancel"
                                @click="adding = false"
                            >
                                Cancel
                            </button>
                        </template>
                    </div>
                </div>

                <!-- Empty state -->
                <div v-if="!selected.length" class="empty">
                    <Icon name="material-symbols:compare-arrows" class="big" />
                    <p>Add earbuds to start comparing.</p>
                </div>

                <!-- Comparison table -->
                <div v-else class="tbl">
                    <template v-for="s in visibleSections" :key="s.title">
                        <div class="sh">
                            <Icon :name="s.icon" />{{ s.title }}
                        </div>
                        <div v-for="r in s.rows" :key="r.label" class="r">
                            <div class="l">{{ r.label }}</div>
                            <div
                                v-for="p in selected"
                                :key="p.slug"
                                class="c"
                                :class="{ best: isBest(r, p) }"
                            >
                                {{ r.show(p)
                                }}<span v-if="isBest(r, p)" class="tag"
                                    >Best</span
                                >
                            </div>
                        </div>
                    </template>
                    <p v-if="!visibleSections.length" class="same">
                        These earbuds have identical specifications.
                    </p>
                </div>
            </div>
        </div>

        <!-- Verdicts -->
        <template v-if="selected.length">
            <h2>BudsArena Verdict</h2>
            <div class="vgrid">
                <div v-for="p in selected" :key="p.slug" class="vc">
                    <h3>{{ p.name }}</h3>
                    <p>{{ p.verdict }}</p>
                    <div class="tg">
                        <span v-for="t in p.bestFor" :key="t" class="tag2">{{
                            t
                        }}</span>
                    </div>
                    <div class="tg">
                        <span
                            v-for="t in p.notIdeal"
                            :key="t"
                            class="tag2 no"
                            >{{ t }}</span
                        >
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.cmp {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 16px 80px;
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
.cmp * {
    box-sizing: border-box;
}
.cmp a {
    text-decoration: none;
}
.cmp button {
    font: inherit;
    cursor: pointer;
    color: inherit;
}
.cmp :focus-visible {
    outline: 2px solid #12605f;
    outline-offset: 2px;
}
.crumbs {
    padding: 18px 0;
    font-size: 14px;
    color: #5f666d;
    display: flex;
    gap: 12px;
    align-items: center;
}
.crumbs a {
    color: #12605f;
}
.crumbs b {
    color: #1b1d20;
    font-weight: 500;
}

/* horizontal scroll on small screens */
.scroll {
    overflow-x: auto;
    padding-bottom: 4px;
}
.inner {
    min-width: 940px;
}

/* header grid */
.grid {
    display: grid;
    grid-template-columns: 200px repeat(4, minmax(0, 1fr));
    column-gap: 16px;
    align-items: stretch;
}
.side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 24px;
    padding: 4px 12px 0 0;
}
.side h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
    line-height: 1.2;
}
.sub {
    margin: 10px 0 0;
    color: #5f666d;
    font-size: 14px;
}
.cnt {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    font-size: 13px;
    color: #33393e;
    font-weight: 500;
}
.dots {
    display: flex;
    gap: 4px;
}
.dot {
    width: 20px;
    height: 6px;
    border-radius: 3px;
    background: #d6dade;
    display: block;
}
.dot.on {
    background: #12605f;
}
.ctrlbox {
    border-top: 1px solid #e6e8ea;
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 14px;
}
.sw {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.sw input {
    width: 18px;
    height: 18px;
    accent-color: #12605f;
}
.ghost {
    width: 100%;
    height: 38px;
    border: 1px solid #d6dade;
    background: #fff;
    border-radius: 8px;
    font-size: 14px;
}
.ghost:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* product cards */
.pc {
    position: relative;
    background: #fff;
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.rm {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 0;
    background: #fff;
    color: #444;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    display: grid;
    place-items: center;
    font-size: 18px;
    z-index: 2;
}
.pimg {
    position: relative;
    background: #f3f4f5;
    border-radius: 10px;
    aspect-ratio: 1.3/1;
    display: grid;
    place-items: center;
    margin-bottom: 6px;
    overflow: hidden;
}
.pimg img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 10px;
    mix-blend-mode: multiply;
}
.ph {
    font-size: 44px;
    color: #b7bcc2;
}
.brand {
    font-size: 12px;
    color: #12605f;
    font-weight: 500;
}
.pname {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    min-height: 42px;
}
.rt {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
}
.star {
    color: #f6a623;
    font-size: 18px;
}
.mut {
    color: #5f666d;
}
.pr {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 8px;
    margin: 4px 0 8px;
}
.pr b {
    font-size: 22px;
    font-weight: 700;
}
.pr s {
    color: #6b7280;
    font-size: 13px;
}
.off {
    background: #ddf3e7;
    color: #17734a;
    border-radius: 6px;
    padding: 1px 8px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
}
.btn {
    margin-top: auto;
    background: #12605f;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
    font-weight: 500;
}
.btn:hover {
    background: #0f5150;
}
.lnk {
    text-align: center;
    color: #12605f;
    font-size: 13px;
    font-weight: 500;
    padding-top: 4px;
}
.lnk:hover {
    text-decoration: underline;
}

/* add slot */
.add {
    border: 1.5px dashed #b8c4c4;
    background: #f7faf9;
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 300px;
}
.add-btn {
    flex: 1;
    border: 0;
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #12605f;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}
.plus {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #e6f5ef;
    display: grid;
    place-items: center;
    font-size: 24px;
}
.small {
    font-size: 12px;
    font-weight: 400;
}
.add-input {
    width: 100%;
    height: 40px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    padding: 0 12px;
    font: inherit;
    font-size: 14px;
    background: #fff;
}
.opts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow: auto;
    flex: 1;
}
.opts button {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    padding: 8px 10px;
    border: 1px solid #e6e8ea;
    background: #fff;
    border-radius: 8px;
    font-size: 13px;
    text-align: left;
}
.opts button:hover {
    border-color: #12605f;
}
.none {
    font-size: 13px;
    color: #6b7280;
    text-align: center;
    padding: 12px 0;
}
.cancel {
    border: 0;
    background: none;
    color: #5f666d;
    font-size: 13px;
    text-decoration: underline;
}

/* table */
.tbl {
    margin-top: 36px;
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    overflow: hidden;
}
.sh {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #f1f7f5;
    color: #12605f;
    font-weight: 600;
    font-size: 15px;
    padding: 13px 20px;
    border-top: 1px solid #e6e8ea;
}
.sh:first-child {
    border-top: 0;
}
.r {
    display: grid;
    grid-template-columns: 200px repeat(4, minmax(0, 1fr));
    column-gap: 16px;
    border-top: 1px solid #eef0f1;
    padding-left: 20px;
}
.l {
    padding: 15px 0;
    font-size: 13.5px;
    color: #5f666d;
}
.c {
    padding: 15px 12px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
}
.c.best {
    background: #eaf7f0;
    color: #17734a;
    font-weight: 600;
}
.tag {
    background: #17734a;
    color: #fff;
    border-radius: 5px;
    font-size: 10px;
    padding: 1px 6px;
    font-weight: 600;
    letter-spacing: 0.02em;
}
.same {
    padding: 24px;
    text-align: center;
    color: #5f666d;
    font-size: 14px;
    margin: 0;
}
.empty {
    margin-top: 36px;
    padding: 60px 0;
    text-align: center;
    color: #5f666d;
    border: 1px dashed #d6dade;
    border-radius: 14px;
}
.big {
    font-size: 44px;
    color: #b7bcc2;
}

/* verdicts */
h2 {
    margin: 44px 0 16px;
    font-size: 22px;
    font-weight: 600;
}
.vgrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
}
.vc {
    background: linear-gradient(135deg, #e6f5ef, #f1faf6);
    border: 1px solid #cfe6dc;
    border-radius: 14px;
    padding: 20px;
}
.vc h3 {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 600;
}
.vc p {
    margin: 0 0 14px;
    font-size: 14px;
    color: #33393e;
}
.tg {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}
.tag2 {
    font-size: 12px;
    padding: 4px 11px;
    border-radius: 6px;
    background: #e3f4ec;
    color: #17734a;
    border: 1px solid #cfe6dc;
}
.tag2.no {
    background: #fdeeee;
    color: #c62828;
    border-color: #f4b9b9;
}
</style>
