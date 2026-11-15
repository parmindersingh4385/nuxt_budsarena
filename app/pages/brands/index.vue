<script setup>
useSeoMeta({
    title: 'Earbuds Brands | BudsArena',
    description:
        'Explore earbuds from popular brands and compare prices, features, specifications and ratings.'
});

const { brands } = useBrands();

const searchQuery = ref('');
const selectedLetter = ref('All');

// Logos that failed to load are replaced by the brand name
const failedLogos = ref({});

const popularBrands = computed(() => brands.filter((brand) => brand.popular));

const alphabet = computed(() => {
    const letters = brands
        .map((brand) => brand.name.charAt(0).toUpperCase())
        .filter((letter) => /[A-Z]/.test(letter));

    return [...new Set(letters)].sort();
});

const filteredBrands = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    return brands
        .filter((brand) => {
            const matchesSearch =
                !query || brand.name.toLowerCase().includes(query);
            const matchesLetter =
                selectedLetter.value === 'All' ||
                brand.name.toUpperCase().startsWith(selectedLetter.value);

            return matchesSearch && matchesLetter;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
});

const clearSearch = () => {
    searchQuery.value = '';
    selectedLetter.value = 'All';
};

const selectLetter = (letter) => {
    selectedLetter.value = letter;
};
</script>

<template>
    <div class="brands-page">
        <div class="brands-container">
            <header class="brands-header">
                <h1 class="brands-title">Earbuds Brands</h1>
                <p class="brands-description">
                    Explore earbuds from popular brands and compare prices,
                    features, specifications and ratings.
                </p>
            </header>

            <!-- Search -->
            <div class="brand-search-wrapper">
                <div class="brand-search">
                    <label for="brand-search" class="sr-only"
                        >Search earbud brands</label
                    >
                    <svg
                        class="icon search-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="M15.5 15.5 21 21" />
                    </svg>
                    <input
                        id="brand-search"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search brands..."
                        autocomplete="off"
                    />
                    <button
                        v-if="searchQuery"
                        type="button"
                        class="search-clear"
                        aria-label="Clear search"
                        @click="clearSearch"
                    >
                        <svg
                            class="icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M6 6l12 12M18 6 6 18" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Popular brands -->
            <section
                v-if="!searchQuery && selectedLetter === 'All'"
                class="popular-section"
            >
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Popular Brands</h2>
                        <p class="section-description">
                            Explore earbuds from some of the most popular
                            brands.
                        </p>
                    </div>
                </div>

                <div class="popular-grid">
                    <NuxtLink
                        v-for="brand in popularBrands"
                        :key="brand.slug"
                        :to="`/brands/${brand.slug}`"
                        class="popular-card"
                    >
                        <div class="popular-logo-wrapper">
                            <img
                                v-if="!failedLogos[brand.slug]"
                                :src="brand.logo"
                                :alt="`${brand.name} earbuds`"
                                class="popular-logo"
                                @error="failedLogos[brand.slug] = true"
                            />
                            <span v-else class="logo-fallback">{{
                                brand.name
                            }}</span>
                        </div>

                        <div class="popular-brand-name">{{ brand.name }}</div>

                        <div class="popular-action">
                            Explore
                            <svg
                                class="icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </div>
                    </NuxtLink>
                </div>
            </section>

            <!-- All brands -->
            <section class="all-brands-section">
                <div class="all-brands-header">
                    <div>
                        <h2 class="section-title">All Brands</h2>
                        <p class="section-description">
                            Browse all earbud brands available on BudsArena.
                        </p>
                    </div>

                    <div class="brand-count">
                        {{ filteredBrands.length }}
                        {{ filteredBrands.length === 1 ? 'brand' : 'brands' }}
                    </div>
                </div>

                <div v-if="!searchQuery" class="alphabet-wrapper">
                    <button
                        type="button"
                        class="alphabet-item"
                        :class="{ active: selectedLetter === 'All' }"
                        @click="selectLetter('All')"
                    >
                        All
                    </button>

                    <button
                        v-for="letter in alphabet"
                        :key="letter"
                        type="button"
                        class="alphabet-item"
                        :class="{ active: selectedLetter === letter }"
                        @click="selectLetter(letter)"
                    >
                        {{ letter }}
                    </button>
                </div>

                <div v-if="searchQuery" class="search-result-text">
                    Search results for <strong>"{{ searchQuery }}"</strong>
                </div>

                <div v-if="filteredBrands.length" class="brands-grid">
                    <NuxtLink
                        v-for="brand in filteredBrands"
                        :key="brand.slug"
                        :to="`/brands/${brand.slug}`"
                        class="brand-card"
                    >
                        <div class="brand-logo-wrapper">
                            <img
                                v-if="!failedLogos[brand.slug]"
                                :src="brand.logo"
                                :alt="`${brand.name} earbuds`"
                                class="brand-logo"
                                loading="lazy"
                                @error="failedLogos[brand.slug] = true"
                            />
                            <span v-else class="logo-fallback">{{
                                brand.name
                            }}</span>
                        </div>

                        <div class="brand-info">
                            <div class="brand-name">{{ brand.name }}</div>
                            <div class="brand-explore">
                                View earbuds
                                <svg
                                    class="icon"
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <div v-else class="empty-state">
                    <svg
                        class="icon"
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="M15.5 15.5 21 21M4 4l16 16" />
                    </svg>
                    <div class="empty-title">No brands found</div>
                    <div class="empty-description">
                        Try searching for another brand.
                    </div>
                    <button
                        type="button"
                        class="empty-button"
                        @click="clearSearch"
                    >
                        Clear search
                    </button>
                </div>
            </section>

            <!-- Information / SEO -->
            <section class="brand-info-section">
                <h2>Find earbuds from your favorite brand</h2>

                <p>
                    Explore earbuds from popular brands and compare their
                    prices, specifications, features, ratings and performance.
                    BudsArena helps you discover the right earbuds for your
                    budget and listening needs.
                </p>

                <div class="info-points">
                    <div class="info-point">
                        <svg
                            class="icon info-icon"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path
                                d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4"
                            />
                        </svg>
                        <span>Compare earbuds side by side</span>
                    </div>
                    <div class="info-point">
                        <svg
                            class="icon info-icon"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        <span>Compare prices and value</span>
                    </div>
                    <div class="info-point">
                        <svg
                            class="icon info-icon"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            aria-hidden="true"
                        >
                            <path
                                d="m12 3 2.8 5.9 6.2.9-4.5 4.4 1.1 6.3L12 17.5 6.4 20.5l1.1-6.3L3 9.8l6.2-.9z"
                            />
                        </svg>
                        <span>Check ratings and specifications</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.brands-page {
    min-height: 100%;
    background: #fff;
    font-family: inherit;
}

