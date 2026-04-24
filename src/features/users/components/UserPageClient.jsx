"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsers,
  selectUserClientLoading,
  selectUserClientCreating,
  selectUserClientUpdating,
  selectUserClientError,
  selectUserClientMessage,
  getUsers,
  clearMessages,
  changeUserRole,
} from "@/redux/slices/userClientSlice";

import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import UserSheet from "./UserSheet";
import { useUserForm } from "../hooks/useUserForm";
import { showMessage } from "@/app/utils/showMessage";
import EmptyState from "@/components/dashboard/EmptyState";
import LoadingState from "@/components/dashboard/LoadingState";

const UserPageClient = ({ initialData }) => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const loading = useSelector(selectUserClientLoading);
  const creating = useSelector(selectUserClientCreating);
  const updating = useSelector(selectUserClientUpdating);
  const error = useSelector(selectUserClientError);
  const message = useSelector(selectUserClientMessage);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
        dispatch(getUsers());
    }
  }, [dispatch, initialData]);

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

  const handleAddUser = () => {
    resetForm();
    setEditingUser(null);
    setSheetOpen(true);
  };

  const handleEditUser = (user) => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      username: user.username || "",
      role: user.role || "USER",
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

  if (loading && (!users || users.length === 0)) return <LoadingState name="user" />;

  return (
    <div className="space-y-6">
      <UserHeader onAddUser={handleAddUser} />

      {users && users.length > 0 ? (
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onRoleChange={handleRoleChange}
          loading={updating}
        />
      ) : (
        <EmptyState
          onAddCompany={handleAddUser}
          pageName="User"
          page="user"
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
