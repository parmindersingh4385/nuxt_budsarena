// composables/useBrandData.js  (auto-imported by Nuxt)
// Sample data. Replace with your API, e.g. inside each page:
//   const { data: brands } = await useFetch('/api/brands')
//   const { data: earbuds } = await useFetch(`/api/brands/${slug}/earbuds`)
export const useBrandData = () => {
    /* const brands = [
        { name: 'Realme', slug: 'realme', logo: '' },
        { name: 'OnePlus', slug: 'oneplus', logo: '' },
        { name: 'boAt', slug: 'boat', logo: '' },
        { name: 'JBL', slug: 'jbl', logo: '' },
        { name: 'Sony', slug: 'sony', logo: '' },
        { name: 'Samsung', slug: 'samsung', logo: '' },
        { name: 'Noise', slug: 'noise', logo: '' },
        { name: 'Nothing', slug: 'nothing', logo: '' }
    ]; */

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
        {
            name: 'JBL',
            slug: 'jbl',
            logo: '/images/brands/jbl.png',
            popular: true
        },
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
        {
            name: 'Goboult',
            slug: 'goboult',
            logo: '/images/brands/goboult.png'
        },
        { name: 'Mivi', slug: 'mivi', logo: '/images/brands/mivi.png' },
        {
            name: 'Marshall',
            slug: 'marshall',
            logo: '/images/brands/marshall.png'
        }
    ];

    const earbuds = [
        {
            name: 'Realme Buds Air 7',
            slug: 'realme-buds-air-7',
            brandSlug: 'realme',
            image: '',
            rating: 4.3,
            reviews: 1245,
            price: 2999,
            mrp: 3999
        },
        {
            name: 'Realme Buds T300',
            slug: 'realme-buds-t300',
            brandSlug: 'realme',
            image: '',
            rating: 4.2,
            reviews: 3120,
            price: 1999,
            mrp: 2999
        },
        {
            name: 'OnePlus Nord Buds 3',
            slug: 'oneplus-nord-buds-3',
            brandSlug: 'oneplus',
            image: '',
            rating: 4.1,
            reviews: 980,
            price: 2199,
            mrp: 2699
        },
        {
            name: 'boAt Airdopes 141',
            slug: 'boat-airdopes-141',
            brandSlug: 'boat',
            image: '',
            rating: 4.0,
            reviews: 15210,
            price: 999,
            mrp: 4490
        }
    ];

    return { brands, earbuds };
};
