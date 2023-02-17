import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ProductsService from "Products/services/products.service";
import { ProductsDTO } from "~/Products/types/dtos";

const validationSchema = z.object({
  title: z.string().min(3),
  inStock: z.boolean(),
  price: z.string(),
  image: z.instanceof(FileList),
});
export type Products = z.infer<typeof validationSchema>;

const useAddProductPage = (product?: ProductsDTO) => {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<Products>({
    defaultValues: {
      inStock: product?.inStock,
      title: product?.title,
      price: product?.price.toString(),
    },
    mode: "onBlur",
    resolver: zodResolver(validationSchema),
  });

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(event.target.files[0]);
  };

  const handleAddProduct = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("inStock", JSON.stringify(data.inStock));
    formData.append("image", data.image[0] as any);
    formData.append("price", data.price);

    return ProductsService.addProduct(formData, "add-product");
  });

  const handleEditProduct = handleSubmit((data, id) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("inStock", JSON.stringify(data.inStock));
    formData.append("image", data.image[0] as any);
    formData.append("price", data.price);

    return ProductsService.editProduct(data, `edit-product/${id}`);
  });

  return {
    control,
    trigger,
    errors,
    register,
    handleAddProduct,
    handleSelectFile,
    preview,
    handleEditProduct,
  };
};

export default useAddProductPage;
