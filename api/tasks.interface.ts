export interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks?: ISubtask[];
}
