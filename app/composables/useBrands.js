const brands = [
    {
        name: 'Realme',
        slug: 'realme',
        logo: '/images/brands/realme.png',
        popular: true
    },
    {
        name: 'OnePlus',
        slug: 'oneplus',
        logo: '/images/brands/oneplus.png',
        popular: true
    },
    {
        name: 'boAt',
        slug: 'boat',
        logo: '/images/brands/boat.png',
        popular: true
    },
    { name: 'JBL', slug: 'jbl', logo: '/images/brands/jbl.png', popular: true },
    {
        name: 'Sony',
        slug: 'sony',
        logo: '/images/brands/sony.png',
        popular: true
    },
    {
        name: 'Samsung',
        slug: 'samsung',
        logo: '/images/brands/samsung.png',
        popular: true
    },
    {
        name: 'Noise',
        slug: 'noise',
        logo: '/images/brands/noise.png',
        popular: true
    },
    {
        name: 'Nothing',
        slug: 'nothing',
        logo: '/images/brands/nothing.png',
        popular: true
    },
    { name: 'Oppo', slug: 'oppo', logo: '/images/brands/oppo.png' },
    { name: 'Vivo', slug: 'vivo', logo: '/images/brands/vivo.png' },
    { name: 'Apple', slug: 'apple', logo: '/images/brands/apple.png' },
    { name: 'Xiaomi', slug: 'xiaomi', logo: '/images/brands/xiaomi.png' },
    {
        name: 'Blaupunkt',
        slug: 'blaupunkt',
        logo: '/images/brands/blaupunkt.png'
    },
    { name: 'Bose', slug: 'bose', logo: '/images/brands/bose.png' },
    {
        name: 'Skullcandy',
        slug: 'skullcandy',
        logo: '/images/brands/skullcandy.png'
    },
    { name: 'Goboult', slug: 'goboult', logo: '/images/brands/goboult.png' },
    { name: 'Mivi', slug: 'mivi', logo: '/images/brands/mivi.png' },
    { name: 'Marshall', slug: 'marshall', logo: '/images/brands/marshall.png' }
];

export const useBrands = () => ({
    brands,
    getBrand: (slug) => brands.find((b) => b.slug === slug)
});
