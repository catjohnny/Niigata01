import { GuideLocation, ItineraryDay, TodoItem } from './types';

export const GUIDE_LOCATIONS: GuideLocation[] = [
  {
      id: 'airport',
      title: '新潟機場 (KIJ)',
      subtitle: '交通接駁資訊',
      description: `【接駁車時刻表】
從新潟機場出發 ↓ 抵達新潟車站

• 18:00 (大巴) → 18:23
• 18:20 (公車) → 18:49
• 18:30 (大巴) → 18:53
• 18:55 (大巴) → 19:18
• 19:05 (公車) → 19:32
• 19:15 (公車) → 19:42
• 19:45 (大巴) → 20:08
• 20:25 (公車) → 20:52
• 20:35 (大巴) → 20:58
• 20:45 (公車) → 21:12
• 21:10 (大巴) → 21:33`,
      imagePlaceholder: 'https://picsum.photos/id/1059/800/600',
      details: [
          { label: '車資', value: '大巴(直達) / 公車(各停)' },
          { label: '支付', value: '現金 / IC卡' }
      ]
  },
  {
      id: 'niigata_daiichi',
      title: '新潟第一飯店',
      subtitle: 'Niigata Daiichi Hotel',
      description: `📍 B1F (地下一樓)
♨️ 大浴場 (みなとの湯)：
• 設有男性大浴場與女性大浴場。
• 女性浴場需專用鑰匙。
• 營業時間：15:00 - 02:00 (深夜) / 05:00 - 09:30。

📍 1F (一樓)
服務設施：
• 櫃檯與大廳、保全置物櫃、AED。
• 免費備品區 (自由取用，含女性專用備品)。
• 櫃檯提供租借：手機充電器、熨斗、裁縫組。
商店/服務：
🏪 便利商店 (LAWSON)： 與飯店大廳直通。
🚲 自行車租賃： 每次 500 日圓 (需證件)。

📍 2F (二樓)
🍴 早餐會場 (mahoro)
• 多功能室 (201、202)
🚬 吸菸室

📍 3F (三樓)
娛樂/休憩：
📚 漫畫室： 藏書超過 15,000 冊，設有付費按摩椅 (200日圓)。
實用設施：
• 洗衣房 (ランドリー)：投幣式洗衣機、烘乾機，設有女性專用洗衣房。
 (洗衣 30分 300円 / 烘乾 30分 100円)
🚿 女性專用淋浴間 (需鑰匙)。
• 無障礙廁所。
• 自動販賣機、製冰機、微波爐`,
      imagePlaceholder: 'https://picsum.photos/id/1031/800/600',
      details: [
          { label: 'MapCode', value: 'Google Maps' },
          { label: '便利商店', value: 'Lawson (1F直通)' }
      ]
  },
  {
       id: 'xebio',
       title: 'XEBIO 運動快線',
       subtitle: '新潟車站店',
       description: `ゼビオスポーツエクスプレス 新潟駅店
       
任務：幫小孩買雪靴 ❄️
• 出發前量一下弟弟腳尺寸
• 確認哥哥的雪靴是否還穿得下`,
       imagePlaceholder: 'https://picsum.photos/id/1070/800/600',
  },
  {
      id: 'senbei',
      title: '新潟仙貝王國',
      subtitle: '手作仙貝體驗',
      description: `【體驗資訊】
• 受付期間：9時30分～16時30分
• 所要時間：體驗菜單因內容不同，最長約30分鐘
（煎餅烘烤體驗・煎餅調味體驗共五種）

【費用】
● 入場料：無料
● 超特大煎餅：1片 1,800日圓
● ばかうけ味道體驗：15片1組 1,500日圓`,
      imagePlaceholder: 'https://picsum.photos/id/1060/800/600',
      details: [
          { label: 'MapCode', value: '524 050 121*18' },
          { label: '營業時間', value: '09:30 - 16:30' }
      ]
  },
  {
      id: 'railway',
      title: '新津鐵道資料館',
      subtitle: '鐵道迷必訪',
      description: `【票價】
• 一般：390日圓
• 高中生・大學生：260日圓
• 小學生・中學生：130日圓

【體驗設施】
• 迷你 SL 搭乘體驗：每人每次 130日圓
• 電車駕駛模擬器：每人每次 100日圓`,
      imagePlaceholder: 'https://picsum.photos/id/1058/800/600',
      details: [
          { label: 'MapCode', value: '32 467 762*26' },
          { label: '門票', value: '390 JPY' }
      ]
  },
  {
      id: 'befco',
      title: 'Befco ばかうけ展望室',
      subtitle: '朱鷺展覽館 31F',
      description: `【參觀資訊】
• 開館時間：8:00-22:00
(最終入場 21:30 / 周五~17:00)

【費用】
• 大人：300日圓
• 大學及高中生：200日圓
• 中學生以下：免費
(其他特殊展覽門票另計)`,
      imagePlaceholder: 'https://picsum.photos/id/1042/800/600',
      details: [
          { label: 'MapCode', value: 'Google Maps' },
          { label: '門票', value: '300 JPY' }
      ]
  },
  {
      id: 'comfort_hotel',
      title: 'Comfort Hotel 燕三条',
      subtitle: '三條凱富酒店',
      description: `【停車資訊】
■ 場內停車場 (平面)
• 高度限制：無
• 台數：87台
• 費用：15:00～翌10:00 免費
(依住宿方案的停留時間為準，其他時間禁止停車)`,
      imagePlaceholder: 'https://picsum.photos/id/1000/800/600',
      details: [
          { label: 'MapCode', value: '58 833 183*73' },
          { label: '停車', value: '免費 (住客)' }
      ]
  },
  {
      id: 'furusato',
      title: '新潟故鄉村',
      subtitle: '新潟ふるさと村',
      description: `【參觀資訊】
• 營業時間：9:30～17:30
(連續假期有時會延長。各飲食店可自行決定營業時間。)
• 入場費：免入場費
• 官網：http://furusatomura.pref.niigata.jp/cnt/
• 延伸閱讀：https://vocus.cc/article/64aa8cf5fd897800017c807f

這裡集合了新潟的美食與歷史，室內有大型遊樂設施，適合親子同樂。`,
      imagePlaceholder: 'https://picsum.photos/id/1084/800/600',
      details: [
          { label: 'MapCode', value: '32 692 564*67' },
          { label: '電話', value: '025-230-3030' }
      ]
  },
  {
      id: 'yahiko',
      title: '彌彥神社 & 纜車',
      subtitle: '越後第一宮',
      description: `【彌彥神社】
擁有2400年歷史，充滿靈氣的能量景點。

【彌彥山纜車】
• 交通：從參拜殿側至山麓站，搭乘免費接駁巴士約3分鐘。
• 費用：成人800日圓／兒童400日圓 (3歲以下免費)
• 營業時間：依時期而異
• 公休日：不定期
• 延伸閱讀：https://vocus.cc/article/64aa8cf5fd897800017c807f`,
      imagePlaceholder: 'https://picsum.photos/id/1036/800/600',
      details: [
          { label: 'MapCode', value: '190 129 317*13' },
          { label: '電話', value: '0256-94-4141' }
      ]
  },
  {
      id: 'tsubame_center',
      title: '燕三條地場產業振興中心',
      subtitle: '金屬工藝聖地',
      description: `燕三條以金屬加工與洋食器聞名。這裡匯集了當地最高品質的餐具、鍋具與工藝品，是選購伴手禮的最佳地點。

• 官網：https://www.tsjiba.or.jp/ch/
• 延伸閱讀：https://vocus.cc/article/64aa8cf5fd897800017c807f`,
      imagePlaceholder: 'https://picsum.photos/id/1013/800/600',
      details: [
          { label: 'MapCode', value: '58 832 492*03' },
          { label: '電話', value: '0256-32-2311' }
      ]
  },
  {
      id: 'hangzhou',
      title: '杭州飯店',
      subtitle: '元祖背脂拉麵',
      description: `【餐廳資訊】
• 評分：3.9 (2,699則評論)
• 預算：¥1,000 - ¥2,000
• 類別：拉麵、餃子、中國菜
• 特色：燕三條知名的「背脂拉麵」發源地。極粗麵條搭配濃郁醬油湯頭與滿滿背脂，口味獨特。`,
      imagePlaceholder: 'https://picsum.photos/id/1062/800/600',
      details: [
          { label: 'MapCode', value: '190 019 628*63' },
          { label: '推薦', value: '背脂拉麵' }
      ]
  },
  {
      id: 'angel_shuttle',
      title: '飯店接駁巴士',
      subtitle: '越後湯澤站西口 ⇄ 天使格昂迪亞',
      description: `【時刻表】(案內所發 → 飯店發)

08:30 → 08:30
09:00 → 09:00
09:30 → ★09:45
10:00 → ★10:15
10:30 → ★10:45
11:00 → ★11:15
11:30 → ★11:45
12:00 → ★12:15
----  → ★12:45
13:00 → ★13:15
13:30 → ★13:45
14:00 → 14:00
14:30 → 14:30
15:00 → 15:00
15:30 → ★15:45
16:00 → ★16:15
16:30 → ★16:45
17:00 → ★17:15
----  → ★17:45
18:00 → 18:00
18:30 → ---
19:30 → 19:00
20:30 → 20:00
※21:30 → ※21:00

📌 備註
※印：僅週五、週六運行（特定日期亦視為週五、週六）。
★印：僅在指定日期（如 12/26～1/4、1/9～11、1/16～18、1/23～3/8）運行。`,
      imagePlaceholder: 'https://picsum.photos/id/1071/800/600',
      details: [
          { label: '乘車處', value: '越後湯澤站西口' },
          { label: '費用', value: '免費 (房客)' }
      ]
  },
  {
      id: 'kiyotsu',
      title: '清津峽',
      subtitle: '光之隧道 (Tunnel of Light)',
      description: '日本三大峽谷之一。「光之隧道」是著名的藝術裝置，隧道盡頭的水盤倒映著峽谷的壯麗景色，形成夢幻般的倒影，是絕對不能錯過的打卡聖地。',
      imagePlaceholder: 'https://picsum.photos/id/1015/800/600',
      details: [
          { label: 'MapCode', value: '使用 Google Maps' },
          { label: '門票', value: '成人 1000日圓' }
      ]
  },
  {
      id: 'strawberry',
      title: '湯澤草莓村',
      subtitle: '雪国アグリパーク湯沢いちご村',
      description: `【營業資訊】
• 地址：新潟県南魚沼郡湯沢町神立750-1
• 時間：10:00–15:30 (15:30最後入場)
• 備註：出發前請事先確認是否營業

位於雪國的溫室草莓園，享受現採新鮮草莓的樂趣。`,
      imagePlaceholder: 'https://picsum.photos/id/1080/800/600',
      details: [
          { label: 'MapCode', value: 'Google Maps' },
          { label: '活動', value: '採草莓' }
      ]
  }
];

