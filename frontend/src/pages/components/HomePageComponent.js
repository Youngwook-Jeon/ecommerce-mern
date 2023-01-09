import CategoryCardComponent from "../../components/CategoryCardComponent";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import { Row, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const HomePageComponent = ({ categories, getBestSellers }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    getBestSellers()
      .then((data) => {
        setBestSellers(data);
      })
      .catch((err) =>
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        )
      );

    setMainCategories((cat) =>
      categories.filter((item) => !item.name.includes("/"))
    );
  }, [categories, getBestSellers]);

  return (
    <>
      <ProductCarouselComponent bestSellers={bestSellers} />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {mainCategories.map((category, idx) => (
            <CategoryCardComponent key={idx} category={category} idx={idx} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePageComponent;
