"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  createStore,
  fetchStores,
  updateStore,
  deleteStore,
  updateStoreLogo,
  getStoresBasedOnCompany,
} from "./store";
import { StoreDataTable } from "./Datatable";
import { fetchCompaniesName } from "../company/store";
import { userProfile } from "@/components/HomePage/store";
import toast from "react-hot-toast";

const StorePage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [editingStoreId, setEditingStoreId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [logoFile, setLogoFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState({
    label: "",
    value: "",
  });
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);
  const { companiesName } = useSelector((state) => state.company);
  const { profile } = useSelector((state) => state.auth);
  const [imageURl, setImageURL] = useState(""); // For existing logo URL if any

  useEffect(() => {
    dispatch(fetchCompaniesName());
    dispatch(
      userProfile((error, response) => {
        if (error) {
          Swal.fire("Error", error.response.data.message, "error");
        }
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      !profile?.companyId &&
      companiesName.length > 0 &&
      !selectedCompanyOption.value
    ) {
      const defaultOption = companiesName.find(
        (company) => company.value === profile?.companyId
      );
      if (defaultOption) {
        setSelectedCompanyOption(defaultOption);
      }
    }
  }, [companiesName, profile, selectedCompanyOption]);

  useEffect(() => {
    const companyIdToFetch =
      selectedCompanyOption?.value || profile?.companyId || null;
    if (companyIdToFetch) {
      dispatch(getStoresBasedOnCompany(companyIdToFetch, page, limit));
    }
  }, [page, limit, dispatch, selectedCompanyOption, profile, isRefresh]);

  const handleCreateOrUpdateStore = async () => {
    if (!storeName.trim()) {
      return Swal.fire("Error", "Store name is required", "error");
    }

    try {
      if (isEditing && editingStoreId) {
        await dispatch(
          updateStore(editingStoreId, {
            name: storeName,
            company: selectedOption.value,
          })
        );
        if (logoFile) {
          await dispatch(updateStoreLogo(editingStoreId, logoFile));
          setLogoFile(null);
        }
        Swal.fire("Success", "Store updated successfully", "success");
      } else {
        await dispatch(
          createStore({ name: storeName, company: selectedOption.value })
        );
        Swal.fire("Success", "Store created successfully", "success");
      }
      setStoreName("");
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingStoreId(null);
      setIsRefresh((prev) => !prev);
      // dispatch(fetchStores(page, limit));
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  // const handleEditStore = (store) => {
  //   setStoreName(store.name);
  //   setEditingStoreId(store._id);
  //   setIsEditing(true);
  //   setNewItemDrawerOpen(true);
  // };
  const handleEditStore = (store) => {
    setStoreName(store.name);
    setEditingStoreId(store._id);
    setImageURL(store.logo.url);
    setIsEditing(true);
    setNewItemDrawerOpen(true);

    // Make sure to find the exact option object from companiesName
    const matchedCompany = companiesName.find(
      (company) =>
        company.value === store.company || company.value === store.company?._id
    );
    if (matchedCompany) {
      setSelectedOption({
        label: matchedCompany.label,
        value: matchedCompany.value,
      });
    } else {
      setSelectedOption(null);
    }
  };

  const handleDeleteStore = async (storeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this store?"
    );
    if (confirmed) {
      try {
        await dispatch(deleteStore(storeId));
        toast.success("Store deleted successfully");
        setIsRefresh((prev) => !prev);
        // dispatch(fetchAuditOptions(companyId));
      } catch (err) {
        toast.error(err.message || "Something went wrong while deleting");
      }
    }

    // const confirm = await Swal.fire({
    //   title: "Are you sure?",
    //   text: "This will delete the store permanently!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#d33",
    //   cancelButtonColor: "#3085d6",
    //   confirmButtonText: "Yes, delete it!",
    // });

    // if (confirm.isConfirmed) {
    //   try {
    //     await dispatch(deleteStore(storeId));
    //     Swal.fire("Deleted!", "Store has been deleted.", "success");
    //     setIsEditing(false);
    //     setLogoFile(null);
    //   } catch (err) {
    //     Swal.fire("Error", err.message || "Something went wrong", "error");
    //   }
    // }
  };

  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex w-1/2">
          <span className="text-2xl font-semibold">Store</span>
          {!profile?.companyId && (
            <Select
              defaultValue={selectedCompanyOption}
              onChange={setSelectedCompanyOption}
              options={companiesName}
              className="ml-4"
            />
          )}
        </div>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800 text-white font-medium shadow-md"
              onClick={() => {
                setStoreName("");
                setIsEditing(false);
                setSelectedOption("");
              }}
            >
              + Add Store
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[800px] sm:w-[640px] bg-white">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-gray-800">
                {isEditing ? "Edit Store" : "Add Store"}
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                {isEditing ? "Update store details" : "Create a new store"}
              </SheetDescription>
            </SheetHeader>

            <div className="p-6 space-y-6">
              {/* Store Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="block text-gray-700 font-medium"
                >
                  Store Name
                </Label>
                <Input
                  id="name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Enter store name"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* Select Company */}
              <div className="space-y-2">
                <Label className="block text-gray-700 font-medium">
                  Select Company
                </Label>
                <Select
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={companiesName}
                  className="border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Store Logo (Only when editing) */}
              {isEditing && (
                <div className="space-y-3">
                  <Label htmlFor="logo" className="text-gray-700 font-medium">
                    Store Logo
                  </Label>

                  <div className="flex items-center gap-4">
                    {/* Custom styled upload button */}
                    <label
                      htmlFor="store-logo"
                      className="cursor-pointer px-4 py-2 bg-sky-600 text-white text-sm rounded-md shadow hover:bg-sky-700 transition"
                    >
                      Upload Logo
                      <input
                        id="store-logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setLogoFile(e.target.files[0]);
                          setImageURL("");
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* File preview or filename */}
                    {(logoFile || imageURl) && (
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            imageURl ? imageURl : URL.createObjectURL(logoFile)
                          }
                          alt="Store Logo Preview"
                          className="w-10 h-10 object-cover rounded border"
                        />
                        {!imageURl && (
                          <span className="text-sm text-gray-600 line-clamp-1 max-w-[150px]">
                            {logoFile.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <SheetFooter className="px-6 py-4 border-t mt-4">
              <SheetClose asChild>
                <Button
                  type="button"
                  onClick={handleCreateOrUpdateStore}
                  className="bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <StoreDataTable
        data={stores?.stores || []}
        onEdit={handleEditStore}
        onDelete={handleDeleteStore}
      />

      <Pagination className="mt-4">
        <PaginationContent className="ml-auto">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: stores?.totalPages || 1 }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={page === index + 1}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, stores?.totalPages || 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StorePage;