export const ITINERARY: ItineraryDay[] = [
  {
      date: '1/9',
      dayOfWeek: '週五',
      title: '抵達新潟',
      items: [
          { time: '13:55', title: 'TPE 桃園機場出發 (IT228)', type: 'transport', description: '台灣虎航 第一航廈', highlight: true },
          { time: '18:00', title: '抵達新潟機場 (KIJ)', type: 'transport', description: '辦理入境手續。前往接駁巴士站。', highlight: true, guideId: 'airport' },
          { time: '19:00', title: '前往新潟站', type: 'transport', description: '機場接駁巴士 (時刻表詳見說明)。車資：成人470日圓。' },
          { time: 'Check-in', title: '新潟第一飯店', type: 'hotel', description: '離車站徒步1分鐘。B1F有大浴場。1F連通Lawson。', locationLink: 'https://maps.app.goo.gl/NiigataDaiichi', guideId: 'niigata_daiichi' },
          { time: '晚餐', title: '廻轉壽司 弁慶 或 Royal Host', type: 'food', description: '位於Pia Bandai或車站南口。' },
          { time: '購物', title: 'XEBIO 運動快線', type: 'activity', description: '新潟車站店。採買雪靴。', guideId: 'xebio' }
      ]
  },
  {
      date: '1/10',
      dayOfWeek: '週六',
      title: '文化與歷史',
      items: [
          { time: '09:00', title: '取車：豐田租車', type: 'transport', description: '新潟車站南口店。預約單號：98129667400。', locationLink: 'https://maps.app.goo.gl/ToyotaRentNiigata', highlight: true },
          { time: '上午', title: '新潟仙貝王國', type: 'activity', description: '體驗製作特大仙貝。', locationLink: 'https://maps.app.goo.gl/SenbeiKingdom', mapCode: '524 050 121*18', guideId: 'senbei' },
          { time: '下午', title: '新津鐵道資料館', type: 'activity', description: '新幹線實體車廂展示。', locationLink: 'https://maps.app.goo.gl/NiitsuRailway', mapCode: '32 467 762*26', guideId: 'railway' },
          { time: '16:43', title: 'Befco ばかうけ展望室', type: 'activity', description: '欣賞夕陽與夜景。最後入場21:30。', locationLink: 'https://maps.app.goo.gl/BefcoObservatory', guideId: 'befco' },
          { time: 'Check-in', title: '燕三條凱富飯店', type: 'hotel', description: 'Comfort Hotel。平面停車場免費。', locationLink: 'https://maps.app.goo.gl/ComfortTsubame', mapCode: '58 833 183*73', guideId: 'comfort_hotel' }
      ]
  },
  {
      date: '1/11',
      dayOfWeek: '週日',
      title: '彌彥神社與燕三條',
      items: [
          { time: '09:30', title: '新潟故鄉村', type: 'activity', description: '大型複合設施。免入場費。', locationLink: 'https://maps.app.goo.gl/FurusatoVillage', mapCode: '32 692 564*67', guideId: 'furusato' },
          { time: '12:00', title: '彌彥神社 & 纜車', type: 'activity', description: '越後第一宮。搭乘免費接駁車至纜車站。', locationLink: 'https://maps.app.goo.gl/YahikoShrine', mapCode: '190 129 317*13', guideId: 'yahiko' },
          { time: '下午', title: '燕三條地場產振興中心', type: 'activity', description: '匯集當地金屬工藝品與餐具。', locationLink: 'https://maps.app.goo.gl/TsubameCenter', mapCode: '58 832 492*03', guideId: 'tsubame_center' },
          { time: '購物', title: 'High Grade Store', type: 'activity', description: '株式会社カンダ。餐具Outlet。', mapCode: '58 828 829*78' },
          { time: '晚餐', title: '杭州飯店', type: 'food', description: '元祖背脂拉麵。', locationLink: 'https://maps.app.goo.gl/HangzhouHanten', mapCode: '190 019 628*63', guideId: 'hangzhou' },
          { time: '超市', title: 'AEON Mall 新潟龜田', type: 'food', description: '採買補給。', mapCode: '58 832 707*36' },
          { time: '超市', title: 'AEON Style 燕三條須頃', type: 'food', description: '2025/11新開幕。' },
          { time: '超市', title: 'Challenger 燕三條店', type: 'food', description: '當地超市。', mapCode: '58 863 291*74' },
          { time: '二手', title: '2nd Street', type: 'activity', description: 'Sanjo店 (3.2km) / Tsubamesanjo店 (3.3km)。', mapCode: '58 832 819*87' }
      ]
  },
  {
      date: '1/12',
      dayOfWeek: '週一',
      title: '藝術與滑雪',
      items: [
          { time: '上午', title: '清津峽', type: 'activity', description: '光之隧道 (Tunnel of Light)。日本三大峽谷之一。', locationLink: 'https://maps.app.goo.gl/KiyotsuGorge', guideId: 'kiyotsu' },
          { time: '12:00', title: '領取滑雪裝備', type: 'activity', description: '青達雪具。已預約12:00-14:00時段 (一大一小)。', highlight: true },
          { time: '15:00', title: '越後湯澤站', type: 'transport', description: '接駁巴士時刻表 (點擊查看詳細表格)。', guideId: 'angel_shuttle' },
          { time: 'Check-in', title: '天使格昂迪亞飯店', type: 'hotel', description: 'Hotel Angel Grandia Echigo Nakazato。親子滑雪度假村。含Buffet晚餐。', locationLink: 'https://maps.app.goo.gl/AngelGrandia' }
      ]
  },
  {
      date: '1/13',
      dayOfWeek: '週二',
      title: '滑雪日 Day 1',
      items: [
          { time: '09:00', title: '媽媽滑雪課', type: 'activity', description: '09:00 - 15:00。教練預約確認。' },
          { time: '全天', title: '玩雪 / 自主滑雪', type: 'activity', description: '兒童雪地樂園或初學者滑道。' },
          { time: '晚上', title: '飯店 Buffet & 溫泉', type: 'food', description: '滑雪後的放鬆時光。' }
      ]
  },
  {
      date: '1/14',
      dayOfWeek: '週三',
      title: '滑雪日 Day 2',
      items: [
          { time: '09:00', title: '媽媽滑雪課', type: 'activity', description: '09:00 - 15:00。' },
          { time: '下午', title: '樂哥加入', type: 'info', description: '樂哥預計今天加入滑雪行程。' },
          { time: '晚上', title: '飯店 Buffet', type: 'food', description: '' }
      ]
  },
  {
      date: '1/15',
      dayOfWeek: '週四',
      title: '滑雪與新幹線',
      items: [
          { time: '09:00', title: '自由滑雪時間', type: 'activity', description: '把握最後滑雪時光 (早上到下午)。' },
          { time: '15:57', title: '上越新幹線 (Toki 329)', type: 'transport', description: '越後湯澤站出發 -> 16:42 抵達新潟站。票價 ¥5,280/人。 (45分鐘)', highlight: true },
          { time: 'Check-in', title: '新潟第一飯店', type: 'hotel', description: '新潟市區商務飯店 (3540/晚)。不含早餐。', guideId: 'niigata_daiichi' },
          { time: '晚上', title: '新潟站前', type: 'food', description: '車站周邊晚餐。' }
      ]
  },
  {
      date: '1/16',
      dayOfWeek: '週五',
      title: '購物與回程',
      items: [
          { time: '上午', title: '市區購物採買', type: 'activity', description: '新潟市區各大 Shopping Mall 採購 (Aeon / Bandai City 等)。' },
          { time: '17:00', title: '前往新潟機場', type: 'transport', description: '從新潟站前往機場 (巴士/計程車)。' },
          { time: '19:00', title: '新潟機場出發 (IT229)', type: 'transport', description: 'KIJ 19:00 ✈️ TPE 22:30。', highlight: true },
          { time: '22:30', title: '抵達台灣', type: 'info', description: '平安返家。' }
      ]
  }
];

export const PRE_TRIP_CHECKLIST: TodoItem[] = [
  { id: '1', text: '護照 (有效期6個月以上)', completed: false },
  { id: '2', text: '信用卡 & 現金 (日幣/台幣)', completed: false },
  { id: '3', text: '日文譯本駕照', completed: false },
  { id: '4', text: '台灣駕照正本', completed: false },
  { id: '5', text: '飯店訂房憑證 (PDF/列印)', completed: false },
  { id: '6', text: 'SIM卡 / 漫遊設定', completed: false },
  { id: '7', text: '行動電源 & 充電線', completed: false },
  { id: '8', text: '滑雪裝備尺寸確認', completed: false },
  { id: '9', text: '個人藥品 / 酒精 / 口罩', completed: false },
  { id: '10', text: '行李秤', completed: false },
  { id: '11', text: '原子筆 (填入境卡用)', completed: false },
  { id: '12', text: '衛生紙 / 濕紙巾', completed: false },
  { id: '13', text: '飯店預約確認信 (天使格昂迪亞)', completed: false },
];
