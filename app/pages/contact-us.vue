<!--
  pages/contact-us.vue  (Nuxt 3, plain <script setup>)
  Needs: npx nuxi module add icon  +  npm i -D @iconify-json/material-symbols
-->
<script setup>
useSeoMeta({
    title: 'Contact Us – BudsArena',
    description:
        'Have a question, suggestion, or feedback? Get in touch with the BudsArena team.'
});

const form = reactive({ name: '', email: '', subject: '', message: '' });
const errors = reactive({ name: '', email: '', subject: '', message: '' });
const sending = ref(false);
const status = ref(''); // '' | 'success' | 'error'

const subjectOptions = [
    { label: 'General Inquiry', value: 'general' },
    { label: 'Product Information / Correction', value: 'product' },
    { label: 'Website Feedback', value: 'feedback' },
    { label: 'Business / Partnership', value: 'business' },
    { label: 'Affiliate Inquiry', value: 'affiliate' },
    { label: 'Other', value: 'other' }
];

const rules = {
    name: (v) => (v.trim() ? '' : 'Please enter your name'),
    email: (v) =>
        !v.trim()
            ? 'Please enter your email'
            : /.+@.+\..+/.test(v)
              ? ''
              : 'Please enter a valid email',
    subject: (v) => (v ? '' : 'Please select a subject'),
    message: (v) =>
        !v.trim()
            ? 'Please enter your message'
            : v.trim().length < 10
              ? 'Message should contain at least 10 characters'
              : ''
};

function validate(field) {
    errors[field] = rules[field](form[field]);
    return !errors[field];
}

async function submitForm() {
    status.value = '';
    const valid = Object.keys(rules).map(validate).every(Boolean);
    if (!valid) return;

    sending.value = true;
    try {
        // Connect to your backend, e.g. server/api/contact.post.js
        await $fetch('/api/contact', { method: 'POST', body: { ...form } });
        status.value = 'success';
        Object.keys(form).forEach((k) => (form[k] = ''));
    } catch (e) {
        status.value = 'error';
    } finally {
        sending.value = false;
    }
}
</script>

