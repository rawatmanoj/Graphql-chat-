import routes from "../../routes";
import {
    Route,
    Routes,
  } from "react-router-dom";
import ChatBody from "../../pages/Chat/ChatBody";
import Me from "../../pages/Me/Me";
export default function Content() {
  return (
    <div className='grow-6 bg-navy'>
        <Routes>
            <Route
            path="/me/:id"
            element={<ChatBody/>}
            />
            <Route
            path="/me"
            element={<Me />}
            />
        </Routes>
    </div>
  )
}
