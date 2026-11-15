<script setup>
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
