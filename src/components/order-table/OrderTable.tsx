"use client";
import Link from "next/link";
import React from "react";

const OrderTable = () => {
  const orders = [
    {
      _id: 7643980998990,
      fecha: "2023-06-18",
      estado: "En proceso",
      total: "$100",
    },
    {
      _id: 943980998990,
      fecha: "2023-06-17",
      estado: "Entregado",
      total: "$75",
    },
    {
      _id: 2348099717321,
      fecha: "2023-06-17",
      estado: "Entregado",
      total: "$75",
    },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="uppercase">
          <th className="border-b font-normal border-black py-3 px-4 text-start">
            Número de pedido
          </th>
          <th className="border-b font-normal border-black py-3 px-4 text-start">
            Fecha
          </th>
          <th className="border-b font-normal border-black py-3 px-4 text-start">
            Estado
          </th>
          <th className="border-b font-normal border-black py-3 px-4 text-start">
            Total
          </th>
          <th className="border-b font-normal border-black py-3 px-4 text-start">
            Acción
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="text-[0.9rem] text-gray-700">
            <td className="border-b border-gray-200 py-6 px-4">{order._id}</td>
            <td className="border-b border-gray-200 py-6 px-4">
              {order.fecha}
            </td>
            <td className="border-b border-gray-200 py-6 px-4">
              {order.estado}
            </td>
            <td className="border-b border-gray-200 py-6 px-4">
              {order.total}
            </td>
            <td className="border-b text-yellow-800 font-medium border-gray-200 py-5 px-4">
              <Link href={`/my-account/order/${order._id}`}>Ver Órden</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
