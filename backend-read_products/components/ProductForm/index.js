import useSWR from "swr";
import { StyledForm } from "./ProductForm.styled";

export default function ProductForm({ onSubmit, value }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <label htmlFor="name-input">Name</label>
      <input type="text" id="name-input" name="name" defaultValue={value} />
      <label htmlFor="description-input">Description</label>
      <input
        type="text"
        id="description-input"
        name="description"
        defaultValue={value}
      />
      <label htmlFor="price-input">Price</label>
      <input type="text" id="price-input" name="price" defaultValue={value} />
      <label htmlFor="currency-input">Currency</label>
      <input
        type="text"
        id="currency-input"
        name="currency"
        defaultValue={value}
      />
      <button type="submit">Submit</button>
    </StyledForm>
  );
}
