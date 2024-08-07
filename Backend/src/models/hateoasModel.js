
const prepHateoasProductos = (data, page,allProducts) => {
  page= parseInt(page);
  const results = data.map((item) => {
    fecha = item.fecha.toISOString().split('T')[0];
    return {
      nombre: item.nombre,
      vendedor: item.vendedor_id,
      precio: item.precio,
      stock: item.stock,
      categoria: item.nombre_categoria,
      imagen: item.imagen,
      id: item.producto_id,
      descripcion: item.descripcion,
      estado: item.estado,
      fecha: fecha
    };
  });
  const totalPerPage = results.length;
  const total = allProducts.length;
  const DisminuirPage= (page)=>{
    if(page>1){
      return page-1
    }else{
      return page
    }
  }
  const AumentarPage= (page)=>{
    if(totalPerPage<12){
      return page
    }else{
      return page + 1
    }
  }
  const HATEOAS = {
    productos_total: total,
    productos_total_pagina: totalPerPage,
    siguiente_pagina: `/productos?page=${AumentarPage(page)}`,
    anterior_pagina: `/productos?page=${DisminuirPage(page)}`,
    results,
  };
  return HATEOAS;
};

const prepHateoasCategorias = (data, page, categoria, allProducts) => {
  page= parseInt(page);
  
  const results = data.map((item) => {
    fecha = item.fecha.toISOString().split('T')[0];
    return {
      nombre: item.nombre,
      vendedor: item.vendedor_id,
      precio: item.precio,
      stock: item.stock,
      categoria: item.nombre_categoria,
      imagen: item.imagen,
      id: item.producto_id,
      descripcion: item.descripcion,
      estado: item.estado,
      fecha: fecha
    };
  });
  const totalPerPage = results.length;
  const total = allProducts.length;
  const DisminuirPage= (page)=>{
    if(page>1){
      return page-1
    }else{
      return page
    }
  }
  const AumentarPage= (page)=>{
    if(totalPerPage<12){
      return page
    }else{
      return page + 1
    }
  }
  const HATEOAS = {
    productos_totales:total,
    productos_totales_pagina:totalPerPage,
    siguiente_pagina: `/categorias/${categoria}?page=${AumentarPage(page)}`,
    anterior_pagina: `/categorias/${categoria}?page=${DisminuirPage(page)}`,
    results,
  };
  return HATEOAS;
};



module.exports = {prepHateoasProductos,prepHateoasCategorias}
