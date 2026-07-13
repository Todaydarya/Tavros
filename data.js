const projectsDB = [
    {
        id: 1,
        name: "H2O",
        location: "п. Витязево",
        description: "Раздвижная кровельная система из стекла для максимального естественного освещения.",
        gallery: [
            "projects/H2O/1.jpg",
            "projects/H2O/2.jpg",
            "projects/H2O/3.jpg",
            "projects/H2O/4.jpg"
        ],
        video: "projects/H2O/H2O.mp4"
    },
    {
        id: 2,
        name: "SOHO ROOMS на Волне",
        location: "г. Москва",
        description: "Панорамное остекление и мобильные перегородки под ключ.",
        gallery: [
            "projects/soho_rooms/1.jpg",
            "projects/soho_rooms/2.jpg",
            "projects/soho_rooms/3.jpg"
        ],
        video: "projects/soho_rooms/soho_rooms.mp4"
    },
    {
        id: 3,
        name: "Облака",
        location: "г. Анапа",
        description: "Легкая и гибкая раздвижная кровля из поликарбоната с защитой от UV.",
        gallery: [
            "projects/Clouds/1.jpg",
            "projects/Clouds/2.jpg",
            "projects/Clouds/3.jpg",
            "projects/Clouds/4.jpg",
            "projects/Clouds/5.jpg",
            "projects/Clouds/6.jpg",
            "projects/Clouds/7.jpg",
            "projects/Clouds/8.jpg"
        ],
        video: "projects/Clouds/Clouds.mp4"
    },
    {
        id: 4,
        name: "Плаза",
        location: "г. Анапа",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Plaza/1.jpg",
            "projects/Plaza/2.jpg",
            "projects/Plaza/3.jpg",
            "projects/Plaza/4.jpg",
            "projects/Plaza/5.jpg",
            "projects/Plaza/6.jpg",
            "projects/Plaza/7.jpg",
            "projects/Plaza/8.jpg",
            "projects/Plaza/9.jpg"
        ],
        video: "projects/Plaza/Plaza.mp4"
    },
    {
        id: 5,
        name: "Афродита",
        location: "г. Белореченск",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Aphrodite/1.jpg",
            "projects/Aphrodite/2.jpg",
            "projects/Aphrodite/3.jpg",
            "projects/Aphrodite/4.jpg",
            "projects/Aphrodite/5.jpg",
            "projects/Aphrodite/6.jpg"
        ],
        video: "projects/Aphrodite/Aphrodite.mp4"
    },
    {
        id: 6,
        name: "Маэстро",
        location: "г. Москва",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Maestro/1.jpg",
            "projects/Maestro/2.jpg",
            "projects/Maestro/3.jpg",
            "projects/Maestro/4.jpg",
            "projects/Maestro/5.jpg",
            "projects/Maestro/6.jpg"
        ],
        video: null
    },
    {
        id: 7,
        name: "Ахиллеон Парк",
        location: "п. Кабардинка",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Achilleon_park/1.jpg",
            "projects/Achilleon_park/2.jpg",
            "projects/Achilleon_park/3.jpg",
            "projects/Achilleon_park/4.jpg",
            "projects/Achilleon_park/5.jpg",
            "projects/Achilleon_park/6.jpg",
            "projects/Achilleon_park/7.jpg",
            "projects/Achilleon_park/8.jpg"
        ],
        video: null
    },
    {
        id: 8,
        name: "Частный дом",
        location: "г. Сочи",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Sochi/1.jpg",
            "projects/Sochi/2.jpg",
            "projects/Sochi/3.jpg"
        ],
        video: null
    },
    {
        id: 9,
        name: "Частный дом",
        location: "п. Колос",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Kolos/1.jpg",
            "projects/Kolos/2.jpg",
            "projects/Kolos/3.jpg",
            "projects/Kolos/4.jpg",
            "projects/Kolos/5.jpg",
            "projects/Kolos/6.jpg",
            "projects/Kolos/7.jpg"
        ],
        video: null
    },
    {
        id: 10,
        name: "Немецкая деревня",
        location: "г. Краснодар",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/German_village/1.jpg"
        ],
        video: null
    },
    {
        id: 11,
        name: "Браво",
        location: "п. Витязево",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Bravo/1.jpg",
            "projects/Bravo/2.jpg",
            "projects/Bravo/3.jpg",
            "projects/Bravo/4.jpg",
            "projects/Bravo/5.jpg"
        ],
        video: null
    },
    {//
        id: 12,
        name: "Частный дом",
        location: "г. Краснодар",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Krasnodar/1.jpg",
            "projects/Krasnodar/2.jpg",
            "projects/Krasnodar/3.jpg"
        ],
        video: null
    },
    {
        id: 13,
        name: "Симферо",
        location: "г. Симферополь",
        description: "Комплексное решение с использованием сэндвич-панелей для теплоизоляции и приватности.",
        gallery: [
            "projects/Symphero/1.jpg",
            "projects/Symphero/2.jpg",
            "projects/Symphero/3.jpg",
            "projects/Symphero/4.jpg",
            "projects/Symphero/5.jpg",
            "projects/Symphero/6.jpg",
            "projects/Symphero/7.jpg"
        ],
        video: null
    }
];