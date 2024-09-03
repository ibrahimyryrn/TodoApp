export interface TodoInitialState {
  todos: Array<TodoType>;
}
export interface TodoType {
  id: number;
  userId: string;
  description: string;
  title: string;
  is_completed?: boolean;
}
