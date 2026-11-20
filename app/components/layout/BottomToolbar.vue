<!--
  components/AppBottomToolbar.vue  (Nuxt 3, Vue 3 <script setup>)
  Usage (layouts/default.vue): <AppBottomToolbar />
-->
<script setup>
const groups = [
    {
        title: 'Quick Links',
        links: [
            { label: 'Home', to: '/' },
            { label: 'Explore', to: '/explore' },
            { label: 'Compare', to: '/compare' },
            { label: 'Brands', to: '/brands' }
        ]
    },
    {
        title: 'Useful Links',
        links: [
            { label: 'Buying Guide', to: '/buying-guide' },
            { label: 'News & Reviews', to: '/news-reviews' },
            { label: 'About Us', to: '/about' },
            { label: 'Contact Us', to: '/contact-us' }
        ]
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', to: '/privacy-policy' },
            { label: 'Affiliate Disclosure', to: '/affiliate-disclosure' },
            { label: 'Terms of Use', to: '/terms-of-use' },
            { label: 'Sitemap', to: '/sitemap' }
        ]
    }
];

const year = new Date().getFullYear();
</script>

<template>
    <footer class="site-footer">
        <div class="ft-wrap">
            <div class="ft-top">
                <div class="ft-brand">
                    <NuxtLink to="/" class="ft-logo" aria-label="BudsArena home"
                        >Buds<span>Arena</span></NuxtLink
                    >
                    <p class="ft-tag">Compare • Choose • Listen better</p>
                </div>

                <nav
                    v-for="g in groups"
                    :key="g.title"
                    class="ft-col"
                    :aria-label="g.title"
                >
                    <h3>{{ g.title }}</h3>
                    <ul>
                        <li v-for="l in g.links" :key="l.to">
                            <NuxtLink :to="l.to">{{ l.label }}</NuxtLink>
                        </li>
                    </ul>
                </nav>

                <div class="ft-col">
                    <h3>Follow Us</h3>
                    <div class="social">
                        <a
                            href="#"
                            aria-label="YouTube"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect
                                    x="2"
                                    y="5"
                                    width="20"
                                    height="14"
                                    rx="4"
                                />
                                <path
                                    d="M10 9.5v5l4.5-2.5z"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect
                                    x="3"
                                    y="3"
                                    width="18"
                                    height="18"
                                    rx="5"
                                />
                                <circle cx="12" cy="12" r="4" />
                                <circle
                                    cx="17.5"
                                    cy="6.5"
                                    r=".8"
                                    fill="currentColor"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="X (Twitter)"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M4 4l16 16M20 4L4 20" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="ft-bottom">
                <p>© {{ year }} BudsArena. All rights reserved.</p>
                <p>Compare Smarter. Choose Better. Listen Better.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.site-footer {
    --ft-bg: #0f1b2a;
    --ft-line: #26344a;
    --ft-text: #fff;
    --ft-link: #a9b9d6;
    --ft-muted: #8fa0b8;
    --ft-chip: #1a2738;
    --ft-blue: #2b7fff;
    background: var(--ft-bg);
    color: var(--ft-text);
    padding: 32px 20px calc(14px + env(safe-area-inset-bottom, 0px));
    font-family:
        'Poppins',
        system-ui,
        -apple-system,
        'Segoe UI',
        Roboto,
        sans-serif;
}
.site-footer * {
    box-sizing: border-box;
}
.ft-wrap {
    max-width: 1200px;
    margin: 0 auto;
}
.ft-top {
    display: grid;
    grid-template-columns: 1.86fr 1fr 1fr 1fr 1fr;
    gap: 24px 0;
    padding-bottom: 26px;
}
.ft-logo {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--ft-text);
    text-decoration: none;
}
.ft-logo span {
    color: var(--ft-blue);
}
.ft-tag {
    margin: 8px 0 0;
    font-size: 11px;
    color: var(--ft-link);
}
.ft-col h3 {
    margin: 0 0 16px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--ft-text);
}
.ft-col ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
}
.ft-col ul a {
    color: var(--ft-link);
    font-size: 13px;
    text-decoration: underline;
    text-underline-offset: 2px;
}
.ft-col ul a:hover {
    color: #fff;
}
.social {
    display: flex;
    gap: 8px;
}
.social a {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: var(--ft-chip);
    display: grid;
    place-items: center;
    color: #fff;
}
.social a:hover {
    background: #243349;
}
.social svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.ft-bottom {
    display: flex;
    justify-content: space-between;
    gap: 8px 24px;
    flex-wrap: wrap;
    border-top: 1px solid var(--ft-line);
    padding-top: 12px;
    font-size: 11px;
    color: var(--ft-muted);
}
.ft-bottom p {
    margin: 0;
}
.site-footer :focus-visible {
    outline: 2px solid var(--ft-blue);
    outline-offset: 2px;
    border-radius: 4px;
}
@media (max-width: 900px) {
    .ft-top {
        grid-template-columns: 1fr 1fr;
        gap: 28px 16px;
    }
    .ft-brand {
        grid-column: 1/-1;
    }
}
@media (max-width: 480px) {
    .ft-bottom {
        flex-direction: column;
    }
}
</style>
