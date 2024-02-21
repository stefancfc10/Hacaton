export interface ProductTypes {
  id: string;
  type: string;
  category: string;
  name: string;
  product_info: ProductInfoTypes;
  maintenance_tips: MaintenanceTip[];
  images: string[];
  price: number;
  quantity: string;
  discount: {
    isDiscounted: boolean;
    discount_price: number;
  };
  createdAt: string;
  inStock: boolean;
  prodQuantity?: number;
}


export interface ProductInfoTypes {
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  maintenance: string;
}

interface MaintenanceTip {
  title: string;
  desc: string;
}

interface MaintenanceTips {
  first_tip: MaintenanceTip;
  second_tip: MaintenanceTip;
  third_tip: MaintenanceTip;
  fourth_tip: MaintenanceTip;
  fifth_tip: MaintenanceTip;
  sixth_tip: MaintenanceTip;
}
export interface BasketType extends ProductTypes {
  prodQuantity: number;
}
