export const clients = [
  { id:'CL-001', firstName:'Александр', lastName:'Иванов', company:'ООО «Ромашка»',
    email:'a.ivanov@romashka.ru', phone:'+7 (999) 123-45-67', status:'active', priority:'high',
    createdAt:'2024-03-15T10:30:00Z', manager:'Пётр Сидоров', tags:['VIP','B2B','опт'],
    deals:[{id:'D-101',amount:250000},{id:'D-102',amount:180000}],
    notes:'Постоянный клиент, требует персонального менеджера.' },

  { id:'CL-002', firstName:'Мария', lastName:'Петрова', company:'ИП Петрова',
    email:'m.petrova@mail.ru', phone:'+7 (999) 234-56-78', status:'lead', priority:'medium',
    createdAt:'2024-04-02T09:15:00Z', manager:'Анна Ким', tags:['новый','B2B'],
    deals:[{id:'D-103',amount:75000}], notes:'Заинтересована в оптовых поставках.' },

  { id:'CL-003', firstName:'Сергей', lastName:'Смирнов', company:'АО «Вектор»',
    email:'s.smirnov@vektor.ru', phone:'+7 (999) 345-67-89', status:'active', priority:'high',
    createdAt:'2024-01-20T14:45:00Z', manager:'Пётр Сидоров', tags:['VIP','опт'],
    deals:[{id:'D-104',amount:520000},{id:'D-105',amount:310000}], notes:'Ключевой клиент.' },

  { id:'CL-004', firstName:'Елена', lastName:'Кузнецова', company:'ООО «Заря»',
    email:'e.kuz@zarya.ru', phone:'+7 (999) 456-78-90', status:'inactive', priority:'low',
    createdAt:'2023-11-10T11:00:00Z', manager:'Анна Ким', tags:['B2B'],
    deals:[], notes:'Долго не выходит на связь.' },

  { id:'CL-005', firstName:'Дмитрий', lastName:'Орлов', company:'ООО «ТехноПлюс»',
    email:'d.orlov@technoplus.ru', phone:'+7 (999) 567-89-01', status:'active', priority:'medium',
    createdAt:'2024-02-28T16:20:00Z', manager:'Игорь Волков', tags:['B2B','опт'],
    deals:[{id:'D-106',amount:140000}], notes:'Долгосрочный контракт.' },

  { id:'CL-006', firstName:'Ольга', lastName:'Соколова', company:'ИП Соколова',
    email:'o.sokolova@bk.ru', phone:'+7 (999) 678-90-12', status:'lead', priority:'high',
    createdAt:'2024-05-01T08:30:00Z', manager:'Анна Ким', tags:['новый','VIP'],
    deals:[{id:'D-107',amount:95000}], notes:'Готовится к крупной сделке.' },

  { id:'CL-007', firstName:'Николай', lastName:'Лебедев', company:'ООО «СтройМир»',
    email:'n.lebedev@stroymir.ru', phone:'+7 (999) 789-01-23', status:'active', priority:'low',
    createdAt:'2023-09-14T12:10:00Z', manager:'Игорь Волков', tags:['опт'],
    deals:[{id:'D-108',amount:60000}], notes:'Стабильный, но небольшой клиент.' },

  { id:'CL-008', firstName:'Татьяна', lastName:'Новикова', company:'ООО «Свет»',
    email:'t.novikova@svet.ru', phone:'+7 (999) 890-12-34', status:'blocked', priority:'low',
    createdAt:'2023-06-05T10:00:00Z', manager:'Пётр Сидоров', tags:['B2B'],
    deals:[], notes:'Заблокирован за неоплату.' },

  { id:'CL-009', firstName:'Андрей', lastName:'Морозов', company:'АО «Прогресс»',
    email:'a.morozov@progress.ru', phone:'+7 (999) 901-23-45', status:'active', priority:'high',
    createdAt:'2024-03-22T13:40:00Z', manager:'Анна Ким', tags:['VIP','B2B','опт'],
    deals:[{id:'D-109',amount:410000},{id:'D-110',amount:220000}], notes:'Топ-5 клиентов.' },

  { id:'CL-010', firstName:'Ирина', lastName:'Волкова', company:'ИП Волкова',
    email:'i.volkova@mail.ru', phone:'+7 (999) 012-34-56', status:'lead', priority:'medium',
    createdAt:'2024-04-18T15:25:00Z', manager:'Игорь Волков', tags:['новый'],
    deals:[], notes:'Только что оставила заявку.' },

  { id:'CL-011', firstName:'Виктор', lastName:'Зайцев', company:'ООО «Альфа»',
    email:'v.zaytsev@alfa.ru', phone:'+7 (999) 123-45-00', status:'active', priority:'medium',
    createdAt:'2024-01-08T09:00:00Z', manager:'Пётр Сидоров', tags:['B2B'],
    deals:[{id:'D-111',amount:130000}], notes:'Регулярные закупки.' },

  { id:'CL-012', firstName:'Светлана', lastName:'Павлова', company:'ООО «Бета»',
    email:'s.pavlova@beta.ru', phone:'+7 (999) 234-56-00', status:'inactive', priority:'low',
    createdAt:'2023-08-30T14:00:00Z', manager:'Анна Ким', tags:[],
    deals:[], notes:'Перешла к конкуренту.' },

  { id:'CL-013', firstName:'Максим', lastName:'Фёдоров', company:'АО «Гамма»',
    email:'m.fedorov@gamma.ru', phone:'+7 (999) 345-67-00', status:'active', priority:'high',
    createdAt:'2024-02-14T11:30:00Z', manager:'Игорь Волков', tags:['VIP','опт'],
    deals:[{id:'D-112',amount:680000}], notes:'Крупнейшая сделка квартала.' },

  { id:'CL-014', firstName:'Юлия', lastName:'Михайлова', company:'ИП Михайлова',
    email:'u.mihailova@bk.ru', phone:'+7 (999) 456-78-00', status:'lead', priority:'medium',
    createdAt:'2024-05-10T10:15:00Z', manager:'Пётр Сидоров', tags:['новый','B2B'],
    deals:[], notes:'Запросила коммерческое предложение.' },

  { id:'CL-015', firstName:'Артём', lastName:'Белов', company:'ООО «Дельта»',
    email:'a.belov@delta.ru', phone:'+7 (999) 567-89-00', status:'active', priority:'low',
    createdAt:'2023-12-01T16:45:00Z', manager:'Анна Ким', tags:['B2B'],
    deals:[{id:'D-113',amount:45000}], notes:'Небольшие, но стабильные заказы.' }
];

