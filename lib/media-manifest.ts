/**
 * Fonte única de curadoria de mídia. Consumido por:
 *  - scripts/assets/*.mjs (pipeline de processamento: resize, transcode, extração de frame)
 *  - components/gallery/masonry-gallery.tsx e components/showreel/showreel.tsx (render)
 *
 * `source` é o caminho do arquivo bruto (relativo à raiz do projeto, dentro de MIDIAS/
 * ou public/work/) usado SOMENTE pelo pipeline. Componentes React nunca importam `source`
 * diretamente — usam os helpers `galleryImageSrc` / `showreelVideoSrc` abaixo, que apontam
 * para os arquivos já processados em public/optimized e public/showreel.
 */

export type GalleryItem = {
  slug: string
  source: string
  alt: string
  width: number
  height: number
  /** Apenas para itens cuja fonte é um vídeo: timestamp (segundos) do frame a extrair. */
  extractFrameAt?: number
}

export type GalleryCategory = {
  id: string
  label: string
  description: string
  items: GalleryItem[]
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: 'casamentos',
    label: 'Casamentos',
    description: 'Cerimônia, celebração e os detalhes que ficam para a vida toda.',
    items: [
      { slug: 'eucalyptus', source: 'public/work/eucalyptus.jpg', alt: 'Casal abraçado em meio a um bosque de eucaliptos', width: 4000, height: 6000 },
      { slug: 'chapel-dance', source: 'public/work/chapel-dance.jpg', alt: 'Noivos dançando em frente a uma capela de pedra', width: 4000, height: 6000 },
      { slug: 'couple-field', source: 'public/work/couple-field.jpg', alt: 'Casal em um campo aberto sob a luz da tarde', width: 4000, height: 6000 },
      { slug: 'closeup', source: 'public/work/closeup.jpg', alt: 'Close-up íntimo do casal de noivos, testas quase se tocando', width: 4000, height: 6000 },
      { slug: 'hands', source: 'public/work/hands.jpg', alt: 'Mãos entrelaçadas da noiva, anel em destaque na luz', width: 4000, height: 6000 },
      { slug: 'rings', source: 'public/work/rings.jpg', alt: 'Alianças de casamento sobre um livro com capa ilustrada', width: 4000, height: 6000 },
      { slug: 'alianca-noivado', source: 'MIDIAS/2O7A0782.jpg', alt: 'Mãos entrelaçadas do casal com aliança de noivado em luz dramática', width: 4000, height: 6000 },
      { slug: 'danca-igrejinha', source: 'MIDIAS/2O7A1008.jpg', alt: 'Noivos dançando e girando em frente à igrejinha de tijolo', width: 4000, height: 6000 },
      { slug: 'bosque-eucaliptos', source: 'MIDIAS/2O7A1020.jpg', alt: 'Casal abraçado em plano aberto no bosque de eucaliptos', width: 4000, height: 6000 },
      { slug: 'quase-beijo', source: 'MIDIAS/2O7A1036.jpg', alt: 'Close-up íntimo de casal quase se beijando ao ar livre', width: 4000, height: 6000 },
      { slug: 'countryside', source: 'MIDIAS/2O7A1172.jpg', alt: 'Casal abraçado em fazenda, cavalo ao fundo', width: 4000, height: 6000 },
      { slug: 'mesa-posta', source: 'MIDIAS/2O7A2435.jpg', alt: 'Mesa posta com arranjos de flores brancas e velas para a recepção', width: 4000, height: 6000 },
      { slug: 'reception-dance', source: 'MIDIAS/2O7A2905.jpg', alt: 'Casal dançando na recepção sob luzes amareladas', width: 4000, height: 6000 },
      { slug: 'ensaio-silhueta', source: 'MIDIAS/2O7A5384.jpg', alt: 'Silhueta de casal abraçado na porta da igrejinha, contraluz', width: 4000, height: 6000 },
      { slug: 'ensaio-terco', source: 'MIDIAS/2O7A5394.jpg', alt: 'Casal sorrindo com terço nas mãos, ensaio em preto e branco', width: 4000, height: 6000 },
      { slug: 'ensaio-altar', source: 'MIDIAS/2O7A5411.jpg', alt: 'Casal em frente ao altar e crucifixo, ensaio religioso em preto e branco', width: 4000, height: 6000 },
      { slug: 'ensaio-oracao', source: 'MIDIAS/2O7A5445.jpg', alt: 'Casal de mãos dadas em oração no banco da igreja, preto e branco', width: 4000, height: 6000 },
      { slug: 'ensaio-luz-dourada', source: 'MIDIAS/2O7A6016.jpg', alt: 'Casal abraçado em quarto com luz dourada ao entardecer', width: 4000, height: 6000 },
      { slug: 'sapatos-noiva', source: 'MIDIAS/2O7A9628.jpg', alt: 'Sapatos brancos da noiva pendurados em porta dourada de vidro', width: 4000, height: 6000 },
      { slug: 'acessorios-noiva', source: 'MIDIAS/2O7A9679.jpg', alt: 'Flatlay de acessórios da noiva: perfume, brincos e sapatos em mesa de madeira', width: 4000, height: 6000 },
    ],
  },
  {
    id: 'batismo',
    label: 'Batismo & Religioso',
    description: 'Momentos de fé registrados com delicadeza dentro da igreja.',
    items: [
      { slug: 'congregacao', source: 'MIDIAS/IMG_8453.jpg', alt: 'Família em pé durante a cerimônia, vitrais ao fundo', width: 1365, height: 2048 },
      { slug: 'agua-batismal', source: 'MIDIAS/IMG_8592.jpg', alt: 'Padre derramando água batismal sobre o bebê', width: 1365, height: 2048 },
      { slug: 'beijo-altar', source: 'MIDIAS/IMG_9060.jpg', alt: 'Pais beijando o bebê diante da imagem sacra', width: 1365, height: 2048 },
      { slug: 'nossa-senhora', source: 'MIDIAS/IMG_9120.jpg', alt: 'Família diante da imagem de Nossa Senhora de Fátima', width: 1365, height: 2048 },
    ],
  },
  {
    id: 'familia',
    label: 'Família & Recém-nascidos',
    description: 'Afeto cotidiano, do quarto de bebê ao parque com bolhas de sabão.',
    items: [
      { slug: 'bolhas-de-sabao', source: 'MIDIAS/2O7A8082.jpg', alt: 'Família soprando bolhas de sabão no parque', width: 4000, height: 6000 },
      { slug: 'pai-e-filho', source: 'MIDIAS/2O7A8221.jpg', alt: 'Pai brincando com o filho pequeno no jardim', width: 4000, height: 6000 },
      { slug: 'familia-jardim', source: 'MIDIAS/2O7A8267.jpg', alt: 'Pais e filho brincando e rindo juntos no jardim', width: 4000, height: 6000 },
      { slug: 'mae-levanta-filho', source: 'MIDIAS/2O7A8307.jpg', alt: 'Mãe levantando o filho nos braços com alegria no jardim', width: 4000, height: 6000 },
      { slug: 'amamentacao', source: 'MIDIAS/2O7A8490.jpg', alt: 'Mãe amamentando recém-nascido com pai ao lado no quarto do bebê', width: 1365, height: 2048 },
      { slug: 'recem-nascido', source: 'MIDIAS/2O7A8570.jpg', alt: 'Mãe beijando a testa do recém-nascido', width: 1365, height: 2048 },
      { slug: 'quarto-de-bebe', source: 'MIDIAS/2O7A9589.jpg', alt: 'Pais com o bebê no quarto da casa, luz suave de janela', width: 4000, height: 6000 },
    ],
  },
  {
    id: 'festas',
    label: 'Festas Infantis',
    description: 'Balões, bolo e a alegria genuína das celebrações infantis.',
    items: [
      { slug: 'bebe-festa-cogumelo', source: 'MIDIAS/2O7A0291.jpg', alt: 'Bebê sorridente na cadeirinha em festa temática de cogumelo com balões coloridos', width: 4000, height: 5862 },
      { slug: 'bolo-tomas', source: 'MIDIAS/2O7A5737.jpg', alt: 'Bolo de aniversário em camadas, tema ursinho azul e branco', width: 4000, height: 6000 },
      { slug: 'happy-birthday', source: 'MIDIAS/2O7A6034.jpg', alt: 'Mãe segurando criança em frente a painel de balões de aniversário', width: 4000, height: 6000 },
      { slug: 'turma-da-juju', source: 'MIDIAS/Turma da Juju.mov', alt: 'Mãe e filha em festa infantil decorada com balões coloridos', width: 1440, height: 2560, extractFrameAt: 12 },
    ],
  },
  {
    id: 'cobertura-de-eventos',
    label: 'Cobertura de Eventos',
    description: 'Gastronomia, branding e varejo — eventos com direção de arte e olhar editorial.',
    items: [
      { slug: 'boutique-interior', source: 'MIDIAS/ANGSTLLmov.mp4', alt: 'Interior de boutique de roupas com araras e mesa de atendimento', width: 1080, height: 1920, extractFrameAt: 4 },
      { slug: 'defumados-artesanais', source: 'MIDIAS/Marchetti .MOV', alt: 'Produtores artesanais exibindo carnes defumadas em evento gastronômico', width: 1080, height: 1920, extractFrameAt: 6 },
      { slug: 'carta-de-valores', source: 'MIDIAS/Rosa Felipe - Carta de Valores  Gino Prado .MP4', alt: 'Vídeo carta de valores para a marca Rosa Felipe com Gino Prado', width: 1080, height: 1920, extractFrameAt: 5 },
    ],
  },
  {
    id: 'gestante',
    label: 'Gestante',
    description: 'A beleza da espera: ensaios gestantes com luz, emoção e delicadeza.',
    items: [
      { slug: 'gestante-tecidos', source: 'MIDIAS/IMG_0095.jpg', alt: 'Casal grávido entre tecidos brancos ao ar livre, luz suave', width: 4000, height: 6000 },
      { slug: 'gestante-renda', source: 'MIDIAS/IMG_0154.jpg', alt: 'Gestante sorrindo com blusa de renda, segurando a barriga ao ar livre', width: 4000, height: 6000 },
      { slug: 'gestante-porta', source: 'MIDIAS/IMG_9950.jpg', alt: 'Gestante apoiada em porta de madeira rústica com vestido branco', width: 4000, height: 6000 },
    ],
  },
]

