<!--
  pages/compare/index.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /compare            Optional preselect: /compare?ids=realme-buds-air-7,boat-airdopes-141
  "Compare" sends people to /compare/<slug-a>-vs-<slug-b>  (slugs in alphabetical order,
  so A vs B and B vs A are the same page; 3-4 earbuds: /compare/<a>-vs-<b>-vs-<c>).
  Your pages/compare/[slug].vue can read them with: route.params.slug.split('-vs-')
  Needs: @nuxt/icon + @iconify-json/material-symbols
  NOTE: if you still have the older pages/compare.vue, delete it or move it to
  pages/compare/[slug].vue, otherwise /compare is defined twice.
  `catalog` and `popular` below are SAMPLE data. Replace with your API.
-->
<script setup>
useSeoMeta({
    title: 'Compare Earbuds – BudsArena',
    description:
        'Pick 2 to 4 earbuds and see which one wins on price, noise cancellation, battery and more.'
});

const MAX = 4;
const route = useRoute();

// ---------- SAMPLE data (replace with real data) ----------
const catalog = [
    {
        slug: 'realme-buds-air-7',
        name: 'Realme Buds Air 7',
        brand: 'Realme',
        price: 2999,
        image: ''
    },
    {
        slug: 'realme-buds-air-7-pro',
        name: 'Realme Buds Air 7 Pro',
        brand: 'Realme',
        price: 4999,
        image: ''
    },
    {
        slug: 'realme-buds-t300',
        name: 'Realme Buds T300',
        brand: 'Realme',
        price: 1999,
        image: ''
    },
    {
        slug: 'oneplus-nord-buds-3',
        name: 'OnePlus Nord Buds 3',
        brand: 'OnePlus',
        price: 2199,
        image: ''
    },
    {
        slug: 'oneplus-buds-4',
        name: 'OnePlus Buds 4',
        brand: 'OnePlus',
        price: 5999,
        image: ''
    },
    {
        slug: 'boat-airdopes-141',
        name: 'boAt Airdopes 141',
        brand: 'boAt',
        price: 999,
        image: ''
    },
    {
        slug: 'nothing-ear-a',
        name: 'Nothing Ear (a)',
        brand: 'Nothing',
        price: 5499,
        image: ''
    },
    {
        slug: 'jbl-tune-beam-2',
        name: 'JBL Tune Beam 2',
        brand: 'JBL',
        price: 4499,
        image: ''
    }
];
const bySlug = (slug) => catalog.find((p) => p.slug === slug);

// Popular matchups. `tags` decide which tab shows them ('Same brand' is worked out automatically)
const popular = [
    {
        a: 'realme-buds-air-7',
        b: 'oneplus-nord-buds-3',
        tags: ['Budget', 'ANC']
    },
    {
        a: 'oneplus-nord-buds-3',
        b: 'boat-airdopes-141',
        tags: ['Budget', 'Gaming']
    },
    { a: 'realme-buds-air-7', b: 'realme-buds-t300', tags: ['Budget', 'ANC'] },
    {
        a: 'realme-buds-t300',
        b: 'boat-airdopes-141',
        tags: ['Budget', 'Gaming']
    },
    { a: 'oneplus-buds-4', b: 'nothing-ear-a', tags: ['ANC'] },
    { a: 'realme-buds-air-7-pro', b: 'jbl-tune-beam-2', tags: ['ANC'] }
];

const tabs = ['All', 'Budget', 'ANC', 'Gaming', 'Same brand'];
const compareLinks = [
    {
        title: 'Price',
        icon: 'material-symbols:currency-rupee',
        text: 'Current price, MRP and discount.'
    },
    {
        title: 'Noise cancellation',
        icon: 'material-symbols:graphic-eq',
        text: 'ANC strength and modes.'
    },
    {
        title: 'Battery',
        icon: 'material-symbols:battery-full-outline',
        text: 'Per charge and total with case.'
    },
    {
        title: 'Latency',
        icon: 'material-symbols:speed-outline',
        text: 'Delay for games and video.'
    },
    {
        title: 'Build',
        icon: 'material-symbols:water-drop-outline',
        text: 'Water resistance and fit.'
    }
];

const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);
const pairUrl = (slugs) => `/compare/${[...slugs].sort().join('-vs-')}`;

// ---------- Picker ----------
const fromUrl = String(
    Array.isArray(route.query.ids) ? route.query.ids[0] : route.query.ids || ''
)
    .split(',')
    .filter((id, i, arr) => bySlug(id) && arr.indexOf(id) === i)
    .slice(0, MAX);

