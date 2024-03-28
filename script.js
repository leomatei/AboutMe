function openLanguageDropDown() {
  const languages = document.getElementById('languages')
  languages.classList.contains('hidden')
    ? languages.classList.remove('hidden')
    : languages.classList.add('hidden')
}
function changeLanguageMainPage(lang) {
  const language = {
    en: {
      appDescription: 'Links and info',
      altPhoto: 'photo of me',
      aboutMe: 'About me',
      myDescription:
        'Started as a FrontEnd developer at SF App Works from Jun 2021. In September 2022 I transitioned to FullStack developer. Excited to further expand my expertise and contribute to innovative solutionsin the realm of FullStack development.',
      portofolio: 'Click here to see my projects!',
      portofolioLink: 'See my portfolio',
      linkedinLink: 'See my LinkedIn profile',
      githubLink: 'See my GitHub profile',
      email: 'Send me an e-mail!',
    },
    ro: {
      appDescription: 'Informații despre mine și link-uri utile',
      altPhoto: 'O poză cu mine',
      aboutMe: 'Despre mine',
      myDescription:
        'Am început ca și FrontEnd Developer in octombrie 2021. În septembrie 2022 am început sa lucrez ca și FullStack Developer. Vreau să ajung pe o poziție de Senior.',
      portofolio: 'Aici îmi poți vedea portofoliul!',
      portofolioLink: 'Intră pe portofoliul meu de proiecte',
      linkedinLink: 'Intră pe profilul meu de LinkedIn',
      githubLink: 'Intră pe profilul meu de GitHub',
      email: 'Trimite-mi un mail!',
    },
  }

  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', language[lang].appDescription)
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute('content', language[lang].appDescription)
  document
    .querySelector('meta[property="article:section"]')
    .setAttribute('content', language[lang].appDescription)
  document
    .querySelector('meta[property="og:title"]')
    .setAttribute(
      'content',
      `Matei Leonard-Marian - ${language[lang].appDescription}`
    )
  document
    .querySelector('.Avatar img')
    .setAttribute('alt', language[lang].altPhoto)
  document.querySelector('title').textContent =
    `Matei Leonard-Marian - ${language[lang].appDescription}`
  document.querySelector('.DescrierePrincipala').textContent =
    language[lang].appDescription
  document.querySelector('.ListaDescriereTitlu span:nth-child(2)').textContent =
    language[lang].aboutMe
  document.querySelector('.ListaDescriereText').textContent =
    language[lang].myDescription
  document.querySelector('#portfolio .ListaText').textContent =
    language[lang].portofolio
  document
    .getElementById('portfolio')
    .setAttribute('title', language[lang].linkedinLink)
  document
    .getElementById('linkedinLink')
    .setAttribute('title', language[lang].linkedinLink)
  document
    .getElementById('githubLink')
    .setAttribute('title', language[lang].githubLink)
  document.getElementById('email').setAttribute('title', language[lang].email)
}

function selectLanguage(language) {
  if (language === null) {
    language = 'en'
  }
  document.documentElement?.setAttribute(
    'lang',
    language === 'ro' ? 'ro-RO' : 'en-US'
  )
  window.localStorage.setItem('language', language)
  document
    .querySelector('.LanguageButton .language-icon')
    ?.setAttribute(
      'src',
      language === 'ro' ? './assets/ro.svg' : './assets/gb.svg'
    )
  changeLanguageMainPage(language)
}

function toggleReadMore(id, element) {
  if (document.getElementById(id).classList.contains('hidden')) {
    document.getElementById(id).classList.remove('hidden')
  } else {
    document.getElementById(id).classList.add('hidden')
  }
  if (element.querySelector('img').classList.contains('rotate')) {
    element.querySelector('img').classList.remove('rotate')
  } else {
    element.querySelector('img').classList.add('rotate')
  }
}

function expandItsSection(id) {
  const element = document.getElementById(id)
  const parent = element.parentNode.parentNode
  if (parent.classList.contains('hidden')) {
    parent.classList.remove('hidden')
  }
  return
}

function expandPicture(image) {
  const biggerImage = image.src.replace('small', 'big')
  const newImage = document.createElement('img')
  const newDiv = document.createElement('div')

  let images = []
  Array.from(image.parentNode.parentNode.children).forEach((node) => {
    images.push(node.firstElementChild.src)
  })

  let bigImages = []

  images.forEach((smallImageLink) =>
    bigImages.push(smallImageLink.replace('small', 'big'))
  )

  const rightArrow = document.createElement('img')
  rightArrow.src = './assets/down-arrow.svg'
  rightArrow.classList.add('rightArrow')
  rightArrow.addEventListener('click', (e) => {
    e.stopPropagation()
    const currentIndex = bigImages.indexOf(
      document.querySelector('.biggerImage').src
    )
    document.querySelector('.biggerImage').src =
      bigImages[(currentIndex + 1) % bigImages.length]
  })

  const leftArrow = document.createElement('img')
  leftArrow.src = './assets/down-arrow.svg'
  leftArrow.classList.add('leftArrow')
  leftArrow.addEventListener('click', (e) => {
    e.stopPropagation()
    const currentIndex = bigImages.indexOf(
      document.querySelector('.biggerImage').src
    )
    document.querySelector('.biggerImage').src =
      bigImages[(currentIndex + bigImages.length - 1) % bigImages.length]
  })

  newImage.src = biggerImage
  newImage.classList.add('biggerImage')
  newDiv.appendChild(newImage)
  newDiv.classList.add('popUp')

  newDiv.insertAdjacentElement('afterbegin', leftArrow)
  newDiv.insertAdjacentElement('beforeend', rightArrow)

  document.getElementById('root').insertAdjacentElement('beforebegin', newDiv)

  newDiv.addEventListener('click', (event) => {
    if (event.srcElement !== newImage) {
      document.querySelector('html').removeChild(newDiv)
      delete newImage
      delete newDiv
    }
  })
}

selectLanguage(window.localStorage.getItem('language'))
