import React, { useState, useMemo } from 'react';
import { Volume2, ChevronRight, ChevronLeft, RefreshCcw, CheckCircle2, XCircle, BookOpen, MessageCircle, FileText, ListChecks, Edit3, GraduationCap } from 'lucide-react';

// --- DATA DEFINITIONS ---

const vocabData = [
  { ch: "菜单", py: "càidān", uz: "Menyu", ru: "Меню", en: "Menu" },
  { ch: "又", py: "yòu", uz: "Yana / Ham", ru: "И / Снова", en: "And / Again" },
  { ch: "饿", py: "è", uz: "Och", ru: "Голодный", en: "Hungry" },
  { ch: "渴", py: "kě", uz: "Chanqagan", ru: "Жаждущий", en: "Thirsty" },
  { ch: "客气", py: "kèqi", uz: "Xushmuomala", ru: "Вежливый", en: "Polite" },
  { ch: "饮料", py: "yǐnliào", uz: "Ichimlik", ru: "Напиток", en: "Drink / Beverage" },
  { ch: "好久", py: "hǎojiǔ", uz: "Uzoq vaqt", ru: "Долгое время", en: "For a long time" },
  { ch: "服务", py: "fúwù", uz: "Xizmat", ru: "Служба / Обслуживать", en: "Service / Serve" },
  { ch: "员", py: "yuán", uz: "Xodim / A'zo", ru: "Сотрудник / Член", en: "Person / Employee" },
  { ch: "双", py: "shuāng", uz: "Juft", ru: "Пара", en: "Pair (measure word)" },
  { ch: "筷子", py: "kuàizi", uz: "Tayoqchalar", ru: "Палочки для еды", en: "Chopsticks" },
  { ch: "勺子", py: "sháozi", uz: "Qoshiq", ru: "Ложка", en: "Spoon" },
  { ch: "碗", py: "wǎn", uz: "Kosa", ru: "Миска", en: "Bowl" },
  { ch: "马上", py: "mǎshàng", uz: "Darhol", ru: "Немедленно", en: "Immediately" },
  { ch: "热情", py: "rèqíng", uz: "Samimiy / Issiq", ru: "Теплый / Энтузиазм", en: "Warm / Enthusiastic" },
  { ch: "尝", py: "cháng", uz: "Tatib ko'rmoq", ru: "Пробовать", en: "Taste" },
  { ch: "记", py: "jì", uz: "Eslab qolmoq", ru: "Помнить / Записывать", en: "Remember" },
  { ch: "用", py: "yòng", uz: "Foydalanmoq / Yemoq", ru: "Использовать / Есть", en: "Use / Eat / Drink" },
  { ch: "鸡", py: "jī", uz: "Tovuq", ru: "Курица", en: "Chicken" },
  { ch: "选", py: "xuǎn", uz: "Tanlamoq", ru: "Выбирать", en: "Choose" },
  { ch: "张", py: "zhāng", uz: "Dona (qog'oz va tekis narsalar uchun)", ru: "Счетное слово для плоских предметов", en: "Measure word for flat objects" },
  { ch: "外卖", py: "wàimài", uz: "Yetkazib berish (ovqat)", ru: "Еда на вынос", en: "Takeout" },
  { ch: "不用", py: "búyòng", uz: "Kerak emas", ru: "Не нужно", en: "Need not" },
  { ch: "方便", py: "fāngbiàn", uz: "Qulay", ru: "Удобный", en: "Convenient" },
  { ch: "蛋糕", py: "dàngāo", uz: "Tort", ru: "Торт", en: "Cake" },
  { ch: "只", py: "zhǐ", uz: "Faqat", ru: "Только", en: "Only" },
  { ch: "方便面", py: "fāngbiànmiàn", uz: "Tez tayyorlanadigan ugra", ru: "Лапша быстрого приготовления", en: "Instant noodles" },
  { ch: "简单", py: "jiǎndān", uz: "Oddiy", ru: "Простой", en: "Simple" }
];

