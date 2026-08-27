import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import fundoImg from './assets/FUNDO ALFA BTS.png';
import logoAlfa from './assets/logo alfa.png';
import logoMaquisul from './assets/logo maquisul pequena.png';

const allQuestions = [
  {
    id: 1,
    question: "O que significa a sigla 'BTS' no mercado de galpões logísticos?",
    options: ["A) Built to Suit", "B) Business Terminal System", "C) Base Técnica Segura", "D) Bloco Técnico Standard"],
    correct: 0,
    curiosity: "Built to Suit significa 'construído sob medida': o galpão nasce já desenhado para a operação específica de um cliente[cite: 1]."
  },
  {
    id: 2,
    question: "Qual a principal vantagem de um galpão Built to Suit frente a um genérico?",
    options: ["A) É sempre mais barato", "B) Dispensa manutenção", "C) É projetado sob medida para a operação do cliente", "D) Só pode ser usado por uma empresa por vez"],
    correct: 2,
    curiosity: "O projeto sob medida ajusta layout, docas, pé-direito e fluxo exatamente à operação do cliente[cite: 1]."
  },
  {
    id: 3,
    question: "O que diferencia um 'spec building' (galpão especulativo) de um Built to Suit?",
    options: ["A) O spec é construído sem cliente definido, enquanto o BTS já nasce para um cliente específico", "B) O spec é sempre maior", "C) O BTS não pode ser reformado", "D) Não há diferença"],
    correct: 0,
    curiosity: "Galpões 'spec' são erguidos por antecipação, à espera de um locatário; no BTS, o cliente já está definido antes da obra[cite: 1]."
  },
  {
    id: 4,
    question: "Em um contrato Built to Suit, quem costuma participar da definição do layout desde o início?",
    options: ["A) Apenas o arquiteto", "B) O próprio cliente/operador, em conjunto com a construtora", "C) Somente o poder público", "D) Ninguém, o layout é padrão"],
    correct: 1,
    curiosity: "A participação do cliente desde a concepção garante que o galpão atenda exatamente ao fluxo operacional[cite: 1]."
  },
  {
    id: 5,
    question: "Por que empresas de e-commerce costumam preferir galpões Built to Suit?",
    options: ["A) Porque são mais baratos sempre", "B) Porque o design pode ser otimizado para alto volume de separação de pedidos", "C) Porque não precisam de docas", "D) Porque dispensam sistemas de gestão"],
    correct: 1,
    curiosity: "Operações de e-commerce lidam com alto volume; um layout sob medida acelera o picking e reduz erros[cite: 1]."
  },
  {
    id: 6,
    question: "O que costuma diferenciar a duração de contratos Built to Suit em relação a galpões comuns?",
    options: ["A) São geralmente mais longos, 10 anos ou mais", "B) São sempre mensais", "C) Não existe contrato formal", "D) Duram só até a obra terminar"],
    correct: 0,
    curiosity: "Contratos longos ajudam a viabilizar o investimento na construção sob medida, garantindo retorno ao empreendedor[cite: 1]."
  },
  {
    id: 7,
    question: "O que é 'built-to-own', em contraste com Built to Suit?",
    options: ["A) Quando a própria empresa que vai operar constrói e é dona do imóvel", "B) Quando o galpão é alugado por hora", "C) Quando não existe contrato de locação", "D) É outro nome para o mesmo modelo do BTS"],
    correct: 0,
    curiosity: "No BTS uma empresa constrói e loca; no built-to-own, o próprio usuário final é o dono da construção[cite: 1]."
  },
  {
    id: 8,
    question: "O que é 'expansível' em um projeto Built to Suit?",
    options: ["A) O galpão já é projetado para permitir ampliação futura sem grandes reformas", "B) O galpão pode ser desmontado e remontado em outro lugar", "C) É um tipo de doca", "D) Refere-se apenas ao estacionamento"],
    correct: 0,
    curiosity: "Prever expansão futura no projeto original evita obras estruturais complexas depois[cite: 1]."
  },
  {
    id: 9,
    question: "O que é o 'pé-direito' de um galpão?",
    options: ["A) Lado direito da construção", "B) Altura livre entre o piso e a estrutura/telhado", "C) Tipo de porta de doca", "D) Nome do pilar central"],
    correct: 1,
    curiosity: "Um pé-direito alto permite empilhar mais mercadoria na vertical, aumentando a capacidade de armazenagem[cite: 1]."
  },
  {
    id: 10,
    question: "Para que servem as docas niveladas em um galpão logístico?",
    options: ["A) Decoração da fachada", "B) Agilizar carga e descarga, alinhando com a carroceria do caminhão", "C) Estacionamento de carros", "D) Área de escritório"],
    correct: 1,
    curiosity: "Docas niveladas eliminam desníveis entre o piso do galpão e o caminhão, reduzindo tempo e risco de acidentes[cite: 1]."
  },
  {
    id: 11,
    question: "Por que o piso industrial de um galpão precisa de alta resistência?",
    options: ["A) Só por estética", "B) Para suportar tráfego pesado de empilhadeiras e cargas concentradas", "C) Para isolar som", "D) Para resfriar o ambiente"],
    correct: 1,
    curiosity: "Pisos industriais suportam cargas pontuais muito altas de racks e empilhadeiras carregadas sem ceder[cite: 1]."
  },
  {
    id: 12,
    question: "O que é um 'dock leveler'?",
    options: ["A) Um tipo de empilhadeira", "B) Equipamento que ajusta o desnível entre a doca e a carroceria do caminhão", "C) Sistema de iluminação da doca", "D) Sensor de temperatura"],
    correct: 1,
    curiosity: "O dock leveler forma uma rampa ajustável para circulação segura de empilhadeiras entre galpão e caminhão[cite: 1]."
  },
  {
    id: 13,
    question: "Qual a função das canaletas de drenagem em pátios de manobra?",
    options: ["A) Guiar cabos elétricos", "B) Escoar a água da chuva e evitar alagamento", "C) Sinalizar faixas de pedestre", "D) Reduzir ruído dos caminhões"],
    correct: 1,
    curiosity: "Um bom sistema de drenagem evita poças e alagamentos, mantendo a operação segura em dias de chuva[cite: 1]."
  },
  {
    id: 14,
    question: "O que é o 'pátio de manobra' (yard) de um galpão logístico?",
    options: ["A) Área de lazer dos funcionários", "B) Espaço para caminhões manobrarem e estacionarem antes/depois de carregar", "C) Depósito de lixo", "D) Jardim decorativo"],
    correct: 1,
    curiosity: "Um pátio bem dimensionado evita filas de caminhões na rua e permite manobras seguras[cite: 1]."
  },
  {
    id: 15,
    question: "O que é um mezanino dentro de um galpão?",
    options: ["A) Um tipo de porta de doca", "B) Um piso intermediário elevado que aumenta a área útil sem aumentar a área construída no solo", "C) Um sistema de refrigeração", "D) Uma categoria de contrato"],
    correct: 1,
    curiosity: "Mezaninos aproveitam a altura do pé-direito para criar espaço extra sem ampliar a área do terreno[cite: 1]."
  },
  {
    id: 16,
    question: "Para que serve o grid modular de pilares (colunas) em um galpão?",
    options: ["A) Apenas sustentação decorativa", "B) Organizar racks e corredores de forma padronizada, otimizando o espaço", "C) Servir de antena", "D) Separar áreas fumantes"],
    correct: 1,
    curiosity: "O espaçamento entre colunas é pensado para caber corredores e racks de forma eficiente[cite: 1]."
  },
  {
    id: 17,
    question: "O que é uma estrutura metálica pré-fabricada, muito usada em galpões logísticos?",
    options: ["A) Sistema construtivo rápido e leve, chamado de steel deck/estrutura metálica", "B) Um tipo de piso de madeira", "C) Um sistema de ar-condicionado", "D) Um tipo de doca automática"],
    correct: 0,
    curiosity: "Estruturas metálicas pré-fabricadas aceleram bastante o prazo de obra comparado ao concreto[cite: 1]."
  },
  {
    id: 18,
    question: "Por que muitos telhados de galpões logísticos têm placas translúcidas?",
    options: ["A) Para decoração", "B) Para aproveitar luz natural e reduzir consumo de energia elétrica", "C) Para reduzir peso da estrutura apenas", "D) Porque são sempre mais baratas que telhas comuns"],
    correct: 1,
    curiosity: "A luz natural reduz a necessidade de iluminação artificial, gerando economia ao longo do ano[cite: 1]."
  },
  {
    id: 19,
    question: "O que é 'cross-docking'?",
    options: ["A) Estocagem de longo prazo", "B) Transferência da carga direto do caminhão de entrada para o de saída, quase sem estocagem", "C) Um tipo de contrato de aluguel", "D) Sistema de segurança contra incêndio"],
    correct: 1,
    curiosity: "No cross-docking, a mercadoria quase não para no galpão, sendo redirecionada rapidamente[cite: 1]."
  },
  {
    id: 20,
    question: "O que significa 'last mile' em logística?",
    options: ["A) A primeira etapa do transporte internacional", "B) A etapa final de entrega, do centro de distribuição até o consumidor", "C) O trecho mais longo da rota", "D) Um tipo de galpão frigorificado"],
    correct: 1,
    curiosity: "O 'last mile' é a etapa final e mais complexa da logística por envolver múltiplas entregas fragmentadas[cite: 1]."
  },
  {
    id: 21,
    question: "O que é um Centro de Distribuição (CD)?",
    options: ["A) Um escritório administrativo apenas", "B) Instalação para receber, armazenar e distribuir produtos", "C) Um tipo de caminhão", "D) Um sistema de cobrança"],
    correct: 1,
    curiosity: "O CD funciona como um hub que recebe grandes volumes e os redistribui com eficiência[cite: 1]."
  },
  {
    id: 22,
    question: "O que é um WMS?",
    options: ["A) Um tipo de piso industrial", "B) Warehouse Management System, sistema de gestão de armazém", "C) Um modelo de contrato de locação", "D) Um sistema de refrigeração"],
    correct: 1,
    curiosity: "O WMS controla em tempo real onde cada produto está armazenado e agiliza a separação[cite: 1]."
  },
  {
    id: 23,
    question: "O que é 'picking' em um galpão?",
    options: ["A) Processo de separação de produtos para montar um pedido", "B) Processo de limpeza do piso", "C) Processo de contratação de motoristas", "D) Tipo de estrutura metálica"],
    correct: 0,
    curiosity: "O picking é a separação de produtos; quanto mais eficiente o layout, mais rápido ele ocorre[cite: 1]."
  },
  {
    id: 24,
    question: "O que é 'put away' na operação de um armazém?",
    options: ["A) Processo de descarte de mercadoria danificada", "B) Processo de guardar a mercadoria recebida no local correto do estoque", "C) Processo de emissão de nota fiscal", "D) Processo de limpeza das docas"],
    correct: 1,
    curiosity: "O 'put away' correto evita que produtos fiquem perdidos ou mal posicionados no estoque[cite: 1]."
  },
  {
    id: 25,
    question: "Por que um fluxo 'em linha reta' costuma ser vantajoso no layout de um galpão?",
    options: ["A) Porque é mais bonito estruturalmente", "B) Porque evita cruzamento de operações e reduz o tempo de deslocamento interno", "C) Porque exige menos docas", "D) Porque dispensa iluminação"],
    correct: 1,
    curiosity: "Fluxos organizados evitam que empilhadeiras e pessoas cruzem caminhos, reduzindo gargalos[cite: 1]."
  },
  {
    id: 26,
    question: "O que são 'docas dedicadas'?",
    options: ["A) Docas exclusivas para visitantes", "B) Docas reservadas para operações específicas, como recebimento ou expedição", "C) Docas usadas apenas à noite", "D) Docas sem cobertura"],
    correct: 1,
    curiosity: "Separar docas por função evita que operações diferentes se atrapalhem, agilizando o fluxo[cite: 1]."
  },
  {
    id: 27,
    question: "O que é 'milk run' na logística?",
    options: ["A) Um tipo de galpão frigorificado", "B) Rota de coleta/entrega programada que passa por múltiplos pontos, otimizando o frete", "C) Um sistema de segurança patrimonial", "D) Um tipo de contrato de locação"],
    correct: 1,
    curiosity: "Rotas programadas coletam insumos de vários fornecedores de forma otimizada[cite: 1]."
  },
  {
    id: 28,
    question: "Por que a automação vem crescendo em galpões logísticos?",
    options: ["A) Porque reduz o tamanho do terreno necessário sempre", "B) Porque aumenta velocidade e precisão nas operações, reduzindo erros e custo por pedido", "C) Porque elimina a necessidade de docas", "D) Porque é obrigatória por lei"],
    correct: 1,
    curiosity: "Sistemas automatizados lidam melhor com o alto volume gerado pelo e-commerce com menos erros[cite: 1]."
  },
  {
    id: 29,
    question: "Por que muitos galpões logísticos ficam concentrados perto de rodovias e anéis viários?",
    options: ["A) Para reduzir o valor do terreno apenas", "B) Para facilitar o acesso rápido a múltiplos mercados consumidores", "C) Por exigência estética", "D) Porque não pode haver galpões dentro de cidades"],
    correct: 1,
    curiosity: "A proximidade com rodovias reduz o tempo e o custo de transporte até o consumidor final[cite: 1]."
  },
  {
    id: 30,
    question: "O que é um 'condomínio logístico'?",
    options: ["A) Um único galpão gigante", "B) Empreendimento com vários galpões compartilhando infraestrutura comum, como portaria e segurança", "C) Um tipo de contrato Built to Suit", "D) Um sistema de refrigeração compartilhado"],
    correct: 1,
    curiosity: "Condomínios permitem que empresas compartilhem custos de infraestrutura e segurança[cite: 1]."
  },
  {
    id: 31,
    question: "Por que o mercado de galpões logísticos cresceu tanto com o avanço do e-commerce?",
    options: ["A) Porque as lojas físicas desapareceram", "B) Porque aumentou a demanda por armazenagem e distribuição rápida de produtos", "C) Porque os preços de terrenos caíram no Brasil todo", "D) Não há relação entre os dois"],
    correct: 1,
    curiosity: "Cada compra online depende de armazenagem próxima para viabilizar prazos de entrega curtos[cite: 1]."
  },
  {
    id: 32,
    question: "O que é 'vacância' no mercado de galpões?",
    options: ["A) Período de manutenção obrigatória", "B) Percentual de área disponível/desocupada em um determinado mercado", "C) Um tipo de contrato", "D) Imposto sobre galpões vazios"],
    correct: 1,
    curiosity: "A taxa de vacância indica a relação entre oferta e demanda de galpões em uma região[cite: 1]."
  },
  {
    id: 33,
    question: "O que costuma caracterizar um galpão 'classe A'?",
    options: ["A) Ser o mais barato do mercado", "B) Alto padrão construtivo, boa localização e especificações técnicas modernas", "C) Ter menos de 5 anos de uso apenas", "D) Não ter docas"],
    correct: 1,
    curiosity: "Galpões classe A possuem pé-direito maior, piso reforçado e localização privilegiada[cite: 1]."
  },
  {
    id: 34,
    question: "Por que a proximidade com mão de obra qualificada influencia a escolha de um terreno para galpão?",
    options: ["A) Não influencia em nada", "B) Porque a operação depende de pessoal, e acesso a trabalhadores facilita a rotina", "C) Porque reduz o valor do IPTU", "D) Porque é exigência apenas em grandes capitais"],
    correct: 1,
    curiosity: "Fácil acesso a trabalhadores evita dificuldades de contratação e manutenção de equipes[cite: 1]."
  },
  {
    id: 35,
    question: "O que costuma ser avaliado antes de definir o terreno de um projeto Built to Suit?",
    options: ["A) Somente o preço do terreno", "B) Acesso viário, infraestrutura, logística e proximidade de mercados consumidores", "C) Apenas o tamanho do terreno", "D) A cor do solo"],
    correct: 1,
    curiosity: "A escolha do terreno envolve uma análise técnica robusta, já que o galpão operará ali por anos[cite: 1]."
  },
  {
    id: 36,
    question: "O que é o zoneamento urbano em relação a áreas logísticas/industriais?",
    options: ["A) Não existe diferenciação legal", "B) Normas que definem onde atividades industriais e logísticas podem ser construídas", "C) Uma proibição total de galpões em cidades", "D) Um tipo de certificação ambiental"],
    correct: 1,
    curiosity: "O zoneamento equilibra o crescimento industrial com a qualidade das áreas residenciais[cite: 1]."
  },
  {
    id: 37,
    question: "O que é uma certificação como LEED aplicada a um galpão?",
    options: ["A) Um selo de qualidade da mercadoria armazenada", "B) Um selo que reconhece boas práticas de sustentabilidade na construção e operação do imóvel", "C) Um tipo de seguro obrigatório", "D) Uma classificação de segurança contra incêndio"],
    correct: 1,
    curiosity: "Selo LEED avalia eficiência energética, uso de água e materiais sustentáveis na construção[cite: 1]."
  },
  {
    id: 38,
    question: "Por que a captação de água de chuva é comum em projetos modernos de galpões?",
    options: ["A) É proibida em outros tipos de construção", "B) Reduz o consumo de água potável em limpeza e áreas externas", "C) Serve apenas para decoração", "D) Não tem nenhuma vantagem prática"],
    correct: 1,
    curiosity: "A água captada é reaproveitada em descargas e limpeza de pátios, reduzindo custos[cite: 1]."
  },
  {
    id: 39,
    question: "Para que servem painéis solares instalados na cobertura de alguns galpões?",
    options: ["A) Apenas para sombrear o telhado", "B) Gerar energia elétrica, reduzindo custo operacional e emissões", "C) Aumentar o peso da estrutura de propósito", "D) Substituir o telhado translúcido sempre"],
    correct: 1,
    curiosity: "A grande área de cobertura dos galpões torna-os ideais para geração de energia solar[cite: 1]."
  },
  {
    id: 40,
    question: "O que faz a iluminação por sensores de presença em um galpão?",
    options: ["A) Acende luzes aleatoriamente", "B) Acende apenas onde há movimento, economizando energia", "C) Serve como sistema de alarme contra incêndio", "D) Substitui as câmeras de segurança"],
    correct: 1,
    curiosity: "Sensores evitam manter áreas extensas iluminadas o tempo todo, gerando economia real[cite: 1]."
  },
  {
    id: 41,
    question: "O que é ventilação cruzada em um projeto de galpão?",
    options: ["A) Um tipo de sistema elétrico", "B) Uso da circulação natural do ar para reduzir a temperatura interna sem gastar energia com ar-condicionado", "C) Um tipo de porta de doca", "D) Um sistema de captação de água"],
    correct: 1,
    curiosity: "Aberturas estratégicas permitem circulação natural de ar, reduzindo custos de climatização[cite: 1]."
  },
  {
    id: 42,
    question: "Por que sensores de temperatura e umidade são usados em alguns galpões?",
    options: ["A) Apenas para fins estatísticos", "B) Para monitorar e proteger produtos sensíveis, como alimentos ou farmacêuticos", "C) Para calcular o valor do aluguel", "D) Para substituir o sistema de segurança"],
    correct: 1,
    curiosity: "Produtos sensíveis estragam fora da faixa ideal; o monitoramento contínuo evita perdas[cite: 1]."
  },
  {
    id: 43,
    question: "O que é uma câmara fria dentro de um centro de distribuição?",
    options: ["A) Uma sala de reuniões", "B) Uma área com temperatura controlada para armazenar produtos perecíveis", "C) Um tipo de doca", "D) Um sistema de segurança"],
    correct: 1,
    curiosity: "Câmaras frias permitem estocar produtos perecíveis com controle rigoroso de temperatura[cite: 1]."
  },
  {
    id: 44,
    question: "O que é IoT aplicado à gestão de um galpão?",
    options: ["A) Um tipo de estrutura metálica", "B) Sensores conectados que monitoram em tempo real estoque, temperatura e movimentação", "C) Um novo tipo de contrato de locação", "D) Um sistema de iluminação apenas"],
    correct: 1,
    curiosity: "A Internet das Coisas monitora indicadores em tempo real para antecipar problemas[cite: 1]."
  },
  {
    id: 45,
    question: "Por que a eficiência energética reduz o custo total de operação de um galpão ao longo do tempo?",
    options: ["A) Ela não influencia o custo operacional", "B) Mesmo com investimento inicial maior, o gasto menor com energia compensa no longo prazo", "C) Ela aumenta o valor do aluguel sempre", "D) Só afeta o custo de construção"],
    correct: 1,
    curiosity: "Gastos menores com energia compensam o investimento inicial ao longo da vida útil do imóvel[cite: 1]."
  },
  {
    id: 46,
    question: "Para que drones vêm sendo usados em alguns centros de distribuição?",
    options: ["A) Para entregar produtos dentro do próprio galpão", "B) Para conferência de estoque em altura, agilizando inventários", "C) Para climatização do ambiente", "D) Para segurança contra incêndio"],
    correct: 1,
    curiosity: "Drones leem códigos em prateleiras altas rapidamente, reduzindo o tempo de inventários manuais[cite: 1]."
  },
  {
    id: 47,
    question: "O que é uma brigada de incêndio em um galpão?",
    options: ["A) Um tipo de seguro obrigatório", "B) Equipe treinada para agir em situações de princípio de incêndio", "C) Um sistema automático de sprinklers", "D) Um órgão público externo apenas"],
    correct: 1,
    curiosity: "Equipes treinadas reduzem o tempo de resposta antes da chegada dos bombeiros[cite: 1]."
  },
  {
    id: 48,
    question: "Por que sprinklers (chuveiros automáticos) são comuns em galpões logísticos?",
    options: ["A) Para climatizar o ambiente", "B) Para combate automático a princípios de incêndio, protegendo mercadoria e pessoas", "C) Para limpeza do piso", "D) Para irrigação de plantas internas"],
    correct: 1,
    curiosity: "Sprinklers detectam calor elevado e contêm princípios de incêndio automaticamente[cite: 1]."
  },
  {
    id: 49,
    question: "O que é EPI?",
    options: ["A) Um tipo de piso industrial", "B) Equipamento de Proteção Individual, usado para prevenir acidentes de trabalho", "C) Um sistema de gestão de estoque", "D) Um tipo de doca de carga"],
    correct: 1,
    curiosity: "Capacetes, luvas e calçados de segurança previnem acidentes nas operações logísticas[cite: 1]."
  },
  {
    id: 50,
    question: "Por que o cronograma de obra de um projeto Built to Suit costuma ser alinhado ao contrato de locação desde o início?",
    options: ["A) Não costuma ter relação nenhuma", "B) Para alinhar a entrega do imóvel com a necessidade operacional do cliente, evitando atrasos que impactem o negócio", "C) Porque a lei exige isso em todos os casos", "D) Apenas por uma questão contábil"],
    correct: 1,
    curiosity: "O prazo de obra é planejado para coincidir com a necessidade de funcionamento do cliente[cite: 1]."
  }
];

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
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 5));
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
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setGameState('curiosity');
    }, 400);
  };

  const nextStep = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < selectedQuestions.length) {
      setCurrentIndex(prev + 1);
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

      {/* CABEÇALHO COM LOGOS REDimensionadas E COM ESPAÇAMENTO MAIOR DA CAIXA */}
      <header className="relative z-20 w-full max-w-md flex justify-between items-center pt-4 mb-8">
        <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-4 py-2 rounded-xl shadow-xl flex items-center h-16 w-36 justify-center overflow-hidden">
          <img src={logoMaquisul} alt="Logo Maquisul" className="w-full h-full object-contain object-center p-1" />
        </div>

        <div className="bg-neutral-900/90 backdrop-blur-md border border-neutral-700 px-4 py-2 rounded-xl shadow-xl flex items-center h-16 w-36 justify-center overflow-hidden">
          <img src={logoAlfa} alt="Logo Alfa BTS" className="w-full h-full object-contain object-center p-1" />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL COM MAIS DISTÂNCIA DO TOPO */}
      <main className="relative z-10 w-full max-w-md my-auto flex flex-col justify-center mt-4">
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