"use client";

import { useState } from "react";

export default function ProductForm() {
  const [id, setId] = useState(""); // ID განახლებისთვის/წაშლისთვის
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: Number(price), image, category }),
      });
      if (res.ok) {
        alert("პროდუქტი დამატებულია!");
        clearForm();
      }
    } catch (err) {
      alert("დაფიქსირდა შეცდომა: " + err);
    }
  };

  const handleUpdate = async () => {
    if (!id) return alert("შეიყვანეთ პროდუქტის ID განახლებისთვის!");
    try {
      const res = await fetch(`http://localhost:3001/api/products/${Number(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: Number(price), image, category }),
      });
      if (res.ok) {
        alert("პროდუქტი განახლდა!");
        clearForm();
      } else {
        const text = await res.text();
        alert("პროდუქტის განახლება ვერ მოხერხდა: " + text);
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const handleDelete = async () => {
    if (!id) return alert("შეიყვანეთ პროდუქტის ID წასაშლელად!");
    try {
      const res = await fetch(`http://localhost:3001/api/products/${Number(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("პროდუქტი წაიშალა!");
        clearForm();
      } else {
        const text = await res.text();
        alert("პროდუქტის წაშლა ვერ მოხერხდა: " + text);
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
    setCategory("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input placeholder="პროდუქტის ID (Update/Delete)" value={id} onChange={(e) => setId(e.target.value)} />
      <input placeholder="სახელი" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="აღწერა" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="ფასი" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="სურათის URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">აირჩიეთ კატეგორია</option>
        <option value="ორეული">ორეული</option>
        <option value="კაბა">კაბა</option>
        <option value="შარვალი">შარვალი</option>
        <option value="პერანგი">პერანგი</option>
        <option value="ქვედაბოლო">ქვედაბოლო</option>
        <option value="პალტო">პალტო</option>
        <option value="ქურთუკი">ქურთუკი</option>
        <option value="მაისური">მაისური</option>
        <option value="პიჯაკი">პიჯაკი</option>
        <option value="ფრენჩი">ფრენჩი</option>
      </select>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={handleAdd}>დამატება</button>
        <button type="button" onClick={handleUpdate}>განახლება</button>
        <button type="button" onClick={handleDelete}>წაშლა</button>
      </div>
    </form>
  );
}
