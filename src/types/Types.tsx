export interface TodoInitialState {
  todos: Array<TodoType>;
}
export interface TodoType {
  id: number;
  user_id: string;
  description: string;
  title: string;
  is_completed?: boolean;
}
