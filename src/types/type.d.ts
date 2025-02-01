declare interface Column {
  id: string;
  title: string;
}

declare interface Task {
  id: string | number;
  title: string;
  description: string;
  status: "low" | "high" | "medium";
  comments: number;
  files: number;
  columnId: string | number;
}

declare interface ColumnHeaderProp {
  title: string;
}

declare interface ColumnBodyProp {
  col: Column;
  tasks: Task[];
}

declare interface TaskCardProp extends Task {
  onDragEnter?: (event?: DragEvent<HTMLElement>) => void;
  onDragLeave?: (event?: DragEvent<HTMLDivElement>) => void;
}
