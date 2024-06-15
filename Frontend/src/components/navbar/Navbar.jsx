import "../navbar/navbar.css";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState, useRef, forwardRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { NavBurger } from "../navBurger/NavBurger";
import { Perfil } from "../perfil/Perfil.jsx";
import { SearchBar } from "../searchBar/SearchBar.jsx";
import { ProductContext } from "../../context/ProductContext.jsx";
import { UserContext } from "../../context/UserContext.jsx";

// Crear un componente envolvente para manejar la referencia
const UserIcon = forwardRef((props, ref) => (
  <div ref={ref}>
    <FaUserCircle {...props} />
  </div>
));

export function Navbar() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openPerfilMenu, setOpenPerfilMenu] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
  const navigate = useNavigate();
  const perfilButtonRef = useRef(null);
  const perfilMenuRef = useRef(null);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const menuContainerRef = useRef(null);
  const { setOpenCategories } = useContext(ProductContext);
  const categoriesBtnRef = useRef(null);
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    if (navigate) {
      setOpenPerfilMenu(false);
      setOpenSearchBar(false);
    }
  }, [navigate]);

  const handleOpenPerfilMenu = () => {
    setOpenPerfilMenu(!openPerfilMenu);
    if (isMobile) {
      if (openSearchBar) {
        setOpenSearchBar(false);
      } else if (clicked) {
        setClicked(false);
      }
    }
  };

  const handleOpenSearchBar = () => {
    setOpenSearchBar(!openSearchBar);
    if (openPerfilMenu) {
      setOpenPerfilMenu(false);
    } else if (clicked) {
      setClicked(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (
      categoriesBtnRef.current &&
      !categoriesBtnRef.current.contains(event.target)
    ) {
      setOpenCategories(false);
    }

    if (
      menuRef.current &&
      menuContainerRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuContainerRef.current.contains(event.target)
    ) {
      setClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation(); // Detener la propagación del evento
    setOpenCategories((prev) => !prev);
  };

  useEffect(() => {
    const navbar = navbarRef.current;

    if (navbar) {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          navbar.classList.add("navbarScroll");
        } else {
          navbar.classList.remove("navbarScroll");
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <nav ref={navbarRef} className="navbar__container shadow-sm">
      <div className="navbar__logo__container">
        <div className="navbar__logo__section">
          <img
            onClick={handleBackToHome}
            className="navbar__logo__img"
            src="./imgs/aplication/navLogo2.1.png"
            alt=""
          />
          <div className="navbar__search__container">
            <div className="navbar__search__input__container">
              <SearchBar openSearchBar={openSearchBar} />
            </div>
            <FiSearch
              onClick={handleOpenSearchBar}
              className="navbar__search__icon"
            />
          </div>
        </div>

        <div className="navbar__user__container">
          <div className="navbar__user__icons__container">
            <UserIcon
              ref={perfilButtonRef}
              onClick={handleOpenPerfilMenu}
              className="navbar__user__icon"
            />
            <div className="navbar__icons__menu__container">
              <NavBurger
                clicked={clicked}
                setOpenPerfilMenu={setOpenPerfilMenu}
                setOpenSearchBar={setOpenSearchBar}
                isMobile={isMobile}
                setClicked={setClicked}
                setIsMobile={setIsMobile}
                menuRef={menuRef}
              />
              <div
                ref={menuContainerRef}
                className={`navbar__menu__links bg-gray-50 shadow-md ${
                  clicked ? "navActiveMenu" : ""
                }`}
              >
                <NavLink
                  ref={categoriesBtnRef}
                  onClick={handleButtonClick}
                  className="navbar__menu__link"
                >
                  Categorías
                </NavLink>
                <NavLink className="navbar__menu__link">
                  Carrito
                  <IoCartOutline className="navbar__menu__link__icon" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="navbar__user__menu__container" ref={perfilMenuRef}>
            {userToken ? (
              <Perfil
                openPerfilMenu={openPerfilMenu}
                setOpenPerfilMenu={setOpenPerfilMenu}
                perfilMenuRef={perfilMenuRef}
                perfilButtonRef={perfilButtonRef}
              >
                <div className="navbar__user__menu bg-gray-50 shadow-md">
                  <NavLink to="miperfil" className="navbar__user__menu__link">
                    Mi perfil
                  </NavLink>
                  <NavLink to="" className="navbar__user__menu__link">
                    Publicar
                  </NavLink>
                  <NavLink to="/favorites" className="navbar__user__menu__link">
                    Favoritos
                  </NavLink>
                  <NavLink to="" className="navbar__user__menu__link">
                    Cerrar sesión
                  </NavLink>
                </div>
              </Perfil>
            ) : (
              <Perfil
                openPerfilMenu={openPerfilMenu}
                setOpenPerfilMenu={setOpenPerfilMenu}
                perfilMenuRef={perfilMenuRef}
                perfilButtonRef={perfilButtonRef}
              >
                <div className="navbar__user__menu bg-gray-50 shadow-md">
                  <NavLink to="/sing-in" className="navbar__user__menu__link">
                    Iniciar sesión
                  </NavLink>
                  <NavLink to="/sing-up" className="navbar__user__menu__link">
                    Registrarse
                  </NavLink>
                </div>
              </Perfil>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
