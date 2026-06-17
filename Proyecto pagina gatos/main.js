const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?`;
const API_URL_UPLOAD = (id) => "https://api.thecatapi.com/v1/images/upload";

const spanError = document.getElementById("error")  

async function loadRandomCats() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("Random")
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error " + res.status;
    } else {
        const img1 = document.getElementById("img1"); 
        const img2 = document.getElementById("img2");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");
        
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteCats(data[0].id);
        btn2.onclick = () => saveFavouriteCats(data[1].id);
    }
}

async function loadFavouriteCats() {
    const res = await fetch(API_URL_FAVOURITES, {
        method: "GET",
        headers: {
            "X-API-KEY": "live_7EGQ1CvBB1Qkop3tHz7DTaFg2DgQm2PqGikz92Vwmy7JMXX0khfuTovImokcAjRW",
        },
    });
    const data = await res.json();
    console.log("Favoritos")
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById("favouriteCats")
        section.innerHTML = "";
        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Gatos favoritos");
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(cat => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document.createElement("Sacar al gato de favoritos");

            img.src = cat.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouriteCat(cat.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }

}

async function saveFavouriteCats(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "live_7EGQ1CvBB1Qkop3tHz7DTaFg2DgQm2PqGikz92Vwmy7JMXX0khfuTovImokcAjRW"
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log("Save")
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("Gato guardado en favoritos")
        loadFavouriteCats();
    }
}

async function deleteFavouriteCat(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: "DELETE",
        headers: {
            "X-API-KEY": "live_7EGQ1CvBB1Qkop3tHz7DTaFg2DgQm2PqGikz92Vwmy7JMXX0khfuTovImokcAjRW"
        }
    });
    const data = await res.json();

    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log("Gato eliminado de favoritos")
    }
}

async function uploadCatPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form);

    console.log(formData.get("file"))

    const res = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            //"Content-Type": "multipart/form-Data",
            "X-API-KEY": "live_7EGQ1CvBB1Qkop3tHz7DTaFg2DgQm2PqGikz92Vwmy7JMXX0khfuTovImokcAjRW",
        },
        body: formData,
    })
}

loadRandomCats();
loadFavouriteCats();