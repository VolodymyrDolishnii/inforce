import React, { useState, useEffect } from 'react';
import './App.css';
import { ProductList } from './components/productList/productList'
import { Product } from './components/types/Product';
import { getProducts, getComments } from './components/api/products';
import { CommentType } from './components/types/CommentType';
import { EditProducts } from './components/editProducts/editProducts';
import { Route, Routes } from 'react-router-dom';
import { Product as ProductComponent } from './components/product/product';


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
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

  // useEffect(() => {
  //   getComments()
  //     .then(response => setComments(response));
  // }, [])

 useEffect(() => {
    if (products.length === 0) {
      setLastId(0);
    } else {
      setLastId(products[products.length - 1]?.id);
    }
 }, [products]);

 console.log(products);

  return (
    <>
              <Routes>
                <Route path='/' element={
                  <>
                    <ProductList products={products} comments={comments} setProducts={setProducts} id={id} setId={setId}/>
                    <EditProducts lastId={lastId} changeLastId={setLastId} addProduct={addProduct} />
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
