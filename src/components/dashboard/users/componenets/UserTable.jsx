import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Shield, Mail, UserCircle } from "lucide-react";

const roleStyle = (role) => {
  switch (role) {
    case "SUPERADMIN":
      return "bg-red-100 text-red-800";
    case "ADMIN":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-green-100 text-green-800";
  }
};

const UserTable = ({ users, onEdit, onRoleChange, loading }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Verification
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCircle className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      {u.email}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 text-xs font-semibold rounded-full ${roleStyle(
                    u.role
                  )}`}
                >
                  {u.role}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                    u.isEmailVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {u.isEmailVerified ? "Verified" : "Unverified"}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  {u.role !== "SUPERADMIN" && (
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
