import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import fundoImg from './assets/FUNDO ALFA BTS.png';
import logoAlfa from './assets/logo alfa.png';

const allQuestions = [
  {
    id: 1,
    question: "O que significa a sigla 'BTS' no mercado de galpões logísticos?",
    options: ["Built to Suit", "Business Terminal System", "Base Técnica Segura", "Bloco Técnico Standard"],
    correct: 0,
    curiosity: "Built to Suit significa 'construído sob medida': o galpão nasce já desenhado para a operação específica de um cliente."
  },
  {
    id: 2,
    question: "Qual a principal vantagem de um galpão Built to Suit frente a um genérico?",
    options: ["É sempre mais barato", "Dispensa manutenção", "É projetado sob medida para a operação do cliente", "Só pode ser usado por uma empresa por vez"],
    correct: 2,
    curiosity: "O projeto sob medida ajusta layout, docas, pé-direito e fluxo exatamente à operação do cliente."
  },
  {
    id: 3,
    question: "O que diferencia um 'spec building' (galpão especulativo) de um Built to Suit?",
    options: ["O spec é construído sem cliente definido, enquanto o BTS já nasce para um cliente específico", "O spec é sempre maior", "O BTS não pode ser reformado", "Não há diferença"],
    correct: 0,
    curiosity: "Galpões 'spec' são erguidos por antecipação, à espera de um locatário; no BTS, o cliente já está definido antes da obra."
  },
  {
    id: 4,
    question: "Em um contrato Built to Suit, quem costuma participar da definição do layout desde o início?",
    options: ["Apenas o arquiteto", "O próprio cliente/operador, em conjunto com a construtora", "Somente o poder público", "Ninguém, o layout é padrão"],
    correct: 1,
    curiosity: "A participação do cliente desde a concepção garante que o galpão atenda exatamente ao fluxo operacional."
  },
  {
    id: 5,
    question: "Por que empresas de e-commerce costumam preferir galpões Built to Suit?",
    options: ["Porque são mais baratos sempre", "Porque o design pode ser otimizado para alto volume de separação de pedidos", "Porque não precisam de docas", "Porque dispensam sistemas de gestão"],
    correct: 1,
    curiosity: "Operações de e-commerce lidam com alto volume; um layout sob medida acelera o picking e reduz erros."
  },
  {
    id: 6,
    question: "O que costuma diferenciar a duração de contratos Built to Suit em relação a galpões comuns?",
    options: ["São geralmente mais longos, 10 anos ou mais", "São sempre mensais", "Não existe contrato formal", "Duram só até a obra terminar"],
    correct: 0,
    curiosity: "Contratos longos ajudam a viabilizar o investimento na construção sob medida, garantindo retorno ao empreendedor."
  },
  {
    id: 7,
    question: "O que é 'built-to-own', em contraste com Built to Suit?",
    options: ["Quando a própria empresa que vai operar constrói e é dona do imóvel", "Quando o galpão é alugado por hora", "Quando não existe contrato de locação", "É outro nome para o mesmo modelo do BTS"],
    correct: 0,
    curiosity: "No BTS uma empresa constrói e loca; no built-to-own, o próprio usuário final é o dono da construção."
  },
  {
    id: 8,
    question: "O que é 'expansível' em um projeto Built to Suit?",
    options: ["O galpão já é projetado para permitir ampliação futura sem grandes reformas", "O galpão pode ser desmontado e remontado em outro lugar", "É um tipo de doca", "Refere-se apenas ao estacionamento"],
    correct: 0,
    curiosity: "Prever expansão futura no projeto original evita obras estruturais complexas depois."
  },
  {
    id: 9,
    question: "O que é o 'pé-direito' de um galpão?",
    options: ["Lado direito da construção", "Altura livre entre o piso e a estrutura/telhado", "Tipo de porta de doca", "Nome do pilar central"],
    correct: 1,
    curiosity: "Um pé-direito alto permite empilhar mais mercadoria na vertical, aumentando a capacidade de armazenagem."
  },
  {
    id: 10,
    question: "Para que servem as docas niveladas em um galpão logístico?",
    options: ["Decoração da fachada", "Agilizar carga e descarga, alinhando com a carroceria do caminhão", "Estacionamento de carros", "Área de escritório"],
    correct: 1,
    curiosity: "Docas niveladas eliminam desníveis entre o piso do galpão e o caminhão, reduzindo tempo e risco de acidentes."
  },
  {
    id: 11,
    question: "Por que o piso industrial de um galpão precisa de alta resistência?",
    options: ["Só por estética", "Para suportar tráfego pesado de empilhadeiras e cargas concentradas", "Para isolar som", "Para resfriar o ambiente"],
    correct: 1,
    curiosity: "Pisos industriais suportam cargas pontuais muito altas de racks e empilhadeiras carregadas sem ceder."
  },
  {
    id: 12,
    question: "O que é um 'dock leveler'?",
    options: ["Um tipo de empilhadeira", "Equipamento que ajusta o desnível entre a doca e a carroceria do caminhão", "Sistema de iluminação da doca", "Sensor de temperatura"],
    correct: 1,
    curiosity: "O dock leveler forma uma rampa ajustável para circulação segura de empilhadeiras entre galpão e caminhão."
  },
  {
    id: 13,
    question: "Qual a função das canaletas de drenagem em pátios de manobra?",
    options: ["Guiar cabos elétricos", "Escoar a água da chuva e evitar alagamento", "Sinalizar faixas de pedestre", "Reduzir ruído dos caminhões"],
    correct: 1,
    curiosity: "Um bom sistema de drenagem evita poças e alagamentos, mantendo a operação segura em dias de chuva."
  },
  {
    id: 14,
    question: "O que é o 'pátio de manobra' (yard) de um galpão logístico?",
    options: ["Área de lazer dos funcionários", "Espaço para caminhões manobrarem e estacionarem antes/depois de carregar", "Depósito de lixo", "Jardim decorativo"],
    correct: 1,
    curiosity: "Um pátio bem dimensionado evita filas de caminhões na rua e permite manobras seguras."
  },
  {
    id: 15,
    question: "O que é um mezanino dentro de um galpão?",
    options: ["Um tipo de porta de doca", "Um piso intermediário elevado que aumenta a área útil sem aumentar a área construída no solo", "Um sistema de refrigeração", "Uma categoria de contrato"],
    correct: 1,
    curiosity: "Mezaninos aproveitam a altura do pé-direito para criar espaço extra sem ampliar a área do terreno."
  },
  {
    id: 16,
    question: "Para que serve o grid modular de pilares (colunas) em um galpão?",
    options: ["Apenas sustentação decorativa", "Organizar racks e corredores de forma padronizada, otimizando o espaço", "Servir de antena", "Separar áreas fumantes"],
    correct: 1,
    curiosity: "O espaçamento entre colunas é pensado para caber corredores e racks de forma eficiente."
  },
  {
    id: 17,
    question: "O que é uma estrutura metálica pré-fabricada, muito usada em galpões logísticos?",
    options: ["Sistema construtivo rápido e leve, chamado de steel deck/estrutura metálica", "Um tipo de piso de madeira", "Um sistema de ar-condicionado", "Um tipo de doca automática"],
    correct: 0,
    curiosity: "Estruturas metálicas pré-fabricadas aceleram bastante o prazo de obra comparado ao concreto."
  },
  {
    id: 18,
    question: "Por que muitos telhados de galpões logísticos têm placas translúcidas?",
    options: ["Para decoração", "Para aproveitar luz natural e reduzir consumo de energia elétrica", "Para reduzir peso da estrutura apenas", "Porque são sempre mais baratas que telhas comuns"],
    correct: 1,
    curiosity: "A luz natural reduz a necessidade de iluminação artificial, gerando economia ao longo do ano."
  },
  {
    id: 19,
    question: "O que é 'cross-docking'?",
    options: ["Estocagem de longo prazo", "Transferência da carga direto do caminhão de entrada para o de saída, quase sem estocagem", "Um tipo de contrato de aluguel", "Sistema de segurança contra incêndio"],
    correct: 1,
    curiosity: "No cross-docking, a mercadoria quase não para no galpão, sendo redirecionada rapidamente."
  },
  {
    id: 20,
    question: "O que significa 'last mile' em logística?",
    options: ["A primeira etapa do transporte internacional", "A etapa final de entrega, do centro de distribuição até o consumidor", "O trecho mais longo da rota", "Um tipo de galpão frigorificado"],
    correct: 1,
    curiosity: "O 'last mile' é a etapa final e mais complexa da logística por envolver múltiplas entregas fragmentadas."
  },
  {
    id: 21,
    question: "O que é um Centro de Distribuição (CD)?",
    options: ["Um escritório administrativo apenas", "Instalação para receber, armazenar e distribuir produtos", "Um tipo de caminhão", "Um sistema de cobrança"],
    correct: 1,
    curiosity: "O CD funciona como um hub que recebe grandes volumes e os redistribui com eficiência."
  },
  {
    id: 22,
    question: "O que é um WMS?",
    options: ["Um tipo de piso industrial", "Warehouse Management System, sistema de gestão de armazém", "Um modelo de contrato de locação", "Um sistema de refrigeração"],
    correct: 1,
    curiosity: "O WMS controla em tempo real onde cada produto está armazenado e agiliza a separação."
  },
  {
    id: 23,
    question: "O que é 'picking' em um galpão?",
    options: ["Processo de separação de produtos para montar um pedido", "Processo de limpeza do piso", "Processo de contratação de motoristas", "Tipo de estrutura metálica"],
    correct: 0,
    curiosity: "O picking é a separação de produtos; quanto mais eficiente o layout, mais rápido ele ocorre."
  },
  {
    id: 24,
    question: "O que é 'put away' na operação de um armazém?",
    options: ["Processo de descarte de mercadoria danificada", "Processo de guardar a mercadoria recebida no local correto do estoque", "Processo de emissão de nota fiscal", "Processo de limpeza das docas"],
    correct: 1,
    curiosity: "O 'put away' correto evita que produtos fiquem perdidos ou mal posicionados no estoque."
  },
  {
    id: 25,
    question: "Por que um fluxo 'em linha reta' costuma ser vantajoso no layout de um galpão?",
    options: ["Porque é mais bonito estruturalmente", "Porque evita cruzamento de operações e reduz o tempo de deslocamento interno", "Porque exige menos docas", "Porque dispensa iluminação"],
    correct: 1,
    curiosity: "Fluxos organizados evitam que empilhadeiras e pessoas cruzem caminhos, reduzindo gargalos."
  },
  {
    id: 26,
    question: "O que são 'docas dedicadas'?",
    options: ["Docas exclusivas para visitantes", "Docas reservadas para operações específicas, como recebimento ou expedição", "Docas usadas apenas à noite", "Docas sem cobertura"],
    correct: 1,
    curiosity: "Separar docas por função evita que operações diferentes se atrapalhem, agilizando o fluxo."
  },
  {
    id: 27,
    question: "O que é 'milk run' na logística?",
    options: ["Um tipo de galpão frigorificado", "Rota de coleta/entrega programada que passa por múltiplos pontos, otimizando o frete", "Um sistema de segurança patrimonial", "Um tipo de contrato de locação"],
    correct: 1,
    curiosity: "Rotas programadas coletam insumos de vários fornecedores de forma otimizada."
  },
  {
    id: 28,
    question: "Por que a automação vem crescendo em galpões logísticos?",
    options: ["Porque reduz o tamanho do terreno necessário sempre", "Porque aumenta velocidade e precisão nas operações, reduzindo erros e custo por pedido", "Porque elimina a necessidade de docas", "Porque é obrigatória por lei"],
    correct: 1,
    curiosity: "Sistemas automatizados lidam melhor com o alto volume gerado pelo e-commerce com menos erros."
  },
  {
    id: 29,
    question: "Por que muitos galpões logísticos ficam concentrados perto de rodovias e anéis viários?",
    options: ["Para reduzir o valor do terreno apenas", "Para facilitar o acesso rápido a múltiplos mercados consumidores", "Por exigência estética", "Porque não pode haver galpões dentro de cidades"],
    correct: 1,
    curiosity: "A proximidade com rodovias reduz o tempo e o custo de transporte até o consumidor final."
  },
  {
    id: 30,
    question: "O que é um 'condomínio logístico'?",
    options: ["Um único galpão gigante", "Empreendimento com vários galpões compartilhando infraestrutura comum, como portaria e segurança", "Um tipo de contrato Built to Suit", "Um sistema de refrigeração compartilhado"],
    correct: 1,
    curiosity: "Condomínios permitem que empresas compartilhem custos de infraestrutura e segurança."
  },
  {
    id: 31,
    question: "Por que o mercado de galpões logísticos cresceu tanto com o avanço do e-commerce?",
    options: ["Porque as lojas físicas desapareceram", "Porque aumentou a demanda por armazenagem e distribuição rápida de produtos", "Porque os preços de terrenos caíram no Brasil todo", "Não há relação entre os dois"],
    correct: 1,
    curiosity: "Cada compra online depende de armazenagem próxima para viabilizar prazos de entrega curtos."
  },
  {
    id: 32,
    question: "O que é 'vacância' no mercado de galpões?",
    options: ["Período de manutenção obrigatória", "Percentual de área disponível/desocupada em um determinado mercado", "Um tipo de contrato", "Imposto sobre galpões vazios"],
    correct: 1,
    curiosity: "A taxa de vacância indica a relação entre oferta e demanda de galpões em uma região."
  },
  {
    id: 33,
    question: "O que costuma caracterizar um galpão 'classe A'?",
    options: ["Ser o mais barato do mercado", "Alto padrão construtivo, boa localização e especificações técnicas modernas", "Ter menos de 5 anos de uso apenas", "Não ter docas"],
    correct: 1,
    curiosity: "Galpões classe A possuem pé-direito maior, piso reforçado e localização privilegiada."
  },
  {
    id: 34,
    question: "Por que a proximidade com mão de obra qualificada influencia a escolha de um terreno para galpão?",
    options: ["Não influencia em nada", "Porque a operação depende de pessoal, e acesso a trabalhadores facilita a rotina", "Porque reduz o valor do IPTU", "Porque é exigência apenas em grandes capitais"],
    correct: 1,
    curiosity: "Fácil acesso a trabalhadores evita dificuldades de contratação e manutenção de equipes."
  },
  {
    id: 35,
    question: "O que costuma ser avaliado antes de definir o terreno de um projeto Built to Suit?",
    options: ["Somente o preço do terreno", "Acesso viário, infraestrutura, logística e proximidade de mercados consumidores", "Apenas o tamanho do terreno", "A cor do solo"],
    correct: 1,
    curiosity: "A escolha do terreno envolve uma análise técnica robusta, já que o galpão operará ali por anos."
  },
  {
    id: 36,
    question: "O que é o zoneamento urbano em relação a áreas logísticas/industriais?",
    options: ["Não existe diferenciação legal", "Normas que definem onde atividades industriais e logísticas podem ser construídas", "Uma proibição total de galpões em cidades", "Um tipo de certificação ambiental"],
    correct: 1,
    curiosity: "O zoneamento equilibra o crescimento industrial com a qualidade das áreas residenciais."
  },
  {
    id: 37,
    question: "O que é uma certificação como LEED aplicada a um galpão?",
    options: ["Um selo de qualidade da mercadoria armazenada", "Um selo que reconhece boas práticas de sustentabilidade na construção e operação do imóvel", "Um tipo de seguro obrigatório", "Uma classificação de segurança contra incêndio"],
    correct: 1,
    curiosity: "Selo LEED avalia eficiência energética, uso de água e materiais sustentáveis na construção."
  },
  {
    id: 38,
    question: "Por que a captação de água de chuva é comum em projetos modernos de galpões?",
    options: ["É proibida em outros tipos de construção", "Reduz o consumo de água potável em limpeza e áreas externas", "Serve apenas para decoração", "Não tem nenhuma vantagem prática"],
    correct: 1,
    curiosity: "A água captada é reaproveitada em descargas e limpeza de pátios, reduzindo custos."
  },
  {
    id: 39,
    question: "Para que servem painéis solares instalados na cobertura de alguns galpões?",
    options: ["Apenas para sombrear o telhado", "Gerar energia elétrica, reduzindo custo operacional e emissões", "Aumentar o peso da estrutura de propósito", "Substituir o telhado translúcido sempre"],
    correct: 1,
    curiosity: "A grande área de cobertura dos galpões torna-os ideais para geração de energia solar."
  },
  {
    id: 40,
    question: "O que faz a iluminação por sensores de presença em um galpão?",
    options: ["Acende luzes aleatoriamente", "Acende apenas onde há movimento, economizando energia", "Serve como sistema de alarme contra incêndio", "Substitui as câmeras de segurança"],
    correct: 1,
    curiosity: "Sensores evitam manter áreas extensas iluminadas o tempo todo, gerando economia real."
  },
  {
    id: 41,
    question: "O que é ventilação cruzada em um projeto de galpão?",
    options: ["Um tipo de sistema elétrico", "Uso da circulação natural do ar para reduzir a temperatura interna sem gastar energia com ar-condicionado", "Um tipo de porta de doca", "Um sistema de captação de água"],
    correct: 1,
    curiosity: "Aberturas estratégicas permitem circulação natural de ar, reduzindo custos de climatização."
  },
  {
    id: 42,
    question: "Por que sensores de temperatura e umidade são usados em alguns galpões?",
    options: ["Apenas para fins estatísticos", "Para monitorar e proteger produtos sensíveis, como alimentos ou farmacêuticos", "Para calcular o valor do aluguel", "Para substituir o sistema de segurança"],
    correct: 1,
    curiosity: "Produtos sensíveis estragam fora da faixa ideal; o monitoramento contínuo evita perdas."
  },
  {
    id: 43,
    question: "O que é uma câmara fria dentro de um centro de distribuição?",
    options: ["Uma sala de reuniões", "Uma área com temperatura controlada para armazenar produtos perecíveis", "Um tipo de doca", "Um sistema de segurança"],
    correct: 1,
    curiosity: "Câmaras frias permitem estocar produtos perecíveis com controle rigoroso de temperatura."
  },
  {
    id: 44,
    question: "O que é IoT aplicado à gestão de um galpão?",
    options: ["Um tipo de estrutura metálica", "Sensores conectados que monitoram em tempo real estoque, temperatura e movimentação", "Um novo tipo de contrato de locação", "Um sistema de iluminação apenas"],
    correct: 1,
    curiosity: "A Internet das Coisas monitora indicadores em tempo real para antecipar problemas."
  },
  {
    id: 45,
    question: "Por que a eficiência energética reduz o custo total de operação de um galpão ao longo do tempo?",
    options: ["Ela não influencia o custo operacional", "Mesmo com investimento inicial maior, o gasto menor com energia compensa no longo prazo", "Ela aumenta o valor do aluguel sempre", "Só afeta o custo de construção"],
    correct: 1,
    curiosity: "Gastos menores com energia compensam o investimento inicial ao longo da vida útil do imóvel."
  },
  {
    id: 46,
    question: "Para que drones vêm sendo usados em alguns centros de distribuição?",
    options: ["Para entregar produtos dentro do próprio galpão", "Para conferência de estoque em altura, agilizando inventários", "Para climatização do ambiente", "Para segurança contra incêndio"],
    correct: 1,
    curiosity: "Drones leem códigos em prateleiras altas rapidamente, reduzindo o tempo de inventários manuais."
  },
  {
    id: 47,
    question: "O que é uma brigada de incêndio em um galpão?",
    options: ["Um tipo de seguro obrigatório", "Equipe treinada para agir em situações de princípio de incêndio", "Um sistema automático de sprinklers", "Um órgão público externo apenas"],
    correct: 1,
    curiosity: "Equipes treinadas reduzem o tempo de resposta antes da chegada dos bombeiros."
  },
  {
    id: 48,
    question: "Por que sprinklers (chuveiros automáticos) são comuns em galpões logísticos?",
    options: ["Para climatizar o ambiente", "Para combate automático a princípios de incêndio, protegendo mercadoria e pessoas", "Para limpeza do piso", "Para irrigação de plantas internas"],
    correct: 1,
    curiosity: "Sprinklers detectam calor elevado e contêm princípios de incêndio automaticamente."
  },
  {
    id: 49,
    question: "O que é EPI?",
    options: ["Um tipo de piso industrial", "Equipamento de Proteção Individual, usado para prevenir acidentes de trabalho", "Um sistema de gestão de estoque", "Um tipo de doca de carga"],
    correct: 1,
    curiosity: "Capacetes, luvas e calçados de segurança previnem acidentes nas operações logísticas."
  },
  {
    id: 50,
    question: "Por que o cronograma de obra de um projeto Built to Suit costuma ser alinhado ao contrato de locação desde o início?",
    options: ["Não costuma ter relação nenhuma", "Para alinhar a entrega do imóvel com a necessidade operacional do cliente, evitando atrasos que impactem o negócio", "Porque a lei exige isso em todos os casos", "Apenas por uma questão contábil"],
    correct: 1,
    curiosity: "O prazo de obra é planejado para coincidir com a necessidade de funcionamento do cliente."
  }
];

