

export default function Product({ product }) {
    return (
      <div className="p-4 m-4 bg-slate-900 text-white max-w-sm">
        <h2 className="font-bold text-xl">{product.name}</h2>
        <p className="text-white text-sm">${product.price}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add to Cart
        </button>
      </div>
    );
  }