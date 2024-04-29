export const presentation: Presentation = {
    settings: {
        name: 'XYZ Photography'
    },
    slides: [
        {
            project: '<span>Everyday</span> <span>Flowers</span>',
            author: 'Johanna Hobel',
            client: 'Vogue',
            month: 'Jun',
            year: '2019',
            image: '/images/image01@2x.jpg',
            url: 'https://google.com'
        },
        {
            project: '<span>The Wilder</span> <span>Night</span>',
            author: 'Johanna Hobel',
            client: 'Wild',
            month: 'Dec',
            year: '2019',
            image: '/images/image02@2x.jpg',
            url: 'https://github.com'
        },
        {
            project: '<span>Smooth</span> <span>Memories</span>',
            author: 'Johanna Hobel',
            client: 'Chanel',
            month: 'Feb',
            year: '2020',
            image: '/images/image03@2x.jpg',
            url: 'https://adobe.com'
        },
        {
            project: '<span>The Future</span> <span>Universe</span>',
            author: 'Johanna Hobel',
            client: 'On',
            month: 'Apr',
            year: '2020',
            image: '/images/image04@2x.jpg',
            url: 'https://awwwards.com'
        },
        {
            project: '<span>She Was</span> <span>Born Urban</span>',
            author: 'Johanna Hobel',
            client: 'Si',
            month: 'Dec',
            year: '2021',
            image: '/images/image05@2x.jpg',
            url: 'https://apple.com'
        }
    ]
}

export const app: App = {
    slides: [],
    fillPercentage: 0,
    totalImages: 0,
    currentContentIndex: 0,
    isAnimating: false,
    isInitial: true,
    setSlides: () => {},
    setCurrentContentIndex: () => {},
    setIsAnimating: () => {},
    setFillPercentage: () => {}
}