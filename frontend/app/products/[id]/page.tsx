"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Row,
  Col,
  Image,
  Typography,
  Card,
  Space,
  Tag,
  Button,
  Radio,
} from "antd";
import {
  ShoppingCartOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // main image state
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  // selected size
  const [selectedSize, setSelectedSize] = useState<string>("M");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.image);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p style={{ textAlign: "center", padding: 40 }}>იტვირთება...</p>;
  if (!product)
    return <p style={{ textAlign: "center", padding: 40 }}>პროდუქტი ვერ მოიძებნა</p>;

  return (
    <div
      style={{
        background: "#fafafa",
        minHeight: "50vh",
        padding: "40px 30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: 1260,
          width: "100%",
          borderRadius: 16,
          border: "none",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
        bodyStyle={{ padding: "40px 24px" }}
      >
        <Row gutter={[32, 32]} align="top">
          {/* LEFT: Image gallery */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ textAlign: "center" }}>
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name}
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    maxHeight: 520,
                    width: "100%",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 520,
                    background: "#f2f2f2",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#999",
                    fontSize: 16,
                  }}
                >
                  ფოტო არ არის
                </div>
              )}
{/* Thumbnails */}
<div
  style={{
    marginTop: 20,
    display: "flex",
    justifyContent: "center", // პირველი ფოტო მარცხენა კიდიდან
    gap: 12,
    overflowX: "auto",  // სქროლვადი
    paddingBottom: 4,
    paddingLeft: 0,     // optional, შეგიძლიათ ცოტა პადინგი სურათებისთვის
  }}
>
  {[1, 2, 3, 4].map((n) => (
    <div
      key={n}
      style={{
        flex: "0 0 auto", // არ იჭიმება, ერთ ხაზში რჩება
      }}
    >
      <Image
        src={product.image} // ან product.images[n] თუ გაქვს მასივი
        alt={`thumbnail-${n}`}
        width={90}
        height={90}
        style={{
          objectFit: "cover",
          borderRadius: 8,
          cursor: "pointer",
          border:
            mainImage === product.image ? "2px solid #000" : "1px solid #f0f0f0",
          boxShadow:
            mainImage === product.image
              ? "0 0 4px rgba(0,0,0,0.2)"
              : "none",
          transition: "all 0.3s ease",
        }}
        onClick={() => setMainImage(product.image)}
        preview={false}
      />
    </div>
  ))}
</div>




            </div>
          </Col>

          {/* RIGHT: Product info */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Title
                level={2}
                style={{ marginBottom: 0, fontWeight: 600, color: "#222" }}
              >
                {product.name}
              </Title>
              <hr />
              <Text strong style={{ fontSize: 26, color: "#111" }}>
                {product.price} ₾
              </Text>

              <Paragraph style={{ color: "#555", lineHeight: 1.7, fontSize: 15 }}>
                {product.description}
              </Paragraph>

              {/* Size selection */}
              <div>
                <Text style={{ fontSize: 15, fontWeight: 500, marginRight: 8 }}>
                  ზომა:
                </Text>
                <Radio.Group
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  size="large"
                  style={{ marginTop: 10 }}
                >
                  {["S", "M", "L"].map((size) => (
                    <Radio.Button
                      key={size}
                      value={size}
                      style={{
                        border: "1px solid #000",
                        color: selectedSize === size ? "#fff" : "#000",
                        backgroundColor: selectedSize === size ? "#000" : "#fff",
                        borderRadius: "6px",
                        marginRight: 4,
                        fontWeight: 500,
                        minWidth: 50,
                        textAlign: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {size}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>

              {/* Buttons */}
              <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
                <Col xs={24} sm={12}>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    block
                    size="large"
                    style={{
                      borderRadius: 10,
                      background: "#000",
                      fontWeight: 500,
                    }}
                    onClick={() =>
                      console.log(`დაემატა კალათაში (${selectedSize})`)
                    }
                  >
                    კალათაში დამატება
                  </Button>
                </Col>
                <Col xs={24} sm={12}>
                  <Button
                    icon={<CreditCardOutlined />}
                    block
                    size="large"
                    style={{
                      borderRadius: 10,
                      borderColor: "#000",
                      color: "#000",
                      fontWeight: 500,
                    }}
                    onClick={() =>
                      console.log(`ყიდვა ახლავე (${selectedSize})`)
                    }
                  >
                    ყიდვა
                  </Button>
                </Col>
              </Row>

              <Tag
                color="default"
                style={{
                  fontSize: 14,
                  padding: "6px 12px",
                  borderRadius: 8,
                }}
              >
                კატეგორია: {product.category}
              </Tag>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
