import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Error = () => {
    const error= useRouteError();
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      {error && <p>Status: {error.status} and Message:{error.data}</p>}
      <NavLink to='/'><button>Go Home</button></NavLink>    </div>
  )
}

export default Error
