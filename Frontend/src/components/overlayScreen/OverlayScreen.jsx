import { useContext, useEffect, useRef } from "react";
import "../overlayScreen/overlayScreen.css";
import { CartContext } from "../../context/CarritoContext";

export function OverlayScreen({ clicked }) {
  const { cartModal } = useContext(CartContext);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (cartModal || clicked) {
      document.body.style.overflow = "hidden";
      overlayRef.current.classList.remove("overlayNone");
      overlayRef.current.classList.add("overlayVisible");
    } else {
      document.body.style.overflow = "auto";
      overlayRef.current.classList.add("overlayNone");
      overlayRef.current.classList.remove("overlayVisible");
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cartModal, clicked]);

  return <div ref={overlayRef} className="overlay overlayNone"></div>;
}
