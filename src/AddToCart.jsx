import React, { useReducer } from "react";

function AddToCart() {

  const initialState = { products: [] };

  const cartReducer = (state, action) => {
    switch (action.type) {

      case "ADD": {
        const existing = state.products.find(
          (p) => p.id === action.payload.id
        );

        if (existing) {
          return {
            products: state.products.map((p) =>
              p.id === action.payload.id
                ? { ...p, qty: p.qty + 1 }
                : p
            ),
          };
        }

        return {
          products: [...state.products, { ...action.payload, qty: 1 }],
        };
      }

      case "REMOVE": {
        return {
          products: state.products.filter(
            (p) => p.id !== action.payload.id
          ),
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: "ADD",
            payload: { id: "1", name: "phone" },
          })
        }
      >
        Add to Cart
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "REMOVE",
            payload: { id: "1" },
          })
        }
      >
        Remove from Cart
      </button>

      <div>
        {state.products.map((p) => (
          <p key={p.id}>
            {p.name} - Qty: {p.qty}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AddToCart;