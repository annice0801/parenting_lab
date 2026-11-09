// 家長幫手區的內容：適齡卡通與電影、睡前聊天題目
// 集數用英文原名與季數標示（各平台的中文譯名不一樣）；播放前請家長先看過一次

export type AgeId = "3-4" | "4-5" | "5-6";

export const AGE_GROUPS: { id: AgeId; label: string; note: string }[] = [
  { id: "3-4", label: "3–4 歲", note: "語言快速發展、注意力短，適合一集 5–10 分鐘、節奏慢、畫面簡單的作品。" },
  { id: "4-5", label: "4–5 歲", note: "開始理解因果與別人的感受，可以看有一點小衝突、最後好好解決的故事。" },
  { id: "5-6", label: "5–6 歲", note: "能跟上較長的故事，可以挑戰 60–100 分鐘的電影，建議分兩次看。" },
];

// 選片原則
export const PRINCIPLES = [
  { icon: "⏱️", title: "每天不超過 1 小時", body: "WHO 與國民健康署都建議 2 到 5 歲每天看螢幕不超過 1 小時，越少越好。選一集一集的短篇，看完一集就關，比較好收尾。" },
  { icon: "🐢", title: "挑節奏慢的", body: "研究發現 4 歲孩子看 9 分鐘節奏快、畫面頻繁切換的卡通後，專注與自我控制的表現暫時變差。選畫面安靜、對話清楚的作品。" },
  { icon: "🤝", title: "一起看、一起聊", body: "美國兒科學會建議家長陪看。看的時候說說角色的心情，看完問一句「你覺得他為什麼這樣做？」，螢幕時間就變成親子時間。" },
  { icon: "🌱", title: "內容正向", body: "沒有暴力與恐怖情節，角色會犯錯、也會道歉和修補，衝突最後用溝通解決。" },
  { icon: "🌙", title: "睡前 1 小時不看", body: "螢幕的光與刺激會讓孩子比較難入睡。睡前改成共讀或聊天。" },
];

export type Episode = { title: string; season: string; why: string };

export type Show = {
  name: string;
  original: string;
  kind: "卡通" | "電影";
  length: string;
  why: string;
  episodes?: Episode[];
  topics?: string[];
  talk: string;
  caution?: string;
};

