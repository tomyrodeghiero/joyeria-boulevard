import type { NextApiRequest, NextApiResponse } from "next";
import {
  ERROR_MESSAGES,
  INTERNAL_SERVER_ERROR,
  METHOD_NOT_ALLOWED,
  OK,
} from "@/utils/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, price, description, mainImageUrl } = req.body;

    try {
      const requestOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify({ name, price, description, mainImageUrl }),
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      await fetch(`${process.env.BACKEND_URL}/api/add-product`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          res.status(OK).json(result);
        })
        .catch((error) => {
          console.error("error", error);
          res
            .status(INTERNAL_SERVER_ERROR)
            .json({ error: ERROR_MESSAGES[INTERNAL_SERVER_ERROR] });
        });
    } catch (error) {
      console.error(error);
      res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: ERROR_MESSAGES[INTERNAL_SERVER_ERROR] });
    }
  } else {
    res
      .status(METHOD_NOT_ALLOWED)
      .json({ error: ERROR_MESSAGES[METHOD_NOT_ALLOWED] });
  }
}
