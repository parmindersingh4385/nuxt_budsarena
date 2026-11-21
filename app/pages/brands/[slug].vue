<!-- <script setup>
const route = useRoute();
const { getBrand } = useBrands();

const brand = computed(() => getBrand(route.params.slug));

// Unknown brand, such as /brands/abc, shows the 404 page
if (!brand.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Brand not found',
        fatal: true
    });
}

useSeoMeta({
    title: `${brand.value.name} Earbuds | BudsArena`,
    description: `Explore ${brand.value.name} earbuds and compare prices, features, specifications and ratings.`
});
</script>

<template>
    <main v-if="brand" class="brand-page">
        <img :src="brand.logo" :alt="`${brand.name} logo`" height="60" />
        <h1>{{ brand.name }} Earbuds</h1>
        <p>Compare {{ brand.name }} earbuds by price, features and ratings.</p>

        <NuxtLink to="/brands">← All brands</NuxtLink>
    </main>
</template>
 -->

<script setup>
const route = useRoute();
const { brands, earbuds } = useBrandData();

const brand = brands.find((b) => b.slug === route.params.slug);
if (!brand) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Brand not found',
        fatal: true
    });
}

useSeoMeta({
    title: `${brand.name} Earbuds – BudsArena`,
    description: `Explore ${brand.name} earbuds and compare prices, features, specifications and ratings.`
});

const search = ref('');
const sort = ref('rating');

const list = computed(() => {
    const q = search.value.trim().toLowerCase();
    const items = earbuds.filter(
        (e) => e.brandSlug === brand.slug && e.name.toLowerCase().includes(q)
    );
    if (sort.value === 'low') items.sort((a, b) => a.price - b.price);
    else if (sort.value === 'high') items.sort((a, b) => b.price - a.price);
    else items.sort((a, b) => b.rating - a.rating);
    return items;
});

const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);
const off = (e) =>
    e.mrp > e.price ? Math.round(((e.mrp - e.price) / e.mrp) * 100) : 0;
</script>

<template>
    <div class="brand-page">
        <nav class="crumbs" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">›</span>
            <NuxtLink to="/brands">Brands</NuxtLink
            ><span aria-hidden="true">›</span>
            <b>{{ brand.name }}</b>
        </nav>

        <header class="head">
            <h1>{{ brand.name }} Earbuds</h1>
            <p>
                Explore {{ brand.name }} earbuds and compare prices, features,
                specifications and ratings.
            </p>
        </header>

        <div class="tools">
            <div class="search">
                <Icon name="material-symbols:search" class="s-icon" />
                <input
                    v-model="search"
                    type="search"
                    :placeholder="`Search ${brand.name} earbuds…`"
                    :aria-label="`Search ${brand.name} earbuds`"
                />
            </div>
            <label class="sort">
                <span>Sort by</span>
                <select v-model="sort">
                    <option value="rating">Top rated</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>
            </label>
        </div>

        <p class="count">
            {{ list.length }} {{ list.length === 1 ? 'earbud' : 'earbuds' }}
        </p>

        <div v-if="list.length" class="grid">
            <NuxtLink
                v-for="e in list"
                :key="e.slug"
                :to="`/earbuds/${e.slug}`"
                class="card"
            >
                <div class="img">
                    <img
                        v-if="e.image"
                        :src="e.image"
                        :alt="e.name"
                        loading="lazy"
                    />
                    <Icon
                        v-else
                        name="material-symbols:headphones-outline"
                        class="ph"
                    />
                    <span v-if="off(e)" class="badge">{{ off(e) }}% OFF</span>
                </div>
                <h3>{{ e.name }}</h3>
                <div class="rate">
                    <Icon name="material-symbols:star-rounded" class="star" />
                    <b>{{ e.rating }}</b>
                    <span
                        >({{
                            new Intl.NumberFormat('en-IN').format(e.reviews)
                        }})</span
                    >
                </div>
                <div class="price">
                    <strong>{{ inr(e.price) }}</strong>
                    <s v-if="e.mrp > e.price">{{ inr(e.mrp) }}</s>
                </div>
            </NuxtLink>
        </div>
        <p v-else class="empty">No earbuds found.</p>
    </div>
</template>

<style scoped>
.brand-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px 16px 70px;
    color: #1b1d20;
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
}
.crumbs {
    padding: 0 0 18px;
    font-size: 14px;
    color: #5f666d;
    display: flex;
    gap: 12px;
    align-items: center;
}
.crumbs a {
    color: #12605f;
    text-decoration: none;
}
.crumbs b {
    color: #1b1d20;
    font-weight: 500;
}
.head h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
}
.head p {
    margin: 10px 0 24px;
    color: #5f666d;
    font-size: 15px;
}
.tools {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.search {
    position: relative;
    flex: 1 1 280px;
    max-width: 420px;
}
.s-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #6b7280;
    pointer-events: none;
}
.search input,
.sort select {
    height: 42px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    font: inherit;
    font-size: 14px;
    color: #1b1d20;
    background: #fff;
    outline: none;
}
.search input {
    width: 100%;
    padding: 0 12px 0 42px;
}
.sort {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #5f666d;
}
.sort select {
    padding: 0 10px;
}
.search input:focus,
.sort select:focus {
    border-color: #12605f;
    box-shadow: 0 0 0 3px rgba(18, 96, 95, 0.15);
}
.count {
    margin: 20px 0 14px;
    color: #6b7280;
    font-size: 13px;
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
    color: inherit;
    text-decoration: none;
    transition:
        border-color 0.2s,
        box-shadow 0.2s,
        transform 0.2s;
}
.card:hover {
    border-color: #12605f;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
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
    box-sizing: border-box;
    object-fit: contain;
    padding: 10px;
    mix-blend-mode: multiply;
}

.ph {
    font-size: 44px;
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
    font-size: 11px;
    font-weight: 600;
}
.card h3 {
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
.empty {
    padding: 40px 0;
    color: #6b7280;
    text-align: center;
}
@media (max-width: 520px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
    .head h1 {
        font-size: 26px;
    }
    .sort {
        width: 100%;
    }
    .sort select {
        flex: 1;
    }
}
</style>
