import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the test task</h1>
      <Link style={{fontSize: '1.5rem'}} to={"/login"}>Log in</Link>
    </div>
  )
}

export default HomePage