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

fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
)
  .then((response) => response.json())
  .then((data) => {
    const select = document.createElement("select");
    select.classList.add("input");
    data.forEach((crypto) => {
      const item = document.createElement("option");
      item.value = crypto.name;

      item.innerHTML = ` 
            <p>${crypto.name} (${crypto.symbol})</p> 
          `;
      select.appendChild(item);
    });

    const container__select = document.getElementById("crypto");
    container__select.appendChild(select);

    select.addEventListener("change", () => {
      const cryptoImage = document.getElementById("crypto__imagen");

      const selectedCrypto = data.find(
        (crypto) => crypto.name === select.value
      );
      cryptoImage.src = selectedCrypto ? selectedCrypto.image : "";

      cryptoImage.classList.add("padding__img");

      const cryptoPricing = document.getElementById("crypto__pricing");
      cryptoPricing.innerHTML = ` 
            <p>$${selectedCrypto.current_price}</p> 
          `;
    });

    const precioCompra = document.getElementById("precio__compra");
    const precioInversion = document.getElementById("crypto__inversion");
    const precioVenta = document.getElementById("precio__venta");

    var precioCompraValue = 1;
    precioCompra.addEventListener("change", (e) => {
      precioCompraValue = e.target.value;
    })

    var precioInversionValue = 1;
    precioInversion.addEventListener("change", (e) => {
      precioInversionValue = e.target.value;
    })

    var precioVentaValue = 1;
    precioVenta.addEventListener("change", (e) => {
      precioVentaValue = e.target.value;
    })

    const input_elements = document.querySelectorAll(".input");

    const beneficioPerdida = document.getElementById("beneficio__perdida");
    const importeInversion = document.getElementById("importe__inversion");
    const importeSalida = document.getElementById("importe__salida");

    const changeHandler = (event) => {
      beneficioPerdida.innerHTML = `$${(precioVentaValue - precioCompraValue).toFixed(2)} (${(((precioVentaValue - precioCompraValue) / precioCompraValue) * 100).toFixed(2)}%)`;
      importeInversion.innerHTML = precioInversionValue;
      importeSalida.innerHTML = `$${(precioVentaValue * precioInversionValue).toFixed(2)}`;
    }
    input_elements.forEach(element => {
      element.addEventListener('change', changeHandler);
    });

  })
  .catch((error) => console.error("Error:", error));
