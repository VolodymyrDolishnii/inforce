import React, { useState, useEffect } from 'react';
import './App.css';
import { ProductList } from './components/ProductList/ProductList';
import { Product } from './components/types/Product';
import { getProducts } from './components/api/products';
// import { CommentType } from './components/types/CommentType';
import { AddProduct } from './components/AddProduct/AddProduct';
import { Route, Routes } from 'react-router-dom';
import { Product as ProductComponent } from './components/Product/Product';


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [comments, setComments] = useState<CommentType[]>([]);
  const [lastId, setLastId] = useState(0);
  const [id, setId] = useState(0);

  const addProduct = (newProduct: Product) => {
    setProducts(list => [...list, newProduct]);
  }

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response); 
      });
  }, []);

 useEffect(() => {
    if (products.length === 0) {
      setLastId(0);
    } else {
      setLastId(products[products.length - 1]?.id);
    }
 }, [products]);

  return (
    <>
              <Routes>
                <Route path='/' element={
                  <>
                    <ProductList products={products} setProducts={setProducts} id={id} setId={setId}/>
                    <AddProduct lastId={lastId} changeLastId={setLastId} addProduct={addProduct} />
                  </>
                }>

                </Route>

                <Route path='products/:id' element={<ProductComponent />}>
                </Route>
              </Routes>

            </>
  );
}

export default App;
