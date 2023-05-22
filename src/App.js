import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Error from './pages/Error'
import Homepage from './pages/Homepage'

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" exact element={<Homepage/>}/>
        <Route path="/blog/:slug" element={<BlogDetail/>}/>
        <Route path="/blog" element={<Blog/>}/>  
        
        <Route path="/*" element={<Error/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
