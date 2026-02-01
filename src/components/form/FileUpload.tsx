import React, { ChangeEvent, DragEvent } from "react";
import { CloudArrowUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface FileUploadProps {
  files: File[];
  onFileChange: (files: File[]) => void;
  multiple?: boolean;
}

const FileUpload = ({ files, onFileChange, multiple = true }: FileUploadProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    onFileChange([...files, ...newFiles]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    onFileChange([...files, ...newFiles]);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    onFileChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className="border-2 border-dashed border-online-blue-400 rounded-lg p-8 flex flex-col items-center justify-center bg-online-blue-600/20 hover:bg-online-blue-600/30 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
          accept=".pdf,.png,.jpg,.jpeg"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer flex flex-col items-center"
        >
          <CloudArrowUpIcon className="w-12 h-12 text-online-blue-300 mb-3" />
          <span className="text-white font-medium mb-1">
            Klikk for a laste opp
          </span>
          <span className="text-online-blue-300 text-sm">
            eller dra og slipp filer her
          </span>
          <span className="text-online-blue-400 text-xs mt-2">
            PDF, PNG, JPG (maks 10MB)
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-online-blue-600/30 rounded-lg"
            >
              <span className="text-white text-sm truncate flex-1 mr-4">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="text-online-orange hover:text-online-orange-300 transition-colors p-1"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
