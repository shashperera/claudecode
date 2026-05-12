import { Loader2, FilePlus, FilePen, FileSearch, FileX, FolderInput } from "lucide-react";

interface StrReplaceArgs {
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  path: string;
}

interface FileManagerArgs {
  command: "rename" | "delete";
  path: string;
  new_path?: string;
}

type ToolArgs = StrReplaceArgs | FileManagerArgs;

interface ToolCallBadgeProps {
  toolName: string;
  args: ToolArgs;
  state: "call" | "result" | "partial-call";
}

function getLabel(toolName: string, args: ToolArgs): { icon: React.ReactNode; text: string } {
  const path = (args as Partial<StrReplaceArgs & FileManagerArgs>).path;
  const fileName = path?.split("/").pop() ?? path ?? "";

  if (toolName === "str_replace_editor") {
    const { command } = args as StrReplaceArgs;
    switch (command) {
      case "create":
        return { icon: <FilePlus className="w-3.5 h-3.5" />, text: `Creating ${fileName}` };
      case "str_replace":
      case "insert":
        return { icon: <FilePen className="w-3.5 h-3.5" />, text: `Editing ${fileName}` };
      case "view":
        return { icon: <FileSearch className="w-3.5 h-3.5" />, text: `Reading ${fileName}` };
      default:
        return { icon: <FilePen className="w-3.5 h-3.5" />, text: `Updating ${fileName}` };
    }
  }

  if (toolName === "file_manager") {
    const { command } = args as FileManagerArgs;
    switch (command) {
      case "rename":
        return { icon: <FolderInput className="w-3.5 h-3.5" />, text: `Renaming ${fileName}` };
      case "delete":
        return { icon: <FileX className="w-3.5 h-3.5" />, text: `Deleting ${fileName}` };
    }
  }

  return { icon: <FilePen className="w-3.5 h-3.5" />, text: toolName };
}

export function ToolCallBadge({ toolName, args, state }: ToolCallBadgeProps) {
  const done = state === "result";
  const { icon, text } = getLabel(toolName, args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {done ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600 flex-shrink-0" />
      )}
      <span className="text-neutral-600">{icon}</span>
      <span className="text-neutral-700">{text}</span>
    </div>
  );
}
