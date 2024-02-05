import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeProduct } from "../../redux/states";
import { useForm } from "react-hook-form";
import StripeCheckout from "react-stripe-checkout";
import { useFirestore, useUser } from "reactfire";
import { reniec } from "ubigeo-peru";
import { doc, getDoc } from "firebase/firestore";
import { isEmpty, isNil } from "ramda";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";

const SHIP_PRICE = 15;

const Checkout = () => {
  const dispatch = useDispatch();
  const stateCart = useSelector((state) => state.cart);
  const { register: addressForm, getValues: getAddress } = useForm();
  const { data: userData } = useUser();
  const firestore = useFirestore();
  const [address, setAddress] = useState({});
  const [department, setDepartment] = useState([]);
  const [district, setDistrict] = useState([]);
  const [streetType, setStreetType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const subTotal = stateCart.reduce(
    (acc, product) => acc + Number(product.price || product.productItem?.price),
    0
  );
  const total = subTotal + SHIP_PRICE;

  const removeCart = (product) => {
    dispatch(removeProduct(product));
  };

  const handlePayment = async (token) => {
    try {
      setIsLoading(true);
      const addressValues = isEmpty(address) ? getAddress() : {};

      const response = await fetch(
        "https://us-central1-sublime-shop.cloudfunctions.net/handlePayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token.id,
            amount: total * 100, // El monto en centavos
            currency: "PEN",
            userId: userData.uid,
            address: addressValues,
            items: stateCart
              .filter((product) => !product.isCostumize)
              .map((product) => ({
                id: product.id,
              })),
            itemsCustomize: stateCart
              .filter((product) => product.isCostumize)
              .map((product) => ({
                imageCustomizeUrl: product.imageCustomize,
                imageReferenceUrl: product.imageReference,
                productItem: product.productItem,
                details: product.details
              })),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Realiza acciones adicionales según la respuesta de la Cloud Function
        if (data.success) {
          setIsLoading(false);
          dispatch(clearCart());
          navigate("/home");
          console.log("Pago exitoso");

          // Actualizar la interfaz de usuario, mostrar un mensaje de éxito, redirigir, etc.
        } else {
          setIsLoading(false);
          console.log("Error en el pago");
          // Mostrar un mensaje de error al usuario, manejar el error de alguna forma, etc.
        }
      } else {
        setIsLoading(false);
        console.log("Error en la solicitud");
        // Manejar el error de la solicitud, mostrar un mensaje al usuario, etc.
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error de conexión");
      // Manejar el error de conexión, mostrar un mensaje al usuario, etc.
    }
  };

  const handleDepartmentChange = (event) => {
    setDistrict(
      reniec.filter((item) => {
        return (
          item.departamento === event.target.value &&
          item.provincia !== "00" &&
          item.distrito === "00"
        );
      })
    );
  };

  const handleStreetTypeChange = (event) => {
    setStreetType(event.target.value);
  };

  const handleAddress = async () => {
    const docRef = doc(firestore, "users", userData.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (isEmpty(data.address)) return;
      setAddress(data.address[0]);
    } else {
      console.log("No such document!");
    }
  };

  const getDepartment = (departmentId) => {
    return reniec.filter((item) => {
      return (
        item.departamento === departmentId &&
        item.provincia === "00" &&
        item.distrito === "00"
      );
    })[0].nombre;
  };

  const getDistrict = (departmentId, districtId) => {
    return reniec.filter((item) => {
      return (
        item.departamento === departmentId &&
        item.provincia === districtId &&
        item.distrito === "00"
      );
    })[0].nombre;
  };

  useEffect(() => {
    setDepartment(
      reniec.filter((item) => {
        return item.provincia === "00" && item.distrito === "00";
      })
    );

    return () => {
      setDepartment([]);
    };
  }, []);

  useEffect(() => {
    if (isNil(userData)) return;
    handleAddress();
  }, [userData]);

  useEffect(() => {
    isEmpty(stateCart) && navigate("/home");
  }, [stateCart]);

  return (
    <div>
      <div
        style={{
          padding: "1rem",
          borderRadius: "1rem",
          marginBottom: "1rem",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Resumen
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Subtotal</div>
            <div>S/. {subTotal}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Envío</div>
            <div>S/. {SHIP_PRICE}</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Total a pagar</div>
            <div>S/. {total}</div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Tus productos
        </div>
        <div>
          {stateCart.map((product, index) => (
            <div
              key={product.id || index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.imageUrl || product.imageCustomize}
                  alt=""
                  style={{ width: "64px", marginRight: "16px" }}
                />
                <div>
                  <div>{product.name || product.productItem?.name}</div>
                  <div>S/. {product.price || product.productItem?.price}</div>
                </div>
              </div>
              <div>
                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                  }}
                  onClick={() => removeCart(product)}
                >
                  <AiOutlineClose size="24px" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Tu dirección
        </div>
        {isEmpty(address) ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div>Nombre y apellidos</div>
              <input {...addressForm("fullname")} type="text" />
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div>Departamento</div>
                <select
                  {...addressForm("department")}
                  onChange={(e) => handleDepartmentChange(e)}
                >
                  <option value="">Seleccione</option>
                  {department.map((item) => {
                    return (
                      <option value={item.departamento} key={item.departamento}>
                        {item.nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div>Provincia o distrito</div>
                <select {...addressForm("district")}>
                  <option value="">Seleccione</option>
                  {district.map((item) => {
                    return (
                      <option value={item.provincia}>{item.nombre}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div>Tipo de calle</div>
                <select
                  {...addressForm("streetType")}
                  onChange={(e) => handleStreetTypeChange(e)}
                >
                  <option value="">Seleccione</option>
                  <option value="avenida">Avenida</option>
                  <option value="calle">Calle</option>
                  <option value="jiron">Jirón</option>
                  <option value="pasaje">Pasaje</option>
                  <option value="plaza">Plaza</option>
                  <option value="carretera">Carretera</option>
                </select>
              </div>
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div>Nombre de {streetType || "calle"}</div>
                <input {...addressForm("streetName")} type="text" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div>Número de celular</div>
                <input {...addressForm("cellphone")} type="text" />
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div>Referencia</div>
                <input {...addressForm("reference")} type="text" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>{`${address.streetType} ${address.streetName}`}</div>
            <div>{`${getDistrict(
              address.department,
              address.district
            )} - ${getDepartment(address.department)}`}</div>
            <div>{`${address.fullname} - ${address.cellphone}`}</div>
          </div>
        )}
      </div>
      <div>
        <StripeCheckout
          token={handlePayment}
          stripeKey={import.meta.env.VITE_STRIPE_PUBLIC_KEY}
          amount={total * 100} // El monto se especifica en centavos (ejemplo: $10 = 1000 centavos)
          currency="PEN" // La moneda en la que se realizará el pago
          name="Tienda de sublimado" // Nombre de tu tienda
          description="Productos personalizados" // Descripción del producto o servicio
          image="" // URL de la imagen del logo de tu tienda
        >
          <button
            style={{
              width: "100%",
              backgroundColor: "#ffb410",
              padding: "12px 20px",
              cursor: "pointer",
              border: "none",
              borderRadius: "8px",
              outline: "none",
            }}
          >
            Confirmar compra
          </button>
        </StripeCheckout>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default Checkout;
