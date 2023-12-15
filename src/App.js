import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';

function App() {
  const [responseText, setResponseText] = useState(
    'Faça uma requisição para ver o resultado'
  );
  const [clienteId, setClienteId] = useState('');
  const [loading, setLoading] = useState(false);

  const onGetAmigos = async () => {
    setLoading(true);
    axios
      .get('http://localhost:3003/amigos')
      .then((response) => {
        setLoading(false);
        setResponseText(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const onGetCompras = async () => {
    setLoading(true);
    axios
      .get('http://localhost:3003/compras')
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setResponseText(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const onGetClientes = async () => {
    setLoading(true);
    axios
      .get('http://localhost:3003/clientes')
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        setResponseText(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const onGetCliente = async () => {
    setLoading(true);
    axios
      .get(`http://localhost:3003/redis/${clienteId}`)
      .then((response) => {
        setLoading(false);
        if (response.data === 'null') {
          setResponseText('Cliente não encontrado');
          return;
        }
        setResponseText(JSON.stringify(response.data, null, 2));
      })
      .then(() => {
        setClienteId('');
      })
      .catch((error) => {
        setLoading(false);
        setClienteId('');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const handleSubmitId = async (id) => {
    setClienteId(id);
    await onGetCliente();
  };

  return (
    <div>
      <h1 className="text-center font-bold my-10" style={{ fontSize: '36px' }}>
        Trabalho final de banco de dados
      </h1>
      <div className="flex justify-center align-middle mb-6">
        <button
          onClick={onGetAmigos}
          className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          Get Amigos
        </button>

        <button
          onClick={onGetCompras}
          className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          Get Compras
        </button>

        <button
          onClick={onGetClientes}
          className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
        >
          Get Clientes
        </button>

        <div className="flex align-middle justify-center">
          <input
            type="text"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="w-16 border border-gray-300 rounded-md p-2 mr-2"
            placeholder="ID"
          />
          <button
            className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            disabled={!clienteId}
            onClick={() => handleSubmitId(clienteId)}
          >
            Get Cliente Específico
          </button>
        </div>
      </div>

      <div
        className="flex justify-center align-middle container mx-auto border border-gray-300 rounded-md p-4 mt-12"
        style={{ width: '30%' }}
      >
        {loading ? (
          <ReactLoading
            type="spin"
            color="#000"
            height={80}
            width={80}
            className="mx-auto my-6"
          />
        ) : (
          <pre>{responseText}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
