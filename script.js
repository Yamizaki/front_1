// fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
//   .then(response => response.json())
//   .then(data => {
//     const precio = data.market_data.current_price.usd;  // Precio en USD
//     const imagen = data.image.large;  // URL de la imagen

//     console.log("Precio de Bitcoin:", precio);
//     console.log("Imagen:", imagen);

//     // Ejemplo de cómo mostrarlo en HTML
//     const cryptoMoneda = document.getElementById("crypto__imagen");

//     cryptoMoneda.src = imagen;
//   })
//   .catch(error => console.error("Error:", error));

fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1")
    .then(response => response.json())
    .then(data => {
        
        const container = document.createElement("select");
        container.classList.add("input");
        data.forEach(crypto => {
          const item = document.createElement("option");
          item.value = crypto.name;
          
        item.innerHTML = ` 
            <p>${crypto.name} (${crypto.symbol})</p> 
          `;
          container.appendChild(item);

        
        });
        
        const select = document.getElementById("crypto");
        select.appendChild(container);

        container.addEventListener("change", () => {
            const cryptoImage = document.getElementById("crypto__imagen");
            cryptoImage.src = `${crypto.image}`;
        
            const cryptoPricing = document.getElementById("crypto__pricing");
            cryptoPricing.innerHTML = `${crypto.current_price}`;
        });
        
                

        })
    .catch(error => console.error("Error:", error));