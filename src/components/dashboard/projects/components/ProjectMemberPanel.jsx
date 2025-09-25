"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  fetchCompanyUsers,
  selectCompanyUsers,
  selectCompanyUsersLoading,
} from "@/redux/slices/companySlice";

import {
  addMemberToProject,
  removeMemberFromProject,
} from "@/redux/slices/projectSlice";

const ProjectMemberManager = ({ projectId, initialMembers }) => {
  const dispatch = useDispatch();

  const companyUsers = useSelector(selectCompanyUsers);
  const loadingUsers = useSelector(selectCompanyUsersLoading);

  useEffect(() => {
    if (!companyUsers.length) dispatch(fetchCompanyUsers());
  }, [dispatch, companyUsers.length]);

  // console.log("The Company Users is ", companyUsers);

  // Local state to track current member ids
  const [members, setMembers] = useState(initialMembers || []);
  const [addingUserId, setAddingUserId] = useState("");
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);

  // Prepare dropdown options excluding current members
  const nonMembers = useMemo(
    () => companyUsers.filter((u) => !members.includes(u._id)),
    [companyUsers, members]
  );

  const memberUsers = useMemo(
    () => companyUsers.filter((u) => members.includes(u._id)),
    [companyUsers, members]
  );

  // Add member handler
  const handleAdd = async () => {
    if (!addingUserId || loadingAdd) return;
    setLoadingAdd(true);

    try {
      await dispatch(
        addMemberToProject({ projectId, userId: addingUserId })
      ).unwrap();
      setMembers((prev) => [...prev, addingUserId]);
      setAddingUserId("");
    } catch (err) {
      console.error("Add member error:", err);
      // Optionally show error toast here
    }

    setLoadingAdd(false);
  };

  // Remove member handler
  const handleRemove = async (userId) => {
    if (loadingRemoveId) return;
    setLoadingRemoveId(userId);

    try {
      await dispatch(removeMemberFromProject({ projectId, userId })).unwrap();
      setMembers((prev) => prev.filter((id) => id !== userId));
    } catch (err) {
      console.error("Remove member error:", err);
      // Optionally show error toast here
    }

    setLoadingRemoveId(null);
  };

  return (
    <div className="space-y-4">
      {/* Add Member Dropdown */}
      <div className="flex gap-2 items-center">
        <select
          value={addingUserId}
          onChange={(e) => setAddingUserId(e.target.value)}
          className="border rounded p-2 flex-grow"
          disabled={loadingUsers}
        >
          <option value="">Select user to add</option>
          {nonMembers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <Button
          onClick={handleAdd}
          disabled={!addingUserId || loadingAdd}
          className="bg-blue-600 text-white flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {/* Current Members List */}
      <div>
        <h4 className="font-semibold mb-2">Project Members</h4>
        {memberUsers.length === 0 ? (
          <p className="text-gray-500">No members added yet.</p>
        ) : (
          <ul className="space-y-2">
            {memberUsers.map((member) => (
              <li
                key={member._id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded"
              >
                <span>{member.name}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(member._id)}
                  disabled={loadingRemoveId === member._id}
                  className="text-red-600 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectMemberManager;
