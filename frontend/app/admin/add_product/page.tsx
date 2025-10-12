"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price: Number(price), image, category }),
    });
    if (res.ok) alert("პროდუქტი დამატებულია!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input placeholder="სახელი" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="აღწერა" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="ფასი" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input placeholder="სურათის URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">აირჩიეთ კატეგორია</option>
        <option value="ორეული">ორეული</option>
        <option value="კაბა">კაბა</option>
        <option value="შარვალი">შარვალი</option>
        <option value="perangi">პერანგი</option>
        <option value="qvedabolo">ქვედაბოლო</option>
        <option value="palto">პალტო</option>
        <option value="qurtuki">ქურთუკი</option>
        <option value="maisuri">მაისური</option>
        <option value="pijaki">პიჯაკი</option>
        <option value="frenchi">ფრენჩი</option>
      </select>
      <button type="submit">დამატება</button>
    </form>
  );
}
