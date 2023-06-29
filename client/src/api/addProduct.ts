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
    const { name, price, description, mainImageUrl, secondaryImages } =
      req.body;

    try {
      // Create a new FormData instance
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", mainImageUrl);

      // Add each secondary image
      secondaryImages.forEach((image: any) => formData.append("images", image));

      const requestOptions: RequestInit = {
        method: "POST",
        body: formData, // Use formData instead of JSON
        headers: { "Content-Type": "multipart/form-data" },
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
