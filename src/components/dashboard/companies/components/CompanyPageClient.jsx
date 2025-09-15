// app/dashboard/companies/components/CompanyPageClient.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import CompanyHeader from "./CompanyHeader";
import CompanyTable from "./CompanyTable";
import CompanySheet from "./CompanySheet";
import LoadingState from "./LoadingState";
import EmptyState from "./EmptyState";
import { useCompanyForm } from "../hooks/useCompanyForm";

import {
  getAllCompanies,
  deleteCompany,
  clearMessages,
} from "../../../../redux/slices/companySlice";
import { showMessage } from "@/app/utils/showMessage";

const CompanyPageClient = ({ initialData }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const dispatch = useDispatch();
  const { 
    companies, 
    loading, 
    creating, 
    updating, 
    deleting, 
    error, 
    message 
  } = useSelector((state) => state.company);

  const {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormData,
  } = useCompanyForm();

  // Fetch companies on mount
  useEffect(() => {
    if (!initialData) {
      dispatch(getAllCompanies());
    }
  }, [dispatch, initialData]);

  // Handle success/error messages
  useEffect(() => {
    if (message) {
    //   Swal.fire("Success", message, "success");
      showMessage("Success")
      dispatch(clearMessages());
    }
    if (error) {
    //   Swal.fire("Error", error, "error");
      showMessage(error,"error")

      dispatch(clearMessages());
    }
  }, [message, error, dispatch]);

  const handleAddCompany = () => {
    resetForm();
    setEditingCompany(null);
    setSheetOpen(true);
  };

  const handleEditCompany = (company) => {
    setFormData({
      name: company.name || "",
      email: company.email || "",
      domain: company.domain || "",
    });
    setEditingCompany(company);
    setSheetOpen(true);
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
        await dispatch(deleteCompany(companyId)).unwrap();
      } catch (err) {
        console.error("Delete company error:", err);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    const success = await handleSubmit(formData, editingCompany?._id);
    if (success) {
      setSheetOpen(false);
      resetForm();
      setEditingCompany(null);
    }
  };

  if (loading && !companies?.length) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <CompanyHeader onAddCompany={handleAddCompany} />
      
      {companies?.length > 0 ? (
        <CompanyTable
          companies={companies}
          onEdit={handleEditCompany}
          onDelete={handleDeleteCompany}
          loading={deleting}
        />
      ) : (
        <EmptyState onAddCompany={handleAddCompany} />
      )}

      <CompanySheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={creating || updating}
        isEditing={!!editingCompany}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setSheetOpen(false);
          resetForm();
          setEditingCompany(null);
        }}
      />
    </div>
  );
};

export default CompanyPageClient;
