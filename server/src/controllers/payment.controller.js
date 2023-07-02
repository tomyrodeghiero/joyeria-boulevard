const mercadopago = require("mercadopago");

const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });

  const cart = req.body.cart.map((item) => ({
    title: item.name,
    unit_price: item.price,
    currency_id: "ARS",
    quantity: item.quantity,
  }));

  const result = await mercadopago.preferences.create({
    items: cart,
    back_urls: {
      success: `${process.env.FRONTEND_PUBLIC_URL}/api/success`,
      failure: `${process.env.FRONTEND_PUBLIC_URL}/api/failure`,
      pending: `${process.env.FRONTEND_PUBLIC_URL}/api/pending`,
    },
    notification_url: `${process.env.NGROK}/webhook`,
  });

  console.log(result);

  res.send(result.body);
};

const receiveWebhook = async (req, res) => {
  console.log(req.query);
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      // store in database
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};

exports.createOrder = createOrder;
exports.receiveWebhook = receiveWebhook;
