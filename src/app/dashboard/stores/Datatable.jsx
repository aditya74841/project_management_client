"use client";

import * as React from "react";
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

export function StoreDataTable({ data, onEdit, onDelete }) {
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

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
              <TableHead>Store Name</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((store) => (
                <TableRow key={store._id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell className="font-medium">{store.companyName}</TableCell>
                  <TableCell>
                    {store.logo?.url ? (
                      <img
                        src={store.logo.url}
                        alt={store.name}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    ) : (
                      "No Logo"
                    )}
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
                <TableCell colSpan="4" className="text-center">
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
