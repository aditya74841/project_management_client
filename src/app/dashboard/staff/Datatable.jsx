"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { assignUserRole } from "./store";

export function StoreDataTable({ data, onEdit, onDelete, onRoleChange }) {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // console.log("The filteredData", filteredData);

  const handleRoleChange = (e, userId) => {
    const newRole = e.target.value;
    if (onRoleChange) {
      onRoleChange(userId, newRole);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search stores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {/* <TableHead>Change Role</TableHead> */}
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((store) => (
                <TableRow key={store._id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell className="font-medium">{store.email}</TableCell>
                  {/* <TableCell className="font-medium capitalize">
                    {store.role}
                  </TableCell> */}
                  <TableCell className="font-medium">
                    <select
                      value={store.role}
                      onChange={(e) => handleRoleChange(e, store._id)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    {new Date(store.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="bg-sky-700 hover:bg-sky-800"
                      onClick={() => onEdit(store)}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-red-700 hover:bg-red-800"
                      onClick={() => onDelete(store._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center">
                  No stores found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