const selected = ref(fromUrl);
const term = ref('');
const open = ref(false);
const box = ref(null);
const input = ref(null);

const chosen = computed(() => selected.value.map(bySlug));
const full = computed(() => selected.value.length >= MAX);

const options = computed(() => {
    const q = term.value.trim().toLowerCase();
    return catalog
        .filter((p) => !selected.value.includes(p.slug))
        .filter((p) => !q || `${p.brand} ${p.name}`.toLowerCase().includes(q))
        .slice(0, 6);
});

function add(slug) {
    if (!full.value && !selected.value.includes(slug))
        selected.value.push(slug);
    term.value = '';
    open.value = false;
}
function remove(slug) {
    selected.value = selected.value.filter((s) => s !== slug);
}
function clearAll() {
    selected.value = [];
    term.value = '';
}
function focusSearch() {
    if (input.value) input.value.focus();
}
function onEnter() {
    if (options.value.length) add(options.value[0].slug);
}
function startCompare() {
    if (selected.value.length >= 2) navigateTo(pairUrl(selected.value));
}

// Close the dropdown when clicking outside the search box
function closeOutside(e) {
    if (box.value && !box.value.contains(e.target)) open.value = false;
}
onMounted(() => document.addEventListener('click', closeOutside));
onBeforeUnmount(() => document.removeEventListener('click', closeOutside));

// ---------- Popular comparisons ----------
const tab = ref('All');
const popularList = computed(() =>
    popular
        .map((c) => {
            const a = bySlug(c.a);
            const b = bySlug(c.b);
            const tags =
                a.brand === b.brand ? [...c.tags, 'Same brand'] : c.tags;
            return { a, b, tags, to: pairUrl([c.a, c.b]) };
        })
        .filter((c) => tab.value === 'All' || c.tags.includes(tab.value))
);
</script>

