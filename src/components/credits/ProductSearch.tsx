import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Search } from 'lucide-react';
import { formatAmount } from '../../utils/formatters';

interface ProductSearchProps {
  onSelectProduct: (product: { id: number; name: string; price: number }) => void;
}

export default function ProductSearch({ onSelectProduct }: ProductSearchProps) {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const filteredProducts = products.filter(product => {
    const search = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(search) ||
      product.code.toLowerCase().includes(search)
    );
  });

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">Buscar Producto</label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>

      {showResults && searchTerm && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
          {filteredProducts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => {
                    onSelectProduct({
                      id: product.id!,
                      name: product.name,
                      price: product.salePrice
                    });
                    setSearchTerm('');
                    setShowResults(false);
                  }}
                  className="cursor-pointer hover:bg-gray-50 px-4 py-2"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">Código: {product.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${formatAmount(product.salePrice)}
                      </p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No se encontraron productos
            </div>
          )}
        </div>
      )}
    </div>
  );
}