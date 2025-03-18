export interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks?: ISubtask[];
}

export interface ISubtask {
  id: string;
  parent_id: string | null;
  todo_id: string;
  title: string;
  description: string;
  status: string;
  subtasks?: ISubtask[];
}
