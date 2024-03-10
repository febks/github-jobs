import React from "react";

function Headbar() {
  return (
    <div className="w-full h-11 bg-[#0E86D4] p-2 z-20">
      <div className="flex flex-row gap-1">
        <div style={{ fontWeight: "700", fontSize: "18px", color: "#FFFFFF", lineHeight: "33px" }}>
          GitHub
        </div>
        <div style={{ fontWeight: "400", fontSize: "18px", color: "#FFFFFF", lineHeight: "33px" }}>
          Jobs
        </div>
      </div>
    </div>
  )
}

export default Headbar;