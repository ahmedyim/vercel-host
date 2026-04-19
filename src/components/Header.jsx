import "../css/Header.css";
import { Link } from "react-router-dom";
function Header(props) {
  // if(isLog){
  // return (
  //  <header>
  //   <div>{props.logo}</div>
  //   <nav>
  //       Links
  //   </nav>
  //   <div>Logout</div>
  //  </header>
  // )}
  return (
    <div className="headercontainer">
      {/* <header>
          <div>{props.logo}</div>
          <nav>Links</nav>
          <div>
            {props.isLoggedin ? (
              <button>Logout</button>
            ) : (
              <button>Login</button>
            )}
          </div>
      
      </header> */}

      <header>
        <div>Header</div>
        <div>
          {" "}
          <Link to="/login" className="login">
            Login
          </Link>{" "}
          |{" "}
          <Link to="/register" className="register">
            Register
          </Link>
        </div>
      </header>
    </div>
  );
}
export default Header;
