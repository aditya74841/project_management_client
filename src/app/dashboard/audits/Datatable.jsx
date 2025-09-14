"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DataTableDemo({ data, onEdit, onDelete }) {
  const [search, setSearch] = React.useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search companies..."
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
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((company) => (
                <TableRow key={company._id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  {/* <TableCell>
                    {company.logo?.url ? (
                      <img
                        src={company.logo.url}
                        alt={company.name}
                        className="h-10 w-10 object-cover rounded-full"
                      />
                    ) : (
                      "No Logo"
                    )}
                  </TableCell> */}
                  <TableCell className="font-medium">{company.storeName}</TableCell>
                  
                  <TableCell>
                    {new Date(company.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="bg-sky-700 hover:bg-sky-800"
                      onClick={() => onEdit(company)}
                    >
                      Update
                    </Button>
                    <Button
                      className="bg-red-700 hover:bg-red-800"
                      onClick={() => onDelete(company._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No companies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