const dialoguesData = [
  {
    title: "1-matn: Restoranda",
    lines: [
      { speaker: "王一雪", ch: "家月、李文，你们看看菜单，想吃点儿什么？", py: "Jiāyuè, Lǐ Wén, nǐmen kànkan càidān, xiǎng chī diǎnr shénme?", uz: "Jiayue, Li Wen, menyuni ko'rib chiqing, nima yeyishni xohlaysiz?", ru: "Цзяюэ, Ли Вэнь, посмотрите меню, что бы вы хотели съесть?", en: "Jiayue, Li Wen, take a look at the menu, what would you like to eat?" },
      { speaker: "李文", ch: "谢谢一雪姐，我都可以，你们点吧。", py: "Xièxie Yīxuě jiě, wǒ dōu kěyǐ, nǐmen diǎn ba.", uz: "Rahmat Yixue opa, menga farqi yo'q, o'zingiz buyurtma beravering.", ru: "Спасибо, сестра Исюэ, мне все равно, заказывайте вы.", en: "Thanks Sister Yixue, I'm fine with anything, you guys order." },
      { speaker: "白家月", ch: "飞了这么远，现在还真是又饿又渴。", py: "Fēile zhème yuǎn, xiànzài hái zhēnshi yòu è yòu kě.", uz: "Shuncha uzoq uchib kelib, hozir haqiqatan ham ham och, ham chanqaganman.", ru: "Пролетев так далеко, сейчас я действительно и голоден, и хочу пить.", en: "Having flown so far, I'm really both hungry and thirsty now." },
      { speaker: "王一雪", ch: "那多点点儿，别客气。你们喝什么饮料？", py: "Nà duō diǎn diǎnr, bié kèqi. Nǐmen hē shénme yǐnliào?", uz: "Unda ko'proq buyurtma qiling, tortinmang. Qanday ichimlik ichasizlar?", ru: "Тогда заказывайте побольше, не стесняйтесь. Какие напитки будете пить?", en: "Then order a bit more, don't be polite. What drinks do you want?" },
      { speaker: "白家月", ch: "好久没喝中国茶，也好久没吃饺子了。我想喝绿茶、吃饺子，可以吗？", py: "Hǎojiǔ méi hē Zhōngguó chá, yě hǎojiǔ méi chī jiǎozi le. Wǒ xiǎng hē lǜchá, chī jiǎozi, kěyǐ ma?", uz: "Ancha vaqtdan beri Xitoy choyini ichmadim, chuchvara ham yeganim yo'q. Yashil choy ichib, chuchvara yemoqchiman, mumkunmi?", ru: "Давно не пил китайский чай и давно не ел пельмени. Я хочу выпить зеленый чай и поесть пельмени, можно?", en: "Haven't had Chinese tea in a long time, nor dumplings. I want green tea and dumplings, is that okay?" },
      { speaker: "王一雪", ch: "没问题。你们看看还想吃什么。", py: "Méi wèntí. Nǐmen kànkan hái xiǎng chī shénme.", uz: "Muammo yo'q. Yana nima yeyishni xohlashingizni ko'ring.", ru: "Без проблем. Посмотрите, что еще вы хотите съесть.", en: "No problem. See what else you want to eat." }
    ]
  },
  {
    title: "2-matn: Ovqatlanish paytida",
    lines: [
      { speaker: "王一雪", ch: "服务员，再给我们拿一双筷子、一个勺子和一个碗。", py: "Fúwùyuán, zài gěi wǒmen ná yì shuāng kuàizi, yí ge sháozi hé yí ge wǎn.", uz: "Ofitsiant, bizga yana bir juft tayoqcha, bitta qoshiq va bitta kosa keltiring.", ru: "Официант, принесите нам еще пару палочек, ложку и миску.", en: "Waiter, please bring us another pair of chopsticks, a spoon, and a bowl." },
      { speaker: "服务员", ch: "好的，请等一下，我马上去拿。", py: "Hǎo de, qǐng děng yíxià, wǒ mǎshàng qù ná.", uz: "Xo'p, bir oz kuting, men darhol olib kelaman.", ru: "Хорошо, подождите минутку, я сейчас принесу.", en: "Okay, please wait a moment, I'll go get them right away." },
      { speaker: "王一雪", ch: "这家饭馆的服务很热情，菜也都做得很好吃。你们尝尝，看喜不喜欢这些菜。", py: "Zhè jiā fànguǎn de fúwù hěn rèqíng, cài yě dōu zuò de hěn hǎochī. Nǐmen chángchang, kàn xǐ bu xǐhuan zhèxiē cài.", uz: "Bu restoranning xizmati juda yaxshi, ovqatlari ham juda mazali. Tatib ko'ring, bu ovqatlar sizga yoqadimi yo'qmi.", ru: "В этом ресторане очень радушное обслуживание, и готовят здесь вкусно. Попробуйте, посмотрите, понравятся ли вам эти блюда.", en: "The service at this restaurant is very warm, and the food is delicious. Taste them and see if you like these dishes." },
      { speaker: "白家月", ch: "哪个菜都好吃。您点的这些菜真不错。", py: "Nǎ ge cài dōu hǎochī. Nín diǎn de zhèxiē cài zhēn búcuò.", uz: "Hamma ovqat mazali. Siz buyurtma qilgan bu ovqatlar haqiqatan ham yaxshi.", ru: "Все блюда вкусные. Эти блюда, которые вы заказали, действительно хороши.", en: "Every dish is delicious. These dishes you ordered are really nice." },
      { speaker: "王一雪", ch: "这里的饭菜又便宜又好吃，我们经常来，服务员都记住我们爱吃的菜了。", py: "Zhèlǐ de fàncài yòu piányi yòu hǎochī, wǒmen jīngcháng lái, fúwùyuán dōu jìzhu wǒmen ài chī de cài le.", uz: "Yerdagi ovqatlar ham arzon, ham mazali, biz tez-tez kelib turamiz, ofitsiantlar biz yaxshi ko'radigan ovqatlarni ham eslab qolishgan.", ru: "Еда здесь и дешевая, и вкусная, мы часто приходим, официанты уже запомнили наши любимые блюда.", en: "The food here is both cheap and delicious. We come often, the waiters remember what we like." },
      { speaker: "服务员", ch: "王姐，您经常来吃饭，今天送您一些水果，请慢用。", py: "Wáng jiě, nín jīngcháng lái chīfàn, jīntiān sòng nín yìxiē shuǐguǒ, qǐng màn yòng.", uz: "Wang opa, siz tez-tez ovqatlanishga kelasiz, bugun sizga ozgina meva sovg'a qilamiz, yoqimli ishtaha.", ru: "Сестра Ван, вы часто приходите поесть, сегодня мы дарим вам немного фруктов, приятного аппетита.", en: "Sister Wang, you come to eat often, giving you some fruit today, enjoy your meal." }
    ]
  },
  {
    title: "3-matn: Yetkazib berish (Waimai)",
    lines: [
      { speaker: "白家月", ch: "这个鸡肉饭太好吃了，我要再来吃一次。", py: "Zhège jīròu fàn tài hǎochī le, wǒ yào zài lái chī yícì.", uz: "Bu tovuqli guruch juda mazali ekan, men yana bir marta kelib yeyman.", ru: "Этот рис с курицей такой вкусный, я приду сюда поесть еще раз.", en: "This chicken rice is so delicious, I want to come eat it again." },
      { speaker: "李文", ch: "你可以拿走这张菜单，看看下次还吃点儿什么。", py: "Nǐ kěyǐ názǒu zhè zhāng càidān, kànkan xià cì hái chī diǎnr shénme.", uz: "Ushbu menyuni olib ketishingiz mumkin, keyingi safar yana nima yeyishingizni ko'rasiz.", ru: "Ты можешь забрать это меню и посмотреть, что еще съесть в следующий раз.", en: "You can take this menu and see what else you want next time." },
      { speaker: "王一雪", ch: "不用拿菜单，在手机上就能看到，也可以选好了让他们给你送。", py: "Búyòng ná càidān, zài shǒujī shang jiù néng kàndào, yě kěyǐ xuǎn hǎo le ràng tāmen gěi nǐ sòng.", uz: "Menyuni olish kerak emas, telefonda ko'rish mumkin, shuningdek tanlab, ularga yetkazib berishlarini aytishingiz mumkin.", ru: "Не нужно брать меню, его можно посмотреть в телефоне, а также можно выбрать и попросить их доставить.", en: "No need to take the menu, you can see it on the phone, and you can also choose and have them deliver." },
      { speaker: "白家月", ch: "他们家还能送外卖？", py: "Tāmen jiā hái néng sòng wàimài?", uz: "Ular uyga yetkazib berish xizmatiga ham egami?", ru: "Они еще и доставляют еду на дом?", en: "They also do takeout delivery?" },
      { speaker: "王一雪", ch: "对，现在很多饭馆都能送外卖，想吃什么就点什么。", py: "Duì, xiànzài hěn duō fànguǎn dōu néng sòng wàimài, xiǎng chī shénme jiù diǎn shénme.", uz: "Ha, hozir ko'plab restoranlar yetkazib berishlari mumkin, nima yeyishni xohlasangiz o'shani buyurtma qilasiz.", ru: "Да, сейчас многие рестораны могут доставлять еду, заказывай, что хочешь.", en: "Yes, many restaurants deliver now, order whatever you want to eat." },
      { speaker: "白家月", ch: "那真是太方便了！", py: "Nà zhēnshi tài fāngbiàn le!", uz: "Bu haqiqatan ham juda qulay!", ru: "Это действительно очень удобно!", en: "That is really so convenient!" }
    ]
  },
  {
    title: "4-matn: Li Wen'ning kundaligi",
    lines: [
      { speaker: "李文", ch: "这些年在国外，我很少自己做饭。", py: "Zhèxiē nián zài guówài, wǒ hěn shǎo zìjǐ zuòfàn.", uz: "Shu yillarda chet elda men juda kamdan-kam o'zim ovqat pishirardim.", ru: "Все эти годы за границей я редко готовил сам.", en: "These years abroad, I rarely cooked for myself." },
      { speaker: "李文", ch: "早饭我吃一个面包，有时候吃一块蛋糕，再喝一杯咖啡。午饭和晚饭也都在外面吃。", py: "Zǎofàn wǒ chī yí ge miànbāo, yǒu shíhou chī yí kuài dàngāo, zài hē yì bēi kāfēi. Wǔfàn hé wǎnfàn yě dōu zài wàimiàn chī.", uz: "Nonushtaga men bitta non, ba'zan bir bo'lak tort yeyman, keyin bir chashka qahva ichaman. Tushlik va kechki ovqatni ham tashqarida yeyman.", ru: "На завтрак я ем хлеб, иногда кусок торта, потом пью чашку кофе. Обедаю и ужинаю тоже на улице.", en: "For breakfast I eat a piece of bread, sometimes a piece of cake, then drink a cup of coffee. Lunch and dinner are also eaten out." },
      { speaker: "李文", ch: "快要考试的时候又忙又累，没时间出去吃饭，家里又什么吃的都没有，我可能好几天只吃方便面。", py: "Kuàiyào kǎoshì de shíhou yòu máng yòu lèi, méi shíjiān chūqu chīfàn, jiālǐ yòu shénme chī de dōu méiyǒu, wǒ kěnéng hǎo jǐ tiān zhǐ chī fāngbiànmiàn.", uz: "Imtihon yaqinlashganda men ham band, ham charchagan bo'laman, tashqariga ovqatlanishga chiqishga vaqt bo'lmaydi, uyda ham yeydigan hech narsa bo'lmaydi, men bir necha kun faqat tez tayyorlanadigan ugra yeyishim mumkin.", ru: "Перед экзаменами я так занят и устал, что нет времени пойти поесть, а дома нет никакой еды. Я могу несколько дней есть только лапшу быстрого приготовления.", en: "When exams are coming up I'm both busy and tired, no time to go out to eat, and there is nothing to eat at home, I might just eat instant noodles for several days." },
      { speaker: "李文", ch: "现在回到中国了，每天能吃到妈妈做的饭，我真是太高兴了！", py: "Xiànzài huídào Zhōngguó le, měitiān néng chīdào māma zuò de fàn, wǒ zhēnshi tài gāoxìng le!", uz: "Endi Xitoyga qaytib keldim, har kuni onam pishirgan ovqatni yeyishim mumkin, men haqiqatan ham juda xursandman!", ru: "Теперь, когда я вернулся в Китай, я каждый день могу есть мамину еду. Я так счастлив!", en: "Now back in China, being able to eat mom's cooking every day, I am really so happy!" },
      { speaker: "李文", ch: "有时候妈妈只做几个简单的菜，我也非常爱吃，因为什么都没有妈妈做的饭好吃。", py: "Yǒushíhou māma zhǐ zuò jǐ ge jiǎndān de cài, wǒ yě fēicháng ài chī, yīnwèi shénme dōu méiyǒu māma zuò de fàn hǎochī.", uz: "Ba'zida onam faqat bir nechta oddiy ovqatlar pishiradi, men ularni ham juda yaxshi ko'raman, chunki hech narsa onam pishirgan ovqatdan mazaliroq emas.", ru: "Иногда мама готовит только несколько простых блюд, но я тоже очень люблю их есть, потому что ничто не сравнится с маминой едой.", en: "Sometimes mom only makes a few simple dishes, I also love eating them, because nothing is as delicious as mom's cooking." }
    ]
  }
];