export const SHOWS: Record<AgeId, Show[]> = {
  "3-4": [
    {
      name: "粉紅豬小妹",
      original: "Peppa Pig",
      kind: "卡通",
      length: "每集約 5 分鐘",
      why: "一集講一件生活小事，畫面簡單、對話短，適合剛開始看卡通的孩子。",
      episodes: [
        { title: "Muddy Puddles", season: "S1", why: "下雨天跳泥巴坑，全家人一起玩。" },
        { title: "Mr Dinosaur Is Lost", season: "S1", why: "弟弟喬治弄丟最愛的玩具，學習找東西與安撫情緒。" },
      ],
      talk: "你也有最喜歡、不能弄丟的玩具嗎？",
    },
    {
      name: "小老虎丹尼爾",
      original: "Daniel Tiger's Neighborhood",
      kind: "卡通",
      length: "每段約 11 分鐘",
      why: "每一段都有一首「情緒策略歌」，把處理情緒的方法唱成一句好記的歌詞。",
      topics: ["生氣：深呼吸，數到四", "分離焦慮：大人一定會回來", "挑食：試試新食物，也許很好吃", "看醫生、有新的弟弟妹妹"],
      talk: "生氣的時候，我們可以一起深呼吸數到四嗎？",
    },
    {
      name: "數字積木",
      original: "Numberblocks",
      kind: "卡通",
      length: "每集約 5 分鐘",
      why: "數字變成會說話的積木角色，看得到「3 是 2 加 1」，是把數量具體化的好入門。",
      episodes: [
        { title: "One", season: "Series 1", why: "認識 1。" },
        { title: "Two", season: "Series 1", why: "1 和 1 合起來變成 2。" },
        { title: "Three", season: "Series 1", why: "3 可以拆成 2 和 1。" },
      ],
      talk: "你可以用積木排出 3 嗎？",
    },
    {
      name: "Hey Duggee",
      original: "Hey Duggee",
      kind: "卡通",
      length: "每集約 7 分鐘",
      why: "狗狗老師 Duggee 帶著一群小動物完成任務、拿到徽章，鼓勵嘗試與合作。",
      talk: "如果你今天可以得到一個徽章，會是什麼徽章？",
    },
  ],
  "4-5": [
    {
      name: "妙妙犬布麗",
      original: "Bluey",
      kind: "卡通",
      length: "每集約 7 分鐘",
      why: "爸媽陪孩子玩「假裝遊戲」的故事，示範怎麼一起想規則、處理衝突。3 歲也可以開始看。",
      episodes: [
        { title: "Keepy Uppy", season: "S1", why: "全家人想辦法讓氣球不落地，簡單的遊戲也能很好玩。" },
        { title: "Takeaway", season: "S1", why: "在店門口等外帶餐點，練習等待與忍耐。" },
        { title: "Grannies", season: "S1", why: "姐妹扮奶奶時意見不同，學習怎麼面對爭論。" },
        { title: "Bin Night", season: "S2", why: "爸爸和妹妹每週倒垃圾時的散步聊天；也談到手足相處。" },
        { title: "Sleepytime", season: "S2", why: "妹妹賓果一個人睡覺時的夢境冒險，適合正在練習自己睡的孩子。" },
      ],
      talk: "如果是你，你會想出什麼新遊戲？",
    },
    {
      name: "數字積木",
      original: "Numberblocks",
      kind: "卡通",
      length: "每集約 5 分鐘",
      why: "接著看 Series 2（6 到 10），開始看到數字可以拆開、組合。",
      talk: "6 可以拆成哪兩個數字？",
    },
    {
      name: "字母積木",
      original: "Alphablocks",
      kind: "卡通",
      length: "每集約 3–5 分鐘",
      why: "和數字積木同一個團隊製作，字母角色合在一起就會念出單字，用聲音認識英文字母。",
      talk: "我們來找找家裡有哪些東西是 B 開頭？",
    },
    {
      name: "Puffin Rock",
      original: "Puffin Rock",
      kind: "卡通",
      length: "每集約 7 分鐘",
      why: "小海鸚 Oona 和弟弟的海邊生活，旁白溫和、節奏很慢，也能認識大自然。",
      talk: "今天你在外面看到什麼動物？",
    },
    {
      name: "小熊維尼",
      original: "Winnie the Pooh（2011）",
      kind: "電影",
      length: "約 63 分鐘",
      why: "長度短、情節溫和，是第一次看電影的好選擇。",
      talk: "你覺得維尼是一個怎麼樣的朋友？",
    },
  ],
  "5-6": [
    {
      name: "妙妙犬布麗",
      original: "Bluey",
      kind: "卡通",
      length: "每集約 7 分鐘",
      why: "這個年紀能看懂更多情緒細節，有些集數家長看了也很有感觸。",
      episodes: [
        { title: "Bike", season: "S1", why: "學騎腳踏車一直跌倒，每個人都在學一件困難的事。" },
        { title: "Camping", season: "S1", why: "露營時和只會說法語的男孩成為朋友，最後要分開。" },
        { title: "Flat Pack", season: "S2", why: "爸媽組裝家具時，孩子用紙箱玩出一場想像旅程。" },
        { title: "Rain", season: "S3", why: "幾乎沒有對白，布麗專心在雨中擋水流，尊重孩子的探索。" },
        { title: "Baby Race", season: "S2", why: "媽媽回想布麗學走路的過程：每個孩子步調不同。很適合家長一起看。" },
      ],
      talk: "你最近在學哪一件很難的事？",
    },
    {
      name: "數字積木",
      original: "Numberblocks",
      kind: "卡通",
      length: "每集約 5 分鐘",
      why: "Series 3 認識 11 到 20，為上小學的數學做準備。",
      talk: "15 是 10 和多少？",
    },
    {
      name: "龍貓",
      original: "となりのトトロ（1988）",
      kind: "電影",
      length: "約 86 分鐘",
      why: "鄉間生活的節奏很慢，充滿對大自然的好奇。",
      caution: "妹妹走失的段落有點緊張，可以先告訴孩子「最後會找到」。",
      talk: "如果你遇到龍貓，想跟牠說什麼？",
    },
    {
      name: "笑笑羊大電影",
      original: "Shaun the Sheep Movie（2015）",
      kind: "電影",
      length: "約 85 分鐘",
      why: "幾乎沒有對白，靠表情與動作說故事，孩子可以練習說出自己看到了什麼。",
      talk: "剛剛那一幕，你覺得小羊在想什麼？",
    },
    {
      name: "崖上的波妞",
      original: "崖の上のポニョ（2008）",
      kind: "電影",
      length: "約 100 分鐘",
      why: "關於承諾與友誼的童話，畫面溫暖。",
      caution: "有暴風雨與大浪的場景，片長較長，建議分兩次看。",
      talk: "宗介說要保護波妞，你想保護誰？",
    },
    {
      name: "玩具總動員",
      original: "Toy Story（1995）",
      kind: "電影",
      length: "約 81 分鐘",
      why: "關於嫉妒、友誼與和好，很適合聊「新朋友來了，舊朋友的感受」。",
      caution: "鄰居小孩拆解改造玩具的片段可能嚇到比較敏感的孩子。",
      talk: "胡迪一開始為什麼不喜歡巴斯？",
    },
  ],
};

