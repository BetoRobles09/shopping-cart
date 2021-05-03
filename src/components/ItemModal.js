import { useRef } from "react"
import Modal from "react-modal"
import { useCart } from "../context/CartContext"

Modal.setAppElement("#root")

export default function StoreItemModal({ item, open, closeModal }) {
  const { addToCart } = useCart()
  const quantityRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    const quantity = parseInt(quantityRef.current.value)
    addToCart(item.id, quantity)
    closeModal()
  }

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)"
        },
        content: {
          margin: "10px",
          padding: "0",
          inset: "auto",
          boxShadow:
            "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
      }}
    >
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="container px-4 py-4 mx-auto">
          <div className="mx-auto flex items-center">
            <img
              alt="ecommerce"
              className="object-cover object-center rounded"
              src={`https://dummyimage.com/150x150/${item.imageColor}/${item.imageColor}`}
            />
            <div className="pl-8 py-2">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {item.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {item.name}
              </h1>
              <p className="leading-relaxed max-w-lg">{item.description}</p>
              <div className="flex mt-4">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {(item.priceCents / 100)}$
                </span>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center ml-auto"
                >
                  <input
                    type="number"
                    defaultValue="1"
                    ref={quantityRef}
                    min="1"
                    max="99"
                    step="1"
                    required
                    className="leading-normal w-16 flex-1 border h-10 border-purple-500 rounded rounded-r-none px-3 relative"
                  />
                  <button
                    type="submit"
                    className="flex text-white bg-purple-500 rounded-l-none border-0 py-2 px-3 focus:outline-none hover:bg-purple-600 rounded"
                  >
                    Add To Cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  )
}
