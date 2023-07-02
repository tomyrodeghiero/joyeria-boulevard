import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { cart } = req.body;

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        res.status(200).json({ paymentUrl: data.init_point });
      } else {
        res
          .status(500)
          .json({ error: "Error al crear la orden de MercadoPago" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al crear la orden de MercadoPago" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
