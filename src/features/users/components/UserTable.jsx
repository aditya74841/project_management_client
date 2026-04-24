import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Shield, User } from "lucide-react";

const UserTable = ({ users, onEdit, onRoleChange, loading }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-medium">
          <tr>
            <th className="px-6 py-4">User Info</th>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{u.name}</div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium">
                {u.username}
              </td>
              <td className="px-6 py-4">
                <Badge
                  className={
                    u.role === "ADMIN"
                      ? "bg-purple-100 text-purple-700 hover:bg-purple-100 border-none"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-100 border-none"
                  }
                >
                  {u.role}
                </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  {onRoleChange && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onRoleChange(u._id, u.role === "ADMIN" ? "USER" : "ADMIN")
                      }
                      disabled={loading}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Shield className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(u)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default UserTable;
