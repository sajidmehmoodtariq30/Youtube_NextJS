import React from "react"

interface layoutProps {
    children: React.ReactNode;
}

const layout = ({children}: layoutProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        {children}
    </div>
  )
}

export default layout