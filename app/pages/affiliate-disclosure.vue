<!--
  pages/affiliate-disclosure.vue  (Nuxt 3, plain <script setup>)
  Needs: npx nuxi module add icon  +  npm i -D @iconify-json/material-symbols
-->
<script setup>
useSeoMeta({
    title: 'Affiliate Disclosure – BudsArena',
    description:
        'Transparency about how BudsArena may earn from affiliate links.'
});
</script>

<template>
    <div class="affiliate-page">
        <div class="affiliate-container">
            <!-- Header -->
            <div class="page-header">
                <div class="header-icon">
                    <Icon name="material-symbols:link" size="30px" />
                </div>
                <div>
                    <h1>Affiliate Disclosure</h1>
                    <p>
                        Transparency about how BudsArena may earn from affiliate
                        links.
                    </p>
                </div>
            </div>

            <!-- Introduction -->
            <div class="content-card">
                <h2>Our Affiliate Relationships</h2>
                <p>
                    BudsArena may participate in affiliate marketing programs
                    operated by third-party e-commerce websites and retailers.
                    This means that some of the links on our website may be
                    affiliate links.
                </p>
                <p>
                    If you click on an affiliate link and subsequently make a
                    purchase, BudsArena may receive a small commission from the
                    retailer at no additional cost to you.
                </p>
                <p>
                    These commissions help us operate BudsArena, maintain our
                    website, research products, create comparisons and continue
                    providing useful information to our users.
                </p>
            </div>

            <!-- How affiliate links work -->
            <div class="content-card">
                <h2>How Affiliate Links Work</h2>
                <div class="steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div>
                            <h3>You find a product</h3>
                            <p>
                                You browse earbuds, comparisons, reviews or
                                recommendations on BudsArena.
                            </p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div>
                            <h3>You visit a retailer</h3>
                            <p>
                                You click a product or shopping link that may
                                redirect you to a retailer’s website.
                            </p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div>
                            <h3>You make a purchase</h3>
                            <p>
                                If you purchase a qualifying product, the
                                retailer may pay BudsArena a commission.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Retailers -->
            <div class="content-card">
                <h2>Retailers and Affiliate Programs</h2>
                <p>
                    In the future, BudsArena may participate in affiliate
                    programs offered by various e-commerce platforms and
                    retailers, which may include:
                </p>
                <div class="retailer-list">
                    <div class="retailer-item">
                        <Icon
                            name="material-symbols:shopping-cart-outline"
                            class="item-icon"
                        />
                        <span>Amazon</span>
                    </div>
                    <div class="retailer-item">
                        <Icon
                            name="material-symbols:shopping-bag-outline"
                            class="item-icon"
                        />
                        <span>Flipkart</span>
                    </div>
                    <div class="retailer-item">
                        <Icon
                            name="material-symbols:storefront-outline"
                            class="item-icon"
                        />
                        <span>Other authorized retailers</span>
                    </div>
                </div>
                <p class="note">
                    The retailers and affiliate programs we participate in may
                    change over time.
                </p>
            </div>

            <!-- Product recommendations -->
            <div class="content-card">
                <h2>Our Product Recommendations</h2>
                <p>
                    Our affiliate relationships do not mean that every product
                    listed on BudsArena is sponsored or that manufacturers or
                    retailers control our content.
                </p>
                <p>
                    Product specifications, prices, features and availability
                    may vary between retailers and may change over time. We
                    recommend checking the retailer’s website for the latest
                    information before making a purchase.
                </p>
            </div>

            <!-- Prices -->
            <div class="content-card">
                <h2>Prices and Availability</h2>
                <p>
                    Prices displayed on BudsArena are provided for informational
                    purposes and may not always reflect the current price
                    available from a retailer.
                </p>
                <p>
                    The final price, availability, shipping charges, discounts,
                    promotions and other purchasing terms are determined by the
                    retailer at the time of purchase.
                </p>
            </div>

            <!-- No additional cost -->
            <div class="content-card highlight-card">
                <div class="highlight-icon">
                    <Icon
                        name="material-symbols:check-circle-outline"
                        size="28px"
                    />
                </div>
                <div>
                    <h2>No Extra Cost to You</h2>
                    <p>
                        Using an affiliate link does not normally increase the
                        price you pay for a product. The retailer pays the
                        affiliate commission according to the applicable
                        affiliate program.
                    </p>
                </div>
            </div>

            <!-- Transparency -->
            <div class="content-card">
                <h2>Our Commitment to Transparency</h2>
                <p>
                    We believe users should understand how BudsArena may earn
                    revenue. Whenever applicable, affiliate relationships may be
                    disclosed on relevant product pages, comparison pages,
                    buying guides and other pages containing affiliate links.
                </p>
                <p>
                    Our goal is to provide useful product information and
                    comparisons so that you can make your own purchasing
                    decision.
                </p>
            </div>

            <!-- Contact -->
            <div class="content-card">
                <h2>Questions?</h2>
                <p>
                    If you have questions about our affiliate relationships or
                    this disclosure, you can contact us through our
                    <NuxtLink to="/contact-us">Contact page</NuxtLink>.
                </p>
            </div>

            <!-- Last updated -->
            <div class="last-updated">
                <Icon name="material-symbols:update" />
                <span>Last updated: September 2026</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.affiliate-page {
    background: #f7f8fa;
    color: #222;
}
.affiliate-container {
    width: min(100% - 32px, 980px);
    margin: 0 auto;
    padding: 48px 0 70px;
}

