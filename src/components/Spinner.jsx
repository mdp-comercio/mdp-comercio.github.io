import React from "react";
import "./Spinner.css"

const Spinner = ({className}) => (
    <div className="w-full h-full flex items-center justify-center">
        <div className={"loader " + className}></div>
    </div>
)

export default Spinner;
