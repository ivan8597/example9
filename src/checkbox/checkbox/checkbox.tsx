import { FC } from "react";
import styles from "./checkbox.module.scss";
import { CheckboxProps } from "../../types";

export const Checkbox: FC<CheckboxProps> = ({
  onMouseEnter,
  onMouseLeave,
  isChecked,
  id,
  label,
  onClick,
  children,
}) => {
  return (
    <>
      <div
        className={styles.checkbox}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={() => null}
        />
        <label htmlFor={id} onClick={onClick}>
          {label}
        </label>
        {children}
      </div>
    </>
  );
};