export type ShowreelVideo = {
  id: string
  label: string
  category: string
  source: string
  vertical: boolean
  durationSeconds: number
  hasAudio: boolean
  /** Recorte usado nos cards (preview ambiente em loop) — o vídeo principal não usa isso, toca na íntegra. */
  previewStart?: number
  previewDuration?: number
}

/** Vídeo principal/hero do Showreel — também é a fonte do loop ambiente da Hero section. */
export const SHOWREEL_FEATURED: ShowreelVideo = {
  id: 'base',
  label: 'Reel principal',
  category: 'Marca pessoal',
  source: 'MIDIAS/VIDEO-BASE.mp4',
  vertical: true,
  durationSeconds: 87,
  hasAudio: true,
}

export const SHOWREEL_CASES: ShowreelVideo[] = [
  {
    id: 'casamentos',
    label: 'Casamento Gessika & Igor',
    category: 'Casamentos',
    source: 'MIDIAS/Casamento Gessika e Igor .mp4',
    vertical: true,
    durationSeconds: 218,
    hasAudio: false,
    previewStart: 20,
    previewDuration: 14,
  },
  {
    id: 'gastronomia',
    label: 'Marchetti',
    category: 'Gastronomia · Branding',
    source: 'MIDIAS/Marchetti .MOV',
    vertical: true,
    durationSeconds: 90,
    hasAudio: false,
    previewStart: 10,
    previewDuration: 14,
  },
  {
    id: 'festas',
    label: 'Turma da Juju',
    category: 'Eventos Infantis',
    source: 'MIDIAS/Turma da Juju.mov',
    vertical: true,
    durationSeconds: 205,
    hasAudio: false,
    previewStart: 15,
    previewDuration: 14,
  },
  {
    id: 'branding',
    label: 'ANGSTLL',
    category: 'Branding · Varejo',
    source: 'MIDIAS/ANGSTLLmov.mp4',
    vertical: true,
    durationSeconds: 73,
    hasAudio: false,
    previewStart: 5,
    previewDuration: 14,
  },
  {
    id: 'carta-de-valores',
    label: 'Rosa Felipe · Carta de Valores',
    category: 'Cobertura de Eventos',
    source: 'MIDIAS/Rosa Felipe - Carta de Valores  Gino Prado .MP4',
    vertical: true,
    durationSeconds: 60,
    hasAudio: true,
    previewStart: 5,
    previewDuration: 14,
  },
]

export const RESPONSIVE_WIDTHS = [800, 1200, 1600, 2400] as const
export type ResponsiveWidth = (typeof RESPONSIVE_WIDTHS)[number]

export function galleryImageSrc(categoryId: string, slug: string, width: ResponsiveWidth = 1600) {
  return `/optimized/${categoryId}/${slug}-${width}.webp`
}

export function galleryImageSrcSet(categoryId: string, slug: string) {
  return RESPONSIVE_WIDTHS.map((w) => `${galleryImageSrc(categoryId, slug, w)} ${w}w`).join(', ')
}

export function showreelVideoSrc(id: string, ext: 'mp4' | 'webm' | 'jpg' = 'mp4') {
  const suffix = ext === 'jpg' ? `${id}-poster.jpg` : `${id}.${ext}`
  return `/showreel/${suffix}`
}

export function heroLoopSrc() {
  return '/motion/hero-loop.mp4'
}

export function introVideoSrc() {
  return '/motion/intro.mp4'
}

export function backgroundVideoSrc(name: 'particles' | 'light-sweep' | 'fog' | 'waves') {
  return `/motion/backgrounds/${name}.mp4`
}
