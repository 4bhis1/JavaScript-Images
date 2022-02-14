
let div_cont=document.getElementById("container")
const APIkey="WPrqAtDL8tytBGCu9m4bso_gj4xblNIp_CblnGxvtUs"
let txt

let addImage = (obj) => {

    for(let i of obj["results"]){

        let div_containerInside = document.createElement("div")
        div_containerInside.classList.add("cont")

            let img=document.createElement("img")
            img.src=i.urls.regular
            img.height=400
            img.width=400

            let div_values = document.createElement("div")
            div_values.classList.add("values")

                let div_firstColumn = document.createElement("div")
                div_firstColumn.classList.add("firstColumn")

                    let div_likes = document.createElement("div")
                    div_likes.classList.add("likes")
                    div_likes.appendChild(document.createTextNode(i.likes+" likes"))

                    let href=document.createElement('a')

                        let div_download = document.createElement("div")
                        div_download.classList.add("download")
                        div_download.appendChild(document.createTextNode("Download"))

                    href.appendChild(div_download)
                    href.href=i.urls.raw
                    href.target="_blank"
                    href.download=i.urls.raw

                div_firstColumn.appendChild(div_likes)
                div_firstColumn.appendChild(href)

                let div_text = document.createElement("div_text")
                div_text.classList.add("text")
                div_text.appendChild(document.createTextNode(i.alt_description))

            div_values.appendChild(div_firstColumn)
            div_values.appendChild(div_text)
        
        div_containerInside.appendChild(img)  
        div_containerInside.appendChild(div_values)

        div_cont.appendChild(div_containerInside)
    }

}

let addPages = (num) => {
    let div_buttonHolder = document.getElementById("buttonHolder")
    div_buttonHolder.style.overflowX="scroll"
    div_buttonHolder.style.backgroundColor="rgb(42, 40, 40, 0.8)"

    for(let i=1;i<num;i++){
        let a = document.createElement('a')
        a.appendChild(document.createTextNode(i))

        a.addEventListener("click", () =>{
            fetchingFromAPI(i)
        })
        
        a.classList.add("linkButton")

        div_buttonHolder.appendChild(a)
    }
}

document.getElementById("searchValue").addEventListener("keyup", (event) => {

    if (event.keyCode === 13)
        searched();
})

const clearImage = () => {
    while(div_cont.firstChild){
        div_cont.removeChild(div_cont.firstChild)
    }

    let div_buttonHolder = document.getElementById("buttonHolder")

    while(div_buttonHolder.firstChild){
        div_buttonHolder.removeChild(div_buttonHolder.firstChild)
    }
}

let searched = () =>{

    txt=document.getElementById("searchValue").value
    console.log(txt)
    document.getElementById("searchValue").value=""

    fetchingFromAPI(1)

}

let fetchingFromAPI = (num=1) =>{
    clearImage() 
    let url=`https://api.unsplash.com/search/photos?page=${num}&query=${txt}&client_id=${APIkey}`
    fetch(url)
    .then(res => res.json()) // response 
    .then(res => { // response me h ye json
        
        console.log(res)
        addImage(res)
        addPages(res.total_pages)

    })

}