export const deals = [
  { id:'D-101', clientId:'CL-001', clientName:'Александр Иванов', amount:250000, status:'won',       closedAt:'2024-04-01T00:00:00Z' },
  { id:'D-102', clientId:'CL-001', clientName:'Александр Иванов', amount:180000, status:'won',       closedAt:'2024-05-12T00:00:00Z' },
  { id:'D-103', clientId:'CL-002', clientName:'Мария Петрова',    amount:75000,  status:'pending',   closedAt:'2024-05-20T00:00:00Z' },
  { id:'D-104', clientId:'CL-003', clientName:'Сергей Смирнов',   amount:520000, status:'won',       closedAt:'2024-03-15T00:00:00Z' },
  { id:'D-105', clientId:'CL-003', clientName:'Сергей Смирнов',   amount:310000, status:'in_progress',closedAt:'2024-05-28T00:00:00Z' },
  { id:'D-106', clientId:'CL-005', clientName:'Дмитрий Орлов',    amount:140000, status:'won',       closedAt:'2024-04-22T00:00:00Z' },
  { id:'D-107', clientId:'CL-006', clientName:'Ольга Соколова',   amount:95000,  status:'pending',   closedAt:'2024-05-30T00:00:00Z' },
  { id:'D-108', clientId:'CL-007', clientName:'Николай Лебедев',  amount:60000,  status:'won',       closedAt:'2024-02-10T00:00:00Z' },
  { id:'D-109', clientId:'CL-009', clientName:'Андрей Морозов',   amount:410000, status:'in_progress',closedAt:'2024-05-25T00:00:00Z' },
  { id:'D-110', clientId:'CL-009', clientName:'Андрей Морозов',   amount:220000, status:'won',       closedAt:'2024-04-08T00:00:00Z' },
  { id:'D-111', clientId:'CL-011', clientName:'Виктор Зайцев',    amount:130000, status:'won',       closedAt:'2024-03-01T00:00:00Z' },
  { id:'D-112', clientId:'CL-013', clientName:'Максим Фёдоров',   amount:680000, status:'in_progress',closedAt:'2024-05-29T00:00:00Z' },
  { id:'D-113', clientId:'CL-015', clientName:'Артём Белов',      amount:45000,  status:'won',       closedAt:'2024-01-20T00:00:00Z' },
  { id:'D-114', clientId:'CL-002', clientName:'Мария Петрова',    amount:110000, status:'lost',      closedAt:'2024-04-15T00:00:00Z' },
  { id:'D-115', clientId:'CL-005', clientName:'Дмитрий Орлов',    amount:88000,  status:'pending',   closedAt:'2024-06-01T00:00:00Z' }
];

