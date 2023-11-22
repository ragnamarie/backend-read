import dbConnect from "@/db/dbConnect";
import Product from "@/db/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  const product = await Product.findById(id);

  if (!product) {
    return response.status(404).json({ status: "Not Found" });
  }

  response.status(200).json(product);
}