/* Header */
.page-header {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 30px;
}
.header-icon {
    width: 58px;
    height: 58px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eef2ff;
    color: #4f46e5;
    flex-shrink: 0;
}
.page-header h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
}
.page-header p {
    margin: 7px 0 0;
    color: #6b7280;
    font-size: 15px;
}

/* Cards */
.content-card {
    background: #fff;
    border: 1px solid #e8e9ed;
    border-radius: 14px;
    padding: 28px;
    margin-bottom: 18px;
}
.content-card h2 {
    margin: 0 0 16px;
    font-size: 21px;
    font-weight: 700;
    color: #202124;
}
.content-card h3 {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: 600;
}
.content-card p {
    margin: 0 0 14px;
    color: #5f6368;
    font-size: 15px;
    line-height: 1.75;
}
.content-card p:last-child {
    margin-bottom: 0;
}

/* Steps */
.steps {
    display: flex;
    flex-direction: column;
    gap: 22px;
}
.step {
    display: flex;
    gap: 15px;
    align-items: flex-start;
}
.step-number {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #f1f3f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: #4f46e5;
    flex-shrink: 0;
}

/* Retailers */
.retailer-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 20px 0;
}
.retailer-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 11px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 9px;
    background: #fafafa;
    font-size: 14px;
    font-weight: 500;
}
.retailer-item .item-icon {
    color: #555;
    font-size: 20px;
}
.content-card p.note {
    font-size: 13px;
    color: #777;
}

/* Highlight */
.highlight-card {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    background: #f6f8ff;
    border-color: #dfe4ff;
}
.highlight-card h2 {
    margin-bottom: 8px;
}
.highlight-icon {
    color: #4f46e5;
    flex-shrink: 0;
}

/* Links */
.content-card a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 600;
}
.content-card a:hover {
    text-decoration: underline;
}

/* Footer */
.last-updated {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 28px;
    color: #8a8f98;
    font-size: 13px;
}

/* Mobile */
@media (max-width: 600px) {
    .affiliate-container {
        width: min(100% - 20px, 980px);
        padding: 28px 0 50px;
    }
    .page-header {
        align-items: flex-start;
        gap: 13px;
    }
    .header-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
    }
    .page-header h1 {
        font-size: 25px;
    }
    .page-header p {
        font-size: 13px;
    }
    .content-card {
        padding: 20px;
        border-radius: 12px;
    }
    .content-card h2 {
        font-size: 19px;
    }
    .content-card p {
        font-size: 14px;
        line-height: 1.7;
    }
    .retailer-list {
        flex-direction: column;
    }
    .retailer-item {
        width: 100%;
    }
    .highlight-card {
        gap: 12px;
    }
}
</style>
