export enum StatusEnums {
  /** 已完成 */
  TODO = 'todo',
  /** 未完成 */
  DONE = 'done',
  /** 不完成 */
  CANCEL = 'cancel'
}

export interface ListItemProps {
  title: string;
  status: StatusEnums;
  id: string;
}