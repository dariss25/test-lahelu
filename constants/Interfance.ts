export interface StyleTextProps {
  fontSize: number;
  color: string;
}

export interface ItemProps {
  id: number;
  text: string;
  type: "text" | "image";
  source: string;
  width: number;
  height: number;
  scale: number;
  active: boolean;
  style?: StyleTextProps;
}
