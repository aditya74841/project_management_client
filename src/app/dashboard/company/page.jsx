"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

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

import { DataTableDemo } from "@/components/Table/DataTable";

import {
  createCompany,
  fetchCompanies,
  updateCompany,
  deleteCompany,
  updateCompanyLogo,
} from "./store"; // <-- make sure update and delete actions exist

const CompanyPage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // <-- new
  const [companyName, setCompanyName] = useState("");
  const [editingCompanyId, setEditingCompanyId] = useState(null); // <-- new
  const dispatch = useDispatch();
  const { companies } = useSelector((state) => state.company);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [logoFile, setLogoFile] = useState(null);
  const [changingLogoCompanyId, setChangingLogoCompanyId] = useState(null);

  const [imageURl, setImageURL] = useState("");

  useEffect(() => {
    dispatch(fetchCompanies(page, limit));
  }, [page, limit, dispatch]);

  const handleCreateOrUpdateCompany = async () => {
    if (!companyName.trim()) {
      return Swal.fire("Error", "Company name is required", "error");
    }

    try {
      if (isEditing && editingCompanyId) {
        await dispatch(updateCompany(editingCompanyId, { name: companyName })); // corrected
        await dispatch(updateCompanyLogo(editingCompanyId, logoFile));
        setLogoFile(null);

        Swal.fire("Success", "Company updated successfully", "success");

        // Swal.fire("Success", "Logo updated successfully", "success");
      } else {
        await dispatch(createCompany({ name: companyName }));
        Swal.fire("Success", "Company created successfully", "success");
      }
      setCompanyName("");
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingCompanyId(null);
      dispatch(fetchCompanies(page, limit)); // refresh
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleEditCompany = (company) => {
    setCompanyName(company.name);
    setEditingCompanyId(company._id);
    setImageURL(company.logo.url);
    setIsEditing(true);
    setNewItemDrawerOpen(true);
  };

  const handleDeleteCompany = async (companyId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the company permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await dispatch(deleteCompany(companyId));
        Swal.fire("Deleted!", "Company has been deleted.", "success");
        setIsEditing(false);
        setLogoFile(null);
        dispatch(fetchCompanies(page - 1, limit)); // refresh
      } catch (err) {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      }
    }
  };
  // console.log("the Image url is ", imageURl);
  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-semibold">Company</span>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800"
              onClick={() => {
                setIsEditing(false);
                setCompanyName("");
                setImageURL("");
              }}
            >
              + Add Company
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xl sm:w-[640px] bg-white shadow-xl rounded-lg">
            <SheetHeader className="px-6 pt-6">
              <SheetTitle className="text-2xl font-semibold text-gray-800">
                {isEditing ? "Edit Company" : "Add Company"}
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                {isEditing ? "Update company details" : "Create a new company"}
              </SheetDescription>
            </SheetHeader>

            <div className="px-6 py-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Company Name
                </Label>
                <Input
                  id="name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>

              {isEditing && (
                <div className="space-y-3">
                  <Label htmlFor="logo" className="text-gray-700 font-medium">
                    Company Logo
                  </Label>

                  <div className="flex items-center gap-4">
                    {/* Custom styled upload button */}
                    <label
                      htmlFor="logo"
                      className="cursor-pointer px-4 py-2 bg-sky-600 text-white text-sm rounded-md shadow hover:bg-sky-700 transition"
                    >
                      Upload Logo
                      <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setLogoFile(e.target.files[0]);
                          setImageURL("");
                        }}
                        className="hidden"
                      />
                    </label>

                    {/* File name or preview */}
                    {(logoFile || imageURl) && (
                      <div className="flex items-center gap-3">
                        {/* Thumbnail preview */}
                        <img
                          src={
                            imageURl ? imageURl : URL.createObjectURL(logoFile)
                          }
                          alt="Preview"
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

            <SheetFooter className="px-6 pb-6">
              <SheetClose asChild>
                <Button
                  type="button"
                  onClick={handleCreateOrUpdateCompany}
                  className="w-full bg-sky-700 hover:bg-sky-800 transition-colors"
                >
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <DataTableDemo
        data={companies?.companies || []}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
      />

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent className="ml-auto">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>

          {Array.from({ length: companies?.totalPages || 1 }, (_, index) => (
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
                setPage((prev) =>
                  Math.min(prev + 1, companies?.totalPages || 1)
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CompanyPage;
