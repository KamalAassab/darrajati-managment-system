
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

async function main() {
    const { sql } = await import('../lib/db/index');

    const scooters = [
        {
            name: 'Austin Ranger',
            slug: 'austin-ranger',
            image: '/Austin-ranger.webp',
            engine: '50',
            speed: '65',
            price: 120,
            quantity: 2,
            status: 'available',
            desc: {
                en: 'The Austin Ranger is a rugged and reliable 50cc scooter built for urban exploration.',
                fr: "L'Austin Ranger est un scooter 50cc robuste et fiable conçu pour l'exploration urbaine.",
                ar: 'أوستن رينجر هو سكوتر قوي وموثوق بسعة 50 سي سي مصمم للاستكشاف الحضري.'
            },
            features: {
                en: ["Automatic Transmission", "Electric Start", "Under-seat Storage"],
                fr: ["Transmission Automatique", "Démarrage Électrique", "Rangement sous le siège"],
                ar: ["ناقل حركة أوتوماتيكي", "تشغيل كهربائي", "تخزين تحت المقعد"]
            }
        },
        {
            name: 'Austin Strada',
            slug: 'austin-strada',
            image: '/Austin-strada.webp',
            engine: '50',
            speed: '65',
            price: 120,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'Experience the city like never before with the Austin Strada. Sporty and agile.',
                fr: "Découvrez la ville comme jamais auparavant avec l'Austin Strada. Sportif et agile.",
                ar: 'اكتشف المدينة مع أوستن سترادا. رياضي ورشيق.'
            },
            features: {
                en: ["Sporty Design", "Agile Handling", "Digital Dashboard"],
                fr: ["Design Sportif", "Maniabilité Agile", "Tableau de Bord Numérique"],
                ar: ["تصميم رياضي", "تحكم رشيق", "لوحة قيادة رقمية"]
            }
        },
        {
            name: 'Sym Orbit',
            slug: 'sym-orbit',
            image: '/Sym-orbit.webp',
            engine: '50',
            speed: '65',
            price: 140,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'The Sym Orbit is a smart choice for efficient mobility. Known for durability.',
                fr: "Le Sym Orbit est un choix intelligent pour une mobilité efficace. Connu pour sa durabilité.",
                ar: 'سيم أوربيت هو خيار ذكي للتنقل الفعال. معروف بمتانته.'
            },
            features: {
                en: ["Durable Build", "Spacious Floorboard", "Comfortable Seat"],
                fr: ["Construction Durable", "Plancher Spacieux", "Siège Confortable"],
                ar: ["بنية متينة", "أرضية واسعة", "مقعد مريح"]
            }
        },
        {
            name: 'Becane R9',
            slug: 'becane-r9',
            image: '/Becane-r9.webp',
            engine: '50',
            speed: '65',
            price: 120,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'The Becane R9 offers a blend of performance and style.',
                fr: "Le Becane R9 offre un mélange de performance et de style.",
                ar: 'يقدم بيكان R9 مزيجًا من الأداء والأناقة.'
            },
            features: {
                en: ["Dynamic Styling", "Responsive Brakes", "Smooth Suspension"],
                fr: ["Style Dynamique", "Freins Réactifs", "Suspension Douce"],
                ar: ["تصميم ديناميكي", "فرامل استجابة", "نظام تعليق سلس"]
            }
        },
        {
            name: 'Becane Miro 50',
            slug: 'becane-miro-50',
            image: '/MIRO50.webp',
            engine: '50',
            speed: '60',
            price: 120,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'Compact and efficient, the Becane Miro 50 is perfect for quick city trips.',
                fr: "Compact et efficace, le Becane Miro 50 est parfait pour les trajets urbains rapides.",
                ar: 'بيكان ميرو 50 مدمج وفعال، مثالي للرحلات القصيرة في المدينة.'
            },
            features: {
                en: ["Compact Design", "Fuel Efficient", "Easy Handling"],
                fr: ["Design Compact", "Économe en carburant", "Facile à manœuvrer"],
                ar: ["تصميم مدمج", "موفر للوقود", "سهولة التعامل"]
            }
        },
        {
            name: 'Cappuccino S',
            slug: 'cappuccino-s',
            image: '/CAPPS.webp',
            engine: '50',
            speed: '60',
            price: 130,
            quantity: 3,
            status: 'available',
            desc: {
                en: 'Retro style meets modern reliability with the Cappuccino S.',
                fr: "Le style rétro rencontre la fiabilité moderne avec le Cappuccino S.",
                ar: 'يلتقي الطراز القديم بالموثوقية الحديثة مع كابتشينو إس.'
            },
            features: {
                en: ["Retro Style", "Comfortable Seat", "Chromed Details"],
                fr: ["Style Rétro", "Siège Confortable", "Détails Chromés"],
                ar: ["طراز ريترو", "مقعد مريح", "تفاصيل كروم"]
            }
        },
        {
            name: 'Jnen Mokhito',
            slug: 'jnen-mokhito',
            image: '/MOKHITO.webp',
            engine: '50',
            speed: '60',
            price: 125,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'Stand out with the unique design of the Jnen Mokhito.',
                fr: "Démarquez-vous avec le design unique du Jnen Mokhito.",
                ar: 'تميز بالتصميم الفريد لـ جنين موخيتو.'
            },
            features: {
                en: ["Unique Design", "Smooth Ride", "Economic"],
                fr: ["Design Unique", "Conduite Douce", "Économique"],
                ar: ["تصميم فريد", "قيادة سلسة", "اقتصادي"]
            }
        },
        {
            name: 'Go Swap Flow',
            slug: 'go-swap-flow',
            image: '/GOSWAPFLOW.webp',
            engine: '50',
            speed: '65',
            price: 130,
            quantity: 6,
            status: 'available',
            desc: {
                en: 'Modern and sleek flows for the contemporary rider.',
                fr: "Des lignes modernes et épurées pour le cycliste contemporain.",
                ar: 'خطوط حديثة وأنيقة للراكب المعاصر.'
            },
            features: {
                en: ["Modern Look", "Efficient", "Reliable"],
                fr: ["Look Moderne", "Efficace", "Fiable"],
                ar: ["مظهر حديث", "فعال", "موثوق"]
            }
        },
        {
            name: 'Austin Rebecca S',
            slug: 'austin-rebecca-s',
            image: '/REBECCAS.webp',
            engine: '50',
            speed: '60',
            price: 125,
            quantity: 2,
            status: 'available',
            desc: {
                en: 'The Austin Rebecca S combines elegance with performance.',
                fr: "L'Austin Rebecca S allie élégance et performance.",
                ar: 'يجمع أوستن ريبيكا إس بين الأناقة والأداء.'
            },
            features: {
                en: ["Elegant Design", "Comfortable", "City Friendly"],
                fr: ["Design Élégant", "Confortable", "Adapté à la ville"],
                ar: ["تصميم أنيق", "مريح", "صديق للمدينة"]
            }
        },
        {
            name: 'C50',
            slug: 'c50',
            image: '/C50.webp',
            engine: '50',
            speed: '60',
            price: 110,
            quantity: 3,
            status: 'available',
            desc: {
                en: 'The legendary C50 design, reliable and timeless.',
                fr: "Le design légendaire du C50, fiable et intemporel.",
                ar: 'تصميم C50 الأسطوري، موثوق وخالد.'
            },
            features: {
                en: ["Classic Design", "Very Reliable", "Easy Maintenance"],
                fr: ["Design Classique", "Très Fiable", "Entretien Facile"],
                ar: ["تصميم كلاسيكي", "موثوق جداً", "صيانة سهلة"]
            }
        },
        {
            name: 'Sanya R1000',
            slug: 'sanya-r1000',
            image: '/SANYA.webp',
            engine: '50',
            speed: '65',
            price: 120,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'Robust and ready for the road, the Sanya R1000 delivers.',
                fr: "Robuste et prêt pour la route, le Sanya R1000 assure.",
                ar: 'قوي وجاهز للطريق، سانية R1000 يفي بالغرض.'
            },
            features: {
                en: ["Robust", "Good Suspension", "Strong Engine"],
                fr: ["Robuste", "Bonne Suspension", "Moteur Puissant"],
                ar: ["قوي", "نظام تعليق جيد", "محرك قوي"]
            }
        },
        {
            name: 'Cappuccino Plus',
            slug: 'cappuccino-plus',
            image: '/CAPPPLUS.webp',
            engine: '50',
            speed: '60',
            price: 135,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'An upgrade to the classic, the Cappuccino Plus offers more.',
                fr: "Une mise à niveau du classique, le Cappuccino Plus offre plus.",
                ar: 'ترقية للكلاسيكي، كابتشينو بلس يقدم المزيد.'
            },
            features: {
                en: ["Premium Specs", "Sleek Finish", "Comfort Ride"],
                fr: ["Spécifications Premium", "Finition Élégante", "Conduite Confortable"],
                ar: ["مواصفات ممتازة", "تشطيب أنيق", "قيادة مريحة"]
            }
        },
        {
            name: 'Kymco Agility',
            slug: 'kymco-agility',
            image: '/KYMKOAGILITY.webp',
            engine: '50',
            speed: '65',
            price: 130,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'Agility by name and nature. Great for navigating busy streets.',
                fr: "Agilité de nom et de nature. Idéal pour naviguer dans les rues animées.",
                ar: 'رشاقة بالاسم والطبيعة. عظيم للتنقل في الشوارع المزدحمة.'
            },
            features: {
                en: ["Agile", "Durable", "Responsive"],
                fr: ["Agile", "Durable", "Réactif"],
                ar: ["رشيق", "متين", "استجابة سريعة"]
            }
        },
        {
            name: 'Becane Torino',
            slug: 'becane-torino',
            image: '/TORINO.webp',
            engine: '50',
            speed: '65',
            price: 125,
            quantity: 1,
            status: 'available',
            desc: {
                en: 'Italian inspired design with solid performance.',
                fr: "Design d'inspiration italienne avec des performances solides.",
                ar: 'تصميم مستوحى من إيطاليا مع أداء قوي.'
            },
            features: {
                en: ["Stylish", "Performance", "Comfort"],
                fr: ["Élégant", "Performance", "Confort"],
                ar: ["أنيق", "أداء", "راحة"]
            }
        }
    ];

    console.log('Seeding scooters...');
    for (const s of scooters) {
        try {
            await sql`
                INSERT INTO scooters (
                    slug, name, image, engine, speed, price, quantity, status,
                    desc_en, desc_fr, desc_ar, features_en, features_fr, features_ar,
                    last_maintenance
                ) VALUES (
                    ${s.slug}, ${s.name}, ${s.image}, ${s.engine}, ${s.speed}, ${s.price}, ${s.quantity}, ${s.status},
                    ${s.desc.en}, ${s.desc.fr}, ${s.desc.ar},
                    ${JSON.stringify(s.features.en)}::jsonb,
                    ${JSON.stringify(s.features.fr)}::jsonb,
                    ${JSON.stringify(s.features.ar)}::jsonb,
                    NOW()
                )
                ON CONFLICT (slug) DO UPDATE SET
                    name = EXCLUDED.name,
                    image = EXCLUDED.image,
                    engine = EXCLUDED.engine,
                    speed = EXCLUDED.speed,
                    price = EXCLUDED.price,
                    quantity = EXCLUDED.quantity,
                    status = EXCLUDED.status,
                    desc_en = EXCLUDED.desc_en,
                    desc_fr = EXCLUDED.desc_fr,
                    desc_ar = EXCLUDED.desc_ar,
                    features_en = EXCLUDED.features_en,
                    features_fr = EXCLUDED.features_fr,
                    features_ar = EXCLUDED.features_ar;
            `;
            console.log(`Inserted/Updated: ${s.name} (Qty: ${s.quantity})`);
        } catch (error) {
            console.error(`Error seeding ${s.name}:`, error);
        }
    }
    console.log('Seeding complete.');
    process.exit(0);
}

main().catch(error => {
    console.error('Fatal error in seed script:', error);
    process.exit(1);
});
