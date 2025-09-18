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
  assignUserRole,
  createStaff,
  fetchStaff,
  getStoresBasedOnCompany,
  updateStaff,
} from "./store"; // <-- now correct import (from your new store slice)
import { StoreDataTable } from "./Datatable";
import { fetchCompaniesName } from "../company/store";
import CompanyCombobox, { ComboboxDemo } from "@/components/Combobox";
import { userProfile } from "@/components/HomePage/store";

const StorePage = () => {
  const [newItemDrawerOpen, setNewItemDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [editingStoreId, setEditingStoreId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [logoFile, setLogoFile] = useState(null);

  const dispatch = useDispatch();
  const { staff } = useSelector((state) => state.staff);
  const { companiesName } = useSelector((state) => state.company);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCompanyOption, setSelectedCompanyOption] = useState({
    label: "",
    value: "",
  });
  // const { profile, } = useSelector((state) => state.auth);


  
  const { profile, isLoggedIn } = useSelector((state) => state.auth);
  console.log("The selected profile is ",profile)

  useEffect(() => {
    dispatch(fetchCompaniesName());
    dispatch(
      userProfile((error, response) => {
        if (error) {
          showMessage(error.response.data.message, "error");
        }
      })
    );
  }, []);

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
      dispatch(fetchStaff(companyIdToFetch, page, limit));
    }
  }, [page, limit, dispatch, selectedCompanyOption, profile]);
  // console.log("the staff is",staff)

  const handleCreateOrUpdateStore = async () => {
    if (!name.trim()) {
      return Swal.fire("Error", "Name is required", "error");
    }

    if (!email.trim()) {
      return Swal.fire("Error", "Email is required", "error");
    }

    if (!isEditing && !password.trim()) {
      return Swal.fire("Error", "Password is required", "error");
    }

    if (!phoneNumber.trim()) {
      return Swal.fire("Error", "Phone number is required", "error");
    }

    const companyIdToUse = selectedOption?.value || profile?.companyId;
    if (!companyIdToUse) {
      return Swal.fire("Error", "Please select a company", "error");
    }

    const postData = {
      name,
      email,
      password,
      phoneNumber,
      companyId: companyIdToUse,
    };

    try {
      if (isEditing && editingStoreId) {
        await dispatch(updateStaff(editingStoreId, postData));
        Swal.fire("Success", "Staff updated successfully", "success");
      } else {
        await dispatch(createStaff(postData));
        Swal.fire("Success", "Staff created successfully", "success");
      }

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setSelectedOption(null);
      setNewItemDrawerOpen(false);
      setIsEditing(false);
      setEditingStoreId(null);

      dispatch(fetchStaff(companyIdToUse, page, limit));
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    }
  };

  const handleRoleChangeAndRefresh = (userId, newRole) => {
    dispatch(assignUserRole(userId, newRole)).then(() => {
      const companyIdToFetch =
        selectedCompanyOption?.value || profile?.companyId || null;
      if (companyIdToFetch) {
        dispatch(fetchStaff(companyIdToFetch, page, limit));
      }
    });
  };

  const handleEditStore = (staff) => {
    // setStoreName(store.name);
    setName(staff.name);
    setEmail(staff.email);
    setPhoneNumber(staff.phoneNumber);
    setEditingStoreId(staff._id);
    setIsEditing(true);
    setNewItemDrawerOpen(true);
  };
  const handleDeleteStore = () => {};
  const handleReset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  };
  return (
    <div className="w-full my-4 px-8 py-3">
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between">
          <span className="text-2xl font-semibold">Staff</span>
          {!profile?.companyId && (
            <>
              <Label htmlFor="name" className="text-lg mt-4"></Label>
              <Select
                defaultValue={selectedCompanyOption}
                onChange={setSelectedCompanyOption}
                options={companiesName}
              />
            </>
          )}
        </div>

        <Sheet open={newItemDrawerOpen} onOpenChange={setNewItemDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-sky-700 hover:bg-sky-800 transition-all font-medium tracking-wide"
              onClick={() => {
                setIsEditing(false);
                handleReset();
              }}
            >
              + Add Staff
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:w-[640px] md:w-[800px] bg-white overflow-y-auto">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="text-2xl font-semibold text-gray-800">
                {isEditing ? "Edit Staff" : "Add Staff"}
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-500">
                {isEditing
                  ? "Update staff details and contact information"
                  : "Enter staff details to create a new team member."}
              </SheetDescription>
            </SheetHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-gray-700 text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              {/* Password */}
              {!isEditing && (
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              )}

              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phonenumber"
                  className="text-gray-700 text-sm font-medium"
                >
                  Phone Number
                </Label>
                <Input
                  id="phonenumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            <SheetFooter className="border-t px-6 py-4 mt-auto">
              <SheetClose asChild>
                <Button
                  type="button"
                  onClick={handleCreateOrUpdateStore}
                  className="bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-2 rounded-md transition"
                >
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <StoreDataTable
        data={staff.users || []}
        onEdit={handleEditStore}
        onDelete={handleDeleteStore}
        onRoleChange={handleRoleChangeAndRefresh}
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

          {Array.from({ length: staff?.totalPages || 1 }, (_, index) => (
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
                setPage((prev) => Math.min(prev + 1, staff?.totalPages || 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StorePage;
