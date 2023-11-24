import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import ProductForm from "../ProductForm";
import { useState } from "react";

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    }
  }

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    router.push("/");
  }

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <button
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        <span role="img" aria-label="A pencil">
          ✏️
        </span>
      </button>
      <button onClick={handleDeleteProduct} disabled={isEditMode}>
        <span role="img" aria-label="A cross indicating deletion">
          ❌
        </span>
      </button>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <p>Reviews:</p>
      {data.reviews && data.reviews.length > 0 ? (
        <ul>
          {data.reviews.map((review) => (
            <li key={review._id}>
              <p>Title: {review.title}</p>
              <p>Text: {review.text}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
      {isEditMode && (
        <ProductForm
          onSubmit={handleEditProduct}
          value={data.product}
          isEditMode={true}
        />
      )}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