.brands-container {
    width: min(1200px, calc(100% - 32px));
    margin: 0 auto;
    padding: 30px 0 60px;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

.icon {
    flex: none;
}

/* Header */
.brands-header {
    margin-bottom: 22px;
}
.brands-title {
    margin: 0;
    font-size: 28px;
    line-height: 1.3;
    font-weight: 600;
    color: #202124;
}
.brands-description {
    max-width: 720px;
    margin: 8px 0 0;
    color: #68707a;
    font-size: 15px;
    line-height: 1.6;
}

/* Search (replaces q-input) */
.brand-search-wrapper {
    width: 100%;
    max-width: 520px;
    margin-bottom: 36px;
}
.brand-search {
    position: relative;
}
.brand-search input {
    width: 100%;
    height: 40px;
    padding: 0 40px;
    font: inherit;
    font-size: 15px;
    color: #202124;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;
}
.brand-search input:hover {
    border-color: rgba(0, 0, 0, 0.5);
}
.brand-search input:focus-visible {
    outline: 2px solid #007b83;
    outline-offset: 0;
    border-color: #007b83;
}
.search-icon {
    position: absolute;
    left: 12px;
    top: 10px;
    color: #68707a;
    pointer-events: none;
}
.search-clear {
    position: absolute;
    right: 6px;
    top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 0;
    border-radius: 50%;
    background: none;
    color: #68707a;
    cursor: pointer;
}
.search-clear:hover {
    background: #eef0f1;
}
.search-clear:focus-visible {
    outline: 2px solid #007b83;
}

/* Sections */
.popular-section,
.all-brands-section {
    margin-top: 34px;
}
.section-header,
.all-brands-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 18px;
}
.section-title {
    margin: 0;
    color: #202124;
    font-size: 20px;
    line-height: 1.35;
    font-weight: 600;
}
.section-description {
    margin: 5px 0 0;
    color: #737a83;
    font-size: 13px;
    line-height: 1.5;
}
.brand-count {
    color: #777;
    font-size: 13px;
    white-space: nowrap;
}

/* Cards (shared) */
.popular-card,
.brand-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e1e3e5;
    border-radius: 10px;
    background: #fff;
    color: inherit;
    text-decoration: none;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
}
.popular-card:hover,
.brand-card:hover {
    transform: translateY(-3px);
    border-color: #cfd3d7;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
}
.popular-card:focus-visible,
.brand-card:focus-visible {
    outline: 2px solid #007b83;
    outline-offset: 2px;
}

.logo-fallback {
    font-size: 18px;
    font-weight: 600;
    color: #4a525c;
    text-align: center;
}

