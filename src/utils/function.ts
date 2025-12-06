export const spaghetti = (theme:boolean) => {
    let dark = false
    if(theme || window.matchMedia('(prefers-color-scheme: dark').matches){
        document.documentElement.classList.add('dark')
        dark = true
    }else{
        document.documentElement.classList.remove('dark')
        dark = false
    }
    return dark
}

export const FDarkT = (theme:boolean) => {
    if(!theme) document.documentElement.classList.remove('dark')
    else document.documentElement.classList.add('dark')
    return theme
}

export const toMoney = (n:number) =>  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")