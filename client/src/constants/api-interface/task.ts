export interface TaskType {
  task_name: string;
  description: string;
  status: string;
  priority: string;
  due_date: Date;
  assign_to: string;
  project_id: string;
}
