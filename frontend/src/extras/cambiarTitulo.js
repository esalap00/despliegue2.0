export function cambiarTituloSiUsuarioSeVa(){
    let previusTitle = document.title

    window.addEventListener('blur', () => {
        previusTitle = document.title
        document.title = '¡No te vayas! ¡Vuelve hombre!'
    })

    window.addEventListener('focus', () => {
        document.title = previusTitle
    })
}