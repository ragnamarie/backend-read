import dbConnect from "@/db/dbConnect";
import Product from "@/db/Product";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const products = await Product.find();
    console.log(products);
    response.status(200).json(products);
  }
}
