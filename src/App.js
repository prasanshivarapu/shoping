import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Admin2 from './components/admin2';
import ProductList from './components/Products';
import { Provider } from 'react-redux';
import store from './components/store';
import Cart from './components/Cart';
import Success from './components/Success';
import Admin3 from './components/pract';



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyNavbar />} />
          <Route path="/admin" element={<Admin2 />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/error" element={<Admin3 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
