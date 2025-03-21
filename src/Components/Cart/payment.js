export const handlePayment = async (cart, setLoading, navigate) => {
    if (!cart || cart.length === 0) {
      alert("⚠️ El carrito está vacío. No se puede proceder con el pago.");
      return;
    }
  
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No se encontró el token. Inicia sesión nuevamente.");
        navigate("/login");
        return;
      }

      const formattedCart = cart.map(item => {
        if (!item.priceID) {
            console.error(`⛔ Error: el artículo ${item.name} no tiene un priceID.`);
            return null; // No incluir en la solicitud
        }
        return { price: item.priceID, quantity: item.quantity };
    }).filter(Boolean); // Filtra los `null`
    

      console.log("📦 Carrito enviado al backend:", JSON.stringify(formattedCart, null, 2)); 
  
      const response = await fetch("http://localhost:3003/api/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token, 
        },
        body: JSON.stringify({ cart: formattedCart }),  
      });
  
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (error) {
        throw new Error(`Error al parsear JSON: ${text}`);
      }
  
      console.log("📩 Respuesta del backend:", data); 

      if (response.ok && data.sessionURL) {
        window.location.href = data.sessionURL; 
      } else {
        alert("Error al procesar el pago. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("❌ Error al conectar con el servidor:", error);
      alert("Hubo un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
};