<template>
    <div class="cmp">
        <!-- Hero + picker -->
        <section class="hero">
            <div class="w">
                <nav class="crumbs" aria-label="Breadcrumb">
                    <NuxtLink to="/">Home</NuxtLink
                    ><span aria-hidden="true">›</span><b>Compare</b>
                </nav>
                <h1>Compare earbuds <em>side by side</em></h1>
                <p class="lead">
                    Pick 2 to 4 earbuds and see which one wins on price, noise
                    cancellation, battery and more.
                </p>

                <div class="pick">
                    <div ref="box" class="sw">
                        <label class="sr" :class="{ off: full }">
                            <Icon name="material-symbols:search" />
                            <input
                                ref="input"
                                v-model="term"
                                type="search"
                                :disabled="full"
                                :placeholder="
                                    full
                                        ? 'You can compare up to 4 earbuds'
                                        : 'Search earbuds or brands to add…'
                                "
                                aria-label="Search earbuds or brands to add"
                                autocomplete="off"
                                @focus="open = true"
                                @input="open = true"
                                @keydown.enter.prevent="onEnter"
                                @keydown.esc="open = false"
                            />
                        </label>
                        <ul v-if="open && !full" class="dd" role="listbox">
                            <li
                                v-for="o in options"
                                :key="o.slug"
                                role="option"
                            >
                                <button
                                    type="button"
                                    class="opt"
                                    @click="add(o.slug)"
                                >
                                    <span class="th">
                                        <img
                                            v-if="o.image"
                                            :src="o.image"
                                            :alt="o.name"
                                        />
                                        <Icon
                                            v-else
                                            name="material-symbols:headphones-outline"
                                        />
                                    </span>
                                    <b>{{ o.name }}</b>
                                    <span class="pr">{{ inr(o.price) }}</span>
                                    <i>Add</i>
                                </button>
                            </li>
                            <li v-if="!options.length" class="none">
                                No earbuds found
                            </li>
                        </ul>
                    </div>

                    <div class="slots">
                        <template v-for="n in MAX" :key="n">
                            <div v-if="chosen[n - 1]" class="sl">
                                <button
                                    type="button"
                                    class="rm"
                                    :aria-label="`Remove ${chosen[n - 1].name}`"
                                    @click="remove(chosen[n - 1].slug)"
                                >
                                    <Icon name="material-symbols:close" />
                                </button>
                                <div class="th">
                                    <img
                                        v-if="chosen[n - 1].image"
                                        :src="chosen[n - 1].image"
                                        :alt="chosen[n - 1].name"
                                    />
                                    <Icon
                                        v-else
                                        name="material-symbols:headphones-outline"
                                        class="ph"
                                    />
                                </div>
                                <b>{{ chosen[n - 1].name }}</b>
                                <span>{{ inr(chosen[n - 1].price) }}</span>
                            </div>
                            <button
                                v-else
                                type="button"
                                class="em"
                                @click="focusSearch"
                            >
                                <span class="pl"
                                    ><Icon name="material-symbols:add"
                                /></span>
                                Add earbuds
                            </button>
                        </template>
                    </div>

                    <div class="act">
                        <p>
                            {{ selected.length }} of {{ MAX }} selected.
                            {{
                                selected.length < 2
                                    ? 'Add at least 2 earbuds to compare.'
                                    : 'Ready to compare.'
                            }}
                        </p>
                        <div class="btns">
                            <button
                                type="button"
                                class="gh"
                                :disabled="!selected.length"
                                @click="clearAll"
                            >
                                Clear all
                            </button>
                            <button
                                type="button"
                                class="go"
                                :disabled="selected.length < 2"
                                @click="startCompare"
                            >
                                {{
                                    selected.length >= 2
                                        ? `Compare ${selected.length} earbuds`
                                        : 'Compare earbuds'
                                }}
                                <Icon name="material-symbols:arrow-right-alt" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="w">
            <!-- Popular comparisons -->
            <section class="sec">
                <h2>Popular comparisons</h2>
                <p class="sub">Head-to-head matchups people compare most.</p>
                <div class="tabs" role="tablist">
                    <button
                        v-for="t in tabs"
                        :key="t"
                        type="button"
                        role="tab"
                        class="tab"
                        :class="{ on: tab === t }"
                        :aria-selected="tab === t"
                        @click="tab = t"
                    >
                        {{ t }}
                    </button>
                </div>
                <div v-if="popularList.length" class="comps">
                    <NuxtLink
                        v-for="c in popularList"
                        :key="c.to"
                        :to="c.to"
                        class="cp"
                    >
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
                        <p>See who wins on price, ANC and battery.</p>
                        <span class="l"
                            >Compare now
                            <Icon name="material-symbols:arrow-right-alt"
                        /></span>
                    </NuxtLink>
                </div>
                <p v-else class="empty">No matchups in this group yet.</p>
            </section>

            <!-- What we compare -->
            <section class="sec">
                <h2>What we compare</h2>
                <p class="sub">
                    Every comparison covers the features that matter when you
                    choose.
                </p>
                <div class="what">
                    <div v-for="w in compareLinks" :key="w.title" class="wh">
                        <span class="bd"><Icon :name="w.icon" /></span>
                        <b>{{ w.title }}</b>
                        <span class="wt">{{ w.text }}</span>
                    </div>
                </div>
            </section>

            <!-- Banner -->
            <section class="band">
                <div>
                    <h2>Not sure what to compare?</h2>
                    <p>
                        Start with our buying guide, or browse earbuds by price
                        and use.
                    </p>
                </div>
                <div class="bt">
                    <NuxtLink to="/buying-guide"
                        >Read the buying guide</NuxtLink
                    >
                    <NuxtLink to="/explore" class="o">Browse earbuds</NuxtLink>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.cmp {
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
.cmp * {
    box-sizing: border-box;
}
.cmp a {
    text-decoration: none;
    color: inherit;
}
.cmp button {
    font: inherit;
    color: inherit;
}
.cmp :focus-visible {
    outline: 2px solid #12605f;
    outline-offset: 2px;
}
.w {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero {
    background: #f1f7f5;
    padding: 48px 0 56px;
}
.crumbs {
    display: flex;
    gap: 12px;
    justify-content: center;
    font-size: 14px;
    color: #5f666d;
    margin-bottom: 16px;
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
    font-size: 44px;
    line-height: 1.12;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-align: center;
}
h1 em {
    font-style: normal;
    color: #12605f;
}
.lead {
    margin: 14px auto 0;
    font-size: 16px;
    color: #4a5158;
    max-width: 560px;
    text-align: center;
}

.pick {
    margin: 32px auto 0;
    max-width: 980px;
    background: #fff;
    border: 1px solid #dfe6e4;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 12px 30px rgba(15, 60, 58, 0.08);
}
.sw {
    position: relative;
}
.sr {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    border: 1px solid #cfd8d6;
    border-radius: 12px;
    padding: 0 16px;
    color: #5f666d;
    font-size: 22px;
    background: #fff;
}
.sr:focus-within {
    border-color: #12605f;
    box-shadow: 0 0 0 3px rgba(18, 96, 95, 0.15);
}
.sr.off {
    background: #f6f7f8;
}
.sr input {
    flex: 1;
    border: 0;
    outline: 0;
    font: inherit;
    font-size: 15px;
    background: none;
    min-width: 0;
    color: #1b1d20;
}
.dd {
    list-style: none;
    margin: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 54px;
    background: #fff;
    border: 1px solid #e6e8ea;
    border-radius: 12px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    padding: 6px;
    z-index: 5;
}
.opt {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border-radius: 8px;
    width: 100%;
    background: none;
    border: 0;
    text-align: left;
    cursor: pointer;
}
.opt:hover,
.opt:focus-visible {
    background: #f1f7f5;
}
.opt .th {
    width: 44px;
    height: 36px;
    border-radius: 6px;
    background: #f3f4f5;
    display: grid;
    place-items: center;
    flex: none;
    overflow: hidden;
    color: #aab1b8;
    font-size: 22px;
}
.opt .th img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
}
.opt b {
    font-size: 14px;
    font-weight: 500;
    flex: 1;
}
.opt .pr {
    font-size: 13px;
    color: #5f666d;
}
.opt i {
    font-style: normal;
    font-size: 12px;
    font-weight: 600;
    color: #12605f;
}
.none {
    padding: 14px;
    text-align: center;
    font-size: 14px;
    color: #6b7280;
}

.slots {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin-top: 20px;
}
.sl {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    padding: 12px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-height: 176px;
}
.th {
    position: relative;
    background: #f3f4f5;
    border-radius: 8px;
    height: 84px;
    display: grid;
    place-items: center;
    overflow: hidden;
}
.th img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 6px;
    mix-blend-mode: multiply;
}
.ph {
    font-size: 36px;
    color: #b7bcc2;
}
.sl b {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
}
.sl > span {
    font-size: 13px;
    color: #5f666d;
}
.rm {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 16px;
    z-index: 2;
}
.em {
    border: 1.5px dashed #b8c4c4;
    background: #f7faf9;
    border-radius: 14px;
    min-height: 176px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #12605f;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}
.em:hover {
    background: #eef7f4;
}
.pl {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e6f5ef;
    display: grid;
    place-items: center;
    font-size: 22px;
}

.act {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 20px;
}
.act p {
    margin: 0;
    font-size: 13px;
    color: #5f666d;
}
.btns {
    display: flex;
    gap: 10px;
}
.go {
    background: #12605f;
    color: #fff;
    border: 0;
    border-radius: 10px;
    height: 46px;
    padding: 0 28px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}
.go:hover:not(:disabled) {
    background: #0f5150;
}
.go:disabled {
    background: #9db8b6;
    cursor: not-allowed;
}
.gh {
    background: #fff;
    border: 1px solid #d6dade;
    border-radius: 10px;
    height: 46px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}
.gh:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.sec {
    padding-top: 72px;
}
.sec h2 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.01em;
}
.sub {
    margin: 8px 0 22px;
    color: #5f666d;
    font-size: 15px;
}
.tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 24px;
}
.tab {
    border: 1px solid #d6dade;
    background: #fff;
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 14px;
    font-weight: 500;
    color: #33393e;
    cursor: pointer;
}
.tab:hover {
    border-color: #12605f;
}
.tab.on {
    background: #12605f;
    border-color: #12605f;
    color: #fff;
}
.comps {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 18px;
}
.cp {
    border: 1px solid #e6e8ea;
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition:
        box-shadow 0.2s,
        border-color 0.2s,
        transform 0.2s;
}
.cp:hover {
    border-color: #12605f;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
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
.cp p {
    margin: 0;
    font-size: 13.5px;
    color: #5f666d;
}
.cp .l {
    color: #12605f;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
}
.empty {
    padding: 30px 0;
    color: #6b7280;
}

.what {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 14px;
}
.wh {
    border: 1px solid #e6e8ea;
    border-radius: 14px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.bd {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #e6f5ef;
    color: #12605f;
    display: grid;
    place-items: center;
    font-size: 22px;
}
.wh b {
    font-size: 15px;
    font-weight: 600;
}
.wt {
    font-size: 13px;
    color: #5f666d;
    line-height: 1.5;
}

.band {
    margin-top: 72px;
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

@media (max-width: 860px) {
    h1 {
        font-size: 32px;
    }
    .pick {
        padding: 16px;
    }
    .slots {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .act {
        flex-direction: column;
        align-items: stretch;
    }
    .btns {
        flex-direction: column;
    }
    .tabs {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 4px;
    }
    .tab {
        white-space: nowrap;
    }
    .sec h2 {
        font-size: 26px;
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
