import { EventCategory } from '@/types/events';

// Define event categories with colors and events
export const eventCategories: EventCategory[] = [
  {
    id: 'cultural',
    name: {
      th: 'Cultural Escape',
      en: 'Cultural Escape',
      cn: 'Cultural Escape',
      jp: 'Cultural Escape'
    },
    color: 'bg-orange-900',
    textColor: 'text-white',
    image: '/lovable-uploads/cultural.jpg',
    events: [
      {
        id: 'c1',
        name: {
          th: 'งานประเพณีสรงน้ำพระบรมธาตุหริภุญชัย',
          en: 'Bathing Ceremony of Hariphunchai Pagoda',
          cn: '哈里奔猜佛塔浴佛仪式',
          jp: 'ハリプンチャイ仏塔水かけ儀式'
        },
        date: '2025-05-10',
        location: {
          th: 'วัดพระธาตุหริภุญชัย, อำเภอเมือง, ลำพูน',
          en: 'Wat Phra That Hariphunchai, Mueang District, Lamphun',
          cn: '哈里奔猜佛寺，廊坪府',
          jp: 'ワット・プラ・タート・ハリプンチャイ、ランプーン県'
        },
        description: {
          th: 'งานประเพณีสรงน้ำพระบรมธาตุหริภุญชัยเป็นประเพณีสำคัญของจังหวัดลำพูน จัดขึ้นเป็นประจำทุกปีในเดือนพฤษภาคม ภายในงานจะมีการสรงน้ำพระธาตุ การแห่ครัวทาน การทำบุญตักบาตร และการแสดงทางวัฒนธรรมต่างๆ',
          en: 'The bathing ceremony of Hariphunchai Pagoda is an important tradition of Lamphun Province, held annually in May. The event includes bathing the pagoda, alms-giving processions, merit-making, and various cultural performances.',
          cn: '哈里奔猜佛塔浴佛仪式是廊坪府的重要传统，每年5月举行。活动包括净身佛塔，布施游行，功德，以及各种文化表演。',
          jp: 'ハリプンチャイ仏塔水かけ儀式は、毎年5月に行われるランプーン県の重要な伝統です。この行事には仏塔への水かけ、施しの行列、功徳づくり、様々な文化的なパフォーマンスが含まれます。'
        },
        image: '/lovable-uploads/cultural.jpg',
        time: '08:00 - 18:00'
      },
      {
        id: 'c2',
        name: {
          th: 'ประเพณีแห่ผ้าขึ้นธาตุ',
          en: 'Cloth Offering Procession to the Pagoda',
          cn: '佛塔布施仪式',
          jp: '仏塔への布奉納行列'
        },
        date: '2025-07-25',
        location: {
          th: 'วัดพระธาตุหริภุญชัย, อำเภอเมือง, ลำพูน',
          en: 'Wat Phra That Hariphunchai, Mueang District, Lamphun',
          cn: '哈里奔猜佛寺，廊坪府',
          jp: 'ワット・プラ・タート・ハリプンチャイ、ランプーン県'
        },
        description: {
          th: 'ประเพณีแห่ผ้าขึ้นธาตุเป็นประเพณีสำคัญของชาวล้านนา โดยจะมีการนำผ้าไปห่มองค์พระธาตุหริภุญชัย ซึ่งเชื่อว่าจะได้อานิสงส์มาก ภายในงานมีการแห่แหนผ้าพระกฐิน การฟ้อนรำขบวนแห่ และการทำบุญตักบาตร',
          en: 'The cloth offering procession to the pagoda is an important tradition of Lanna people. People bring cloth to wrap around the Hariphunchai Pagoda, believing it brings great merit. The event includes processions, traditional dances, and alms-giving.',
          cn: '佛塔布施仪式是兰纳人民的重要传统。人们带来布料包裹哈里奔猜佛塔，相信这会带来巨大功德。活动包括游行，传统舞蹈和布施。',
          jp: '仏塔への布奉納行列は、ランナー人の重要な伝統です。人々はハリプンチャイ仏塔に布を巻くために持参し、それが大きな功徳をもたらすと信じています。この行事には行列、伝統舞踊、施しなどが含まれます。'
        },
        image: '/lovable-uploads/jamatevi.png',
        time: '09:00 - 17:00'
      },
      {
        id: 'c3',
        name: {
          th: 'งานรำถวายเจดีย์ ณ วัดพระธาตุหริภุญชัย',
          en: 'Traditional Dance Offering at Hariphunchai Temple',
          cn: '在哈里奔猜寺的传统舞蹈祭祀',
          jp: 'ハリプンチャイ寺院での伝統舞踊奉納'
        },
        date: '2025-10-15',
        location: {
          th: 'วัดพระธาตุหริภุญชัย, อำเภอเมือง, ลำพูน',
          en: 'Wat Phra That Hariphunchai, Mueang District, Lamphun',
          cn: '哈里奔猜佛寺，廊坪府',
          jp: 'ワット・プラ・タート・ハリプンチャイ、ランプーン県'
        },
        description: {
          th: 'งานรำถวายเจดีย์เป็นงานที่จัดขึ้นเพื่อถวายการรำแก่พระธาตุหริภุญชัย โดยมีการรำพื้นเมืองล้านนาและการแสดงทางวัฒนธรรมต่างๆ',
          en: 'The traditional dance offering is an event held to offer dances to the Hariphunchai Pagoda, featuring Lanna folk dances and various cultural performances.',
          cn: '传统舞蹈祭祀是为哈里奔猜佛塔提供舞蹈的活动，包括兰纳民间舞蹈和各种文化表演。',
          jp: '伝統舞踊奉納は、ランナーの民族舞踊や様々な文化的なパフォーマンスをフィーチャーし、ハリプンチャイ仏塔に踊りを捧げるために開催されるイベントです。'
        },
        image: '/lovable-uploads/hariphunchai.jpg',
        time: '19:00 - 21:00'
      }
    ]
  },
  {
    id: 'sound',
    name: {
      th: 'Sound of Lamphun',
      en: 'Sound of Lamphun',
      cn: 'Sound of Lamphun',
      jp: 'Sound of Lamphun'
    },
    color: 'bg-teal-500',
    textColor: 'text-white',
    image: '/lovable-uploads/musicfest.jpg',
    events: [
      {
        id: 's1',
        name: {
          th: 'คอนเสิร์ตกลางสวนในวัดเก่า',
          en: 'Garden Concert in Ancient Temple',
          cn: '古寺花园音乐会',
          jp: '古代寺院でのガーデンコンサート'
        },
        date: '2025-04-20',
        location: {
          th: 'วัดจามเทวี, อำเภอเมือง, ลำพูน',
          en: 'Wat Chamadevi, Mueang District, Lamphun',
          cn: '加玛黛维寺，廊坪府',
          jp: 'ワット・チャマテーヴィー、ランプーン県'
        },
        description: {
          th: 'คอนเสิร์ตกลางสวนในวัดเก่าเป็นงานที่จัดขึ้นในบริเวณวัดจามเทวี โดยมีการแสดงดนตรีพื้นเมืองล้านนาและดนตรีร่วมสมัย ผู้เข้าชมจะได้ชมการแสดงดนตรีท่ามกลางบรรยากาศโบราณสถานที่มีอายุกว่าพันปี',
          en: 'The Garden Concert in Ancient Temple is held at Wat Chamadevi. The event features Lanna folk music and contemporary music performances. Visitors can enjoy music performances amidst the atmosphere of thousand-year-old ancient ruins.',
          cn: '古寺花园音乐会在加玛黛维寺举行。活动包括兰纳民间音乐和现代音乐表演。游客可以在千年古迹的氛围中欣赏音乐表演。',
          jp: '古代寺院でのガーデンコンサートは、ワット・チャマテーヴィーで開催されます。このイベントではランナー民俗音楽と現代音楽のパフォーマンスが行われます。訪問者は千年以上前の古代遺跡の雰囲気の中で音楽を楽しむことができます。'
        },
        image: '/lovable-uploads/musicfest.jpg',
        time: '17:00 - 22:00'
      },
      {
        id: 's2',
        name: {
          th: 'ลานดนตรีเยาวชนลำพูน',
          en: 'Lamphun Youth Music Plaza',
          cn: '南奔青年音乐广场',
          jp: 'ランプーン青少年音楽広場'
        },
        date: '2025-06-15',
        location: {
          th: 'ลานหน้าเทศบาลเมืองลำพูน, อำเภอเมือง, ลำพูน',
          en: 'In front of Lamphun Municipality, Mueang District, Lamphun',
          cn: '南奔市府前广场，廊坪府',
          jp: 'ランプーン市役所前広場、ランプーン県'
        },
        description: {
          th: 'ลานดนตรีเยาวชนลำพูนเป็นพื้นที่สำหรับเยาวชนในจังหวัดลำพูนได้แสดงความสามารถทางดนตรี มีการแสดงดนตรีหลากหลายประเภท ทั้งดนตรีไทย ดนตรีสากล และดนตรีร่วมสมัย',
          en: 'Lamphun Youth Music Plaza is a space for youths in Lamphun Province to showcase their musical talents. There are various types of music performances, including Thai music, international music, and contemporary music.',
          cn: '南奔青年音乐广场是南奔府的青年展示其音乐才能的场所。有各种类型的音乐表演，包括泰国音乐、国际音乐和现代音乐。',
          jp: 'ランプーン青少年音楽広場は、ランプーン県の若者が音楽の才能を披露する場所です。タイ音楽、国際音楽、現代音楽など、さまざまな種類の音楽パフォーマンスがあります。'
        },
        image: '/lovable-uploads/youthmusic.jpg',
        time: '18:00 - 23:00'
      },
      {
        id: 's3',
        name: {
          th: 'งานดนตรีแจ๊สริมแม่น้ำกวง',
          en: 'Jazz by the Kuang River',
          cn: '广河畔爵士音乐',
          jp: 'クアン川沿いジャズフェスティバル'
        },
        date: '2025-12-10',
        location: {
          th: 'ริมแม่น้ำกวง, อำเภอเมือง, ลำพูน',
          en: 'Kuang River, Mueang District, Lamphun',
          cn: '广河，廊坪府',
          jp: 'クアン川、ランプーン県'
        },
        description: {
          th: 'งานดนตรีแจ๊สริมแม่น้ำกวงเป็นงานที่จัดขึ้นริมแม่น้ำกวง โดยมีการแสดงดนตรีแจ๊สจากศิลปินทั้งในและต่างประเทศ ผู้เข้าชมจะได้ชมการแสดงดนตรีท่ามกลางบรรยากาศริมน้ำที่สวยงาม',
          en: 'Jazz by the Kuang River is an event held along the Kuang River, featuring jazz music performances from both local and international artists. Visitors can enjoy music performances amidst the beautiful riverside atmosphere.',
          cn: '广河畔爵士音乐是沿着广河举行的活动，包括来自本地和国际艺术家的爵士音乐表演。游客可以在美丽的河边氛围中欣赏音乐表演。',
          jp: 'クアン川沿いのジャズは、クアン川沿いで開催されるイベントで、地元のアーティストと国際的なアーティストの両方によるジャズ音楽のパフォーマンスをフィーチャーしています。訪問者は美しい川岸の雰囲気の中で音楽を楽しむことができます。'
        },
        image: '/lovable-uploads/jazz.jpg',
        time: '19:00 - 00:00'
      }
    ]
  },
  {
    id: 'sports',
    name: {
      th: 'Sports Tourism',
      en: 'Sports Tourism',
      cn: 'Sports Tourism',
      jp: 'Sports Tourism'
    },
    color: 'bg-blue-700',
    textColor: 'text-white',
    image: '/lovable-uploads/trail.jpg',
    events: [
      {
        id: 'sp1',
        name: {
          th: 'Lamphun Marathon',
          en: 'Lamphun Marathon',
          cn: '南奔马拉松',
          jp: 'ランプーンマラソン'
        },
        date: '2025-03-15',
      },
      {
        id: 'sp2',
        name: {
          th: 'ปั่นจักรยานท่องเที่ยว เมืองเก่าลำพูน',
          en: 'Cycling Tour in Old Lamphun City',
          cn: '南奔古城自行车之旅',
          jp: 'ランプーン旧市街サイクリングツアー'
        },
        date: '2025-08-22',
      },
      {
        id: 'sp3',
        name: {
          th: 'Khun Tan Trail',
          en: 'Khun Tan Trail',
          cn: '昆丹步道',
          jp: 'クンタントレイル'
        },
        date: '2025-11-05',
      },
      {
        id: 'sp4',
        name: {
          th: 'Triathlon',
          en: 'Triathlon',
          cn: '铁人三项',
          jp: 'トライアスロン'
        },
        date: '2025-05-28',
      }
    ]
  },
  {
    id: 'creative',
    name: {
      th: 'Creative Experience',
      en: 'Creative Experience',
      cn: 'Creative Experience',
      jp: 'Creative Experience'
    },
    color: 'bg-cyan-600',
    textColor: 'text-white',
    image: '/lovable-uploads/creative.jpeg',
    events: [
      {
        id: 'ce1',
        name: {
          th: 'เวิร์กชอปผ้ามัดย้อมและผ้าทอ',
          en: 'Tie-Dye and Weaving Workshops',
          cn: '扎染和编织工作坊',
          jp: '絞り染めと織物ワークショップ'
        },
        date: '2025-02-20',
      },
      {
        id: 'ce2',
        name: {
          th: 'Lamphun Craft Week',
          en: 'Lamphun Craft Week',
          cn: '南奔工艺周',
          jp: 'ランプーンクラフトウィーク'
        },
        date: '2025-09-10',
      },
      {
        id: 'ce3',
        name: {
          th: 'นิทรรศการภาพถ่ายวิถีชีวิตชาวลำพูน',
          en: 'Lamphun Lifestyle Photography Exhibition',
          cn: '南奔生活方式摄影展',
          jp: 'ランプーン生活様式写真展'
        },
        date: '2025-04-05',
      }
    ]
  },
  {
    id: 'volunteer',
    name: {
      th: 'Volunteer Adventure',
      en: 'Volunteer Adventure',
      cn: 'Volunteer Adventure',
      jp: 'Volunteer Adventure'
    },
    color: 'bg-green-900',
    textColor: 'text-white',
    image: '/lovable-uploads/volunteer.jpg',
    events: [
      {
        id: 'v1',
        name: {
          th: 'อาสาสมัครพัฒนาป่าชุมชน',
          en: 'Community Forest Development Volunteer',
          cn: '社区森林发展志愿者',
          jp: 'コミュニティフォレスト開発ボランティア'
        },
        date: '2025-07-15',
      }
    ]
  },
  {
    id: 'educational',
    name: {
      th: 'Educational Tourism',
      en: 'Educational Tourism',
      cn: 'Educational Tourism',
      jp: 'Educational Tourism'
    },
    color: 'bg-gray-900',
    textColor: 'text-white',
    image: '/lovable-uploads/robot.jpg',
    events: [
      {
        id: 'e1',
        name: {
          th: 'แข่งขัน robot',
          en: 'Robot Competition',
          cn: '机器人比赛',
          jp: 'ロボットコンペティション'
        },
        date: '2025-06-28',
      },
      {
        id: 'e2',
        name: {
          th: 'แข่งขันหมากกระดาน',
          en: 'Board Game Competition',
          cn: '棋盘游戏比赛',
          jp: 'ボードゲーム競技会'
        },
        date: '2025-08-10',
      }
    ]
  }
];
