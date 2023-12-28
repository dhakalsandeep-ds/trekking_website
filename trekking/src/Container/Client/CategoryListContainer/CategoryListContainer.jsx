import React from "react";
import "./CategoryListContainer.css";
import ProductCard from "../../../Components/ProductCard/ProductCard";

import img1 from "../../../assets/productList/1.png";
import ProductBookMenu from "../../../Components/ProductBookMenu/ProductBookMenu";

export default function CategoryListContainer() {
  return (
    <div className="categoryList_wrapper">
      <div className="categoryList_container">
        <div className="categoryList_content">
          <ProductCard
            img={img1}
            title="SHORT EVEREST TREK VIA NAMCHE TYONGBOCHE 11 DAYS"
            link="/lol"
          />
          <ProductCard
            img={img1}
            title="SHORT EVEREST TREK VIA NAMCHE TYONGBOCHE 11 DAYS"
            link="/lol"
          />
          <ProductCard
            img={img1}
            title="SHORT EVEREST TREK VIA NAMCHE TYONGBOCHE 11 DAYS"
            link="/lol"
          />
          <ProductCard
            img={img1}
            title="SHORT EVEREST TREK VIA NAMCHE TYONGBOCHE 11 DAYS"
            link="/lol"
          />
          <ProductCard
            img={img1}
            title="SHORT EVEREST TREK VIA NAMCHE TYONGBOCHE 11 DAYS"
            link="/lol"
          />
        </div>
        <div className="categoryList_inquiry">
          <ProductBookMenu />
        </div>
      </div>
    </div>
  );
}
