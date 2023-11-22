import useSWR from "swr";
import { StyledForm } from "./ProductForm.styled";

export default function ProductForm() {
  const { mutate } = useSWR("/api/products");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    console.log(productData);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label htmlFor="name-input">Name</label>
      <input type="text" id="name-input" name="name" />
      <label htmlFor="description-input">Description</label>
      <input type="text" id="description-input" name="description" />
      <label htmlFor="price-input">Price</label>
      <input type="text" id="price-input" name="price" />
      <label htmlFor="currency-input">Currency</label>
      <input type="text" id="currency-input" name="currency" />
      <button type="submit">Submit</button>
    </StyledForm>
  );
}
