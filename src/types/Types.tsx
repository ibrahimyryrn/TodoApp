export interface TodoInitialState {
  todos: Array<TodoType>;
}
export interface TodoType {
  id: number;
  content: string;
  title: string;
}
