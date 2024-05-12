import React from "react"

export default function LoadingState() {
  return (
    <>
      <div className="spinner">
        <article></article>
        <p className="text-white opacity-75 mt-5 text-xl font-bold">
          Loading . . .
        </p>
      </div>
    </>
  )
}