<template>
    <div class="contact-page">
        <div class="contact-container">
            <!-- Page Header -->
            <section class="page-header">
                <div class="header-icon">
                    <Icon name="material-symbols:mail-outline" size="30px" />
                </div>
                <div>
                    <h1>Contact Us</h1>
                    <p>
                        Have a question, suggestion, or feedback? We’d love to
                        hear from you.
                    </p>
                </div>
            </section>

            <div class="contact-grid">
                <!-- Contact Form -->
                <section class="content-card form-card">
                    <h2>Send Us a Message</h2>
                    <p class="section-description">
                        Fill out the form below and our team will get back to
                        you as soon as possible.
                    </p>

                    <div
                        v-if="status === 'success'"
                        class="notice ok"
                        role="status"
                    >
                        <Icon name="material-symbols:check-circle-outline" />
                        Thank you! Your message has been submitted.
                    </div>
                    <div
                        v-if="status === 'error'"
                        class="notice bad"
                        role="alert"
                    >
                        <Icon name="material-symbols:error-outline" />
                        Something went wrong. Please try again in a moment.
                    </div>

                    <form
                        class="contact-form"
                        novalidate
                        @submit.prevent="submitForm"
                    >
                        <!-- Name -->
                        <div class="field" :class="{ invalid: errors.name }">
                            <label for="cf-name">Your Name</label>
                            <div class="control">
                                <Icon
                                    name="material-symbols:person-outline"
                                    class="lead"
                                />
                                <input
                                    id="cf-name"
                                    v-model="form.name"
                                    type="text"
                                    autocomplete="name"
                                    :aria-invalid="!!errors.name"
                                    aria-describedby="cf-name-err"
                                    @blur="validate('name')"
                                    @input="errors.name && validate('name')"
                                />
                            </div>
                            <small id="cf-name-err" class="err">{{
                                errors.name
                            }}</small>
                        </div>

                        <!-- Email -->
                        <div class="field" :class="{ invalid: errors.email }">
                            <label for="cf-email">Email Address</label>
                            <div class="control">
                                <Icon
                                    name="material-symbols:mail-outline"
                                    class="lead"
                                />
                                <input
                                    id="cf-email"
                                    v-model="form.email"
                                    type="email"
                                    autocomplete="email"
                                    :aria-invalid="!!errors.email"
                                    aria-describedby="cf-email-err"
                                    @blur="validate('email')"
                                    @input="errors.email && validate('email')"
                                />
                            </div>
                            <small id="cf-email-err" class="err">{{
                                errors.email
                            }}</small>
                        </div>

                        <!-- Subject -->
                        <div class="field" :class="{ invalid: errors.subject }">
                            <label for="cf-subject"
                                >What can we help you with?</label
                            >
                            <div class="control">
                                <Icon
                                    name="material-symbols:help-outline"
                                    class="lead"
                                />
                                <select
                                    id="cf-subject"
                                    v-model="form.subject"
                                    :aria-invalid="!!errors.subject"
                                    aria-describedby="cf-subject-err"
                                    @blur="validate('subject')"
                                    @change="validate('subject')"
                                >
                                    <option value="" disabled>
                                        Select a subject
                                    </option>
                                    <option
                                        v-for="o in subjectOptions"
                                        :key="o.value"
                                        :value="o.value"
                                    >
                                        {{ o.label }}
                                    </option>
                                </select>
                                <Icon
                                    name="material-symbols:expand-more"
                                    class="trail"
                                />
                            </div>
                            <small id="cf-subject-err" class="err">{{
                                errors.subject
                            }}</small>
                        </div>

                        <!-- Message -->
                        <div class="field" :class="{ invalid: errors.message }">
                            <label for="cf-message">Your Message</label>
                            <div class="control">
                                <textarea
                                    id="cf-message"
                                    v-model="form.message"
                                    rows="6"
                                    :aria-invalid="!!errors.message"
                                    aria-describedby="cf-message-err"
                                    @blur="validate('message')"
                                    @input="
                                        errors.message && validate('message')
                                    "
                                />
                            </div>
                            <small id="cf-message-err" class="err">{{
                                errors.message
                            }}</small>
                        </div>

                        <button
                            type="submit"
                            class="submit-btn"
                            :disabled="sending"
                        >
                            <Icon
                                :name="
                                    sending
                                        ? 'material-symbols:progress-activity'
                                        : 'material-symbols:send'
                                "
                                :class="{ spin: sending }"
                            />
                            {{ sending ? 'Sending…' : 'Send Message' }}
                        </button>
                    </form>
                </section>

                <!-- Contact Information -->
                <div class="right-column">
                    <section class="content-card info-card">
                        <div class="info-icon">
                            <Icon
                                name="material-symbols:mail-outline"
                                size="23px"
                            />
                        </div>
                        <div>
                            <h3>General Inquiries</h3>
                            <p>
                                Have a general question about BudsArena,
                                earbuds, comparisons, or our website?
                            </p>
                            <a href="mailto:hello@budsarena.com"
                                >hello@budsarena.com</a
                            >
                        </div>
                    </section>

                    <section class="content-card info-card">
                        <div class="info-icon">
                            <Icon
                                name="material-symbols:edit-note-outline"
                                size="23px"
                            />
                        </div>
                        <div>
                            <h3>Product Information</h3>
                            <p>
                                Found incorrect specifications, pricing, images,
                                or other information about an earbud?
                            </p>
                            <a href="mailto:products@budsarena.com"
                                >products@budsarena.com</a
                            >
                        </div>
                    </section>

                    <section class="content-card info-card">
                        <div class="info-icon">
                            <Icon
                                name="material-symbols:business-center-outline"
                                size="23px"
                            />
                        </div>
                        <div>
                            <h3>Business &amp; Partnerships</h3>
                            <p>
                                Interested in partnerships, advertising,
                                affiliate programs, or other business
                                opportunities?
                            </p>
                            <a href="mailto:business@budsarena.com"
                                >business@budsarena.com</a
                            >
                        </div>
                    </section>
                </div>
            </div>

            <!-- Before you contact us -->
            <section class="content-card faq-card">
                <h2>Before You Contact Us</h2>
                <p class="section-description">
                    You may find the answer to your question in one of these
                    sections.
                </p>

                <div class="quick-links">
                    <NuxtLink to="/compare" class="quick-link">
                        <Icon
                            name="material-symbols:compare-arrows"
                            class="item-icon"
                        />
                        <div>
                            <strong>Compare Earbuds</strong
                            ><span>Compare specifications and features.</span>
                        </div>
                        <Icon
                            name="material-symbols:chevron-right"
                            class="arrow"
                        />
                    </NuxtLink>

                    <NuxtLink to="/brands" class="quick-link">
                        <Icon
                            name="material-symbols:category-outline"
                            class="item-icon"
                        />
                        <div>
                            <strong>Browse Brands</strong
                            ><span>Explore earbuds by brand.</span>
                        </div>
                        <Icon
                            name="material-symbols:chevron-right"
                            class="arrow"
                        />
                    </NuxtLink>

                    <NuxtLink to="/affiliate-disclosure" class="quick-link">
                        <Icon name="material-symbols:link" class="item-icon" />
                        <div>
                            <strong>Affiliate Disclosure</strong
                            ><span
                                >Learn about our affiliate relationships.</span
                            >
                        </div>
                        <Icon
                            name="material-symbols:chevron-right"
                            class="arrow"
                        />
                    </NuxtLink>
                </div>
            </section>

            <div class="response-note">
                <Icon name="material-symbols:schedule-outline" />
                <span
                    >We aim to respond to genuine inquiries as soon as
                    possible.</span
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.contact-page {
    background: #f7f8fa;
    color: #222;
}
.contact-container {
    width: min(100% - 32px, 1050px);
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
    font-size: 30px;
    font-weight: 600;
    line-height: 1.2;
}
.page-header p {
    margin: 7px 0 0;
    color: #6b7280;
    font-size: 15px;
}

