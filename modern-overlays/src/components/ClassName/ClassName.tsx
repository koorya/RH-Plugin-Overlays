import { useClass } from "./useClass";
import * as C from "./class-name.steles";
export const ClassName = () => {
  const rhClass = useClass();
  return <C.Container>rhClass</C.Container>;
};
