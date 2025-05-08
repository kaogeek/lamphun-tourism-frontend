
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
    color: 'bg-orange-600',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
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
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
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
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
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
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
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
    color: 'bg-green-600',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
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
    color: 'bg-orange-500',
    textColor: 'text-white',
    image: '/lovable-uploads/2d898717-b8a6-4a58-88f5-ee3c5e142a37.png',
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