/* Grid + cards */
.contact-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
    gap: 20px;
    align-items: start;
}
.content-card {
    background: #fff;
    border: 1px solid #e8e9ed;
    border-radius: 14px;
    padding: 28px;
}
.content-card h2 {
    margin: 0 0 10px;
    font-size: 21px;
    font-weight: 600;
    color: #202124;
}
.section-description {
    margin: 0 0 24px;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.7;
}

/* Notices */
.notice {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    padding: 12px 14px;
    border-radius: 9px;
    font-size: 14px;
}
.notice.ok {
    background: #e8f6ee;
    color: #17734a;
}
.notice.bad {
    background: #fdeeee;
    color: #c62828;
}

/* Form */
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.field label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
}
.control {
    position: relative;
    display: flex;
    align-items: center;
}
.control .lead {
    position: absolute;
    left: 12px;
    font-size: 20px;
    color: #6b7280;
    pointer-events: none;
}
.control .trail {
    position: absolute;
    right: 10px;
    font-size: 20px;
    color: #6b7280;
    pointer-events: none;
}
.control input,
.control select,
.control textarea {
    width: 100%;
    font: inherit;
    font-size: 14px;
    color: #222;
    background: #fff;
    border: 1px solid #cfd3d9;
    border-radius: 9px;
    padding: 10px 12px;
    outline: none;
    transition:
        border-color 0.15s,
        box-shadow 0.15s;
}
.control input,
.control select {
    height: 42px;
}
.control:has(.lead) input,
.control:has(.lead) select {
    padding-left: 40px;
}
.control select {
    appearance: none;
    padding-right: 36px;
}
.control textarea {
    resize: vertical;
    min-height: 130px;
}
.control input:focus,
.control select:focus,
.control textarea:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}
.field.invalid input,
.field.invalid select,
.field.invalid textarea {
    border-color: #d32f2f;
}
.err {
    display: block;
    min-height: 18px;
    margin-top: 4px;
    font-size: 12px;
    color: #d32f2f;
}
.submit-btn {
    width: 100%;
    min-height: 46px;
    border: 0;
    border-radius: 9px;
    background: #4f46e5;
    color: #fff;
    font: inherit;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
    transition: background 0.2s;
}
.submit-btn:hover {
    background: #4338ca;
}
.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
.spin {
    animation: spin 1s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Right column */
.right-column {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.info-card {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 22px;
}
.info-icon {
    width: 43px;
    height: 43px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3ff;
    color: #4f46e5;
    flex-shrink: 0;
}
.info-card h3 {
    margin: 0 0 7px;
    font-size: 16px;
    font-weight: 600;
}
.info-card p {
    margin: 0 0 10px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.65;
}
.info-card a {
    color: #4f46e5;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
}
.info-card a:hover {
    text-decoration: underline;
}

/* Quick links */
.faq-card {
    margin-top: 20px;
}
.quick-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}
.quick-link {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 72px;
    padding: 14px;
    border: 1px solid #e8e9ed;
    border-radius: 10px;
    color: #333;
    text-decoration: none;
    transition: 0.2s ease;
}
.quick-link > .item-icon {
    color: #4f46e5;
    font-size: 22px;
    flex-shrink: 0;
}
.quick-link div {
    flex: 1;
}
.quick-link strong {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
}
.quick-link span {
    display: block;
    color: #7a7f87;
    font-size: 11px;
    line-height: 1.4;
}
.quick-link .arrow {
    color: #a0a4aa;
    font-size: 22px;
}
.quick-link:hover {
    border-color: #cfd3ff;
    background: #fafaff;
}

.response-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    margin-top: 26px;
    color: #8a8f98;
    font-size: 13px;
}

@media (max-width: 800px) {
    .contact-grid,
    .quick-links {
        grid-template-columns: 1fr;
    }
}
@media (max-width: 600px) {
    .contact-container {
        width: min(100% - 20px, 1050px);
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
    .info-card {
        padding: 19px;
    }
    .response-note {
        text-align: center;
        line-height: 1.5;
    }
}
</style>
