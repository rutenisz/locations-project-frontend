import React from "react";
import styles from "./styles.module.css";

type ButtonType = {
  className: string;
  onClick: () => void;
  isLoading: boolean;
  text: string;
};

const Button: React.FC<ButtonType> = ({
  onClick,
  isLoading,
  text,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {!isLoading ? <>{text}</> : <>Loading...</>}
    </button>
  );
};

export default Button;

// const Button: React.FC<ButtonType> = ({ onAddObject, isLoading }) => {
//   return (
//     <button className={styles.button} onClick={onAddObject}>
//       {!isLoading ? (
//         <>Add Object</>
//       ) : (
//         <div className={styles.loader}>Loading...</div>
//       )}
//     </button>
//   );
// };
