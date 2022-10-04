import React, { useState, useEffect } from 'react';
import './App.css';
import { ProductList } from './components/ProductList/ProductList';
import { Product } from './components/types/Product';
import { getProducts } from './components/api/products';
import { AddProduct } from './components/AddProduct/AddProduct';
import { Route, Routes } from 'react-router-dom';
import { Product as ProductComponent } from './components/Product/Product';
import { SortType } from './components/types/SortTypes';


function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [lastId, setLastId] = useState(0);
  const [id, setId] = useState(0);
  const [sort, setSort] = useState<SortType>(SortType.Name);
  const [isError, setIsError] = useState(false);

  const addProduct = (newProduct: Product) => {
    setProducts(list => [...list, newProduct]);
  }

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response);
      })
      .catch(() => setIsError(true));
  }, []);

  useEffect(() => {
    sortBy(products, SortType.Name);
  }, [products])

  useEffect(() => {
    if (products.length === 0) {
      setLastId(0);
    } else {
      setLastId(products[products.length - 1]?.id);
    }
  }, [products]);

  const sortBy = (array:Product[], field: SortType) => {
    const newList = [...array];

    if (field === SortType.Count) {
      newList.sort((a, b) => +b.count - +a.count);
    }

    if (field === SortType.Weight) {
      newList.sort((a, b) => +a.weight.slice(0, -1) - +b.weight.slice(0, -1));
    }

    if (field === SortType.Name) {
      newList.sort((a, b) => a.name.localeCompare(b.name));
    }

    setSortedProducts(newList);
  }

  useEffect(() => {
    sortBy(sortedProducts, sort);
  }, [sort]);

  return (
    <>
      {isError 
        ? <h1>Some problems...</h1>
        : (<Routes>
          <Route path='/' element={
            <>
              <ProductList products={sortedProducts} setProducts={setProducts} id={id} setId={setId} />
              <AddProduct lastId={lastId} addProduct={addProduct} setSort={setSort}/>
            </>
          }>

          </Route>

          <Route path='products/:id' element={<ProductComponent />}>
          </Route>
        </Routes>)
      }
    </>
  );
}

export default App;
