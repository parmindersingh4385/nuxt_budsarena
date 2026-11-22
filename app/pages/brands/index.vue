<!--
  pages/brands/index.vue  (Nuxt 3, plain <script setup>, no props, no TypeScript)
  Route: /brands
  Needs: composables/useBrandData.js, @nuxt/icon + @iconify-json/material-symbols
-->
<script setup>
useSeoMeta({
    title: 'Earbuds Brands – BudsArena',
    description:
        'Explore earbuds from popular brands and compare prices, features, specifications and ratings.'
});

const { brands, earbuds } = useBrandData();
const search = ref('');

const list = computed(() => {
    const q = search.value.trim().toLowerCase();
    return brands
        .filter((b) => b.name.toLowerCase().includes(q))
        .map((b) => ({
            ...b,
            count: earbuds.filter((e) => e.brandSlug === b.slug).length
        }));
});
</script>

<template>
    <div class="brands-page">
        <nav class="crumbs" aria-label="Breadcrumb">
            <NuxtLink to="/">Home</NuxtLink><span aria-hidden="true">›</span>
            <b>Brands</b>
        </nav>

        <h1>Earbuds Brands</h1>
        <p class="intro">
            Explore earbuds from some of the most popular brands.
        </p>

        <div class="search">
            <Icon name="material-symbols:search" class="s-icon" />
            <input
                v-model="search"
                type="search"
                placeholder="Search brands…"
                aria-label="Search brands"
            />
        </div>

        <div v-if="list.length" class="brand-grid">
            <NuxtLink
                v-for="b in list"
                :key="b.slug"
                :to="`/brands/${b.slug}`"
                class="brand-card"
            >
                <div class="logo">
                    <img
                        v-if="b.logo"
                        :src="b.logo"
                        :alt="`${b.name} logo`"
                        loading="lazy"
                    />
                    <span v-else class="initial">{{ b.name.charAt(0) }}</span>
                </div>
                <strong>{{ b.name }}</strong>
                <small v-if="b.count">{{ b.count }} earbuds</small>
                <span class="explore"
                    >Explore <Icon name="material-symbols:arrow-right-alt"
                /></span>
            </NuxtLink>
        </div>
        <p v-else class="empty">No brands found for “{{ search }}”.</p>
    </div>
</template>

<style scoped>
.brands-page {
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

h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
}
.intro {
    margin: 10px 0 24px;
    color: #5f666d;
    font-size: 15px;
}
.search {
    position: relative;
    max-width: 520px;
    margin-bottom: 36px;
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
.search input {
    width: 100%;
    height: 42px;
    padding: 0 12px 0 42px;
    border: 1px solid #cfd3d9;
    border-radius: 8px;
    font: inherit;
    font-size: 14px;
    color: #1b1d20;
    background: #fff;
    outline: none;
}
.search input:focus {
    border-color: #12605f;
    box-shadow: 0 0 0 3px rgba(18, 96, 95, 0.15);
}
h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
}
.sub {
    margin: 6px 0 20px;
    color: #6b7280;
    font-size: 13px;
}
.brand-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
}
.brand-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 22px 14px 18px;
    background: #fff;
    border: 1px solid #e6e8ea;
    border-radius: 12px;
    color: inherit;
    text-decoration: none;
    text-align: center;
    transition:
        border-color 0.2s,
        box-shadow 0.2s,
        transform 0.2s;
}
.brand-card:hover {
    border-color: #12605f;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
}
.logo {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
}
.logo img {
    max-width: 120px;
    max-height: 56px;
    object-fit: contain;
}
.initial {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #e6f5ef;
    color: #12605f;
    font-size: 24px;
    font-weight: 600;
    display: grid;
    place-items: center;
}
.brand-card strong {
    font-size: 15px;
    font-weight: 500;
}
.brand-card small {
    color: #6b7280;
    font-size: 12px;
}
.explore {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    color: #12605f;
    font-size: 13px;
    font-weight: 500;
}
.empty {
    padding: 40px 0;
    color: #6b7280;
    text-align: center;
}
@media (max-width: 480px) {
    .brand-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    h1 {
        font-size: 26px;
    }
}
</style>
