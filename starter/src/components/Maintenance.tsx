import { ProductTypes } from "@/types";
import React, { useState } from "react";

interface Props {
  product: ProductTypes;
}

const Maintenance = ({ product }: Props) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  return (
    <div className="col-12">
      <p>
        <strong className="mr-2">
          {product.maintenance_tips.first_tip.title}:
        </strong>
        {product.maintenance_tips.first_tip.desc}
      </p>
      <p>
        <strong className="mr-2">
          {product.maintenance_tips.second_tip.title}:
        </strong>
        {product.maintenance_tips.second_tip.desc}
      </p>
      <p>
        <strong className="mr-2">
          {product.maintenance_tips.third_tip.title}:
        </strong>
        {product.maintenance_tips.third_tip.desc}
      </p>

      {isShown && (
        <>
          <p>
            <strong className="mr-2">
              {product.maintenance_tips.fourth_tip.title}:
            </strong>
            {product.maintenance_tips.fourth_tip.desc}
          </p>
          <p>
            <strong className="mr-2">
              {product.maintenance_tips.fifth_tip.title}:
            </strong>
            {product.maintenance_tips.fifth_tip.desc}
          </p>
          <p>
            <strong className="mr-2">
              {product.maintenance_tips.sixth_tip.title}:
            </strong>
            {product.maintenance_tips.sixth_tip.desc}
          </p>
        </>
      )}

      <p
        className="text-center text-underline"
        onClick={() => setIsShown(!isShown)}
      >
        {isShown ? (
          <span className="text-danger">- Show less</span>
        ) : (
          <span className="text-success">+ Show more</span>
        )}
      </p>
    </div>
  );
};

export default Maintenance;
