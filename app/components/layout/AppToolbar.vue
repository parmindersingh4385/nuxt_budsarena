<script setup>
const links = [
    { label: 'Home', to: '/' },
    { label: 'Explore', to: '/explore' },
    { label: 'Compare', to: '/compare' },
    { label: 'Brands', to: '/brands' },
    { label: 'Buying Guide', to: '/buying-guide' },
    { label: 'News & Reviews', to: '/news-reviews' }
];

const menuOpen = ref(false);
const route = useRoute();

// Close the mobile menu after moving to another page
watch(
    () => route.fullPath,
    () => {
        menuOpen.value = false;
    }
);
</script>

<template>
    <header class="toolbar">
        <button
            class="menu-btn"
            type="button"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="menuOpen"
            aria-controls="mobile-drawer"
            @click="menuOpen = !menuOpen"
        >
            <span /><span /><span />
        </button>

        <!-- To use your real logo file, replace the <svg> with:
         <img src="/logo.png" alt="" height="40"> and put logo.png in the public/ folder -->
        <NuxtLink to="/" class="logo" aria-label="BudsArena home">
            <svg viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="20" fill="#0F6B6B" />
                <g
                    fill="none"
                    stroke="#fff"
                    stroke-width="2.4"
                    stroke-linecap="round"
                >
                    <circle cx="14.5" cy="15" r="4.5" />
                    <path d="M14.5 19.5v10" />
                    <circle cx="25.5" cy="15" r="4.5" />
                    <path d="M25.5 19.5v10" />
                </g>
            </svg>
            <span class="logo-text">
                <span class="logo-name"><b>Buds</b>Arena</span>
                <span class="logo-tag">COMPARE • CHOOSE • LISTEN BETTER</span>
            </span>
        </NuxtLink>

        <nav class="nav" aria-label="Main">
            <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
                {{ link.label }}
            </NuxtLink>
        </nav>
    </header>

    <nav
        id="mobile-drawer"
        class="drawer"
        :class="{ open: menuOpen }"
        aria-label="Mobile"
    >
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
            {{ link.label }}
        </NuxtLink>
    </nav>
</template>

<style scoped>
.toolbar {
    --teal: #0f6b6b;
    --ink: #111418;
    --line: #dcdcdc;

    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 72px;
    padding: 0 24px;
    background: #fff;
    color: var(--ink);
    font-family: 'Poppins', sans-serif;
    border-bottom: 1px solid var(--line);
}

.menu-btn {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 44px;
    height: 44px;
    padding: 0 12px;
    background: none;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
}
.menu-btn span {
    display: block;
    height: 2px;
    background: var(--ink);
    border-radius: 2px;
}
.menu-btn:hover {
    background: #f0f2f2;
}

.logo {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--ink);
    text-decoration: none;
}
.logo svg {
    width: 40px;
    height: 40px;
    flex: none;
}
.logo-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
}
.logo-name {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
}
.logo-name b {
    color: var(--teal);
    font-weight: 700;
}
.logo-tag {
    margin-top: 3px;
    font-size: 6px;
    letter-spacing: 0.18em;
    color: #4a525c;
    white-space: nowrap;
}

.nav {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: 8px;
}
.nav a {
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
}
.nav a:hover {
    color: var(--teal);
    background: #f0f5f5;
}
/* NuxtLink adds this class to the link of the current page */
.nav a.router-link-exact-active {
    color: var(--teal);
}

a:focus-visible,
button:focus-visible {
    outline: 3px solid var(--teal);
    outline-offset: 2px;
}

.drawer {
    display: none;
}

/* Phones: links move into the menu drawer */
@media (max-width: 860px) {
    .toolbar {
        padding: 0 12px;
    }
    .nav {
        display: none;
    }
    .drawer {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;
        z-index: 49;
        flex-direction: column;
        padding: 8px 16px 16px;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;
        font-family: 'Poppins', sans-serif;
    }
    .drawer.open {
        display: flex;
    }
    .drawer a {
        padding: 14px 8px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        color: #111418;
        text-decoration: none;
    }
    .drawer a:hover,
    .drawer a.router-link-exact-active {
        background: #f0f5f5;
        color: #0f6b6b;
    }
}
</style>
