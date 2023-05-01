import logo from './logo.svg';
import './App.css';
import Login from './Pages/Login';
import Blog from './Component/Blog/BlogModel/Blog';
import CreateBlog from './Component/Blog/CreateBlog/CreateBlog';
function App() {
  return (
    <div className="App">
      <Login />
      <Blog />
      <CreateBlog />
    </div>
  );
}

export default App;
