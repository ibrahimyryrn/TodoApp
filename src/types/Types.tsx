export interface TodoInitialState {
  todos: Array<TodoType>;
}
export interface TodoType {
  id: number;
  user_id?: string;
  content: string;
  title: string;
}
