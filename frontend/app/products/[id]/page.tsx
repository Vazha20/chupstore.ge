"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Row, Col, Image, Typography, Card, Button, Space, Tag, Carousel, Radio } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import './page.css';

const { Title, Paragraph } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [carouselRef, setCarouselRef] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // დარწმუნებული ვხდეთ, რომ images და sizes არის ცარიელი თუ არ არის
        setProduct({
          ...data,
          images: data.images?.length ? data.images : [data.image || "/aaaa.jpeg"],
          sizes: data.sizes?.length ? data.sizes : ["S", "M", "L"],
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: "40px" }}>იტვირთება...</div>;
  if (!product) return <div style={{ padding: "40px" }}>პროდუქტი ვერ მოიძებნა</div>;

  return (
    <div style={{ maxWidth: 1320, padding: "40px 30px", margin: "0 auto" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <div style={{ position: "relative" }}>
              <Carousel ref={setCarouselRef} dots={false} autoplay={false}>
                {product.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={product.name}
                    style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                  />
                ))}
              </Carousel>

              <LeftOutlined
                onClick={() => carouselRef.prev()}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  fontSize: 24,
                  color: "#fff",
                  cursor: "pointer",
                  transform: "translateY(-50%)",
                  padding: 8,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "50%",
                }}
              />
              <RightOutlined
                onClick={() => carouselRef.next()}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  fontSize: 24,
                  color: "#fff",
                  cursor: "pointer",
                  transform: "translateY(-50%)",
                  padding: 8,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: "50%",
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 16, gap: 10 }}>
              {product.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`thumbnail-${idx}`}
                  width={70}
                  height={70}
                  style={{ cursor: "pointer", objectFit: "cover", border: "2px solid #eee" }}
                  onClick={() => carouselRef.goTo(idx)}
                />
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Title level={2}>{product.name}</Title>
            <Title level={3} style={{ color: "#000000ff" }}>{product.price.toFixed(2)} ლ</Title>
            <Paragraph>{product.description}</Paragraph>

            {/* ზომების არჩევა */}
            <div>
              <strong>ზომა: </strong>
              <Radio.Group
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                optionType="button"
                buttonStyle="solid"
              >
                {product.sizes.map((size) => (
                  <Radio.Button key={size} value={size} className="size-btn">
                    {size}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <Space>
              <Button
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                }}
                icon={<ShoppingCartOutlined />}
                size="large"
              >
                კალათაში დამატება
              </Button>
              <Button
                style={{
                  backgroundColor: "#ffffffff",
                  color: "#000000ff",
                  border: "1px solid black",
                }}
                type="default"
                icon={<CreditCardOutlined />}
                size="large"
              >
                ყიდვა
              </Button>
            </Space>
            <Tag color="cyan">კატეგორია: {product.category}</Tag>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