const LETTERS = ["A", "B", "C", "D"];

// Embaralha um array (Fisher-Yates) sem mutar o original
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Embaralha as alternativas de UMA questão, recalculando o índice correto
function shuffleQuestionOptions(q) {
  const optionObjs = q.options.map((text, idx) => ({
    text,
    wasCorrect: idx === q.correct
  }));

  const shuffled = shuffleArray(optionObjs);
  const newCorrectIndex = shuffled.findIndex(o => o.wasCorrect);

  return {
    ...q,
    options: shuffled.map((o, idx) => `${LETTERS[idx]}) ${o.text}`),
    correct: newCorrectIndex
  };
}

export default function QuizAlfaBTS() {
  const [gameState, setGameState] = useState('welcome');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer;
    if (gameState === 'finished') {
      timer = setTimeout(() => {
        setGameState('welcome');
      }, 15000);
    }
    return () => clearTimeout(timer);
  }, [gameState]);

  const startQuiz = () => {
    // 1) sorteia 5 perguntas diferentes
    const shuffledQuestions = shuffleArray(allQuestions).slice(0, 5);
    // 2) para cada pergunta, embaralha também a ordem das alternativas
    const withShuffledOptions = shuffledQuestions.map(shuffleQuestionOptions);

    setSelectedQuestions(withShuffledOptions);
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
  };

  const handleSelectOption = (index) => {
    setSelectedOption(index);
    const currentQ = selectedQuestions[currentIndex];
    const correct = index === currentQ.correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      setGameState('curiosity');
    }, 400);
  };

  const nextStep = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setGameState('playing');
    } else {
      setGameState('finished');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center p-6 overflow-hidden select-none font-sans bg-neutral-950">
      
      {/* BACKGROUND */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center filter brightness-[0.4]"
        style={{ backgroundImage: `url(${fundoImg})` }}
      />
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/90 pointer-events-none" />

      {/* CABEÇALHO CENTRALIZADO COM A LOGO DA ALFA MAIOR E PREENCHENDO O ESPAÇO */}
      <header className="relative z-20 w-full max-w-md flex justify-center items-center pt-6 mb-6">
        <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-6 py-3 rounded-2xl shadow-2xl flex items-center h-28 w-72 justify-center overflow-hidden">
          <img src={logoAlfa} alt="Logo Alfa BTS" className="w-full h-full object-contain object-center scale-[1.9]" />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative z-10 w-full max-w-md my-auto flex flex-col justify-center mt-2">
        <AnimatePresence mode="wait">
          
          {gameState === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="text-center space-y-6 px-2"
            >
              <div className="space-y-3">
                <span className="inline-block text-amber-400 text-xs font-black px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full uppercase tracking-widest shadow-inner">
                  Fecoimp • Alfa BTS
                </span>
                <h1 className="text-3xl font-black tracking-tight text-white leading-tight">Você Conhece Built to Suit?</h1>
                <p className="text-neutral-300 text-sm leading-relaxed px-2">
                  Teste seus conhecimentos sobre galpões logísticos e engenharia sob medida em um desafio rápido.
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startQuiz}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black py-4 rounded-2xl shadow-xl uppercase tracking-wider text-sm cursor-pointer transition"
              >
                Iniciar Desafio 
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && selectedQuestions.length > 0 && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex justify-between items-center text-xs text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800 pb-3">
                <span>Questão {currentIndex + 1} de {selectedQuestions.length}</span>
                <span className="text-amber-400">Pontuação: {score}</span>
              </div>

              <h2 className="text-lg font-bold leading-snug text-white">
                {selectedQuestions[currentIndex].question}
              </h2>

              <div className="space-y-3">
                {selectedQuestions[currentIndex].options.map((option, index) => {
                  let btnStyle = "bg-neutral-950/90 border-neutral-800 hover:border-amber-500 text-neutral-200";
                  if (selectedOption !== null) {
                    if (index === selectedQuestions[currentIndex].correct) {
                      btnStyle = "bg-emerald-900/90 border-emerald-500 text-white shadow-lg";
                    } else if (index === selectedOption) {
                      btnStyle = "bg-rose-900/90 border-rose-500 text-white shadow-lg";
                    } else {
                      btnStyle = "bg-neutral-950/40 border-neutral-900 text-neutral-600 opacity-40";
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={selectedOption === null ? { scale: 1.01 } : {}}
                      whileTap={selectedOption === null ? { scale: 0.99 } : {}}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(index)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-medium cursor-pointer transition ${btnStyle}`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {gameState === 'curiosity' && selectedQuestions.length > 0 && (
            <motion.div
              key="curiosity"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="space-y-5 bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 p-6 rounded-3xl shadow-2xl text-center"
            >
              <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                {isCorrect ? '✨ Resposta Correta!' : '❌ Resposta Incorreta'}
              </div>

              <div className="bg-neutral-950/90 border border-neutral-800 p-5 rounded-2xl text-left space-y-2 shadow-inner">
                <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block">💡 Curiosidade do Setor</span>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {selectedQuestions[currentIndex].curiosity}
                </p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black py-4 rounded-2xl shadow-xl uppercase tracking-wider text-sm cursor-pointer transition"
              >
                {currentIndex + 1 < selectedQuestions.length ? 'Próxima Questão ➔' : 'Ver Resultado Final ➔'}
              </motion.button>
            </motion.div>
          )}

          {gameState === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 bg-neutral-900/80 backdrop-blur-lg border border-neutral-800 p-8 rounded-3xl shadow-2xl text-center"
            >
              <div>
                <span className="text-4xl">🏆</span>
                <h2 className="text-2xl font-black text-white mt-2">Desafio Concluído!</h2>
                <p className="text-neutral-300 text-xs mt-1">Obrigado por participar da nossa experiência na Fecoimp.</p>
              </div>

              <div className="bg-neutral-950/90 border border-neutral-800 p-5 rounded-2xl inline-block w-full shadow-inner">
                <span className="text-xs text-neutral-400 uppercase tracking-widest block font-bold">Placar Final</span>
                <span className="text-4xl font-black text-amber-400 mt-1 block">{score} / {selectedQuestions.length}</span>
              </div>

              <p className="text-xs text-neutral-400 italic">
                Reiniciando automaticamente em instantes...
              </p>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGameState('welcome')}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3.5 rounded-2xl border border-neutral-700 transition cursor-pointer text-xs uppercase tracking-wider shadow-lg"
              >
                Reiniciar Agora 🔄
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="relative z-20 pb-2 text-center">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Alfa BTS • Fecoimp</span>
      </footer>

    </div>
  );
}