function openLanguageDropDown(){
    const languages = document.getElementById('languages')
    languages.classList.contains('hidden') ? 
    languages.classList.remove('hidden') :
    languages.classList.add('hidden')

}
function changeLanguageMainPage(lang){
    const language={
        'en':{
            appDescription: 'Links and info',
            altPhoto: 'photo of me',
            aboutMe: 'About me',
            myDescription: 'FrontEnd developer at SF App Works from Oct 2021. I am trying my best to become a FullStack developer.',
            portofolio: 'Click here to see my projects!',
            portofolioLink: 'See my portofolio',
            linkedinLink: 'See my LinkedIn profile',
            githubLink: 'See my GitHub profile',
            email: 'Send me an e-mail!'
        },
        'ro':{
            appDescription: 'Informații despre mine și link-uri utile',
            altPhoto: 'O poză cu mine',
            aboutMe: 'Despre mine',
            myDescription: 'FrontEnd developer la SF App Works din octombrie 2021. Îmi doresc să ajung pe o poziție de FullStack developer.',
            portofolio: 'Aici îmi poți vedea portofoliul!',
            portofolioLink: 'Intră pe portofoliul meu de proiecte',
            linkedinLink: 'Intră pe profilul meu de LinkedIn',
            githubLink: 'Intră pe profilul meu de GitHub',
            email: 'Trimite-mi un mail!'
        }
    }

    document.querySelector('meta[name="description"]').setAttribute('content',language[lang].appDescription)
    document.querySelector('meta[property="og:description"]').setAttribute('content',language[lang].appDescription)
    document.querySelector('meta[property="article:section"]').setAttribute('content',language[lang].appDescription)
    document.querySelector('meta[property="og:title"]').setAttribute('content',`Matei Leonard-Marian - ${language[lang].appDescription}`)
    document.querySelector('.Avatar img').setAttribute('alt',language[lang].altPhoto)
    document.querySelector('title').textContent=`Matei Leonard-Marian - ${language[lang].appDescription}`
    document.querySelector('.DescrierePrincipala').textContent = language[lang].appDescription
    document.querySelector('.ListaDescriereTitlu span:nth-child(2)').textContent = language[lang].aboutMe
    document.querySelector('.ListaDescriereText').textContent = language[lang].myDescription
    document.querySelector('#portofolio .ListaText').textContent = language[lang].portofolio
    document.getElementById('portofolio').setAttribute('title', language[lang].linkedinLink)
    document.getElementById('linkedinLink').setAttribute('title', language[lang].linkedinLink)
    document.getElementById('githubLink').setAttribute('title', language[lang].githubLink)
    document.getElementById('email').setAttribute('title', language[lang].email)
}

function changeLanguagePortofolio(lang){
    const language = {
        'en':{
            pageTitle: 'portofolio',
            pageDescription: 'My projects as a developer',
            title: 'My projects',
            description: 'Below you can see projects i worked for. There are projects from my job, projects from school and personal projects.',
        },
        'ro':{
            pageTitle: 'portofoliu',
            pageDescription: 'Proiectele mele personale și la care am contribuit',
            title: 'Proiectele mele',
            description: 'Mai jos sunt proiectele mele personale, unele folosite în cadrul facultății și proiectele la care am contribuit lucrând în cadrul poziției mele de Web developer.',
        },
    }

    document.querySelector('meta[name="description"]').setAttribute('content',language[lang].pageDescription)
    document.querySelector('meta[property="og:description"]').setAttribute('content',language[lang].pageDescription)
    document.querySelector('meta[property="article:section"]').setAttribute('content',language[lang].pageDescription)
    document.querySelector('meta[property="og:title"]').setAttribute('content',`Matei Leonard-Marian - ${language[lang].pageTitle}`)
    document.querySelector('title').textContent=`Matei Leonard-Marian - ${language[lang].pageTitle}`
    document.querySelector('.TitlulPaginii strong').textContent = language[lang].title
    document.querySelector('.DescrierePrincipala').textContent = language[lang].description
}

function selectLanguage(language){
    if(language===null){
        language = 'en'
    }
    document.documentElement.setAttribute("lang", language==='ro'?'ro-RO':'en-US');
    window.localStorage.setItem('language',language)
    document.querySelector('.LanguageButton .language-icon').setAttribute('src',language==='ro'?'./assets/ro.svg':'./assets/gb.svg')
   
    

    if(window.location.href.toString().split(window.location.host)[1] === '/' ||
    window.location.href.toString().split(window.location.host)[1] === '/index.html' ){
        changeLanguageMainPage(language)
    }else {
        changeLanguagePortofolio(language)
    }
}

function expandReadMore(id,element){
    element.querySelector('img').style.transform='rotate(180deg)'
    if(document.getElementById(id).classList.contains('hidden')){
        document.getElementById(id).classList.remove('hidden')
        element.querySelector('img').style.transform='rotate(180deg)'
    } else {
        document.getElementById(id).classList.add('hidden')
        element.querySelector('img').style.transform=''
    }
}

function expandPicture(image){
    const biggerImage = image.src.replace('small','big')
    const newImage=document.createElement('img')
    const newDiv=document.createElement('div')

    

    let images=[]
    Array.from(image.parentNode.parentNode.children).forEach(node=>{
        images.push(node.firstElementChild.src)
    })

    let bigImages=[]

    images.forEach(smallImageLink=>bigImages.push(smallImageLink.replace('small','big')))


    const rightArrow=document.createElement('img')
    rightArrow.src='./assets/down-arrow.svg'
    rightArrow.classList.add('rightArrow')
    rightArrow.addEventListener('click',(e)=>{
        e.stopPropagation()
        const currentIndex = bigImages.indexOf(document.querySelector('.biggerImage').src)
        document.querySelector('.biggerImage').src = bigImages[(currentIndex+1)%(bigImages.length)]
    })

    const leftArrow=document.createElement('img')
    leftArrow.src='./assets/down-arrow.svg'
    leftArrow.classList.add('leftArrow')
    leftArrow.addEventListener('click',(e)=>{
        e.stopPropagation()
        const currentIndex = bigImages.indexOf(document.querySelector('.biggerImage').src)
        document.querySelector('.biggerImage').src = bigImages[(currentIndex+bigImages.length-1)%(bigImages.length)]
    })

    newImage.src=biggerImage
    newImage.classList.add('biggerImage')
    newDiv.appendChild(newImage)
    newDiv.classList.add('popUp')

    newDiv.insertAdjacentElement('afterbegin',leftArrow)
    newDiv.insertAdjacentElement('beforeend',rightArrow)
    
    document.getElementById('root').insertAdjacentElement('beforebegin',newDiv)



    newDiv.addEventListener('click',(event)=>{
        if(event.srcElement !== newImage){
            document.querySelector('html').removeChild(newDiv)
            delete newImage
            delete newDiv
        }
    })
    
}

selectLanguage(window.localStorage.getItem('language'))
