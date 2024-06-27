import "../myPosts/myPosts.css";
import { useContext, useEffect, useState, useRef } from "react";
import { ProductCard } from "../../components/productCard/ProductCard";
import { ProductContext } from "../../context/ProductContext";
import { GeneralBtn } from "../../components/generalBtn/GeneralBtn";
import { TbEdit } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import { UserContext } from "../../context/UserContext";
import postImg from "/imgs/aplication/posts.png";
import { ConfirmDelete } from "../../components/confirmDelete/ConfirmDelete";
import { IoIosClose } from "react-icons/io";

export function MyPosts() {
  const { loading } = useContext(ProductContext);
  const { userToken, myProducts, getProductBySeller } = useContext(UserContext);
  const navigate = useNavigate();
  const [confirmDeleteId, setConfirmDeleteId] = useState("");

  const handleDeleteMyProducts = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar producto");
      }
      const data = await response.json();
      getProductBySeller();
      setConfirmDeleteId(null);
      return data;
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const requestDeleteConfirmation = (id) => {
    setConfirmDeleteId(id);
  };

  return (
    <section className="myposts__container bg-white shadow-sm">
      <h1 className="text-2xl font-semibold mb-5">Mis publicaciones</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="myposts__body flex flex-col gap-5 h-full">
          {myProducts.length > 0 ? (
            myProducts.map((product) => (
              <ProductCard
                className="mypost__card__body border p-5 rounded-md flex flex-col gap-4"
                key={product?.productoId}
              >
                <div className="myposts__card__body flex items-start gap-5">
                  <img
                    className="myposts__card__img border rounded-md"
                    src={product?.imagen}
                    alt=""
                  />
                  <div className="myposts__card__info flex flex-col gap-1 overflow-hidden">
                    <p className="myposts__card__paragraph text-md font-medium text-lg">
                      {product?.nombre}
                    </p>
                    <p className="myposts__card__info font-medium">
                      {product?.precio
                        ? Number(product.precio).toLocaleString("es-CL", {
                            style: "currency",
                            currency: "CLP",
                          })
                        : null}
                    </p>
                    <p className="text-sm text-gray-400 mt-3">
                      Publicado en Edimarket
                    </p>
                  </div>
                </div>
                <div className="myposts__btn__container flex items-center gap-2">
                  <GeneralBtn
                    onClick={() => handleEditProduct(product?.productoId)}
                    className="myposts__btn"
                    type="secondary"
                  >
                    <TbEdit className="btn__edit" />
                  </GeneralBtn>
                  {confirmDeleteId === product?.productoId ? (
                    <ConfirmDelete className="confirm__delete__modal bg-gray-100 shadow-sm p-3 rounded-md flex flex-col items-stretch gap-4 border">
                      <IoIosClose
                        onClick={() => {
                          setConfirmDeleteId("");
                        }}
                        className="close__icon"
                      />
                      <h2 className="text-center">Eliminar publicación</h2>
                      <hr />
                      <span className="text-center font-medium text-sm">
                        ¿Seguro que quieres eliminar la publicación?
                      </span>
                      <hr />
                      <div className="flex items-center justify-evenly">
                        <GeneralBtn
                          onClick={() => {
                            setConfirmDeleteId("");
                          }}
                          type="primary"
                          className="confirm__delete__btn"
                        >
                          Cancelar
                        </GeneralBtn>
                        <GeneralBtn
                          onClick={() =>
                            handleDeleteMyProducts(confirmDeleteId)
                          }
                          type="primary"
                          className="confirm__delete__btn"
                        >
                          Eliminar
                        </GeneralBtn>
                      </div>
                    </ConfirmDelete>
                  ) : (
                    ""
                  )}
                  <GeneralBtn
                    onClick={() =>
                      requestDeleteConfirmation(product?.productoId)
                    }
                    className="myposts__btn"
                    type="secondary"
                  >
                    <FaTrashCan className="btn__trash" />
                  </GeneralBtn>
                </div>
              </ProductCard>
            ))
          ) : (
            <div className="grid items-center justify-items-center gap-7">
              <span className="text-center text-2xl font-semibold">
                Aún no haz publicado.
              </span>
              <p className=" text-center">
                Cuando vendas tus publicaciones aparecerán aquí.
              </p>
              <img className="post__img" src={postImg} alt="" />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
