export interface ProductBody {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface DeleteProductBody {
  id: string;
}

export interface AddToCartBody {
  productId: string;
}

export interface ProductIdParams {
  productId: string;
}
