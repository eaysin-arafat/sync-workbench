export interface ProjectType {
  id: string;
  project_name: string;
  description: string;
  start_date: string;
  end_date: string;
  department_id: string;
  tasks: string[];
  manager_id: string;
}