/* Popular */
.popular-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
}
.popular-card {
    min-height: 154px;
    padding: 14px;
}
.popular-logo-wrapper {
    width: 100%;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.popular-logo {
    width: 130px;
    height: 62px;
    object-fit: contain;
}
.popular-brand-name {
    color: #252525;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
}
.popular-action {
    display: flex;
    align-items: center;
    gap: 3px;
    color: #007b83;
    font-size: 12px;
    font-weight: 500;
}

/* Alphabet */
.alphabet-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    background: #fafafa;
}
.alphabet-item {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #555;
    font-family: inherit;
    font-size: 13px;
    cursor: pointer;
    transition:
        background 0.15s ease,
        color 0.15s ease;
}
.alphabet-item:hover {
    background: #e9eeee;
}
.alphabet-item:focus-visible {
    outline: 2px solid #007b83;
}
.alphabet-item.active {
    background: #006f75;
    color: #fff;
}
.search-result-text {
    margin-bottom: 18px;
    color: #666;
    font-size: 13px;
}

/* All brands grid */
.brands-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
}
.brand-card {
    height: 172px;
    padding: 12px 12px 11px;
}
.brand-logo-wrapper {
    width: 100%;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.brand-logo {
    width: 140px;
    height: 72px;
    object-fit: contain;
}
.brand-info {
    width: 100%;
    text-align: center;
}
.brand-name {
    color: #252525;
    font-size: 15px;
    line-height: 20px;
    font-weight: 500;
}
.brand-explore {
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: #007b83;
    font-size: 11px;
    font-weight: 500;
}

/* Empty state */
.empty-state {
    min-height: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d8dadd;
    border-radius: 10px;
    color: #858585;
    text-align: center;
}
.empty-title {
    margin-top: 10px;
    color: #333;
    font-size: 16px;
    font-weight: 500;
}
.empty-description {
    margin-top: 4px;
    font-size: 13px;
}
.empty-button {
    margin-top: 12px;
    padding: 8px 16px;
    border: 0;
    border-radius: 6px;
    background: none;
    color: #007b83;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
}
.empty-button:hover {
    background: #eef5f5;
}

/* Information / SEO */
.brand-info-section {
    margin-top: 55px;
    padding: 28px;
    border-radius: 12px;
    background: #f7f9f9;
}
.brand-info-section h2 {
    margin: 0 0 8px;
    color: #202124;
    font-size: 20px;
    line-height: 1.4;
    font-weight: 600;
}
.brand-info-section p {
    max-width: 850px;
    margin: 0;
    color: #68707a;
    font-size: 14px;
    line-height: 1.7;
}
.info-points {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.info-point {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #444;
    font-size: 13px;
}
.info-icon {
    color: #007b83;
}

@media (max-width: 1100px) {
    .popular-grid,
    .brands-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 800px) {
    .brands-container {
        width: min(100% - 28px, 680px);
    }
    .popular-grid,
    .brands-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 600px) {
    .brands-container {
        width: calc(100% - 24px);
        padding: 22px 0 40px;
    }
    .brands-title {
        font-size: 24px;
    }
    .brands-description {
        font-size: 13px;
    }
    .brand-search-wrapper {
        max-width: none;
        margin-bottom: 28px;
    }
    .section-title {
        font-size: 18px;
    }
    .section-description {
        font-size: 12px;
    }

    .popular-grid {
        display: flex;
        overflow-x: auto;
        gap: 10px;
        padding: 2px 2px 8px;
        margin-right: -12px;
        scrollbar-width: none;
    }
    .popular-grid::-webkit-scrollbar {
        display: none;
    }
    .popular-card {
        flex: 0 0 138px;
        min-height: 142px;
        padding: 10px;
    }
    .popular-logo-wrapper {
        height: 68px;
    }
    .popular-logo {
        width: 115px;
        height: 55px;
    }
    .popular-brand-name {
        font-size: 14px;
    }

    .all-brands-section {
        margin-top: 32px;
    }
    .all-brands-header {
        align-items: center;
    }
    .brand-count {
        font-size: 12px;
    }
    .alphabet-wrapper {
        overflow-x: auto;
        flex-wrap: nowrap;
        margin-right: -12px;
        padding: 8px;
        scrollbar-width: none;
    }
    .alphabet-wrapper::-webkit-scrollbar {
        display: none;
    }
    .alphabet-item {
        flex: 0 0 auto;
    }

    .brands-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    .brand-card {
        height: 150px;
        border-radius: 9px;
        padding: 10px 8px;
    }
    .brand-logo-wrapper {
        height: 82px;
    }
    .brand-logo {
        width: 110px;
        height: 62px;
    }
    .brand-name {
        font-size: 14px;
    }
    .brand-explore {
        font-size: 10px;
    }

    .brand-info-section {
        margin-top: 40px;
        padding: 20px 16px;
    }
    .brand-info-section h2 {
        font-size: 18px;
    }
    .brand-info-section p {
        font-size: 13px;
    }
    .info-points {
        flex-direction: column;
        gap: 12px;
    }
}

@media (max-width: 360px) {
    .brands-grid {
        gap: 8px;
    }
    .brand-card {
        height: 140px;
    }
    .brand-logo {
        width: 100px;
        height: 58px;
    }
}
</style>
