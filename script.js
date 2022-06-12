// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./service-worker.js');
// }
function openLanguageDropDown(){
    const languages = document.getElementById('languages')
    languages.classList.contains('hidden') ? 
    languages.classList.remove('hidden') :
    languages.classList.add('hidden')

}
function changeLanguage(lang){
    const language={
        'en':{
            appDescription: 'Links and info',
            aboutMe: 'About me',
            myDescription: 'FrontEnd developer at SF App Works from Oct 2021. I am trying my best to become a FullStack developer.',
        },
        'ro':{
            appDescription: 'Informații despre mine și link-uri utile',
            aboutMe: 'Despre mine',
            myDescription: 'FrontEnd developer la SF App Works din octombrie 2021. Îmi doresc să ajung pe o poziție de FullStack developer.',
        }
    }
    document.querySelector('meta[name="description"]').setAttribute('content',language[lang].appDescription)
    document.querySelector('meta[property="og:description"]').setAttribute('content',language[lang].appDescription)
    document.querySelector('meta[property="og:title"]').setAttribute('content',`Matei Leonard-Marian - ${language[lang].appDescription}`)
    document.querySelector('title').textContent=`Matei Leonard-Marian - ${language[lang].appDescription}`
    document.querySelector('.DescrierePrincipala').textContent = language[lang].appDescription
    document.querySelector('.ListaDescriereTitlu span:nth-child(2)').textContent = language[lang].aboutMe
    document.querySelector('.ListaDescriereText').textContent = language[lang].myDescription
}
function selectLanguage(language){
    window.localStorage.setItem('language',language)
    document.querySelector('.LanguageButton .language-icon').setAttribute('src',language==='ro'?'./ro.svg':'./gb.svg')
    changeLanguage(language)
}
