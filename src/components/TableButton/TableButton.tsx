import React from 'react';
import {Button} from "react-bootstrap";

interface ButtonProps {
  onClick?: () => void;      // This prop represents handler or functionalty to be executed.
  children: React.ReactNode; //This prop represents the content of the button, such as text or an icon.
}

const TableButton: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>{children}</Button>
  );
};

export default TableButton;
