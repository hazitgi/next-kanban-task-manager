declare interface Column {
  id?: string;
  _id?: string | number;
  title: string;
}

declare interface Task {
  id?: string | number;
  _id?: string | number;
  title: string;
  description: string;
  status: "low" | "high" | "medium";
  comments: number;
  files: number;
  columnId: string | number;
}

declare interface ColumnHeaderProp extends Column {
  onDelete?: () => void;
}

declare interface ColumnBodyProp {
  col: Column;
  tasks: Task[];
}

declare interface TaskCardProp extends Task {
  onDragEnter?: (event?: DragEvent<HTMLElement>) => void;
  onDragLeave?: (event?: DragEvent<HTMLDivElement>) => void;
  onDeleteTask?: () => void;
}

declare interface TasksAndColumns {
  column: Column;
  tasks: Task[];
}

declare interface LoaderButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
}
