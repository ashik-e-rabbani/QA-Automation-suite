class ProductPricingUtils {

    getMinAndMaxPrices(productNameWithPrice) {
        
        let minPrice = productNameWithPrice[0];
        let maxPrice = productNameWithPrice[0];
  
        for (const product of productNameWithPrice) {
          if (product.price < minPrice.price){
            minPrice = product;
          } 
          if (product.price > maxPrice.price){
            maxPrice = product;
          } 
        }
  
        console.log(`min: ${minPrice.name} $${minPrice.price} and max: ${maxPrice.name} - $${maxPrice.price} `);
  
        return { min: minPrice, max: maxPrice };
      }
  }
  
  export const productPricingUtils = new ProductPricingUtils();
  