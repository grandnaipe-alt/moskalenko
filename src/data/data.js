export const PLATFORMS = {
  google: { name: 'Google Ads', color: '#4285F4', bg: 'rgba(66,133,244,0.15)' },
  meta:   { name: 'Meta Ads',   color: '#0866FF', bg: 'rgba(8,102,255,0.15)' },
  tiktok: { name: 'TikTok Ads', color: '#FF0050', bg: 'rgba(255,0,80,0.15)' },
}

export const CRM_STATUS = {
  novo:        { label: 'Novo Lead',    color: '#3a60ff', bg: 'rgba(58,96,255,0.15)' },
  contato:     { label: 'Em Contato',  color: '#E8A820', bg: 'rgba(232,168,32,0.15)' },
  qualificado: { label: 'Qualificado', color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
  proposta:    { label: 'Proposta',    color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
  fechado:     { label: 'Fechado',     color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  perdido:     { label: 'Perdido',     color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
}

export const overviewMetrics = {
  totalInvestment: 2614.70,
  totalLeads: 107,
  costPerLead: 6.77,
  totalFollowers: 1547,
  totalProfileVisits: 4388,
  activeCampaigns: 3,
}

export const platformMetrics = [
  { platform: 'meta', investment: 2614.70, leads: 107, costPerLead: 6.77, impressions: 0, clicks: 0, ctr: 0 },
]

export const leadsTimeline = [
  { date: '01/05', google: 3, meta: 2, tiktok: 0 },
  { date: '03/05', google: 5, meta: 4, tiktok: 1 },
  { date: '05/05', google: 6, meta: 3, tiktok: 0 },
  { date: '07/05', google: 4, meta: 5, tiktok: 1 },
  { date: '09/05', google: 8, meta: 6, tiktok: 2 },
  { date: '11/05', google: 7, meta: 5, tiktok: 1 },
  { date: '13/05', google: 9, meta: 7, tiktok: 2 },
]

export const ageDistribution = [
  { faixa: '18–24', quantidade: 18 },
  { faixa: '25–34', quantidade: 52 },
  { faixa: '35–44', quantidade: 74 },
  { faixa: '45–54', quantidade: 48 },
  { faixa: '55–64', quantidade: 16 },
  { faixa: '65+',   quantidade: 6  },
]

export const areaDistribution = [
  { area: 'Trabalhista',    value: 124, color: '#3a60ff' },
  { area: 'Consumidor',     value: 58,  color: '#E8A820' },
  { area: 'Previdenciário', value: 22,  color: '#22c55e' },
  { area: 'Trânsito',       value: 10,  color: '#a855f7' },
]

export const CAMPAIGN_TYPES = {
  whatsapp:   { label: 'WhatsApp Leads', color: '#25D366', bg: 'rgba(37,211,102,0.15)' },
  seguidores: { label: 'Seguidores',     color: '#a855f7', bg: 'rgba(168,85,247,0.15)' },
}

export const campaigns = [
  { id:1, name:'01 [TRÁFEGO] [WHATSAPP]',      platform:'meta', type:'whatsapp',   area:'Trabalhista', status:'ativa', budget:50, spent:724.34,  leads:107, results:107,  cpl:6.77, costPerResult:6.77,  followers:9    },
  { id:2, name:'[TRÁFEGO] [SEGUIDORES]',        platform:'meta', type:'seguidores', area:'Geral',       status:'ativa', budget:70, spent:1859.19, leads:0,   results:4096, cpl:0,    costPerResult:0.45,  followers:1518 },
  { id:3, name:'HIALLY | TRÁFEGO | SEGUIDORES', platform:'meta', type:'seguidores', area:'Geral',       status:'ativa', budget:5,  spent:31.17,   leads:0,   results:292,  cpl:0,    costPerResult:0.11,  followers:20   },
]

export const crmLeads = [
  { id:1,  name:'Carlos Souza',     phone:'(71) 99821-3344', area:'Trabalhista', platform:'google', status:'novo',        age:38, createdAt:'2024-05-13', notes:'Demissão sem justa causa, 5 anos na empresa' },
  { id:2,  name:'Maria Santos',     phone:'(71) 98765-4321', area:'Consumidor',  platform:'meta',   status:'contato',     age:52, createdAt:'2024-05-12', notes:'Banco cobrou seguro não contratado' },
  { id:3,  name:'João Oliveira',    phone:'(71) 99234-5678', area:'Trabalhista', platform:'tiktok', status:'qualificado', age:44, createdAt:'2024-05-12', notes:'Horas extras não pagas, 3 anos' },
  { id:4,  name:'Ana Lima',         phone:'(71) 98543-2109', area:'Consumidor',  platform:'meta',   status:'proposta',    age:31, createdAt:'2024-05-11', notes:'Plano de saúde negou cirurgia' },
  { id:5,  name:'Pedro Alves',      phone:'(71) 99654-8877', area:'Trabalhista', platform:'google', status:'fechado',     age:47, createdAt:'2024-05-11', notes:'FGTS não depositado por 2 anos' },
  { id:6,  name:'Lucia Ferreira',   phone:'(71) 98876-5432', area:'Trabalhista', platform:'google', status:'novo',        age:41, createdAt:'2024-05-10', notes:'Acidente de trabalho sem amparo' },
  { id:7,  name:'Roberto Costa',    phone:'(71) 99345-6789', area:'Consumidor',  platform:'meta',   status:'contato',     age:58, createdAt:'2024-05-10', notes:'Nome sujo indevido no SPC' },
  { id:8,  name:'Fernanda Silva',   phone:'(71) 98432-1098', area:'Consumidor',  platform:'meta',   status:'qualificado', age:35, createdAt:'2024-05-09', notes:'Empréstimo consignado não solicitado' },
  { id:9,  name:'Marcos Pereira',   phone:'(71) 99876-5434', area:'Trabalhista', platform:'google', status:'novo',        age:46, createdAt:'2024-05-09', notes:'Rescisão indireta, assédio moral' },
  { id:10, name:'Patricia Gomes',   phone:'(71) 98654-3210', area:'Consumidor',  platform:'meta',   status:'proposta',    age:29, createdAt:'2024-05-08', notes:'Juros abusivos no financiamento' },
]

export const roteiros = [
  { id:1,  semana:1, area:'Consumidor',  tema:'Banco', titulo:'O banco cobrou algo que você não contratou?',
    gancho:'O banco debitou um valor da sua conta que você não autorizou? Para tudo — isso é ilegal.',
    dor:'Seguro não solicitado, taxa escondida, cobrança duplicada... os bancos fazem isso todo dia achando que você não vai perceber.',
    solucao:'Sou [nome], advogada especialista em direito do consumidor. Cobrança indevida dá direito a reembolso em dobro mais indenização por dano moral.',
    cta:'Me manda uma mensagem agora. A consulta é gratuita e eu te digo em minutos se você tem direito a receber de volta.',
    status:'pendente', dica:'Segurar o celular na mão como se fosse mostrar o extrato bancário.' },
  { id:2,  semana:1, area:'Consumidor',  tema:'Plano de Saúde', titulo:'Plano de saúde negou seu procedimento?',
    gancho:'Seu plano de saúde negou uma cirurgia, um exame ou uma internação que o médico pediu? Isso pode ser crime.',
    dor:'A pessoa está doente, o médico indica o tratamento, e o plano simplesmente nega. Você paga todo mês e na hora que mais precisa, eles dizem não.',
    solucao:'O plano é obrigado a cobrir o que o médico prescreve. Negativa sem justificativa válida gera direito a obrigar o plano a custear na justiça.',
    cta:'Me chama agora. Não deixa o plano decidir pela sua saúde. Primeira consulta gratuita.',
    status:'gravado', dica:'Tom sério e empático. Olhar direto pra câmera com firmeza.' },
  { id:3,  semana:1, area:'Consumidor',  tema:'Nome Sujo', titulo:'Seu nome foi parar no SPC por dívida que não é sua?',
    gancho:'Você foi fazer um financiamento e descobriu que seu nome tá sujo por uma dívida que não é sua?',
    dor:'Isso acontece mais do que parece. Fraude, erro de cadastro... e quem sofre as consequências é você, que não deve nada.',
    solucao:'Negativação indevida é um dos casos mais fortes para indenização por dano moral. A empresa pode ser condenada a te pagar.',
    cta:'Me manda seu caso. Consulta gratuita, sem compromisso.',
    status:'publicado', dica:'' },
  { id:4,  semana:2, area:'Consumidor',  tema:'Banco', titulo:'Empréstimo consignado que você não pediu?',
    gancho:'Apareceu um desconto no seu benefício ou salário de um empréstimo que você nunca pediu?',
    dor:'Isso é um golpe muito comum, especialmente com aposentados. Alguém usou seus dados pra contratar um empréstimo no seu nome.',
    solucao:'Você tem direito a cancelar, receber tudo de volta e ainda ser indenizado. Já ajudei muitas pessoas a recuperar esse dinheiro.',
    cta:'Me chama agora. Não deixa esse dinheiro na mão de quem te prejudicou. Consulta grátis.',
    status:'pendente', dica:'Esse tema ressoa muito com aposentados — boostar no Meta pra público 50+.' },
  { id:5,  semana:2, area:'Consumidor',  tema:'Compras Online', titulo:'Comprei online e o produto não chegou',
    gancho:'Pagou, esperou semanas, e o produto nunca chegou — e a loja não resolve?',
    dor:'A empresa some, o SAC não responde, e você fica sem o produto e sem o dinheiro. Muita gente desiste. Mas não devia.',
    solucao:'O CDC garante que você receba o produto ou o dinheiro de volta. E se a empresa causou transtorno, você ainda pode pedir indenização.',
    cta:'Me conta o que aconteceu. Consulta gratuita — e a gente resolve isso junto.',
    status:'pendente', dica:'' },
  { id:6,  semana:2, area:'Consumidor',  tema:'Plano de Saúde', titulo:'Plano negou atendimento de urgência?',
    gancho:'Plano de saúde não pode negar atendimento de urgência ou emergência. Nunca. Ponto.',
    dor:'A pessoa chega no hospital com dor, o plano diz que não cobre, a família entra em desespero. Além de cruel, é totalmente ilegal.',
    solucao:'Em casos de urgência, o plano tem obrigação de cobrir as primeiras 12 horas — mesmo em carência.',
    cta:'Se isso aconteceu com você ou sua família, me chama agora. Primeira consulta gratuita.',
    status:'em_gravacao', dica:'' },
  { id:7,  semana:3, area:'Trabalhista', tema:'Hora Extra', titulo:'Você rodou 14 horas e não recebeu hora extra?',
    gancho:'Irmão, você trabalhou mais de 8 horas e no contracheque só vieram as horas normais?',
    dor:'A empresa sabe que você não vai reclamar — mas deveria. Hora extra não paga é ilegal e muito comum com motoristas e caminhoneiros.',
    solucao:'A CLT garante hora extra com acréscimo mínimo de 50%. A Justiça do Trabalho pode cobrar os últimos 5 anos.',
    cta:'Me manda seu caso. Primeira consulta gratuita — a gente calcula o que a empresa te deve.',
    status:'pendente', dica:'' },
  { id:8,  semana:3, area:'Trabalhista', tema:'Rescisão', titulo:'Foi demitido e não recebeu tudo?',
    gancho:'Trabalhei 6 anos pra empresa. Me demitiram e me pagaram uma mixaria. Não veio FGTS, não veio aviso prévio, não veio nada certo.',
    dor:'Muita gente assina a rescisão com pressa porque disseram que era aquilo mesmo. Só descobre depois que foi lesado.',
    solucao:'Na demissão sem justa causa, a empresa é obrigada a pagar saldo, aviso prévio, 13º, férias e multa de 40% do FGTS.',
    cta:'Me manda a rescisão. A gente analisa gratuitamente e te diz o que ficou faltando.',
    status:'pendente', dica:'' },
  { id:9,  semana:3, area:'Consumidor',  tema:'Geral', titulo:'3 direitos do consumidor que ninguém conhece',
    gancho:'3 direitos do consumidor que as empresas torcem pra você nunca descobrir.',
    dor:'1) Cobrança indevida? A empresa devolve em dobro. 2) Produto com defeito? 30 dias pra reclamar. 3) Cláusula abusiva no contrato? Pode ser anulada.',
    solucao:'Sou [nome], advogada especialista em direito do consumidor. Esses direitos são reais e a maioria das pessoas não faz valer.',
    cta:'Salva esse vídeo e me chama se algum desses é seu caso. Consulta gratuita.',
    status:'pendente', dica:'Pedir pra salvar e compartilhar. Alto potencial viral.' },
  { id:10, semana:4, area:'Consumidor',  tema:'Compras Online', titulo:'Produto veio com defeito e a empresa não quer trocar',
    gancho:'Produto chegou com defeito e a empresa tá enrolando pra trocar ou devolver o dinheiro?',
    dor:'Manda pra assistência técnica, leva 30 dias, volta com o mesmo problema. É um ciclo de enrolação que a maioria aceita — mas não precisa.',
    solucao:'Se o defeito não for resolvido em 30 dias, você pode exigir troca por produto novo, abatimento ou dinheiro de volta.',
    cta:'Me conta o que aconteceu. Consulta gratuita.',
    status:'pendente', dica:'' },
  { id:11, semana:4, area:'Consumidor',  tema:'Plano de Saúde', titulo:'Paguei do bolso tratamento que o plano devia cobrir',
    gancho:'Você pagou do próprio bolso um tratamento porque o plano negou — e nunca buscou o reembolso?',
    dor:'A maioria paga, fica brava, e deixa pra lá. Mas esse dinheiro pode voltar pra você — com juros e indenização.',
    solucao:'Se o procedimento estava na cobertura e eles negaram sem justificativa, você tem direito ao reembolso integral mais danos morais.',
    cta:'Me manda uma mensagem agora. Esse dinheiro pode ser seu de volta.',
    status:'pendente', dica:'' },
  { id:12, semana:4, area:'Consumidor',  tema:'Geral', titulo:'Quanto você pode receber de indenização?',
    gancho:'Você sabe quanto pode receber de indenização por dano moral como consumidor? A resposta vai te surpreender.',
    dor:'Negativação indevida: R$3mil a R$10mil. Cobrança abusiva: R$2mil a R$8mil. Negativa de plano: pode passar de R$10mil.',
    solucao:'Esses valores são reais — conquistas que já obtive para meus clientes na justiça.',
    cta:'Me conta o seu caso. Consulta gratuita — a gente analisa o que você tem direito a receber.',
    status:'pendente', dica:'Alto potencial viral. Boostar no Meta Ads após postar.' },
]

export const STATUS_ROTEIRO = {
  pendente:    { label: 'Pendente',     color: '#9CA3AF', bg: 'rgba(156,163,175,0.15)' },
  em_gravacao: { label: 'Em Gravação', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  gravado:     { label: 'Gravado',      color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  publicado:   { label: 'Publicado',   color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
}

export const formatCurrency = (v) =>
  new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(v)
export const formatNumber = (v) =>
  new Intl.NumberFormat('pt-BR').format(v)
export const formatPercent = (v, d=1) => `${Number(v).toFixed(d)}%`