const grammarData = [
  {
    title: "1. 又...又... (Coordinate Complex Sentence)",
    uz: "Asosiy tuzilishi: 又 + Sifat1 + 又 + Sifat2. Bir shaxs yoki narsaning bir vaqtning o'zida ikkita xususiyatga ega ekanligini bildiradi.",
    ru: "Базовая структура: 又 + Прилагательное1 + 又 + Прилагательное2. Указывает, что человек или вещь одновременно обладают двумя характеристиками.",
    en: "Basic structure: 又 + Adjective1 + 又 + Adjective2. Indicates that a person or thing possesses two characteristics at the same time.",
    examples: [
      { ch: "我现在还真是又饿又渴。", py: "Wǒ xiànzài hái zhēnshi yòu è yòu kě.", uz: "Men hozir haqiqatan ham ham och, ham chanqaganman." },
      { ch: "那个女孩儿又高又漂亮。", py: "Nà ge nǚháir yòu gāo yòu piàoliang.", uz: "U qiz ham baland, ham chiroyli." },
      { ch: "这个饭馆的菜又便宜又好吃。", py: "Zhè ge fànguǎn de cài yòu piányi yòu hǎochī.", uz: "Bu restoranning ovqatlari ham arzon, ham mazali." }
    ]
  },
  {
    title: "2. 疑问代词的非疑问用法 (So'roq olmoshlarining so'roq bo'lmagan holda ishlatilishi 2)",
    uz: "“哪”, “哪儿”, “什么”, “谁”, “怎么” kabi so'roq olmoshlari umumiy ishorani ifodalash uchun ishlatilishi mumkin. Bunday gaplarda ko'pincha “都” (hamma/har) ravishi qo'llaniladi.",
    ru: "Вопросительные местоимения, такие как «哪», «哪儿», «什么», «谁» и «怎么», могут использоваться для выражения общего указания. В таких предложениях часто используется наречие «都».",
    en: "Interrogative pronouns can be used for general reference. The adverb “都” is often used with them.",
    examples: [
      { ch: "哪个菜都好吃。", py: "Nǎ ge cài dōu hǎochī.", uz: "Qaysi ovqat bo'lsa ham mazali (Hamma ovqat mazali)." },
      { ch: "这次旅游，我去哪儿都可以。", py: "Zhè cì lǚyóu, wǒ qù nǎr dōu kěyǐ.", uz: "Bu sayohatda qayerga borsam ham mayli (menga farqi yo'q)." },
      { ch: "我下午有时间，你想什么时候来都没问题。", py: "Wǒ xiàwǔ yǒu shíjiān, nǐ xiǎng shénme shíhou lái dōu méi wèntí.", uz: "Tushdan keyin vaqtim bor, qachon kelishni xohlasangiz ham muammo yo'q." }
    ]
  },
  {
    title: "3. 疑问代词的非疑问用法 (So'roq olmoshlarining so'roq bo'lmagan holda ishlatilishi 3)",
    uz: "Ikkita bir xil so'roq olmoshi umumiy ishorani ifodalashi mumkin. Ular bir xil shaxs, narsa, usul, vaqt yoki joyni bildiradi. (Nima... o'sha... / Qayerga... o'sha yerga...)",
    ru: "Два одинаковых вопросительных местоимения могут использоваться для общего указания. Они относятся к одному и тому же человеку, вещи, способу, времени или месту.",
    en: "Two identical interrogative pronouns can refer to the same person, thing, manner, time, or place.",
    examples: [
      { ch: "你们想吃什么就点什么。", py: "Nǐmen xiǎng chī shénme jiù diǎn shénme.", uz: "Nima yeyishni xohlasangiz o'shani buyurtma qiling." },
      { ch: "你觉得哪个好看就买哪个。", py: "Nǐ juéde nǎ ge hǎokàn jiù mǎi nǎ ge.", uz: "Sizga qaysi biri chiroyli ko'rinsa, o'shani sotib oling." },
      { ch: "你想去哪儿，我们就去哪儿。", py: "Nǐ xiǎng qù nǎr, wǒmen jiù qù nǎr.", uz: "Siz qayerga borishni xohlasangiz, biz o'sha yerga boramiz." }
    ]
  }
];