export const activities = [
  { id:'A-001', type:'call',    title:'Звонок Александру Иванову', description:'Обсудили условия нового контракта на поставку.', status:'done',     date:'2024-05-28T10:00:00Z', clientId:'CL-001', responsible:'Пётр Сидоров', details:{duration:'15 мин', result:'Договорились о встрече'} },
  { id:'A-002', type:'email',   title:'Письмо Марии Петровой',     description:'Отправили коммерческое предложение.',           status:'done',     date:'2024-05-27T14:30:00Z', clientId:'CL-002', responsible:'Анна Ким',    details:{subject:'КП на опт', attachments:'2 файла'} },
  { id:'A-003', type:'meeting', title:'Встреча с Сергеем Смирновым',description:'Обсуждение расширения сотрудничества.',        status:'planned',  date:'2024-06-05T11:00:00Z', clientId:'CL-003', responsible:'Пётр Сидоров', details:{location:'Офис клиента', duration:'1 час'} },
  { id:'A-004', type:'task',    title:'Подготовить договор для Дмитрия Орлова', description:'Юридическая проверка условий сделки.', status:'in_progress', date:'2024-06-02T09:00:00Z', clientId:'CL-005', responsible:'Игорь Волков', details:{priority:'высокий'} },
  { id:'A-005', type:'call',    title:'Звонок Ольге Соколовой',    description:'Уточнение деталей заказа VIP-клиента.',         status:'planned',  date:'2024-06-03T15:00:00Z', clientId:'CL-006', responsible:'Анна Ким',    details:{duration:'20 мин'} },
  { id:'A-006', type:'email',   title:'Письмо Андрею Морозову',    description:'Согласование графика поставок на июнь.',         status:'done',     date:'2024-05-26T16:45:00Z', clientId:'CL-009', responsible:'Анна Ким',    details:{subject:'График поставок'} },
  { id:'A-007', type:'meeting', title:'Презентация для Максима Фёдорова', description:'Демонстрация новой линейки продуктов.', status:'done',     date:'2024-05-22T13:00:00Z', clientId:'CL-013', responsible:'Игорь Волков', details:{location:'Zoom', duration:'45 мин'} },
  { id:'A-008', type:'task',    title:'Обновить карточку клиента Николая Лебедева', description:'Проверить актуальность контактов.', status:'done', date:'2024-05-20T10:00:00Z', clientId:'CL-007', responsible:'Игорь Волков', details:{priority:'низкий'} },
  { id:'A-009', type:'call',    title:'Звонок Юлии Михайловой',    description:'Первичное знакомство, выявление потребностей.',  status:'done',     date:'2024-05-15T11:30:00Z', clientId:'CL-014', responsible:'Пётр Сидоров', details:{duration:'25 мин', result:'Отправить КП'} },
  { id:'A-010', type:'email',   title:'Письмо Ирине Волковой',     description:'Ответ на запрос о ценах.',                     status:'done',     date:'2024-05-12T09:20:00Z', clientId:'CL-010', responsible:'Игорь Волков', details:{subject:'Ответ на запрос'} },
  { id:'A-011', type:'task',    title:'Составить отчёт по клиенту Виктору Зайцеву', description:'Квартальный отчёт по закупкам.', status:'in_progress', date:'2024-06-01T08:00:00Z', clientId:'CL-011', responsible:'Пётр Сидоров', details:{deadline:'2024-06-07'} },
  { id:'A-012', type:'meeting', title:'Годовой обзор с Артёмом Беловым', description:'Обсуждение планов на следующий год.',     status:'planned',  date:'2024-06-10T14:00:00Z', clientId:'CL-015', responsible:'Анна Ким',    details:{location:'Офис'} },
  { id:'A-013', type:'call',    title:'Звонок Виктору Зайцеву',    description:'Проверка удовлетворённости сервисом.',           status:'done',     date:'2024-05-05T12:00:00Z', clientId:'CL-011', responsible:'Пётр Сидоров', details:{duration:'10 мин', result:'Доволен'} },
  { id:'A-014', type:'email',   title:'Письмо Сергею Смирнову',    description:'Напоминание о встрече 5 июня.',                 status:'planned',  date:'2024-06-01T09:00:00Z', clientId:'CL-003', responsible:'Пётр Сидоров', details:{subject:'Напоминание'} },
  { id:'A-015', type:'task',    title:'Обработать блокировку ООО «Свет»', description:'Согласовать условия разблокировки.',     status:'in_progress', date:'2024-05-29T10:00:00Z', clientId:'CL-008', responsible:'Пётр Сидоров', details:{priority:'высокий'} }
];