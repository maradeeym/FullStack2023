import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');


  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    
      setUser(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser'); // Updated key
    setUser(null);
    // Optionally, reset other states or redirect to a different page
  };
  

  const addBlog = async (event) => {
    event.preventDefault();
  
    try {
      const newBlogObject = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
        likes: 0 // Assuming default likes is 0 for a new blog
      };
  
      const returnedBlog = await blogService.create(newBlogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNewBlogTitle(''); // Clear the title input field
      setNewBlogAuthor(''); // Clear the author input field
      setNewBlogUrl(''); // Clear the url input field
      // Optional: Display a success message
    } catch (exception) {
      setErrorMessage('Error adding blog');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };
  
  
//     <Notification message={errorMessage} />

const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

const blogForm = () => (
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        type="text"
        value={newBlogTitle}
        name="BlogTitle"
        onChange={({ target }) => setNewBlogTitle(target.value)}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        value={newBlogAuthor}
        name="BlogAuthor"
        onChange={({ target }) => setNewBlogAuthor(target.value)}
      />
    </div>
    <div>
      URL:
      <input
        type="text"
        value={newBlogUrl}
        name="BlogURL"
        onChange={({ target }) => setNewBlogUrl(target.value)}
      />
    </div>
    <button type="submit">Create</button>
  </form>
);

if (user === null) {
  return (
    <div>
      <h2>Log in to application</h2>
      {loginForm()}
    </div>
  );
}

return (
  <div>      
    <h2>Blogs</h2>
    <p>{user.username} logged in</p>
    <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    {blogForm()}
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

};

export default App