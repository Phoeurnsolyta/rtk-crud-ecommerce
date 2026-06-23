"use client"
import { useState } from "react";
import { columns, ProductHeader,
  UpdateProductType } from "@/components/tables/Columns";
import { DataTable } from "@/components/tables/TableComponent";
import { ViewProductDetail } from "@/components/ui/view-detail-product";
import { useGetAllProductQuery,
  useDeleteProductMutation, useUpdateProductMutation
 } from "@/services/ecommerce";

 import {toast} from "sonner";

export default function DataTablePage() {
  const { data } = useGetAllProductQuery({
  page: 0,
  size: 10000
  });

  const product: UpdateProductType = {
    name: "numpang update",
    description:
      "Apple's latest flagship smartphone with A18 Pro chip, advanced camera system, and titanium design.",
    stockQuantity: 50,
    priceIn: 1100,
    priceOut: 1299,
    discount: 5,
    color: [
      {
        color: "Purple",
        images: [
          "https://i.pinimg.com/736x/4d/b4/58/4db458e4b9d435e9892c4df3110e0729.jpg",
        ],
      },
    ],
    thumbnail:
      "https://i.pinimg.com/736x/67/7f/04/677f047d936a48fbec40de790fe4a5b4.jpg",
    warranty: "12 Months Official Warranty",
    availability: true,
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
    categoryUuid: "cat-smartphone-67",
    supplierUuid: "cat-smartwatch-001",
    brandUuid: "brand-apple-mix-tv",
  };

  const tableData = Array.isArray(data?.content) ? data?.content : [];

  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);

  const handleViewDetail = (uuid: string) => {
    setSelectedUuid(uuid);
  };

  const handleClose = () => {
    setSelectedUuid(null);
  };

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const handleDelete = async (uuid: string) => {
    try {
      await deleteProduct(uuid).unwrap();
      toast.success("Product deleted successfully.", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error?.data?.description || "Failed to deleted product", {
        position: "top-center",
      });
    }
  };
  const handleUpdate = async (uuid: string, row: any) => {
    try {
      await updateProduct({ uuid, data: product }).unwrap();
      toast.success("Product updated successfully.", {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error?.data?.description || "Failed to updated product", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns({
          onViewDetail: handleViewDetail,
          onDelete: handleDelete,
          onUpdate: (uuid, row) => handleUpdate(uuid, row),
        })}
        data={tableData}
      />

      {/* Modal */}
      {selectedUuid && (
        <ViewProductDetail
          uuid={selectedUuid}
          open={true}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
        />
      )}
    </div>
  );
}