// 很受歡迎，但建議等大一點、或家長先看過再決定
export const WAIT_LIST = [
  { name: "海底總動員（Finding Nemo）", why: "開場就有媽媽被攻擊而失去的情節，對學齡前孩子可能太沉重。" },
  { name: "冰雪奇緣（Frozen）", why: "父母在海難中過世、雪怪追逐等場景較緊張。" },
  { name: "Bluey〈The Sign〉", why: "約 28 分鐘的特別篇，談到搬家與家庭變動，情緒比較重，適合家長先看。" },
  { name: "節奏很快的卡通", why: "畫面每幾秒就切換、角色一直大叫的作品（例如研究中使用的《海綿寶寶》），比較適合大一點再看。" },
];

// 睡前聊天
export type ChatCard = { q: string; why: string };

export const BEDTIME: Record<AgeId, { focus: string; tips: string[]; cards: ChatCard[] }> = {
  "3-4": {
    focus: "這個年紀還不太會回答開放式問題，用具體、可以二選一的問題，幫孩子把感受說出來。",
    tips: ["問具體的事：「今天點心吃什麼？」比「今天好不好？」容易回答", "給選項：「你比較喜歡溜滑梯還是盪鞦韆？」", "幫忙命名情緒：「你剛剛是不是有點難過？」"],
    cards: [
      { q: "今天最好玩的是什麼？", why: "回想開心的事，帶著好心情入睡。" },
      { q: "今天早上我們吃了什麼？", why: "練習回想與記憶。" },
      { q: "今天有沒有讓你生氣的事？那時候你的身體有什麼感覺？", why: "把情緒和身體感覺連在一起。" },
      { q: "你今天幫了誰？", why: "肯定孩子的善意。" },
      { q: "如果你變成一隻動物，要當小貓還是小狗？為什麼？", why: "用二選一的想像題練習表達。" },
      { q: "明天你想跟哪個玩具一起玩？", why: "讓孩子對明天有期待。" },
    ],
  },
  "4-5": {
    focus: "開始能描述事情的經過，也能想像「如果…會怎樣」。家長輪流分享，孩子會更願意說。",
    tips: ["玩「玫瑰與刺」：各說一件開心和一件不開心的事，家長先說", "不急著給答案或講道理，先說「原來是這樣」", "孩子說「不知道」也沒關係，換一題"],
    cards: [
      { q: "今天的「玫瑰」和「刺」是什麼？", why: "練習同時面對開心與不開心的事。" },
      { q: "今天跟誰玩？你們玩什麼遊戲？規則是誰定的？", why: "了解孩子的人際互動。" },
      { q: "如果今天可以重來一次，你想改變哪一件事？", why: "練習反思，而且不責備。" },
      { q: "如果你有一個魔法，想讓我們家多一樣什麼東西？", why: "發揮想像，也聽見孩子在意什麼。" },
      { q: "今天有沒有一件事讓你覺得很勇敢？", why: "肯定孩子嘗試新事物。" },
      { q: "你覺得今天老師開心嗎？為什麼？", why: "練習觀察別人的情緒。" },
    ],
  },
  "5-6": {
    focus: "準備上小學，能思考別人的感受與解決辦法。把孩子當成可以一起討論的夥伴。",
    tips: ["多問「你為什麼這樣想？」，聽完再分享你的想法", "一起想辦法，而不是直接給答案", "比較沉重的話題留到白天聊，睡前維持輕鬆"],
    cards: [
      { q: "今天有什麼事讓你覺得很驕傲？", why: "讓孩子自己肯定自己的努力。" },
      { q: "如果你是那個被搶玩具的小朋友，你會有什麼感覺？", why: "練習換位思考。" },
      { q: "下次遇到同樣的問題，可以有哪三種辦法？", why: "練習解決問題，而且不只一種答案。" },
      { q: "上小學，你最期待什麼？有沒有一點點擔心的事？", why: "提早聊聊轉換期的心情。" },
      { q: "今天想謝謝誰？為什麼？", why: "培養感恩的習慣。" },
      { q: "如果你可以發明一個東西，讓大家的生活更方便，會是什麼？", why: "創意與同理心一起練習。" },
    ],
  },
};

export const BEDTIME_GENERAL = [
  "每天固定時間，5 到 10 分鐘就好，變成睡前的小儀式",
  "關燈後、躺在旁邊聊，孩子通常更願意說",
  "家長也分享自己的一天，孩子會學到怎麼表達",
  "不在睡前批評或檢討，讓床是安心的地方",
];

export const REFERENCES = [
  "World Health Organization（2019）. Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age.",
  "American Academy of Pediatrics（2016）. Media and Young Minds. Pediatrics, 138(5).",
  "Lillard, A. S., & Peterson, J.（2011）. The immediate impact of different types of television on young children's executive function. Pediatrics, 128(4).",
  "衛生福利部國民健康署：2 歲以下避免看螢幕，2 歲以上每天不超過 1 小時。",
];
