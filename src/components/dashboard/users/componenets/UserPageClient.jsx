"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  selectUsers,
  selectUserClientLoading,
  selectUserClientCreating,
  selectUserClientUpdating,
  selectUserClientError,
  selectUserClientMessage,
  getUsers,
  createUser,
  changeUserRole,
  clearMessages,
} from "../../../../redux/slices/userClientSlice";

import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import UserSheet from "./UserSheet";
import LoadingState from "../../companies/components/LoadingState";
import EmptyState from "../../companies/components/EmptyState";
import { useUserForm } from "../hooks/useUserForm";          // you’ll create similar to useCompanyForm
import { showMessage } from "@/app/utils/showMessage";

const UserPageClient = ({ initialData }) => {
  const dispatch = useDispatch();

  const users          = useSelector(selectUsers);
  const loading        = useSelector(selectUserClientLoading);
  const creating       = useSelector(selectUserClientCreating);
  const updating       = useSelector(selectUserClientUpdating);
  const error          = useSelector(selectUserClientError);
  const message        = useSelector(selectUserClientMessage);


  console.log("The user is ",users)



  const [sheetOpen, setSheetOpen]       = useState(false);
  const [editingUser, setEditingUser]   = useState(null);

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
  } = useUserForm();

  // fetch on mount
  useEffect(() => {
    if (!initialData) dispatch(getUsers());
  }, [dispatch, initialData]);

  // success & error toasts
  useEffect(() => {
    if (message) {
      showMessage(message);
      dispatch(clearMessages());
    }
    if (error) {
      showMessage(error, "error");
      dispatch(clearMessages());
    }
  }, [message, error, dispatch]);

  /* ---------- handlers ---------- */
  const handleAddUser = () => {
    resetForm();
    setEditingUser(null);
    setSheetOpen(true);
  };

  const handleEditUser = (user) => {
    setFormData({
      name:     user.name     || "",
      email:    user.email    || "",
      username: user.username || "",
      role:     user.role     || "USER",
      password: "",
    });
    setEditingUser(user);
    setSheetOpen(true);
  };

  const handleFormSubmit = async (data) => {
    const success = await handleSubmit(data, editingUser?._id);
    if (success) {
      setSheetOpen(false);
      resetForm();
      setEditingUser(null);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await dispatch(changeUserRole({ userId, newRole: newRole })).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && !users?.length) return <LoadingState />;

  return (
    <div className="space-y-6">
      <UserHeader onAddUser={handleAddUser} />

      {users?.length ? (
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onRoleChange={handleRoleChange}
          loading={updating}
        />
      ) : (
        <EmptyState
          onAddCompany={handleAddUser}
          // component is generic; button text still ok
        />
      )}

      <UserSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        formData={formData}
        errors={errors}
        touched={touched}
        isValid={isValid}
        isSubmitting={creating || updating}
        isEditing={!!editingUser}
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setSheetOpen(false);
          resetForm();
          setEditingUser(null);
        }}
      />
    </div>
  );
};

export default UserPageClient;
