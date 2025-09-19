import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff, ClipboardList } from "lucide-react";

const badge = (status) =>
  status === "completed"
    ? "bg-green-100 text-green-800"
    : status === "archived"
    ? "bg-gray-100 text-gray-800"
    : status === "draft"
    ? "bg-yellow-100 text-yellow-800"
    : "bg-blue-100 text-blue-800";

const ProjectTable = ({ projects, onEdit, onDelete, onToggle, loading }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ClipboardList className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-900">
                    {p.name}
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${badge(p.status)}`}>
                  {p.status}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {p.deadline ? new Date(p.deadline).toLocaleDateString() : "—"}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggle(p._id)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    {p.isShown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(p._id)}
                    disabled={loading}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
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

export default ProjectTable;
