import { Outlet } from "react-router-dom"

function QuizLayout() {
  return (
    <div className="p-12 max-w-[1300px] mx-auto anim-fade">
      <Outlet />
    </div>
  )
}

export default QuizLayout