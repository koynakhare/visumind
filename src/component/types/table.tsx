export interface Column<T> {
  key: keyof T;
  label: string;
  type?: "action";
  action?: [{
    label: string;
    type: string;
    onClick: (data:T) => void;
    icon?: React.ReactNode;
    name: string
  }]
}