const generateVocabQuiz = () => {
  return vocabData.map((v) => {
    let options = [v.uz];
    while(options.length < 4) {
      const rand = vocabData[Math.floor(Math.random() * vocabData.length)].uz;
      if(!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);
    return { q: v.ch, options: options, answer: v.uz };
  }).sort(() => Math.random() - 0.5);
};

const grammarQuizData = [
  { q: "这个饭馆的菜____便宜____好吃。", options: ["又...又...", "一边...一边...", "越...越...", "虽然...但是..."], answer: "又...又..." },
  { q: "那件衣服____贵____不漂亮，我不想买。", options: ["又...又...", "也...也...", "或者...或者...", "是...不是..."], answer: "又...又..." },
  { q: "我____都不想吃，我一点儿也不饿。", options: ["什么", "怎么", "哪儿", "谁"], answer: "什么" },
  { q: "____想去就让____去吧。", options: ["谁...谁...", "什么...什么...", "哪儿...哪儿...", "怎么...怎么..."], answer: "谁...谁..." },
  { q: "明天周末，去____都可以。", options: ["哪儿", "什么", "谁", "几"], answer: "哪儿" },
  { q: "你怎么做，我____怎么做。", options: ["就", "都", "也", "还"], answer: "就" },
  { q: "他____人都认识，朋友特别多。", options: ["什么", "怎么", "哪", "几"], answer: "什么" },
  { q: "你想买哪个____买哪个。", options: ["就", "都", "也", "再"], answer: "就" },
  { q: "这本书我____看完了。", options: ["马上", "好久", "不用", "才"], answer: "马上" }, 
  { q: "这儿____人都没有，太安静了。", options: ["什么", "哪", "怎么", "谁"], answer: "什么" },
  { q: "我不挑食，____菜都爱吃。", options: ["什么", "哪儿", "谁", "几"], answer: "什么" },
  { q: "外面下雨了，我们____去就____去吧。", options: ["怎么...怎么...", "哪儿...哪儿...", "谁...谁...", "什么...什么..."], answer: "怎么...怎么..." },
  { q: "这只小狗____聪明____可爱。", options: ["又...又...", "也...也...", "既...就...", "越...越..."], answer: "又...又..." },
  { q: "大家看看，想吃____？", options: ["什么", "怎么", "哪儿", "谁"], answer: "什么" },
  { q: "你想什么时候来____什么时候来。", options: ["就", "才", "都", "也"], answer: "就" }
];

const fillBlanksData = [
  { q: "我觉得____筷子吃饭更方便。", options: ["用", "不用", "选", "尝"], answer: "用" },
  { q: "你____住那个饭馆的名字了吗？", options: ["记", "忘", "选", "喝"], answer: "记" },
  { q: "她现在很饿，早上____吃了一块蛋糕。", options: ["只", "又", "也", "就"], answer: "只" },
  { q: "____上有好几个新菜，你看看我们吃哪个？", options: ["菜单", "饭馆", "外面", "手机"], answer: "菜单" },
  { q: "我妈妈会做中国菜，下次你们来我家____一下她做的菜。", options: ["尝", "吃", "买", "做"], answer: "尝" },
  { q: "我还不太会用筷子，你们有____吗？", options: ["勺子", "碗", "盘子", "杯子"], answer: "勺子" },
  { q: "在手机上就可以点菜，____要菜单。", options: ["不用", "马上", "只", "又"], answer: "不用" },
  { q: "我太____了，不想做饭了，我们叫个外卖怎么样？", options: ["饿", "渴", "方便", "简单"], answer: "饿" },
  { q: "我____没吃饺子了，去楼下的饺子馆吧。", options: ["好久", "马上", "又", "不用"], answer: "好久" },
  { q: "方便面是最____的晚饭。", options: ["简单", "热情", "客气", "方便"], answer: "简单" },
  { q: "服务员，再给我们拿一____筷子。", options: ["双", "个", "只", "张"], answer: "双" },
  { q: "喝什么____？我喝绿茶。", options: ["饮料", "水", "酒", "咖啡"], answer: "饮料" },
  { q: "他很____，每次都帮我们拿东西。", options: ["热情", "客气", "方便", "简单"], answer: "热情" },
  { q: "请等一下，我____去拿。", options: ["马上", "不用", "只", "就"], answer: "马上" },
  { q: "这家店还能送____，真是太方便了。", options: ["外卖", "菜单", "蛋糕", "饮料"], answer: "外卖" },
  { q: "这张桌子上有几个____？", options: ["碗", "张", "双", "只"], answer: "碗" },
  { q: "你要____什么？鸡肉还是鱼肉？", options: ["选", "记", "用", "尝"], answer: "选" }
];

// --- SUB COMPONENTS ---

function Flashcards({ speak }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % vocabData.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + vocabData.length) % vocabData.length);
    }, 150);
  };

  const currentVocab = vocabData[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-slate-400 mb-6 text-sm bg-white/5 px-4 py-1 rounded-full border border-white/10">
        {currentIndex + 1} / {vocabData.length}
      </div>
      
      <div 
        className="relative w-full max-w-sm h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6">
            <h2 className="text-8xl font-bold text-white mb-4">{currentVocab.ch}</h2>
            <button 
              onClick={(e) => { e.stopPropagation(); speak(currentVocab.ch); }}
              className="p-3 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-full transition-colors mt-4"
            >
              <Volume2 size={24} />
            </button>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-800/80 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 text-center">
             <h3 className="text-3xl font-medium text-emerald-400 mb-6">{currentVocab.py}</h3>
             
             <div className="space-y-4 w-full">
               <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                 <span className="text-xs text-slate-400 uppercase block mb-1">O'zbekcha</span>
                 <span className="text-lg text-white">{currentVocab.uz}</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                   <span className="text-xs text-slate-400 uppercase block mb-1">Русский</span>
                   <span className="text-sm text-white">{currentVocab.ru}</span>
                 </div>
                 <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                   <span className="text-xs text-slate-400 uppercase block mb-1">English</span>
                   <span className="text-sm text-white">{currentVocab.en}</span>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>

      <div className="flex gap-6 mt-10">
        <button onClick={prevCard} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextCard} className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function Dialogues({ speak }) {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {dialoguesData.map((dialogue, idx) => (
        <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
          <div className="bg-white/10 px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-blue-300">{dialogue.title}</h2>
          </div>
          <div className="p-6 space-y-6">
            {dialogue.lines.map((line, lIdx) => (
              <div key={lIdx} className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 border border-white/20 text-white font-bold shadow-lg">
                  {line.speaker[0]}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                       <p className="text-sm text-slate-400 mb-1">{line.speaker}</p>
                       <p className="text-lg font-medium text-white">{line.ch}</p>
                       <p className="text-blue-300 font-medium">{line.py}</p>
                    </div>
                    <button 
                      onClick={() => speak(line.ch)}
                      className="p-2 bg-white/5 hover:bg-white/20 text-slate-300 rounded-full transition-colors shrink-0"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/5 text-sm">
                     <p className="text-emerald-300"><span className="text-slate-500 mr-1 text-xs">UZ:</span>{line.uz}</p>
                     <p className="text-amber-200/80"><span className="text-slate-500 mr-1 text-xs">RU:</span>{line.ru}</p>
                     <p className="text-slate-300"><span className="text-slate-500 mr-1 text-xs">EN:</span>{line.en}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Grammar() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {grammarData.map((item, idx) => (
        <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">{item.title}</h2>
          
          <div className="space-y-3 mb-6 bg-black/20 rounded-xl p-4 border border-white/5 text-sm">
            <p><strong className="text-slate-400">UZ:</strong> {item.uz}</p>
            <p><strong className="text-slate-400">RU:</strong> {item.ru}</p>
            <p><strong className="text-slate-400">EN:</strong> {item.en}</p>
          </div>

          <h3 className="text-lg font-medium text-blue-300 mb-3 border-b border-white/10 pb-2">Misollar (Examples):</h3>
          <ul className="space-y-4">
            {item.examples.map((ex, eIdx) => (
              <li key={eIdx} className="bg-white/5 rounded-lg p-4 border border-white/5 border-l-2 border-l-blue-500">
                <p className="text-lg text-white font-medium">{ex.ch}</p>
                <p className="text-blue-300 mt-1">{ex.py}</p>
                <p className="text-emerald-300/80 text-sm mt-1">{ex.uz}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function QuizSection({ questions, title }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (opt) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsAnswered(true);
    
    if (opt === questions[currentQIndex].answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentQIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOpt(null);
    setIsAnswered(false);
  };

  if (showResults) {
    return (
      <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl mt-10">
        <h2 className="text-3xl font-bold text-white mb-6">Test Yakunlandi!</h2>
        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mb-4">
          {score} / {questions.length}
        </div>
        <p className="text-slate-300 mb-8">
          {score === questions.length ? "Ajoyib natija!" : "Yaxshi harakat qildingiz!"}
        </p>
        <button 
          onClick={restart}
          className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold transition-colors"
        >
          <RefreshCcw size={20} /> Qaytadan boshlash
        </button>
      </div>
    );
  }

  const q = questions[currentQIndex];

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${((currentQIndex) / questions.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl text-slate-300 font-medium">{title}</h2>
          <span className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/10">
            {currentQIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {q.q}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {q.options.map((opt, idx) => {
            let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200";
            let Icon = null;
            
            if (isAnswered) {
              if (opt === q.answer) {
                btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                Icon = <CheckCircle2 size={20} className="text-emerald-400" />;
              } else if (opt === selectedOpt) {
                btnClass = "bg-red-500/20 border-red-500 text-red-300";
                Icon = <XCircle size={20} className="text-red-400" />;
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`p-4 rounded-xl border text-lg font-medium transition-all flex items-center justify-between ${btnClass}`}
              >
                {opt}
                {Icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');

  // 将题目生成缓存起来，防止重渲染导致测试题状态错乱
  const vocabQuizQuestions = useMemo(() => generateVocabQuiz(), []);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const navItems = [
    { id: 'flashcards', label: 'Fleshkartalar', icon: <BookOpen size={18} /> },
    { id: 'vocabTest', label: 'Lug\'at Testi', icon: <ListChecks size={18} /> },
    { id: 'dialogues', label: 'Muloqot', icon: <MessageCircle size={18} /> },
    { id: 'grammar', label: 'Grammatika', icon: <FileText size={18} /> },
    { id: 'grammarTest', label: 'Grammatika Testi', icon: <Edit3 size={18} /> },
    { id: 'fillBlanks', label: 'So\'zlarni To\'ldirish', icon: <GraduationCap size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100 font-sans pb-20">
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
      
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              你们想吃什么就点什么
            </h1>
            <p className="text-sm text-slate-400 mt-1">Dilfuza Kāng lǎo shī bilan xitoy tilini o'rganmiz</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-transparent'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'flashcards' && <Flashcards speak={speak} />}
        {activeTab === 'vocabTest' && <QuizSection questions={vocabQuizQuestions} title="Lug'at Testi" />}
        {activeTab === 'dialogues' && <Dialogues speak={speak} />}
        {activeTab === 'grammar' && <Grammar />}
        {activeTab === 'grammarTest' && <QuizSection questions={grammarQuizData} title="Grammatika Testi" />}
        {activeTab === 'fillBlanks' && <QuizSection questions={fillBlanksData} title="So'zlarni To'ldirish" />}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 text-center py-3 text-xs text-slate-400 z-50">
        <p>HSK 3 NEW3.0 - Lesson 2</p>
        <p>© 2026 Dilfuza Kāng lǎo shī (telegram@diffila)</p>
      </footer>
    </div>
  );
}